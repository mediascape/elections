/**
* This layout organizes N components...

* @module mediascape/AdaptationToolkit/adaptation/UIAdaptation/layouts/carousel
* @requires mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor
*/



define(["mediascape/AdaptationToolkit/adaptation/UIAdaptation/layoutConstructor"],
  function(LayoutConstructor){
    var fullScreenCmp;
    var carousel = new LayoutConstructor('carousel');
    carousel.listeners = [];
    var timers=[];
    
    carousel.onComponentsChange = function (cmps){
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
    carousel.render = function (cmps){

      

      document.body.style.backgroundColor='#0A2533';
      document.body.style.padding='15px 0px';
      var container=document.querySelector('#componentsContainer');
      container.style.display='';
      container.style.overflowX='';
      



      var ordered_cmps=[];
      ordered_cmps = cmps.sort(function(it1,it2){
      if (it1.lproperties.order > it2.lproperties.order) return 1;
      else return -1;
      });
   

      var div=document.createElement('div');
      div.className='swiper-container';
      div.id='swContainer';
      div.innerHTML='<div id="wrapper" class="swiper-wrapper"></div><div class="swiper-pagination"></div>';
      componentsContainer.appendChild(div);
     
      var mySwiper =  new Swiper('.swiper-container',{
      
        pagination: '.swiper-pagination',
        paginationClickable: true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView:'auto',       
       
        initialSlide:0,
        
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : false
        }
        
      }); 

      for(var i=0;i<ordered_cmps.length;i++){    
        var div=document.createElement('div'); 

        div.className='swiper-slide';   
        div.id='slide'+ordered_cmps[i].id;
        var node = document.querySelector("#"+ordered_cmps[i].id);
        div.appendChild(node);
        mySwiper.appendSlide(div);
        mySwiper.update(true);
      }
      
      
      if(document.querySelector('x-media')){
          document.querySelector('x-media').play();
        }

      mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();



    }
    carousel.onOrientationChange = function (cmps){
      console.log("test");

    }
    carousel.onLayoutChangeEvent = function (cmps){
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
       mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
       
    }
    carousel.onPriorizeComponent=function(cmp){
        var clicked=cmp;
        var rendered=true;
        var _cmps = this.cmps;
        this.render(_cmps,rendered,clicked);
    }
    carousel.onResizeEvent=function(cmps){

      
      mediascape.AdaptationToolkit.Adaptation.UIAdaptation.updateComponentQuery();
    }
    carousel.unload = function(cmps){
      carousel.listeners.forEach (function(listener){
        for(var i=0;i<cmps.length;i++){
          
          
        }
      },this);
   
    }



    carousel.__moduleName = "carouselLayout";
    return carousel;

  }

  );
  window.oncontextmenu = function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
  };
