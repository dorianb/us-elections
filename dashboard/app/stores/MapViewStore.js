var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

// Internal object of
var _mapView = {};

// Method to load items from action data
function loadMapView(data) {
  console.log("MapView store");
  if(data) _mapView = data.data;
  console.log(_mapView);
}

// Merge our store with Node's Event Emitter
var MapViewStore = merge(EventEmitter.prototype, {

  // Returns all shoes
  getMapView: function() {
    return _mapView;
  },

  emitChangeMapView: function() {
    this.emit('MapViewChange');
  },

  addChangeListenerMapView: function(callback) {
    this.on('MapViewChange', callback);
  },

  removeChangeListenerMapView: function(callback) {
    this.removeListener('MapViewChange', callback);
  }

});

// Register dispatcher callback
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  // Define what to do for certain actions
  switch(action.actionType) {
    case constants.LOAD_MAP_VIEW:
      // Call internal method based upon dispatched action
      console.log("Look's like you want to load map view");
      loadMapView(action.data);
      // If action was acted upon, emit change event
      MapViewStore.emitChangeMapView();
      break;

    default:
      return true;
  }

  return true;

});

module.exports = MapViewStore;
