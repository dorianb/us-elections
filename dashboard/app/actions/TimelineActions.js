var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants/AppConstants');

var TimelineActions = {

  loadTimeline: function(data) {
    console.log("Action: load Timeline");
    AppDispatcher.handleAction({
      actionType: constants.LOAD_TIMELINE,
      data: data
    });
  }

};

module.exports = TimelineActions;
