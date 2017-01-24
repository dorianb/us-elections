var SummaryActions = require('../actions/SummaryActions');
var MapInfoActions = require('../actions/MapInfoActions');
var axios = require('axios');
var mongoose = require('mongoose');


var ElectionsAPI = function(url) {
    this._url = url;
    this._collection = [];
    this.connect = mongoose.connect('ec2-52-56-100-210.eu-west-2.compute.amazonaws.com:27017', function(err) {
        if (err) { throw err; }
    });

    this.getSummary = function() {
      console.log("Request: " + this._url);

        var schema = new mongoose.Schema({
            Time : { type : Date, default : Date.now },
            State : String,
            Clinton : int,
            Trump : int
        });

        var event = mongoose.model('person', schema)
        data = event.findOne()

/*
        pseudo : { type : String, match: /^[a-zA-Z0-9-_]+$/ },
        contenu : String,
        date : { type : Date, default : Date.now }
        });
    */

    /*

{
    "_id" : ObjectId("587f32e722fc84f52c43a375"),
    "" : 0,
    "Time" : "2016-11-08 20:00",
    "State" : "Minnesota",
    "Clinton" : 41657,
    "Trump" : 9456,
    "Castle" : 1367716,
    "Johnson" : 112972,
    "McMullin" : 53076,
    "Stein" : 36985,
    "Autre" : 1322951
}


  "Clinton": {
    "votes": 62521739,
    "electoralVotes": 232
  },
  "Trump": {
    "votes": 61195258,
    "electoralVotes": 306
  }
    
    */

      this._collection = data;
        SummaryActions.loadSummary(this._collection);
      /*
     //==============================================
      axios.get(this._url).then(function(data) {
        console.log(data);
        this._collection = data;
        SummaryActions.loadSummary(this._collection);
      });
    //===============================================
        */
    };

    this.getMapInfo = function() {
      console.log("Request: " + this._url);
      axios.get(this._url).then(function(data) {
        console.log(data);
        this._collection = data;
        _notify.call(this);
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

    function _notify() {
      SummaryActions.loadSummary(this._collection);
    }
};

module.exports = ElectionsAPI;
