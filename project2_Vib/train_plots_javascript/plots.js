
  
//   Trace1 for the Incidents Data
  var trace1 = {
    x: data.map(row => row.LinesAffected),
    y: data.map(row => row.LinesAffected.length),
    text: data.map(row => row.LinesAffected),
    name: "Metro Incidents",
    type: "bar"
  };
  
  // data
  var data = [trace1];
  
  // Apply the group bar mode to the layout
  var layout = {
    title: "Train-related Incidents",
    xaxis: { title: "Lines Affected"},
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

  // var trace2 = {
  //   x: elevatordata.map(row => row.SymptomDescription),
  //   y: elevatordata.map(row => row.DateOutOfServ),
  //   text: elevatordata.map(row => row.SymptomDescription),
  //   name: "Elevator/Escalator Incidents",
  //   type: "bar"
  // };
  
  // // data
  // var data2 = [trace2];
  
  // // Apply the group bar mode to the layout
  // var layout2 = {
  //   title: "Elevator/Escalator Incidents",
  //     xaxis: { title: "Types of Incidents"},
  //     yaxis: { title: "Number of Incidents"},
  //     margin: {
  //       l: 580,
  //       r: 80,
  //       t: 100,
  //       b: 100
  //     }
  //   };
  
  // // Render the plot to the div tag with id "plot"
  // Plotly.newPlot("plot2", data2, layout2);