define([
  './src/TimingObject',
  './src/SocketTimingProvider',
  './src/TimingMediaController',
  './src/StateVector'
], function (
    TimingObject, SocketTimingProvider, TimingMediaController, StateVector ) {

 var Motion = function(){
  /**********************************************************************
  No need to deal with time, position and velocity measures that are
  below 1ms, so round all floats to 3 decimals.
  **********************************************************************/
  var roundFloat = function (nb) {
    return Math.round(nb * 1000) / 1000;
  };


  /**********************************************************************
  Set up the logger, using a custom DOM element appender
  **********************************************************************/



  /**********************************************************************
  Pointers to useful DOM elements
  **********************************************************************/


  /**********************************************************************
  Display timing object and video positions
  **********************************************************************/
  var maxDiff = {
    position: 0,
    velocity: 0
  };
  var controller = undefined;

  /**********************************************************************
  Create the timing object associated with the online timing service
  **********************************************************************/
var start = function (){
  var timingProvider = new SocketTimingProvider(
    'ws://' + window.location.hostname+":8080/" + mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.GROUP_ID);
  var timing = new TimingObject();
  timing.srcObject = timingProvider;
  controller = new TimingMediaController(timing);
  mediascape.AdaptationToolkit.uiComponents.addController();
  var event = new CustomEvent("motion-ready", {"detail":{"loaded":true}});
  document.dispatchEvent(event);
}
var addMedia = function(media){
  controller.addMediaElement(media);
  //controller.addEventListener('timeupdate', renderStateInfo);
  controller.addEventListener('readystatechange', function (evt) {

    if (evt.value === 'open') {
       //  setTimeout(function(e){document.dispatchEvent(event);},20000);
        controller.play();
    }
  });


  /**********************************************************************
  Listen to video changes
  **********************************************************************/
//  video.addEventListener('timeupdate', renderStateInfo);
//  video.addEventListener('play', renderStateInfo);
//  video.addEventListener('pause', renderStateInfo);
 return controller;
}
  /**********************************************************************
  Enable commands when timing object is connected
  **********************************************************************/
  var getController = function (){
    return controller;
  }
   var API = {
      addMedia:addMedia,
      getController:getController,
      start:start
   }

   return API;
 }
 window.addEventListener('components-ready',function(e){
   var interval = setInterval(function(){
     if (mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.GROUP_ID){
          clearInterval(interval);
          mediascape.AdaptationToolkit.Motion.start();
     }

   },500);
 });
 Motion.__moduleName = 'Motion';
 return Motion;
});
