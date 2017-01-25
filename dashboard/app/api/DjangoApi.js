var SummaryActions = require('../actions/SummaryActions');
var MapInfoActions = require('../actions/MapInfoActions');
var MapViewActions = require('../actions/MapViewActions');
var axios = require('axios');

var URL = "http://52.90.157.37";
var time = new Date("November 08, 2016 21:10:00");
var timer = setInterval(function() {
  time.setSeconds(time.getSeconds() + 1)
}, 1000);

var ElectionsAPI = function() {

    this.getSummary = function() {
      var url = URL + '/summary';
      //var url = '../app/data/summary.json';
      console.log("Request: " + url + " at " + time);
      axios.get(url, {
        params: {
          start_time: time
        }
      }).then(function(data) {
        console.log(data);
        SummaryActions.loadSummary(data);
      });
    };

    this.getMapInfo = function() {
      //var url = URL + '/timeline';
      var url = '../app/data/timeLine.json';
      console.log("Request: " + url + " at " + time);
      axios.get(url, {
        params: {
          start_time: time
        }
      }).then(function(data) {
        console.log(data);
        MapInfoActions.loadMapInfo(data);
      });
    };

    this.getMapView = function() {
      //var url = URL + '/map';
      var url = '../app/data/results.json';
      console.log("Request: " + url + " at " + time);
      axios.get(url, {
        params: {
          start_time: time
        }
      }).then(function(data) {
        console.log(data);
        MapViewActions.loadMapView(data);
      });
    };
};

module.exports = ElectionsAPI;
