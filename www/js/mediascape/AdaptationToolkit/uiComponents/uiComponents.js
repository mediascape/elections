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
      this.addControlPanel = function (url){


        this.ctrlPanel=new ControlPanel(url);
        var associationPanel = document.createElement('span');


          var scope=this;
          document.addEventListener('keydown',function(e){

             if (e.keyCode === 16 ){
                if ( scope.ctrlPanel.showing) scope.ctrlPanel.hide();
                else scope.ctrlPanel.show();
              }
          });

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
                  e.srcElement = e.srcElement || e.target;
                  console.log(e);
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
