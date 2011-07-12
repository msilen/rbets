require 'rubygems'
require 'active_record'
require 'yaml'
require 'logger'
DATABASEYML=(RUBY_PLATFORM=="java" ? 'database_jruby.yml' :"database_ruby.yml")

dbconfig = YAML::load(File.open(File.join(File.dirname(__FILE__), DATABASEYML)))
#ActiveRecord::Base.logger=Logger.new(STDERR)
ActiveRecord::Base.establish_connection(dbconfig[DBENV])