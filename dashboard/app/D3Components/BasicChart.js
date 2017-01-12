var React = require('react');
var d3BasicChart = require('./d3BasicChart');

var BasicChart = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    domain: React.PropTypes.object,
    reference: React.PropTypes.string.isRequired
  },

  componentDidMount: function() {
    console.log(this.props.reference + " compenent did mount");
    var el = this.refs[this.props.reference];

    d3BasicChart.create(el, {
      width: '100%',
      height: '100%'
    }, this.getChartState());
  },

  componentDidUpdate: function() {
    console.log(this.props.reference + " compenent did update");

    var el = this.refs[this.props.reference];
    d3BasicChart.update(el, this.getChartState());
  },

  getChartState: function() {
    return {
      data: this.props.data,
      domain: this.props.domain
    };
  },

  componentWillUnmount: function() {
    console.log(this.props.reference + "compenent will unmount");

    var el = this.refs[this.props.reference];
    d3BasicChart.destroy(el);
  },

  render: function() {
    console.log(this.props.reference + " rendering");

    return (
      <div className="Chart" ref={this.props.reference}></div>
    );
  }
});

module.exports = BasicChart;
