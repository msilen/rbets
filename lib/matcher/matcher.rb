require 'rubygems'
DATABASEYML='database_ruby.yml'
require 'db_ar_setup'
require 'config/environment'
require 'ruby-debug'
Debugger.start

class Matcher
  @@synonyms_file="lib/config/team_synonyms.yml"

  def initialize
    @full=[]
  end

  def run
    bets=Bet.all
    bets.each_with_index do |bet, index|
#      puts "#{bet.competitor_one},#{bet.competitor_two}"
      array_without_current_bet=bets.dup #будущий массив без самой ставки(чтобы не сравнивать с собой)
      me=array_without_current_bet.delete_at(index)
      @s=array_without_current_bet.select { |element| (element.event_date==bet.event_date)&&
          (element.bookmaker_id!=bet.bookmaker_id)&&
          (bet.sport==element.sport)&&
          (similar?(bet.competitor_one, element.competitor_one)&&
              similar?(bet.competitor_two, element.competitor_two)) }#@s-массив ставок с одинаковым временем и соперниками
      @full<<[me, @s] unless @s.empty? #массив [[bet,bet][bet,bet]...] где каждая пара - ставка у 1го и 2го букмекера
    end
    margin
  end

#  ((bet.competitor_one!=element.competitor_one)||
#              (bet.competitor_two!=element.competitor_two))

  def similar?(original, test_string)
    raise ArgumentError, "wrong argument, you should pass String objects" unless (original.class==test_string.class)&&(original.class==String)
    return true if original==test_string
    synonyms=YAML.load_file(@@synonyms_file)
    #syn_arr отдельный небольшой массив, содержащий весь набор схожих названий например [dinamo,fcdinamo] [bayer,baier]
    cell=synonyms.detect{|syn_arr|syn_arr.include?(original)} #выберем этот небольшой массив
    return false unless cell
    cell.include? test_string
  end

  def margin

    @full.reject! { |twobets| twobets.last.size!=1 }
    @full.each { |twobets| twobets.flatten! }
    @full.each{|arr|@full.delete([arr.last,arr.first])}#удалим дубликаты (из за полного поиска каждая ставка находит себя и своего напарника из другого букмекера )
    puts "\e[34mTotal bet lines:#{@full.size}\e[0m"
    x1=@full.select { |twobets| !twobets.first.draw.nil?&&!twobets.last.draw.nil? }
    @full -=x1
    puts "lines with 2 outcomes=#{@full.size}"
    arb=0#число найденных вилок
    @full.each do |twobets|
      k1=[twobets.first.competitor_one_coef,twobets.last.competitor_one_coef].max
      k2=[twobets.last.competitor_two_coef,twobets.first.competitor_two_coef].max
        m=(k1+k2)/(k1*k2)
      if m<1
        arb+=1
        puts "==========================================================================="
        puts "#{k1} #{twobets.first.competitor_one}-#{twobets.first.competitor_two} #{k2}"
        puts "margin=#{((1/m)*100-100).round(2)}%"
        puts "==========================================================================="
      end
    end

    puts "lines with 3 outcomes=#{x1.size}"
    x1.each do |twobets|
      k1=[twobets.first.competitor_one_coef,twobets.last.competitor_one_coef].max
      k2=[twobets.last.competitor_two_coef,twobets.first.competitor_two_coef].max
      kx=[twobets.first.draw,twobets.last.draw].max
      margin=(k1*kx+kx*k2+k2*k1)/(k1*k2*kx)
      if margin<1
        arb+=1
        puts "==========================================================================="
        puts "#{k1} #{twobets.first.competitor_one}-#{twobets.first.competitor_two} #{k2},draw=#{kx}"
        puts "margin=#{((1/margin)*100-100).round(2)}%"
        puts "==========================================================================="
      end
    end
    puts "Sorry, no sure bets found" if arb==0
  end
end