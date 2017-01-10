var React = require('react');


var Map = React.createClass({
  render: function () {
    return (
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
    );
  }
});

module.exports = Map;
