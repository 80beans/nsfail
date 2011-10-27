require 'mongoid'

class Fail
  include Mongoid::Document
  include Mongoid::Timestamps

  field :created_at
  field :from_user
  field :from_user_id
  field :geo, :type => Hash, :default => {}
  field :iso_language_code
  field :medatada, :type => Hash, :default => {}
  field :profile_image_url
  field :source
  field :text

  def self.create_from_tweet(tweet)
    new_fail = {}
    self.fields.each do |fld, metadata|
      new_fail[fld] = tweet[fld]
    end
    #if tweet['geo'].present? && tweet['geo']['type'] == 'Point'
    #  new_fail['geo'] = tweet['geo']
    #elsif city_coordinates = find_city_coordinates(tweet['text'])
    #  new_fail['geo'] = { :coordinates => [city_coordinates], :type => 'Point'}
    #end
    create!(new_fail)
  end

  def self.find_city_coordinates(text)

  end
end
