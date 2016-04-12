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
    promise:'mediascape/AdaptationToolkit/utils/hbbtvLibs/promise.min',
    domReady:'/resources/libs/domReady',
    webcomponentsHbbtv:'mediascape/AdaptationToolkit/utils/hbbtvAdapter',
    webcomponents_lite:'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.20/webcomponents-lite.min',
    webcomponentsmin:'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.20/webcomponents.min',
    underscore:'../resources/libs/underscore-min',
    namedwebsockets: 'mediascape/lib/namedwebsockets',
    jquery: 'http://code.jquery.com/jquery-2.1.4.min',
    msv:'http://www.mcorp.no/lib/msv-2.0',
    mcorp:'http://www.mcorp.no/lib/mcorp-2.0',
    mediaSync:'mediascape/MediaSync/mediasync',
    reverseMediaSync:'mediascape/MediaSync/reverseMediaSync',
    d3:'../resources/libs/d3.v3.min',
    data2015:'../resources/libs/2015',
    qrcode:'mediascape/lib/qrcode.min',
    qrcodelib:'../resources/libs/qrcodelib',
    webcodecam: '../resources/libs/WebCodeCam.min',
    socketio: '/socket.io/socket.io',
    'socket.io': 'http://192.168.10.2:8082/socket.io/socket.io',
    ui:'../resources/libs/jquery-ui',
    shake:'../resources/libs/shake',
    association:'/resources/association/association',
    domReady:'/resources/libs/domReady',
    swiper:'https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.0/js/swiper.min',
    coords2:'/resources/libs/coords2',
    tags:'/resources/libs/tags',
    configPanel:'../resources/configPanel/configPanel',
    loadingPanel:'../resources/libs/loadingPanel',
    classifie:'../resources/configPanel/js/classie',
    bootstrap:'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min',
    debugger:'http://192.168.10.2:8082/console.io',
    hbbtvapp:'mediascape/AdaptationToolkit/utils/hbbtvLibs/hbbtvapp',
    keycodes:'mediascape/AdaptationToolkit/utils/hbbtvLibs/keycodes',
    calc:'/resources/libs/calc.min'

      },
    waitSeconds:15
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
  'association','mediascape/MediaSync/mediasync','mediascape/MediaSync/reverseMediaSync'],
  function(){
      var mediascape = {};
      var discovery= {};

			var moduleList   = Array.prototype.slice.apply( arguments );
      mediascape.init = function(options) {
        mediascapeOptions = {};
        _this = Object.create( mediascape );
        var dontCall = ['sharedState', 'mappingService', 'applicationContext','mediaSync','reverseMediaSync'];
      //  _this1 = Object.create( discovery );

    	for( var i=0; i<moduleList.length; ++i ){
				var name = moduleList[ i ].__moduleName;
                 if (dontCall.indexOf(name) === -1) {
                     mediascape[name] = new moduleList[i](mediascape, "gq" + i, mediascape);
                 } else {
                     mediascape[name] = moduleList[i];
                 }

			}
      console.log("fine");
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
  require(["promise","webcomponentsHbbtv","mediascape","configPanel","swiper","domReady!"], function (p,wcpol,mediascape,cp,sw,doc) {
    console.log("mediascape require");
     mediascape.init();
    /*if (document.readyState === "complete") mediascape.init();
    else setTimeout(mediascape.init,2000);*/


  });
/*  require(["debugger"],function(dgb){
    dgb.configure({});
  });*/

}());
