var constants = require("./constants");
var emitter = require('events').EventEmitter.prototype;
var AppDispatcher = require('../dispatcher/AppDispatcher');

var ElectionsAPI = function(url, constants) {
    this._url = url;
    this._collection = [];

    dispatcher.register(function(payload) {
      console.log("Dispatcher received: " + payload.type);
      switch (payload.type) {
          case constants.all:
              this._all();
              break;

          case constants.update:
              this._update(payload.content);
              break;

          case constants.create:
              this._create(payload.content);
              break;
      }
    }.bind(this));

    this._all = function() {
      console.log("Get all");
      $.get(this._url).then(function(data) {
          this._collection = data;
          _notify.call(this);
      }.bind(this));
    }.bind(this);

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
      console.log("Emit for " + constants.changed);
      emitter.emit(constants.changed, this._collection);
    }
};

var electionsAPI = new ElectionsAPI("../data/summary.json", constants.summary);
