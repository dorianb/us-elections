var React = require('react');
var SummaryContainer = require('../containers/SummaryContainer');
var Map = require('./Map');


var Main = React.createClass({
  render: function () {
    return (
      <main>
        <div className="container-fluid">
          <div className="row">
            <SummaryContainer />
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
