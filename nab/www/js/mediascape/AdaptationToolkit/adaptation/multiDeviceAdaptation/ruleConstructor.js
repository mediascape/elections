define(
  [
  ],
  function(){

    var ruleConstructor =  function (name){
      this.name = name;
      this.components = [];
      this.onUniqueAgent =function(applicationContext){}
      this.onSeveralAgent=function (applicationContext){}
      this.sendDecision= function sendDecision (cb){

         var components = this.components.map(function(c){
            return c.getAttribute('compId');
         });
         var me =  mediascape.Communication.getContext().agents.filter(function(ag){
              if (mediascape.Communication.getAgents()['self'].agentid ===ag.id) return true;
              else return false;
         })[0];
        if (me){
          var allcmps = me.capabilities['componentsStatus'];
          if (allcmps==="undefined" || allcmps==="supported" || !allcmps )
            allcmps = mediascape.AdaptationToolkit.componentManager.core.getComponents();

         var status = allcmps.map(function(c){
              c.compId = c.compId ? c.compId : c.getAttribute('compId');
              if (components.indexOf(c.compId)>-1) {
                var obj = {};
                obj.show = true;
                obj.compId = c.compId;
                obj.customCmd = c.customCmd || [];
                return obj;
              }
              else {
                var obj = {};
                obj.show = false;
                obj.compId = c.compId;
                obj.customCmd =c.customCmd || [];
                return obj;
              }
         },this);
         mediascape.AdaptationToolkit.componentManager.core.setComponentsStatus(status);
         //mediascape.Communication.setAgentsComponentStatus();
         var event = new CustomEvent("onComponentsChange", {"detail":{"type":"localChange","cmps":status}});
         document.dispatchEvent(event);

       }
         cb (this.components);

      }

      this.checkForImplementation=function(){
        console.group('Rule '+name);
      //  if (!this.onUniqueAgent  || this.onUniqueAgent.getBody().trim().length <4 )console.warn("You must implement onUniqueAgent function");
      //  else
          if (!this.onSeveralAgent || this.onSeveralAgent.getBody().trim().length <4 )console.warn("You must implement onSeveralAgent function");
          else
              if (!this.sendDecision || this.sendDecision.getBody().trim().length <4 )console.warn("You must implemented sendDecision function");
              else {
                        console.log("0 errors all rules with correct implementation");
                        console.groupEnd();
                        return true;
                        }
            console.groupEnd();
          }
        }

        ruleConstructor.__moduleName = "ruleConstructor";
        return ruleConstructor;

      });
