define (["msv","mcorp"],
    function (msv,mcorp,mSync) {
    var mediaSync = mSync;
    var SharedMotion = function(){
      this.init = function(){
          this.mapp = MCorp.app("5755267014547000624", {anon:true});
          this.mapp.cams = {};
          this.mapp.init();
          this.mapp.run =function (){
          var event = new CustomEvent("motion-ready", {"detail":{"loaded":true}});
          setTimeout(function(e){document.dispatchEvent(event);},5000);
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
            opts.target = 0.25
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
