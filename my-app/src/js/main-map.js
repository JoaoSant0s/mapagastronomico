var defaultContent = '<div> <h2>{0} <img src={1} alt="Smiley face" width="200"> </h2> <div> {2} </div> </div>';
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

  initMarkers(map);
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
  var zoom = 12;

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

function initMarkers(map) {
  firebaseWrapper.getMarkersDefinitions().then((markersDefinition) => {

    var markers = createMarkers(markersDefinition, map);

    var clusters = MakeClusterer(markersDefinition, markers);

    clusters = Object.values(clusters);

    clusters.forEach(group => {
      if (group.length > 1) {
        setRoutes(map, group);
      }
    });
  });
}

function createMarkers(markersDefinition, map) {
  var markers = [];
  for (let i = 0; i < markersDefinition.length; i++) {
    const element = markersDefinition[i];

    var marker = createMarker(element, map);
    markers.push(marker);
  }
  return markers;
}

function MakeClusterer(markersDefinition, markers) {
  var cluster = {};

  for (let i = 0; i < markersDefinition.length; i++) {
    const element = markersDefinition[i].location;

    var key = element.city + "_" + element.neighborhood;

    if (cluster.hasOwnProperty(key)) {
      cluster[key].push(markers[i]);
    } else {
      cluster[key] = [markers[i]];
    }
  }

  return cluster;
}

function setRoutes(map, markers) {
  var combinations = _makeCombinations(markers);

  combinations.forEach(tuple => {
    var directionsRenderer = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: "red"
      },
      suppressMarkers: true
    });

    const directionsService = new google.maps.DirectionsService;
    directionsRenderer.setMap(map);

    var origin = {
      lat: tuple.origin.position.lat(),
      lng: tuple.origin.position.lng(),
    };

    var destination = {
      lat: tuple.destination.position.lat(),
      lng: tuple.destination.position.lng(),
    };

    directionsService.route({
      origin: origin,
      destination: destination,
      waypoints: [],
      optimizeWaypoints: true,
      travelMode: google.maps.DirectionsTravelMode.WALKING
    }, (response, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
      } else {
        console.log('Directions request failed due to ' + status);
        console.log(tuple);
      }
    });
  });
}

function _makeCombinations(markers) {
  var combinations = [];

  for (let i = 0; i < markers.length - 1; i++) {
    for (let j = i + 1; j < markers.length; j++) {
      var newOrigin = markers[i];
      var newDestination = markers[j];

      var filtered = combinations.filter(function (element) {
        return (element.origin === newOrigin && element.Destination === newDestination) || element.origin === newDestination && element.Destination === newOrigin;
      }).length > 0;

      if (!filtered) {
        combinations.push({
          origin: newOrigin,
          destination: newDestination
        });
      }
    }
  }

  return combinations
}

function createMarker(markerData, map) {

  var def = {
    position: markerData.location.position,
    map: map
  }

  def = checkUpdateIcon(def, markerData)

  var marker = new google.maps.Marker(def);

  attachMessage(marker, markerData.content);
  return marker;
}

function checkUpdateIcon(def, markerData) {
  var icon = markerData.icon;

  if (icon) {
    if (icon.color) {
      def.icon = {
        url: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + icon.color
      }
    } else if (icon.sprite) {
      def.icon = {
        url: icon.sprite
      }
    }
  }

  return def;
}

function attachMessage(marker, content) {
  var infowindow = new google.maps.InfoWindow({
    content: defaultContent.format(content.title, content.img, content.body)
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
