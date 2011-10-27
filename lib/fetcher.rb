require 'twitter'

class Fetcher
  attr_accessor :hashtag

  def initialize(hashtag)
    self.hashtag = hashtag
  end

  def fetch
    search = Twitter::Search.new
    search.hashtag("nsfail").no_retweets.per_page(999).each do |tweet|
      unless Fail.exists?(:conditions => { :id => tweet.id })
        Fail.create(tweet)
      end
    end
  end

end
