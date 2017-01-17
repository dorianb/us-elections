var React = require('react');

var Summary = require('../components/Summary');

var SummaryStore = require('../stores/SummaryStore');
var SummaryActions = require('../actions/SummaryActions');
var ElectionsAPI = require('../api/ElectionsApi');
var api = new ElectionsAPI("../app/data/summary.json");

function getAppState() {
  var states = SummaryStore.getAll();
  for(var state in states) {
    var votes = states[state].votes.toString();
    var end = votes.length-1
    for (i = votes.length % 3; i > 0; i--) {
      var vote = states[state].votes.toString();
      states[state].votes = vote.slice(0, end-2) + " " + vote.slice(end-2);
      end -= 3;
    }
  }
  return states;
}

var SummaryContainer = React.createClass({
  getInitialState: function() {
    return getAppState();
  },
  componentWillMount: function() {
    SummaryStore.addChangeListener(this._onChange);
  },
  componentDidMount: function() {
    console.log("Let's load summary");
    //SummaryActions.loadSummary();
    api._all();
  },
  componentsWillUnmount: function() {
    SummaryStore.removeChangeListener(this._onChange);
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
