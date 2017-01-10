var React = require('react');
var d3BasicChart = require('./d3BasicChart');

var BasicChart = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    domain: React.PropTypes.object
  },

  componentDidMount: function() {
    console.log("Compenent did mount");
    var el = this.refs.Chart01;

    d3BasicChart.create(el, {
      width: '100%',
      height: '100%'
    }, this.getChartState());

    console.log("D3 chart created");
  },

  componentDidUpdate: function() {
    console.log("Compenent did update");

    var el = this.refs.Chart01;
    d3BasicChart.update(el, this.getChartState());
  },

  getChartState: function() {
    return {
      data: this.props.data,
      domain: this.props.domain
    };
  },

  componentWillUnmount: function() {
    console.log("Compenent will unmount");

    var el = this.refs.Chart01;
    d3BasicChart.destroy(el);
  },

  render: function() {
    console.log("Chart rendering");

    return (
      <div className="Chart" ref="Chart01"></div>
    );
  }
});

module.exports = BasicChart;
