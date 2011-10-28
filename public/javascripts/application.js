$(document).ready(function(){
  NSFail.initialize();
});

var NSFail = {
  initialize: function() {
    var latlng = new google.maps.LatLng(52.2, 5);
    var myOptions = {
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

    var tweets = null;

    $.getJSON('fails.json', function(data) {
      $('body').twitterticker({
        tweets: data
      });
    })
  }
};
