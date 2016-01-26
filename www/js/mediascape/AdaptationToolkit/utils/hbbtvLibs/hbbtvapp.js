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

  if (e.keyCode === KEY_NUM_1){
    mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSection("AddDevice",undefined);

  }
  if (e.keyCode === KEY_NUM_2){
    mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSection("layouts",undefined);

  }
  if (e.keyCode === KEY_NUM_3){
    mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSection("cameras",undefined);

  }
  if (e.keyCode === KEY_NUM_4){
    mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSection("twitter",undefined);

  }
  if (e.keyCode === KEY_NUM_6){
    mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSection("graphics",undefined);

  }
  if (e.keyCode === KEY_NUM_5){
    mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSection("radio",undefined);

  }
  if (e.keyCode === KEY_NUM_5){
    mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSection("radio",undefined);

  }
  if (e.keyCode === KEY_NUM_7){
      var me = mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgentId();
      mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.changeAgentlayout(me,"pip");
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeLayout(me,"pip");

  }
  if (e.keyCode === KEY_NUM_8){
      var me = mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgentId();
      mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.changeAgentlayout(me,"divided");
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeLayout(me,"divided");

  }
  if (e.keyCode === KEY_NUM_9){
      var me = mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgentId();
      mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.changeAgentlayout(me,"accordion");
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeLayout(me,"accordion");

  }
/*  if (e.keyCode === KEY_RIGHT){
      pointer.style.left=parseInt(pointer.style.left)+10;
  }
  if (e.keyCode === KEY_LEFT){
      pointer.style.left=parseInt(pointer.style.left)-10;
  }
  if (e.keyCode === KEY_UP){
      pointer.style.top=parseInt(pointer.style.top)-10;
  }
  if (e.keyCode === KEY_DOWN){
      pointer.style.top=parseInt(pointer.style.top)+10;
  }*/
  if (e.keyCode === KEY_BLUE){
      var debug = document.querySelector('#debug');
      debug.scrollTop = debug.scrollHeight-60;

  }
  if (e.keyCode === 16 || e.keyCode === 13 ){
           var scope = mediascape.AdaptationToolkit.uiComponents;
               try{
                if ( scope.ctrlPanel.showing) scope.ctrlPanel.hide();
                //else scope.ctrlPanel.show();
              }catch(err) {console.log(err)}
              scope.ctrlPanel.show();

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
