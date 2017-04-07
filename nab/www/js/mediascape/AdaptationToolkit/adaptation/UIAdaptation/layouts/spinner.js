/**
* This layout organizes N components using a spinner built with a small view of each
* one of the available components. The rotating movement of the spinner is controlled 
* by left/right direction arrows. When a component is clicked, it takes the fullscreen 
* place.

* @module mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/spinner
* @requires mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor
*/

define(["mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor"],
  function(LayoutConstructor){

    var spinner = new LayoutConstructor('spinner');
    spinner.listeners = [];
    var angle = 0;
    var fullScreenCmp='';
    var timers=[];
    var TO='';
    var cmpHeight='';
    spinner.onComponentsChange = function (cmps){
        console.log("test");
        this.cmps = cmps;
      var components = mediascape.AdaptationToolkit.componentManager.core.getComponents();
      for(var i=0;i<components.length;i++){
        components[i].style.width='';
        components[i].style.height='';
        components[i].style.gridColumn='';
        components[i].style.gridRow='';
        components[i].className='';
        components[i].style.order='';
        components[i].style.position='';
        components[i].style.backgroundColor='';
        components[i].style.marginTop='';
        components[i].style.marginLeft='';
        components[i].style.float='';
        components[i].style.zIndex='';
        components[i].style.boxShadow='';
        components[i].style.borderLeft='';
        components[i].style.animationName='';
        components[i].style.animationDuration='';
        //components[i].style.display='block';

        components[i].style.left='';
        components[i].style.transformOrigin= '';
        components[i].style.outline='';
        components[i].style.transform='';

      }

      componentsContainer.style.backgroundColor='';
      componentsContainer.style.perspective='';
       componentsContainer.className='';
       componentsContainer.style.gridTemplateColumns='';
       componentsContainer.style.gridTemplateRows='';
      if(document.querySelector('#layout_classes')!=null){
        document.head.removeChild(document.querySelector('#layout_classes'));
      }
      for(var i=1;i<components.length;i++){
        if(document.querySelector('#compDiv'+i)!=null){
            componentsContainer.removeChild(document.querySelector('#compDiv'+i));
        }
      }
      if(document.querySelector('#menu_container')!=null){
          componentsContainer.removeChild(document.querySelector('#menu_container'));
      }
      for(var i=0;i<components.length;i++){
        if(document.querySelector('#name'+components[i].id)!=null){
            componentsContainer.removeChild(document.querySelector('#name'+components[i].id));
        }
      }
      if(document.querySelector('#downArrowImg')!=null){
          document.body.removeChild(document.querySelector('#downArrowImg'));
      }
      if(document.querySelector('#upArrowImg')!=null){
          document.body.removeChild(document.querySelector('#upArrowImg'));
      }
      if(componentsContainer.querySelector('figure')){
        while (componentsContainer.querySelector('figure').firstChild)
        {
            componentsContainer.querySelector('figure').parentNode.insertBefore(componentsContainer.querySelector('figure').firstChild,
                                                    componentsContainer.querySelector('figure'));
        }
        componentsContainer.querySelector('figure').parentNode.removeChild(componentsContainer.querySelector('figure'));
        if(document.querySelector('x-media')){
          document.querySelector('x-media').play();
        }
      }
      
      if(document.querySelector('#swContainer')){

        
       for(var i=0;i<components.length;i++){
        if(document.querySelector('#swContainer').querySelector('#'+components[i].id)){
         var node=document.querySelector('#'+components[i].id);
         componentsContainer.appendChild(node);
        
        }
      }
        document.querySelector('#swContainer').parentNode.removeChild(document.querySelector('#swContainer'));
        if(document.querySelector('x-media')){
          document.querySelector('x-media').play();
        }
      }

      if(componentsContainer.querySelector('#arrows')){
        componentsContainer.removeChild(componentsContainer.querySelector('#arrows'));
      }
      if(componentsContainer.querySelector('#back')){
        componentsContainer.removeChild(componentsContainer.querySelector('#back'));
      }



      this.render(cmps);

      if(document.querySelector('#customizePanel')!=null){
        document.body.removeChild(document.querySelector('#customizePanel'));
        if(document.querySelector('drag-resize')!=null){
          componentsContainer.removeChild(document.querySelector('drag-resize'));
        }
      }

      mediascape.AdaptationToolkit.uiComponents.addMenuToCmps(cmps,true);
          
      
      cmps.forEach(function(cmp,i){
      !function outer(i){
        cmp.removeEventListener('mousemove',activityFunc,true);
        
        cmp.removeEventListener('mousemove',activityFunc,false);
        cmp.addEventListener('mousemove',activityFunc);
          spinner.listeners.push(activityFunc);
          function activityFunc(e){
          
          this.querySelector('#menuBar'+this.id).style.display='block';
          clearTimeout(timers[i]);
          var scope=this;
          timers[i]=setTimeout(function(){
            scope.querySelector('#menuBar'+scope.id).style.display='none';
          },3000);
        }
        }(i);
       
           
      });




    }
    spinner.render = function (cmps){

      document.body.style.backgroundColor='white';
      document.body.style.padding='';

      var container=document.querySelector('#componentsContainer');

      container.style.overflowX='';

      container.style.display='inline-block';
      container.style.backgroundColor='white';
      var width = window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
      var height = window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;
      container.style.width=width+'px';
      container.style.height=height+'px';


      if(width>=900){
        TO='500px';
      }
      else if(width<900 && width>600){
       TO='300px';

      }
      else{
        TO='200px';
      }



      if(height>=450){
          cmpHeight='300px';
      }
      else if(height<450  && height>380){
           cmpHeight='200px';
      }
      else{
          cmpHeight='150px';
      }



      if(container.querySelector('figure')){
        container.removeChild(container.querySelector('figure'));
      }
      var fig=document.createElement('figure');
      fig.id='spinnerFig';
      fig.style.transformStyle='preserve-3d';
      fig.style.minHeight='122px';
      fig.style.transformOrigin='50% 50% -'+TO;
      fig.style.transition='1s';
      fig.style.transform='rotateY('+angle+'deg)';
      container.style.perspective='1200px';

      if(container.querySelector('#back')){
        container.removeChild(container.querySelector('#back'));
      }
      var back=document.createElement('img');
      back.id='back';
      back.src='../resources/images/back.png';
      back.style.width='6%';
      back.style.right='30px';
      back.style.position='absolute';
      back.style.zIndex='99999';
      back.style.top='30px';
      back.style.display='none';
      container.appendChild(back);

     var deg=360/cmps.length;
     for(var i=0;i<cmps.length;i++)
     {
        fig.appendChild(cmps[i]);
        //if(cmps[i].nodeName==='X-MEDIA')cmps[i].play();
        cmps[i].style.width='35%';
        cmps[i].style.height=cmpHeight;
        cmps[i].style.position='absolute';
        cmps[i].style.left='30%';
        cmps[i].style.transformOrigin= '50% 50% -'+TO;
        cmps[i].style.outline='1px solid transparent';
        cmps[i].style.transform='rotateY('+(0-i*deg)+'deg)';

      }

      


      container.appendChild(fig);

     if(container.querySelector('#arrows')){
        container.removeChild(container.querySelector('#arrows'));
      }
     var arrows=document.createElement('div');
     arrows.id='arrows';
     var left=document.createElement('img');
     left.src='resources/images/Previous-256.png';
     left.id='left';
     left.style.opacity='1';
     var right=document.createElement('img');
     right.src='resources/images/Next-256.png';
     right.id='right';
     right.style.marginLeft='1%';
     right.style.opacity='1';

     right.addEventListener('mouseover',function(){
        event.srcElement.style.opacity="0.5";
     });
      right.addEventListener('mouseleave',function(){
        event.srcElement.style.opacity="1";
     });

      left.addEventListener('mouseover',function(){
        event.srcElement.style.opacity="0.5";
     });
      left.addEventListener('mouseleave',function(){
        event.srcElement.style.opacity="1";

     });
       right.addEventListener('up',function(){
        right.style.opacity="0.5";
        setTimeout(function(event){
          right.style.opacity="1";


        },1000);

     });

      left.addEventListener('up',function(){
        left.style.opacity="0.5";
        setTimeout(function(event){
          left.style.opacity="1";
        },1000);
     });

     arrows.appendChild(left);
     arrows.appendChild(right);
     arrows.style.position='absolute';
     arrows.style.bottom='100px';
     arrows.style.width='15%';
     left.style.width='49%';
     right.style.width='50%';
     arrows.style.left='40%';


     function leftFunc(event){
        galleryspin('-',cmps);

     }

     function rightFunc(event){
        galleryspin('',cmps);
     }

     left.addEventListener('click',leftFunc);
     right.addEventListener('click',rightFunc);
     spinner.listeners.push(leftFunc);
     spinner.listeners.push(rightFunc);









     container.appendChild(arrows);

     mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();






    }
    function galleryspin(sign,cmps) {
      var deg=360/cmps.length;
      spinnerFig = document.querySelector("#spinnerFig");
      if (!sign) { angle = angle + deg; } else { angle = angle - deg; }
      spinnerFig.style.transform='rotateY('+ angle +'deg)';
    }

    spinner.onPriorizeComponent=function(cmp){
            var width = window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
            var height = window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;
            var deg=360/this.cmps.length;
            var i='';
            for(var a=0;a<this.cmps.length;a++){
              if(this.cmps[a].id===cmp.id)i=a;
              
            }
            var scope=this;
            spinner.listeners.forEach (function(listener){
              for(var a=0;a<scope.cmps.length;a++){     
                scope.cmps[a].removeEventListener('mousemove',listener,true);              
                scope.cmps[a].removeEventListener('mousemove',listener,false);
                clearTimeout(timers[a]);
              }
            });
            
            mediascape.AdaptationToolkit.uiComponents.addMenuToCmps(this.cmps,false);

            cmp.style.width=width+'px';
            cmp.style.height=height+'px';
            cmp.style.left='0%';
            cmp.style.transformOrigin= '';
            cmp.style.outline='';
            cmp.style.transform='';
            cmp.style.animationName='spinnerToFullscreen';
            cmp.style.animationDuration='1s';
            cmp.style.zIndex='9999';
            cmp.style.backgroundColor='white';
            document.querySelector('#spinnerFig').style.transformStyle='';
            document.querySelector('#spinnerFig').style.minHeight='';
            document.querySelector('#spinnerFig').style.transformOrigin='';
            document.querySelector('#spinnerFig').style.width='100%';
            document.querySelector('#spinnerFig').style.height='100%';
            document.querySelector('#spinnerFig').style.margin='0';
            document.querySelector('#spinnerFig').style.transform='';
            document.querySelector('#spinnerFig').style.transition='';


            var container=document.querySelector('#componentsContainer');
            container.style.perspective='';
            for(var j=0;j<this.cmps.length;j++){
              if(i!==j){
                this.cmps[j].style.display='none';
              }
            }
            var back=document.querySelector('#back');
            back.style.display='block';
            clickedCmp=cmp;
            fullScreenCmp=cmp;
            var scope=this;
            mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
            !function outer(clickedCmp,i){

              function backFunc(event){
                  clickedCmp.style.width='35%';
                  clickedCmp.style.height=cmpHeight;
                  clickedCmp.style.left='30%';
                  clickedCmp.style.transformOrigin='50% 50% -'+TO;
                  clickedCmp.style.outline='1px solid transparent';
                  clickedCmp.style.transform='rotateY('+(0-i*deg)+'deg)';
                  clickedCmp.style.zIndex='';
                  clickedCmp.style.backgroundColor='';

                  

                  for(var j=0;j<scope.cmps.length;j++){
                    if(i!==j){
                      scope.cmps[j].style.display='block';
                    }
                  }
                  document.querySelector('#spinnerFig').style.transformStyle='preserve-3d';
                  document.querySelector('#spinnerFig').style.minHeight='122px';
                  document.querySelector('#spinnerFig').style.transformOrigin='50% 50% -'+TO;

                  document.querySelector('#spinnerFig').style.transform='rotateY('+angle+'deg)';
                  document.querySelector('#spinnerFig').style.width='';
                  document.querySelector('#spinnerFig').style.height='';
                  document.querySelector('#spinnerFig').style.margin='';
                  container.style.perspective='1200px';
                  back.style.display='none';
                  back.removeEventListener('tap',backFunc,true);
                  //clickedCmp.style.animationName='fullscreenToSpinner';
                  //clickedCmp.style.animationDuration='1s';
                  document.querySelector('#spinnerFig').style.transition='1s';
                  clickedCmp.style.animationName='';
                  clickedCmp.style.animationDuration='';

                  mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();

                  mediascape.AdaptationToolkit.uiComponents.addMenuToCmps(scope.cmps,true);
          
      
                  scope.cmps.forEach(function(cmp,i){
                  !function outer(i){
                    cmp.removeEventListener('mousemove',activityFunc,true);
                    
                    cmp.removeEventListener('mousemove',activityFunc,false);
                    cmp.addEventListener('mousemove',activityFunc);
                      spinner.listeners.push(activityFunc);
                      function activityFunc(e){
                      
                      this.querySelector('#menuBar'+this.id).style.display='block';
                      clearTimeout(timers[i]);
                      var scope=this;
                      timers[i]=setTimeout(function(){
                        scope.querySelector('#menuBar'+scope.id).style.display='none';
                      },3000);
                    }
                    }(i);
                   
                       
                  });


                 
                  setTimeout(function(){

                      clickedCmp.style.animationName='';
                      clickedCmp.style.animationDuration='';
                  },1500);
                  fullScreenCmp='';
              }
              back.addEventListener('click',backFunc);
              spinner.listeners.push(backFunc);
            }(clickedCmp,i);   
            

    }
    spinner.onOrientationChange = function (cmps){
      console.log("orientationCHANGED");
    }
   spinner.onLayoutChangeEvent = function (cmps){
      console.log("layout changed");

      for(var i=0;i<cmps.length;i++){
        cmps[i].style.width='';
        cmps[i].style.height='';
        cmps[i].style.gridColumn='';
        cmps[i].style.gridRow='';
        cmps[i].className='';
        cmps[i].style.order='';
        cmps[i].style.position='';
        cmps[i].style.backgroundColor='';
        cmps[i].style.marginLeft='';
        cmps[i].style.marginTop='';
        cmps[i].style.float='';
        cmps[i].style.zIndex='';
        cmps[i].style.boxShadow='';
        cmps[i].style.borderLeft='';
        cmps[i].style.animationName='';
        cmps[i].style.animationDuration='';
        cmps[i].style.display='block';

        cmps[i].style.left='';
        cmps[i].style.transformOrigin= '';
        cmps[i].style.outline='';
        cmps[i].style.transform='';

      }

      componentsContainer.style.backgroundColor='';
      componentsContainer.style.perspective='';
       componentsContainer.className='';
       componentsContainer.style.gridTemplateColumns='';
       componentsContainer.style.gridTemplateRows='';
      if(document.querySelector('#layout_classes')!=null){
        document.head.removeChild(document.querySelector('#layout_classes'));
      }
      for(var i=1;i<cmps.length;i++){
        if(document.querySelector('#compDiv'+i)!=null){
            componentsContainer.removeChild(document.querySelector('#compDiv'+i));
        }
      }
      if(document.querySelector('#menu_container')!=null){
          componentsContainer.removeChild(document.querySelector('#menu_container'));
      }
      for(var i=0;i<cmps.length;i++){
        if(document.querySelector('#name'+cmps[i].id)!=null){
            componentsContainer.removeChild(document.querySelector('#name'+cmps[i].id));
        }
      }
      if(document.querySelector('#menu')!=null){
          document.body.removeChild(document.querySelector('#menu'));
      }
      if(document.querySelector('#downArrowImg')!=null){
          document.body.removeChild(document.querySelector('#downArrowImg'));
      }
      if(document.querySelector('#upArrowImg')!=null){
          document.body.removeChild(document.querySelector('#upArrowImg'));
      }
      if(componentsContainer.querySelector('figure')){
        while (componentsContainer.querySelector('figure').firstChild)
        {
            componentsContainer.querySelector('figure').parentNode.insertBefore(componentsContainer.querySelector('figure').firstChild,
                                                    componentsContainer.querySelector('figure'));
        }
        componentsContainer.querySelector('figure').parentNode.removeChild(componentsContainer.querySelector('figure'));
        if(document.querySelector('x-media')){
          document.querySelector('x-media').play();
        }
      }

      if(document.querySelector('#swContainer')){

        
       for(var i=0;i<cmps.length;i++){
        if(document.querySelector('#swContainer').querySelector('#'+cmps[i].id)){
         var node=document.querySelector('#'+cmps[i].id);
         componentsContainer.appendChild(node);
        
        }
        }
        document.querySelector('#swContainer').parentNode.removeChild(document.querySelector('#swContainer'));
        if(document.querySelector('x-media')){
          document.querySelector('x-media').play();
        }
      
      }

      

      if(componentsContainer.querySelector('#arrows')){
        componentsContainer.removeChild(componentsContainer.querySelector('#arrows'));
      }
      if(componentsContainer.querySelector('#back')){
        componentsContainer.removeChild(componentsContainer.querySelector('#back'));
      }
      this.render(cmps);

      if(document.querySelector('#customizePanel')!=null){
        document.body.removeChild(document.querySelector('#customizePanel'));
        if(document.querySelector('drag-resize')!=null){
          componentsContainer.removeChild(document.querySelector('drag-resize'));
        }
      }

      mediascape.AdaptationToolkit.uiComponents.addMenuToCmps(cmps,true);
          
      
      cmps.forEach(function(cmp,i){
      !function outer(i){
        cmp.removeEventListener('mousemove',activityFunc,true);
        
        cmp.removeEventListener('mousemove',activityFunc,false);
        cmp.addEventListener('mousemove',activityFunc);
          spinner.listeners.push(activityFunc);
          function activityFunc(e){
          
          this.querySelector('#menuBar'+this.id).style.display='block';
          clearTimeout(timers[i]);
          var scope=this;
          timers[i]=setTimeout(function(){
            scope.querySelector('#menuBar'+scope.id).style.display='none';
          },3000);
        }
        }(i);
       
           
      });




    }

    spinner.onResizeEvent=function(cmps){
      console.log("layout changed");
      for(var i=0;i<cmps.length;i++){
        cmps[i].className='';
        cmps[i].style.display='block';
        clearTimeout(timers[i]);
      }
      mediascape.AdaptationToolkit.uiComponents.addMenuToCmps(cmps,false);
      if(document.querySelector('#layout_classes')!=null){
        document.head.removeChild(document.querySelector('#layout_classes'));
      }
      this.render(cmps);
      mediascape.AdaptationToolkit.uiComponents.addMenuToCmps(cmps,true);

      /*if(fullScreenCmp!==''){
        fullScreenCmp.fire('hold',this);
      }*/
    },
    spinner.onActivity = function(cmps,event){
        if(fullScreenCmp===''){
        if (event.type === "keydown"){
            console.log(event);
            event.preventDefault();
            var left = document.querySelector('#left');
            var right = document.querySelector('#right');
            switch (event.keyIdentifier ){
               case 'Right':
                    galleryspin('',cmps);
                    right.style.opacity=0.5;
                    break;
               case 'Up':
                     galleryspin('',cmps);
                     right.style.opacity=0.5;
                     break;
               case 'Left':
                    galleryspin('-',cmps);
                    left.style.opacity=0.5;
                    break;
               case 'Down':
                     galleryspin('-',cmps);
                     left.style.opacity=0.5;
                     break;
               default:console.warn('key event not identified at spinner');
            }
         setTimeout(function(){right.style.opacity=1;left.style.opacity=1;},500);
        }
      }
    },
    spinner.unload = function(cmps){
      spinner.listeners.forEach (function(listener){
      for(var i=0;i<cmps.length;i++){
       //cmps[i].removeEventListener('hold',listener,true);
       //cmps[i].removeEventListener('hold',listener,false);

       cmps[i].removeEventListener('mousemove',listener,true);
        
        cmps[i].removeEventListener('mousemove',listener,false);
        clearTimeout(timers[i]);

      }
      document.querySelector('#left').removeEventListener('tap',listener,true);
      document.querySelector('#right').removeEventListener('tap',listener,true);
      document.querySelector('#back').removeEventListener('tap',listener,true);
    },this);
      mediascape.AdaptationToolkit.uiComponents.addMenuToCmps(cmps,false);
    }
    
    spinner.__moduleName = "spinnerLayout";
    return spinner;

  });



/*

        !function outer(i){
          function clickFunc(event){


            event.srcElement.style.width=width+'px';
            event.srcElement.style.height=height+'px';
            event.srcElement.style.left='0%';
            event.srcElement.style.transformOrigin= '';
            event.srcElement.style.outline='';
            event.srcElement.style.transform='';
            event.srcElement.style.animationName='spinnerToFullscreen';
            event.srcElement.style.animationDuration='1s';
            event.srcElement.style.zIndex='9999';
            event.srcElement.style.backgroundColor='white';
            fig.style.transformStyle='';
            fig.style.minHeight='';
            fig.style.transformOrigin='';
            fig.style.width='100%';
            fig.style.height='100%';
            fig.style.margin='0';
            fig.style.transform='';
            fig.style.transition='';


            container.style.perspective='';
            for(var j=0;j<cmps.length;j++){
                    if(i!==j){
                      cmps[j].style.display='none';
                    }
                  }
            back.style.display='block';
            clickedCmp=event.srcElement;
            fullScreenCmp=event.srcElement;
            mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
            !function outer(clickedCmp,i){

              function backFunc(event){
                  clickedCmp.style.width='35%';
                  clickedCmp.style.height=cmpHeight;
                  clickedCmp.style.left='30%';
                  clickedCmp.style.transformOrigin='50% 50% -'+TO;
                  clickedCmp.style.outline='1px solid transparent';
                  clickedCmp.style.transform='rotateY('+(0-i*deg)+'deg)';
                  clickedCmp.style.zIndex='';
                  clickedCmp.style.backgroundColor='';



                  for(var j=0;j<cmps.length;j++){
                    if(i!==j){
                      cmps[j].style.display='block';
                    }
                  }
                  fig.style.transformStyle='preserve-3d';
                  fig.style.minHeight='122px';
                  fig.style.transformOrigin='50% 50% -'+TO;

                  fig.style.transform='rotateY('+angle+'deg)';
                  fig.style.width='';
                  fig.style.height='';
                  fig.style.margin='';
                  container.style.perspective='1200px';
                  back.style.display='none';
                  back.removeEventListener('tap',backFunc,true);
                  //clickedCmp.style.animationName='fullscreenToSpinner';
                  //clickedCmp.style.animationDuration='1s';
                  fig.style.transition='1s';
                  clickedCmp.style.animationName='';
                  clickedCmp.style.animationDuration='';
                  mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
                  setTimeout(function(){

                      clickedCmp.style.animationName='';
                      clickedCmp.style.animationDuration='';
                  },1500);
                  fullScreenCmp='';
              }
              back.addEventListener('click',backFunc);
              spinner.listeners.push(backFunc);
            }(clickedCmp,i);

          }
          cmps[i].addEventListener('click',clickFunc);
        spinner.listeners.push(clickFunc);

         }(i);



     }

*/