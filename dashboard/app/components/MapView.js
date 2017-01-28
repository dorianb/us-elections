var React = require('react');
var d3 = require('d3');
var Datamap = require('./Datamap');
var MapLegend = require('./MapLegend');
var _ = require('underscore');


var MapView = React.createClass({
    options: {},
    componentWillUpdate: function(nextProps, nextStates) {

      this.options = {
          reference: 'Map',
          scope: 'usa',
          labels: true,
          data: nextProps,
          fills: {
            'Trump': '#e52426',
            'Clinton': '#4c7de0',
            defaultFill: '#D3D3D3'
          },
          geographyConfig: {
            highlightOnHover: true,
            highlightFillOpacity: 1,
            highlightBorderColor: '#000000',
            highlightBorderWidth: 3,
            popupTemplate: function(geography, data) {
              var results = '';
              var candidates = _.sortBy(Object.keys(data), function(o) { return data[o].votes; });
              for(var i in candidates.reverse()) {
                var candidate = candidates[i];
                if(["fillKey", "Gvoters"].indexOf(candidate) < 0) {
                  results += '<tr>'
                    + '<td>'+ candidate + '</td>'
                    + '<td>' + data[candidate].votes + '</td>'
                    + '</tr>';
                }
              }
              return '<div class="hoverinfo">'
                + '<strong>' + geography.properties.name + '</strong>'
                + '<p>Le gagnant obtient <b>' + data.Gvoters + '</b> grands électeurs</p>'
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
