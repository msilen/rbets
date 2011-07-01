#encoding: UTF-8
require 'testunit_helper'
require 'rubygems'
require 'matcher/matcher'

class TestMatcher<Test::Unit::TestCase
  def setup
    @matcher=Matcher.new
    Matcher.class_eval do
      def self.synonyms_file=(path)
        @@synonyms_file=path
      end
    end
    Matcher.synonyms_file="test/test_matcher_files/test_synonyms.yml"
  end

  def test_similar_should_return_true_on_equal_strings
    assert @matcher.similar?("FC Dinamo","FC Dinamo")
  end

  def test_similar_should_return_true_if_it_find_synonym
    assert @matcher.similar?("FC Dinamo","Dinamo")
    assert_false @matcher.similar?("FC Dinamo","Luch")
    assert @matcher.similar?("Gimnasia La Plata","Gimnasia LP")
  end

  #проверим что тест возвратит false когда тестовой строки нет в yml файле, и строки сами по себе неодинаковы
  def test_similar_should_return_false_if_original_is_not_in_yml_file
    assert_false @matcher.similar?("Vasya","Petya")
  end


end


