var AppDispatcher = require('../dispatcher/AppDispatcher');
var SummaryConstants = require('../constants/SummaryConstants');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

// Internal object of
var _items = {};

// Method to load items from action data
function loadSummary(data) {
  if(data) _items = data.items;
}

// Merge our store with Node's Event Emitter
var SummaryStore = merge(EventEmitter.prototype, {

  // Returns all shoes
  getAll: function() {
    return _items;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register dispatcher callback
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  // Define what to do for certain actions
  switch(action.actionType) {
    case SummaryConstants.LOAD_SUMMARY:
      // Call internal method based upon dispatched action
      console.log("Look's like you want to load summary");
      loadSummary(action.data);
      break;

    default:
      return true;
  }

  // If action was acted upon, emit change event
  SummaryStore.emitChange();

  return true;

});

module.exports = SummaryStore;
