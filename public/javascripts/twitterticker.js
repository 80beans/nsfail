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
    
    
    if (elms.length !== 1) return;
    
    
    $.extend(defaults, options);
    
    
    console.log(defaults.tweets);
    
    
    if (defaults.tweets.length === 0) return elms;
    
    
    for(var i = 0, l = defaults.tweets.length; i < l; ++i) {
      var tweet = defaults.tweets[i];
      html += '<li>' + tweet.text + '</li>';
    }
    
    
    elms.append(html);
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
      showNext(current);
      hidePrevious(current);
    }
    
    
    go();
    
    
    var tickerInterval = setInterval(go, defaults.interval);
    
    
    container.mouseover()
  }
})(jQuery);