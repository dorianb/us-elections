var React = require('react');
var d3Chart = require('./d3Chart');

var Chart = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    domain: React.PropTypes.object
  },

  componentDidMount: function() {
    alert("Compenent did mount");

    var el = this.getDOMNode();
    d3Chart.create(el, {
      width: '100%',
      height: '300px'
    }, this.getChartState());
    alert("D3 chart created");
  },

  componentDidUpdate: function() {
    alert("Compenent did update");

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
    alert("Compenent will unmount");
    var el = this.getDOMNode();
    d3Chart.destroy(el);
  },

  render: function() {
    alert("Chart rendering");

    return (
      <div className="Chart"></div>
    );
  }
});

module.exports = Chart;
