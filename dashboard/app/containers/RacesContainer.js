var React = require('react');

var Races = require('../components/Races');
var MapViewStore = require('../stores/MapViewStore');
var _ = require('underscore');


function getAppState() {
  var dataset = MapViewStore.getMapView();
  var data = [];

  for(var state in dataset) {
    var winner = dataset[state].fillKey;
    if(["Trump", "Clinton"].indexOf(winner) >= 0) {
      var datum = {
        state: state,
        percent: dataset[state].Gvoters / 538 * 100,
        winner: winner
      };
      data.push(datum);
    }
  }

  if(!_.isEmpty(data)) {
    var percent_known = data.reduce(function(a, b) {
      return {percent: a.percent + b.percent};
    }).percent;

    var percent_unknown = 100 - percent_known;
    
    var datum = {
      state: "unknown",
      percent: percent_unknown,
      winner: "Not determined"
    };
    data.push(datum);

    return data;
  }

  return null;
}

var RacesContainer = React.createClass({
  getInitialState: function() {
    return getAppState();
  },
  componentWillMount: function() {
    MapViewStore.addChangeListenerMapView(this._onChangeMapView);
  },
  componentsWillUnmount: function() {
    MapViewStore.removeChangeListenerMapView(this._onChangeMapView);
  },
  _onChangeMapView: function() {
    this.setState(getAppState());
  },
  render: function() {
    return <Races {...this.state} />;
  }
});

module.exports = RacesContainer;
