class CreateBets < ActiveRecord::Migration
  def self.up
   create_table :bets do |t|
     t.integer :bookmaker_id
     t.string :competition
     t.string :competitor_one
     t.float :competitor_one_coef
     t.string :competitor_two
     t.float :competitor_two_coef
     t.float :draw
     t.datetime :event_date
   end
  end

  def self.down
    drop_table :bets
  end
end