require 'bundler/capistrano'
require "whenever/capistrano"

set :whenever_command, "bundle exec whenever"
set :application, 'nsfail'
set :branch, 'master'
set :deploy_to, "/home/#{application}/app"

role :app, 'tapirgo.com'
role :web, 'tapirgo.com'
role :db,  'tapirgo.com', :primary => true

ssh_options[:username] = application


set :scm, :git
set :repository, "."
set :deploy_via, :copy
set :copy_strategy, :export

set :use_sudo, false
default_run_options[:pty] = true
ssh_options[:forward_agent] = true


namespace :deploy do
  task :start, :roles => :app do
    run "touch #{current_path}/tmp/restart.txt"
  end

  task :restart, :roles => :app do
    run "touch #{current_path}/tmp/restart.txt"
  end

end
