var React = require('react');

var Summary = require('../components/Summary');

var SummaryStore = require('../stores/SummaryStore');
var DjangoAPI = require('../api/DjangoApi');
var api = new DjangoAPI();

function getAppState() {
  var states = SummaryStore.getSummary();
  console.log("Summary received new state");
  console.log(states);
  for(var state in states) {
    if(["Clinton", "Trump"].indexOf(state) >= 0) {
      var votes = states[state].votes.toString();
      var end = votes.length-1;
      for (i = votes.length % 3; i > 0; i--) {
        var vote = states[state].votes.toString();
        states[state].votes = vote.slice(0, end-2) + " " + vote.slice(end-2);
        end -= 3;
      }
    }
  }
  return states;
}

function getApiState() {
  return api;
}

var SummaryContainer = React.createClass({
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
      self.getApi().getSummary();
      self._timer = setInterval(function() {
        console.log("Refreshing summary");
        self.getApi().getSummary();
      }, 30000);
    }, 1000);
  },
  componentWillMount: function() {
    SummaryStore.addChangeListenerSummary(this._onChangeSummary);
  },
  componentDidMount: function() {
    this.startPolling();
  },
  componentsWillUnmount: function() {
    SummaryStore.removeChangeListenerSummary(this._onChangeSummary);

    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  },
  _onChangeSummary: function() {
    this.setState(getAppState());
  },
  render: function() {
    return (
      <Summary {...this.state} />
    );
  }
});

module.exports = SummaryContainer;
