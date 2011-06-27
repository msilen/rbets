require './lib/config/environment'

namespace :db do
  desc 'Migrate the database'
  task :migrate do
    ActiveRecord::Migrator.migrate('db/migrate')
  end

  desc 'Fill bookmakers table'
  task :fillbook do
    require './lib/bookmaker'
    Bookmaker.create(:name=>"Leonbets",:website => "http://www.leonbets.com")
  end
end