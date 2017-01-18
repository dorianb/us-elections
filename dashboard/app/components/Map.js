var React = require('react');
var MapView = require('./MapView');
var MapInfoContainer = require('../containers/MapInfoContainer');

var Map = React.createClass({
  getInitialState: function() {
    return {
      reference: "Map"
    };
  },
  render: function () {
    return (
      <div className="map-and-map-info">
        <div className="col-sm-9">
          <MapView reference={this.state.reference} />
        </div>
        <div className="col-sm-3">
          <MapInfoContainer />
        </div>
      </div>
    );
  }
});

module.exports = Map;
