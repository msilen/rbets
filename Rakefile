DATABASEYML=(RUBY_PLATFORM=="java" ? 'database_jruby.yml' :"database_ruby.yml")
require './lib/config/environment'
$LOAD_PATH.unshift File.expand_path("./lib", File.dirname(__FILE__))

namespace :db do
  desc 'Migrate the database'
  task :migrate do
    ActiveRecord::Migrator.migrate('db/migrate')
  end

  desc 'Fill bookmakers table'
  task :fillbook do
    require "./lib/db_ar_setup"
    Bookmaker.create(:name=>"Leonbets", :website => "http://www.leonbets.com")
    Bookmaker.create(:name=>"Gamebookers", :website => "https://www.gamebookers.com")
  end
end