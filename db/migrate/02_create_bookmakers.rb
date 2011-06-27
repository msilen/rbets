class CreateBookmakers < ActiveRecord::Migration
  def self.up
   create_table :bookmakers do |t|
     t.string :name
     t.string :website
   end
  end

  def self.down
    drop_table :bookmakers
  end
end