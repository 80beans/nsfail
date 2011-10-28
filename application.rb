require 'sinatra'
require 'mongoid'
require 'lib/fail'

class Application < Sinatra::Base
  set :root, File.dirname(__FILE__)
  set :views, settings.root + '/templates'
  set :public_folder, settings.root + '/public'

  configure do
     Mongoid.configure do |config|
      name = "nsfail"
      host = "localhost"
      config.master = Mongo::Connection.new.db(name)
      config.slaves = [
        Mongo::Connection.new(host, 27017, :slave_ok => true).db(name)
      ]
      config.persist_in_safe_mode = false
    end

    set :environment, :develop
    set :dump_errors, true
    set :haml, { :ugly=>true }
    set :clean_trace, true
  end

  get '/' do
    haml :index
  end

  get '/application.css' do
    content_type 'text/css', :charset => 'utf-8'
    sass :application, :style => :expanded
  end

  get '/fails.json' do
    return File.read(File.join('fails.json'))
  end

  get '/f.json' do
    Fail.desc(:id).to_json
  end

end
