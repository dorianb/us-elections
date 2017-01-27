var React = require('react');


var PopularVotes = React.createClass({
  render: function() {
    return (
      <div className="popular-votes">
        <div className="clinton-popular-votes">
          <strong>{this.props.clintonPopularVotes}</strong> votes
        </div>
        <div className="trump-popular-votes">
          <strong>{this.props.trumpPopularVotes}</strong> votes
        </div>
      </div>
    );
  }
});

module.exports = PopularVotes;
