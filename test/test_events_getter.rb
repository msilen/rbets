require 'rbets'
require 'test/unit'
require 'redgreen'

class TestEventsGetter < Test::Unit::TestCase
  def test_establishing_connection
    assert_equal(EventsGetter::SITE_LIST[0],EventsGetter.new.run)
  end
end
