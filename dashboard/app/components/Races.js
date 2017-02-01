var React = require('react');
var _ = require('underscore');

var Races = React.createClass({

  render: function() {
    var races = [];
    var data = _.sortBy(this.props, 'winner')
    console.log(data)
    for (var i in data) {
      var race = data[i];
      var color = ""
      if(race.winner == "Trump") {
        color = "gop-win";
      }
      else if(race.winner == "Clinton") {
        color = "dem-win";
      }

      races.push(
        <li key={i} style={{width: race.percent+"%", order: 0}} data-race-id={race.state} className={color}></li>
      );
    }
    return (
      <ol className="races">
        {races}
      </ol>
    );
  }
});

module.exports = Races;
