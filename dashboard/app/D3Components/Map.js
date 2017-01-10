var React = require('react');
var d3Map = require('./d3Map');

var Map = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    domain: React.PropTypes.object,
    reference: React.PropTypes.string.isRequired
  },

  componentDidMount: function() {
    console.log(this.props.reference + " compenent did mount");
    var el = this.refs[this.props.reference];

    d3Map.create(el, {
      width: '100%',
      height: '100%'
    }, this.getChartState());
  },

  componentDidUpdate: function() {
    console.log(this.props.reference + " compenent did update");

    var el = this.refs[this.props.reference];
    d3Map.update(el, this.getChartState());
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
    d3Map.destroy(el);
  },

  render: function() {
    console.log(this.props.reference + " rendering");

    return (
      <div className="Chart" ref={this.props.reference}></div>
    );
  }
});

module.exports = Map;
