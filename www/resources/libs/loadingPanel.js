var loadingPanel = function (centralImg,time,cb){
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
   img.addEventListener('click',function(){
      mediascape.AdaptationToolkit.uiComponents.toggleFullScreen();

   });
   document.body.appendChild(div);
   document.addEventListener("motion-ready",function(e){
         var div1 = document.querySelector('#loadingPanel');
         document.body.removeChild(div1);
    },true);




}
document.addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    mediascape.AdaptationToolkit.uiComponents.toggleFullScreen();

  }
}, false);
