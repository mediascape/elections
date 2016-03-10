define (["msv","mcorp"],
    function (msv,mcorp,mSync) {
    var mediaSync = mSync;
    var SharedMotion = function(){
      this.init = function(){
        try {

          this.mapp = MCorp.app("4092171836865095034", {anon:true});
          this.mapp.cams = {};
          this.mapp.init();
          var scope = this;
        }catch (e){

        }
          this.mapp.run =function (){

              var event1 = new Event("motion-ready", {"detail":{"loaded":true}});
             //  setTimeout(function(e){document.dispatchEvent(event);},20000);
             document.addEventListener('agentChange',function(e){
                  	if (navigator.userAgent.toLowerCase().indexOf('hbbtv')!=-1) setTimeout(function(){document.dispatchEvent(event1);},2000);
                    else document.dispatchEvent(event1);
                  document.removeEventListener('agentChange', arguments.callee);
                  scope.mapp.motions.shared.update(null, 1);
              },false);

        }
     }
      //this.mapp.run = this.toRun.bind(this);
      this.addVideo = function (video,_id,_skew){
        var skew = _skew || 0.0;
        if (video){
          //  var loaderManager = document.querySelector('ms-app').shadowRoot.querySelector('ms-componentManager').shadowRoot.querySelector('ms-loaderManager');
            var scope = this;
            var _video = video;
            //this.options.skew = skew;
          //  var isOn = e.detail.actualLoadedc.indexOf(_id)>-1;
        //    console.log(isOn,e.detail.actualLoadedc,_id,skew);
            var id = _video.getAttribute ('id');
            scope.mapp.msvs.shared.query();
            var opts = {};
            opts.skew = skew;
            opts.target = 0.05;
            opts.debug=false;
            opts.mode ="skip";
            console.log(opts);
            scope.mapp.cams[id] = new mediascape.mediaSync().mediaSync(_video, scope.mapp.msvs.shared, opts);
           }
         else
            throw new Error ("video without defined");
      }
      this.addMovingCursor = function(data){
        this.cursor = mSync.movingCursor(this.mapp.motions.shared, data);
      }
      return this;
    }
    document.addEventListener('mediascape-modules-ready',function(){
	       mediascape.AdaptationToolkit.SharedMotion().init();
    });
    SharedMotion.__moduleName = "SharedMotion";
    return SharedMotion;

    });
