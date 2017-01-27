var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

// Internal object of
var _summary = {};

// Method to load items from action data
function loadSummary(data) {
  console.log("Summary store");
  if(data) _summary = data.data;
  console.log(_summary);
}

// Merge our store with Node's Event Emitter
var SummaryStore = merge(EventEmitter.prototype, {

  // Returns all shoes
  getSummary: function() {
    return _summary;
  },

  emitChangeSummary: function() {
    this.emit('SummaryChange');
  },

  addChangeListenerSummary: function(callback) {
    this.on('SummaryChange', callback);
  },

  removeChangeListenerSummary: function(callback) {
    this.removeListener('SummaryChange', callback);
  }

});

// Register dispatcher callback
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  // Define what to do for certain actions
  switch(action.actionType) {
    case constants.LOAD_SUMMARY:
      // Call internal method based upon dispatched action
      console.log("Look's like you want to load summary");
      loadSummary(action.data);
      // If action was acted upon, emit change event
      SummaryStore.emitChangeSummary();
      break;

    default:
      return true;
  }

  return true;

});

module.exports = SummaryStore;
