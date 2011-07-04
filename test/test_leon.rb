#encoding:UTF-8
DBENV="test"
require 'testunit_helper'
require 'leon/leon'
$LOAD_PATH.unshift File.expand_path("../../lib", __FILE__)

class TestLeon < Test::Unit::TestCase
  Link = Struct.new(:href, :text)

  def setup
    VCR.use_cassette('Leonbets_main') do
      @worker= Leon.new
    end
  end

#  проверка кода если сайт недоступен
  def test_connect_with_404
    FakeWeb.register_uri(:get, "http://www.leonbets.com", :body => "404 error", :status => ["404", "Not Found"])
    assert_raise(OpenURI::HTTPError) do
      @worker.connect
    end
  end

  def test_connect_without_arguments_should_return_nokogiri_document
    @worker.connect
    mainpage=@worker.instance_eval { @mainpage }
    assert mainpage
    assert_kind_of(Nokogiri::HTML::Document, mainpage)
    assert_false(mainpage.css('.headtlt').empty?) #проверка что элемент (заголовок типа события) присутствует
    assert_match(/Leon/, mainpage.css('.logo').to_html)
  end

  def test_find_sport_should_return_kind_of_sport
    @worker.connect
    link=@worker.get_list_of_sport_links.first
    assert_equal("Soccer", @worker.find_sport(link))
  end

  #все URL на виды спорта/конкретные соревнования содержат в себе ""betoffer"
  def test_get_list_of_sport_links_they_should_be_bet_offers
    @worker.connect
    assert @worker.get_list_of_sport_links.all? { |link| link['href'] =~/betoffer/ }
  end

  #Проверим, что синонимы есть, они подгружаются в момент создания объекта Leon (определено в initialize)
  def test_sports_synonyms_should_be_defined
    assert_not_nil @worker.instance_eval { @sports_synonyms }
  end

  def test_synonym_to_standard_should_return_appropriate_synonym
    sport="Soccer"
    assert_equal("Football", @worker.synonym_to_standard(sport))
    sport="Hockey"
    assert_equal("Ice Hockey", @worker.synonym_to_standard(sport))
  end

  def test_synonym_to_standard_should_return_argument_if_there_is_no_synonyms
    sport="Tennis"
    assert_equal("Tennis", @worker.synonym_to_standard(sport))
  end


  def test_find_next_sibling_should_return_nil_if_there_is_no_sibling
    page=@worker.connect()
    title_obj=page.at_css('.headtlt')
    assert_nil title_obj.find_next_sibling("span")
  end

  #метод parseable?, если передана неверная страница возвращает nil
  def test_parseable_should_return_false
    VCR.use_cassette('github.com') do
      page=Nokogiri::HTML(open("https://github.com"))
      assert_false Leon.new.parseable?(page)
    end
  end

  #при заходе на главную страницу Leonbets метод возвращает true
  def test_parseable_should_return_true
    page=@worker.connect
    assert Leon.new.parseable?(page)
  end

  def test_iterate
    @worker.connect
    hrefs=["http://www.leonbets.com/betoffer/1/3168",
           "http://www.leonbets.com/betoffer/1/5934",
           "http://www.leonbets.com/betoffer/1/3398",
           "http://www.leonbets.com/betoffer/1/4434"]
    links=[]

    hrefs.each { |href| links<<Link.new(href, "its a Link") }
    #сделаем заглушки на внутренние методы, т.к они не важны, synonym_to_standard проверяется собственным тестом

    #проверка всех вызовов
    links.each do |link|
      @worker.expects(:synonym_to_standard).once.returns "synonym_text"
      @worker.expects(:find_sport).once.with(link).returns "sport_type"
      @worker.expects(:connect).with(link['href']).returns(Nokogiri::HTML::Document.new)
      @worker.expects(:parseable?).once.returns(true)
      @worker.expects(:parse_page).once.with { |doc| doc.instance_of?(Nokogiri::HTML::Document) }
    end
    @worker.iterate_through_bet_offers(links)
  end

  def test_parse_page
    VCR.use_cassette("Leonbets_soccer_page") do
      page=@worker.connect "http://www.leonbets.com/betoffer/1/3398"
      @worker.parse_page(page)
      title=@worker.instance_variable_get("@title_obj")
      #проверка что заголовок обработался
      assert_equal "Soccer - Finnish Soccer - Veikkausliiga", title.text
      #проверка что во всех аргументах, посылаемых в метод process_rows присутствует класс "row." (row1,row2,etc...)
      @worker.expects(:process_rows).with{|odds_rows|odds_rows.all?{|row|row.name=="tr"&&row['class']=~/row/}}
      @worker.parse_page(page)
    end
  end

  def test_process_rows
    odds_rows=Nokogiri::HTML::Document.parse(IO.read('test/test_leon_files/odds_rows.txt')).elements
    #проверим что на запись уходит то, что ожидали
    @worker.expects(:save_data_to_db).with(["Criciuma","Goias"],['1.63','3.52','5.32'],Time.at(1309910400)).returns false
    @worker.process_rows(odds_rows)
  end

#  def test_find_next_sibling_should_return_proper_text
#    pend "pending"
#    page=@worker.connect()
#    nav=page.at_css('li.bord')
#    home=nav.find_next_sibling("li")
#    assert
#  end


end