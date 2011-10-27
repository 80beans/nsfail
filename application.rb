require 'sinatra'

class Application < Sinatra::Base
  set :root, File.dirname(__FILE__)
  set :views, settings.root + '/templates'
  set :public_folder, settings.root + '/public'

  configure do
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

end
