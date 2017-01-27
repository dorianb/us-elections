var React = require('react');
var MapViewContainer = require('../containers/MapViewContainer');
var MapInfoContainer = require('../containers/MapInfoContainer');

var Map = React.createClass({
  render: function () {
    return (
      <div className="map-and-map-info">
        <div className="col-sm-9">
          <MapViewContainer />
        </div>
        <div className="col-sm-3">
          <MapInfoContainer />
        </div>
      </div>
    );
  }
});

module.exports = Map;
