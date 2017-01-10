var React = require('react');
var NavBar = require('./NavBar');
var Home = require('./Home');


var App = React.createClass({

  render: function () {
    return (
      <div className="application">
        <NavBar />
        <Home />
      </div>
    );
  }
});

module.exports = App;
