
// Create an array of each country's numbers
function init() {
  d3.json("samples.json").then(function(data) {
    var initial_ID = data.samples[0].id.slice(0,9);
    var initial_labels = data.samples[0].otu_ids;
    var names = initial_labels.map((item, index) => `OTU ${item}`);
    var initial_values = data.samples[0].sample_values;
    var initial_text =  data.samples[0].otu_labels;
    console.log(initial_values);
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
      title: initial_ID,
      xaxis: { title: "OTU"},
      yaxis: { title: "Value"}
    };

  Plotly.newPlot("bar", data, layout);

    var trace1 = {
      x: initial_labels,
      y: initial_values,
      text: initial_text,
      mode: 'markers',
      marker: {
        color: initial_labels,
        opacity: 0.8,
        size: initial_values,
        sizeref: 2.0 * Math.max(initial_values) / (10**2),
        sizemode: 'area'
      },
      
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Marker Size and Color',
      showlegend: false,
      height: 400,
      width: 800
    };
  
  Plotly.newPlot('bubble', data, layout);  


  });
};





function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  };


d3.json("samples.json").then(function(data) {
    var otuIDs = [];
    var otuLabels = [];
    var otuSample = [];
    for (i=0; i<data.samples.length; i++) {
        otuIDs.push(data.samples[i].id);
        otuLabels.push(data.samples[i].otu_labels);
        otuSample.push(data.samples[i].sample_values);
    };

    var optionOTU = d3.select("#selDataset");

    otuIDs.forEach(function(person) {
    var row = optionOTU.append("option");
    row.text(person);
    });

    d3.selectAll("#selDataset").on("change", getData);
    function getData() {
      var dropdownMenu = d3.select("#selDataset");
      // Assign the value of the dropdown menu option to a variable
      var dataset = dropdownMenu.property("value");
      console.log(dataset);

      for (i=0; i<otuIDs.length; i++) {
        if (otuIDs[i] === dataset)
          var otuIndex = i;
        };
      console.log(otuIndex);
    };

  });



// On change to the DOM, call getData()
init()
