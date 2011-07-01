#encoding: UTF-8
require 'testunit_helper'
require 'rubygems'
require 'matcher/synonyms'
require 'yaml'

class TestSynonyms < Test::Unit::TestCase
  def setup
    @script= Synonyms.new
    Synonyms.class_eval {
      def self.synonyms_file=(path)
        ; @@synonyms_file=path;
      end }
  end

  def test_load_synonyms_if_exist
    Synonyms.synonyms_file="./test/test_synonyms_files/team_synonyms.yml"
    loaded=@script.load_synonyms_if_exist
    assert_kind_of(Hash, loaded)
    assert !loaded.empty?

  end

  def test_load_synonyms_if_exist_should_return_empty_hash_if_file_is_bad
    Synonyms.synonyms_file="./test/test_synonyms_files/bad.yml"
    assert_equal({}, @script.load_synonyms_if_exist)
  end

  def test_load_synonyms_if_exist_should_return_empty_hash_if_file_doesnt_exist
    Synonyms.synonyms_file="./test_synonyms_files/not_existed.yml"
    assert_equal({}, @script.load_synonyms_if_exist)
  end

  def test_similar_should_properly_find_similar_strings
    orig, test="Dinamo", nil
    assert_raise(ArgumentError) { @script.similar?(orig, test) }

    orig=test="Dinamo"
    assert @script.similar?(orig, test)

    orig="Turkey"
    test="Tromso"
    assert_false @script.similar?(orig, test)

    orig="FK Karabakh Agdam"
    test="Karabakh"
    assert @script.similar?(orig, test)

    orig="Banga Gargzdai"
    test="Banga"
    assert @script.similar?(orig, test)

    orig="Banga Gargzdai"
    test="Trans Narva"
    assert_false @script.similar?(orig, test)

    orig="JK Trans Narva"
    test="Trans Narva"
    assert @script.similar?(orig, test)

    orig="Aalesund"
    test="Aalesunds"
    assert @script.similar?(orig, test)

    orig="Neath"
    test="Zeta"
    assert_false @script.similar?(orig, test)

    orig="FC Milsami"
    test="FC Ulysses"
    assert_false @script.similar?(orig, test)

    orig="NK Varteks"
    test="Varazdin"
    assert_false @script.similar?(orig, test)

    orig="FC Lusitanos"
    test="FC Lusitans"
    assert @script.similar?(orig, test)

    orig="England (U17)"
    test="England U17"
    assert @script.similar?(orig, test)
    test="Germany U17"
    assert_false @script.similar?(orig, test)
    test="USA U17"
    assert_false @script.similar?(orig, test)

    orig="Tromso"
    test="France"
    assert_false @script.similar?(orig, test)

    orig="Jagiellonia"
    test="Lithuania"
    assert_false @script.similar?(orig, test)
    test="Jagiellonia Bialystok"
    assert @script.similar?(orig, test)

    orig="Novak Djokovic"
    test="Djokovic N."
    assert @script.similar?(orig, test)

    orig="KS Flamurtari Vlorë"
    test="Flamurtari"
    assert @script.similar?(orig, test)

    orig="Olimpia Ljubljana"
    test="Olimpija"
    assert @script.similar?(orig, test)

    orig="Glentoran FC Belfast"
    test="Glentoran"
    assert @script.similar?(orig, test)

    orig="UN Kaerjeng 97"
    test="Kaerjeng"
    assert @script.similar?(orig, test)

    orig="Tre Penne"
    test="SP Tre Penne"
    assert @script.similar?(orig, test)
  end


end