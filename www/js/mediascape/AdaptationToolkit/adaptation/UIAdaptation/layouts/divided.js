/**
* This layout organizes N components dividing the screen into equal size areas, one
* for each component. The components will be ordered taking into account 
* the priority from the left to the right and from top to the bottom. If it is not
* possible to divide the screen into equal cells, it will be divided into a higher
* number of cells and there will be empty cells. 

* @module mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/divided
* @requires mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor
*/



define(["mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor"],
  function(LayoutConstructor){

    var divided = new LayoutConstructor('divided');
    divided.onComponentsChange = function (cmps){
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
    divided.render = function (cmps){



      var container=document.querySelector('#componentsContainer');

      container.style.overflowX='';
      container.style.display='inline-block';
      container.style.gridAutoFlow='';
      container.className='template-all-layouts';


      
      var ordered_cmps=[];
      ordered_cmps = cmps.sort(function(it1,it2){
      if (it1.lproperties.order > it2.lproperties.order) return 1;
      else return -1;
      });




      if(ordered_cmps.length===1){
        for(var i=0;i<ordered_cmps.length;i++){

          ordered_cmps[i].className='col-md-12 layout-fullwidth';          
         
        }
      }
      else if(ordered_cmps.length===2){
        for(var i=0;i<ordered_cmps.length;i++){
          
          ordered_cmps[i].className='col-md-6 layout-fullwidth';          
  

        }
      }
      else if(ordered_cmps.length===3){
        for(var i=0;i<ordered_cmps.length;i++){
          
          ordered_cmps[i].className='col-md-6 layout-horizontal-divided';
      
        }
      }
      else if(ordered_cmps.length===4){
        for(var i=0;i<ordered_cmps.length;i++){

          ordered_cmps[i].className='col-md-6 layout-horizontal-divided';
          
          
        }
      }
      else if(ordered_cmps.length===5){
        for(var i=0;i<ordered_cmps.length;i++){
        
          ordered_cmps[i].className='col-md-4 layout-horizontal-divided';
        
          
        }
      }
      else if(ordered_cmps.length===6){
        for(var i=0;i<ordered_cmps.length;i++){
        
          ordered_cmps[i].className='col-md-4 layout-horizontal-divided';

          
        }
      }
      else{
        for(var i=0;i<ordered_cmps.length;i++){
         
          ordered_cmps[i].className='col-md-4 layout-horizontal-three-divided';          
    
     
        }
      }

    mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
     

    }
    divided.onOrientationChange = function (cmps){
      console.log("test");
    }
    divided.onLayoutChangeEvent = function (cmps){
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

    divided.onResizeEvent=function(cmps){
      console.log("layout changed");
      this.render();
     
    }
    divided.unload = function(cpms){

    }
    divided.__moduleName = "dividedLayout";
    return divided;

  });
