require 'rubygems'
require 'celerity'

class EventsGetter
  SITE_LIST=['https://www.gamebookers.com/']

  def initialize
  end

  def run
    establish_connection
    get_list_of_links
  end

  def establish_connection
    @browser=Celerity::Browser.new
    puts "receiving data..."
    @browser.goto(SITE_LIST[0])
  end

  def get_list_of_links
    links= @browser.div(:class, "leftNavText").links
    puts links
  end
end
