var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

// Internal object of
var _Timeline = {};

// Method to load items from action data
function loadTimeline(data) {
  console.log("Timeline store");
  if(data) _Timeline = data.data;
  console.log(_Timeline);
}

// Merge our store with Node's Event Emitter
var TimelineStore = merge(EventEmitter.prototype, {

  // Returns all shoes
  getTimeline: function() {
    return _Timeline;
  },

  emitChangeTimeline: function() {
    this.emit('TimelineChange');
  },

  addChangeListenerTimeline: function(callback) {
    this.on('TimelineChange', callback);
  },

  removeChangeListenerTimeline: function(callback) {
    this.removeListener('TimelineChange', callback);
  }

});

// Register dispatcher callback
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  // Define what to do for certain actions
  switch(action.actionType) {
    case constants.LOAD_TIMELINE:
      // Call internal method based upon dispatched action
      console.log("Look's like you want to load map info");
      loadTimeline(action.data);
      // If action was acted upon, emit change event
      TimelineStore.emitChangeTimeline();
      break;

    default:
      return true;
  }

  return true;

});

module.exports = TimelineStore;
