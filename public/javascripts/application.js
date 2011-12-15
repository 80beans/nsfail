var NSFail = {
  initialize: function() {
    var latlng = new google.maps.LatLng(52.2, 5),
        myOptions = {
          zoom: 8,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        map = new google.maps.Map(document.getElementById('map_canvas'), myOptions),
        tweets = null;

    $.getJSON('fails.json', function(data) {
      console.log(data);
      $('body').twitterticker({
        tweets: data
      });
    })
  }
};

$(NSFail.initialize);
