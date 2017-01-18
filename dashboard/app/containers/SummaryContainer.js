var React = require('react');

var Summary = require('../components/Summary');

var SummaryStore = require('../stores/SummaryStore');
var DjangoAPI = require('../api/DjangoApi');
var api = new DjangoAPI("../app/data/summary.json");

function getAppState() {
  var states = SummaryStore.getAll();
  for(var state in states) {
    var votes = states[state].votes.toString();
    var end = votes.length-1;
    for (i = votes.length % 3; i > 0; i--) {
      var vote = states[state].votes.toString();
      states[state].votes = vote.slice(0, end-2) + " " + vote.slice(end-2);
      end -= 3;
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
    SummaryStore.addChangeListener(this._onChange);
  },
  componentDidMount: function() {
    this.startPolling();
  },
  componentsWillUnmount: function() {
    SummaryStore.removeChangeListener(this._onChange);

    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  },
  _onChange: function() {
    this.setState(getAppState());
  },
  render: function() {
    return (
      <Summary {...this.state} />
    );
  }
});

module.exports = SummaryContainer;
