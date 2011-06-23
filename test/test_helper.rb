require 'testunit_helper'

class TestHelper<Test::Unit::TestCase
  def test_parse_date_string_to_utc
    string="Win 	Handicap 	09 Sep 11 02:30 CEST 	Win"
    expected=Time.utc(2011,9,9,0,30)
    assert_equal(expected,GamebookersHelper::parse_date_string_to_utc(string))
  end
end