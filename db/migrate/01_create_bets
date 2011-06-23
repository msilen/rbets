class CreateBets < ActiveRecord::Migration
  def self.up
   create_table :bets do |t|
     t.integer :booker_id
     t.string :competitor_one
     t.float :competitor_one_coef
     t.string :competitor_two
     t.float :competitor_two_coef
     t.datetime :event_date
   end
  end

  def self.down
    drop_table :bets
  end
end