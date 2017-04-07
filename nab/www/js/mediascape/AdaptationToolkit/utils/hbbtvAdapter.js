define(['domReady'],
   function () {

        var polyfill = navigator.userAgent.toLowerCase().indexOf('hbbtv')!=-1 ? 'domReady': 'domReady';

        require([polyfill],function(){
          console.log("POLYFILL");
          if (navigator.userAgent.toLowerCase().indexOf('hbbtv')!=-1) {// Medans hbbtv
              require(["promise","keycodes","hbbtvapp"],function(p,keyc,hbbtvapp){
                  console.log("loading hbbtv libraries");
                  try {
                   var app = document['appmgr'].getOwnerApplication(document);
                    app.show();

                 } catch (e) {

                    console.log("error hbbtvAdapter",e);
                 }

                   setKeyset(0x1+0x2+0x4+0x8+0x10+0x20+0x100);
              });
          }
        });

  }
);
