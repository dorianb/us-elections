var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants/AppConstants');

var SummaryActions = {

  loadSummary: function(data) {
    console.log("Yeah, let's do it !");
    AppDispatcher.handleAction({
      actionType: constants.LOAD_SUMMARY,
      data: data
    });
  }

};

module.exports = SummaryActions;
