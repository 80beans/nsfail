require 'sinatra'

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
    scss :application, :style => :expanded
  end

end
