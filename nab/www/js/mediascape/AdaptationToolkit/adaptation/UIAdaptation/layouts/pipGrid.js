/**
* This layout organizes N components as picture in picture. The component with the
* lowest order will be shown in fullscreen and the others are placed with a reduced
* size following the aspect ratio when it is possible in a column at the right side
* of the screen and over the fullscreen component. When a component from the column
* is clicked, it is changed to the fullscreen position replacing its position.

* @module mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/pip
* @requires mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor
*/



define(["mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor"],
  function(LayoutConstructor){
    var fullScreenCmp;
    var pipGrid = new LayoutConstructor('pipGrid');
    pipGrid.listeners = [];
    var timers=[];
    pipGrid.onComponentsChange = function (cmps){
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
        components[i].style.top='';
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
          //document.querySelector('x-media').play();
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
        //  document.querySelector('x-media').play();
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

      var scope=this;
      var timer1=0;

      mediascape.AdaptationToolkit.uiComponents.addMenuToCmps(cmps,true);


      cmps.forEach(function(cmp,i){
         !function outer(i){
        cmp.removeEventListener('mousemove',activityFunc,true);

        cmp.removeEventListener('mousemove',activityFunc,false);
        cmp.addEventListener('mousemove',activityFunc);
         pipGrid.listeners.push(activityFunc);
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
    pipGrid.render = function (cmps,rendered,clicked){
      document.body.style.backgroundColor='white';
      document.body.style.padding='';

      var container=document.querySelector('#componentsContainer');
      container.style.display='inline-block';
      container.style.overflowX='hidden';


      var width = window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;


      if(cmps.length===1){
         var a=width;
         b=0;
      }
      else{
        var a=width-Math.round(0.33*width);
        var b=Math.round(width*0.33);
      }



      var col_cmps=cmps.length-1;
      var height = window.innerHeight ||document.documentElement.clientHeight ||document.body.clientHeight;

      var ordered_cmps=[];
      ordered_cmps = cmps.sort(function(it1,it2){
      if (parseInt(it1.lproperties.order) > parseInt(it2.lproperties.order)) return 1;
      else return -1;
      });

      for(var i=0;i<ordered_cmps.length;i++){
        ordered_cmps[i].style.position='absolute';
      }

      var cmpsToColumn=[];
     
      /*fullScreenCmp=ordered_cmps[0];

      for(var i=1;i<ordered_cmps.length;i++){
        cmpsToColumn.push(ordered_cmps[i]);
      }*/

      if(rendered!=true && rendered!=false ){
       fullScreenCmp=ordered_cmps[0];

        for(var i=1;i<ordered_cmps.length;i++){
          cmpsToColumn.push(ordered_cmps[i]);
        }
      }
      else{
       fullScreenCmp=clicked;
        for(var i=0;i<ordered_cmps.length;i++){
          if(ordered_cmps[i].id!==clicked.id){
            cmpsToColumn.push(ordered_cmps[i]);
          }
        }
      }



      if(col_cmps===4){
        var row_height=parseInt((height)/(col_cmps+1));  
      }
      else{
        var row_height=parseInt((height)/(col_cmps));  
      }
      
      fullScreenCmp.style.marginLeft='0px';
      fullScreenCmp.style.width=a+'px';
      fullScreenCmp.style.height=(height)+'px';
      fullScreenCmp.style.marginTop='0px';
      fullScreenCmp.style.backgroundColor='white';
      fullScreenCmp.style.zIndex='1';
      fullScreenCmp.className="";



      if(col_cmps===4){
        cmpsToColumn[0].style.marginLeft=a+'px';
        cmpsToColumn[0].style.width=b+'px';
        cmpsToColumn[0].style.height=row_height*2+'px';
        cmpsToColumn[0].style.marginTop=(0*row_height)+'px';
        cmpsToColumn[0].style.backgroundColor='black';
        cmpsToColumn[0].style.zIndex='2';
        for(var i=1;i<col_cmps;i++){
          cmpsToColumn[i].style.marginLeft=a+'px';
          cmpsToColumn[i].style.width=b+'px';
          cmpsToColumn[i].style.height=row_height+'px';
          cmpsToColumn[i].style.marginTop=((i+1)*row_height)+'px';
          cmpsToColumn[i].style.backgroundColor='black';
          cmpsToColumn[i].style.zIndex='2';
          //cmpsToColumn[i].className='right-content-panel';
        }
      }
      else{
        for(var i=0;i<col_cmps;i++){
          cmpsToColumn[i].style.marginLeft=a+'px';
          cmpsToColumn[i].style.width=b+'px';
          cmpsToColumn[i].style.height=row_height+'px';
          cmpsToColumn[i].style.marginTop=(i*row_height)+'px';
          cmpsToColumn[i].style.backgroundColor='black';
          cmpsToColumn[i].style.zIndex='2';
          //cmpsToColumn[i].className='right-content-panel';
        }
      }
      

      

      mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();



    }
    pipGrid.onOrientationChange = function (cmps){
      console.log("test");

    }
    pipGrid.onLayoutChangeEvent = function (cmps){
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
        cmps[i].style.top='';
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
          //document.querySelector('x-media').play();
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
        //  document.querySelector('x-media').play();
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
       mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
       var scope=this;
      var timer1=0;
      mediascape.AdaptationToolkit.uiComponents.addMenuToCmps(cmps,true);


      cmps.forEach(function(cmp,i){
      !function outer(i){
        cmp.removeEventListener('mousemove',activityFunc,true);

        cmp.removeEventListener('mousemove',activityFunc,false);
        cmp.addEventListener('mousemove',activityFunc);
          pipGrid.listeners.push(activityFunc);
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
    pipGrid.onPriorizeComponent=function(cmp){
        var clicked=cmp;
        var rendered=true;
        var _cmps = this.cmps;
        this.render(_cmps,rendered,clicked);
    }
    pipGrid.onResizeEvent=function(cmps){
      console.log("layout changed");
      var rendered=true;
      for(var i=0;i<cmps.length;i++){
        cmps[i].style.width='';
        cmps[i].style.height='';
        cmps[i].style.gridColumn='';
        cmps[i].style.gridRow='';

        cmps[i].style.order='';
      }
      if(document.querySelector('#layout_classes')!=null){
        document.head.removeChild(document.querySelector('#layout_classes'));
      }
      var clicked=fullScreenCmp;
      this.render(cmps,rendered,clicked);
      mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
    }
    pipGrid.unload = function(cmps){
    pipGrid.listeners.forEach (function(listener){
      for(var i=0;i<cmps.length;i++){
        cmps[i].removeEventListener('mousemove',listener,true);

        cmps[i].removeEventListener('mousemove',listener,false);
        clearTimeout(timers[i]);
      }
    },this);
     mediascape.AdaptationToolkit.uiComponents.addMenuToCmps(cmps,false);
    }



    pipGrid.__moduleName = "pipGridLayout";
    return pipGrid;

  }

  );
  window.oncontextmenu = function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
  };
