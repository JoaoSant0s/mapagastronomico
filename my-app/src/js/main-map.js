var defaultContent = '<div id="content"><h1 id="firstHeading" class="firstHeading"> {0} </h1> <div id="bodyContent"> {1} </div></div>';
var infowindows = [];

var firebaseWrapper = new FirebaseWrapper();

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined' ?
        args[number] :
        match;
    });
  };
}

function init() {
  var map = initMap();

  setMapHeight();

  initMarkets(map);
}

function setMapHeight() {
  $("#map").height(window.innerHeight - 170 + "px");

  $(window).resize(function () {
    if (map) {
      console.log(window.innerHeight);
      $("#map").height(window.innerHeight - 170 + "px");

    }
  });
}

function initMap() {
  var uluru = {
    lat: -8.05428,
    lng: -34.8813
  };
  var zoom = 14;

  var styles = [{
      "elementType": "geometry",
      "stylers": [{
        "color": "#ebe3cd"
      }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#523735"
      }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#f5f1e6"
      }]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#c9b2a6"
      }]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#dcd2be"
      }]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#ae9e90"
      }]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [{
        "color": "#dfd2ae"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{
        "color": "#dfd2ae"
      }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#93817c"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#a5b076"
      }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#447530"
      }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{
        "color": "#f5f1e6"
      }]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{
        "color": "#fdfcf8"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
        "color": "#f8c967"
      }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#e9bc62"
      }]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [{
        "color": "#e98d58"
      }]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry.stroke",
      "stylers": [{
        "color": "#db8555"
      }]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#806b63"
      }]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [{
        "color": "#dfd2ae"
      }]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#8f7d77"
      }]
    },
    {
      "featureType": "transit.line",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#ebe3cd"
      }]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [{
        "color": "#dfd2ae"
      }]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#b9d3c2"
      }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#92998d"
      }]
    }
  ]

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: zoom,
    center: uluru,
    styles: styles,
    streetViewControl: false,
    mapTypeControl: false,
    zoomControl: true,
    scaleControl: true,
    rotateControl: true,
    fullscreenControl: true
  });

  return map;
}

function initMarkets(map) {
  firebaseWrapper.getMarketsDefinitions().then((marketsDefinition) => {

    for (let i = 0; i < marketsDefinition.length; i++) {
      const element = marketsDefinition[i];

      createMarket(element, map);
    }
    
  });
}

function createMarket(marketData, map) {
  var marker = new google.maps.Marker({
    position: marketData.position,
    map: map
  });

  attachMessage(marker, marketData.content);
}

function attachMessage(marker, content) {
  var infowindow = new google.maps.InfoWindow({
    content: defaultContent.format(content.title, content.body)
  });
  infowindows.push(infowindow);

  marker.addListener('click', function () {
    for (let i = 0; i < infowindows.length; i++) {
      const element = infowindows[i];
      element.close();
    }
    infowindow.open(marker.get('map'), marker);
    fixInfoWindowCloseButton();
  });
}

function fixInfoWindowCloseButton() {
  setTimeout(() => {
    var value = document.querySelector('[aria-label="Fechar"]');

    if (value) {
      value.style.top = '0px';
      value.style.right = '0px';
      var img = value.querySelector('img');
      if (img) {
        img.style.width = '20px';
        img.style.height = '20px';
        img.style.margin = '5px';
      }
    }
  }, 0);
}
