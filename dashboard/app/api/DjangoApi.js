var SummaryActions = require('../actions/SummaryActions');
var MapInfoActions = require('../actions/MapInfoActions');
var MapViewActions = require('../actions/MapViewActions');
var axios = require('axios');


var ElectionsAPI = function(url) {
    this._url = url;
    this._collection = [];

    this.getSummary = function() {
      console.log("Request: " + this._url);
      axios.get(this._url).then(function(data) {
        console.log(data);
        this._collection = data;
        SummaryActions.loadSummary(this._collection);
      });
    };

    this.getMapInfo = function() {
      console.log("Request: " + this._url);
      axios.get(this._url).then(function(data) {
        console.log(data);
        this._collection = data;
        MapInfoActions.loadMapInfo(this._collection);
      });
    };

    this.getMapView = function() {
      console.log("Request: " + this._url);
      axios.get(this._url).then(function(data) {
        console.log(data);
        this._collection = data;
        MapViewActions.loadMapView(this._collection);
      });
    };

    this._update = function(content) {
        /*var found = _.find(this._collection, function(x) { return x.id === content.id; });
        for (var name in found)
            found[name] = content[name];
        $.post(this._url, found).then(function() {
            _notify.call(this);
        }.bind(this));*/
    };

    this._create = function(content) {
        /*content.id = _.max(this._collection, function(x) { return x.id; }).id + 1;
        this._collection.push(content);
        $.post(this._url + "/" + content.id).then(function() {
            _notify.call(this);
        });*/
    };
};

module.exports = ElectionsAPI;
