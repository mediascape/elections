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

      if(componentsContainer.children[0].id.startsWith('divided')){
        for(var i=0;i<cmps.length;i++){
          if(componentsContainer.querySelector('#divided'+cmps[i].id)){
            while (componentsContainer.querySelector('#divided'+cmps[i].id).firstChild)
            {
              componentsContainer.querySelector('#divided'+cmps[i].id).parentNode.insertBefore(componentsContainer.querySelector('#divided'+cmps[i].id).firstChild,
                                                      componentsContainer.querySelector('#divided'+cmps[i].id));
            }
            componentsContainer.querySelector('#divided'+cmps[i].id).parentNode.removeChild(componentsContainer.querySelector('#divided'+cmps[i].id));
          }
        }
        if (document.querySelector('x-media')){
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
      if(cmps.length===1){
        for(var i=0;i<cmps.length;i++){
          var div=document.createElement('div');
          div.id='divided'+cmps[i].id;
          div.className='col-md-12 layout-fullwidth';
          div.appendChild(cmps[i]);
          //cmps[i].style.width='100%';
          container.appendChild(div);
        }
      }
      else if(cmps.length===2){
        for(var i=0;i<cmps.length;i++){
          var div=document.createElement('div');
          div.id='divided'+cmps[i].id;
          div.className='col-md-6 layout-fullwidth';
          div.appendChild(cmps[i]);
          //cmps[i].style.width='100%';
          container.appendChild(div);
        }
      }
      else if(cmps.length===3){
        for(var i=0;i<cmps.length;i++){
          var div=document.createElement('div');
          div.id='divided'+cmps[i].id;
          div.className='col-md-6 layout-horizontal-divided';
          div.appendChild(cmps[i]);
          //cmps[i].style.width='100%';
          container.appendChild(div);
        }
      }
      else if(cmps.length===4){
        for(var i=0;i<cmps.length;i++){
          var div=document.createElement('div');
          div.id='divided'+cmps[i].id;
          div.className='col-md-6 layout-horizontal-divided';
          div.appendChild(cmps[i]);
          //cmps[i].style.width=div.style.width;
          container.appendChild(div);
        }
      }
      else if(cmps.length===5){
        for(var i=0;i<cmps.length;i++){
          var div=document.createElement('div');
          div.id='divided'+cmps[i].id;
          div.className='col-md-4 layout-horizontal-divided';
          
          div.appendChild(cmps[i]);
         // cmps[i].style.width='100%';
         container.appendChild(div);

        }
      }
      else if(cmps.length===6){
        for(var i=0;i<cmps.length;i++){
          var div=document.createElement('div');
          div.id='divided'+cmps[i].id;
          div.className='col-md-4 layout-horizontal-divided';
          div.appendChild(cmps[i]);
          //cmps[i].style.width='100%';
          cmps[i].style.backgroundColor='black';
          container.appendChild(div);
        }
      }
      else{
        for(var i=0;i<cmps.length;i++){
          var div=document.createElement('div');
          div.id='divided'+cmps[i].id;
          div.className='col-md-4 layout-horizontal-three-divided';
          div.appendChild(cmps[i]);
          //cmps[i].style.width='100%';
          container.appendChild(div);
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

      if(componentsContainer.children[0].id.startsWith('divided')){
        for(var i=0;i<cmps.length;i++){
          if(componentsContainer.querySelector('#divided'+cmps[i].id)){
            while (componentsContainer.querySelector('#divided'+cmps[i].id).firstChild)
            {
              componentsContainer.querySelector('#divided'+cmps[i].id).parentNode.insertBefore(componentsContainer.querySelector('#divided'+cmps[i].id).firstChild,
                                                      componentsContainer.querySelector('#divided'+cmps[i].id));
            }
            componentsContainer.querySelector('#divided'+cmps[i].id).parentNode.removeChild(componentsContainer.querySelector('#divided'+cmps[i].id));
          }
        }
        if (document.querySelector('x-media')){
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
     
    }
    divided.unload = function(cpms){

    }
    divided.__moduleName = "dividedLayout";
    return divided;

  });
