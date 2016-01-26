({
    name: "mediascape.js",
    baseUrl: './js',
    shim: {
          'socketio': {
              exports: 'io'
            },
        "bootstrap" : { "deps" :['jquery'] },
        "bootstrap_swicth" :{ "deps":['jquery','bootstrap']}

    },
    paths:{
        requireLib:'../resources/libs/require',
        webcomponents_lite:'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.17/webcomponents-lite.min',
        loadingPanel:'../resources/libs/loadingPanel',
      	jquery:'empty:',
      	socketio:'empty:',
      	underscore:'../resources/libs/underscore-min',
        ui:'../resources/libs/jquery-ui',
        msv:'empty:',
        mcorp:'empty:',
        namedwebsockets: 'mediascape/lib/namedwebsockets',
        magicui:'../resources/libs/magic-ui-2.0',
        magic:'../resources/libs/magic-2.0',
        qrcode:'mediascape/lib/qrcode.min',
        shake:'../resources/libs/shake',
        association:'../resources/association/association',
        app:'../app',
	      swiper:'empty:',
        domReady:'../resources/libs/domReady',
        webcomponentsHbbtv:'mediascape/AdaptationToolkit/utils/hbbtvAdapter',
        webcomponents_lite:'/resources/wcs/bower_components/webcomponentsjs/webcomponents-lite.min',
        webcomponentsmin:'/resources/wcs/bower_components/webcomponentsjs/webcomponents.min',
        debugger:'empty:',
        configPanel:'../resources/configPanel/configPanel',
        classifie:'../resources/configPanel/js/classie',
        bootstrap:'empty:',
        webcomponentsmin:'empty:',
        debugger:'empty:'
        },
    include:['requireLib','webcomponents_lite','loadingPanel','swiper'],
    out: "dist/multideviceapplib.min.js",
    removeCombined: true,
    has:{
      debugger:false
    },
   preserveLicenseComments: false
})
