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
  var timming = undefined;

  /**********************************************************************
  Create the timing object associated with the online timing service
  **********************************************************************/
var start = function (){
  var timingProvider = new SocketTimingProvider(
    'ws://' + window.location.hostname+":8080/" + mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.GROUP_ID);
  timing = new TimingObject();
  timing.srcObject = timingProvider;
  controller = new TimingMediaController(timing);
  if (navigator.userAgent.toLowerCase().indexOf('hbbtv')==-1)mediascape.AdaptationToolkit.uiComponents.addController();
  var event = new CustomEvent("motion-ready", {"detail":{"loaded":true}});
  document.dispatchEvent(event);
  controller.addEventListener("timeupdate",function(e){
     var realTimeupdate = new CustomEvent('realTimeupdate',{'detail':{'currentTime':controller.currentTime}});
     if (controller.currentTime) document.dispatchEvent(realTimeupdate);
  });
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
  var getTiming = function (){
    return timing;
  }
   var API = {
      addMedia:addMedia,
      getController:getController,
      start:start,
      ready:false,
      timing:getTiming
   }

   return API;
 }
 window.addEventListener('components-ready',function(e){
   var interval = setInterval(function(){
     if (mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.GROUP_ID &&  !mediascape.AdaptationToolkit.Motion.ready){
          clearInterval(interval);
          mediascape.AdaptationToolkit.Motion.ready = true;
          mediascape.AdaptationToolkit.Motion.start();
     }

   },500);
 });
 Motion.__moduleName = 'Motion';
 return Motion;
});
