require 'rbets'
require 'test/unit'
require 'redgreen'
require 'mocha'

class TestGamebookers < Test::Unit::TestCase

  def setup
    @browser= Gamebookers.new
    @browser.establish_connection
  end

  def test_should_return_url_on_establishing_connection
    #setup
    site_url = Gamebookers::SITE_URL
    @browser=Gamebookers.new

    #expected method invocations,stubs
    Gamebookers.expects(:new).returns(@browser)
    @browser.expects(:goto).with(site_url).once.returns(site_url)

    assert_equal(site_url, Gamebookers.new.establish_connection)
  end

#  def test_if_we_get_right_sports_list_it_should_return_24_sports
#    #проверим действительно ли мы получим список видов спорта
#
#    sports=["American Football", "Aussie Rules", "Baseball", "Basketball", "Boxing & MMA", "Cricket", "Cycling", "Darts", "Football", "Golf", "Handball", "Horse Racing", "Ice Hockey", "Motor Sports", "Poker", "Politics", "Rugby", "Snooker & Pool", "Specials", "Summer Olympics", "Table Tennis", "Tennis", "Volleyball", "Winter Sports"]
#    downloaded_sports= @browser.div(:class, "leftNavText").ul(:index=>0).links.map &:text
#    assert_equal(sports, downloaded_sports)
#  end

  def test_list_of_links
   assert_equal(24,@browser.get_list_of_links.size)
  end

end
