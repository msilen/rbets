require 'rubygems'
DATABASEYML='database_ruby.yml'
require 'db_ar_setup'
require 'config/environment'

class Synonyms
  def initialize
    @bets=Bet.all
    @full=[]
  end

  def run
    @bets.each_with_index do |bet, index|
      array_without_current_bet=@bets.dup
      me=array_without_current_bet.delete_at(index)
      @matching_bets=array_without_current_bet.select { |element| (element.event_date==bet.event_date)&&
          (element.bookmaker_id!=bet.bookmaker_id)&&
          (bet.sport==element.sport) }
      @full<<[me, @matching_bets] unless @matching_bets.empty?||@matching_bets.nil?
    end


    @full.each do |synonym|
      File.open("./lib/config/team_synonyms.yml", 'a') do |f|
        YAML.dump({synonym.first.competitor_one => synonym.last.map(&:competitor_one)}, f)
      end
    end
  end
end
