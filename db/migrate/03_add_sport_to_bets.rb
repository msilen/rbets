class AddSportToBets < ActiveRecord::Migration
  def self.up
    add_column :bets, :sport, :string
  end

  def self.down
    remove_column :bets, :sport
  end
end