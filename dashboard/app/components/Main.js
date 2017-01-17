var React = require('react');
var Summary = require('./Summary');
var Map = require('./Map');


var Main = React.createClass({
  render: function () {
    return (
      <main>
        <div className="container-fluid">
          <div className="row">
            <Summary />
          </div>
          <div className="row">
            <Map />
          </div>
        </div>
      </main>
    );
  }
});

module.exports = Main;
