define([""],
function(){
    var userprefAdaptation = function (){
        // save the actions done by the previous operations
        var aggregated_result = [];

        // configuration, defined by the JSON fule file as the input to this adaptation plugin
        var config = {};

        // a reference to the shared context which is maintained by the hybrid adaptation engine
        var context = {};

        // initialize the adaptation plugin
        this.init = function(cfg, ctx) {
            console.log("=============personal_adaptation=== [init]=================");
            console.log(cfg);

            config = cfg;
            context = ctx;
        };

        // deal with the change events of the application context
        this.onChange = function( evt, ctx) {
            context = ctx;
            var AE = mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation;
            var agents = ctx.agents;
            var me = agents.filter(function(ag){
                  if (ag.id ===  AE.getAgentId() ) return true;
                  return false;
            })[0];

            var decision = {priority: config.priority, actions: []};
            if (me){
            var componentsStatus = me.capabilities["componentsStatus"];
            if (componentsStatus && componentsStatus !== "supported")
            for (c in componentsStatus){
                if ( typeof componentsStatus[c] === 'object')
                  if (componentsStatus[c].customCmd.length>0)
                     if ((componentsStatus[c].customCmd.lastIndexOf('show')!=-1 || componentsStatus[c].customCmd.lastIndexOf('hide')!=-1)
                        && componentsStatus[c].customCmd.lastIndexOf('show') >= componentsStatus[c].customCmd.lastIndexOf('hide')){
                       /*if (cmp.lproperties['duplicable']==="false")
                        otherAgents.forEach(function(ag){
                         mediascape.Communication.setRemoteAgentComponentStatus(ag.id,cmp.getAttribute('compId'),'hide');
                       });*/
                       //this.localChange = false;
                       decision.actions.push({"type": "SHOW", "component": componentsStatus[c].selector});

                     }
                     else{
                      // this.localChange = false;
                      if(componentsStatus[c].customCmd.lastIndexOf('hide')!=-1)
                        decision.actions.push({"type": "HIDE", "component": componentsStatus[c].selector});

                     }
                     //else return false;


            }
           }
           console.log(decision);
            return  decision;

        };
    };

    userprefAdaptation.__moduleName = "userpref";
    return userprefAdaptation;
});
