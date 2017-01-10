var React = require('react');
var BasicChart = require('./BasicChart');
var Map = require('./Map');

var Home = React.createClass({
  render: function () {
    return (
      <div className="container-fluid">

        <div className="row">
          <div className="col-sm-3">
            <div className="chart-wrapper">
              <div className="chart-title">
                Cell Title
              </div>
              <div className="chart-stage">
                <img data-src="holder.js/100%x650/white" />
              </div>
              <div className="chart-notes">
                Notes about this chart
              </div>
            </div>
          </div>
          <div className="col-sm-9">
            <div className="row">
              <div className="col-sm-12">
                <Map />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <BasicChart />
              </div>
              <div className="col-sm-4">
                <div className="chart-wrapper">
                  <div className="chart-title">
                    Cell Title
                  </div>
                  <div className="chart-stage">
                    <img data-src="holder.js/100%x120/white" />
                  </div>
                  <div className="chart-notes">
                    Notes about this chart
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="chart-wrapper">
                  <div className="chart-title">
                    Cell Title
                  </div>
                  <div className="chart-stage">
                    <img data-src="holder.js/100%x120/white" />
                  </div>
                  <div className="chart-notes">
                    Notes about this chart
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <div className="chart-wrapper">
                  <div className="chart-title">
                    Cell Title
                  </div>
                  <div className="chart-stage">
                    <img data-src="holder.js/100%x120/white" />
                  </div>
                  <div className="chart-notes">
                    Notes about this chart
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="chart-wrapper">
                  <div className="chart-title">
                    Cell Title
                  </div>
                  <div className="chart-stage">
                    <img data-src="holder.js/100%x120/white" />
                  </div>
                  <div className="chart-notes">
                    Notes about this chart
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="chart-wrapper">
                  <div className="chart-title">
                    Cell Title
                  </div>
                  <div className="chart-stage">
                    <img data-src="holder.js/100%x120/white" />
                  </div>
                  <div className="chart-notes">
                    Notes about this chart
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Home;
