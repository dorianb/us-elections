var React = require('react');

var MapInfo = require('../components/MapInfo');

var TimelineStore = require('../stores/TimelineStore');
var SummaryStore = require('../stores/SummaryStore');
var PredictionStore = require('../stores/PredictionStore');

var DjangoAPI = require('../api/DjangoApi');
var api = new DjangoAPI();

function getAppState() {
  var infos = TimelineStore.getTimeline();
  console.log("MapInfo received new state");
  console.log(infos);
  return infos;
}

function getSummaryState() {
  var states = SummaryStore.getSummary();
  console.log("MapInfo received new state");
  console.log(states);
  return {
    turnout: Math.round(states.turnout*10)/10
  };
}

function getPredictionState() {
  var states = PredictionStore.getPrediction();
  console.log("MapInfo received new state");
  console.log(states);
  return {
    prediction: states
  };
}

function getApiState() {
  return api;
}

var TimelineContainer = React.createClass({
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
      self.getApi().getTimeline();
      self.getApi().getPrediction();

      self._timer = setInterval(function() {
        
        console.log("Refreshing map info");
        self.getApi().getTimeline();
        self.getApi().getPrediction();
      }, 30000);
    }, 1000);
  },
  componentWillMount: function() {
    TimelineStore.addChangeListenerTimeline(this._onChangeTimeline);
    SummaryStore.addChangeListenerSummary(this._onChangeSummary);
    PredictionStore.addChangeListenerPrediction(this._onChangePrediction);
  },
  componentDidMount: function() {
    this.startPolling();
  },
  componentsWillUnmount: function() {
    TimelineStore.removeChangeListenerTimeline(this._onChangeTimeline);
    SummaryStore.removeChangeListenerSummary(this._onChangeSummary);
    PredictionStore.removeChangeListenerPrediction(this._onChangePrediction);

    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  },
  _onChangeTimeline: function() {
    this.setState(getAppState());
  },
  _onChangeSummary: function() {
    this.setState(getSummaryState());
  },
  _onChangePrediction: function() {
    this.setState(getPredictionState());
  },
  render: function() {
    return (
      <MapInfo {...this.state} />
    );
  }
});

module.exports = TimelineContainer;
