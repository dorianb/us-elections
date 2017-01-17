var React = require('react');

var Header = React.createClass({

  render: function () {
    return (
      <header>
        <h2 className="election-header">
          <span className="dem">Election</span>
          <span className="gop">2016</span>
        </h2>
      </header>
    );
  }
});

module.exports = Header;
