require 'rubygems'
DATABASEYML='database_ruby.yml'
require 'db_ar_setup'
require 'config/environment'
require 'amatch'
require 'ruby-debug'

class Synonyms
  include Amatch

  def initialize
    @bets=Bet.all #все ставки
    @similar_events={} #хэш похожих событий
  end

  def run
    @bets.each do |current_bet|
      @bets.each do |compared_bet|
        if (current_bet.event_date==compared_bet.event_date&&
            current_bet.bookmaker_id!=compared_bet.bookmaker_id&&
            current_bet.sport==compared_bet.sport&&
            (similar?(current_bet.competitor_one, compared_bet.competitor_one)||similar?(current_bet.competitor_two, compared_bet.competitor_two)))
          unless @similar_events[compared_bet]
            @similar_events[current_bet]||=[] #Хэш [#Bet(ставка букмек.№1)=>[#Bet(ставки других букмекеров , ... ]]
            @similar_events[current_bet]<<compared_bet #не добавляем , если ставка в обратную сторону уже есть, чтобы не плодить копии вроде (spartak=>spartac,spartac=>spartak), метод similar? выдает идентичный результат независимо от порядка входящих аргументов
          end
        end
      end
    end
    @similar_events.delete_if { |betk, betv| betk.competitor_one==betv.first.competitor_one&&betk.competitor_two==betv.first.competitor_two }.size #удалим полные совпадения по названиям команд
    synonyms=save_to_yaml
    puts synonyms.size
  end

  def save_to_yaml
    synonyms={}
    @similar_events.each do |bet_key, bet_value|
      raise "Unexpected Error, bet_value array size is greater then 1" if bet_value.size!=1
      synonyms[bet_key.competitor_one]=bet_value.first.competitor_one
      synonyms[bet_key.competitor_two]=bet_value.first.competitor_two
    end

    synonyms.delete_if{|k,v|k==v} #удаляются полные совпадения из события (до этого удалялись только полные совпадения по обоим соперникам)

    File.open("./lib/config/team_synonyms.yml", 'a') do |f|
      YAML.dump(synonyms, f)
    end
    synonyms
  end

  def similar?(original, test_string)
    raise ArgumentError, "wrong argument, you should pass String objects" unless (original.class==test_string.class)&&(original.class==String)
    shorter_string, longer_string=*[original, test_string].sort_by { |string| string.size } #выберем меньшую по длине строку для сравнения (чтобы определять вероятность по ней)
    matcher=Levenshtein.new(shorter_string.downcase)
    distance=matcher.match(longer_string.downcase)
    longest_substring=LongestSubstring.new(shorter_string.downcase).match(longer_string) #размер самой длинной подстроки в сравниваемых строках
#    puts distance.to_s+" "+longest_substring.to_s
    (distance<longer_string.size/1.5)&&(longest_substring > shorter_string.length/2) #строки схожи если расстояние левенштейна меньше чем длина короткой сравниваемой строки /1.5
  end

end
