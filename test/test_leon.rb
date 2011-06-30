require 'testunit_helper'
require 'leon'
$LOAD_PATH.unshift File.expand_path("../../lib", __FILE__)

class TestLeon < Test::Unit::TestCase
  def setup
    VCR.use_cassette('Leonbets_main') do
      @worker= Leon.new
    end
  end

#  проверка кода если сайт недоступен
  def test_connect_with_404
    FakeWeb.register_uri(:get,"http://www.leonbets.com",:body => "404 error", :status => ["404","Not Found"])
    assert_raise(OpenURI::HTTPError) do
      @worker.connect
    end
  end

  def test_find_sport_should_return_kind_of_sport
    @worker.connect
    link=@worker.get_list_of_sport_links.first
    assert_equal("Soccer",@worker.find_sport(link))
  end

  def test_sports_synonyms_should_be_defined
   assert_not_nil @worker.instance_eval{@sports_synonyms}
  end

  def test_synonym_to_standard_should_return_appropriate_synonym
    sport="Soccer"
    assert_equal("Football", @worker.synonym_to_standard(sport))
  end

  def test_synonym_to_standard_should_return_argument_if_there_is_no_synonyms
    sport="Tennis"
    assert_equal("Tennis", @worker.synonym_to_standard(sport))
  end

  def test_connect_without_arguments_should_return_nokogiri_document
    @worker.connect
    mainpage=@worker.instance_eval { @mainpage }
    assert mainpage
    assert_kind_of(Nokogiri::HTML::Document, mainpage)
    assert_false(mainpage.css('.headtlt').empty?) #проверка что элемент (заголовок типа события) присутствует
    assert_match(/Leon/, mainpage.css('.logo').to_html)
  end

  def test_get_list_of_sport_links_they_should_be_bet_offers
    @worker.connect
    assert @worker.get_list_of_sport_links.all? { |link| link['href'] =~/betoffer/ }
  end

  def test_find_next_sibling_should_return_nil_if_there_is_no_sibling
   page=@worker.connect()
   title_obj=page.at_css('.headtlt')
   assert_nil title_obj.find_next_sibling("span")
  end

#  def test_find_next_sibling_should_return_proper_text
#    pend "pending"
#    page=@worker.connect()
#    nav=page.at_css('li.bord')
#    home=nav.find_next_sibling("li")
#    assert
#  end


end