var React = require('react');
var Header = require('./Header');
var Main = require('./Main');

var App = React.createClass({

  render: function () {
    return (
      <div className="president">
        <Header />
        <Main />
      </div>
    );
  }
});

module.exports = App;
