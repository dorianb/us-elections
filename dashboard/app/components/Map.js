var React = require('react');
var MapView = require('./MapView');
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
        <div className="col-sm-9">
          <MapView reference={this.state.reference} />
        </div>
        <div className="col-sm-3">
          <MapInfo />
        </div>
      </div>
    );
  }
});

module.exports = Map;
