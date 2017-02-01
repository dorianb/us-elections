var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

// Internal object of
var _Prediction = {};

// Method to load items from action data
function loadPrediction(data) {
  console.log("Prediction store");
  if(data) _Prediction = data.data;
  console.log(_Prediction);
}

// Merge our store with Node's Event Emitter
var PredictionStore = merge(EventEmitter.prototype, {

  // Returns all shoes
  getPrediction: function() {
    return _Prediction;
  },

  emitChangePrediction: function() {
    this.emit('PredictionChange');
  },

  addChangeListenerPrediction: function(callback) {
    this.on('PredictionChange', callback);
  },

  removeChangeListenerPrediction: function(callback) {
    this.removeListener('PredictionChange', callback);
  }

});

// Register dispatcher callback
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  // Define what to do for certain actions
  switch(action.actionType) {
    case constants.LOAD_PREDICTION:
      // Call internal method based upon dispatched action
      console.log("Look's like you want to load map info");
      loadPrediction(action.data);
      // If action was acted upon, emit change event
      PredictionStore.emitChangePrediction();
      break;

    default:
      return true;
  }

  return true;

});

module.exports = PredictionStore;
