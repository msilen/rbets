class Bookmaker < ActiveRecord::Base
  validates_uniqueness_of :name,:website
  has_many :bets
end