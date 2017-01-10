var React = require('react');
var d3Chart = require('./d3Chart');

var Chart = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    domain: React.PropTypes.object
  },

  componentDidMount: function() {
    console.log("Compenent did mount");
    var el = this.refs.Chart01;
    console.log(el);
    d3Chart.create(el, {
      width: '100%',
      height: '300px'
    }, this.getChartState());

    console.log("D3 chart created");
  },

  componentDidUpdate: function() {
    console.log("Compenent did update");

    var el = this.getDOMNode();
    d3Chart.update(el, this.getChartState());
  },

  getChartState: function() {
    return {
      data: this.props.data,
      domain: this.props.domain
    };
  },

  componentWillUnmount: function() {
    console.log("Compenent will unmount");
    var el = this.getDOMNode();
    d3Chart.destroy(el);
  },

  render: function() {
    console.log("Chart rendering");

    return (
      <div className="Chart" ref="Chart01"></div>
    );
  }
});

module.exports = Chart;
