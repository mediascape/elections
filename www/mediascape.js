//main javascript
(function init() {
  // If we need to load requirejs before loading butter, make it so
  if ( typeof define === "undefined" ) {
    var rscript = document.createElement( "script" );
    rscript.onload = function() {
      init();
    };
    rscript.src = "../resources/require.js";
    document.head.appendChild( rscript );
    return;
  }

  require.config({
    baseUrl: '/js/',
    shim: {
          'socketio': {
              exports: 'io'
            }
    },
    paths: {
    underscore:'../resources/libs/underscore-min',
    namedwebsockets: 'mediascape/lib/namedwebsockets',
    jquery: '../resources/libs/jquery-2.1.1.min',
    msv:'http://www.mcorp.no/lib/msv-2.0',
    mcorp:'http://www.mcorp.no/lib/mcorp-2.0',
    mediaSync:'mediascape/MediaSync/mediasync',
    d3:'../resources/libs/d3.v3.min',
    '2015data':'../resources/libs/2015',
    qrcode:'mediascape/lib/qrcode.min',
    socketio: '/socket.io/socket.io',
    ui:'../resources/libs/jquery-ui',
    shake:'../resources/libs/shake',
    association:'/resources/association/association',
    domReady:'/resources/libs/domReady',
    swiper:'../resources/css/configPanel/js/swiper.min',
    coords2:'/resources/libs/coords2',
    tags:'/resources/libs/tags',
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
  require([ "mediascape" ,'swiper'], function (mediascape,swiper) {
    console.log("mediascape require");
    if (document.readyState === "complete") mediascape.init();
    else setTimeout(mediascape.init,2000);


  });
}());
