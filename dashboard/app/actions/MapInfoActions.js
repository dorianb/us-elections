var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants/AppConstants');

var MapInfoActions = {

  loadMapInfo: function(data) {
    console.log("Action: load mapInfo");
    AppDispatcher.handleAction({
      actionType: constants.LOAD_MAP_INFO,
      data: data
    });
  }

};

module.exports = MapInfoActions;
