require 'rubygems'
require 'db_ar_setup'
require 'amatch'
require 'ruby-debug'
Debugger.start

class Synonyms
  include Amatch
  @@synonyms_file="lib/config/team_synonyms.yml"

  def initialize
    @bets=Bet.all #все ставки
    @similar_events={} #инициализируем хэш похожих событий (будет составляться в методе run)
  end

  def run
    #поиск одинаковых линий в базе данных, с разными букмекерами, составление из него хэша соответствий.
    @bets.length.times do #итерируем каждый шаг
      current_bet=@bets.shift #на каждом шагу удаляем ставку, которую уже проверили (а также задается ставка, с которой будут сравниваться остальные)
      puts @similar_events.size if @similar_events.size%10==0&&@similar_events.size>0
      compared_bets=Bet.where("event_date='#{current_bet.event_date}' AND bookmaker_id !=#{current_bet.bookmaker_id} AND sport='#{current_bet.sport}'")
      compared_bets.each do |psb| #Perhaps Similar Bet
        if (similar?(current_bet.competitor_one, psb.competitor_one)||similar?(current_bet.competitor_two, psb.competitor_two))
          unless @similar_events[psb] #не добавляем , если ставка в обратную сторону уже есть, чтобы не плодить копии вроде (spartak=>spartac,spartac=>spartak), метод similar? выдает идентичный результат независимо от порядка входящих аргументов
            @similar_events[current_bet]||=[] #Хэш [#Bet(ставка букмек.№1)=>[#Bet(ставки других букмекеров , ... ]]
            @similar_events[current_bet]<<psb
          end
        end
      end
#      @bets.each do |compared_bet|
#        if (current_bet.event_date==compared_bet.event_date&&
#            current_bet.bookmaker_id!=compared_bet.bookmaker_id&&
#            current_bet.sport==compared_bet.sport&&
#            (similar?(current_bet.competitor_one, compared_bet.competitor_one)||similar?(current_bet.competitor_two, compared_bet.competitor_two)))
#        end
#      end
    end
    puts "similar events:#{@similar_events.size}"
    @similar_events.delete_if { |betk, betv| betk.competitor_one==betv.first.competitor_one&&betk.competitor_two==betv.first.competitor_two }.size #удалим полные совпадения по названиям команд
    synonyms=save_to_yaml
    puts synonyms.size
  end

  def load_synonyms_if_exist
    begin
      synonyms=YAML.load_file @@synonyms_file
      synonyms=[] unless synonyms.instance_of? Array
    rescue Errno::ENOENT
      return []
    end
    synonyms
  end

  def save_to_yaml
    synonyms_new=[]
    @similar_events.each_with_index do |event_array, index| #similar_events- хэш объектов Bet
      synonyms_new[index*2]=[event_array[0].competitor_one] #текущая команда1, для которой добавляются синонимы
      synonyms_new[index*2]+=event_array[1].map(&:competitor_one).uniq #добавляется массив команд-синонимов ["dinamo"]+["dina","Dinam"]
      synonyms_new[index*2+1]=[event_array[0].competitor_two] #аналогично для команды2
      synonyms_new[index*2+1]+=event_array[1].map(&:competitor_two).uniq
    end

    synonyms_new.map! { |subarray_synonyms| subarray_synonyms[0]==subarray_synonyms[1] ? nil : subarray_synonyms }.compact!
    debugger
    #очистка дубликатов синонимов
    s=[]
    h=synonyms_new.map { |sub| (synonyms_new.map { |mat| (sub+mat).uniq.compact unless (sub&mat).empty? }.compact.flatten.uniq) }
    h.each { |sub| s<<sub unless s.any? { |sub2| !(sub2&sub).empty? } }
    debugger
#    old_synonyms=load_synonyms_if_exist #уже имеющиеся синонимы, загруженные из файла
    synonyms=s

    File.open(@@synonyms_file, 'w') do |f|
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
    (distance<longer_string.size/1.5)&&(longest_substring > shorter_string.length/2.3) #строки схожи если расстояние левенштейна меньше чем длина короткой сравниваемой строки /1.5
  end

end
