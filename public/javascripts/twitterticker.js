(function($) {
  $.fn.twitterticker = function(options) {
    var defaults = {
          duration: 2500,
          interval: 5000,
          tweets: {}
        },
        count = 0,
        html = '<ul class="twitterticker">',
        elms = $(this);


    if (elms.length !== 1) return elms;


    $.extend(defaults, options);


    console.log(defaults.tweets);


    if (defaults.tweets.length === 0) return elms;


    for(var i = 0, l = defaults.tweets.length; i < l; ++i) {
      var tweet = defaults.tweets[i];
      html += '<li>' +
        '<a class="avatar" href="http://twitter.com/' + tweet.from_user + '"><img src="' + tweet.profile_image_url + '" alt="' + tweet.from_user + '"></a>' +
        '<blockquote>' + tweet.text + '</blockquote>' +
        '<time datetime="' + tweet.updated_at + '">' + tweet.updated_at + '</time>' +
      '</li>';
    }

    elms.append(html);


    elms.find('time').timeago();

    var container = elms.find('.twitterticker'),
        current = container.find('li:first');


    if (container.find('li').length === 1) return elms;


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
    }).click(function(e) {
      e.preventDefault();
    });


    return elms;
  }
})(jQuery);
