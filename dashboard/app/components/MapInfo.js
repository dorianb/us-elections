var React = require('react');
var PieChart = require('./PieChart');


var MapInfo = React.createClass({
  propTypes:  {
    turnout: React.PropTypes.number
  },
  getDefaultProps: function() {
    return {
      turnout: 0
    };
  },
  getInitialState: function() {
    return {};
  },
  resize: function() {
    console.log("Resizing");
    var width = this.refs.MapInfo.offsetWidth;
    var height = this.refs.MapInfo.offsetHeight;

    this.setState({
      width: width,
      height: height
    });
  },
  componentDidMount: function() {
    window.addEventListener("resize", this.resize);

    this.resize();
  },
  componentWillReceiveProps: function() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
    this.setState({timing: 30});
    var self = this;
    this._timer = setInterval(function() {
      self.setState({timing: self.state.timing-1});
    }, 1000);
  },
  componentsWillUnmount: function() {
    window.removeEventListener("resize", this.resize);

    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  },
  render: function() {
    var infos = [];
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
      <div className="map-info" ref="MapInfo">
        <div id="changelog">
          <div className="heading">
            <h3>Statistiques</h3>
            <div id="refresh">
              <button className="refresh"></button>
              <span className="countdown">Refreshing in {this.state.timing} seconds</span>
            </div>
          </div>
          <br/>
          <p className="text-center">Participation</p>
          <PieChart {...this.state} {...this.props} />

          {/*<ol>
            {infos}
          </ol>*/}
        </div>
      </div>
    );
  }
});

module.exports = MapInfo;
