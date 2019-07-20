
// creating trace 1, trace 2, trace 3

url = "https://api.wmata.com/Incidents.svc/json/ElevatorIncidents";
d3.json().then(function(data) {
    console.log(data)    

// Grab values from the data json object to build the plots
//   var name = data.dataset.name;
//   var trainincidents = data.dataset.LinesAffected;
//   var elevatorincidents = data.dataset.SymptomDescription;
//   var busincidents = data.dataset.end_date;
//   var dates = unpack(data.dataset.data, 0);

    

var trace1 = {
    x: data.map(row => row.LinesAffected),
    y: data.map(row => row.Description.length),
    text: data.map(row => row.LinesAffected),
    name: "Metro Incidents",
    type: "Line"
  };

    var trace2 = {
    x: data.map(row => row.SymptomDescription),
    y: data.map(row => row.DateOutOfServ),
    text: data.map(row => row.SymptomDescription),
    name: "Elevator/Escalator Incidents",
    type: "Line"
  };

// The following results for the API query on the bus incidents run this morning(July 19, 2019)
// Pragma: no-cache
// Arr-Disable-Session-Affinity: True
// Cache-Control: no-cache
// Date: Fri, 19 Jul 2019 13:53:01 GMT
// X-AspNet-Version: 4.0.30319
// X-Powered-By: ASP.NET
// Content-Length: 19
// Content-Type: application/json; charset=utf-8
// Expires: -1

// {
//   "BusIncidents": []
// }

  var trace3 = {
    x: data.map(row => row.LinesAffected),
    y: data.map(row => row.Description.length),
    text: data.map(row => row.LinesAffected),
    name: "Bus Incidents",
    type: "Line"
  };
  // data
  var data = [trace1, trace2, trace3];
  
  // Apply the group bar mode to the layout
  var layout = {
    title: "Metro Incidents",
    xaxis: { title: "Types of Incidents"},
    yaxis: { title: "Number of Incidents"},
    lineMode: "group",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

// Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", data, layout);
})


  
  


