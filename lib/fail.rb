require 'mongoid'

class Fail
  include Mongoid::Document
  include Mongoid::Timestamps

  field :created_at
  field :from_user
  field :from_user_id
  field :geo, :type => Hash, :default => {}
  field :iso_language_code
  field :profile_image_url
  field :source
  field :text

  index [[ 'geo.coordinates', Mongo::GEO2D ]], :min => -180, :max => 180

  scope :search, lambda { |coordinates|
    where({
      "geo" => {
        "$within" => {
          "$center" => [
            coordinates,
            '100'
          ]
        }
      }
    })
  }

  def self.create_from_tweet(tweet)
    new_fail = {}
    self.fields.each do |fld, metadata|
      new_fail[fld] = tweet[fld]
    end
    if tweet['geo'].present? && tweet['geo']['type'] == 'Point'
      new_fail['geo'] = tweet['geo']
    elsif city_coordinates = find_city_coordinates(tweet['text'])
      new_fail['geo'] = { :coordinates => [city_coordinates], :type => 'Point'}
    end
    create!(new_fail)
  end

  def self.find_city_coordinates(text)
    CITIES.each do |city|
      if text.downcase.include?(" #{city} ")
        return CITIES_GEO[city].map{ |coo| coo.to_f }
      end
    end
    return nil
  end

end
