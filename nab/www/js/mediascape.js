//main javascript
(function init() {
  // If we need to load requirejs before loading butter, make it so
  if ( typeof define === "undefined" ) {
    var rscript = document.createElement( "script" );
    rscript.onload = function() {
      init();
    };
    rscript.src = "../resources/libs/require.js";
    document.head.appendChild( rscript );
    return;
  }

  require.config({
    baseUrl: '/js/',
    shim: {
          'socketio': {
              exports: 'io'
            },
        "bootstrap" : { "deps" :['jquery'] },
        "bootstrap_swicth" :{ "deps":['jquery','bootstrap']}

    },
    paths: {
    'amdefine': 'mediascape/AdaptationToolkit/Motion/browser/amdefine',
    promise:'mediascape/AdaptationToolkit/utils/hbbtvLibs/promise.min',
    domReady:'/resources/libs/domReady',
    webcomponentsHbbtv:'mediascape/AdaptationToolkit/utils/hbbtvAdapter',
    webcomponents_lite:'http://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.20/webcomponents-lite.min',
    webcomponentsmin:'http://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.20/webcomponents.min',
    hbbtvapp:'mediascape/AdaptationToolkit/utils/hbbtvLibs/hbbtvapp',
    keycodes:'mediascape/AdaptationToolkit/utils/hbbtvLibs/keycodes',
    underscore:'../resources/libs/underscore-min',
    namedwebsockets: 'mediascape/lib/namedwebsockets',
    jquery: '../resources/libs/jquery-2.1.1.min',
    'event-target': 'mediascape/AdaptationToolkit/Motion/node_modules/event-target/build/event-target.amd',
    'websocket': 'mediascape/AdaptationToolkit/Motion/node_modules/websocket/lib/WebSocketClient',
    mediaSync:'mediascape/MediaSync/mediasync',
    d3:'../resources/libs/d3.v3.min',
    data2015:'../resources/libs/2015',
    qrcode:'mediascape/lib/qrcode.min',
    qrcodelib:'../resources/libs/qrcodelib',
    webcodecam: '../resources/libs/WebCodeCam.min',
    socketio: '/socket.io/socket.io',
    'socket.io': 'http://donostian.eus:8082/socket.io/socket.io',
    ui:'../resources/libs/jquery-ui',
    shake:'../resources/libs/shake',
    association:'/resources/association/association',
    domReady:'/resources/libs/domReady',
    swiper:'/resources/libs/swiper.min',
    coords2:'/resources/libs/coords2',
    tags:'/resources/libs/tags',
    configPanel:'../resources/configPanel/configPanel',
    loadingPanel:'../resources/libs/loadingPanel',
    classifie:'../resources/configPanel/js/classie',
    bootstrap:'/resources/libs/bootstrap.min',
    bootstrap_swicth:'/resources/libs/bootstrap-switch.min',
    debugger:'http://donostian.eus:8082/console.io',
    webcomponetsPolyfill:'/resources/libs/webcomponents-lite.min'
      },
    waitSeconds:25
  });

  /**
 * mediascape collect all needed modules on mediascape object, accesible by mediascape
 * javascript object. Once is ready fire a event mediascape-modules-ready
 * @module mediascape
 * @requires mediascape/AdaptationToolkit/AdaptationToolkit
 * @requires mediascape/Discovery/discovery
 * @requires mediascape/Sharedstate/sharedstate
 * @requires mediascape/Mappingservice/mappingservice
 * @requires mediascape/Agentcontext/agentcontext
 * @requires mediascape/Applicationcontext/applicationcontext
 * @requires mediascape/DiscoveryForAgentContext/discoveryforagentcontext
 * @requires mediascape/DeviceProfile/deviceProfile
 * @requires resources/association/association
 *
  */
  /**
  ^ Event emited to document listener when mediascape is ready.
  * @event mediascape-modules-ready
  * @param {Object} mediascape-modules-ready {"detail":{"loaded":true}}
  */
  // Start the main app logic.
  define( "mediascape", [ "mediascape/AdaptationToolkit/AdaptationToolkit","mediascape/Discovery/discovery"
  ,"mediascape/Sharedstate/sharedstate","mediascape/Mappingservice/mappingservice",
  "mediascape/Agentcontext/agentcontext","mediascape/Applicationcontext/applicationcontext",
  "mediascape/DiscoveryForAgentContext/discoveryforagentcontext",'mediascape/DeviceProfile/deviceProfile',
  'association','mediascape/MediaSync/mediasync'],
  function(){
      var mediascape = {};
      var discovery= {};

       var moduleList   = Array.prototype.slice.apply( arguments );
      mediascape.init = function(options) {
        try{
        mediascapeOptions = {};
        _this = Object.create( mediascape );
        var dontCall = ['sharedState', 'mappingService', 'applicationContext','mediaSync'];
      //  _this1 = Object.create( discovery );
			for( var i=0; i<moduleList.length; ++i ){
				var name = moduleList[ i ].__moduleName;
                 if (dontCall.indexOf(name) === -1) {
                     mediascape[name] = new moduleList[i](mediascape, "gq" + i, mediascape);
                 } else {
                     mediascape[name] = moduleList[i];
                 }

			}
      var event = new CustomEvent("mediascape-modules-ready", {"detail":{"loaded":true}});
      document.dispatchEvent(event);
      }
      catch (e){
        console.log(e);
      }
      return _this;
      };

      mediascape.version = "0.0.1";
      // See if we have any waiting init calls that happened before we loaded require.
      if( window.ms ) {
        var args = window.mediascape.__waiting;
        delete window.mediascape;
        if( args ) {
          mediascape.init.apply( this, args );
        }
      }
      window.mediascape = mediascape;

      //return of ms object with discovery and features objects and its functions
      return mediascape;
    });
/** All modules are ready so mediascape it can be started */
  require(["promise","webcomponentsHbbtv","mediascape","configPanel","swiper","domReady"], function (promise,hbbtv,mediascape,cp,sw,domR) {
    console.log("mediascape require");
    //if (document.readyState === "complete") mediascape.init();
    //else setTimeout(mediascape.init,2000);
    domR(function(){
      mediascape.init();
    }, function (err) {
        console.log("ERROR RQUIRE");
})

  });
/*require(["debugger"],function(dgb){
     dgb.configure({url:'http://donostian.eus:8082/'});
   });*/
}());
