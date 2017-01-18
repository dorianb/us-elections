var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants/AppConstants');

var MapInfoActions = {

  loadMapInfo: function(data) {
    console.log("Yeah, let's do it !");
    AppDispatcher.handleAction({
      actionType: constants.LOAD_MAP_INFO,
      data: data
    });
  }

};

module.exports = MapInfoActions;
