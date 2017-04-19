var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    }, // Bind Event Listeners
    // Bind any events that are required on startup. Common events are:
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }, // deviceready Event Handler
    onDeviceReady: function () {
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError, {
            timeout: 4000
        });
    }
    , onSuccess: function (position) {
        gotLocation(position);
    }
    , onError: function (error) {
        dontGotLocation();
    }
, };

function gotLocation(position) {
    console.log("Got Location" + position);
    var myLng = position.coords.longitude;
    var myLat = position.coords.latitude;
    everything(myLat, myLng);
}

function dontGotLocation(position) {
    console.log("Didn't Get Loaction");
    var myLng = -6.260778899999991;
    var myLat = 53.35124159999999;
    everything(myLat, myLng);
}

function everything(myLat, myLng) {
    var bounds = new google.maps.LatLngBounds;
    var geocoder = new google.maps.Geocoder;
    myLatLong = new google.maps.LatLng(myLat, myLng);
    var service = new google.maps.DistanceMatrixService;
    var url = "https://api.jcdecaux.com/vls/v1/stations?contract=Dublin&apiKey=ec447add626cfb0869dd4747a7e50e21d39d1850";
    $.getJSON(url, function (result) {
        //retrieves specific fields from json array being returned by script hosted on heroku and adds the to specific variables
        lats = result.map(function (a) {
            return a.position.lat;
        });
        longs = result.map(function (a) {
            return a.position.lng;
        });
        names = result.map(function (a) {
            return a.name;
        });
        avail = result.map(function (a) {
            return a.available_bikes;
        });
        availslts = result.map(function (a) {
            return a.available_bike_stands;
        });
        number = result.map(function (a) {
            return a.number;
        });
        var points = [];
        //adds each variable defined above to an array, points, this will be the access point for all of our data
        $(lats).each(function (index, val) {
            points.push([lats[index], longs[index], names[index], avail[index], availslts[index], number[index]]);
        });
        //console.log(points);
        var mapOptions = {
            center: myLatLong
            , zoom: 15
            , gestureHandling: 'cooperative'
            , mapTypeId: google.maps.MapTypeId.ROADMAP
            , styles: [{
                    "featureType": "water"
                    , "elementType": "geometry"
                    , "stylers": [{
                            "color": "#e9e9e9"
                            }
                            , {
                            "lightness": 17
                            }
                        ]
                    }
                    , {
                    "featureType": "landscape"
                    , "elementType": "geometry"
                    , "stylers": [{
                            "color": "#f5f5f5"
                            }
                            , {
                            "lightness": 20
                            }
                        ]
                    }
                    , {
                    "featureType": "road.highway"
                    , "elementType": "geometry.fill"
                    , "stylers": [{
                            "color": "#ffffff"
                            }
                            , {
                            "lightness": 17
                            }
                        ]
                    }
                    , {
                    "featureType": "road.highway"
                    , "elementType": "geometry.stroke"
                    , "stylers": [{
                            "color": "#ffffff"
                            }
                            , {
                            "lightness": 29
 }
                            , {
                            "weight": 0.2
                            }
                        ]
                    }
                    , {
                    "featureType": "road.arterial"
                    , "elementType": "geometry"
                    , "stylers": [{
                            "color": "#ffffff"
                            }
                            , {
                            "lightness": 18
                            }
                        ]
                    }
                    , {
                    "featureType": "road.local"
                    , "elementType": "geometry"
                    , "stylers": [{
                            "color": "#ffffff"
                            }
                            , {
                            "lightness": 16
                            }
                        ]
                    }
                    , {
                    "featureType": "poi"
                    , "elementType": "geometry"
                    , "stylers": [{
                            "color": "#f5f5f5"
                            }
                            , {
                            "lightness": 21
                            }
                        ]
                    }
                    , {
                    "featureType": "poi.park"
                    , "elementType": "geometry"
                    , "stylers": [{
                            "color": "#dedede"
                            }
                            , {
                            "lightness": 21
                            }
                        ]
                    }
                    , {
                    "elementType": "labels.text.stroke"
                    , "stylers": [{
                            "visibility": "on"
                            }
                            , {
                            "color": "#ffffff"
                            }
                            , {
                            "lightness": 16
                            }
                        ]
                    }
                    , {
                    "elementType": "labels.text.fill"
                    , "stylers": [{
                            "saturation": 36
                            }
                            , {
                            "color": "#333333"
                            }
                            , {
                            "lightness": 40
                            }
                        ]
                    }
                    , {
                    "elementType": "labels.icon"
                    , "stylers": [{
                        "visibility": "on"
                        }]
                    }
                    , {
                    "featureType": "transit"
                    , "elementType": "geometry"
                    , "stylers": [{
                            "color": "#f2f2f2"
                            }
                            , {
                            "lightness": 19
                            }
                        ]
                    }
                    , {
                    "featureType": "administrative"
                    , "elementType": "geometry.fill"
                    , "stylers": [{
                            "color": "#fefefe"
                            }
                            , {
                            "lightness": 20
                            }
                        ]
                    }
                    , {
                    "featureType": "administrative"
                    , "elementType": "geometry.stroke"
                    , "stylers": [{
                            "color": "#fefefe"
                            }
                            , {
                            "lightness": 17
                            }
                            , {
                            "weight": 1.2
                            }
                        ]
 }
                ]
        };
        var search = [];
        //creating options list for dropdown, retrieving data from pregiovus getJSON
        $.each(names, function (index, val) {
            //search.push('<option value =' + index + '>' + names[index] + " - " + avail[index] + " Bikes Available" + '</option>');
            search.push('<option id=number value =' + number[index] + '>' + names[index] + " NO :" + number[index] + '</option>');
            // console.log("Name " + names[index] +
            //     " NO " + number[index]);
        });
        //enable cross origin request sharing
        jQuery.ajaxPrefilter(function (options) {
            if (options.crossDomain && jQuery.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }
        });
        //on form submit do this
        $('form').submit(function () {
            var postData = $(this).serialize(); //post the data
            $.ajax({
                type: 'POST' //type of request
                    
                , data: postData //which data will it send
                    
                , url: 'https://dbiketrackerv2.herokuapp.com/php-scripts/searchavail.php' //what url/where is the data being posted too
                    
                , success: function (data) { //on success function do this
                    obj = JSON.parse(data);
                    console.log(obj);
                    //                    console.log(standDev[2]); //log the data to a console
                    document.getElementById("over_map").innerHTML = obj; //write the data to our output div
                }
                , error: function () {
                    alert('ERRORRRR ERRRRORRRR');
                }
            });
            return false;
        });
        //using json selector to add the options list to the html element
        $('#liveSearch').append(search.join(''));
        //when the search is changed, execute this code
        $('#liveSearch').change(function () {
            //variable that stores the value filed of the selected option (the array index)
            var userSelected = $("#liveSearch :selected").val();
            console.log("Selected Station Array Index: " + userSelected);
            //selected station worked out based on index of search array
            //variable that stores name of the selected station
            var myStation = userSelected;
            //station name
            console.log("Selected Station Number: " + myStation);
            //shorter than length of search array
            for (var i = 0; i <= search.length; i++) {
                //if myStation(name of seleceted station) is = to the name field of the original points array
                console.log("myStationTEST " + myStation);
                console.log("pointsTest" + points[i][5]);
                if (myStation == points[i][5]) {
                    console.log("ID: " + points[i][5]);
                    //variable for placing station name into distance matrix string
                    var myStationName = points[i][2];
                    //  log all of the info stored on the station determined above
                    console.log("Selected Station Info: " + points[i]);
                    //set lat/long of chosen station as varaibles
                    var myStationLat = (points[i][0]);
                    var myStationLong = (points[i][1]);
                    var myStationBikes = (points[i][3]);
                    var myStationSlots = (points[i][4]);
                    //console.log(myStationLat + " : " + myStationLong);
                    //creates latlng object from users current location (defined) at start of onSuccess function
                    var mLocation = new google.maps.LatLng(myLat, myLng);
                    //make a new googlge latlng object out of the two lat/long variables defined above.
                    var searchLatLong = new google.maps.LatLng(myStationLat, myStationLong);
 // //Distance Matrix API
                    service.getDistanceMatrix({
                        origins: [mLocation]
                        , destinations: [searchLatLong]
                        , travelMode: 'WALKING'
                        , unitSystem: google.maps.UnitSystem.METRIC
                        , avoidHighways: false
                        , avoidTolls: false
                    }, function (response, status) {
                        if (status !== 'OK') {
                            alert('Error was: ' + status);
                        }
                        else {
                            var originList = response.originAddresses;
                            var destinationList = response.destinationAddresses;
                            var outputDiv = document.getElementById('over_map');
                            //deleteMarkers(markersArray);
                            for (var i = 0; i < originList.length; i++) {
                                var results = response.rows[i].elements;
                                geocoder.geocode({
                                    'address': originList[i]
                                });
                                for (var j = 0; j < results.length; j++) {
                                    geocoder.geocode({
                                        'address': destinationList[j]
                                    });
                                    outputDiv.innerHTML += 'You are ' + results[j].distance.text + ' from ' + myStationName + '<br/>' + ' This will take you ' + results[j].duration.text + ' to walk to.';
                                    console.log(destinationList[j]);
                                }
                            }
                        }
                    });
                    //content string for infowindows used by live search
                    var searchContentString = "<p>" + " The " + points[i][2] + " station has " + "<br />" + points[i][3] + " bikes available and " + points[i][4] + " slots available." + "</p>";
                    document.getElementById("over_map").innerHTML = searchContentString;
                    //marker for location of chosen station
                    var searchMarker = new google.maps.Marker({
                        position: searchLatLong
                        , map: map
                        , searchContentString: searchContentString
                        , icon: {
                            url: "./img/green-dot.png", // url
                            scaledSize: new google.maps.Size(50, 50), // scaled size
                            origin: new google.maps.Point(0, 0), // origin
                            anchor: new google.maps.Point(0, 0) // anchor
                        }
                    });
                    //infowindow for live search
                    var searchInfowindow = new google.maps.InfoWindow({});
                    //set content for infowindow using string defined above
                    searchInfowindow.setContent(searchMarker.searchContentString);
                    //zoom/pan to station location
                    map.setZoom(17);
                    map.panTo(searchMarker.position);
                    //on click to allow the marker to be closed/reopened based on user input
                    searchMarker.addListener('click', function () {
                        searchInfowindow.setContent(this.searchContentString);
                        searchInfowindow.open(map, this);
                        //searchInfowindow.close(map, this);
                    });
                    break;
                }
            }
            var sLocations = [];
            for (var i = 0; i < points.length; i++) {
                //creates latlng objects from each lat/lng pair in the points array
                sLocation = new google.maps.LatLng(points[i][0], points[i][1]);
                //calculates striaght line distance from current loaction to all stations
                var distanceFromAllStations = google.maps.geometry.spherical.computeDistanceBetween(searchLatLong, sLocation);
                //adds number of each station and distnace from user to an arrayv
                $(sLocation).each(function (index, val) {
                    //number, names, distnace, lat, long,bikes, slots
 sLocations.push([points[i][5], points[i][2], distanceFromAllStations, points[i][0], points[i][1], points[i][3], points[i][4]]);
                })
            }
            // console.log("Strightline Distance Array: " + sLocations);
            // //narorw down dataset based on hardcoded distance
            var nearSearched = [];
            for (var i = 0; i < sLocations.length; i++) {
                if (sLocations[i][2] <= 350) {
                    nearSearched.push(sLocations[i]);
                }
            }
            // console.log("TwoFiftyMetres: " + nearSearched)
            var nearSearchedLtLng = [];
            for (var i = 0; i < nearSearched.length; i++) {
                x = new google.maps.LatLng(nearSearched[i][3], nearSearched[i][4]);
                nearSearchedLtLng.push(x);
            }
            //console.log("Origin: " + searchLatLong);
            //console.log("Destination: " + nearSearchedLtLng);
            service.getDistanceMatrix({
                origins: [searchLatLong]
                , destinations: nearSearchedLtLng
                , travelMode: 'WALKING'
                , unitSystem: google.maps.UnitSystem.METRIC
                , avoidHighways: false
                , avoidTolls: false
            }, function (response, status) {
                if (status !== 'OK') {
                    alert('Error was: ' + status);
                }
                else {
                    var originList = response.originAddresses;
                    var destinationList = response.destinationAddresses;
                    var outputDiv = document.getElementById('over_map');
                    outputDiv.innerHTML = '';
                    //deleteMarkers(markersArray);
                    for (var i = 0; i < destinationList.length; i++) {
                        var results = response.rows[i].elements;
                        geocoder.geocode({
                            'address': originList[i]
                        });
                        for (var j = 0; j < results.length; j++) {
                            geocoder.geocode({
                                'address': destinationList[j]
                            });
                            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            ////////////////////////////////////Determining Direction/////////////////////////////////////////////////////////////////////////
                            //                                var element = results[j];
                            //                                var nearMeLatLng = element.location;
                            //                                console.log(nearMelatLng);
                            //                                console.log("Location: " + location[i]);
                            ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                            //                            outputDiv.innerHTML += nearSearched[i][1] + " is " + results[j].distance.text + ' from your desired station.' + '<br/>' + 'This will take you ' + results[j].duration.text + ' to walk to.' + '<br/><br/><br/>';
                            $('<table>').append('<tr id="station">').append('<td id="name">').append('<td id="bikes">').append('<td id="slots">').append('<td id="distance">').appendTo('#over_map');
                            $('#name').text(myStationName);
                            $('#bikes').text(myStationBikes);
                            $('#slots').text(myStationSlots);
                            $('#distance').text(results[j].distance.text);
                            i++;
                        }
                    }
                }
            });
            //                    var heading = google.maps.geometry.spherical.computeHeading(searchLatLong,testmyLatLong);
 //                    console.log("Heading: "+heading);
        });
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        //loop that creates the markers & infowindows for station locations
        for (var i = 0; i < points.length; i++) {
            //creates a new google latlng object for each pair in the points array
            latLong = new google.maps.LatLng(points[i][0], points[i][1]);
            //Content for infowindow, conatins the Name, number of bikes and number of slots available
            var contentString = "<p>" + points[i][2] + "<br />" + " Bikes Available:" + points[i][3] + "<br />" + " Slots Available:" + points[i][4] + "</p>";
            //creates a new marker for each element in the points array based on the current latlong and contentstring values (changes on every run of the loop)
            var marker = new google.maps.Marker({
                position: latLong
                , map: map
                , contentString: contentString
                , icon: {
                            url: "./img/red-dot.png", // url
                            scaledSize: new google.maps.Size(50, 50), // scaled size
                            origin: new google.maps.Point(0, 0), // origin
                            anchor: new google.maps.Point(0, 0) // anchor
                        }
            });
            //creates infowindow
            var infowindow = new google.maps.InfoWindow({});
            //adding on click listner for each marker, setting the content & launching infowindow
            marker.addListener('click', function () {
                infowindow.setContent(this.contentString);
                infowindow.open(map, this);
            });
        }
        //pin for current location
        var GeoMarker = new GeolocationMarker(map);
        //infowindow for current location marker
        var myInfoWindow = new google.maps.InfoWindow({});
    });
}
 app.
 initialize();