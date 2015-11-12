
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
/*   div.style.animationName="opa";
   div.style.animationDuration=time+"s";
   div.style.animationIterationCount=time;
   div.style.animationDirection="alternate";
   div.style.animationTimingFunction="ease-out";
   div.style.animationFillMode="forwards";
   div.style.animationDelay="0s";*/
   var img = document.createElement('img');
   img.id="loaderimg";
   img.src=centralImg;
   img.style.position="absolute";
   img.style.top="25%";
   img.style.left="25%";
   img.style.width='50%';
   //img.style.animationName="bounce";
   //img.style.animationDuration="2.5s";
   //img.style.animationIterationCount="infinite";
  // img.style.animationDirection="alternate";
   //img.style.animationTimingFunction="lineal";
//   img.style.animationFillMode="forwards";
   img.style.animationDelay="0s";
   div.appendChild(img);

   /*var loading=document.createElement('div');
   loading.id='floatingCirclesG';
   loading.style.top='50%';
   var loadingStyle=document.createElement('style');
   loadingStyle.innerHTML='#floatingCirclesG{ position:relative; width:125px; height:125px; margin:auto; transform:scale(0.6); -o-transform:scale(0.6);-ms-transform:scale(0.6); -webkit-transform:scale(0.6); -moz-transform:scale(0.6);} .f_circleG{ position:absolute; background-color:rgba(51, 204, 204, 0.1); height:22px; width:22px; border-radius:12px; -o-border-radius:12px; -ms-border-radius:12px; -webkit-border-radius:12px; -moz-border-radius:12px; animation-name:f_fadeG; -o-animation-name:f_fadeG; -ms-animation-name:f_fadeG; -webkit-animation-name:f_fadeG; -moz-animation-name:f_fadeG; animation-duration:1.2s; -o-animation-duration:1.2s; -ms-animation-duration:1.2s; -webkit-animation-duration:1.2s; -moz-animation-duration:1.2s; animation-iteration-count:infinite; -o-animation-iteration-count:infinite; -ms-animation-iteration-count:infinite; -webkit-animation-iteration-count:infinite; -moz-animation-iteration-count:infinite; animation-direction:normal; -o-animation-direction:normal; -ms-animation-direction:normal; -webkit-animation-direction:normal; -moz-animation-direction:normal;} #frotateG_01{left:0; top:51px; animation-delay:0.45s; -o-animation-delay:0.45s; -ms-animation-delay:0.45s; -webkit-animation-delay:0.45s;-moz-animation-delay:0.45s;}#frotateG_02{left:15px;top:15px;animation-delay:0.6s; -o-animation-delay:0.6s; -ms-animation-delay:0.6s; -webkit-animation-delay:0.6s;-moz-animation-delay:0.6s;}#frotateG_03{ left:51px;top:0;animation-delay:0.75s;-o-animation-delay:0.75s;-ms-animation-delay:0.75s; -webkit-animation-delay:0.75s; -moz-animation-delay:0.75s;} #frotateG_04{right:15px;top:15px;animation-delay:0.9s; -o-animation-delay:0.9s;  -ms-animation-delay:0.9s; -webkit-animation-delay:0.9s; -moz-animation-delay:0.9s;}#frotateG_05{right:0;top:51px; animation-delay:1.05s; -o-animation-delay:1.05s; -ms-animation-delay:1.05s; -webkit-animation-delay:1.05s; -moz-animation-delay:1.05s;}#frotateG_06{ right:15px; bottom:15px;  animation-delay:1.2s;    -o-animation-delay:1.2s;    -ms-animation-delay:1.2s;    -webkit-animation-delay:1.2s;    -moz-animation-delay:1.2s;}#frotateG_07{ left:51px;  bottom:0;  animation-delay:1.35s;    -o-animation-delay:1.35s;    -ms-animation-delay:1.35s;    -webkit-animation-delay:1.35s;    -moz-animation-delay:1.35s;}#frotateG_08{  left:15px;  bottom:15px;  animation-delay:1.5s;    -o-animation-delay:1.5s;    -ms-animation-delay:1.5s;    -webkit-animation-delay:1.5s;    -moz-animation-delay:1.5s;} @keyframes f_fadeG{  0%{    background-color:rgba(51, 204, 204, 1);  }  100%{    background-color:rgba(51, 204, 204, 0.3);  }}@-o-keyframes f_fadeG{  0%{    background-color:rgb(0,0,0);  }  100%{    background-color:rgb(255,255,255);  }}@-ms-keyframes f_fadeG{  0%{    background-color:rgb(0,0,0);  }  100%{    background-color:rgb(255,255,255);  }}@-webkit-keyframes f_fadeG{  0%{    background-color:rgb(0,0,0);  } 100%{  background-color:rgb(255,255,255);  }}@-moz-keyframes f_fadeG{  0%{    background-color:rgb(0,0,0);  }  100%{    background-color:rgb(255,255,255);  }}';
   for(var i=1;i<=8;i++){
     var circle=document.createElement('div');
     circle.id='frotateG_0'+i;
     circle.className='f_circleG';
     loading.appendChild(circle);
   }
   document.body.appendChild(loadingStyle);
   div.appendChild(loading);*/






   document.body.appendChild(div);



   setTimeout(function(){  document.body.removeChild(div);},time*1000);
}
document.addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    mediascape.AdaptationToolkit.uiComponents.toggleFullScreen();

  }
}, false);
