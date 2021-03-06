

// 
function init() {
  d3.json("samples.json").then(function(data) {
    var initial_ID = data.samples[0].id;
    var initial_labels = data.samples[0].otu_ids;
    var names = initial_labels.map((item, index) => `OTU ${item}`);
    var initial_values = data.samples[0].sample_values;
    var initial_text =  data.samples[0].otu_labels;
    var demo_info = data.metadata[0];
    
    var demo = d3.select('#sample-metadata');
    
    console.log(demo_info);

    Object.entries(demo_info).forEach(([key, value]) => {
    console.log(`Key: ${key} and Value ${value}`);
    var demo_row = demo.append("li");
    demo_row.text(`${key}: ${value}`);
    });

//// Bar chart ////

    var unsorted = initial_values.slice(0,9)
    var sortedData = unsorted.reverse();
    var trace = {
      x: sortedData,
      y: names.slice(0.9),
      orientation: 'h',
      type: "bar",
      text: initial_text.slice(0.9),
      marker: {
        color: 'rgb(142,124,195)'}
    };
  
    var data = [trace];

    var layout = {
      xaxis: {showgrid: false},
      yaxis: {showgrid: false}
    };

  Plotly.newPlot("bar", data, layout);

//// Bubble Chart ////
    var trace1 = {
      x: initial_labels,
      y: initial_values,
      mode: 'markers',
      marker: {
        color: initial_labels,
        opacity: 0.8,
        size: initial_values,
        sizeref: 1.0 * Math.max(initial_values) / (1**2),
      },
      
    };
    
    var data = [trace1];
    
    var layout = {
      xaxis: {
        showgrid: false,
        title: 'OTU ID',},
      yaxis: {
        showgrid: false},  
      showlegend: false,
      height: 500,
      width: 900
    };
  
  Plotly.newPlot('bubble', data, layout);  

//// Gauge Chart ////
  var gaugeData = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: demo_info.wfreq,
      title: { text: "Washing Frequency" },
      type: "indicator",
      mode: "gauge",
      gauge: {
        axis: { range: [null, 9] },
        steps: [
          { range: [0, 1], color: "aliceblue" },
          { range: [1, 2], color: "azure" },
          { range: [2, 3], color: "lightgrey" },
          { range: [3, 4], color: "darkgrey" },
          { range: [4, 5], color: "gray" },
          { range: [5, 6], color: "slategray" },
          { range: [6, 7], color: "lightblue" },
          { range: [7, 8], color: "slateblue" },
          { range: [8, 9], color: "steelblue" },
        ]
    }
    }];
  
    var gaugeLayout = { width: 400, height: 400, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge-chart', gaugeData, gaugeLayout);
  });
};

/////////////////////////////////////////////////////////////////////////////////////////
///// Populate the drop down menu ////

d3.json("samples.json").then(function(data) {
    var otuIDs = [];
    for (i=0; i<data.samples.length; i++) {
        otuIDs.push(data.samples[i].id);
    };

    var optionOTU = d3.select("#selDataset");

    otuIDs.forEach(function(person) {
    var row = optionOTU.append("option");
    row.text(person);
    });
  });

/////////////////////////////////////////////////////////////////////////////////////////


//// Listener for ID change ////

d3.selectAll("#selDataset").on("change", getData);

/////////////////////////////////////////////////////////////////////////////////////////

//// The function to run when there is a change to the selection box ////

function getData() {

  var dropdownMenu = d3.select("#selDataset");

  d3.json("samples.json").then(function(data) {
    var otuIDs = [];
    var otuLabels = [];
    var otuSample = [];
    var otuText = [];
    var otuInfo = [];
    for (i=0; i<data.samples.length; i++) {
        otuIDs.push(data.samples[i].id);
        otuLabels.push(data.samples[i].otu_ids);
        otuSample.push(data.samples[i].sample_values);
        otuText.push(data.samples[i].otu_labels);
        otuInfo.push(data.metadata[i]);
    };

  // Assign the value of the dropdown menu option to newSelection variable

  var newSelection = dropdownMenu.property("value");
  console.log(newSelection);
  
  // find index of the newSelection

  for (i=0; i<otuIDs.length; i++) {
    if (otuIDs[i] === newSelection)
      var otuIndex = i;
    };
  
  // update the demographic information
  var demo = d3.select('#sample-metadata');
  demo.html('')
  var demo_info = otuInfo[otuIndex];

  Object.entries(demo_info).forEach(([key, value]) => {
  console.log(`Key: ${key} and Value ${value}`);
  var demo_row = demo.append("li");
  demo_row.text(`${key}: ${value}`);
  });
  
  // update the bar chart
  var unsorted = otuSample[otuIndex].slice(0,9);
  var sortedData = unsorted.reverse();
  var x = sortedData;
  var y = otuLabels[otuIndex].map((item, index) => `OTU ${item}`).slice(0,9);
  Plotly.restyle("bar", "x", [x]);
  Plotly.restyle("bar", "y", [y]);

  // update the bubble chart
  var x = otuIDs[otuIndex].slice(0,9);
  var x = otuSample[otuIndex].slice(0,9);
  Plotly.restyle("bubble", "x", [x]);
  Plotly.restyle("bubble", "y", [y]);

  // update the gauge chart
  var value = otuInfo[otuIndex].wfreq
  Plotly.restyle("gauge-chart", "value", [value]);
  });
};

init()
