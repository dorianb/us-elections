var React = require('react');

var Races = React.createClass({

  render: function() {
    return (
      <ol className="races">
        <li style={{width: "10.223%", order: 0}} data-race-id="CA" className="dem-win"></li>
        <li style={{width: "10.223%", order: 0}} data-race-id="CO" className="dem-win"></li>
        <li style={{width: "10.223%", order: 0}} data-race-id="CT" className="dem-win"></li>
        <li style={{width: "10.223%", order: 0}} data-race-id="PA" className="gop-win"></li>
      </ol>
    );
  }
});

module.exports = Races;
