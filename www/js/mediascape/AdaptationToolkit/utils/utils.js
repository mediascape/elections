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
                  var cmpId = objectGraphPath[1].substring(1,objectGraphPath[1].length-1);
                  console.log(objectGraphPath);
                  objectGraphPath = objectGraphPath.filter(function(p){ if (p.indexOf('undefined')===-1) return true;})
                  if (objectGraphPath.length>2){
                      var prop = objectGraphPath[objectGraphPath.length-1].substring(1);
                      propertyChanges.push({ "compId":cmpId,"property":prop,"newValue":a});
                  }
                }
              }
            })(objectA, objectB);
            return propertyChanges;
          }

        return this;
      }

      Utils.__moduleName = "Utils";
      return Utils;

    });
