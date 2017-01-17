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
      <div className="inner">
        <MapView reference={this.state.reference} />
      </div>
    );
  }
});

module.exports = Map;
