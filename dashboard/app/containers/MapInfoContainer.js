var React = require('react');

var MapInfo = require('../components/MapInfo');

var MapInfoStore = require('../stores/MapInfoStore');
var MapInfoActions = require('../actions/MapInfoActions');
var DjangoAPI = require('../api/DjangoApi');
var api = new DjangoAPI('../app/data/timeLine.json');

function getAppState() {
  var infos = MapInfoStore.getMapInfo();
  console.log("MapInfo received new state");
  console.log(infos);
  return infos;
}

function getApiState() {
  return api;
}

var MapInfoContainer = React.createClass({
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
      self.getApi().getMapInfo();
      self._timer = setInterval(function() {
        console.log("Refreshing map info");
        self.getApi().getMapInfo();
      }, 30000);
    }, 1000);
  },
  componentWillMount: function() {
    MapInfoStore.addChangeListener(this._onChangeMapInfo);
  },
  componentDidMount: function() {
    this.startPolling();
  },
  componentsWillUnmount: function() {
    MapInfoStore.removeChangeListener(this._onChangeMapInfo);

    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  },
  _onChangeMapInfo: function() {
    this.setState(getAppState());
  },
  render: function() {
    return (
      <MapInfo {...this.state} />
    );
  }
});

module.exports = MapInfoContainer;
