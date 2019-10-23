var defaultContent = '<div id="content"><h1 id="firstHeading" class="firstHeading"> {0} </h1> <div id="bodyContent"> {1} </div></div>';
var infowindows = [];

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
        });
    };
}

function init() {
    console.log("init");

    var map = initMap()

    initMarkets(map);
}

function initMap() {
    console.log("initMap");

    var uluru = { lat: -8.05428, lng: -34.8813 };
    var zoom = 14;

    var styles = [
        {
        "elementType": "geometry",
        "stylers": [
            {
            "color": "#ebe3cd"
            }
        ]
        },
        {
        "elementType": "labels.text.fill",
        "stylers": [
            {
            "color": "#523735"
            }
        ]
        },
        {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
            "color": "#f5f1e6"
            }
        ]
        },
        {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
            "color": "#c9b2a6"
            }
        ]
        },
        {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
            {
            "color": "#dcd2be"
            }
        ]
        },
        {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
            "color": "#ae9e90"
            }
        ]
        },
        {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
            "color": "#dfd2ae"
            }
        ]
        },
        {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
            "color": "#dfd2ae"
            }
        ]
        },
        {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
            "color": "#93817c"
            }
        ]
        },
        {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
            "color": "#a5b076"
            }
        ]
        },
        {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
            "color": "#447530"
            }
        ]
        },
        {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
            "color": "#f5f1e6"
            }
        ]
        },
        {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
            "color": "#fdfcf8"
            }
        ]
        },
        {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
            "color": "#f8c967"
            }
        ]
        },
        {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
            "color": "#e9bc62"
            }
        ]
        },
        {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
            "color": "#e98d58"
            }
        ]
        },
        {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
            "color": "#db8555"
            }
        ]
        },
        {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
            "color": "#806b63"
            }
        ]
        },
        {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
            "color": "#dfd2ae"
            }
        ]
        },
        {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
            {
            "color": "#8f7d77"
            }
        ]
        },
        {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
            "color": "#ebe3cd"
            }
        ]
        },
        {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
            "color": "#dfd2ae"
            }
        ]
        },
        {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
            "color": "#b9d3c2"
            }
        ]
        },
        {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
            "color": "#92998d"
            }
        ]
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
    console.log("initMarkets");
    var marketsDefinition = [
        {
        content: {
            title: "Teste 1",
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit leo at leo mattis varius. Phasellus sem lorem, porta id fringilla eget, porta eget justo. Ut ultrices placerat faucibus. Duis consectetur tempor eros, non molestie lorem tincidunt vitae. Donec suscipit auctor risus et aliquam. Sed elementum non est sed fermentum. Pellentesque non nulla finibus tortor posuere porttitor auctor a neque. Donec sit amet nulla sodales, ullamcorper tortor nec, luctus magna. Donec sit amet risus consectetur, accumsan orci nec, aliquam massa. Donec consectetur, ipsum sed varius fringilla, leo velit commodo mauris, at eleifend nisl leo at risus. Quisque et hendrerit neque. Vivamus fringilla tellus at lectus vestibulum, id blandit nulla faucibus.'
        },
        position: { lat: -8.055, lng: -34.8813 }
        },
        {
        content: {
            title: "Teste 2",
            body: 'Maecenas a sem nec tortor dapibus molestie non sit amet metus. Praesent lacus neque, varius sed convallis eu, euismod in lacus. Nam nec nisl vitae orci maximus tempor. Suspendisse potenti. Vivamus maximus mauris ac laoreet pulvinar. Morbi venenatis finibus ligula. Donec ullamcorper id risus nec hendrerit. Donec auctor lorem in massa aliquam aliquet. Donec venenatis euismod mattis. In scelerisque nulla vehicula imperdiet lacinia. Maecenas posuere in nulla a volutpat. Suspendisse est lacus, faucibus sed venenatis sit amet, dapibus quis arcu. Pellentesque scelerisque fermentum tortor, a sagittis quam.'
        },
        position: { lat: -8.0542, lng: -34.91 }
        },
        {
        content: {
            title: "Teste 3",
            body: 'Maecenas fringilla efficitur finibus. Aenean augue orci, ultrices sit amet mattis in, mattis sed arcu. Ut lacinia ultrices iaculis. Donec sit amet urna quis erat pretium gravida. Suspendisse scelerisque, lectus semper sagittis viverra, turpis mauris dictum neque, non fermentum magna est vel erat. Praesent id nisi vel quam finibus scelerisque. Quisque placerat, ante nec congue cursus, purus ipsum egestas mi, nec bibendum augue urna et orci. Cras et tristique tortor, eget auctor arcu. Curabitur a sem faucibus, efficitur quam non, venenatis enim.'
        },
        position: { lat: -8.044, lng: -34.885 }
        },
        {
        content: {
            title: "Teste 4",
            body: 'Suspendisse potenti. Quisque non commodo turpis. Duis ac facilisis enim, ut semper justo. In hac habitasse platea dictumst. Aliquam auctor augue et vehicula dictum. Ut eget efficitur dolor. Donec a augue tincidunt, bibendum eros nec, dapibus velit. Donec mattis turpis turpis, ut convallis arcu dignissim quis. Nullam sem erat, semper at efficitur eget, tristique non dolor. Vestibulum nec lacinia ante, in suscipit arcu. Morbi sollicitudin ultricies placerat.'
        },
        position: { lat: -8.044, lng: -34.9 }
        }
    ];

    for (let i = 0; i < marketsDefinition.length; i++) {
        const element = marketsDefinition[i];

        createMarket(element, map);
    }
}

function createMarket(marketData, map) {
    console.log("createMarket");
    var marker = new google.maps.Marker({ position: marketData.position, map: map });

    attachMessage(marker, marketData.content);
}

function attachMessage(marker, content) {
    console.log("attachMessage");

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

        if(value){
            value.style.top = '0px';
            value.style.right = '0px';
            console.log(value);
            var img = value.querySelector('img');
            if(img){
            img.style.width= '20px';
            img.style.height= '20px';
            img.style.margin= '5px';
            }              
        } 
    }, 0);
}