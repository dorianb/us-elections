var React = require('react');
var d3 = require('d3');


var Prediction = React.createClass({
  propTypes:  {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      width: 0,
      height: 0
    };
  },
  componentDidUpdate: function() {
    var vis = d3.select("#svg_prediction");
    vis.selectAll("*").remove();

    var height = this.props.height*2;
    var width = this.props.width;

    var radius = width;
    if(height < width) {
      radius = height;
    }

    var cScale = d3.scaleLinear().domain([0, 538]).range([0, 2 * Math.PI]);

    var data = [];
    var dataset = this.props.prediction;
    var start_clinton = 0
    var start_trump = 0

    for(var state in dataset) {
      var winner = dataset[state].fillKey;
      var start = winner == 'Clinton' ? start_clinton : start_trump;
      var end = start + dataset[state].Gvoters;
      var color = winner == 'Clinton' ? '#4c7de0':'#e52426';
      var datum = [start, end, color];
      data.push(datum);
      start_clinton = winner == 'Clinton' ? end : start_clinton;
      start_trump = winner == 'Trump' ? end : start_trump;
    }

    var vis = d3.select("#svg_prediction");

    var arc = d3.arc()
      .innerRadius(radius/5)
      .outerRadius(radius/2.5)
      .startAngle(function(d){return cScale(d[0]);})
      .endAngle(function(d){return cScale(d[1]);});

    /*vis.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", function(d) { return radius/2-radius/12; })
      .attr("y", function(d) { return radius/2+radius/40; })
      .attr("font-size", function(d) { return d[3]; })
      .text(function (d) { return d[1] + "%"; });*/

    vis.selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("d", arc)
      .style("fill", function(d){return d[2];})
      .attr("transform", "translate(" + radius/2 + "," + radius/2 + ")");
  },
  render: function () {
    return (
      <svg id="svg_prediction" width={this.props.width} height={this.props.width}>
      </svg>
    );
  }
});

module.exports = Prediction;
