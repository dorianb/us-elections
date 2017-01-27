var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants/AppConstants');

var SummaryActions = {

  loadSummary: function(data) {
    console.log("Actions: load summary");
    AppDispatcher.handleAction({
      actionType: constants.LOAD_SUMMARY,
      data: data
    });
  }

};

module.exports = SummaryActions;
