var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

// Internal object of
var _mapInfo = {};

// Method to load items from action data
function loadMapInfo(data) {
  console.log("MapInfo store");
  if(data) _mapInfo = data.data;
  console.log(_mapInfo);
}

// Merge our store with Node's Event Emitter
var MapInfoStore = merge(EventEmitter.prototype, {

  // Returns all shoes
  getMapInfo: function() {
    return _mapInfo;
  },

  emitChange: function() {
    this.emit('MapInfoChange');
  },

  addChangeListener: function(callback) {
    this.on('MapInfoChange', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('MapInfoChange', callback);
  }

});

// Register dispatcher callback
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  // Define what to do for certain actions
  switch(action.actionType) {
    case constants.LOAD_MAP_INFO:
      // Call internal method based upon dispatched action
      console.log("Look's like you want to load map info");
      loadMapInfo(action.data);
      break;

    default:
      return true;
  }

  // If action was acted upon, emit change event
  MapInfoStore.emitChange();

  return true;

});

module.exports = MapInfoStore;
