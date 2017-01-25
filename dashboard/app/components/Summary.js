var React = require('react');

var Total = require('./Total');
var RacesContainer = require('../containers/RacesContainer');
var PopularVotes = require('./PopularVotes');
var Middle = require('./Middle');

var Summary = React.createClass({
  propTypes:  {
    Clinton: React.PropTypes.shape({
      electoralVotes: React.PropTypes.number.isRequired,
      votes: React.PropTypes.string.isRequired
    }),
    Trump: React.PropTypes.shape({
      electoralVotes: React.PropTypes.number.isRequired,
      votes: React.PropTypes.string.isRequired
    })
  },
  getDefaultProps: function() {
    return {
      Clinton: {
        electoralVotes: 0,
        votes: "0"
      },
      Trump: {
        electoralVotes: 0,
        votes: "0"
      }
    };
  },
  render: function () {
    return (
      <div id="president-summary">
        <div className="inner">
          <Total class="total-clinton"
            name="Clinton"
            electoralVotes={this.props.Clinton.electoralVotes} />
          <Middle />
          <Total class="total-trump"
            name="Trump"
            electoralVotes={this.props.Trump.electoralVotes} />
          <RacesContainer />
          <PopularVotes
            clintonPopularVotes={this.props.Clinton.votes}
            trumpPopularVotes={this.props.Trump.votes} />
        </div>
      </div>
    );
  }
});

module.exports = Summary;
