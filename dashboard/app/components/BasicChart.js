var React = require('react');
var Chart = require('../D3Components/BasicChart');


var sampleData = [
  {id: '5fbmzmtc', x: 7, y: 41, z: 6},
  {id: 's4f8phwm', x: 11, y: 45, z: 9},
  {id: 'ddgsgsdez', x: 15, y: 50, z: 15}
];

var BasicChart = React.createClass({
  getInitialState: function() {
    return {
      data: sampleData,
      domain: {x: [0, 30], y: [0, 100]},
      reference: "BasicChart"
    };
  },
  render: function () {
    return (
      <div className="chart-wrapper">
        <div className="chart-title">
          Cell Title
        </div>
        <div className="chart-stage">
          { /*<img data-src="holder.js/100%x240/white" />*/ }
          <Chart
            data={this.state.data}
            domain={this.state.domain}
            reference={this.state.reference} />
        </div>
        <div className="chart-notes">
          Notes about this chart
        </div>
      </div>
    );
  }
});

module.exports = BasicChart;
