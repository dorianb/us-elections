var React = require('react');

var MapView = require('../components/MapView');

var MapViewStore = require('../stores/MapViewStore');
var MapViewActions = require('../actions/MapViewActions');
var DjangoAPI = require('../api/DjangoApi');
var api = new DjangoAPI('../app/data/results.json');

function getAppState() {
  var dataset = MapViewStore.getMapView();
  console.log("MapView received new state");
  console.log(dataset);
  return dataset;
}

function getApiState() {
  return api;
}

var MapViewContainer = React.createClass({
  getApi: function() {
    return getApiState();
  },
  getInitialState: function() {
    return getAppState();
  },
  startPolling: function() {
    var self = this;
    setTimeout(function() {
      if (!self.isMounted()) { return; } // abandon
      self.getApi().getMapView();
      self._timer = setInterval(function() {
        console.log("Refreshing map info");
        self.getApi().getMapView();
      }, 30000);
    }, 1000);
  },
  componentWillMount: function() {
    MapViewStore.addChangeListenerMapView(this._onChangeMapView);
  },
  componentDidMount: function() {
    this.startPolling();
  },
  componentsWillUnmount: function() {
    MapViewStore.removeChangeListenerMapView(this._onChangeMapView);

    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  },
  _onChangeMapView: function() {
    this.setState(getAppState());
  },
  render: function() {
    return (
      <MapView {...this.state} />
    );
  }
});

module.exports = MapViewContainer;
