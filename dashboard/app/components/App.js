var React = require('react');
var Header = require('./Header');
var Main = require('./Main');

// http://elections.huffingtonpost.com/2016/results/president
// https://www.tutorialspoint.com/reactjs/reactjs_using_flux.htm

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
