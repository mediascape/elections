define ([],
  function () {

    var Utils = function(){
      this.getUrlVar = function (name){
        var vars = {};
        var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
          vars[key] = value;
        });
        return vars[name];
      }
      this.enableCameraAdmin = function (){
		
	    var inter = setInterval(function(){
                  var xhttp = new XMLHttpRequest();
		   xhttp.onreadystatechange = function() {
			  if (this.readyState == 4 && this.status == 200) {
			     var cameras =  JSON.parse(this.responseText);
			     var change = mediascape.AdaptationToolkit.Utils.diff(cameras,mediascape.cameras);
			     if (Object.keys(change).length!=0){
				  var event = new CustomEvent("cameraAdminChange", {"detail":change});
				  mediascape.cameras = cameras;
				  document.dispatchEvent(event);		
			     }
		    }
		};
		xhttp.open("GET", "/getCameraStatus", true);
		xhttp.send();	
	   },1500);
	  clearInterval(inter);
      }
      this.diff = function(a,b){
   		 var r = {};
	    _.each(a, function(v,k) {
	        if(b[k] === v) return;
	        // but what if it returns an empty object? still attach?
	        r[k] = _.isObject(v)
                ? _.diff(v, b[k])
                : v;
        	});
	    return r;
      }
      this.createGroupId = function ()
      {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
      this.getObjectDiff = function (objectA,objectB){
          var propertyChanges = [];
          var objectGraphPath = ["componentsStatus"];
          (function(a, b) {
            if(a.constructor == Array) {
              // BIG assumptions here: That both arrays are same length, that
              // the members of those arrays are _essentially_ the same, and
              // that those array members are in the same order...
              for(var i = 0; i < a.length; i++) {
                objectGraphPath.push("[" + a[i].compId + "]");
                arguments.callee(a[i], b[i]);
                objectGraphPath.pop();
              }
            } else if(a.constructor == Object || (a.constructor != Number &&
              a.constructor != String && a.constructor != Date &&
              a.constructor != RegExp && a.constructor != Function &&
              a.constructor != Boolean)) {
                // we can safely assume that the objects have the
                // same property lists, else why compare them?
                for(var property in a) {
                  objectGraphPath.push(("." + property));
                  if(a[property].constructor != Function) {
                    arguments.callee(a[property], b[property]);
                  }
                  objectGraphPath.pop();
                }
              } else if(a.constructor != Function) { // filter out functions
                if(a != b || a.length != b.length) {
                 if (objectGraphPath.length>2){
                  var cmpId = objectGraphPath[1].substring(1,objectGraphPath[1].length-1);
                  objectGraphPath = objectGraphPath.filter(function(p){ if (p.indexOf('undefined')===-1) return true;})

                      var prop = objectGraphPath[objectGraphPath.length-1].substring(1);
                      propertyChanges.push({ "compId":cmpId,"property":prop,"newValue":a});
                  }
                }
              }
            })(objectA, objectB);
            return propertyChanges;
          }
        this.removeFromArray = function remove(arr, what) {
                var found = arr.indexOf(what);

                while (found !== -1) {
                    arr.splice(found, 1);
                    found = arr.indexOf(what);
                }
        }
           var xhttp = new XMLHttpRequest();
                   xhttp.onreadystatechange = function() {
                          if (this.readyState == 4 && this.status == 200) {
                               mediascape.cameras =  JSON.parse(this.responseText);
                             }
                    }
                xhttp.open("GET", "/getCameraStatus", true);
                xhttp.send();
 
        return this;
      }

      Utils.__moduleName = "Utils";
      return Utils;

    });
