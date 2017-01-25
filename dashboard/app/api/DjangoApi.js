var SummaryActions = require('../actions/SummaryActions');
var MapInfoActions = require('../actions/MapInfoActions');
var MapViewActions = require('../actions/MapViewActions');
var axios = require('axios');

var URL = "http://127.0.0.1";
var start_time = new Date("November 08, 2016 20:00:00").toISOString();


var ElectionsAPI = function() {

    this.getSummary = function() {
      var url = URL + '/summary';
      //var url = '../app/data/summary.json';
      console.log("Request: " + url + " at " + start_time);
      axios.get(url, {
        params: {
          start_time: start_time
        }
      }).then(function(data) {
        console.log(data);
        SummaryActions.loadSummary(data);
      });
    };

    this.getMapInfo = function() {
      //var url = URL + '/timeline';
      var url = '../app/data/timeLine.json';
      console.log("Request: " + url + " at " + start_time);
      axios.get(url, {
        params: {
          start_time: start_time
        }
      }).then(function(data) {
        console.log(data);
        MapInfoActions.loadMapInfo(data);
      });
    };

    this.getMapView = function() {
      //var url = URL + '/mapview';
      var url = '../app/data/results.json';
      console.log("Request: " + url + " at " + start_time);
      axios.get(url, {
        params: {
          start_time: start_time
        }
      }).then(function(data) {
        console.log(data);
        MapViewActions.loadMapView(data);
      });
    };
};

module.exports = ElectionsAPI;
