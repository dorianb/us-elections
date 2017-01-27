var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
};

AppDispatcher.handleAction = function(action) {
  console.log("Hmmm, ok I'll dispatch it");
  console.log(action);
  this.dispatch({
    source: action.actionType,
    action: action
  });
};

module.exports = AppDispatcher;
