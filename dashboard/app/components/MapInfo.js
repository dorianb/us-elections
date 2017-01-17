var React = require('react');


var MapInfo = React.createClass({
  render: function() {
    return (
      <div className="map-info">
        <div id="changelog">
          <div className="heading">
            <h3>Just In</h3>
            <div id="refresh">
              <button className="refresh"></button>
              <span className="countdown">Refreshing in 19 seconds</span>
            </div>
          </div>
          <ol>
            <li id="change-1011" className="gop-win">
              <span className="state" data-state-id="MI"></span>
              <span className="leader gop-win">Trump</span>
              <span className="won"> won</span>
              <span className="race" data-race-id="MI"> Michigan</span>
              <time dateTime="2016-11-28T19:55:35.803Z">8:55 PM CET</time>
            </li>
            <li id="change-987" className="dem-win">
              <span className="state" data-state-id="NH"></span>
              <span className="leader dem-win">Clinton</span>
              <span className="won"> won</span>
              <span className="race" data-race-id="NH"> New Hampshire</span>
              <time dateTime="2016-11-14T22:04:00.959Z">11:04 PM CET</time>
            </li>
          </ol>
        </div>
      </div>
    );
  }
});

module.exports = MapInfo;
