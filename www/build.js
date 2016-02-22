({
    name: "mediascape.js",
    baseUrl: './js',
    shim: {
          'socketio': {
              exports: 'io'
            },
        "bootstrap" : { "deps" :['jquery'] },
        "bootstrap_swicth" :{ "deps":['jquery','bootstrap']},
        "webcodecam" :{ "deps":['jquery']}


    },
    paths:{
        requireLib:'../resources/libs/require',
        webcomponetsPolyfill:'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.17/webcomponents-lite.min',
        loadingPanel:'../resources/libs/loadingPanel',
        jquery:'empty:',
        socketio:'empty:',
        underscore:'empty:',
        ui:'../resources/libs/jquery-ui',
        msv:'empty:',
        mcorp:'empty:',
        namedwebsockets: 'mediascape/lib/namedwebsockets',
        qrcode:'mediascape/lib/qrcode.min',
        shake:'../resources/libs/shake',
        association:'../resources/association/association',
        webcodecam: '../resources/libs/WebCodeCam.min',
        qrcodelib:'../resources/libs/qrcodelib',
        app:'../app',
        swiper:'empty:',
        '2015data':'../resources/libs/2015',
        domReady:'../resources/libs/domReady',
        webcomponentsHbbtv:'mediascape/AdaptationToolkit/utils/hbbtvAdapter',
        webcomponents_lite:'/resources/wcs/bower_components/webcomponentsjs/webcomponents-lite.min',
        webcomponentsmin:'/resources/wcs/bower_components/webcomponentsjs/webcomponents.min',
        debugger:'empty:',
        configPanel:'../resources/configPanel/configPanel',
        classifie:'../resources/configPanel/js/classie',
        bootstrap:'empty:'
        },
    include:['requireLib','webcomponetsPolyfill','loadingPanel','swiper'],
    out: "dist/multideviceapplib.min.js",
    removeCombined: true,
    has:{
      debugger:false
    },
   preserveLicenseComments: false
})
