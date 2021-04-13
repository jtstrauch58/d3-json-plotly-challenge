
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

    
