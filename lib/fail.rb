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
    create!(new_fail)
  end

end
