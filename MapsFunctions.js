var map;
var infowindow;
function initMap() {

	var tirStyle =	[
		{
		  "elementType": "labels",
		  "stylers": [
			{
			  "visibility": "off"
			}
		  ]
		},
		{
		  "featureType": "administrative.land_parcel",
		  "stylers": [
			{
			  "visibility": "off"
			}
		  ]
		},
		{
		  "featureType": "administrative.neighborhood",
		  "stylers": [
			{
			  "visibility": "off"
			}
		  ]
		},
		{
		  "featureType": "transit",
		  "elementType": "labels",
		  "stylers": [
			{
			  "visibility": "simplified"
			}
		  ]
		},
		{
		  "featureType": "transit",
		  "elementType": "labels.text",
		  "stylers": [
			{
			  "color": "#ffeb3b"
			},
			{
			  "visibility": "off"
			},
			{
			  "weight": 2
			}
		  ]
		},
		{
		  "featureType": "transit.station.airport",
		  "elementType": "labels",
		  "stylers": [
			{
			  "visibility": "off"
			}
		  ]
		}
	  ]
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 51.918404, lng: 4.4811438 },
		zoom: 17,
		styles: tirStyle
	});

	infowindow = new google.maps.InfoWindow();
	
	var diffPlaces = ["McDonald's", "KFC"];

	diffPlaces.forEach(place => {
		var service = new google.maps.places.PlacesService(map);
		service.nearbySearch({
			location: {lat: 51.918404, lng: 4.4811438},
			radius: 500,
			keyword: place
		}, callback);
	
	});

	
	// // TODO: Set labels from POI type
	// var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	// // TODO: Add info for hover
	// // TODO: Make clickable for navigation
	// var markers = locations.map(function (location, i) {
	// 	return new google.maps.Marker({
	// 		position: location,
	// 		label: labels[i % labels.length]
	// 	});
	// });

	// //var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'img/m' });
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

// TODO: Get locations from DB
var locations = [
	{ lat: 51.9244201, lng: 4.4777326 },
	{ lat: 51.9159124, lng: 4.4788838 },
	{ lat: 51.9210251, lng: 4.4787017 }
]