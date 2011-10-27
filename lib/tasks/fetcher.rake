require 'config/cities'
require 'lib/fetcher'
require 'lib/fail'
require 'application'

task :fetch do
  Fetcher.new('nsfail').fetch
end
