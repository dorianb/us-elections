var React = require('react');

var Races = require('../components/Races');
var MapViewStore = require('../stores/MapViewStore');


function getAppState() {
  var dataset = MapViewStore.getMapView();
  console.log("Races received new state");
  console.log(dataset);
  return dataset;
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
    var data = []
    for(var state in this.state) {
      var winner = this.state[state].fillKey;
      if(winner != "Trump" && winner!="Clinton") {
        winner = "Indéterminé";
      }
      var datum = {
        state: state,
        percent: this.state[state].electoralVotes / 538 * 100,
        winner: winner
      };
      data.push(datum);
    }
    return <Races {...data} />;
  }
});

module.exports = RacesContainer;
