var React = require('react');
var MapView = require('../D3Components/MapView');
var MapInfo = require('./MapInfo');

var Map = React.createClass({
  getInitialState: function() {
    return {
      reference: "Map"
    };
  },
  render: function () {
    return (
      <div className="map-and-map-info">
        <div className="col-md-10">
          <MapView reference={this.state.reference} />
        </div>
        <div className="col-md-2">
          <MapInfo />
        </div>
      </div>
    );
  }
});

module.exports = Map;
