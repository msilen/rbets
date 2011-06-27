require 'rubygems'
require 'nokogiri'
require 'open-uri'
require 'db_ar_setup'
class Leon
  SITE_URL="http://www.leonbets.com"

  def run
    connect
    sport_links=get_list_of_sport_links
    iterate_through_bet_offers sport_links
  end

  def connect(url=SITE_URL)
    doc=Nokogiri::HTML(open(url))
    @mainpage=doc if url==SITE_URL #запомним главную страницу при первом вызове
    doc
  end

  def get_list_of_sport_links
    @mainpage.css('.leagueitem a')
  end

  #вспомогательный метод для нахождения ближайшего элемента
  Nokogiri::XML::Node.class_eval do
    def find_next_sibling(tag)
      #tag=строка, название тега
      sibling=self.next
      sibling.name==tag ? sibling : sibling.find_next_sibling(tag)
    end
  end

  def iterate_through_bet_offers(links)
    links.each do |link|
      puts link.text.chomp.strip
      @current_doc=connect(link['href'])
      parse_page(@current_doc)
    end
  end

  def parse_page(page)
    #найдем заголовок на странице(тип состязания, лиги|события)
    @title_obj=page.at_css('.headtlt')
    raise "Error occured, no title" if @title_obj.nil?
    title_text=@title_obj.text.scan(/[^-]+-(.+)/).flatten.first.chomp
    odds_table=@title_obj.ancestors.detect { |tag| tag.name=='table' }.find_next_sibling("table") #найдем таблицу ставок по отношению к заголовку
    odds_rows=odds_table.children.select { |row| row.attr("class")=~/row/ } #строки ставок
    process_rows(odds_rows)
  end

  def process_rows(odds_rows)
    odds_rows.each do |row|
      date=Time.at(row.child.text.scan(/printShortDate\((\d+)\)/).join.to_i/1000).gmtime #получим UTC время
      odds=row.css("a.oddj").map(&:text) #коэффициенты на события
      event=row.css("a.nou2").text.strip.chomp #рассматриваемое событие(оба соперника)
      sides=event.split " - " #массив играющих сторон
      raise "Parse Error!!" unless sides.size ==2 #приостановим скрипт если ошибка в кол-ве соперников
      string=odds.join ' '
      puts "#{date.strftime("%d.%m.%Y %H:%M")} #{sides} #{string}"
      save_data_to_db(sides, odds, date)
    end
  end

  #запись события в бд
  def save_data_to_db(sides, odds, date)
    if odds.size==3
      home, draw, away=*odds #ставки на победу 1го, ничья, победа 2го соперника
    else
      home, away=*odds
    end
    bookmaker=Bookmaker.where(:name =>"Leonbets").first #поиск нужного букмекера
    bookmaker.bets.create(:competition => @title_obj.text, :competitor_one=>sides[0], :competitor_one_coef => home, :competitor_two => sides[1], :competitor_two_coef => away, :event_date =>date, :draw =>draw)
  end
end
