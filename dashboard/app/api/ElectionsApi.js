var SummaryActions = require('../actions/SummaryActions');
var axios = require('axios');


var ElectionsAPI = function(url) {
    this._url = url;
    this._collection = [];

    this._all = function() {
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
