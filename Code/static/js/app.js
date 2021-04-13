// need to import data to app.js
// need to determine the keys in the data set. not some might be dictionaries and others arrays
// 

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  };

  // Call updatePlotly() when a change takes place to the DOM
// d3.selectAll("#selDataset").on("change", buildBar);



// // bar chart function
// function buildBar () {
//   // Use D3 to select the dropdown menu
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.property("value");

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

        // On change to the DOM, call getData()
        d3.selectAll("#selDataset").on("change", getData);
        function getData() {
          var dropdownMenu = d3.select("#selDataset");
          // Assign the value of the dropdown menu option to a variable
          var dataset = dropdownMenu.property("value");
          console.log(dataset);}
  // });
        // var otuIDs = data.map((item, index) => 
        // data.samples[index].id);
        // var names = data.names;
        // var stock = data.dataset.dataset_code;
        // var startDate = data.dataset.start_date;
        // var endDate = data.dataset.end_date;
        // var names = unpack(data.names, 0);
        // var closingPrices = unpack(data.dataset.data, 4);
        // console.log(names);
});
// }
//     function barchart (data) {
//         x: ,
//         y: ,
//         type: "bar"
// };

//     var data = [trace1];
  
//     var layout = {
//         title: "Bar Chart",
//         xaxis: { title: "Source"},
//         yaxis: { title: "Number"}
//     };
  
//   Plotly.newPlot("bar", data, layout);
