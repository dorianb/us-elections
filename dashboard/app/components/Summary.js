var React = require('react');
var Total = require('./Total');
var Races = require('./Races');
var PopularVotes = require('./PopularVotes');
var Middle = require('./Middle');

var Summary = React.createClass({
  getInitialState: function() {
    return {
      reference: "Summary"
    };
  },
  render: function () {
    return (
      <div id="president-summary">
        <div className="inner">
          <Total class="total-clinton"
            name="Clinton"
            electoralVotes="232" />
          <Middle />
          <Total class="total-trump"
            name="Trump"
            electoralVotes="306" />
          <Races />
          <PopularVotes
            clintonPopularVotes="62,521,739"
            trumpPopularVotes="61,195,258" />
        </div>
      </div>
    );
  }
});

module.exports = Summary;
