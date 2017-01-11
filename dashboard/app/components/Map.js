var React = require('react');
var MapView = require('../D3Components/MapView');

var Map = React.createClass({
  getInitialState: function() {
    return {
      reference: "Map"
    };
  },
  render: function () {
    return (
      <div className="chart-wrapper">
        <div className="chart-stage">
          { /*<img data-src="holder.js/100%x240/white" />*/ }
          <MapView reference={this.state.reference} />
        </div>
      </div>
    );
  }
});

module.exports = Map;
