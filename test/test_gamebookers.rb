require 'testunit_helper'
require 'gamebookers'
require 'mocha'
DATABASEYML='database_jruby.yml'
DBENV="test"
require 'db_ar_setup'
require 'config/environment'

class TestGamebookers < Test::Unit::TestCase
  def setup
    @browser=Gamebookers.new
  end

  def test_establish_connection_should_go_to_the_website
    site="https://www.gamebookers.com"
    bookmaker=Bookmaker.new(:name =>"Gamebookers", :website =>site)
    Bookmaker.expects(:where).with(:name =>"Gamebookers").returns([bookmaker])
    @browser.expects(:goto).with(site)
    @browser.establish_connection
  end


#  def test_if_we_get_right_sports_list_it_should_return_24_sports
#    проверим действительно ли мы получим список видов спорта
#    omit "change"
#    sports=["American Football", "Aussie Rules", "Baseball", "Basketball", "Boxing & MMA", "Cricket", "Cycling", "Darts", "Football", "Golf", "Handball", "Horse Racing", "Ice Hockey", "Motor Sports", "Poker", "Politics", "Rugby", "Snooker & Pool", "Specials", "Summer Olympics", "Table Tennis", "Tennis", "Volleyball", "Winter Sports"]
#    downloaded_sports= @browser.div(:class, "leftNavText").ul(:index=>0).links.map &:text
#    assert ((sports&downloaded_sports)==downloaded_sports) #проверка нет ли "лишних" пересечением массивов.
#  end

end

