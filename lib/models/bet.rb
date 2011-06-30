class Bet < ActiveRecord::Base
  validates_presence_of :sport,:competitor_one,:competitor_two, :competitor_one_coef,:competitor_two_coef,:event_date
  #событие с одной и той же датой и соперником уникально (не допускать дублицирования записей при повторном сканировании)
  validates_uniqueness_of :competitor_one, :scope =>[:competitor_two,:event_date,:bookmaker_id]
  belongs_to :bookmaker
end