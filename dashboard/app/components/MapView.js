var React = require('react');
var d3 = require('d3');
var Datamap = require('./Datamap');
var MapLegend = require('./MapLegend');

var electoralVotes = require('../data/electoralVotes');

var MapView = React.createClass({
    options: {},
    componentWillUpdate: function(nextProps, nextStates) {
      var dataset = {};

      console.log("Map View gets results");
      console.log(nextProps);
      for(var state in nextProps) {
        dataset[state] = nextProps[state];
        dataset[state].electoralVotes = electoralVotes[state];
      }

      /*var states = [];
      var onlyValues = [];
      for(var state in data) {
        states.push(state);
        onlyValues.push(data[state].electoralVotes);
      }

      var minValue = Math.min.apply(null, onlyValues),
         maxValue = Math.max.apply(null, onlyValues);

      var paletteScale = d3.scaleLinear().domain([minValue, maxValue]).range(["#ffe0cc", "#ff471a"]);

      data.forEach(function(item) {
         var iso = 'usa',
             value = data[item].electoralVotes,
             region = item;
         dataset[iso] = {
             numberOfThings: value,
             fillColor: paletteScale(value),
             region: region
         };
      });*/

      this.options = {
          reference: 'Map',
          scope: 'usa',
          labels: true,
          data: dataset,
          fills: {
            'Republican': '#e52426',
            'Democrat': '#4c7de0',
            'Heavy Democrat': '#667FAF',
            'Light Democrat': '#A9C0DE',
            'Heavy Republican': '#CA5E5B',
            'Light Republican': '#EAA9A8',
            defaultFill: '#EDDC4E'
          },
          geographyConfig: {
            highlightOnHover: true,
            highlightFillOpacity: 1,
            highlightBorderColor: '#000000',
            highlightBorderWidth: 3,
            popupTemplate: function(geography, data) {
              var results = '';
              for(var candidate in data.candidates) {
                results += '<tr>'
                  + '<td>'+ candidate + '</td>'
                  + '<td>' + data.candidates[candidate].votes + '</td>'
                  + '</tr>';
              }
              return '<div class="hoverinfo">'
                + '<strong>' + geography.properties.name + '</strong>'
                + '<p>Le gagnant obtient <b>' + data.electoralVotes + '</b> grands électeurs</p>'
                + '<table>'
                + '<tr>'
                + '<th>Candidat</th>'
                + '<th>Votes</th>'
                + '</tr>'
                + results
                + '</table>'
                + '</div>';
            }
          }
       };
    },

    render: function () {
        return (
            <div className="map">
              <MapLegend />
              <Datamap {...this.options}/>
            </div>
        );
    }
});

module.exports = MapView;
