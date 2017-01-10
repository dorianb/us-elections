var React = require('react');
var d3 = require('d3');
var Datamap = require('./Datamap');
var data = require('./country');

var MapView = React.createClass({
    componentWillMount: function() {
      var dataset = {};

      var onlyValues = data.series.map(function(obj) {
         return obj[1];
      });

      var minValue = Math.min.apply(null, onlyValues),
         maxValue = Math.max.apply(null, onlyValues);

      var paletteScale = d3.scaleLinear().domain([minValue, maxValue]).range(["#ffe0cc", "#ff471a"]);

      data.series.forEach(function(item) {
         var iso = item[0],
             value = item[1],
             region = item[2];
         dataset[iso] = {
             numberOfThings: value,
             fillColor: paletteScale(value),
             region: region
         };
      });

      this.setState({
         reference: this.props.reference,
         scope: 'usa',
         selectedRegion:'ALL',
         allData: dataset,
         data: dataset,
         fills: {
             defaultFill: '#ddd'
         },
         geographyConfig: {
             borderColor: '#888',
             borderWidth: .5,
             highlightBorderWidth: .5,
             highlightBorderColor: 'black',
             highlightFillColor: function(geo) {
                 return geo['fillColor'] || '#ddd';
             },
             popupTemplate: function(geo, data) {
                 if (!data) {
                     return;
                 }
                 return [
                     '<div class="hoverinfo">',
                     '<strong>',
                     geo.properties.name,
                     '</strong>',
                     '<br>Count: <strong>',
                     data.numberOfThings,
                     '</strong>',
                     '</div>'
                 ].join('');
             }
         }
       });
    },

    render: function () {
        return (
            <div className="App">
                { /*<div className="App-options">
                    <RadioGroup name="fruit" selectedValue={this.state.selectedRegion} onChange={this.update}>
                        {Radio => (
                            <div>
                                <Radio value="AMR"/>AMR
                                <Radio value="APAC"/>APAC
                                <Radio value="EMEA"/>EMEA
                                <Radio value="ALL"/>ALL
                            </div>
                        )}
                    </RadioGroup>

                </div>*/ }
                <div className="App-map">
                    <Datamap {...this.state}/>
                </div>
            </div>
        );
    }
});

module.exports = MapView;
