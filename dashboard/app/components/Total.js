var React = require('react');

var Total = React.createClass({
  render: function() {
    return (
      <div className={this.props.class}>
        <div className="image"></div>
        <h3>{this.props.name}</h3>
        <strong>{this.props.electoralVotes}</strong>
        <span>electoral votes</span>
      </div>
    );
  }
});

module.exports = Total;
