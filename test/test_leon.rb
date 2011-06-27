require 'testunit_helper'
require 'leon'
#require 'fakeweb'

class TestLeon < Test::Unit::TestCase
  def setup
    @worker= Leon.new
    @worker.connect
  end

  #проверка кода если сайт недоступен
#  def test_connect_with_404
#    FakeWeb.register_uri(:get,"http://www.leonbets.com",:body => "404 error", :status => ["404","Not Found"])
#    assert_raise
#  end

  def test_connect_without_arguments_should_return_nokogiri_document
    mainpage=@worker.instance_eval{@mainpage}
    assert mainpage
    assert_kind_of(Nokogiri::HTML::Document, mainpage)
    assert_false(mainpage.css('.headtlt').empty?) #проверка что элемент (заголовок типа события) присутствует
    assert_match(/Leon/, mainpage.css('.logo').to_html)
  end

  def test_get_list_of_sport_links_they_should_be_bet_offers
    assert @worker.get_list_of_sport_links.all? { |link| link['href'] =~/betoffer/ }
  end

  #проверим правильность парсера сверив заголовок с тем, который в боковом меню.
#  def test_iterate_through_bet_offers_should_get_proper_titles
#    links=@worker.get_list_of_sport_links
#    @worker.iterate_through_bet_offers(links)
#  end


end