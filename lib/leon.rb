require 'rubygems'
require 'nokogiri'
require 'open-uri'
DATABASEYML='database_ruby.yml'
require 'db_ar_setup'
require 'config/environment'
#require 'ruby-debug'
#Debugger.start

class Leon
@@bookmaker=Bookmaker.where(:name => "Leonbets").first
  #запуск скрипта
  def run
    connect
    sport_links=get_list_of_sport_links
    iterate_through_bet_offers sport_links
    print "\e[0m"
  end

  #Возвращает объект нокогири по принятому аргументу-урл
  def connect(url=@@bookmaker.website)
    doc=Nokogiri::HTML(open(url))
    @mainpage=doc if url==@@bookmaker.website #запомним главную страницу при первом вызове
    doc
  end

  #возвращает ссылки - адреса на спорт.события
  def get_list_of_sport_links
    @mainpage.css('.leagueitem a')
  end

  #вспомогательный метод для нахождения ближайшего элемента внутри документа
  Nokogiri::XML::Node.class_eval do
    def find_next_sibling(tag)
      #tag=строка, название тега
      sibling=self.next
      sibling.name==tag ? sibling : sibling.find_next_sibling(tag)
    end
  end

  #заходим в каждую ссылку и обрабатываем ставки
  def iterate_through_bet_offers(links)
    links.each do |link|
      puts "\e[34m#{link.text.chomp.strip}\e[0m"
      @current_doc=connect(link['href'])
      parse_page(@current_doc)
    end
  end

  #обрабатывает переданную страницу (объект нокогири)
  def parse_page(page)
    #найдем заголовок на странице(тип состязания, лиги|события)
    @title_obj=page.at_css('.headtlt')
    raise "Error occured, no title" if @title_obj.nil?
    title_text=@title_obj.text.scan(/[^-]+-(.+)/).flatten.first.chomp
    odds_table=@title_obj.ancestors.detect { |tag| tag.name=='table' }.find_next_sibling("table") #найдем таблицу ставок по отношению к заголовку
    odds_rows=odds_table.children.select { |row| row.attr("class")=~/row/ } #строки ставок
    process_rows(odds_rows)
  end

  #обрабатывает одну строку и записывает в базу
  def process_rows(odds_rows)
    odds_rows.each do |row|
      date=Time.at(row.child.text.scan(/printShortDate\((\d+)\)/).join.to_i/1000).gmtime #получим UTC время
      odds=row.css("a.oddj").map(&:text) #коэффициенты на события
      event=row.css("a.nou2").text.strip.chomp #рассматриваемое событие(оба соперника)
      sides=event.split " - " #массив играющих сторон
      raise "Parse Error!!" unless sides.size ==2 #приостановим скрипт если ошибка в кол-ве соперников
      string=odds.join ' '
      save_data_to_db(sides, odds, date)
      puts "#{date.strftime("%d.%m.%Y %H:%M")} #{sides} #{string}"
    end
  end

  #запись события в бд
  def save_data_to_db(sides, odds, date)
    if odds.size==3
      home, draw, away=*odds #ставки на победу 1го, ничья, победа 2го соперника
    else
      home, away=*odds
    end
    record=@@bookmaker.bets.new(:competition => @title_obj.text, :competitor_one=>sides[0], :competitor_one_coef => home, :competitor_two => sides[1], :competitor_two_coef => away, :event_date =>date, :draw =>draw)
    print "\e[32m"
    print "\e[31m" unless record.valid?
    record.save
  end
end
