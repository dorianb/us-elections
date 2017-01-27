var React = require('react');

var Header = React.createClass({
  getDefaultProps: function() {
    return {};
  },
  getInitialState: function() {
    return {
      timing: new Date("November 08, 2016 20:10:00")
    };
  },
  componentWillMount: function() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
    var self = this;
    this._timer = setInterval(function() {
      var date = self.state.timing
      date.setSeconds(date.getSeconds() + 1)
      self.setState({timing: date});
    }, 1000);
  },
  componentsWillUnmount: function() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  },
  render: function () {
    return (
      <header>
        <h2 className="election-header">
          <span className="dem">Election</span>
          <span className="gop">2016</span>
        </h2>
        <h2 className="election-header">
          <span>{this.state.timing.toLocaleTimeString()}</span>
        </h2>
      </header>
    );
  }
});

module.exports = Header;
