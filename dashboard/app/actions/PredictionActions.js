var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants/AppConstants');

var PredictionActions = {

  loadPrediction: function(data) {
    console.log("Action: load Prediction");
    AppDispatcher.handleAction({
      actionType: constants.LOAD_PREDICTION,
      data: data
    });
  }

};

module.exports = PredictionActions;
