require 'rubygems'
DATABASEYML='database_ruby.yml'
require 'db_ar_setup'
require 'amatch'
require 'config/environment'
#require 'ruby-debug'
#Debugger.start

class Matcher
  include Amatch

  def initialize
    @full=[]
  end

  def run
    bets=Bet.all
    bets.each_with_index do |bet, index|
#      puts "#{bet.competitor_one},#{bet.competitor_two}"
      array_without_current_bet=bets.dup #массив без самой ставки(чтобы не сравнивать с собой)
      me=array_without_current_bet.delete_at(index)
      @s=array_without_current_bet.select { |element| (element.event_date==bet.event_date)&&
          (element.bookmaker_id!=bet.bookmaker_id)&&
          (bet.sport==element.sport)&&
          (similar?(bet.competitor_one, element.competitor_one)||
              similar?(bet.competitor_two, element.competitor_two)) }
      @full<<[me, @s] unless @s.empty?
    end
    puts @full.size
    margin
  end

#  ((bet.competitor_one!=element.competitor_one)||
#              (bet.competitor_two!=element.competitor_two))

  def similar?(original, test_string)
    raise ArgumentError, "wrong argument, you should pass String objects" unless (original.class==test_string.class)&&(original.class==String)
    shorter_string, longer_string=*[original, test_string].sort_by { |string| string.size } #выберем меньшую по длине строку для сравнения (чтобы определять вероятность по ней)
    matcher=Levenshtein.new(shorter_string.downcase)
    distance=matcher.match(longer_string.downcase)
    longest_substring=LongestSubstring.new(shorter_string.downcase).match(longer_string) #размер самой длинной подстроки в сравниваемых строках
#    puts distance.to_s+" "+longest_substring.to_s
    (distance<longer_string.size/1.5)&&(longest_substring > shorter_string.length/2.3) #строки схожи если расстояние левенштейна меньше чем длина короткой сравниваемой строки /1.5
  end

  def margin
    @full.reject! { |twobets| twobets.last.size!=1 }
    @full.each { |twobets| twobets.flatten! }
    x1=@full.select { |twobets| !twobets.first.draw.nil?&&!twobets.last.draw.nil? }
    @full -=x1
    puts "new_size=#{@full.size}"
    @full.each do |twobets|
      k1=[twobets.first.competitor_one_coef,twobets.last.competitor_one_coef].max
      k2=[twobets.last.competitor_two_coef,twobets.first.competitor_two_coef].max
        m=(k1+k2)/(k1*k2)
      if m<1
        puts "==========================================================================="
        puts "#{k1} #{twobets.first.competitor_one}-#{twobets.first.competitor_two} #{k2}"
        puts "margin=#{((1/m)*100-100).round(2)}%"
        puts "==========================================================================="
      end
    end

    x1.each do |twobets|
      k1=[twobets.first.competitor_one_coef,twobets.last.competitor_one_coef].max
      k2=[twobets.last.competitor_two_coef,twobets.first.competitor_two_coef].max
      kx=[twobets.first.draw,twobets.last.draw].max
      margin=(k1*kx+kx*k2+k2*k1)/(k1*k2*kx)
      if margin<1
        puts "==========================================================================="
        puts "#{k1} #{twobets.first.competitor_one}-#{twobets.first.competitor_two} #{k2},draw=#{kx}"
        puts "margin=#{((1/margin)*100-100).round(2)}%"
        puts "==========================================================================="
      end
    end
  end
end