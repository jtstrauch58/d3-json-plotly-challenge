// need to import data to app.js
// need to determine the keys in the data set. not some might be dictionaries and others arrays
// 

function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
  };


// bar chart function
// function buildBar () {
    d3.json("samples.json").then(function(data) {
        console.log(Object.keys(data));
        var names = data.names;
        // var stock = data.dataset.dataset_code;
        // var startDate = data.dataset.start_date;
        // var endDate = data.dataset.end_date;
        // var names = unpack(data.names, 0);
        // var closingPrices = unpack(data.dataset.data, 4);
        console.log(names);
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
