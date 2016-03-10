/**
* MultiDeviceAdaptationEngine module is the responsible of relation between sharedContext
* and application logic. This module offers functions to get all information need related
* with the sharedContext. This information is used to decide howto distribute all components
* on the each device dependeing on the context. For this purpose, there is an plugin system
* that implements different rules with different priority to decide the best distirbution. The
* configuration file of the plugins is located at resources/adaotationRules/rules.son
*
* @module mediascape/AdaptationToolkit/adaptation/multiDeviceAdaptation/mdadaptation
* @requires mediascape/AdaptationToolkit/adaptation/multiDeviceAdaptation/plugins/explicit
* @requires mediascape/AdaptationToolkit/adaptation/multiDeviceAdaptation/plugins/bestfit
* @requires mediascape/AdaptationToolkit/adaptation/multiDeviceAdaptation/plugins/userPref
* @requires mediascape/AdaptationToolkit/adaptation/multiDeviceAdaptation/plugins/affinitymatch
* @requires mediascape/Applicationcontext/applicationcontext
* @requires jquery
*
*/
/**
* Fired when sharedContext is initialize and ready to use: listener document
* @event applicationContext-ready
* @param {Object} applicationContext-ready { "detail": "application context ready" }
*/
/**
* Fire when sharedContext has change, the could be identify by the object lastChange
* @event contextUpdate
* @param {Object} contextUpdate { "detail": {"context":context,type:type,"agentid":agentid}}
*/
/**
* Fire when component status change, updated are related with local agent, output is received by UIAdaptation
* @event onComponentsChange
* @param {Object} onComponentsChange {"detail":{"type":"localChange","cmps":status,"agentid":change.agentid}}
*/
/**
* Fire when layout change, updated are related with local agent
* @event layoutEvent
* @param {Object} layoutEvent ',{detail:{layoutName:value}})
*/
define(['jquery',
'mediascape/Applicationcontext/applicationcontext',
'mediascape/AdaptationToolkit/adaptation/multiDeviceAdaptation/plugins/explicit',
'mediascape/AdaptationToolkit/adaptation/multiDeviceAdaptation/plugins/affinitymatch',
'mediascape/AdaptationToolkit/adaptation/multiDeviceAdaptation/plugins/bestfit',
'mediascape/AdaptationToolkit/adaptation/multiDeviceAdaptation/plugins/userpref'],
function($, applicationContext){

  /** ApplicationContext instance. */
  var plugin_modules = {};
  var localStatus = null;
  var moduleList = Array.prototype.slice.apply(arguments);
  var i=2;
  for( i=2; i<moduleList.length; i++){
    var name = moduleList[i].__moduleName;
    plugin_modules[name] = moduleList[i];
  }

  var multiDeviceAdaptation = function(){
    /**
    * @Constructor multiDeviceAdaptation
    *
    */
      /** ApplicationContext instance. */
    var applicationContext = undefined;
    // Custom Events shouldn't affect to UI
    var UIChangeEvents = ["show","hide"];
    // the constructed context based on the context updates
    var context = {"agents":[]};
    var userActionOn = false;
    // id of the local agent
    var local_agent_id;
    var changeType = "ui";
    // the list to record the capabilities involved in the rule file
    var required_capability_list = [];
    var rules = {};
    var listeningAgents = [];
    var agentStack = {};
    var agentReady = false;
    /*['battery', 'camera', 'deviceMotion', 'deviceOrientation', 'deviceType',
    'geolocation', 'language',
    'microphone', 'navigatorProduct', 'onLine',
    'orientation', 'platform', 'screenSize',
    'shake', 'userProximity', 'vibrate']; */
    var firstTime = true;
    var plugins = [];

    // the callback functions to inform the others (e.g., UI engine) about the actions
    var all_cbs = [];
    var doCallbacks = function (e) {
      for (var i = 0; i < all_cbs.length; i++) {
        try {
          all_cbs[i].call(self, e);
        } catch (err) {
          console.log("Error in agentchange callback: ", err);
        }
      }
    };

    // detect the existing conflict in the results returned from all plugins and try to solve them
    var cleanConflict = function(decisions) {
      var maxPriority = 0, result = null;

      for(var i=0; i<decisions.length; i++){
        if(decisions[i].priority > maxPriority) {
          maxPriority = decisions[i].priority;
          if (result === null)
          result = decisions[i].actions;
          else {
            result.forEach(function(c){
              decisions[i].actions.forEach(function(c2){
                if (c.component === c2.component){
                  c.type = c2.type;
                }
              })
            });
          }
        }
      }

      return result;
    };
  /**
    * take only the actions for the local agent from the generated results
    * @param {array} list, {number} agentid
    */
    var filterByAgentId = function( list, id ) {
      for(var i=0; i<list.length; i++){
        if(list[i].agent == id){
          return list[i].actions;
        }
      }
    };

    // check if it is an existing agent
    var hasAgent = function(id) {
      for(var i=0; i<context.agents.length; i++){
        if(context.agents[i].id == id)
        return true;
      }

      return false;
    };

    // access the agent object by ID
    var getAgentById = function(id) {
      for(var i=0; i<context.agents.length; i++){
        if(context.agents[i].id == id)
        return context.agents[i];
      }

      return null;
    };
    // Add clients on connection order
    var addCounter = function(agentid){
      var ids_order = applicationContext.getItem('order_agentid') || [];

      if(ids_order.lastIndexOf(agentid)===-1)
      {
        ids_order.push(agentid);
        applicationContext.setItem('order_agentid',ids_order);
      }

      return ids_order.lastIndexOf(agentid);
    }
    var getChangeDiff = function (agentid,obj){
    /*  if (localStatus === null) {
        localStatus = obj;
        return mediascape.AdaptationToolkit.Utils.getObjectDiff(obj,localStatus);
      }
      else*/
      var ag = getAgentById(agentid);
      if (ag)
         {
           localStatus = ag.capabilities.componentsStatus;
           if ( (obj.length != localStatus.length) || (localStatus ==="supported" || localStatus ==="undefined")){
                return [];
              }
           else {
                  var diff = mediascape.AdaptationToolkit.Utils.getObjectDiff(obj,localStatus);
                  if (diff.length ===0) diff = context.lastChange.diff;
                  return diff;
            }
          }
          else return [];
    }
    // called whenever a change happens to the shared context
    var updateContext = function(change) {
      var diff = null;
      if( change.type === 'AGENT_JOIN' ) {
        if( hasAgent(change.agentid) == false) {
          // new agent joined, add it into the list
          var cnt = addCounter(change.agentid);
          context.agents.push( {"_id":cnt,"id": change.agentid, "capabilities": [],agentContext:change.agentContext} );
        }

      }
      else if( change.type === 'VALUE_CHANGE' ) {
        // update the exiting agent with the new capability list
        var agent = getAgentById(change.agentid);
        if (!agent) {
          var cnt = addCounter(change.agentid);
          agent = {"_id":cnt,"id": change.agentid, "capabilities": [],agentContext:change.agentContext};
          context.agents.push(agent);
          agent = getAgentById(change.agentid);

        }

        for(var capability in change.capabilities){
          agent.capabilities[capability] = change.capabilities[capability];
        }
      } else if( change.type === 'AGENT_LEFT' ){
        console.log('existing agent is leaving');
        // notify locally the change
        notifiAgentChange('left',change.agentid)
        // existing agent left, remove it from the list
        for(var j=0; j<context.agents.length; j++){
          if(context.agents[j].id == change.agentid){
            console.log('remove it from the list');
            context.agents.splice(j, 1);
            break;
          }
        }
      }

    };

    var updateCapibilityContext = function(changes){

              console.log('********************* capabilities change event **********************');
              console.log(changes,key);
              changes.forEach (function(change){
                    var diff = null;
                    if (change.capability === "componentsStatus") diff = getChangeDiff(change.agentid,change.value);
                    if (diff != null ){
                      if (change.diff ) {diff = change.diff; change.capability ="componentsStatus"}
                      context.lastChange = {key:change.capability,value:change.value,diff:diff};
                      context.agentid = change.agentid;
                      if(diff[0])
                      if (diff[0].property === "customCmd" && UIChangeEvents.indexOf(diff[0].newValue) === -1 ) changeType = "data";
                      else changeType = "ui";
                    }
                    else {
                      if ( change.capability !== "componentsStatus" )
                      {
                        context.lastChange = {key:change.capability,value:change.value,diff:null};
                        context.agentid = change.agentid;
                        changeType = "ui";
                      }

                    }
                    var agent = getAgentById(change.agentid);
                    agent.capabilities[change.capability] = change.value;

            });

    }

    // react on the context change, the core function of the designed hybrid adaptation
    var hybridAdaptation = function(change) {
      var decisions = [];
      // inform all plugins about this change and get back the updated decisions from each of them
      for(var i=0; i<plugins.length; i++) {
        var decision = plugins[i].onChange(change, context);
        if( decision && decision.actions.length > 0 )
        decisions.push(decision);
      }

      // solve the conflicts in the decisions made by different adaptation plugins
      console.log("before update componetsStatus",decisions.length,plugins);
      if(decisions.length > 0) {
        var actions = cleanConflict(decisions);

        // keep the actions for the current agent
        var myactions = actions;//filterByAgentId(actions, local_agent_id);

        // notify the UI engine about which web components to display
        if( myactions && myactions.length && myactions.length > 0){
          var event = {"type": "FULL_UPDATE", "actions": myactions,agentid:change.agentid};
          if (changeType === "ui"){
              doCallbacks(event);
              console.log("EVENT",event);
          }
          // update componentStatus local and remote
        var AE = mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation;
        if (AE.getApplicationContext().getItem('reset')) event.agentid = AE.getAgentId();
         updateComponentStatus(event);
        }
      }
    };
    // update componentStatus local and remote
    var updateComponentStatus = function (change){
      var components = change.actions.map(function(c){
        if (c.type === "SHOW") return document.querySelector("#"+c.component).getAttribute('compId');
        else return null;
      });
      var statusBefore = mediascape.AdaptationToolkit.componentManager.core.getComponentsStatus()
      var AE = mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation;
      var me =AE.getLocalContext().agents.filter(function(ag){
        if (AE.getAgentId() ===ag.id && change.agentid === AE.getAgentId()) return true;
        else return false;
      })[0];
      if (me){
        var allcmps = me.capabilities['componentsStatus'];
        if (allcmps==="undefined" || allcmps==="supported" || !allcmps )
        allcmps = mediascape.AdaptationToolkit.componentManager.core.getComponents();

        var status = allcmps.map(function(c){
          c.compId = c.compId ? c.compId : c.getAttribute('compId');
          c.selector = c.selector ? c.selector : c.getAttribute('id');
          if (components.indexOf(c.compId)>-1) {
            var obj = {};
            obj.show = true;
            obj.compId = c.compId;
            obj.selector = c.selector ;
            obj.customCmd = c.customCmd || [];
            return obj;
          }
          else {
            var obj = {};
            obj.show = false;
            obj.compId = c.compId;
            obj.selector = c.selector ;
            obj.customCmd =c.customCmd || [];
            return obj;
          }
        },this);

      status = status || [];
      var diff = [];
   if (statusBefore.length>0 )
      //  if (!hasAgent(change.agentid)) change.agentid = me.id;
        diff = getChangeDiff(me.id,status);
      if (diff && (diff.length>0 || statusBefore.length===0 )){
        mediascape.AdaptationToolkit.componentManager.core.setComponentsStatus(status);
        var event = new CustomEvent("onComponentsChange", {"detail":{"type":"localChange","cmps":status,"agentid":me.id}});
        document.dispatchEvent(event);
        AE.notifyUpdateContext(context,"cmp_changed",context.agentid);
      }
    }else{ // Other agents
      var otherAgent =AE.getLocalContext().agents.filter(function(ag){
        if (ag.id === change.agentid ) return true;
        else return false;
      })[0];
      var diff = getChangeDiff(change.agentid,otherAgent.capabilities['componentsStatus']);
      var event = new CustomEvent("onComponentsChange", {"detail":{"type":"localChange","cmps":status,"agentid":otherAgent.id}});
      document.dispatchEvent(event);
      console.log("other agent change <<<<<><");
    }
    }

    // update the shared context object
    var onUpdateContext = function (change) {
      // adapt to the current context change
      var AE = mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation;
      if (change.contextType === "agentChange") updateContext(change);
      if (change.contextType === "capabilityChange") updateCapibilityContext(change);
      // Check if all capabilities are collected before shared with decision plugins
      var needInfoReady = context.agents.every (function(ag){
        if (ag.capabilities.hasOwnProperty('touchScreen') && ag.capabilities.hasOwnProperty('screenSize')) return true;
        else return false;
      });
     if (needInfoReady && hasAgent(AE.getAgentId()))
      if (change.contextType === "capabilityChange" ) hybridAdaptation(change[0]);
      else hybridAdaptation(change);

    };


    // subscribe all demanded agent capabilities
    var subscribeAgentCapabilities = function(e) {
      console.log('subscribe agent capabilities',required_capability_list);
      agentStack[e.agentid] = {contextType:'capabilityChange',time:new Date().getTime(),changes:[],oldtime:new Date().getTime()};
      var i =0;
      for(i=0; i<required_capability_list.length; i++){
        var capability = required_capability_list[i];

        // listen to the events that cause changes to the capabilities involved in the rule file
        var availableCapabilities = e.diff.capabilities;

        if( availableCapabilities.hasOwnProperty(capability) == true  ) {
          console.log('subscribe to the change of ' + capability + ' for agent id = ' + e.agentid);
          // subscribe the change of all demanded capabilities for remote agents

          e.agentContext.on(capability, function(key, value) {
            console.log('capture');
            if( key && value ) {
              var change = {};
              change['type'] = 'CAPABILITY_CHANGE';
              change['agentid'] = e.agentid;
              change['capability'] = key;
              change['value'] = value;
              change['agentContext'] = e.agentContext;
              var me = mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgentId();
              if (e.agentid === me && key === "layoutEvent"){
                if (value !="" && value !="supported"){
                  mediascape.AdaptationToolkit.Adaptation.UIAdaptation.useLayout(value);
                  var eventL = new CustomEvent('layoutEvent',{detail:{layoutName:value}})
                  document.dispatchEvent(eventL);
                  mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgents ()['self'].setItem('layoutEvent','');
                }
              }else   if (e.agentid === me && key === "layoutParameter"){
                  if (value !="" && value !="supported"){
                    mediascape.AdaptationToolkit.Adaptation.UIAdaptation.onRemoteCommand(value);

                  }
                }
              // Crear un pila para evitar sobre saturar el sistema
            if (rules.groupCapacities){
             agentStack[e.agentid].time = new Date().getTime();
             var timeDiff = Math.abs( agentStack[e.agentid].oldtime - agentStack[e.agentid].time );
          //   console.log("TIME",timeDiff);
             if (timeDiff > 600){
                  clearTimeout(agentStack[e.agentid].timeout);
                  agentStack[e.agentid].changes.contextType = "capabilityChange";
                  agentStack[e.agentid].changes.push(change);
                  onUpdateContext(agentStack[e.agentid].changes);
                  agentStack[e.agentid].oldtime = new Date().getTime();
              //    console.log("STACK",agentStack[e.agentid].changes);
                  agentStack[e.agentid].changes = [];


            }
            // Asegurar que no se queda ningun cambio sin notificar.
            else {
                agentStack[e.agentid].changes.push(change);
                agentStack[e.agentid].changes.contextType ="capabilityChange";
            //    console.log("ADDED",agentStack[e.agentid].changes,new Date().getTime());
                var _agentStack = agentStack;
                var agentid =e.agentid;
                console.log("timeout", !agentStack[e.agentid].timeout);
                if (!agentStack[e.agentid].timeout)
                     (function(_agentStack,agentid){
                          _agentStack[agentid].timeout =  setTimeout(function(){
                              _agentStack[agentid].oldtime = new Date().getTime();
                              console.log("NO STACK",_agentStack[agentid].changes,_agentStack[agentid].oldtime,_agentStack[agentid].timeout);
                              onUpdateContext(_agentStack[agentid].changes);
                              _agentStack[e.agentid].timeout = undefined;
                      },1000);})(agentStack,e.agentid);

            }
            }
            // Do not agroup capacities
            else {
                 agentStack[e.agentid].changes.push(change);
                 agentStack[e.agentid].changes.contextType ="capabilityChange";
                 onUpdateContext(agentStack[e.agentid].changes);
                 agentStack[e.agentid].changes=[];
            }
          }


          }, e.agentid);
        }
      }
    };


    // the handler to process the change events from the application context
    var onAgentsChange = function (e){
      if( e.agentContext == null ){
        resetComponentsStatusCmds();
        var change = {};
        change['type'] = 'AGENT_LEFT';
        change['agentid'] = e.agentid;
        change['value'] = 'left';
        change['contextType'] = 'agentChange'
        console.log('^^^^^^^^^^^^^^^^^^^^^^^' + e.agentid + 'left===============');
        setTimeout(function(){onUpdateContext(change);},500);
        notifiAgentChange('left',e.agentid);

      } else if( e.agentContext ) {
          var change = {};
          change['type'] = 'VALUE_CHANGE';
          change['agentid'] = e.agentid;
          change['value'] = 'value_change';
          change['key'] = e.key;
          change['contextType'] = 'agentChange'
          change['capabilities'] = e.diff.capabilities;
          change['agentContext'] = e.agentContext;
          onUpdateContext(change);
          subscribeAgentCapabilities(e);
          //setTimeout(function(){mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getApplicationContext().setItem('reset',"false");},4000);
          /**
           Condicion para evitar incongruencia de appCtx cuando es el primer agent
           Envia eventos diferentes.
           **/
          var ag = getAgentById(e.agentid);
          if (Object.keys(e.diff.capabilities).length===0 && !ag.notified){
                var agentid = e.agentid;
                resetComponentsStatusCmds();
                var capsReady = setInterval(function () {
                  //console.log("checking if join ready");
                  if (ag.capabilities)
                    if (ag.capabilities['componentsStatus']){
                      //  console.log("checking if join ready componentStatus exists");

                        var cmpNum =mediascape.AdaptationToolkit.componentManager.core.getComponents().length;
                        if (ag.capabilities['componentsStatus'].length === cmpNum && typeof ag.capabilities['componentsStatus'] !=="string")
                           {

                                clearInterval(capsReady);
                                ag.notified = true;
                                agentReady = true;
                                notifiAgentChange('join',e.agentid);
                                console.log('^^^^^^^^^^^^^^^^^^^^^^^' + e.agentid + 'join===============');
                                mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getApplicationContext().setItem('reset',"false");
                        }
                      }
                },1000);

          }
      console.groupEnd();
    };
  }

    // a callback function when the user confirms the operations
    var onUserOperation = function( actions ) {
       // deprecated
    };
    this.setContext = function(_ctx){
      context = _ctx;
      var agent =getAgentById(mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgentId());
      var change = {};
      change['type'] = 'CAPABILITY_CHANGE';
      change['agentid'] = agent.id;
      change['capability'] = 'componentsStatus';
      change['value'] = agent.capabilities['componentsStatus'];
      console.log('^^^^^^^^^^^^^^^^^^^^^^^' + agent.agentid + 'Reset comopnentsStatus===============');
      hybridAdaptation(change);

    }
    // install event listeners to trigger the popup dialog for users to specify how to move or duplicate the selected web component
    var hookPersonalAdaptationMenu = function (config){
       // deprecated
    };

    var resetComponentsStatusCmds = function (){
          console.log("RESETING!!!");
          applicationContext.setItem('reset',"true");
          //setTimeout(function(){mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getApplicationContext().setItem('reset',"false");},3000);
    }
    // initialize the loaded adaptation plugins with their associated rule inputs
    var initPlugins = function(_rules) {
      var inputs = [];
      rules = _rules;
      // explicit rule
      inputs.push(rules['explicitRules']);

      // implicit rules
      var implicit = 0;
      for( implicit in rules['implicitRules']){
        inputs.push(rules['implicitRules'][implicit]);
      }

      // user preference
      inputs.push(rules['userPreferences']);

      // initialize all plugins with their behavior specification
      var i =0;
      for ( i=0; i<inputs.length; i++) {
        var temp = inputs[i];

        if(temp.enabled == true) {
          var plugin = new plugin_modules[temp.name]();

          // initialize the plugin with the right input and put it into the plugin array
          plugin.init(temp, context);
          plugins.push(plugin);
          console.log("initplugin1");
          // prepare the agent capability list demanded by enabled adaptation plugins
          var j = 0;
          for (j = 0; j < temp.capabilities.length; j++) {
            if( required_capability_list.indexOf(temp.capabilities[j]) < 0 ) {
              required_capability_list.push(temp.capabilities[j]);
            }
          }
          console.log("initplugin2");
        }
      }
      console.log("initplugin3");

      // print out all demanded agent capabilities


    };

  // parse the input json file to extract rules and constraints
  var loadJSONRules = function(file) {
    $.ajaxSetup({
                cache: true
      })
    $.getJSON(file, function(rules){
      // set up for the personal adaptation to take care of user preference

      if( rules['userPreferences'].enabled == true ) {
        // add one new capability named "operation" to propagate the move/duplicate operations triggered by the user
        var instruments = {};
        instruments.operation = {
          init: function () {
            this.setCapability("operation", "supported");
          }
        };
        mediascape.agentContext.load(instruments);

        console.log('=============hook adaptation contextual menu');

        // install the listener to trigger a contextual popup menu for specifying the operations
        hookPersonalAdaptationMenu(rules['userPreferences']['behaviour']);
      }

      // initialize all the adaptation plugins with the loaded rule inputs
      console.log("hementxeeee");
      initPlugins(rules);

      // listen to the change events of the application context
      applicationContext.on('agentchange', onAgentsChange);
     rules.applicationAttributes.forEach(function(at){

        applicationContext.on(at,function(e){
            var appAttributeEvent = new CustomEvent('appAttributeChange',{'detail':{key:e.key,value:e.value}});
            document.dispatchEvent(appAttributeEvent);
        });
      });
    }).error(function() { alert("error parsing rule JSON"); });
  };

  // get registed rules or plugins
  this.getRules = function() {
    return rules;
  };
  /**
     * Zip up a jacket.
     * @param {Jacket} jacket - The jacket to zip up.
     */
  // interface functions to external components and developers
  this.init = function (rulefile, ctx){
    console.log('===================init adaptation engine============');
    applicationContext = ctx || applicationContext;

    // get the id of myself
    local_agent_id = applicationContext.getAgents().self.agentid;

    // load adaptation behavior and rules from the JSON file
    loadJSONRules(rulefile);
  };

  // the interface to set and change the priority of a adaptation plug-in
  this.setPriority = function(pluginName, priority) {
      // TODO: change priority of plugins
  };

  // interface to register a callback function to listen to the decisions made by the adaptation engine
  this.on = function(what, handler) {
    if( what != "actionchange" ) {
      throw "incorrect callback" + what;
    }
    all_cbs.push(handler);
  };

  // interface to unregister the callback function that listens to the decisions made by the adaptation engine
  this.off = function(what, handler) {
    if (what != "actionchange") {
      throw "incorrect callback: " + what;
    }
    if (all_cbs.indexOf(handler) == -1) {
      throw "handler not registered";
    }
    all_cbs.splice(all_cbs.indexOf(handler), 1);
  };
  // Start point for shared context, must be start up at main app
  this.startApplicationContext = function (){
    var applicationID ="Mediascape";
    map = mediascape.mappingService({maxTimeout:8000});
    // Already exists a group
    if (mediascape.AdaptationToolkit.Utils.getUrlVar('group')) {
      this.GROUP_ID =mediascape.AdaptationToolkit.Utils.getUrlVar('group');
    }
    // there is not group, created
    else {
      this.GROUP_ID = "mediascape"+ mediascape.AdaptationToolkit.Utils.createGroupId();
    }
    var _this = this;
    map.getGroupMapping(_this.GROUP_ID).then(function (data1) {
       if (!applicationContext) {
        applicationContext = mediascape.applicationContext(data1.group,{
          autoClean: true,
        });

      }
      local_agent_id = applicationContext.getAgents().self.agentid;
      var evt = new CustomEvent("applicationContext-ready", { "detail": "application context ready" });
      document.dispatchEvent(evt);

    });

  }

  // Get connected agents to sharedContext
  this.getAgents = function (){
    return applicationContext.getAgents();

  }

  // Get sharedContext object
  this.getApplicationContext = function (){
    return applicationContext;
  }

  // Get local agentid
  this.getAgentId = function(){
    return local_agent_id;
  }

  // Get local context of the shared context
  this.getLocalContext = function (){
    return context;
  }
  // Notify locally that some context has been updated listener at "contextUpdate" event
  this.notifyUpdateContext = function(context,type,agentid){
    var evt = new CustomEvent("contextUpdate", { "detail": {"context":context,type:type,"agentid":agentid}});
    document.dispatchEvent(evt);
  }
  // Notify locally that some agent has connected/disconnected
  var notifiAgentChange = function (status,agentid){
    setTimeout(function (){
      var agent = getAgentById(agentid);
      var profile = agent != null ? agent.capabilities['platform']:"unknown";
      var evt = new CustomEvent("agentChange",
      { "detail": {"status":status,"agentid":agentid,profile:profile}});
      document.dispatchEvent(evt);
    },0);
  }

  // Change remote agent layout: name
  this.changeAgentlayout = function (agentId,layoutName){
    var agents = context.agents;
    var agent = agents.filter(function(ag){
      if (ag.id === agentId) return true;
      else return false;
    }) [0];
    if (agent){
      agent.agentContext.setItem('layoutEvent',layoutName);
    }
    else throw new Error('agent does not exits on remote layout change');
  }

  // Send some custom command to remote agent/ local agent
  this.setRemoteAgentComponentStatus = function (agentId,cmpId,cmd){
    var _this = this;
    var agents = context.agents;
    var cmps = [];
    if (agents.length === 0){
      throw new Error("no agent registered");
    }
    else {
      var agentChange = null;
      agents.forEach (function(ag){
        if (ag.id === agentId){
          cmps = ag.capabilities['componentsStatus'];
          for (c in cmps){
            if (cmps[c].compId === cmpId){
              agentChange = ag;
              cmps[c].customCmd.push(cmd);
              if (UIChangeEvents.indexOf(cmd)>-1){
                cmps.eventType="ui";
              }
              else {
                cmps.eventType ="data";
              }
            }
          }
        }
      });
    }
    if (agentChange!=null){

      if (mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgents()['self'].agentid === agentId)
      {
        var agent = getAgentById(agentId);
        mediascape.agentContext.setItem('componentsStatus',cmps);
        if (cmps.eventType!=="data")
            setTimeout(function(){
              onUpdateContext({type:"VALUE_CHANGE",agentid:agentId,diff:[{"property":"customCmd","newValue":cmd,compId:cmpId}]});
            },0);
        else
        setTimeout(function(){
          context.lastChange.diff = [{"property":"customCmd","newValue":cmd,compId:cmpId}];
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.notifyUpdateContext(context,"cmp_changed",agentId);
          console.log("DATA",  context);
        },0);


      }
      else {
        agentChange.agentContext.setItem('componentsStatus',cmps);

      }

    }
    else {
      console.warn("No change made it",agentId,cmpId,cmd);
    }
  }
  this.setAppAttribute= function(key,value){
      applicationContext.setItem(key,value);
  },
  this.setLayoutParameter = function(agentId,parameter){
        //onLayoutParameterChange
        var agent = getAgentById(agentId);
        if (agent.id === this.getAgentId()){
          var evt = new CustomEvent("onLayoutParameterChange", { "detail": parameter});
            document.dispatchEvent(evt);
        }else{
          agent.agentContext.setItem('layoutParameter',parameter);
        }
      /*  var evt = new CustomEvent("onLayoutParameterChange", { "detail": parameter});
        document.dispatchEvent(evt);*/
  }

};
multiDeviceAdaptation.__moduleName = "multiDeviceAdaptation";
return multiDeviceAdaptation;
});
