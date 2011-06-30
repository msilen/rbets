#encoding: UTF-8
require 'testunit_helper'
require 'rubygems'
require 'matcher/matcher'

class TestMatcher<Test::Unit::TestCase
  def setup
    @matcher=Matcher.new
  end

  def test_similar_should_properly_find_similar_strings
    orig,test="Dinamo",nil
    assert_raise(ArgumentError){@matcher.similar?(orig,test)}

    orig=test="Dinamo"
    assert @matcher.similar?(orig,test)

    orig="Turkey"
    test="Tromso"
    assert_false @matcher.similar?(orig,test)

    orig="FK Karabakh Agdam"
    test="Karabakh"
    assert @matcher.similar?(orig,test)

    orig="Banga Gargzdai"
    test="Banga"
    assert @matcher.similar?(orig,test)

    orig="Banga Gargzdai"
    test="Trans Narva"
    assert_false @matcher.similar?(orig,test)

    orig="JK Trans Narva"
    test="Trans Narva"
    assert @matcher.similar?(orig,test)

    orig="Aalesund"
    test="Aalesunds"
    assert @matcher.similar?(orig,test)

    orig="Neath"
    test="Zeta"
    assert_false @matcher.similar?(orig,test)

    orig="FC Milsami"
    test="FC Ulysses"
    assert_false @matcher.similar?(orig,test)

    orig="NK Varteks"
    test="Varazdin"
    assert_false @matcher.similar?(orig,test)

    orig="FC Lusitanos"
    test="FC Lusitans"
    assert @matcher.similar?(orig,test)

    orig="England (U17)"
    test="England U17"
    assert @matcher.similar?(orig,test)
    test="Germany U17"
    assert_false @matcher.similar?(orig,test)
    test="USA U17"
    assert_false @matcher.similar?(orig,test)

    orig="Tromso"
    test="France"
    assert_false @matcher.similar?(orig,test)

    orig="Jagiellonia"
    test="Lithuania"
    assert_false @matcher.similar?(orig,test)
    test="Jagiellonia Bialystok"
    assert @matcher.similar?(orig,test)

    orig="Novak Djokovic"
    test="Djokovic N."
    assert @matcher.similar?(orig,test)

    orig="KS Flamurtari Vlorë"
    test="Flamurtari"
    assert @matcher.similar?(orig,test)

    orig="Olimpia Ljubljana"
    test="Olimpija"
    assert @matcher.similar?(orig,test)

    orig="Glentoran FC Belfast"
    test="Glentoran"
    assert @matcher.similar?(orig,test)

    orig="UN Kaerjeng 97"
    test="Kaerjeng"
    assert @matcher.similar?(orig,test)

    orig="Tre Penne"
    test="SP Tre Penne"
    assert @matcher.similar?(orig,test)
  end
end


