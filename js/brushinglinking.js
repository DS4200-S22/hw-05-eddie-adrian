// Set margins and dimensions 
const margin = { top: 50, right: 50, bottom: 50, left: 200 };
const width = 900; //- margin.left - margin.right;
const height = 650; //- margin.top - margin.bottom;

// Append svg object to the body of the page to house Scatterplot1
const svg1 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 

// Initialize brush for Scatterplot1 and points. We will need these to be global. 
let brush1; 
let myCircles1; 

//TODO: append svg object to the body of the page to house Scatterplot2 (call it svg2)

const svg2 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 


//TODO: Initialize brush for Scatterplot2 and points. We will need these to be global.

let brush2;
let myCircle2;

//TODO: append svg object to the body of the page to house bar chart 

const svg3 = d3.select("#vis-holder")
                .append("svg")
                .attr("width", width - margin.left - margin.right)
                .attr("height", height - margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width, height]); 

//TODO: Initialize bars. We will need these to be global. 

let bars;

// Define color scale
const color = d3.scaleOrdinal()
                .domain(["setosa", "versicolor", "virginica"])
                .range(["#FF7F50", "#21908dff", "#fde725ff"]);

// Plotting 
d3.csv("data/iris.csv").then((data) => {
  
  // We will need scales for all of the following charts to be global
  let x1, y1, x2, y2, x3, y3;  

  // We will need keys to be global
  let xKey1, yKey1, xKey2, yKey2, xKey3, yKey3;

  // Scatterplot1
  {
    let xKey1 = "Sepal_Length";
    let yKey1 = "Petal_Length";

    // Find max x
    let maxX1 = d3.max(data, (d) => { return d[xKey1]; });

    // Create X scale
    let x1 = d3.scaleLinear()
                .domain([0,maxX1])
                .range([margin.left, width-margin.right]); 
    
    // Add x axis 
    svg1.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x1))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right)
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey1)
      );

    // Finx max y 
    let maxY1 = d3.max(data, (d) => { return d[yKey1]; });

    // Create Y scale
    let y1 = d3.scaleLinear()
                .domain([0, maxY1])
                .range([height - margin.bottom, margin.top]); 

    // Add y axis 
    svg1.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y1)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey1)
      );

    // Add points
    const myCircles1 = svg1.selectAll("circle")
                            .data(data)
                            .enter()
                              .append("circle")
                              .attr("id", (d) => d.id)
                              .attr("cx", (d) => x1(d[xKey1]))
                              .attr("cy", (d) => y1(d[yKey1]))
                              .attr("r", 8)
                              .style("fill", (d) => color(d.Species))
                              .style("opacity", 0.5);

    //TODO: Define a brush (call it brush1)

    svg1
    .call( d3.brush()                 // Add the brush feature using the d3.brush function
      .extent( [ [margin.left, margin.top], [width-margin.right, height-margin.bottom] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
    )

  // Function that is triggered when brushing is performed
  function updateChart() {
    extent = d3.event.selection
    //myCircles1.classed("selected", function(d){ return isBrushed(extent, x(d[xKey1]), y(d[yKey1]) ) } )
    //myCircles1.classed("selected", True )
    //document.getElementById("vis-holder").classList.add("selected")
  //   if (isBrushed(extent, x(d[xKey1]), y(d[yKey1]))) {
  //     document.getElementById("vis-holder").setAttribute("class", "selected");
  //   }
  }

  // A function that return TRUE or FALSE according if a dot is in the selection or not
  // function isBrushed(brush_coords, cx, cy) {
  //      var x0 = brush_coords[0][0],
  //          x1 = brush_coords[1][0],
  //          y0 = brush_coords[0][1],
  //          y1 = brush_coords[1][1];
  //     return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
  // }

    //TODO: Add brush1 to svg1


    
  }

  // TODO: Scatterplot 2 (show Sepal width on x-axis and Petal width on y-axis)
  {
    let xKey2 = "Sepal_Width";
    let yKey2 = "Petal_Width";

    // Find max x
    let maxX2 = d3.max(data, (d) => { return d[xKey2]; });

    // Create X scale
    let x2 = d3.scaleLinear()
                .domain([0,maxX2])
                .range([margin.left, width-margin.right]); 
    
    // Add x axis 
    svg2.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        .call(d3.axisBottom(x2))   
        .attr("font-size", '20px')
        .call((g) => g.append("text")
                      .attr("x", width - margin.right)
                      .attr("y", margin.bottom - 4)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(xKey2)
      );

    // Finx max y 
    let maxY2 = d3.max(data, (d) => { return d[yKey2]; });

    // Create Y scale
    let y2 = d3.scaleLinear()
                .domain([0, maxY2])
                .range([height - margin.bottom, margin.top]); 

    // Add y axis 
    svg2.append("g")
        .attr("transform", `translate(${margin.left}, 0)`) 
        .call(d3.axisLeft(y2)) 
        .attr("font-size", '20px') 
        .call((g) => g.append("text")
                      .attr("x", 0)
                      .attr("y", margin.top)
                      .attr("fill", "black")
                      .attr("text-anchor", "end")
                      .text(yKey2)
      );

    // Add points
    const myCircles2 = svg2.selectAll("circle")
                            .data(data)
                            .enter()
                              .append("circle")
                              .attr("id", (d) => d.id)
                              .attr("cx", (d) => x2(d[xKey2]))
                              .attr("cy", (d) => y2(d[yKey2]))
                              .attr("r", 8)
                              .style("fill", (d) => color(d.Species))
                              .style("opacity", 0.5);

    //TODO: Define a brush (call it brush2)

    //TODO: Add brush2 to svg2
    
  }

  //TODO: Barchart with counts of different species
  {

    let xKey3 = "Species"
    let yKey3 = "Counts"

    console.log(typeof(data));

    counts = {}
    data.forEach(row => {
      counts[row[xKey3]] = counts[row[xKey3]] ? counts[row[xKey3]] + 1: 1
    });
    
    console.log(typeof(counts));
    console.log(counts);
      
    maxY3 = 0
    for (let key in counts){
      if (counts[key] > maxY3) maxY3 = counts[key];
    }
    console.log(maxY3)

    console.log(d3.count(data, d => d.Species));


    let yScale3 = d3.scaleLinear()  // linear scale for linear data on the y axis
        .domain([0,maxY3])  // sets the range of the data from 0 to the max
        .range([height-margin.bottom,margin.top]);

    let xScale3 = d3.scaleBand()  // scale for the different "categories"
        .domain(data.map(d => d.Species))  // sets the number of parts on the x axis to the number of data points
        .range([margin.left, width - margin.right])
        .padding(0.1); // sets a spacing between each item on the axis

    svg3.append("g")  // place holder svg
        .attr("transform", `translate(${margin.left}, 0)`) // moves the scale to the left side of the svg
        .call(d3.axisLeft(yScale3)) // builtin in function for left axis scale
        .attr("font-size", '20px'); // sets the font size

  // X Axis
    svg3.append("g") // place holder svg
        .attr("transform", `translate(0,${height - margin.bottom})`)  // moves the scale to the bottom of the svg
        .call(d3.axisBottom(xScale3))  // built in function to make the bottom axis
            .attr("font-size", '20px');  // font size

    svg3.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale3(d.Species))
        .attr("y", yScale3(d3.count(data, d => d.Species)))
        .attr("height", (d) => yScale3(d3.count(data, d => d.Species)))
        .attr("width", xScale3.bandwidth())
        .style("fill", (d) => color(d.Species))



  }

  //Brushing Code---------------------------------------------------------------------------------------------
    
  // Call to removes existing brushes 
  function clear() {
      svg1.call(brush1.move, null);
      
      //TODO: add code to clear existing brush from svg2
  }

  // Call when Scatterplot1 is brushed 
  function updateChart1(brushEvent) {
      
      //TODO: Find coordinates of brushed region 
  
      //TODO: Give bold outline to all points within the brush region in Scatterplot1

      //TODO: Give bold outline to all points in Scatterplot2 corresponding to points within the brush region in Scatterplot1
    
  }

  // Call when Scatterplot2 is brushed 
  function updateChart2(brushEvent) {
    
    //TODO: Find coordinates of brushed region 

    //TODO: Start an empty set that you can store names of selected species in 
  
    //TODO: Give bold outline to all points within the brush region in Scatterplot2 & collected names of brushed species

    //TODO: Give bold outline to all points in Scatterplot1 corresponding to points within the brush region in Scatterplot2

    //TODO: Give bold outline to all bars in bar chart with corresponding to species selected by Scatterplot2 brush

  }

    //Finds dots within the brushed region
    function isBrushed(brush_coords, cx, cy) {
      if (brush_coords === null) return;

      var x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
    }
});
