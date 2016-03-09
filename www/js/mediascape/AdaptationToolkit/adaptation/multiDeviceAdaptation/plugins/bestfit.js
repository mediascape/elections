define([""],
function(){
  var bestfitAdaptation = function (){
    console.log("=============bestfitAdaptation====================");

    var rule = {};

    // a reference to the shared context which is maintained by the hybrid adaptation engine
    var context = {};

    // initialize the adaptation plugin
    this.init = function(rl, ctx) {
      console.log("=============bestfit=== [init]=================");
      //console.log(rl);

      rule = rl;
      context = ctx;
      this.components = mediascape.AdaptationToolkit.componentManager.core.getComponents();
      // MAPPING COMPONETS WITH EACH ATTRIBUTE OF THE RULE RELATED
      var bestfitParameters = rl.behaviour;
      this.components.forEach(function(c){
          bestfitParameters.forEach(function(p){
              if (p.componentId === c.getAttribute('id')){
                  c.adaptationBehaviour = {};
                  var needsParams =[];
                  needsParams.push(p.needs);
                  c.adaptationBehaviour['bestfit'] = p.bestfit;
                  c.adaptationBehaviour['needs'] = needsParams;
                  c.adaptationBehaviour['required'] = p.required;
                  c.adaptationBehaviour['movable'] = p.movable;
                  c.adaptationBehaviour['duplicable'] = p.duplicable;
                  c.adaptationBehaviour['videoLimit']=p.videoLimit;
              }
          })
      });
     console.log(this.components);
    };

    this.onChange = function( evt, ctx ) {
      var AE = mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation;
      var agents = ctx.agents;
      context = ctx;
      var decision = {priority: rule.priority, actions: []};
      var me = agents.filter(function(ag){
            if (ag.id ===  AE.getAgentId() ) return true;
            return false;
      })[0];

      try {
      var mediasNumb = 0;
      var agent = AE.getAgentId();
      decision.actions = this.components.map(function(cmp){
          //Check if there is any command from user

          var otherAgents = agents.filter(function(ag){
                if (ag.id === AE.getAgentId() ) return false;
                return true;
          });
          var moveToOtherAgent =false;


          var myNote = 0;
          // True by default because maybe has not needs
          var needs = true;
          //Check for needs, this agent support all needs or not
          needs = cmp.adaptationBehaviour['needs'].every(function(atr){
              if (atr === "none") return true;
              if (atr === "x86")
                if (navigator.appVersion.indexOf('x86')===-1)  return false;
                if (atr.toLowerCase().indexOf('screensize')>-1){
                  if (atr.operation)
                    if (atr.operation === "bigger"){
                      //var size = mediascape.Agent.data['screensize'][1];
                      var diagonal =getCapability(me.capabilities,"screen");
                      if (diagonal>parseInt(atr.value)) return true;
                      else return false;

                    }
              }
              if (atr.toLowerCase().indexOf('touchable')>-1){
                  if (this.getCapability(me.capabilities,"touchable")) return true;
                  else return false;
              }
              return true;
          },this);
          // If needs false means that is not a good agent for cmp
          if (!needs) return {type:"HIDE",component:cmp.getAttribute('id')};

          // Check my note related with a component
          var screen = mediascape.AdaptationToolkit.Adaptation.UIAdaptation.getScreenSize().extra;
          mediascape.screenX = screen[1].screenX;
          mediascape.screenY = screen[1].screenY;
          myScreen =Math.round(Math.sqrt(Math.pow(
              parseFloat(mediascape.screenX),2)+Math.pow(parseFloat(mediascape.screenY),2)));
          myInteractivity = getCapability(me.capabilities,'touchable');
          // other agents that covers the needs
          otherAgents = otherAgents.filter(function(ag){
            if (cmp.adaptationBehaviour['needs'][0]  === "none") return true;
            else
              if( cmp.adaptationBehaviour['needs'][0] === "x86" )
                  if (ag.capabilities['platform'].indexOf('x86')!=-1  ) return true;
                  else return false;


          });
          // Collect capability of each agent
          otherAgents.forEach(function(ag){
              ag.note = 0;
              ag.screen = getCapability(ag.capabilities,'screen');
              ag.interactivity = getCapability(ag.capabilities,'touchable');

          },this);
        // Evaluate each agent against me
          var results = [];
          var result = "";
          if (otherAgents.length>0) {
          otherAgents.forEach(function(ag){

              if (cmp.adaptationBehaviour['bestfit'].indexOf("biggestScreenSize")!==-1){
                 if (ag.screen < myScreen) results.push("1");
                 else if (ag.screen > myScreen) results.push("0");
                      else if (amIFirstOne(me,agents)) results.push("11");
                           else results.push("10")
              }
              else if (cmp.adaptationBehaviour['bestfit'].indexOf("smallestScreenSize")!==-1){
                 if (ag.screen < myScreen) results.push("0");
                 else if (ag.screen > myScreen) results.push("1");
                      else if (amIFirstOne(me,agents))results.push("11");
                            else results.push("11");
              }
              // If there was a draw check next propertie

              if (cmp.adaptationBehaviour['bestfit'].indexOf("touchable")!==-1){
                  if (!ag.interactivity && myInteractivity) results.push("1");
                  if (ag.interactivity && !myInteractivity) results.push("0");
                  if ((ag.interactivity && myInteractivity) || (!ag.interactivity && !myInteractivity))
                      if (amIFirstOne(me,agents)) results.push("11");
                      else results.push("10");
              }


          },this);

          if (results.indexOf('0')>-1) result = '0';
          else if (results.indexOf('10')==-1 && results.indexOf('11')==-1) result="1";
                else if (results.indexOf('10')>-1) result = '10';
                      else result = '11';
        }
        // IF AM THE ONLY ONE
        else {
                result = 1;
         }
          // Compare agents notes
          console.log("result",result,moveToOtherAgent,qualifiedAgentAndComponentToShow(me,cmp),cmp.nodeName);


          if ((cmp.adaptationBehaviour['duplicable'] ==true && cmp.adaptationBehaviour['required'] ==true)&&
              (result =="1" || result=="10" || result=="11") && cmp.nodeName.toLowerCase()!=='x-media')
                return {type:"SHOW",component:cmp.getAttribute('id')};
          if ((cmp.adaptationBehaviour['duplicable'] ==false && cmp.adaptationBehaviour['required'] ==true)&&
            (result =="1" || result=="11") && !moveToOtherAgent && cmp.nodeName.toLowerCase()!=='x-media')
                return {type:"SHOW",component:cmp.getAttribute('id')};
          if ((cmp.adaptationBehaviour['duplicable'] ==false && cmp.adaptationBehaviour['required'] ==true)&&
                  (result =="1" || result=="11") && moveToOtherAgent && cmp.nodeName.toLowerCase()!=='x-media')
                      return {type:"HIDE",component:cmp.getAttribute('id')};
          if ((cmp.adaptationBehaviour['duplicable'] ==true && cmp.adaptationBehaviour['required'] ==false)&&
                    (result =="1" || result=="10" || result=="11")&& qualifiedAgentAndComponentToShow(me,cmp)
                    && cmp.nodeName.toLowerCase()!=='x-media')
                return {type:"SHOW",component:cmp.getAttribute('id')};
          if ((cmp.adaptationBehaviour['duplicable'] ==false && cmp.adaptationBehaviour['required'] ==false)&&
                    (result =="1" || result=="11") && !moveToOtherAgent && qualifiedAgentAndComponentToShow(me,cmp)
                    && cmp.nodeName.toLowerCase()!=='x-media')
                return {type:"SHOW",component:cmp.getAttribute('id')};
          if ((cmp.adaptationBehaviour['duplicable'] ==false && cmp.adaptationBehaviour['required'] ==false)&&
                        (result =="1" || result=="11") && moveToOtherAgent && cmp.nodeName.toLowerCase()!=='x-media')  {
                          return {type:"HIDE",component:cmp.getAttribute('id')};
                        }




          if(cmp.adaptationBehaviour['required'] ==true && cmp.nodeName.toLowerCase()==='x-media' 
            && (result=="1" || result=="11") && cmp.adaptationBehaviour['videoLimit'].indexOf('main')!==-1){
              return {type:"SHOW",component:cmp.getAttribute('id')};
          }
          if(cmp.adaptationBehaviour['required'] ==true && cmp.nodeName.toLowerCase()==='x-media' 
            && (result=="1" || result=="11") && cmp.adaptationBehaviour['videoLimit'].indexOf('other')!==-1){
              return {type:"HIDE",component:cmp.getAttribute('id')};
          }
          if(cmp.adaptationBehaviour['required'] ==true && cmp.nodeName.toLowerCase()==='x-media' 
            && (result=="10" || result=="0") && cmp.adaptationBehaviour['videoLimit'].indexOf('other')!==-1){
              return {type:"SHOW",component:cmp.getAttribute('id')};
          }
          if(cmp.adaptationBehaviour['required'] ==true && cmp.nodeName.toLowerCase()==='x-media' 
            && (result=="10" || result=="0") && cmp.adaptationBehaviour['videoLimit'].indexOf('main')!==-1){
              return {type:"HIDE",component:cmp.getAttribute('id')};
          }

          


          if(cmp.adaptationBehaviour['required'] ==false && cmp.nodeName.toLowerCase()==='x-media' 
            && (result=="1" || result=="11") && cmp.adaptationBehaviour['videoLimit'].indexOf('main')!==-1
            &&qualifiedAgentAndComponentToShow(me,cmp)){
              return {type:"SHOW",component:cmp.getAttribute('id')};
          }
          if(cmp.adaptationBehaviour['required'] ==false && cmp.nodeName.toLowerCase()==='x-media' 
            && (result=="1" || result=="11") && cmp.adaptationBehaviour['videoLimit'].indexOf('other')!==-1
            &&qualifiedAgentAndComponentToShow(me,cmp)){
              return {type:"HIDE",component:cmp.getAttribute('id')};
          }
          if(cmp.adaptationBehaviour['required'] ==false && cmp.nodeName.toLowerCase()==='x-media' 
            && (result=="10" || result=="0") && cmp.adaptationBehaviour['videoLimit'].indexOf('main')!==-1
            &&qualifiedAgentAndComponentToShow(me,cmp)){
              return {type:"HIDE",component:cmp.getAttribute('id')};
          }
          if(cmp.adaptationBehaviour['required'] ==false && cmp.nodeName.toLowerCase()==='x-media' 
            && (result=="10" || result=="0") && cmp.adaptationBehaviour['videoLimit'].indexOf('other')!==-1
            &&qualifiedAgentAndComponentToShow(me,cmp)){
              return {type:"SHOW",component:cmp.getAttribute('id')};
          }


          /*if(cmp.nodeName.toLowerCase()==='x-media' && (result!="1" && result!="11") && 
            cmp.adaptationBehaviour['videoLimit'].indexOf('other')!==-1){
              return {type:"SHOW",component:cmp.getAttribute('id')};
          }
          if(cmp.nodeName.toLowerCase()==='x-media' && (result=="1" || result=="11") && 
            cmp.adaptationBehaviour['videoLimit'].indexOf('other')!==-1){
              return {type:"HIDE",component:cmp.getAttribute('id')};
          }
          if(cmp.nodeName.toLowerCase()==='x-media' && (result!="1" && result!="11") && 
            cmp.adaptationBehaviour['videoLimit'].indexOf('main')!==-1){
              return {type:"HIDE",component:cmp.getAttribute('id')};
          }*/

          return {type:"HIDE",component:cmp.getAttribute('id')};

      },this);
      }
      catch (e){
        console.log(e);
      }
      // Check if media limitation of agent
    //  var videoLimit = mediascape.Agent.checkAgentLimitation('video');
    /*  if (videoLimit){
          console.log("THIS COMPONENTS",this.components);
          var number = 0;
          this.components = this.components.filter(function(cmp){
              if (cmp.nodeName.toLowerCase() !== "x-media") return true;
              else if (cmp.nodeName.toLowerCase() === "x-media" && number<videoLimit) {
                      number++;
                      return true;
                    }
                    else return false;
          });

      }*/
    /*  mediascape.AdaptationToolkit.componentManager.core.getComponents().each(function(c1){
          this.components.forEach(function(c2){
              decision.actions.push({type:'SHOW',component:c2.getAttribute('id')});
          });
    },this);
    */
      decision.agent = agent;
      console.log("DECISION",decision.actions[0]);
      return decision;
    }
     function getCapability  (ag,propertie){
      var result = 0;
      //console.log(ag);

      //bigScreenCapability
      if (propertie === "screen"){
        var size = ag['screenSize'][1];
        var diagonal = Math.round(
        Math.sqrt(
          Math.pow(
            parseFloat(size['screenX']),2)+Math.pow(parseFloat(size['screenY']),2)));
         return diagonal;
      }
      if (propertie === "touchable"){
          var val="";
          if (ag['touchScreen'].presence !=undefined) val = ag['touchScreen'].presence;
          else {
            if (ag['touchScreen'] === "supported"){
              val = true;
            }
            else val = false;

          }
          return val;
      }
      return false;

    }
    function amIFirstOne (me,agents){

        if (agents.length===1) return true;
        else
          if (me._id< agents[1]._id)
                  return true;
          else return false;
     }
    function qualifiedAgentAndComponentToShow (me,cmp){
      if (cmp.adaptationBehaviour['bestfit'].indexOf("biggestScreenSize")!==-1){
        var myScreen = getCapability(me.capabilities,'screen');
        if (myScreen>8) return true;
        else return false;
      }
      else if (cmp.adaptationBehaviour['bestfit'].indexOf("touchable")!==-1){
        var myInteractivity = getCapability(me.capabilities,'touchable');
        if ( myInteractivity) return threshold = true;
        else return false;
     }
      return false;
    }


  };

  bestfitAdaptation.__moduleName = "bestfit";
  return bestfitAdaptation;
});
