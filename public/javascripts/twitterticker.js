(function($) {
  $.fn.twitterticker = function(options) {
    var defaults = {
          duration: 1000,
          interval: 6000,
          tweets: {}
        },
        count = 0,
        html = '<ul class="twitterticker">',
        elms = $(this);


    if (elms.length !== 1) return elms;


    $.extend(defaults, options);


    if (defaults.tweets.length === 0) return elms;


    for(var i = 0, l = defaults.tweets.length; i < l; ++i) {
      var tweet = defaults.tweets[i];
      html += '<li>' +
        '<a class="avatar" href="http://twitter.com/' + tweet.from_user + '"><img src="' + tweet.profile_image_url + '" alt="' + tweet.from_user + '"></a>' +
        '<blockquote>' + formatTweet(tweet.text) + '</blockquote>' +
        '<p class="meta">' +
          '<a href="http://twitter.com/' + tweet.from_user + '">@' + tweet.from_user + '</a> tweette dit ' +
          '<time datetime="' + tweet.updated_at + '">' + tweet.updated_at + '</time>' +
        '</p>' +
      '</li>';
    }

    elms.append(html);


    elms.find('time').timeago();

    var container = elms.find('.twitterticker'),
        current = container.find('li:first');


    if (container.find('li').length === 1) return elms;


    function formatTweet(tweet) {
      tweet = tweet.replace(/((http)+(s)?:\/\/[^<>\s]+)/ig, '<a href="$1" target="_blank">$1</a>');
      tweet = tweet.replace(/[@]+([A-Za-z0-9-_]+)/ig, '<a href="http://twitter.com/$1" target="_blank">@$1</a>');
      return tweet.replace(/[#]+([^\s]+)/ig, function(str, p1, offset, s){
        if (p1.toLowerCase() == 'nsfail')
          return '<a href="http://twitter.com/search?q=%23' + p1 + '" target="_blank" class="nsfailmatch">#' + p1 + '</a>';
        return '<a href="http://twitter.com/search?q=%23' + p1 + '" target="_blank">#' + p1 + '</a>';
      });
    }


    function showNext(elm) {
      elm.next().fadeIn(0).animate({
        bottom: '0px'
      }, defaults.duration, null, function() {
        container.append(elm);
        current = container.find('li:first');
      });
    }



    function hidePrevious(elm) {
      elm.fadeOut(defaults.duration, function() {
        elm.css('bottom', '-' + (elm.outerHeight() + 20) + 'px');
      });
    }


    function go() {
      hidePrevious(current);
      showNext(current);
    }


    go();


    var tickerInterval = setInterval(go, defaults.interval);


    container.mouseenter(function() {
      clearInterval(tickerInterval);
      tickerInterval = null;
    }).mouseleave(function() {
      if (tickerInterval !== null) return;
      tickerInterval = setInterval(go, defaults.interval);
    });


    return elms;
  }
})(jQuery);
