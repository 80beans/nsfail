require 'twitter'

class Fetcher
  attr_accessor :hashtags

  # hashtags must be an Array containing hashtags or a String
  def initialize(hashtags = "nsfail")
    self.hashtags = hashtags
  end

  def fetch
    fetch_tweets(hashtags.to_a)
  end

  def fetch_tweets(tags)
    search = Twitter::Search.new
    tags.each do |tag|
      search.hashtag(tag)
    end
    search.no_retweets.per_page(999).each do |tweet|
      unless Fail.exists?(:conditions => { :id => tweet.id })
        Fail.create_from_tweet(tweet)
      end
    end
  end
  
end
