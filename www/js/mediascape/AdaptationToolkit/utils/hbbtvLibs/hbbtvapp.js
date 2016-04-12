function initApp() {

  try {
    var app = document['appmgr'].getOwnerApplication(document);
              app.show();

  } catch (e) {

  //  app.hide();
  }

    setKeyset(0x1+0x2+0x4+0x8+0x10+0x20+0x100);
}

document.addEventListener('keydown',function(e){

  if(e.keyCode===KEY_UP){
    if(document.querySelector('#fullTemp').style.display==='none'){
      if(document.querySelector('#showBottom').className!=='active'){
        var target=document.querySelector('#showBottom');
        var evt=new CustomEvent('click');
        target.dispatchEvent(evt);
      }
    }
  }
   if(e.keyCode===KEY_DOWN){
    if(document.querySelector('#fullTemp').style.display==='none'){
      if(document.querySelector('#showBottom').className==='active'){
        var target=document.querySelector('#showBottom');
        var evt=new CustomEvent('click');
        target.dispatchEvent(evt);
      }
    }
  }
  if(e.keyCode===KEY_PLAY){

      if(document.querySelector('.btn_stop').src.indexOf('Play')>-1){
        var target=document.querySelector('.btn_stop');
        var evt=new Event('click');
        target.dispatchEvent(evt);
      }

  }
  if(e.keyCode===KEY_PAUSE){
        var target=document.querySelector('#pauseBut');
        var evt=new Event('click');
        target.dispatchEvent(evt);

  }
  if(e.keyCode===KEY_FWD){

        var target=document.querySelector('.btn_r_dcha');
        var evt=new Event('click');
        target.dispatchEvent(evt);

  }
  if(e.keyCode===KEY_RWD){

        var target=document.querySelector('.btn_r_izda');
        var evt=new Event('click');
        target.dispatchEvent(evt);

  }
  if (e.keyCode === KEY_BLUE){
      debug.scrollTop = debug.scrollHeight-60;

  }
  if(e.keyCode===KEY_GREEN){
     document.querySelector('#hide').focus();
  }
  if(e.keyCode===KEY_RED){

    var scope = mediascape.AdaptationToolkit.uiComponents;
     try{
      if ( scope.ctrlPanel.showing) scope.ctrlPanel.hide();
      //else scope.ctrlPanel.show();
    }catch(err) {console.log(err)}
    scope.ctrlPanel.show();
    document.querySelector('#hide').focus();
  }
  if (e.keyCode === 16 || e.keyCode === 13 ){
      var evt = new CustomEvent("click");
      var target = e.target || e.srcElement;
      target.dispatchEvent(evt);
  }

},false);
document.addEventListener('DOMContentLoaded',function(e){
   /*var appMng = document.createElement('object');
   appMng.type="application/oipfApplicationManager";
   appMng.id="appmgr";
   appMng.style="position: absolute; left: 0px; top: 0px; width: 0px; height: 0px;";
   var oipcfg = document.createElement('object');
   oipcfg.type="application/oipfConfiguration";
   oipcfg.id="oipfcfg";
   oipcfg.style="position: absolute; left: 0px; top: 0px; width: 0px; height: 0px;";
   var media = document.createElement('object');
   media.type="video/broadcast";
   media.id="video";
   media.style="display:none;width:200px;height:100px;";
   document.body.appendChild(appMng);
   document.body.appendChild(oipcfg);
   document.body.appendChild(media);
   initApp();*/
});
