require 'testunit_helper'

class TestHelper<Test::Unit::TestCase
  include GamebookersHelper

  def test_parse_date_string_to_utc_should_return_Time
    string="Win 	Handicap 	09 Sep 11 02:30 CEST 	Win"
    expected=Time.utc(2011, 9, 9, 0, 30)
    assert_equal(expected, parse_date_string_to_utc(string))
    string="13 Sep 11 01:00 CEST"
    assert_equal(Time.utc(2011, 9, 12, 23, 0), parse_date_string_to_utc(string))
  end

  def test_parse_date_should_raise_error
    string="I am wrong string"
    assert_raise(ArgumentError) { parse_date_string_to_utc(string) }
    string=5
    assert_raise(ArgumentError) { parse_date_string_to_utc(string) }
  end
end
  