var React = require('react');
var Summary = require('./Summary');
var Map = require('./Map');


var Main = React.createClass({
  render: function () {
    return (
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <Summary />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Map />
            </div>
          </div>
        </div>
      </main>
    );
  }
});

module.exports = Main;
