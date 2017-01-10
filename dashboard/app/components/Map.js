var React = require('react');
var D3Map = require('../D3Components/Map');


var Map = React.createClass({
  getInitialState: function() {
    return {
      reference: "Map"
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
          <D3Map reference={this.state.reference} />
        </div>
        <div className="chart-notes">
          Notes about this chart
        </div>
      </div>
    );
  }
});

module.exports = Map;
