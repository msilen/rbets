require 'rbets'
require 'test/unit'
require 'redgreen'
require 'mocha'

SITE_LIST=['https://www.gamebookers.com/']

class TestEventsGetter < Test::Unit::TestCase
  def test_should_return_url_on_establishing_connection
    first_site=EventsGetter::SITE_LIST[0]
    @browser=Celerity::Browser.new
    Celerity::Browser.expects(:new).returns(@browser)
    @browser.expects(:goto).with(SITE_LIST[0]).once.returns(SITE_LIST[0])
    assert_equal(first_site, EventsGetter.new.establish_connection)
    assert @browser #browser instance variable shoud be defined
  end

  #handling exceptions
end
