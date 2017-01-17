var AppDispatcher = require('../dispatcher/AppDispatcher');
var SummaryConstants = require('../constants/SummaryConstants');

var SummaryActions = {

  loadSummary: function(data) {
    console.log("Yeah, let's do it !");
    AppDispatcher.handleAction({
      actionType: SummaryConstants.LOAD_SUMMARY,
      data: data
    });
  }

};

module.exports = SummaryActions;
