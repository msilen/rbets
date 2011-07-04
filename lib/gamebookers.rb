require 'rubygems'
require 'celerity'
require 'gamebookers_helper'
require 'ruby-debug'
Debugger.start

Celerity.index_offset = 0 #настройка Celerity для индексов с 0

class Gamebookers < Celerity::Browser
  include GamebookersHelper

  def run
    establish_connection
    get_links_of_sports
    iterate_through_valid_sports
    print "\e[0m"
  end

  def establish_connection
    @bookmaker=Bookmaker.where(:name => "Gamebookers").first
    puts "connecting..."
    goto @bookmaker.website
  end

  #получаем весь список ссылок с видами спорта
  def get_links_of_sports
    @mainpage_links_of_sports_hrefs= div(:class, "leftNavText").ul(:index=>0).links.map &:href
  end

  #проходим по ссылке если ставки на этом виде спорта подходят.
  def iterate_through_valid_sports
    @mainpage_links_of_sports_hrefs.each do |url|
      debugger
      goto(url)
      get_data(url) if page_with_actual_matches?
    end
  end

  #итерируем заглядывая в каждую лигу и тип ставки
  def get_data(sport_url)
    puts "========================================================"
    puts sport_url
    goto(sport_url)
    select_leagues_and_parse_them
  end

  def select_leagues_and_parse_them
    puts "\e[33mLeagues:\e[0m"
    select_list_of_leagues_options=select_list(:id, 'leaguesSelect') #список опций лиг в Select List
    leagues_to_scan=reject_redundant_today_options(select_list_of_leagues_options) #список лиг, без событий "сегодня или завтра", т.к они избыточны
    leagues_to_scan.each do |league|
      @league=league #лига, соревнование
      puts "going in: \e[34m" + league +"\e[0m"
      goto league_url(league, select_list_of_leagues_options) #идем на страничку текущей итерируемой лиги
      parse_page if page_with_actual_matches? && appropriate_bet_type?# обработаем страницу, если подходит по параметрам
      back
    end
  end

  def parse_page
    odds=elements_by_xpath "//a[@class='bfhref']"# массив коэффициентов
    first_x_second(odds) #проверяется является ли ставка 1Х2, и записывает в перем.экземпляра с аналогичным именем
    box=[] #сюда временно(построчно) записываются коэф. в порядке их обработки (1й,2й) либо (1й,ничья,2й)
    odds.each do |odd|
      sides=find_sides(odd)#определим стороны
      processed_sides=[] #обработанные стороны-соперники (вырезаны скобки если они есть)
      debugger if sides.nil?
      sides.flatten.each{|side|processed_sides<<strip_brackets(side)}
      @sport=link(:class => "selectedBtn").text.strip.chomp# вид спорта
      time=parse_date_string_to_utc(odd.parent.parent.parent.text)#дата события, класс Time
      required_size= (@first_x_second) ? 3 : 2 #задаем размер кол-ва ставок на 1 событие (3 ставки для 1х2)
      box<<odd.text
      if box.size==required_size
        coef1=box[0]
        coef2=box[required_size-1] #второй коэфициент является либо 2м(если обычная ставка) либо 3м(если 1х2) после ничьи
        draw=box[1] if @first_x_second
        write_to_db(box, coef1, coef2, processed_sides, time, draw)
        draw=nil #сброс значения после записи
        box.clear
      end
    end
  end

  #запись в бд и вывод на экран отсканированной строки
  def write_to_db(box, coef1, coef2, sides, time, draw)
    c_1_cf=box[0] #коэффициент первого участника
    print "\e[32m"
    box.size==3 ? (draw, c_2_cf=box[1], box[2]) : (draw, c_2_cf=nil, box[1]) #задаются значения коэффициентов в зависимости от типа ставки
    record=@bookmaker.bets.new(:competition => @league,:sport =>@sport, :competitor_one=>sides[0], :competitor_one_coef => c_1_cf, :draw => draw, :competitor_two => sides[1], :competitor_two_coef => c_2_cf , :event_date =>time)
    @red_noprint=!record.valid? #печатать только новые
    record.save
    puts %Q(#{coef1} #{sides[0]} VS #{sides[1]} #{coef2} #{time} draw:#{draw}\e[0m) unless @red_noprint
    print "\e[0m"
  end
end