require 'rubygems'
require 'celerity'

class EventsGetter
  SITE_LIST=['https://www.gamebookers.com/']
  def initialize
  end

  def run
    browser=Celerity::Browser.new
    puts "receiving data..."
    browser.goto(SITE_LIST[0])
  end
end