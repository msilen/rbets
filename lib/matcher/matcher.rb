require 'rubygems'
DATABASEYML='database_ruby.yml'
require 'db_ar_setup'
require 'config/environment'
require 'ruby-debug'
Debugger.start

class Matcher
  @@synonyms_file="lib/config/team_synonyms.yml"

  def initialize
    @current=[]
  end

  def run
    synonyms=YAML.load_file(@@synonyms_file)
    bets=Bet.all
    leonbets=(Bet.where(%Q[bookmaker_id=1]).select("competitor_one,competitor_two,event_date,sport").group("competitor_one,competitor_two,event_date,sport")).order("competitor_one,competitor_two")
    puts "all events count:#{leonbets.to_a.size}"
    leonbets.each_with_index do |bet, index|
      synonyms_to_current_bet_one=synonyms.detect { |synarr| synarr.include? bet.competitor_one }||[bet.competitor_one] #ищем синонимы для имени 1й команды у текущей ставки
      synonyms_to_current_bet_two=synonyms.detect { |synarr| synarr.include? bet.competitor_two }||[bet.competitor_two]
      current={}
      current[:leonbets], current[:gamebookers]=[], []

      #current - хэш ставок с данными командами на одно и то же событие
      synonyms_to_current_bet_one.each do |synonym_one|
        current[:leonbets]+=Bet.where(%Q(event_date='#{bet.event_date}' AND bookmaker_id =2 AND sport='#{bet.sport}' AND competitor_one=?),synonym_one)
      end

      synonyms_to_current_bet_two.each do |synonym_two|
        current[:leonbets]+=Bet.where(%Q(event_date='#{bet.event_date}' AND bookmaker_id =2 AND sport='#{bet.sport}' AND competitor_two='#{synonym_two}'))
      end
      current[:gamebookers]+=Bet.where(%Q(event_date='#{bet.event_date}' AND bookmaker_id=1 AND sport='#{bet.sport}' AND competitor_one='#{bet.competitor_one}' AND competitor_two='#{bet.competitor_two}'))
      current[:leonbets].uniq! # убрать повторы если есть
      current[:gamebookers].uniq!
      margin(current)
      #bet это текущая итерируемая ставка у Leonbets, current это массив ставок этого же события но у gamebookers

#      array_without_current_bet=bets.dup #будущий массив без самой ставки(чтобы не сравнивать с собой)
#      me=array_without_current_bet.delete_at(index)
#      @s=array_without_current_bet.select { |element| (element.event_date==bet.event_date)&&
#          (element.bookmaker_id!=bet.bookmaker_id)&&
#          (bet.sport==element.sport)&&
#          (similar?(bet.competitor_one, element.competitor_one)&&
#              similar?(bet.competitor_two, element.competitor_two)) } #@s-массив ставок с одинаковым временем и соперниками
#      @full<<[me, @s] unless @s.empty? #массив [[bet,bet][bet,bet]...] где каждая пара - ставка у 1го и 2го букмекера
    end
  end

  def margin(bets_hash)
    iterated_one, matched=*([bets_hash[:gamebookers], bets_hash[:leonbets]].sort_by { |arr| arr.length }) #выбирается наибольший массив(где чаще изменения проводились)
    iterated_one.each do |bet|
      #bet-итерируемая ставка (из того массива, что больше)#bet-итерируемая ставка (из того массива, что больше)#bet-итерируемая ставка (из того массива, что больше)
      bet_two=matched.select { |gbet| gbet.created_at<bet.created_at }.sort_by(&:created_at).last #выбирается последняя измененная  ставка на текущий момент для сравнения
      if bet_two
        if (bet.draw.nil?&&bet_two.draw.nil?)
          k1=[bet.competitor_one_coef, bet_two.competitor_one_coef].max
          k2=[bet.competitor_two_coef, bet_two.competitor_two_coef].max
          m=(k1+k2)/(k1*k2)
          if m<1
            puts "#{bet.sport}================================="
            puts "#{bet.competitor_one} - #{bet.competitor_two}     1=#{bet.competitor_one_coef} X=#{bet.draw} 2=#{bet.competitor_two_coef}"
            puts "#{bet_two.competitor_one} - #{bet_two.competitor_two}     1=#{bet_two.competitor_one_coef} X=#{bet_two.draw} 2=#{bet_two.competitor_two_coef}"
            puts "margin=#{((1/m)*100-100).round(2)}%"
            puts "============================================="
          end
        elsif bet.draw&&bet_two.draw
          k1=[bet.competitor_one_coef, bet_two.competitor_one_coef].max
          k2=[bet.competitor_two_coef, bet_two.competitor_two_coef].max
          kx=[bet.draw, bet_two.draw].max
          m=(k1*kx+kx*k2+k2*k1)/(k1*k2*kx)
          if m<1
            puts "#{bet.sport}================================="
            puts "#{bet.competitor_one} - #{bet.competitor_two}     1=#{bet.competitor_one_coef} X=#{bet.draw} 2=#{bet.competitor_two_coef}"
            puts "#{bet_two.competitor_one} - #{bet_two.competitor_two}     1=#{bet_two.competitor_one_coef} X=#{bet_two.draw} 2=#{bet_two.competitor_two_coef}"
            puts "margin=#{((1/m)*100-100).round(2)}%"
            puts "============================================="
          end
        else
          next
        end
      end
    end
  end

#  ((bet.competitor_one!=element.competitor_one)||
#              (bet.competitor_two!=element.competitor_two))

  def similar?(original, test_string)
    raise ArgumentError, "wrong argument, you should pass String objects" unless (original.class==test_string.class)&&(original.class==String)
    return true if original==test_string
    synonyms=YAML.load_file(@@synonyms_file)
    #syn_arr отдельный небольшой массив, содержащий весь набор схожих названий например [dinamo,fcdinamo] [bayer,baier]
    cell=synonyms.detect { |syn_arr| syn_arr.include?(original) } #выберем этот небольшой массив
    return false unless cell
    cell.include? test_string
  end

end