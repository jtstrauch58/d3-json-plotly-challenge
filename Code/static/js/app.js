

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

    var trace = {
      x: initial_values.slice(0,9),
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

    var trace1 = {
      x: initial_labels,
      y: initial_values,
      mode: 'markers',
      marker: {
        color: initial_labels,
        opacity: 0.8,
        size: initial_values,
        sizeref: 1.0 * Math.max(initial_values) / (1**2),
        sizemode: 'area'
      },
      
    };
    
    var data = [trace1];
    
    var layout = {
      xaxis: {
        showgrid: false},
      yaxis: {
        showgrid: false},  
      title: 'Marker Size and Color',
      showlegend: false,
      showgrid: false,
      height: 400,
      width: 500
    };
  
  Plotly.newPlot('bubble', data, layout);  

  });
};

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
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

  var x = otuSample[otuIndex].slice(0,9);
  var y = otuLabels[otuIndex].map((item, index) => `OTU ${item}`).slice(0,9);
  Plotly.restyle("bar", "x", [x]);
  Plotly.restyle("bar", "y", [y]);

  });
};

init()
