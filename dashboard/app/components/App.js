var React = require('react');
var Chart = require('./Chart');

var sampleData = [
  {id: '5fbmzmtc', x: 7, y: 41, z: 6},
  {id: 's4f8phwm', x: 11, y: 45, z: 9}
];

var App = React.createClass({

  getInitialState: function() {
    return {
      data: sampleData,
      domain: {x: [0, 30], y: [0, 100]}
    };
  },
  render: function () {
    return (
      <div className="application">
        <div className="navbar navbar-inverse" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>

              <a className="navbar-brand" href="/">
                <span className="glyphicon glyphicon-chevron-left"></span>
                Dashboard
              </a>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-left">
                <li><a href="s/home">Home</a></li>
                <li><a href="/team">Team</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container-fluid">

          <div className="row">
            <div className="col-sm-3">
              <div className="chart-wrapper">
                <div className="chart-title">
                  Cell Title
                </div>
                <div className="chart-stage">
                  {/* <img data-src="holder.js/100%x650/white" /> */}
                  <Chart
                    data={this.state.data}
                    domain={this.state.domain} />
                </div>
                <div className="chart-notes">
                  Notes about this chart
                </div>
              </div>
            </div>
            <div className="col-sm-9">
              <div className="row">
                <div className="col-sm-12">
                  <div className="chart-wrapper">
                    <div className="chart-title">
                      Cell Title
                    </div>
                    <div className="chart-stage">
                      <img data-src="holder.js/100%x240/white" />
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
      </div>
    );
  }
});

module.exports = App;
