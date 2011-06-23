require 'rubygems'
require 'active_record'
require 'yaml'


dbconfig = YAML::load(File.open(File.join(File.dirname(__FILE__), 'database.yml')))
ActiveRecord::Base.establish_connection(dbconfig)