

var trace1 = {
    x: data.map(row => row.SymptomDescription),
    y: data.map(row => row.DateOutOfServ),
    text: data.map(row => row.SymptomDescription),
    name: "Elevator/Escalator Incidents",
    type: "bar"
  };
  
  // data
  var data = [trace1];
  
  // Apply the group bar mode to the layout
  var layout = {
    title: "Elevator/Escalator Incidents",
      xaxis: { title: "Types of Incidents"},
      yaxis: { title: "Number of Incidents"},
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
  
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", data, layout);

  
  
  
