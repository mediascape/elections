/*
** Long Library Name:
**      Adaptation toolkit Module
**
** Acronym and its version:
**      Adaptation toolkit v1.0
**
** Copyright claim:
**      Copyright ( C ) 2013-2014 Vicomtech-IK4 ( http://www.vicomtech.org/ ),
**      all rights reserved.
**
** Authors (in alphabetical order):
**      Ana Dominguez <adominguez@vicomtech.org>
**      Iñigo Tamayo <itamayo@vicomteh.org>,
**      Mikel Zorrila <mzorrilla@vicomtech.org>,
**
** Description:
**      All UI Components helpers are defined in this file. Notification components, compònents Menu
**      etc.
**
** Development Environment:
**      The software has-been Implemented in JavaScript, and tested in Chrome and firefox
**      browsers.
**
** Dependencies:
**      As accounts package depends on other libraries, the user must adhere to and
**      keep in place any Licencing terms of those libraries:
**              requirejs v2.1.14 (http://requirejs.org/)
**
** Licenses dependencies:
**      License Agreement for requirejs:
**              BSD 3-Clause license (http://opensource.org/licenses/BSD-3-Clause)
**              MIT license (http://opensource.org/licenses/MIT)
**
*/

define(
  ["ui"
  ],
  function(){

    uiComponents = function uiComponents(atk,i,atk){

        this.componentsMenu = function (){
      //Console.log();
        }
        this.actionMenu = function (){
      //Console.log();
        }
        this.showComponentMenu = function(cmps){
          cmps.forEach(function(c){
              var div = document.createElement('div');
              div.style.zIndex=999;
              div.style.height="40px"
              div.style.width="100%";
              div.style.top ="0px";
              div.style.opacity="0.6"
              div.style.position="absolute";
              div.style.background="black";
              c.appendChild(div);
          });
        }
        //Initial loading panel
        this.loadingPanel = function (centralImg,time,cb){

           var div = document.createElement('div');
           div.id = "loadingPanel";
           div.style.position ="absolute";
           div.style.top="0px";
           div.style.left="0px";
           div.style.width="100%";
           div.style.height="100%";
           div.style.zIndex="10001";
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     div.style.background="black";

           var img = document.createElement('img');
           img.id="loaderimg";
           img.src=centralImg;
           img.style.position="absolute";
           img.style.top="25%";
           img.style.left="25%";
           img.style.width='50%';
           img.style.animationDelay="0s";
           div.appendChild(img);

           var loading=document.createElement('div');
           loading.id='floatingCirclesG';
           loading.style.top='40%';
           var loadingStyle=document.createElement('style');
           loadingStyle.innerHTML='#floatingCirclesG{ position:relative; width:125px; height:125px; margin:auto; transform:scale(0.6); -o-transform:scale(0.6);-ms-transform:scale(0.6); -webkit-transform:scale(0.6); -moz-transform:scale(0.6);} .f_circleG{ position:absolute; background-color:rgba(51, 204, 204, 0.1); height:22px; width:22px; border-radius:12px; -o-border-radius:12px; -ms-border-radius:12px; -webkit-border-radius:12px; -moz-border-radius:12px; animation-name:f_fadeG; -o-animation-name:f_fadeG; -ms-animation-name:f_fadeG; -webkit-animation-name:f_fadeG; -moz-animation-name:f_fadeG; animation-duration:1.2s; -o-animation-duration:1.2s; -ms-animation-duration:1.2s; -webkit-animation-duration:1.2s; -moz-animation-duration:1.2s; animation-iteration-count:infinite; -o-animation-iteration-count:infinite; -ms-animation-iteration-count:infinite; -webkit-animation-iteration-count:infinite; -moz-animation-iteration-count:infinite; animation-direction:normal; -o-animation-direction:normal; -ms-animation-direction:normal; -webkit-animation-direction:normal; -moz-animation-direction:normal;} #frotateG_01{left:0; top:51px; animation-delay:0.45s; -o-animation-delay:0.45s; -ms-animation-delay:0.45s; -webkit-animation-delay:0.45s;-moz-animation-delay:0.45s;}#frotateG_02{left:15px;top:15px;animation-delay:0.6s; -o-animation-delay:0.6s; -ms-animation-delay:0.6s; -webkit-animation-delay:0.6s;-moz-animation-delay:0.6s;}#frotateG_03{ left:51px;top:0;animation-delay:0.75s;-o-animation-delay:0.75s;-ms-animation-delay:0.75s; -webkit-animation-delay:0.75s; -moz-animation-delay:0.75s;} #frotateG_04{right:15px;top:15px;animation-delay:0.9s; -o-animation-delay:0.9s;  -ms-animation-delay:0.9s; -webkit-animation-delay:0.9s; -moz-animation-delay:0.9s;}#frotateG_05{right:0;top:51px; animation-delay:1.05s; -o-animation-delay:1.05s; -ms-animation-delay:1.05s; -webkit-animation-delay:1.05s; -moz-animation-delay:1.05s;}#frotateG_06{ right:15px; bottom:15px;  animation-delay:1.2s;    -o-animation-delay:1.2s;    -ms-animation-delay:1.2s;    -webkit-animation-delay:1.2s;    -moz-animation-delay:1.2s;}#frotateG_07{ left:51px;  bottom:0;  animation-delay:1.35s;    -o-animation-delay:1.35s;    -ms-animation-delay:1.35s;    -webkit-animation-delay:1.35s;    -moz-animation-delay:1.35s;}#frotateG_08{  left:15px;  bottom:15px;  animation-delay:1.5s;    -o-animation-delay:1.5s;    -ms-animation-delay:1.5s;    -webkit-animation-delay:1.5s;    -moz-animation-delay:1.5s;} @keyframes f_fadeG{  0%{    background-color:rgba(51, 204, 204, 1);  }  100%{    background-color:rgba(51, 204, 204, 0.3);  }}@-o-keyframes f_fadeG{  0%{    background-color:rgb(0,0,0);  }  100%{    background-color:rgb(255,255,255);  }}@-ms-keyframes f_fadeG{  0%{    background-color:rgb(0,0,0);  }  100%{    background-color:rgb(255,255,255);  }}@-webkit-keyframes f_fadeG{  0%{    background-color:rgb(0,0,0);  } 100%{  background-color:rgb(255,255,255);  }}@-moz-keyframes f_fadeG{  0%{    background-color:rgb(0,0,0);  }  100%{    background-color:rgb(255,255,255);  }}';
           for(var i=1;i<=8;i++){
             var circle=document.createElement('div');
             circle.id='frotateG_0'+i;
             circle.className='f_circleG';
             loading.appendChild(circle);
           }
           document.body.appendChild(loadingStyle);
           div.appendChild(loading);
           document.body.appendChild(div);


           document.addEventListener('motion-ready',function(e){ setTimeout(function(){document.body.removeChild(div);},1000);});
           setTimeout(function(){  document.body.removeChild(div);},time*1000);
       }

       this.prompt = function (config){
         var promptp = document.createElement('div');
         var title = document.createElement('div');
         title.innerHTML=config.question;
         title.style.textAlign="center";
         title.style.background="url(../resources/images/TitleBackground.png)";
         title.style.color = "white";
         promptp.style.width = "250px";
         var contentdiv = document.createElement('div');
         contentdiv.style.background ="url(../resources/images/PaneBackground.png)";
         if (config.type==="select"){
           var promptdiv = document.createElement('div');
           var sel = document.createElement('select');
           config.values.forEach(function(op){
              var op1 = document.createElement('option');
              op1.value=op;
              op1.innerHTML=op;
              sel.appendChild(op1);
           });
           var button = document.createElement('input');
           button.type="button";
           button.value=config.submit.buttonName;
           // TODO ABSTRACT PARAMETERS TO PASS
           button.onclick = function (){
               config.submit.action.call(this,config.submit.params[0],sel.value);
             }
           promptdiv.appendChild(sel);
           promptdiv.appendChild(button);
         }
         contentdiv.appendChild(promptdiv)
         contentdiv.style.color="white";
         contentdiv.style.padding="5px";
         promptp.style.position="absolute";
         promptp.style.top= "100px";
         promptp.style.left= "400px";
         promptp.style.zIndex="10000";
         promptp.appendChild(title);
         promptp.appendChild(contentdiv);
         document.body.appendChild(promptp);
         setTimeout(function(){
           document.body.removeChild(promptp);
         },6500);

       }
        //Panel used at the CustomGrid layout to resize the components
        this.customPanel = function(callback1,callback2,callback3){

          var customizePanel=document.createElement('div');
          customizePanel.style.width='220px';
          customizePanel.style.display='-webkit-flex';
          customizePanel.style.display='flex';
          customizePanel.style.flexDirection='row';
          customizePanel.id='customizePanel';

           var onoff=function(){
            currentvalue = document.getElementById('enableButton').value;
            if(currentvalue == "Off"){
              document.getElementById("enableButton").value="On";
              callback1.call();
              EnableButton.innerHTML='DISABLE';
              var resize=document.createElement('img');
              resize.src='../resources/images/disable.png';
              resize.style.height='20px';
              resize.style.width='20px';
              EnableButton.appendChild(resize);
            }else{
              document.getElementById("enableButton").value="Off";
              callback2.call();
              EnableButton.innerHTML='ENABLE ';
              var resize=document.createElement('img');
              resize.src='../resources/images/resize.png';
              resize.style.height='20px';
              resize.style.width='20px';
              EnableButton.appendChild(resize);
            }

          }

          var style = document.createElement('style');
          style.type = 'text/css';
          style.innerHTML = '.enableButton:hover{border-color: #666 #aaa #bbb #888;  border-width:4px 3px 3px 4px;background-image:radial-gradient(circle,#CCFFFF,#66CCFF);#CCFFFF;  color:#000;} ';
          document.getElementsByTagName('head')[0].appendChild(style);
          var EnableButton=document.createElement('div');
          EnableButton.id='enableButton';
          EnableButton.className='EnableButton';
          EnableButton.value='Off';
          EnableButton.innerHTML='ENABLE ';
          EnableButton.onclick=onoff;

          EnableButton.style.transition='opacity .1s cubic-bezier(0.4, 0.0, 1, 1), color .1s cubic-bezier(0.4, 0.0, 1, 1)';
          EnableButton.style.height='100%';
          EnableButton.style.margin='0 12px';
          EnableButton.style.width='110px';
          EnableButton.style.textAlign='center';
          EnableButton.style.cursor='pointer';
          EnableButton.style.lineHeight='24px';
          var resize=document.createElement('img');
          resize.src='../resources/images/resize.png';
          resize.style.height='20px';
          resize.style.width='20px';
          EnableButton.appendChild(resize);

          customizePanel.appendChild(EnableButton);



          var register=function(){
            callback3.call();
            EnableButton.value='Off';
            EnableButton.innerHTML='ENABLE ';
            var resize=document.createElement('img');
            resize.src='../resources/images/resize.png';
            resize.style.height='20px';
            resize.style.width='20px';
            EnableButton.appendChild(resize);
          }

          var SaveButton=document.createElement('div');
          //DisableButton.id='disableButton';
          SaveButton.innerHTML='REGISTER';
          SaveButton.onclick=register;
          SaveButton.className='enableButton';
          SaveButton.style.transition='opacity .1s cubic-bezier(0.4, 0.0, 1, 1), color .1s cubic-bezier(0.4, 0.0, 1, 1)';
          SaveButton.style.height='100%';
          SaveButton.style.margin='0 12px';
          SaveButton.style.width='110px';
          SaveButton.style.textAlign='center';
          SaveButton.style.cursor='pointer';
          SaveButton.style.lineHeight='24px';
          var save=document.createElement('img');
          save.src='../resources/images/save.png';
          save.style.height='20px';
          save.style.width='20px';
          SaveButton.appendChild(save);

          customizePanel.appendChild(SaveButton);

          customizePanel.style.position="absolute";
          customizePanel.style.top=0;
          customizePanel.style.right=20;
          customizePanel.style.height='48px';
          customizePanel.style.zIndex="999";
          customizePanel.style.boxShadow='0px 3px 2px rgba(0, 0, 0, 0.2)';
          customizePanel.style.fontFamily='RobotoDraft, "Helvetica Neue", Helvetica, Arial';
          customizePanel.style.backgroundColor='#66CCFF';
          customizePanel.style.color='#fff';
          document.body.appendChild(customizePanel);

          customizePanel.style.display='none';



        }
        //Notifications (left-up side of the screen)
        this.infoPanel = function (_title,content,width,x,y){
            var infopanel = document.createElement('div');
            var title = document.createElement('div');
            title.innerHTML=_title;
            title.style.textAlign="center";
            title.style.background="url(../resources/images/TitleBackground.png)";
            title.style.color = "white";
            infopanel.style.width = width;
            var contentdiv = document.createElement('div');
            contentdiv.style.background ="url(../resources/images/PaneBackground.png)";
            contentdiv.innerHTML=content;
            contentdiv.style.color="white";
            contentdiv.style.padding="5px";
            infopanel.style.position="absolute";
            infopanel.style.top=y;
            infopanel.style.left=x;
            infopanel.style.zIndex="999";
            infopanel.appendChild(title);
            infopanel.appendChild(contentdiv);
            document.body.appendChild(infopanel);
            setTimeout(function(){
              document.body.removeChild(infopanel);
            },6500);
        }
        //Notifications (right-down side of the screen)
        this.notification=function(_title,message,time){
            var panel = document.createElement('div');
            var title = document.createElement('div');

            var icon=document.createElement('img');
            icon.src='../resources/images/notification.png';
            icon.style.width='12%';
            icon.style.height='3%';
            icon.style.position='relative';
            icon.style.cssFloat="left";

            title.appendChild(icon);
            title.innerHTML=title.innerHTML+"<span>"+_title+"</span>";
            title.style.textAlign="center";
            title.style.background="url(../resources/images/TitleBackground.png)";
            title.style.color = "white";
            panel.style.width = '200px';
            panel.className="animated flipInX";
            var contentdiv = document.createElement('div');
            contentdiv.style.background ="url(../resources/images/PaneBackground.png)";
            contentdiv.innerHTML=message;
            contentdiv.style.color="white";
            contentdiv.style.padding="5px";
            panel.style.position="absolute";
            panel.style.bottom='5%';
            panel.style.right='5%';
            panel.style.zIndex="99999";
            panel.appendChild(title);
            panel.appendChild(contentdiv);
            document.body.appendChild(panel);
            setTimeout(function(){
              document.body.removeChild(panel);
            },time);
        }
        //Panel to move a component from one agent to another
        this.addMovablePanel = function (cmp){

          var panel = document.createElement('div');
          var title = document.createElement('div');

          var icon=document.createElement('img');
          var icondiv =document.createElement('span');
          //icondiv.style.position="relative";
          var timer = 0;

          if (mediascape.agentContext.capabilities()['touchScreen'] === "supported"){
            cmp.addEventListener('touchend',function(event){
                /** chrome beta sends touchend instead of mouseup **/
                var mouseupEvent = document.createEvent ('MouseEvents');
                mouseupEvent.initEvent ('mouseup', true, true);
                cmp.dispatchEvent(mouseupEvent);
                console.log('mouseup');
            },false);

          cmp.addEventListener('holdpulse',function(event){
              console.log("HOLDPULSE");

              if (event.holdTime>1600){
              var agents = mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgents();
              var panel = document.createElement('div');
              panel.style.backgroundColor="white";
              panel.style.opacity="0.85";
              panel.style.color="grey";
              panel.style.top=cmp.offsetTop;
              panel.style.left=cmp.offsetLeft;
              panel.style.width=cmp.clientWidth;
              panel.style.height=cmp.clientHeight;
              panel.style.zIndex="1001";
              panel.style.position="absolute";
              panel.id="movablediv";
              var p = document.createElement('p');
              p.innerHTML = 'Move to: close';
              p.style.background="grey";
              p.style.color="white";
              p.style.marginTop="20%";
              p.style.marginLeft="20%";
              p.style.marginRight="20%";
              p.style.fontSize="120%";
              p.addEventListener('tap',function(e){document.body.removeChild(panel);})
              panel.appendChild(p);

              for (ag in agents ){
                  var p = document.createElement('p');
                  p.id = ag.agentid;
                  if (Object.keys(agents).length ===1){
                    p.innerHTML ='no target';
                    p.style.padding="10px";
                    p.style.color='black';
                    p.style.marginLeft="20%";
                    p.style.testAlign="center";
                  }else{
                    if (agents[ag].agentid !=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgentId())
                      {
                        p.innerHTML ='client:'+agents[ag].agentid ;
                        p.style.padding="10px";
                        p.style.marginLeft="20%";
                        p.style.cursor="pointer";
                        p.style.opacity="1.0";
                        p.addEventListener('click',function(e){
                          //e.preventDefault();
                          //e.stopPropagation();
                          var agenttomoveid =e.srcElement.id;
                          console.log(agenttomoveid);
                          document.body.removeChild(panel);
                          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setComponentToAgent(agenttomoveid,cmp);
                        },false);
                      }
                  }
                  panel.appendChild(p);
              };
              document.body.appendChild(panel);
              setTimeout(function(){ document.body.removeChild(panel);},3500);
            }
            return true;
        },false);
      }
      else {

          cmp.addEventListener('holdpulse',function(e){


             // e.stopPropagation();
             if (event.holdTime>2000){
              timer=0;
              var agents = mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgents();
              var panel = document.createElement('div');
              panel.style.backgroundColor="white";
              panel.style.opacity="0.85";
              panel.style.color="grey";
              panel.style.top=cmp.offsetTop;
              panel.style.left=cmp.offsetLeft;
              panel.style.width=cmp.clientWidth;
              panel.style.height=cmp.clientHeight;
              panel.style.zIndex="1001";
              panel.style.position="absolute";
              var p = document.createElement('p');
              p.innerHTML = 'Move to: ';
              p.style.background="grey";
              p.style.color="white";
              p.style.marginTop="20%";
              p.style.marginLeft="20%";
              p.style.marginRight="20%";
              p.style.fontSize="120%";
              panel.appendChild(p);
              for (ag in agents ){
                  var p = document.createElement('p');
                  p.id = ag.agentid;
                  if (Object.keys(agents).length ===1){
                    p.innerHTML ='no target';
                    p.style.padding="10px";
                    p.style.color='black';
                    p.style.marginLeft="20%";
                    p.style.testAlign="center";
                  }else{
                    if (agents[ag].agentid !=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgentId())
                      {
                        p.innerHTML ='client:'+agents[ag].agentid ;
                        p.style.padding="10px";
                        p.style.marginLeft="20%";
                        p.style.cursor="pointer";
                        p.style.opacity="1.0";
                        p.addEventListener('click',function(e){
                          //e.preventDefault();
                          //e.stopPropagation();
                          var agenttomoveid =e.srcElement.id;
                          console.log(agenttomoveid);
                          document.body.removeChild(panel);
                          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setComponentToAgent(agenttomoveid,cmp);

                        },false);
                      }
                  }
                  panel.appendChild(p);
              };
              document.body.appendChild(panel);
              setTimeout(function(){ document.body.removeChild(panel);},3500);
            }
        },true);
      }// NOT TOUCHABLE

      }
      this.resizable = function (cmp){

            $('div').resizable();
      }

      //This panel includes the qr code for association, the component manager and the layout change
      this.addAssociationPanel = function (url){
          var associationPanel = document.createElement('span');

          associationPanel.id ="associationPanel";

          associationPanel.style.width='0';
          associationPanel.style.height='0';

          associationPanel.style.borderRight='300px solid transparent';
          associationPanel.style.borderTop='100px solid';

          var colors=['rgba(0,48,64,0.8)','rgba(255,0,0,0.8)','rgba(0,128,0,0.8)','rgba(255,255,0,0.8)','rgba(139,0,139,0.8)','rgba(210,105,30,0.8)'];

          associationPanel.style.position="absolute";
          associationPanel.style.top="0px";
          associationPanel.style.left="0px";
          associationPanel.style.zIndex="9999";
          associationPanel.style.transition="width 0.5s,height 0.5s";
          var arrowPanel = document.createElement('img');
          arrowPanel.style.position="fixed";
          arrowPanel.src="../resources/images/logo.png";
          arrowPanel.style.top="5";
          arrowPanel.style.marginLeft="10px";
          arrowPanel.width="70";
          arrowPanel.height="70";
          var arrowoffPanel = document.createElement('img');
          arrowoffPanel.style.position="fixed";
          arrowoffPanel.src="../resources/images/arrowoff.png";
          arrowoffPanel.style.marginTop="30%";
          arrowoffPanel.style.marginLeft="4px";
          arrowoffPanel.width="30";
          arrowoffPanel.height="30";
          arrowoffPanel.style.display="none";

          //ContextUpdate for detecting the agent connection/disconnection
          document.addEventListener('contextUpdate',function(){
                console.log(event,"context update");
                event.stopPropagation();
                agents=event.detail.context.agents;

                var ag=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgents();
                for( var i=0;i<agents.length;i++){
                  if(ag.self.agentid===agents[i].id){

                      associationPanel.style.borderTopColor=colors[agents[i]._id];

                  }
                }

                var viewing=false;
                if(associationPanel.querySelector('#smallTable')){
                  if(associationPanel.querySelector('#smallTable').style.display==='block'){
                    viewing=true;
                  }
                  else{
                    viewing=false;
                  }
                  associationPanel.removeChild(associationPanel.querySelector('#smallTable'));

                }

                drawTable(agents);
                if(viewing===true){
                  associationPanel.querySelector('#smallTable').style.display='block';
                }

          });
  //The component manager table is updated here
  var drawTable=function(agents){

    var container=document.createElement('div');
    container.id='smallTable';
    container.style.overflow='auto';


      container.style.width='90%';
      //container.style.height='90%';
      //container.style.display='block';
      container.style.marginLeft='5%';
      container.style.marginTop='5%';
      container.style.textAlign='center';
      container.style.backgroundColor='white';
      associationPanel.appendChild(container);

    var srcs=[];

    var cmps= mediascape.AdaptationToolkit.componentManager.core.getComponents().map(function(c){return c.getAttribute('id')});

    var cmps1=mediascape.AdaptationToolkit.componentManager.core.getComponents();
    for(var p=0;p<cmps1.length;p++){
      srcs.push(cmps1[p].lproperties.icon);
    }


    var scope=this;

    //component manager table
    var table=document.createElement('table');
    table.id='bigTable';
    table.style.display='block';
    container.appendChild(table);
    var thead=document.createElement('thead');
    var trhead=document.createElement('tr');

    var component=document.createElement('th');
    component.innerHTML='COMPONENT';
    trhead.appendChild(component);
    var colors=['rgba(0,48,64,0.8)','rgba(255,0,0,0.8)','rgba(0,128,0,0.8)','rgba(255,255,0,0.8)','rgba(139,0,139,0.8)','rgba(210,105,30,0.8)'];
    for(var k=0;k<agents.length;k++){
      var dev=document.createElement('th');
      var deviceImg=document.createElement('img');
      deviceImg.src='resources/images/icons_manag/device.png';
      (function(dImage,agent,dev){

              if (agent.capabilities['platform'].deviceType==="Desktop") dImage.src = 'resources/images/icons_manag/pc.png';
              if (agent.capabilities['platform'].deviceType==="TV") dImage.src = 'resources/images/icons_manag/tv.png';
              if (agent.capabilities['platform'].deviceType==="Mobile") dImage.src = 'resources/images/icons_manag/mobile.png';
              if (agent.capabilities['platform'].deviceType==="Tablet") dImage.src = 'resources/images/icons_manag/tablet.png';
              console.log("fiability",agent.capabilities['platform'].fiability);
              if (agent.capabilities['platform'].fiability>0.5 && agent.capabilities['platform'].fiability<=0.7){

                    var warning = document.createElement('img');
                    warning.src="resources/images/warning.png";
                    warning.style.width="30px";
                    warning.style.height="30px";
                    warning.addEventListener('click',(function(){
                          return function(){
                            mediascape.AdaptationToolkit.uiComponents.prompt(
                            {question:"What type is it?",type:"select",values:["Mobile","TV","Tablet","Desktop"],
                              submit:{buttonName:"Learn",action:mediascape.DeviceProfile.learn,
                              params:[agent.capabilities['platform'].userAgent,"#select"]}});
                            }
                            }
                            )()
                            );

                    dev.appendChild(warning);
              }
              else if (agent.capabilities['platform'].fiability<0.5){
                  dImage.src="resources/images/icons_manag/unknown.png"
                  var warning = document.createElement('img');
                  warning.src="resources/images/warning.png";
                  warning.style.width="30px";
                  warning.style.height="30px";
                  warning.addEventListener('click',(function(){
                        return function(){
                          mediascape.AdaptationToolkit.uiComponents.prompt(
                          {question:"What type is it?",type:"select",values:["Mobile","TV","Tablet","Desktop"],
                            submit:{buttonName:"Learn",action:mediascape.DeviceProfile.learn,
                            params:[agent.capabilities['platform'].userAgent,"#select"]}});
                          }
                          }
                          )()
                          );

                  dev.appendChild(warning);
              }

      })(deviceImg,agents[k],dev);
      deviceImg.style.width='50px';/*'calc('+associationPanel.querySelector('#smallTable').style.width+'/10)';*/
      dev.style.backgroundColor=colors[agents[k]._id];
      dev.appendChild(deviceImg);
      trhead.appendChild(dev);
    }

    thead.appendChild(trhead);
    table.appendChild(thead);
    if(document.querySelector('#tableStyle')){
      associationPanel.removeChild(document.querySelector('#tableStyle'));
    }
    var tableStyle=document.createElement('style');
    tableStyle.id='tableStyle';
    tableStyle.innerHTML='#bigTable table {border-collapse: collapse; margin-bottom: 3em; width: 100%; background: #fff;} #bigTable td {padding: 0.1em 1em;text-align:center;} #bigTable th {background-color: #4682B4;font-weight: bold; color: #fff;} #bigTable tbody th { background-color: #708EE8;}#bigTable tbody tr:nth-child(2n-1) {background-color: #f5f5f5;transition: all .125s ease-in-out;} #bigTable tbody td:hover {background-color: rgba(129,208,177,.3);} #bigTable tbody td img:hover {background-color: rgba(129,208,177,.3);}';
    table.style.marginLeft='auto';
    table.style.width='100%';
    table.style.fontFamily="RobotoDraft, 'Helvetica Neue', Helvetica, Aria";
    associationPanel.appendChild(tableStyle);

    var tbody=document.createElement('tbody');

    for(var i=0;i<srcs.length;i++){

        var tr=document.createElement('tr');




        var th1=document.createElement('th');
        var compImg=document.createElement('img');
        compImg.src=srcs[i];
        compImg.style.width='50px';/*'calc('+associationPanel.querySelector('#smallTable').style.width+'/6)';*/
        th1.appendChild(compImg);
        tr.appendChild(th1);
        for(var j=0;j<agents.length;j++){
          var th2=document.createElement('td');

          //In case the component is a video, a sound/mute buton has to be added
          if(document.querySelector('#'+cmps[i]).tagName==='X-MEDIA'){
            var th3=document.createElement('span');
            th3.style.padding='0 2em 0 2em';
            var viewImg=document.createElement('img');
            if(agents[j].capabilities.componentsStatus[document.querySelector('#'+cmps[i]).getAttribute('compId').split('compId')[1]].show===true){
              viewImg.src="resources/images/icons_manag/eye.png";
            }
            else{
              viewImg.src="resources/images/icons_manag/eye_closed.png";
            }
            viewImg.id=cmps[i]+"viewImgSmall"+agents[j].id;
            viewImg.style.width='40px';/*'calc('+associationPanel.querySelector('#smallTable').style.width+'/10)';*/
            !function outer(j){
            viewImg.addEventListener("click",function(e){

              if(agents[j].capabilities.componentsStatus[document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).getAttribute('compId').split('compId')[1]].show===true){

                /*var repeated=false;
                for(var l=0;l<agents.length;l++){
                  if(agents[l].id!==agents[j].id){
                    if(agents[l].capabilities.componentsStatus[document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).getAttribute('compId').split('compId')[1]].show===true){
                        repeated=true;
                    }
                  }
                }

                if(document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).lproperties.required==='true' && repeated===false){
                  alert('This component is REQUIRED: IMPOSIBLE TO REMOVE it without adding it to other agent');
                }
                else{*/


                e.srcElement.src='resources/images/icons_manag/eye_closed.png';

                associationPanel.querySelector('#bigTable').querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]+'soundImgSmall'+agents[j].id).src='';

                mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agents[j].id,document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).getAttribute('compId'),'hide');
              //}




              }
              else{
                /*if(document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).lproperties.duplicable==='false'){
                  alert('This component is NOT DUPLICABLE: it will disappear from the other agent');
                }*/

                document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).style.display='block';

                e.srcElement.src='resources/images/icons_manag/eye.png';
                if(document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).lproperties.duplicable==='false'){
                  agents.forEach(function(ag){
                    if(ag.capabilities.componentsStatus[document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).getAttribute('compId').split('compId')[1]].show === true)

                      if(ag.id === mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgentId())
                          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(ag.id,document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).getAttribute('compId'),'hide');
                      else if (ag.id!== agents[j]){
                          ediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(ag.id,document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).getAttribute('compId'),'hide');

                           }
                    });
                }
                setTimeout(function(){mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agents[j].id,document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).getAttribute('compId'),'show');},0);


                if(agents[j].capabilities.componentsStatus[document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).getAttribute('compId').split('compId')[1]].customCmd.lastIndexOf('mutePlayer')>agents[j].capabilities.componentsStatus[document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).getAttribute('compId').split('compId')[1]].customCmd.lastIndexOf('soundPlayer')){
                  associationPanel.querySelector('#bigTable').querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]+'soundImgSmall'+agents[j].id).src="resources/images/icons_manag/mute.png";
                }
                else{
                  associationPanel.querySelector('#bigTable').querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]+'soundImgSmall'+agents[j].id).src="resources/images/icons_manag/sound.png";
                }



              }
              e.srcElement.style.width='40px';/*'calc('+associationPanel.querySelector('#smallTable').style.width+'/10)';*/
            });

            }(j);

            th3.appendChild(viewImg);
            th2.appendChild(th3);
            var th4=document.createElement('span');
            th4.style.padding='0 2em 0 2em';
            var soundImg=document.createElement('img');

            if(agents[j].capabilities.componentsStatus[document.querySelector('#'+cmps[i]).getAttribute('compId').split('compId')[1]].show===true){
            if(agents[j].capabilities.componentsStatus[document.querySelector('#'+cmps[i]).getAttribute('compId').split('compId')[1]].customCmd.lastIndexOf('mutePlayer')===-1 && agents[j].capabilities.componentsStatus[document.querySelector('#'+cmps[i]).getAttribute('compId').split('compId')[1]].customCmd.lastIndexOf('soundPlayer')===-1){
              if(document.querySelector('#'+cmps[i]).ismuted==='false'){
                soundImg.src="resources/images/icons_manag/sound.png";
              }
              else{
                soundImg.src="resources/images/icons_manag/mute.png";
              }
            }
            else{
            if(agents[j].capabilities.componentsStatus[document.querySelector('#'+cmps[i]).getAttribute('compId').split('compId')[1]].customCmd.lastIndexOf('mutePlayer')>agents[j].capabilities.componentsStatus[document.querySelector('#'+cmps[i]).getAttribute('compId').split('compId')[1]].customCmd.lastIndexOf('soundPlayer')){
              soundImg.src="resources/images/icons_manag/mute.png";
            }
            else{
              soundImg.src="resources/images/icons_manag/sound.png";
            }
          }
            }
            soundImg.id=cmps[i]+"soundImgSmall"+agents[j].id;
            var volume=1;
            !function outer(j){
            soundImg.addEventListener("click",function(e){


              if(agents[j].capabilities.componentsStatus[document.querySelector('#'+e.srcElement.id.split('soundImgSmall')[0]).getAttribute('compId').split('compId')[1]].customCmd.lastIndexOf('mutePlayer')
                <agents[j].capabilities.componentsStatus[document.querySelector('#'+e.srcElement.id.split('soundImgSmall')[0]).getAttribute('compId').split('compId')[1]].customCmd.lastIndexOf('soundPlayer')){

                mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agents[j].id,document.querySelector('#'+e.srcElement.id.split('soundImgSmall')[0]).getAttribute('compId'),'mutePlayer');
                e.srcElement.src='resources/images/icons_manag/mute.png';

                volume=0;

              }
              else{

                mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agents[j].id,document.querySelector('#'+e.srcElement.id.split('soundImgSmall')[0]).getAttribute('compId'),'soundPlayer');
                e.srcElement.src='resources/images/icons_manag/sound.png';

                volume=1;
              }
            },false);
            }(j);
            soundImg.style.width='40px';/*'calc('+associationPanel.querySelector('#smallTable').style.width+'/10)';*/
            th4.appendChild(soundImg);
            th2.appendChild(th4);
          }
          //If not a video, sound/mute is not necessary
          else{
            var viewImg=document.createElement('img');

            if(agents[j].capabilities.componentsStatus[document.querySelector('#'+cmps[i]).getAttribute('compId').split('compId')[1]].show===true){
              viewImg.src="resources/images/icons_manag/eye.png";
            }
            else{
              viewImg.src="resources/images/icons_manag/eye_closed.png";
            }
            viewImg.id=cmps[i]+"viewImgSmall"+agents[j].id;
            viewImg.style.width='40px';/*'calc('+associationPanel.querySelector('#smallTable').style.width+'/10)';*/
            !function outer(j){
            viewImg.addEventListener("click",function(e){
              if(agents[j].capabilities.componentsStatus[document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).getAttribute('compId').split('compId')[1]].show===true){
                /*var repeated=false;
                for(var l=0;l<agents.length;l++){
                  if(agents[l].id!==agents[j].id){
                    if(agents[l].capabilities.componentsStatus[document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).getAttribute('compId').split('compId')[1]].show===true){
                        repeated=true;
                    }
                  }
                }

                if(document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).lproperties.required==='true' && repeated===false){
                  alert('This component is REQUIRED: IMPOSIBLE TO REMOVE it without adding it to other agent');
                }
                else{*/

                e.srcElement.src='resources/images/icons_manag/eye_closed.png';

                mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agents[j].id,document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).getAttribute('compId'),'hide');
              //}
              }
              else{

                if(document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).lproperties.duplicable==='false'){
                  //alert('This component is NOT DUPLICABLE: it will disappear from the other agent');
                  agents.forEach(function(ag){
                    if(ag.capabilities.componentsStatus[document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).getAttribute('compId').split('compId')[1]].show === true)


                      if(ag.id === mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgentId())
                          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(ag.id,document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).getAttribute('compId'),'hide');
                      else if (ag.id!== agents[j]){
                          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(ag.id,document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).getAttribute('compId'),'hide');

                           }
                    });
                }

                setTimeout(function(){mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agents[j].id,document.querySelector('#'+e.srcElement.id.split('viewImgSmall')[0]).getAttribute('compId'),'show');},0);
                e.srcElement.src='resources/images/icons_manag/eye.png';
              }
            });
            }(j);
            th2.appendChild(viewImg);

          }
          tr.appendChild(th2);
          }




        tbody.appendChild(tr);

        table.appendChild(tbody);








      container.appendChild(table);

    }


      container.style.display='none';
    }




          arrowPanel.onclick = showControlPanel;
          arrowoffPanel.onclick = hideControlPanel;
          document.addEventListener('keydown',function(e){

             if (e.keyCode === 17 ){
                if ( arrowoffPanel.style.display!=="block") showControlPanel();
                else hideControlPanel();
              }
          });
          function showControlPanel (){
            var width=window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
            associationPanel.style.height=window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;
            associationPanel.style.width=width;
            associationPanel.style.backgroundColor=associationPanel.style.borderTopColor;
            associationPanel.style.borderRight='';
            associationPanel.style.borderTop='';





            arrowPanel.style.display="none";
             var callback = function(e){
              arrowoffPanel.style.display="block";

              //fucntion selector menu
              var menu=document.createElement('div');
              menu.style.display='flex';
              menu.id='panelMenu';
              menu.style.width=width;
              menu.style.height='12%';
              menu.style.fontFamily='Nunito, arial, verdana';
              menu.style.color='#fff';
              menu.style.backgroundColor='#909090 ';


              //Association
              var devAssociation=document.createElement('div');
              devAssociation.id='devAssociation';

              var devAssociationImg=document.createElement('img');
              devAssociationImg.src='../resources/images/association.png';
              devAssociationImg.style.width='20%';
              devAssociation.appendChild(devAssociationImg);

              devAssociation.style.width=(width-20)/3;
              devAssociation.style.position='relative';
              devAssociation.style.left='2px;'
              devAssociation.style.height='96%';
              devAssociation.style.top='2%';
              devAssociation.style.backgroundColor='#222930';
              devAssociation.style.textAlign='center';

              devAssociation.addEventListener('click',function(){
                    if(associationPanel.querySelectorAll('#code').length===1){
                      associationPanel.querySelector('#code').style.display="block";
                    }
                    if (associationPanel.querySelectorAll('#code').length===0)
                      mediascape.association.createQRcode(url,associationPanel,(30*width/100),(30*width/100),'',(35*width/100),50);

                    table.style.display='none';
                    associationPanel.querySelector('#smallTable').style.display='none';
                    devAssociation.style.backgroundColor='#778899';
                    cmpManager.style.backgroundColor='#222930';
                    layouts.style.backgroundColor='#222930';
              });

              menu.appendChild(devAssociation);

              //Component manager
              var cmpManager=document.createElement('div');
              cmpManager.id='cmpManager';
              var cmpManagerImg=document.createElement('img');
              cmpManagerImg.src='../resources/images/cmpmanager.png';
              cmpManagerImg.style.width='20%';
              cmpManager.appendChild(cmpManagerImg);
              cmpManager.style.width=(width-20)/3;
              cmpManager.style.position='relative';
              cmpManager.style.height='96%';
              cmpManager.style.marginLeft='2px';
              cmpManager.style.backgroundColor='#222930';
              cmpManager.style.top='2%';
              cmpManager.style.textAlign='center';

              cmpManager.addEventListener('click',function(){

                    if(associationPanel.querySelector('#code')){
                      associationPanel.querySelector('#code').style.display="none";
                    }
                    associationPanel.querySelector('#smallTable').style.display='block';
                    table.style.display='none';
                    devAssociation.style.backgroundColor='#222930';
                    cmpManager.style.backgroundColor='#778899';
                    layouts.style.backgroundColor='#222930';

              });
              menu.appendChild(cmpManager);

              //Layout change
              var layouts=document.createElement('div');
              layouts.id='layouts';
              var layoutsImg=document.createElement('img');
              layoutsImg.src='../resources/images/layout.png';
              layoutsImg.style.width='20%';
              layouts.appendChild(layoutsImg);

              layouts.style.width=(width-20)/3;
              layouts.style.position='relative';
              layouts.style.height='96%';
              layouts.style.marginLeft='2px';
              layouts.style.top='2%';
              layouts.style.backgroundColor='#222930';
              layouts.style.textAlign='center';




              var table=document.createElement('table');
              table.id='layoutsTable';
              var tr1=document.createElement('tr');
              var td1=document.createElement('td');
              var img1=document.createElement('img');
              img1.src='../resources/images/grid.png';
              img1.style.width='50%';
              td1.style.paddingBottom='10px';

              img1.addEventListener('click',function(e){

                  mediascape.AdaptationToolkit.Adaptation.UIAdaptation.useLayout('customGrid');
                  //mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.changeAgentlayout('525387853','customGrid');
                  hideControlPanel();
              });


              td1.appendChild(img1);
              tr1.appendChild(td1);


              var td2=document.createElement('td');
              var img2=document.createElement('img');
              img2.src='../resources/images/accordion.png';
              img2.style.width='50%';
              td2.appendChild(img2);
              td2.style.paddingBottom='10px';
              img2.addEventListener('click',function(e){
                  mediascape.AdaptationToolkit.Adaptation.UIAdaptation.useLayout('accordion');
                  hideControlPanel();
              });
              tr1.appendChild(td2);
              table.appendChild(tr1);

              var tr2=document.createElement('tr');
              var td3=document.createElement('td');
              var img3=document.createElement('img');
              img3.style.width='50%';
              img3.src='../resources/images/pip.png';
              td3.style.paddingBottom='10px';
              img3.addEventListener('click',function(e){
                  mediascape.AdaptationToolkit.Adaptation.UIAdaptation.useLayout('pip');
                  hideControlPanel();
              });
              td3.appendChild(img3);
              tr2.appendChild(td3);

              var td4=document.createElement('td');
              var img4=document.createElement('img');
              img4.src='../resources/images/spinner.png';
              img4.style.width='50%';
              td4.appendChild(img4);
              td4.style.paddingBottom='10px';
              img4.addEventListener('click',function(e){
                  mediascape.AdaptationToolkit.Adaptation.UIAdaptation.useLayout('spinner');
                  hideControlPanel();
              });
              tr2.appendChild(td4);
              table.appendChild(tr2);
              /*
              var tr3=document.createElement('tr');
              var td5=document.createElement('td');
              var img5=document.createElement('img');
              img5.style.width='50%';
              img5.src='../resources/images/accordion.png';
              td5.style.paddingBottom='10px';
              Polymer.addEventListener(img5,'tap',function(e){
                  mediascape.AdaptationToolkit.Adaptation.UIAdaptation.useLayout('accordion');
                  hideControlPanel();
              });
              td5.appendChild(img5);
              tr3.appendChild(td5);

              var td6=document.createElement('td');
              var img6=document.createElement('img');
              img6.src='../resources/images/spinner.png';
              img6.style.width='50%';
              td6.appendChild(img6);
              td6.style.paddingBottom='10px';
              Polymer.addEventListener(img6,'tap',function(e){
                  mediascape.AdaptationToolkit.Adaptation.UIAdaptation.useLayout('spinner');
                  hideControlPanel();
              });
              tr3.appendChild(td6);
              table.appendChild(tr3);

              var tr4=document.createElement('tr');
              var td7=document.createElement('td');
              var img7=document.createElement('img');
              img7.src='../resources/images/verticalMenu.png';
              img7.style.width='50%';
              td7.style.paddingBottom='10px';
              Polymer.addEventListener(img7,'tap',function(e){
                  mediascape.AdaptationToolkit.Adaptation.UIAdaptation.useLayout('verticalMenu');
                  hideControlPanel();
              });
              td7.appendChild(img7);
              tr4.appendChild(td7);

              var td8=document.createElement('td');
              var img8=document.createElement('img');
              img8.src='../resources/images/scrollHorizontal.png';
              img8.style.width='50%';
              td8.appendChild(img8);
              td8.style.paddingBottom='10px';
              Polymer.addEventListener(img8,'tap',function(e){
                  mediascape.AdaptationToolkit.Adaptation.UIAdaptation.useLayout('scrollHorizontal');
                  hideControlPanel();
              });
              tr4.appendChild(td8);
              table.appendChild(tr4);
              */

              table.style.display='none';
              table.style.width='70%';
              table.style.marginLeft='15%';
              table.style.textAlign='center';
              table.style.marginTop='70px';

              layouts.addEventListener('click',function(){
                  table.style.display='block';
                  if(associationPanel.querySelector('#code')){
                    associationPanel.removeChild(associationPanel.querySelector('#code'));
                  }
                  associationPanel.querySelector('#smallTable').style.display='none';

                  devAssociation.style.backgroundColor='#222930';
                  cmpManager.style.backgroundColor='#222930';
                  layouts.style.backgroundColor='#778899';
              });


              menu.appendChild(layouts);


              associationPanel.insertBefore(menu,associationPanel.querySelector('#smallTable'));
              associationPanel.appendChild(table);

              /*if (!associationPanel.querySelector('div')){
                mediascape.association.createQRcode(url,associationPanel,(30*width/100),(30*width/100),'',(35*width/100),50);
                associationPanel.removeEventListener('webkitTransitionEnd',callback,false);
              }*/

              mediascape.association.createQRcode(url,associationPanel,(30*width/100),(30*width/100),'',(35*width/100),50);
              devAssociation.style.backgroundColor='#778899';
              associationPanel.removeEventListener('webkitTransitionEnd',callback,false);

            }
            var transitionFinished=associationPanel.addEventListener('webkitTransitionEnd', callback);



          }
          //close the panel
          function hideControlPanel (){


            associationPanel.style.borderRight='300px solid transparent';
            associationPanel.style.borderTop='100px solid '+associationPanel.style.backgroundColor;
            associationPanel.style.width='0px';
            associationPanel.style.height='0px';
            associationPanel.style.transition="width 0.5s,height 0.5s";
            associationPanel.style.backgroundColor='';
            arrowPanel.style.display="block";
            arrowoffPanel.style.display="none";
            if(associationPanel.querySelector('#code')){
              associationPanel.removeChild(associationPanel.querySelector('#code'));
            }
            associationPanel.removeChild(associationPanel.querySelector('#panelMenu'));
            associationPanel.removeChild(associationPanel.querySelector('#layoutsTable'));
            associationPanel.querySelector('#smallTable').style.display='none';

          }

          associationPanel.appendChild(arrowPanel);
          associationPanel.appendChild(arrowoffPanel);
          document.body.appendChild(associationPanel);

      }
      this.addMenuToCmps=function(cmps,show){


            //var cmps=mediascape.AdaptationToolkit.componentManager.core.getComponents();
            if(show){
            cmps.forEach(function(cmp){
              if(cmp.querySelector('#menuBar'+cmp.id)){
                cmp.removeChild(cmp.querySelector('#menuBar'+cmp.id));
              }

                var menuBar=document.createElement('div');
                menuBar.id='menuBar'+cmp.id;
                menuBar.style.backgroundColor='black';
                menuBar.style.height='30px';
                menuBar.style.width='100%';
                menuBar.style.opacity='0.6';
                menuBar.style.position='relative';
                menuBar.style.marginTop='-30px';
                menuBar.style.zIndex=3;
                menuBar.style.display='none';
                var fullIcon=document.createElement('img');
                fullIcon.src='../resources/images/full-screen-icon.png';
                fullIcon.style.width='25px';
                fullIcon.style.marginTop='3px';
                fullIcon.id='fullIcon'+cmp.id;
                fullIcon.style.opacity='1';
                fullIcon.style.float='right';
                fullIcon.style.marginRight='15px';

                fullIcon.addEventListener('click',function(e){

                  document.querySelector('#'+e.srcElement.id.split('fullIcon')[1]).fire('componentToFullscreen');

                });

                menuBar.appendChild(fullIcon);
                cmp.appendChild(menuBar);

            });
            }
            else{
              cmps.forEach(function(cmp){
                if(cmp.querySelector('#menuBar'+cmp.id)){
                  cmp.removeChild(cmp.querySelector('#menuBar'+cmp.id));
                }
              });
            }


      }
      this.hideAssociationPanel = function (){
         try {
         var associationPanel_ = document.querySelector("#associationPanel");
         if (associationPanel_ && associationPanel_.querySelector('div')){
            var arrowPanel = associationPanel_.querySelectorAll('img')[0];
            var arrowoffPanel = associationPanel_.querySelectorAll('img')[1];
            arrowPanel.style.display="block";
            arrowoffPanel.style.display="none";

           // associationPanel_.removeChild(associationPanel_.querySelector('div'));
           if(associationPanel_.querySelector('#code')){
              associationPanel_.removeChild(associationPanel_.querySelector('#code'));
            }
            associationPanel_.removeChild(associationPanel_.querySelector('#panelMenu'));
            associationPanel_.removeChild(associationPanel_.querySelector('#layoutsTable'));
            associationPanel_.querySelector('#smallTable').style.display='none';
            //associationPanel_.querySelector('#bigTable').style.display='none';
            associationPanel_.style.borderRight='300px solid transparent';
            associationPanel_.style.borderTop='100px solid '+associationPanel.style.backgroundColor;
            associationPanel_.style.width='0';
            associationPanel_.style.height='0';
            associationPanel_.style.backgroundColor='';

          }
        }catch (e){console.log(e);}
      }
      this.toggleFullScreen = function () {
        if (!document.fullscreenElement &&    // alternative standard method
          !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
            if (document.documentElement.requestFullscreen) {
              document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
              document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
              document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
              document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            }
          }
        }
        this.addVoiceControl = function () {
          if (annyang) {
            // Let's define our first command. First the text we expect, and then the function it should call
            var commands = {
              'show control panel': function() {
                 alert('show control panel');
              },
              'hide control panel': function() {
                 alert('hide control panel');
              },
              'change layout': function() {
                 mediascape.AdaptationToolkit.Adaptation.UIAdaptation.onLayoutChangeEvent();
              }
            };

            // Add our commands to annyang
            annyang.addCommands(commands);

            // Start listening. You can call this here, or attach this call to an event, button, etc.
            annyang.start();
          }
        }


   }
    uiComponents.__moduleName = "uiComponents";
    return uiComponents;

  });
