var React = require('react');


var MapInfo = React.createClass({
  getDefaultProps: function() {
    return {};
  },
  render: function() {
    infos = [];
    for (var i in this.props) {
      var info = this.props[i];
      var color;
      if(info.subject == "Trump") {
        color = "gop";
      }
      else {
        color = "dem";
      }
      if(info.verb == "won") {
        color += "-win";
      }
      else {
        color += "-lead";
      }
      infos.push(
        <li key={i} id={"change-" + i} className={color}>
          <span className="state" data-state-id={info.state_id}></span>
          <span className={"leader " + color}>{info.subject}</span>
          <span className={info.verb}> {info.verb}</span>
          <span className="race" data-race-id={info.state_id}> {info.state} </span>
          {info.complement}
          <time dateTime={info.datetime}>{info.time}</time>
        </li>
      );
    }
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
            {infos}
          </ol>
        </div>
      </div>
    );
  }
});

module.exports = MapInfo;
