require 'rubygems'
require 'active_record'
require 'yaml'
require 'logger'


dbconfig = YAML::load(File.open(File.join(File.dirname(__FILE__), DATABASEYML)))
#ActiveRecord::Base.logger=Logger.new(STDERR)
ActiveRecord::Base.establish_connection(dbconfig[DBENV])