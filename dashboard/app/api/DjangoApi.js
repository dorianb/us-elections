var SummaryActions = require('../actions/SummaryActions');
var MapViewActions = require('../actions/MapViewActions');
var PredictionActions = require('../actions/PredictionActions');
var TimelineActions = require('../actions/TimelineActions');

var axios = require('axios');

var URL = "http://52.90.157.37";
// var URL = "http://127.0.0.1:8000";
var time = new Date("November 08, 2016 21:10:00");
var timer = setInterval(function() {
  time.setSeconds(time.getSeconds() + 1)
}, 1000);

var ElectionsAPI = function() {

    this.getSummary = function() {
      var url = URL + '/summary/';
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

    this.getMapView = function() {
      var url = URL + '/map/';
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

    this.getPrediction = function() {
      var url = URL + '/prediction/';
      console.log("Request: " + url + " at " + time);

      axios.get(url, {
        params: {
          start_time: time
        }
      }).then(function(data) {
        console.log(data);
        PredictionActions.loadPrediction(data);
      });
    };

    this.getTimeline = function() {
      //var url = URL + '/timeline';
      var url = '../app/data/timeLine.json';
      console.log("Request: " + url + " at " + time);
      axios.get(url, {
        params: {
          start_time: time
        }
      }).then(function(data) {
        console.log(data);
        TimelineActions.loadTimeline(data);
      });
    };
};

module.exports = ElectionsAPI;
