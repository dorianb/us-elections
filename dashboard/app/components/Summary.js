var React = require('react');

var Total = require('./Total');
var RacesContainer = require('../containers/RacesContainer');
var PopularVotes = require('./PopularVotes');
var Middle = require('./Middle');

var Summary = React.createClass({
  propTypes:  {
    Clinton: React.PropTypes.shape({
      Gvoters: React.PropTypes.number,
      votes: React.PropTypes.string
    }),
    Trump: React.PropTypes.shape({
      Gvoters: React.PropTypes.number,
      votes: React.PropTypes.string
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
            electoralVotes={this.props.Clinton.Gvoters} />
          <Middle />
          <Total class="total-trump"
            name="Trump"
            electoralVotes={this.props.Trump.Gvoters} />
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
