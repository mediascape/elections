define([""],
function(){
  var hbbtvAdaptation = function (){
    console.log("=============hbbtvAdaptation====================");

    var rule = {};

    // a reference to the shared context which is maintained by the hybrid adaptation engine
    var context = {};

    // initialize the adaptation plugin
    this.init = function(rl, ctx) {
      console.log("=============hbbtvAdaptation=== [init]=================");
      //console.log(rl);

      rule = rl;
      context = ctx;
      this.components = mediascape.AdaptationToolkit.componentManager.core.getComponents();
      // MAPPING COMPONETS WITH EACH ATTRIBUTE OF THE RULE RELATED

    };

    this.onChange = function( evt, ctx ) {
      var AE = mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation;
      var agents = ctx.agents;
      context = ctx;
      var decision = {priority: rule.priority, actions: []};
      if (mediascape.deviceType=="TV"){
      var broadcast = this.componets.forEach(function(c){
              if (c.getAttribute('type') == "broadcast") {
                    decision.actions.push({type:'SHOW',component:c.selector});
              }
              if (c.getAttribute('type') != "broadcast" && c.nodeName =="X-MEDIA"){
                  decision.actions.push({type:'HIDE',component:c.selector});
              }

      });
    }

      decision.agent = agents[0];
      console.log("DECISION TV",decision.actions[0]);
      return decision;
    }


  };

  hbbtvAdaptation.__moduleName = "hbbtv";
  return hbbtvAdaptation;
});
