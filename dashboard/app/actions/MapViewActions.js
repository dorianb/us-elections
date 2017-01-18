var AppDispatcher = require('../dispatcher/AppDispatcher');
var constants = require('../constants/AppConstants');

var MapViewActions = {

  loadMapView: function(data) {
    console.log("Action: load mapView");
    AppDispatcher.handleAction({
      actionType: constants.LOAD_MAP_VIEW,
      data: data
    });
  }

};

module.exports = MapViewActions;
