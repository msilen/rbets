#encoding: UTF-8
require 'testunit_helper'
require 'rubygems'
require 'matcher/synonyms'
require 'yaml'

class TestSynonyms < Test::Unit::TestCase
  def setup
    @script= Synonyms.new
    Synonyms.class_eval{def self.synonyms_file=(path);@@synonyms_file=path;end}
  end

  def test_load_synonyms_if_exist
    Synonyms.synonyms_file="./test/test_synonyms_files/team_synonyms.yml"
    loaded=@script.load_synonyms_if_exist
    assert_kind_of(Hash, loaded)
    assert !loaded.empty?

  end
  
  def test_load_synonyms_if_exist_should_return_empty_hash_if_file_is_bad
    Synonyms.synonyms_file="./test/test_synonyms_files/bad.yml"
    assert_equal({},@script.load_synonyms_if_exist)
  end

  def test_load_synonyms_if_exist_should_return_empty_hash_if_file_doesnt_exist
    Synonyms.synonyms_file="./test_synonyms_files/not_existed.yml"
    assert_equal({},@script.load_synonyms_if_exist)
  end


end