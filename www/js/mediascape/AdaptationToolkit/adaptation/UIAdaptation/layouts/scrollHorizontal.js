
/**
* This layout organizes N components on a vertical carousel. The component with the
* lowest order will be in fullscreen and the rest are not shown. It is possible to drag 
* the components in both directions, up and down, simulating a vertical carousel and 
* changing the component that will be displayed in fullscreen. There are also two arrows 
* (up/down) in order to control the mentioned carousel by clicking them.

* @module mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/scrollHorizontal
* @requires mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor
*/



define(["mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor"],
  function(LayoutConstructor){

    var scrollHorizontal = new LayoutConstructor('scrollHorizontal');
     scrollHorizontal.listeners = [];
     scrollHorizontal.timeouts=[];
    var idx='';
   scrollHorizontal.onComponentsChange = function (cmps){
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
        components[i].style.marginLeft='';
        components[i].style.marginTop='';
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
    }
    scrollHorizontal.render = function (cmps){
      document.body.style.backgroundColor='white';
      document.body.style.padding='';

      var container=document.querySelector('#componentsContainer');
      container.style.display='inline-block';
       container.style.overflowX='';
       container.style.width='100%';

      var width = window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
      var height = window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;
      width=width+10;

      var upArrow=document.createElement('img');
      upArrow.id='upArrowImg';
      upArrow.src='../resources/images/carousel_arrow_up.jpg';
      upArrow.style.width='10%';
      upArrow.style.left='45%';
      upArrow.style.position='absolute';
      upArrow.style.top=0;

      document.body.appendChild(upArrow);

      var downArrow=document.createElement('img');
      downArrow.id='downArrowImg';
      downArrow.src='../resources/images/carousel_arrow_down.jpg';
      downArrow.style.width='10%';
      downArrow.style.left='45%';
      downArrow.style.position='absolute';
      downArrow.style.bottom=0;



      document.body.appendChild(downArrow);

      var ordered_cmps=[];
      ordered_cmps = cmps.sort(function(it1,it2){
      if (it1.lproperties.order > it2.lproperties.order) return 1;
      else return -1;
      });

      this.idx=0;

     for(var i=0;i<ordered_cmps.length;i++)
     {
        if(i===0){
          ordered_cmps[i].style.display='block';
        }
        else{
          ordered_cmps[i].style.display='none';
        }
        ordered_cmps[i].style.position='absolute';
        ordered_cmps[i].style.width=width+'px';
        ordered_cmps[i].style.height=height+'px';
      }
      var scope=this;
      function downArrowFunc(event){
        for(var i=0;i<ordered_cmps.length;i++){
          ordered_cmps[i].style.animationName='';
           ordered_cmps[i].style.animationDuration="";
        }

        scope.idx=scope.idx+1;
        if(scope.idx<=ordered_cmps.length-1){

           ordered_cmps[scope.idx].style.animationName='UpIn';
           ordered_cmps[scope.idx].style.animationDuration="1s";
           ordered_cmps[scope.idx-1].style.animationName='UpOut';
           ordered_cmps[scope.idx-1].style.animationDuration="2s";


           ordered_cmps[scope.idx].style.display='block';
           var timer1=setTimeout(function(){

           ordered_cmps[scope.idx-1].style.display='none';
          },2000);
           scrollHorizontal.timeouts.push(timer1);


        }
        else{
          scope.idx=0;
          ordered_cmps[scope.idx].style.animationName='UpIn';
           ordered_cmps[scope.idx].style.animationDuration="1s";
           ordered_cmps[ordered_cmps.length-1].style.animationName='UpOut';
           ordered_cmps[ordered_cmps.length-1].style.animationDuration="2s";


           ordered_cmps[scope.idx].style.display='block';
           var timer2=setTimeout(function(){

           ordered_cmps[ordered_cmps.length-1].style.display='none';
          },2000);
           scrollHorizontal.timeouts.push(timer2);


        }
      }
      downArrow.addEventListener('click', downArrowFunc );
      scrollHorizontal.listeners.push(downArrowFunc);

      function upArrowFunc(event){
        for(var i=0;i<ordered_cmps.length;i++){
          ordered_cmps[i].style.animationName='';
           ordered_cmps[i].style.animationDuration="";
        }
        scope.idx=scope.idx-1;
        if(scope.idx>=0){
          ordered_cmps[scope.idx].style.animationName='DownIn';
           ordered_cmps[scope.idx].style.animationDuration="1s";
           ordered_cmps[scope.idx+1].style.animationName='DownOut';
           ordered_cmps[scope.idx+1].style.animationDuration="2s";

           ordered_cmps[scope.idx].style.display='block';
           var timer3=setTimeout(function(){

           ordered_cmps[scope.idx+1].style.display='none';

          },2000);
           scrollHorizontal.timeouts.push(timer3);

        }
        else{
          scope.idx=ordered_cmps.length-1;
          ordered_cmps[scope.idx].style.animationName='DownIn';
           ordered_cmps[scope.idx].style.animationDuration="1s";
           ordered_cmps[0].style.animationName='DownOut';
           ordered_cmps[0].style.animationDuration="2s";

          ordered_cmps[scope.idx].style.display='block';
          var timer4=setTimeout(function(){

           ordered_cmps[0].style.display='none';

          },2000);
          scrollHorizontal.timeouts.push(timer4);

        }

      }

      upArrow.addEventListener('click',upArrowFunc);
      scrollHorizontal.listeners.push(upArrowFunc);


      for(var i=0;i<ordered_cmps.length;i++){


        !function outer(i){


          function trackendFunc(e){
              if (e.yDirection>0){ //eskubi

                   for(var j=0;j<ordered_cmps.length;j++){
                      ordered_cmps[j].style.animationName='';
                      ordered_cmps[j].style.animationDuration="";
                    }
                    scope.idx=scope.idx-1;
                    if(scope.idx>=0){
                      ordered_cmps[scope.idx].style.animationName='DownIn';
                       ordered_cmps[scope.idx].style.animationDuration="1s";
                       ordered_cmps[scope.idx+1].style.animationName='DownOut';
                       ordered_cmps[scope.idx+1].style.animationDuration="2s";

                       ordered_cmps[scope.idx].style.display='block';
                       var timer5=setTimeout(function(){

                       ordered_cmps[scope.idx+1].style.display='none';

                      },2000);
                       scrollHorizontal.timeouts.push(timer5);
                    }
                    else{
                      scope.idx=ordered_cmps.length-1;
                      ordered_cmps[scope.idx].style.animationName='DownIn';
                       ordered_cmps[scope.idx].style.animationDuration="1s";
                       ordered_cmps[0].style.animationName='DownOut';
                       ordered_cmps[0].style.animationDuration="2s";

                      ordered_cmps[scope.idx].style.display='block';
                      var timer6=setTimeout(function(){

                       ordered_cmps[0].style.display='none';

                      },2000);
                      scrollHorizontal.timeouts.push(timer6);


                    }


               }
               else { //ezker
                    for(var j=0;j<ordered_cmps.length;j++){
                      ordered_cmps[j].style.animationName='';
                       ordered_cmps[j].style.animationDuration="";
                    }

                    scope.idx=scope.idx+1;
                    if(scope.idx<=ordered_cmps.length-1){

                       ordered_cmps[scope.idx].style.animationName='UpIn';
                       ordered_cmps[scope.idx].style.animationDuration="1s";
                       ordered_cmps[scope.idx-1].style.animationName='UpOut';
                       ordered_cmps[scope.idx-1].style.animationDuration="2s";


                       ordered_cmps[scope.idx].style.display='block';
                       var timer7=setTimeout(function(){

                       ordered_cmps[scope.idx-1].style.display='none';
                      },2000);
                      scrollHorizontal.timeouts.push(timer7);

                    }
                    else{
                      scope.idx=0;
                      ordered_cmps[scope.idx].style.animationName='UpIn';
                     ordered_cmps[scope.idx].style.animationDuration="1s";
                     ordered_cmps[ordered_cmps.length-1].style.animationName='UpOut';
                     ordered_cmps[ordered_cmps.length-1].style.animationDuration="2s";


                     ordered_cmps[scope.idx].style.display='block';
                     var timer8=setTimeout(function(){

                     ordered_cmps[ordered_cmps.length-1].style.display='none';
                    },2000);
                      scrollHorizontal.timeouts.push(timer8);

                   }

            }
          }

          ordered_cmps[i].addEventListener('trackend',trackendFunc,true);
          scrollHorizontal.listeners.push(trackendFunc);
      }(i);
    }






    }
    scrollHorizontal.onOrientationChange = function (cmps){
      console.log("test");
    }
    scrollHorizontal.onLayoutChangeEvent = function (cmps){
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
      if(document.querySelector('#menu')!=null){
          document.body.removeChild(document.querySelector('#menu'));
      }
      if(document.querySelector('#menu_container')!=null){
          componentsContainer.removeChild(document.querySelector('#menu_container'));
      }

      for(var i=0;i<cmps.length;i++){
        if(document.querySelector('#name'+cmps[i].id)!=null){
            componentsContainer.removeChild(document.querySelector('#name'+cmps[i].id));
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



    }
    scrollHorizontal.onResizeEvent=function(cmps){
      console.log("layout changed");
      var width = window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
      var height = window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;

      for(var i=0;i<cmps.length;i++)
     {
        cmps[i].style.position='absolute';
        cmps[i].style.width=width+'px';
        cmps[i].style.height=height+'px';
      }


      mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
    }
    scrollHorizontal.unload = function(cmps){
      for(var i=0;i<scrollHorizontal.timeouts.length;i++){
        clearTimeout(scrollHorizontal.timeouts[i]);
      }

      scrollHorizontal.listeners.forEach (function(listener){
      for(var i=0;i<cmps.length;i++){
        cmps[i].removeEventListener('trackend',listener,true);

      }
      document.querySelector('#downArrowImg').removeEventListener('tap',listener,true);
      document.querySelector('#upArrowImg').removeEventListener('tap',listener,true);


      },this);

    }

    scrollHorizontal.__moduleName = "scrollHorizontalLayout";
    return scrollHorizontal;

  });
