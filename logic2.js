var map = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    // id: "mapbox.streets",
    accessToken: LEAFLET_API_KEY
});


//  Initialize all of the LayerGroups we'll be using
var layers = {
    RED_LINE: new L.LayerGroup(),
    GREEN_LINE: new L.LayerGroup(),
    ORANGE_LINE: new L.LayerGroup(),
    YELLOW_LINE: new L.LayerGroup(),
    BLUE_LINE: new L.LayerGroup(),
    SILVER_LINE: new L.LayerGroup()
};

var myMap = L.map("map", {
    center: [38.91, -77.01],
    zoom: 11.4,
    layers: [
        layers.RED_LINE,
        layers.GREEN_LINE,
        layers.ORANGE_LINE,
        layers.YELLOW_LINE,
        layers.BLUE_LINE,
        layers.SILVER_LINE
    ]
});
map.addTo(myMap)

// Create an overlays object to add to the layer control
var overlays = {
    "Red Line Metro Connection": layers.RED_LINE,
    "Green Line Metro Connection": layers.GREEN_LINE,
    "Orange Line Metro Connection": layers.ORANGE_LINE,
    "Yellow Line Metro Connection": layers.YELLOW_LINE,
    "Blue Line Metro Connection": layers.BLUE_LINE,
    "Silver Line Metro Connection": layers.SILVER_LINE
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(myMap);

// Create a legend to display information about our map
var info = L.control({
    position: "bottomright"
});
// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function () {
    var div = L.DomUtil.create("div", "legend");
    return div;
};
// Add the info legend to the map
info.addTo(myMap);

// Initialize an object containing icons for each layer group
var icons = {
    RED_LINE: L.AwesomeMarkers.icon({
        icon: "bus",
        iconColor: "white",
        markerColor: "red",
        shape: "circle"
    }),
    GREEN_LINE: L.AwesomeMarkers.icon({
        icon: "bus",
        iconColor: "white",
        markerColor: "green",
        shape: "circle"
    }),
    ORANGE_LINE: L.AwesomeMarkers.icon({
        icon: "bus",
        iconColor: "white",
        markerColor: "orange",
        shape: "circle"
    }),
    YELLOW_LINE: L.AwesomeMarkers.icon({
        icon: "bus",
        iconColor: "white",
        markerColor: "purple",
        shape: "circle"
    }),
    BLUE_LINE: L.AwesomeMarkers.icon({
        icon: "bus",
        iconColor: "white",
        markerColor: "blue",
        shape: "circle"
    }),
    SILVER_LINE: L.AwesomeMarkers.icon({
        icon: "bus",
        iconColor: "white",
        markerColor: "cadetblue",
        shape: "circle"
    }),
    BLACK_LINE: L.AwesomeMarkers.icon({
        icon: "bus",
        iconColor: "white",
        markerColor: "black",
        shape: "circle"
    })
};

var routeColors = {'blue': ['30',
'32',
'34',
'36',
'39',
'90',
'92',
'M6',
'B2',
'3Y',
'7Y',
'11',
'16',
'32',
'33',
'V1',
'V4',
'36',
'37',
'38',
'39',
'42',
'43',
'80',
'D1',
'D4',
'B2',
'D5',
'D6',
'G8',
'L2',
'N2',
'N4',
'N6',
'S1',
'P6',
'X9',
'59',
'63',
'64',
'52',
'S2',
'S4',
'X1',
'X2',
'16',
'L1',
'5A',
'74',
'A9',
'96',
'97',
'G9',
'U5',
'U6',
'V7',
'V8',
'W4'],
'green': ['A2',
'A4',
'A6',
'A7',
'A8',
'B2',
'P6',
'V2',
'W2',
'W3',
'W4',
'W5',
'W6',
'W8',
'92',
'V7',
'W1',
'A9',
'P6',
'V1',
'V4',
'74',
'30',
'32',
'D1',
'D1',
'D1',
'N1',
'P1',
'P1',
'P1',
'W1'],
'orange': ['30',
'32',
'34',
'36',
'39',
'90',
'92',
'M6',
'B2',
'3Y',
'7Y',
'11',
'16',
'32',
'33',
'V1',
'V4',
'36',
'37',
'38',
'39',
'42',
'43',
'80',
'D1',
'D4',
'B2',
'D5',
'D6',
'G8',
'L2',
'N2',
'N4',
'N6',
'S1',
'P6',
'X9',
'59',
'63',
'64',
'52',
'S2',
'S4',
'X1',
'X2',
'16',
'L1',
'5A',
'74',
'A9',
'96',
'97',
'G9',
'R1',
'U7',
'V1',
'W4',
'U4',
'U5',
'U6',
'V8',
'V2',
'X3'],
'red': ['H1',
'H2',
'H3',
'H4',
'H6',
'H8',
'H9',
'R4',
'L1',
'L2',
'37',
'42',
'D1',
'D2',
'D4',
'D6',
'G2',
'N2',
'N4',
'N6',
'3Y',
'7Y',
'11',
'16',
'32',
'33',
'36',
'37',
'38',
'39',
'42',
'43',
'80',
'D5',
'S1',
'30',
'30',
'31',
'E4',
'E6',
'L8',
'T2',
'90',
'92',
'X3',
'83',
'86',
'B8',
'B9',
'D8',
'G9',
'H8',
'H9',
'p6',
'T1',
'T1',
'S2',
'S4',
'S9',
'62',
'63',
'F1',
'F2',
'K2',
'96',
'M4',
'97',
'X1',
''],
'silver': ['52',
'74',
'A9',
'3Y',
'11',
'16',
'16',
'96',
'97',
'U5',
'U6',
'V7',
'V8',
'W4',
'42',
'43',
'52',
'B2',
'M6',
'V4',
'F1',
'V2',
'V4',
'X9',
'54',
'59',
'63',
'80',
'30',
'30',
'32',
'34',
'36',
'39',
'D1',
'D4',
'D6',
'G8',
'G9',
'90',
'92',
'52',
'54',
'7Y',
'11',
'33',
'37',
'38',
'42',
'43',
'D5',
'L2',
'N2',
'N4',
'N6',
'S1',
'S9',
'X2',
'P6',
'59',
'63',
'64',
'52',
'54',
'X1',
'38',
'39',
'H1',
'L1'],
'yellow': ['32',
'33',
'34',
'36',
'37',
'39',
'54',
'70',
'74',
'79',
'A9',
'P6',
'X1',
'52',
'54',
'59',
'H1',
'H2',
'H3',
'H4',
'H8',
'60',
'64',
'80',
'E2',
'E4',
'F6',
'K2',
'K6',
'K9',
'R1',
'R2',
'42',
'X2',
'X9',
'62',
'63',
'64',
'5A',
'V1',
'G2',
'G8',
'G9',
'90',
'92',
'96',
':']
};



var url = `https://api.wmata.com/Bus.svc/json/jBusPositions?API_KEY=${API_KEY}`
d3.json(url).then(function (data) {
    // console.log(data);
    // Create a map object


    // // Creates a red marker with the coffee icon
    // var redMarker = L.AwesomeMarkers.icon({
    //     icon: 'bus',
    //     markerColor: "red"
    // });

    // L.marker([51.941196, 4.512291], { icon: redMarker }).addTo(map);

    for (var i = 0; i < data.BusPositions.length; i++) {
        var bus = data.BusPositions[i];
        // console.log(bus)
        var newMarker = L.marker([bus.Lat, bus.Lon], { icon: chooseMarker(bus.RouteID) })
                .bindPopup("<h1>" + "Route:" + bus.RouteID + "   " + "(" + "Bus No:" + bus.VehicleID + ")" + "</h1>")
                .addTo(myMap);

        // newMarker.addTo(layers[chooseMarker(bus.RouteID)])
    }

    // Function that will determine the color of a marker based on the busroute 
    function chooseMarker(route) {
        if (routeColors.silver.find(r => r === route))
            return icons.SILVER_LINE;
        else if (routeColors.yellow.find(r => r === route))
        return icons.YELLOW_LINE;
        else if (routeColors.blue.find(r => r === route))
            return icons.BLUE_LINE;
        else if (routeColors.red.find(r => r === route)) 
            return icons.RED_LINE;
        else if (routeColors.green.find(r => r === route)) 
            return icons.GREEN_LINE;
        else if (routeColors.orange.find(r => r === route))
            return icons.ORANGE_LINE;
        else if (routeColors.blue.find(r => r === route))
            return icons.BLUE_LINE;
        else 
            return icons.BLACK_LINE;

    }

    // Grabbing our GeoJSON data..
    // d3.json(link, function (data) {
    //     // Creating a geoJSON layer with the retrieved data
    //     L.geoJson(data, {
    //         style: function (feature) {
    //             return {
    //                 color: "white",
    //                 fillColor: chooseColor(feature.properties.route),
    //                 fillOpacity: 0.5,
    //                 weight: 1.5
    //             };
    //         }
    //     }).addTo(myMap);
    // });

})