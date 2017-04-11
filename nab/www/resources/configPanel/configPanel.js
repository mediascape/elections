define('configPanel',['jquery','bootstrap','classifie'],
function($,bootstrap){

var JQuery = $;


var ControlPanel= function (url){

  this.items=[];
  this.activeSection='';
  this.activeDevice='';
  this.selfID='';
  this.selfIDNum='';
  this.selfDev='';
  this.showing=true;
  this.enabled=true;
  this.securityTime=3000;
  var devBox=null;
  var QRurl=url;
  var layoutSect1=null;
  var qrSect=null;
  var camerasSect=null;
  var graphicSect=null;
  var radioSect=null;
  var twitterSect=null;


  this.textos={
  "menu":[
    {
      "id":"stronghide",
      "eu":"itxi",
      "es":"cerrar"
    },
    {
      "id":"strongadd",
      "eu":"gehitu",
      "es":"añadir"
    },
    {
      "id":"stronglayouts",
      "eu":"layoutak",
      "es":"layouts"
    },
    {
      "id":"strongcameras",
      "eu":"kamarak",
      "es":"camaras"
    },
    {
      "id":"strongtwitter",
      "eu":"twitter",
      "es":"twitter"
    },
    /*{
      "id":"strongradio",
      "eu":"irratia",
      "es":"radio"
    },*/
    {
      "id":"stronggraphics",
      "eu":"grafikoak",
      "es":"graficos"
    },
    {
      "id":"strongfull",
      "eu":"osoan",
      "es":"completa"
    },
    {
      "id":"strongcloseapp",
      "eu":"itxi app",
      "es":"cerrar app"
    }
  ],
  "addDev":[
    {
      "id":"qrexplanation",
      "eu":"Irakurri QR kodea edo sartu URL-a beste gailu bat gehitzeko",
      "es":"Escanea el código QR o introduce la URL para añadir otro dispositivo"
    }
  ],
  "twitter":[
    {
      "id":"titTw",
      "eu":"Segi Twitterren",
      "es":"Sigue en Twitter"
    },
    {
      "id":"subTw",
      "eu":"#I25",
      "es":"#25S"
    }
  ],
  "graficos":[
    {
      "id":"ptablaresultsEitb1",
      "eu":"EMAITZEN TAULA",
      "es":"TABLA DE RESULTADOS"
    },
    {
      "id":"ptablaresultsEitb2",
      "eu":"EMAITZEN TAULA",
      "es":"TABLA DE RESULTADOS"
    },
    {
      "id":"pmaparesultsMap1",
      "eu":"EMAITZEN MAPA",
      "es":"MAPA DE RESULTADOS"
    },
    {
      "id":"pmaparesultsMap2",
      "eu":"EMAITZEN MAPA",
      "es":"MAPA DE RESULTADOS"
    },
    {
      "id":"pgraphgraficoSemi1",
      "eu":"SEKTOREAK EAEN",
      "es":"SECTORES EN CAV"
    },
    {
      "id":"pgraphgraficoSemi2",
      "eu":"SEKTOREAK ARABAN",
      "es":"SECTORES EN ALAVA"
    },
    {
      "id":"pgraphgraficoSemi3",
      "eu":"SEKTOREAK GIPUZKOAN",
      "es":"SECTORES EN GUIPUZCOA"
    },
    {
      "id":"pgraphgraficoSemi4",
      "eu":"SEKTOREAK BIZKAIAN",
      "es":"SECTORES EN BIZKAIA"
    },
    {
      "id":"conggraficoSemi2",
      "eu":"Kongresua",
      "es":"Congreso"
    },
    {
      "id":"sengraficoSemi2",
      "eu":"Senatua",
      "es":"Senado"
    },
    {
      "id":"conggraficoSemi1",
      "eu":"Kongresua",
      "es":"Congreso"
    },
    {
      "id":"sengraficoSemi1",
      "eu":"Senatua",
      "es":"Senado"
    },
    {
      "id":"congresultsMap1",
      "eu":"Kongresua",
      "es":"Congreso"
    },
    {
      "id":"senresultsMap1",
      "eu":"Senatua",
      "es":"Senado"
    },
    {
      "id":"congresultsMap2",
      "eu":"Kongresua",
      "es":"Congreso"
    },
    {
      "id":"senresultsMap2",
      "eu":"Senatua",
      "es":"Senado"
    },
    {
      "id":"congresultsEitb1",
      "eu":"Kongresua",
      "es":"Congreso"
    },
    {
      "id":"senresultsEitb1",
      "eu":"Senatua",
      "es":"Senado"
    },
    {
      "id":"congresultsEitb2",
      "eu":"Kongresua",
      "es":"Congreso"
    },
    {
      "id":"senresultsEitb2",
      "eu":"Senatua",
      "es":"Senado"
    }



  ]
};
  /* Kontruktorea gauza inizializatzen diren lekua */
  this.controlPanel = function(){

    var cmps=mediascape.AdaptationToolkit.componentManager.core.getComponents();
    console.log('Konstruktorea');
    //'../resources/configPanel/img/camara/logo_etb2.png'
    var comp='video2';

    function filterById(el){
      if(el.id===comp)return el;
    }
    var c=cmps.filter(filterById);

    /*var cam1=new camera();
    cam1.setID(c[0].getAttribute('compId'));
    cam1.setName(c[0].id);
    cam1.setImage('../resources/configPanel/img/camara/ETBSat.png');*/


    //comp='video2';
    //c=cmps.filter(filterById);
    var cam2=new camera();
    cam2.setID(c[0].getAttribute('compId'));
    cam2.setName(c[0].id);
    cam2.setImage('../resources/configPanel/img/camara/logos_partidos_PNV_BLANCO.png');

    comp='video3';
    c=cmps.filter(filterById);
    var cam3=new camera();
    cam3.setID(c[0].getAttribute('compId'));
    cam3.setName(c[0].id);
    cam3.setImage('../resources/configPanel/img/camara/logo_sozialista.png');

    comp='video4';
    c=cmps.filter(filterById);
    var cam4=new camera();
    cam4.setID(c[0].getAttribute('compId'));
    cam4.setName(c[0].id);
    cam4.setImage('../resources/configPanel/img/camara/logo_podemos.png');

    comp='video5';
    c=cmps.filter(filterById);
    var cam5=new camera();
    cam5.setID(c[0].getAttribute('compId'));
    cam5.setName(c[0].id);
    cam5.setImage('../resources/configPanel/img/camara/logo_bildu.png');

    comp='video6';
    c=cmps.filter(filterById);
    var cam6=new camera();
    cam6.setID(c[0].getAttribute('compId'));
    cam6.setName(c[0].id);
    cam6.setImage('../resources/configPanel/img/camara/logos_partidos_Populares_vascos_BLANCO.png');
/*
    comp='video7';
    c=cmps.filter(filterById);
    var cam7=new camera();
    cam7.setID(c[0].getAttribute('compId'));
    cam7.setName(c[0].id);
    cam7.setImage('../resources/configPanel/img/camara/logos_partidos_Podemos_BLANCO.png');*/

    comp='resultsEitb1';
    c=cmps.filter(filterById);
    var resTableA=new table();
    resTableA.setName(c[0].id);
    resTableA.setID(c[0].getAttribute('compId'));

    /*comp='resultsEitb2';
    c=cmps.filter(filterById);
    var resTableB=new table();
    resTableB.setName(c[0].id);
    resTableB.setID(c[0].getAttribute('compId'));*/

    /*comp='radio1';
    c=cmps.filter(filterById);
    var radioCompA=new radios();
    radioCompA.setName(c[0].id);
    radioCompA.setID(c[0].getAttribute('compId'));

    comp='radio2';
    c=cmps.filter(filterById);
    var radioCompB=new radios();
    radioCompB.setName(c[0].id);
    radioCompB.setID(c[0].getAttribute('compId'));*/





    comp='twitterViewer';
    c=cmps.filter(filterById);
    var twV=new hashtag();
    twV.setID(c[0].getAttribute('compId'));

    /*comp='twitterMap';
    c=cmps.filter(filterById);
    var twM=new trendingMap();
    twM.setID(c[0].getAttribute('compId'));*/

    comp='resultsMap1';
    c=cmps.filter(filterById);
    var resMapA=new partyMap();
    resMapA.setName(c[0].id);
    resMapA.setID(c[0].getAttribute('compId'));

    /*comp='resultsMap2';
    c=cmps.filter(filterById);
    var resMapB=new partyMap();
    resMapB.setName(c[0].id);
    resMapB.setID(c[0].getAttribute('compId'));*/

    comp='graficoSemi1';
    c=cmps.filter(filterById);
    var pieGraphA=new pieChart();
    pieGraphA.setName(c[0].id);
    pieGraphA.setID(c[0].getAttribute('compId'));

    comp='graficoSemi2';
    c=cmps.filter(filterById);
    var pieGraphB=new pieChart();
    pieGraphB.setName(c[0].id);
    pieGraphB.setID(c[0].getAttribute('compId'));

    comp='graficoSemi3';
    c=cmps.filter(filterById);
    var pieGraphC=new pieChart();
    pieGraphC.setName(c[0].id);
    pieGraphC.setID(c[0].getAttribute('compId'));

    comp='graficoSemi4';
    c=cmps.filter(filterById);
    var pieGraphD=new pieChart();
    pieGraphD.setName(c[0].id);
    pieGraphD.setID(c[0].getAttribute('compId'));


    camerasSect=new camerasSection();
    //camerasSect.addCamera(cam1);
    camerasSect.addCamera(cam2);
    camerasSect.addCamera(cam3);
    camerasSect.addCamera(cam4);
    camerasSect.addCamera(cam5);
    camerasSect.addCamera(cam6);
    //camerasSect.addCamera(cam7);


    graphicSect=new graphicSection();
    graphicSect.addTableComp(resTableA);
    //graphicSect.addTableComp(resTableB);

    graphicSect.addPartyMapComp(resMapA);
    //graphicSect.addPartyMapComp(resMapB);
    graphicSect.addPieComp(pieGraphA);
    graphicSect.addPieComp(pieGraphB);
    graphicSect.addPieComp(pieGraphC);
    graphicSect.addPieComp(pieGraphD);

    /*radioSect=new radioSection();
    radioSect.addComponent(radioCompA);
    radioSect.addComponent(radioCompB);*/

    twitterSect=new twitterSection();
    twitterSect.addViewerComp(twV);
    //twitterSect.addMapComp(twM);

    devBox=new deviceBox();
    /*var lay1=new layout();
    lay1.setName('menu');
    lay1.setImage('../resources/configPanel/img/layouts/layout_01.png');

    var lay2=new layout();
    lay2.setName('spinner');
    lay2.setImage('../resources/configPanel/img/layouts/layout_02.png');*/

    var lay3=new layout();
    lay3.setName('pip');
    lay3.setImage('../resources/configPanel/img/layouts/layout_03.png');

   /* var lay4=new layout();
    lay4.setName('customGrid');
    lay4.setImage('../resources/configPanel/img/layouts/layout_10.png');*/

    /*var lay5=new layout();
    lay5.setName('accordion');
    lay5.setImage('../resources/configPanel/img/layouts/layout_05.png');

    var lay6=new layout();
    lay6.setName('verticalMenu');
    lay6.setImage('../resources/configPanel/img/layouts/layout_06.png');

    var lay7=new layout();
    lay7.setName('horizontal');
    lay7.setImage('../resources/configPanel/img/layouts/layout_09.png');*/

    /*var lay8=new layout();
    lay8.setName('carousel');
    lay8.setImage('../resources/configPanel/img/layouts/layout_08.png');*/

    var lay9=new layout();
    lay9.setName('divided');
    lay9.setImage('../resources/configPanel/img/layouts/layout_06.png');

    var lay11=new layout();
    lay11.setName('pipGrid');
    lay11.setImage('../resources/configPanel/img/layouts/layout_11.png');



    layoutSect1=new layoutSection();
    //layoutSect1.addLayout(lay1);
    //layoutSect1.addLayout(lay2);
    layoutSect1.addLayout(lay3);
    //layoutSect1.addLayout(lay4);
    //layoutSect1.addLayout(lay5);
    //layoutSect1.addLayout(lay6);
    //layoutSect1.addLayout(lay7);
    //layoutSect1.addLayout(lay8);
    layoutSect1.addLayout(lay9);
    layoutSect1.addLayout(lay11);
    qrSect=new qrSection(QRurl);

    //sidebar menu
    var menu1=new menu();

    var item1=new menuItem();
    item1.setTextId('strongadd');
    item1.setText('Add device');
    item1.setIcon('zmdi zmdi-plus');
    item1.setSection('AddDevice');
    menu1.addItem(item1);

    var item2=new menuItem();
    item2.setTextId('stronglayouts')
    item2.setText('Layouts');
    item2.setIcon('zmdi zmdi-view-quilt');
    item2.setSection('layouts');
    menu1.addItem(item2);



    var item3=new menuItem();
    item3.setTextId('strongcameras');
    item3.setText('Cameras');
    item3.setIcon('zmdi zmdi-videocam');
    item3.setSection('cameras');
    menu1.addItem(item3);

    var item4=new menuItem();
    item4.setTextId('strongtwitter');
    item4.setText('Twitter');
    item4.setIcon('zmdi zmdi-twitter');
    item4.setSection('twitter');
    menu1.addItem(item4);

    /*var item5=new menuItem();
    item5.setTextId('strongradio');
    item5.setText('Radio');
    item5.setIcon('zmdi zmdi-radio');
    item5.setSection('radio');
    menu1.addItem(item5);*/

    var item6=new menuItem();
    item6.setTextId('stronggraphics');
    item6.setText('Graphics');
    item6.setIcon('zmdi zmdi-equalizer');
    item6.setSection('graphics');
    menu1.addItem(item6);




    this.addItem(menu1);



    document.body.appendChild(this.render(''));
    mediascape.AdaptationToolkit.Utils.enableCameraAdmin();





  }
  this.addItem=function(item){
    this.items.push(item);
  }
  this.addItemPos=function(item,pos){
    this.items.splice(pos,0,item);
  }
  this.removeItem=function(itemName){
    for(var i=0;i<this.items.length;i++){
      if(this.items[i].name===itemName){
        this.items.splice(i,1);
      }
    }
  }
  this.onAgentChange = function (event){

    var container=document.querySelector('#fullTemp');
    if(mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAppAttribute('language')===undefined){
       if(window.location.href.indexOf('?lang')>-1){
          var notLang=mediascape.AdaptationToolkit.Utils.getUrlVar('lang');
       }else{
          var notLang='eu';
       }

    }
    else{
       var notLang=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAppAttribute('language');
    }
    if(mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext().agents.length===1 &&
      event.detail.status==='join'){
        if(event.detail.profile.deviceType.toLowerCase()==='tv'){
          mediascape.AdaptationToolkit.uiComponents.qrNotification(notLang,'tv');

        }
        else{
          mediascape.AdaptationToolkit.uiComponents.qrNotification(notLang,'other');
        }
    }
    else{
      if(event.detail.status==='join'){

        mediascape.AdaptationToolkit.uiComponents.connectedNotification(notLang);
      }
      else if(event.detail.status==='left'){
        mediascape.AdaptationToolkit.uiComponents.disconnectedNotification(notLang);
      }
    }
    var _this=this;
    setTimeout(function(){
    if (event.detail.status === "join"){
      /* Gehitu gailua */
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.selfID=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgentId();
      var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();


      var agents=agCtx.agents;
      var val=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.selfID;
      function filterById(el){
        if(el.id===val)return el;
      }

      var a=agents.filter(filterById);


      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.selfIDNum=a[0]._id+1;

      var val=event.detail.agentid;
      var b=agents.filter(filterById);





      if(agCtx.agents.length>1 && devBox.devices.length===0)
      {
        for(var i=0;i<agCtx.agents.length;i++){
          var dev1=new device();

          if(agCtx.agents[i].capabilities.platform.deviceType.toLowerCase()==='tv'){
            if((agCtx.agents[i]._id+1)<=9){
              dev1.setIcon('TV_'+(agCtx.agents[i]._id+1)+'.png');
            }
            else{
              dev1.setIcon('TV_default.png');
            }
          }
          else if(agCtx.agents[i].capabilities.platform.deviceType.toLowerCase()==='desktop')
          {
            if((agCtx.agents[i]._id+1)<=9){
              dev1.setIcon('LAPTOP_'+(agCtx.agents[i]._id+1)+'.png');
            }
            else{
              dev1.setIcon('LAPTOP_default.png');
            }
          }
          else if(agCtx.agents[i].capabilities.platform.deviceType==='Tablet')
          {
            if((agCtx.agents[i]._id+1)<=9){
              dev1.setIcon('TABLET_'+(agCtx.agents[i]._id+1)+'.png');
            }
            else{
              dev1.setIcon('TABLET_default.png');
            }
          }
          else if(agCtx.agents[i].capabilities.platform.deviceType.toLowerCase()==='mobile')
          {
            if((agCtx.agents[i]._id+1)<=9){
              dev1.setIcon('MOVIL_'+(agCtx.agents[i]._id+1)+'.png');
            }
            else{
              dev1.setIcon('MOVIL_default.png');
            }
          }
          if(agCtx.agents[i].id===mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgentId()){
            _this.selfDev='../resources/configPanel/img/devices/'+dev1.icon;
            document.querySelector('#devNum').setAttribute('src','../resources/configPanel/img/devices/'+dev1.icon);
            document.querySelector('#tabDevId').setAttribute('src','../resources/configPanel/img/devices/'+dev1.icon);

          }
          dev1.setID(agCtx.agents[i].id);






          if(i===0){
            var section2=new section();
            section2.setName('AddDevice');
            section2.addItem(qrSect);
            _this.addItem(section2);
            container.appendChild(section2.render());
          }

          var section1=new section();
          section1.setName(agCtx.agents[i].id+'layouts');
          section1.addItem(devBox);
          layoutSect1.setActiveLayout(agCtx.agents[i].capabilities.layoutStatus);
          section1.addItem(layoutSect1);
          _this.addItem(section1);
          container.appendChild(section1.render());

          var section3=new section();
          section3.setName(agCtx.agents[i].id+'cameras');
          section3.addItem(devBox);
          camerasSect.setCamsViewStatus(agCtx.agents[i].id);
          camerasSect.setCamsSoundStatus(agCtx.agents[i].id);
          section3.addItem(camerasSect);
          _this.addItem(section3);
          if(agCtx.agents[i].capabilities.platform.deviceType.toLowerCase()==='tv'){
            container.appendChild(section3.render('tv'));
          }
          else{
            container.appendChild(section3.render('other'));
          }


          var section4=new section();
          section4.setName(agCtx.agents[i].id+'twitter');
          section4.addItem(devBox);
          twitterSect.setViewerViewStatus(agCtx.agents[i].id);
          //twitterSect.setViewerHTStatus(agCtx.agents[i].id);
          //twitterSect.setMapViewStatus(agCtx.agents[i].id);
          section4.addItem(twitterSect);
          _this.addItem(section4);
          container.appendChild(section4.render());

          /*var section5=new section();
          section5.setName(agCtx.agents[i].id+'radio');
          section5.addItem(devBox);
          radioSect.setRadioViewStatus(agCtx.agents[i].id);
          section5.addItem(radioSect);
          _this.addItem(section5);
          if(agCtx.agents[i].capabilities.platform.deviceType.toLowerCase()==='tv'){
            container.appendChild(section5.render('tv'));
          }
          else{
            container.appendChild(section5.render('other'));
          }*/

          var section6=new section();
          section6.setName(agCtx.agents[i].id+'graphics');
          section6.addItem(devBox);
          graphicSect.setTableViewStatus(agCtx.agents[i].id);
          graphicSect.setTablePlaceStatus(agCtx.agents[i].id);
          graphicSect.setTableTipoStatus(agCtx.agents[i].id);
          graphicSect.setPieViewStatus(agCtx.agents[i].id);
          graphicSect.setPiePlaceStatus(agCtx.agents[i].id);
          graphicSect.setPieTipoStatus(agCtx.agents[i].id);
          graphicSect.setPartyMapViewStatus(agCtx.agents[i].id);
          graphicSect.setPartyMapLugarStatus(agCtx.agents[i].id);
          graphicSect.setPartyMapTipoStatus(agCtx.agents[i].id);
          section6.addItem(graphicSect);
          _this.addItem(section6);
          container.appendChild(section6.render());


          devBox.addDevice(dev1);

        }

        var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
        var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
        var sectionDiv=document.querySelector('#fullTemp').children;
        for(var i=2;i<sectionNum;i++){
          sectionDiv[i].replaceChild(devBox.render(),sectionDiv[i].children[0]);
        }


      }
      else{
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.selfID=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgentId();
        var dev1=new device();

        if(event.detail.profile.deviceType==='TV'){
          if((b[0]._id+1)<=9){
            dev1.setIcon('TV_'+(b[0]._id+1)+'.png');
          }
          else{
            dev1.setIcon('TV_default.png');
          }
        }
        else if(event.detail.profile.deviceType.toLowerCase()==='desktop')
        {
          if((b[0]._id+1)<=9){
            dev1.setIcon('LAPTOP_'+(b[0]._id+1)+'.png');
          }
          else{
            dev1.setIcon('LAPTOP_default.png');
          }
        }
        else if(event.detail.profile.deviceType==='Tablet')
        {
          if((b[0]._id+1)<=9){
            dev1.setIcon('TABLET_'+(b[0]._id+1)+'.png');
          }
          else{
            dev1.setIcon('TABLET_default.png');
          }
        }
        else if(event.detail.profile.deviceType.toLowerCase()==='mobile')
        {
          if((b[0]._id+1)<=9){
            dev1.setIcon('MOVIL_'+(b[0]._id+1)+'.png');
          }
          else{
             dev1.setIcon('MOVIL_default.png');
          }
        }
        if(b[0].id===mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgentId()){
          _this.selfDev='../resources/configPanel/img/devices/'+dev1.icon;
          document.querySelector('#devNum').setAttribute('src','../resources/configPanel/img/devices/'+dev1.icon);
          document.querySelector('#tabDevId').setAttribute('src','../resources/configPanel/img/devices/'+dev1.icon);
        }

        if(devBox.devices.length===0)
        {
          dev1.setID(event.detail.agentid);







          var section2=new section();
          section2.setName('AddDevice');
          section2.addItem(qrSect);
          _this.addItem(section2);
          container.appendChild(section2.render());

          var section1=new section();
          section1.setName(event.detail.agentid+'layouts');
          section1.addItem(devBox);
          layoutSect1.setActiveLayout(b[0].capabilities.layoutStatus);
          section1.addItem(layoutSect1);
          _this.addItem(section1);
          container.appendChild(section1.render());



          var section3=new section();
          section3.setName(event.detail.agentid+'cameras');
          section3.addItem(devBox);
          camerasSect.setCamsViewStatus(event.detail.agentid);
          camerasSect.setCamsSoundStatus(event.detail.agentid);
          section3.addItem(camerasSect);
          _this.addItem(section3);

          if(event.detail.profile.deviceType.toLowerCase()==='tv')
          {
            container.appendChild(section3.render('tv'));
          }
          else{
            container.appendChild(section3.render('other'));
          }

          var section4=new section();
          section4.setName(event.detail.agentid+'twitter');
          section4.addItem(devBox);
          twitterSect.setViewerViewStatus(event.detail.agentid);
          //twitterSect.setViewerHTStatus(event.detail.agentid);
          //twitterSect.setMapViewStatus(event.detail.agentid);
          section4.addItem(twitterSect);
          _this.addItem(section4);
          container.appendChild(section4.render());

          /*var section5=new section();
          section5.setName(event.detail.agentid+'radio');
          section5.addItem(devBox);
          radioSect.setRadioViewStatus(event.detail.agentid);
          section5.addItem(radioSect);
          _this.addItem(section5);
          if(event.detail.profile.deviceType.toLowerCase()==='tv')
          {
            container.appendChild(section5.render('tv'));
          }
          else{
            container.appendChild(section5.render('other'));
          }*/

          var section6=new section();
          section6.setName(event.detail.agentid+'graphics');
          section6.addItem(devBox);
          graphicSect.setTableViewStatus(event.detail.agentid);
          graphicSect.setTablePlaceStatus(event.detail.agentid);
          graphicSect.setTableTipoStatus(event.detail.agentid);
          graphicSect.setPieViewStatus(event.detail.agentid);
          graphicSect.setPiePlaceStatus(event.detail.agentid);
          graphicSect.setPieTipoStatus(event.detail.agentid);
          graphicSect.setPartyMapViewStatus(event.detail.agentid);
          graphicSect.setPartyMapLugarStatus(event.detail.agentid);
          graphicSect.setPartyMapTipoStatus(event.detail.agentid);
          section6.addItem(graphicSect);
          _this.addItem(section6);
          container.appendChild(section6.render());




        }
        else{
          dev1.setID(event.detail.agentid);
          var section1=new section();
          section1.setName(event.detail.agentid+'layouts');
          section1.addItem(devBox);
          layoutSect1.setActiveLayout(b[0].capabilities.layoutStatus);
          section1.addItem(layoutSect1);
          _this.addItem(section1);
          container.appendChild(section1.render());

          var section3=new section();
          section3.setName(event.detail.agentid+'cameras');
          section3.addItem(devBox);
          camerasSect.setCamsViewStatus(event.detail.agentid);
          camerasSect.setCamsSoundStatus(event.detail.agentid);
          section3.addItem(camerasSect);
          _this.addItem(section3);
          if(event.detail.profile.deviceType.toLowerCase()==='tv')
          {
            container.appendChild(section3.render('tv'));
          }
          else{
            container.appendChild(section3.render('other'));
          }

          var section4=new section();
          section4.setName(event.detail.agentid+'twitter');
          section4.addItem(devBox);
          twitterSect.setViewerViewStatus(event.detail.agentid);
          //twitterSect.setViewerHTStatus(event.detail.agentid);
          //twitterSect.setMapViewStatus(event.detail.agentid);
          section4.addItem(twitterSect);
          _this.addItem(section4);
          container.appendChild(section4.render());

         /* var section5=new section();
          section5.setName(event.detail.agentid+'radio');
          section5.addItem(devBox);
          radioSect.setRadioViewStatus(event.detail.agentid);
          section5.addItem(radioSect);
          _this.addItem(section5);
          if(event.detail.profile.deviceType.toLowerCase()==='tv')
          {
            container.appendChild(section5.render('tv'));
          }
          else{
            container.appendChild(section5.render('other'));
          }*/

          var section6=new section();
          section6.setName(event.detail.agentid+'graphics');
          section6.addItem(devBox);
          graphicSect.setTableViewStatus(event.detail.agentid);
          graphicSect.setTablePlaceStatus(event.detail.agentid);
          graphicSect.setTableTipoStatus(event.detail.agentid);
          graphicSect.setPieViewStatus(event.detail.agentid);
          graphicSect.setPiePlaceStatus(event.detail.agentid);
          graphicSect.setPieTipoStatus(event.detail.agentid);
          graphicSect.setPartyMapViewStatus(event.detail.agentid);
          graphicSect.setPartyMapLugarStatus(event.detail.agentid);
          graphicSect.setPartyMapTipoStatus(event.detail.agentid);
          section6.addItem(graphicSect);
          _this.addItem(section6);
          container.appendChild(section6.render());




        }
        devBox.addDevice(dev1);

        var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
        var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
        var sectionDiv=document.querySelector('#fullTemp').children;

        for(var i=2;i<sectionNum;i++){

          if(sections[i].name.indexOf('cameras')>-1 && sections[i].name.indexOf(event.detail.agentid)===-1){
            var sectionToReplace=new section();
            sectionToReplace.setName(sections[i].name);
            sectionToReplace.addItem(devBox);
            var dc=sections[i].name.split('cameras')[0];
            function filterByIdD(el){
              if(el.id===dc)return el;
            }
            var dtc=sections[i].items[0].devices.filter(filterByIdD);
            camerasSect.setCamsViewStatus(sections[i].name.split('cameras')[0]);
            camerasSect.setCamsSoundStatus(sections[i].name.split('cameras')[0]);
            sectionToReplace.addItem(camerasSect);
            _this.removeItem(sections[i].name);

            _this.addItemPos(sectionToReplace,i);
            if(dtc[0].icon.indexOf('TV')>-1){
              container.replaceChild(sectionToReplace.render('tv'),sectionDiv[i]);
            }
            else{
              container.replaceChild(sectionToReplace.render('other'),sectionDiv[i]);
            }

          }
          else{
            sectionDiv[i].replaceChild(devBox.render(),sectionDiv[i].children[0]);
          }
        }
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSection(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeSection,undefined);
      }
      if(agents.length===1 && event.detail.profile.deviceType.toLowerCase()==='tv'){
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.show();
        document.querySelector('#hide').focus();
      }else{
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.hide();
      }
      if(mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAppAttribute('language')===undefined){

        if(window.location.href.indexOf('?lang')>-1){
           mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setAppAttribute('language',mediascape.AdaptationToolkit.Utils.getUrlVar('lang'));
       }else{
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setAppAttribute('language','eu');
       }
      }
      else{
        var l=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAppAttribute('language');
        if(l==='es' || l==='eu'){
          var elToChange1=document.querySelector('#fullTemp').querySelectorAll('#arMun');
          var elToChange2=document.querySelector('#fullTemp').querySelectorAll('#vizMun');
          var elToChange3=document.querySelector('#fullTemp').querySelectorAll('#gipMun');
          //var elToChange4=document.querySelector('#fullTemp').querySelectorAll('#navMun');
          if(l==='es'){
            document.querySelector('#langes').className='active';
            document.querySelector('#langeu').className='';
            for(var k=0;k<elToChange1.length;k++){
              elToChange1[k].label='Municipios de Alava';
              elToChange2[k].label='Municipios de Bizkaia';
              elToChange3[k].label='Municipios de Guipuzcoa';
              //elToChange4[k].label='Municipios de Navarra';

            }
            document.querySelector('#loadingNotif').src='../resources/images/cargandoes.png';

          }
          else if(l==='eu'){
            document.querySelector('#langeu').className='active';
            document.querySelector('#langes').className='';

            for(var k=0;k<elToChange1.length;k++){
              elToChange1[k].label='Arabako udalerriak';
              elToChange2[k].label='Bizkaiako udalerriak';
              elToChange3[k].label='Gipuzkoako udalerriak';
              //elToChange4[k].label='Nafarroako udalerriak';

            }
            document.querySelector('#loadingNotif').src='../resources/images/cargandoeu.png';


          }
          if(document.querySelector('#qrNotif')!==null){
            document.querySelector('#qrNotif').src=document.querySelector('#qrNotif').src.split('notif')[0]+'notif'+l+'.png';
          }
          for(var i=0;i<_this.textos.menu.length;i++){
            if(document.querySelector('#fullTemp').querySelector('#'+_this.textos.menu[i].id)!==null){
              document.querySelector('#fullTemp').querySelector('#'+_this.textos.menu[i].id).innerHTML=_this.textos.menu[i][l];
            }
          }
          for(var i=0;i<_this.textos.addDev.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+_this.textos.addDev[i].id);
            for(var k=0;k<elToChange.length;k++){
              elToChange[k].innerHTML=_this.textos.addDev[i][l];
            }

          }
          for(var i=0;i<_this.textos.twitter.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+_this.textos.twitter[i].id);
            for(var k=0;k<elToChange.length;k++){
              elToChange[k].innerHTML=_this.textos.twitter[i][l];
            }

          }
          for(var i=0;i<_this.textos.graficos.length;i++){

            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+_this.textos.graficos[i].id);
            for(var k=0;k<elToChange.length;k++){
              elToChange[k].innerHTML=_this.textos.graficos[i][l];
            }
          }
          var gen={"zonas":[{"Z":1,"N":"Alava-Araba","O":28,"NE":"Araba","NC":"Alava","C":1984},{"Z":2,"N":"Vizcaya","O":28,"NE":"Bizkaia","NC":"Bizkaia","C":1984},{"Z":3,"N":"Guipuzcoa","O":28,"NE":"Gipuzkoa","NC":"Guipúzcoa","C":1984},{"Z":5,"N":"CAV-EAE","O":28,"NE":"EAE","NC":"CAV","C":1984}]};
          var ar={"zonas":[{"Z":1001,"N":"Alegría-Dulantzi","O":28,"NE":"Dulantzi","NC":"Alegría-Dulantzi","C":1984},{"Z":1002,"N":"Amurrio","O":29,"NE":"Amurrio","NC":"Amurrio","C":8139},{"Z":1049,"N":"Añana","O":63,"NE":"Añana","NC":"Añana","C":140},{"Z":1003,"N":"Aramaio","O":30,"NE":"Aramaio","NC":"Aramaio","C":1186},{"Z":1006,"N":"Armiñón","O":32,"NE":"Armiñon","NC":"Armiñón","C":176},{"Z":1037,"N":"Arraia-Maeztu","O":55,"NE":"Arraia-Maeztu","NC":"Arraia-Maeztu","C":586},{"Z":1008,"N":"Arratzua-Ubarrundia","O":33,"NE":"Arratzua-Ubarrundia","NC":"Arratzua-Ubarrundia","C":790},{"Z":1004,"N":"Artziniega","O":31,"NE":"Artziniega","NC":"Artziniega","C":1405},{"Z":1009,"N":"Asparrena","O":34,"NE":"Asparrena","NC":"Asparrena","C":1281},{"Z":1010,"N":"Ayala/Aiara","O":35,"NE":"Aiara","NC":"Ayala","C":2275},{"Z":1011,"N":"Baños de Ebro/Mañueta","O":36,"NE":"Mañueta","NC":"Baños de Ebro","C":237},{"Z":1013,"N":"Barrundia","O":37,"NE":"Barrundia","NC":"Barrundia","C":711},{"Z":1014,"N":"Berantevilla","O":38,"NE":"Berantevilla","NC":"Berantevilla","C":372},{"Z":1016,"N":"Bernedo","O":39,"NE":"Bernedo","NC":"Bernedo","C":439},{"Z":1017,"N":"Campezo/Kanpezu","O":40,"NE":"Kanpezu","NC":"Campezo","C":869},{"Z":1021,"N":"Elburgo/Burgelu","O":44,"NE":"Burgu","NC":"Elburgo","C":460},{"Z":1022,"N":"Elciego","O":45,"NE":"Eltziego","NC":"Elciego","C":805},{"Z":1023,"N":"Elvillar/Bilar","O":46,"NE":"Bilar","NC":"Elvillar","C":269},{"Z":1901,"N":"Iruña Oka/Iruña de Oca","O":76,"NE":"Iruña Oka","NC":"Iruña de Oca","C":2344},{"Z":1027,"N":"Iruraiz-Gauna","O":47,"NE":"Iruraitz-Gauna","NC":"Iruraitz-Gauna","C":416},{"Z":1019,"N":"Kripan","O":42,"NE":"Kripan","NC":"Kripan","C":144},{"Z":1020,"N":"Kuartango","O":43,"NE":"Kuartango","NC":"Kuartango","C":326},{"Z":1028,"N":"Labastida","O":48,"NE":"Bastida","NC":"Labastida","C":1077},{"Z":1030,"N":"Lagrán","O":49,"NE":"Lagran","NC":"Lagrán","C":159},{"Z":1031,"N":"Laguardia","O":50,"NE":"Guardia","NC":"Laguardia","C":1183},{"Z":1032,"N":"Lanciego/Lantziego","O":51,"NE":"Lantziego","NC":"Lanciego","C":522},{"Z":1902,"N":"Lantarón","O":77,"NE":"Lantaron","NC":"Lantarón","C":738},{"Z":1033,"N":"Lapuebla de Labarca","O":52,"NE":"Lapuebla de Labarca","NC":"Lapuebla de Labarca","C":649},{"Z":1058,"N":"Legutiano","O":71,"NE":"Legutio","NC":"Legutio","C":1327},{"Z":1034,"N":"Leza","O":53,"NE":"Leza","NC":"Leza","C":165},{"Z":1036,"N":"Llodio/Laudio","O":54,"NE":"Laudio","NC":"Llodio","C":15034},{"Z":1039,"N":"Moreda de Alava","O":56,"NE":"Moreda Araba","NC":"Moreda de Alava","C":202},{"Z":1041,"N":"Navaridas","O":57,"NE":"Navaridas","NC":"Navaridas","C":153},{"Z":1042,"N":"Okondo","O":58,"NE":"Okondo","NC":"Okondo","C":901},{"Z":1043,"N":"Oyón/Oion","O":59,"NE":"Oion","NC":"Oyón","C":2318},{"Z":1044,"N":"Peñacerrada-Urizaharra","O":60,"NE":"Urizaharra","NC":"Peñacerrada","C":236},{"Z":1046,"N":"Ribera Alta","O":61,"NE":"Erriberagoitia","NC":"Ribera Alta","C":594},{"Z":1047,"N":"Ribera Baja/Erribera Beitia","O":62,"NE":"Erriberabeitia","NC":"Ribera Baja","C":964},{"Z":1051,"N":"Salvatierra/Agurain","O":64,"NE":"Agurain","NC":"Salvatierra","C":3606},{"Z":1052,"N":"Samaniego","O":65,"NE":"Samaniego","NC":"Samaniego","C":244},{"Z":1053,"N":"San Millán/Donemiliaga","O":66,"NE":"Donemiliaga","NC":"San Millán","C":587},{"Z":1054,"N":"Urkabustaiz","O":67,"NE":"Urkabustaiz","NC":"Urkabustaiz","C":952},{"Z":1055,"N":"Valdegovía/Gaubea","O":68,"NE":"Gaubea","NC":"Valdegovía","C":836},{"Z":1056,"N":"Harana/Valle de Arana","O":69,"NE":"Harana","NC":"Valle de Arana","C":218},{"Z":1057,"N":"Villabuena de Alava/Eskuernaga","O":70,"NE":"Villabuena","NC":"Villabuena de Alava","C":245},{"Z":10,"N":"Gasteiz","O":7,"NE":"Gasteiz","NC":"Vitoria-Gasteiz","C":186354},{"Z":1060,"N":"Yécora/Iekora","O":72,"NE":"Ekora","NC":"Yécora","C":199},{"Z":1061,"N":"Zalduondo","O":73,"NE":"Zalduondo","NC":"Zalduondo","C":153},{"Z":1062,"N":"Zambrana","O":74,"NE":"Zanbrana","NC":"Zambrana","C":314},{"Z":1018,"N":"Zigoitia","O":41,"NE":"Zigoitia","NC":"Zigoitia","C":1370},{"Z":1063,"N":"Zuia","O":75,"NE":"Zuia","NC":"Zuia","C":1799}]};
          var viz={"zonas":[{"Z":2001,"N":"Abadiño","O":81,"NE":"Abadiño","NC":"Abadiño","C":5832},{"Z":2002,"N":"Abanto y Ciérvana/Abanto Zierbena","O":82,"NE":"Abanto","NC":"Abanto y Ciérvana","C":7851},{"Z":2911,"N":"Ajangiz","O":187,"NE":"Ajangiz","NC":"Ajangiz","C":382},{"Z":2912,"N":"Alonsotegi","O":188,"NE":"Alonsotegi","NC":"Alonsotegi","C":2308},{"Z":2003,"N":"Amorebieta-Etxano","O":83,"NE":"Zornotza","NC":"Amorebieta-Etxano","C":14338},{"Z":2004,"N":"Amoroto","O":84,"NE":"Amoroto","NC":"Amoroto","C":334},{"Z":2005,"N":"Arakaldo","O":85,"NE":"Arakaldo","NC":"Arakaldo","C":117},{"Z":2006,"N":"Arantzazu","O":86,"NE":"Arantzazu","NC":"Arantzazu","C":289},{"Z":2093,"N":"Areatza","O":172,"NE":"Areatza","NC":"Areatza","C":900},{"Z":2009,"N":"Arrankudiaga","O":89,"NE":"Arrankudiaga","NC":"Arrankudiaga","C":786},{"Z":2914,"N":"Arratzu","O":190,"NE":"Arratzu","NC":"Arratzu","C":330},{"Z":2010,"N":"Arrieta","O":90,"NE":"Arrieta","NC":"Arrieta","C":457},{"Z":2011,"N":"Arrigorriaga","O":91,"NE":"Arrigorriaga","NC":"Arrigorriaga","C":9692},{"Z":2023,"N":"Artea","O":102,"NE":"Arteaga","NC":"Artea","C":594},{"Z":2008,"N":"Arcentales","O":88,"NE":"Artzentales","NC":"Artzentales","C":617},{"Z":2091,"N":"Atxondo","O":170,"NE":"Atxondo","NC":"Atxondo","C":1134},{"Z":2070,"N":"Aulesti","O":149,"NE":"Aulesti","NC":"Aulesti","C":545},{"Z":2012,"N":"Bakio","O":92,"NE":"Bakio","NC":"Bakio","C":2041},{"Z":2090,"N":"Balmaseda","O":169,"NE":"Balmaseda","NC":"Balmaseda","C":6022},{"Z":2013,"N":"Barakaldo","O":93,"NE":"Barakaldo","NC":"Barakaldo","C":79984},{"Z":2014,"N":"Barrika","O":94,"NE":"Barrika","NC":"Barrika","C":1218},{"Z":2015,"N":"Basauri","O":95,"NE":"Basauri","NC":"Basauri","C":33690},{"Z":2092,"N":"Bedia","O":171,"NE":"Bedia","NC":"Bedia","C":837},{"Z":2016,"N":"Berango","O":96,"NE":"Berango","NC":"Berango","C":5260},{"Z":2017,"N":"Bermeo","O":97,"NE":"Bermeo","NC":"Bermeo","C":13290},{"Z":2018,"N":"Berriatua","O":98,"NE":"Berriatua","NC":"Berriatua","C":875},{"Z":2019,"N":"Berriz","O":99,"NE":"Berriz","NC":"Berriz","C":3594},{"Z":20,"N":"Bilbao","O":8,"NE":"Bilbo","NC":"Bilbao","C":274076},{"Z":2021,"N":"Busturia","O":100,"NE":"Busturia","NC":"Busturia","C":1352},{"Z":2901,"N":"Derio","O":177,"NE":"Derio","NC":"Derio","C":4775},{"Z":2026,"N":"Dima","O":105,"NE":"Dima","NC":"Dima","C":1134},{"Z":2027,"N":"Durango","O":106,"NE":"Durango","NC":"Durango","C":22033},{"Z":2028,"N":"Ea","O":107,"NE":"Ea","NC":"Ea","C":715},{"Z":2031,"N":"Elantxobe","O":110,"NE":"Elantxobe","NC":"Elantxobe","C":340},{"Z":2032,"N":"Elorrio","O":111,"NE":"Elorrio","NC":"Elorrio","C":5735},{"Z":2902,"N":"Erandio","O":178,"NE":"Erandio","NC":"Erandio","C":19124},{"Z":2033,"N":"Ereño","O":112,"NE":"Ereño","NC":"Ereño","C":215},{"Z":2034,"N":"Ermua","O":113,"NE":"Ermua","NC":"Ermua","C":12902},{"Z":2079,"N":"Errigoiti","O":158,"NE":"Errigoiti","NC":"Errigoiti","C":425},{"Z":2029,"N":"Etxebarri Anteiglesia de San Esteban","O":108,"NE":"Etxebarri","NC":"Etxebarri","C":8332},{"Z":2030,"N":"Etxebarria","O":109,"NE":"Etxebarria","NC":"Etxebarria","C":608},{"Z":2906,"N":"Forua","O":182,"NE":"Forua","NC":"Forua","C":775},{"Z":2035,"N":"Fruiz","O":114,"NE":"Fruiz","NC":"Fruiz","C":412},{"Z":2036,"N":"Galdakao","O":115,"NE":"Galdakao","NC":"Galdakao","C":24144},{"Z":2037,"N":"Galdames","O":116,"NE":"Galdames","NC":"Galdames","C":678},{"Z":2038,"N":"Gamiz-Fika","O":117,"NE":"Gamiz-Fika","NC":"Gamiz-Fika","C":1122},{"Z":2039,"N":"Garai","O":118,"NE":"Garai","NC":"Garai","C":243},{"Z":2040,"N":"Gatika","O":119,"NE":"Gatika","NC":"Gatika","C":1299},{"Z":2041,"N":"Gautegiz Arteaga","O":120,"NE":"Gautegiz-Arteaga","NC":"Gautegiz-Arteaga","C":704},{"Z":2046,"N":"Gernika-Lumo","O":125,"NE":"Gernika-Lumo","NC":"Gernika-Lumo","C":12617},{"Z":2044,"N":"Getxo","O":123,"NE":"Getxo","NC":"Getxo","C":62989},{"Z":2047,"N":"Gizaburuaga","O":126,"NE":"Gizaburuaga","NC":"Gizaburuaga","C":161},{"Z":2042,"N":"Gordexola","O":121,"NE":"Gordexola","NC":"Gordexola","C":1384},{"Z":2043,"N":"Gorliz","O":122,"NE":"Gorliz","NC":"Gorliz","C":4403},{"Z":2045,"N":"Güeñes","O":124,"NE":"Gueñes","NC":"Güeñes","C":5149},{"Z":2048,"N":"Ibarrangelu","O":127,"NE":"Ibarrangelu","NC":"Ibarrangelu","C":562},{"Z":2094,"N":"Igorre","O":173,"NE":"Igorre","NC":"Igorre","C":3193},{"Z":2049,"N":"Ispaster","O":128,"NE":"Ispaster","NC":"Ispaster","C":548},{"Z":2910,"N":"Iurreta","O":186,"NE":"Iurreta","NC":"Iurreta","C":2948},{"Z":2050,"N":"Izurtza","O":129,"NE":"Izurtza","NC":"Izurtza","C":198},{"Z":2907,"N":"Kortezubi","O":183,"NE":"Kortezubi","NC":"Kortezubi","C":355},{"Z":2051,"N":"Lanestosa","O":130,"NE":"Lanestosa","NC":"Lanestosa","C":220},{"Z":2052,"N":"Larrabetzu","O":131,"NE":"Larrabetzu","NC":"Larrabetzu","C":1559},{"Z":2053,"N":"Laukiz","O":132,"NE":"Laukiz","NC":"Laukiz","C":900},{"Z":2054,"N":"Leioa","O":133,"NE":"Leioa","NC":"Leioa","C":24135},{"Z":2057,"N":"Lekeitio","O":136,"NE":"Lekeitio","NC":"Lekeitio","C":5749},{"Z":2055,"N":"Lemoa","O":134,"NE":"Lemoa","NC":"Lemoa","C":2662},{"Z":2056,"N":"Lemoiz","O":135,"NE":"Lemoiz","NC":"Lemoiz","C":978},{"Z":2081,"N":"Lezama","O":160,"NE":"Lezama","NC":"Lezama","C":1883},{"Z":2903,"N":"Loiu","O":179,"NE":"Loiu","NC":"Loiu","C":1838},{"Z":2058,"N":"Mallabia","O":137,"NE":"Mallabia","NC":"Mallabia","C":972},{"Z":2059,"N":"Mañaria","O":138,"NE":"Mañaria","NC":"Mañaria","C":402},{"Z":2060,"N":"Markina-Xemein","O":139,"NE":"Markina-Xemein","NC":"Markina-Xemein","C":3645},{"Z":2061,"N":"Maruri-Jatabe","O":140,"NE":"Jatabe","NC":"Maruri-Jatabe","C":762},{"Z":2062,"N":"Mendata","O":141,"NE":"Mendata","NC":"Mendata","C":300},{"Z":2063,"N":"Mendexa","O":142,"NE":"Mendexa","NC":"Mendexa","C":373},{"Z":2064,"N":"Meñaka","O":143,"NE":"Meñaka","NC":"Meñaka","C":603},{"Z":2066,"N":"Morga","O":145,"NE":"Morga","NC":"Morga","C":346},{"Z":2068,"N":"Mundaka","O":147,"NE":"Mundaka","NC":"Mundaka","C":1551},{"Z":2069,"N":"Mungia","O":148,"NE":"Mungia","NC":"Mungia","C":12765},{"Z":2007,"N":"Munitibar-Arbatzegi Gerrikaitz","O":87,"NE":"Munitibar","NC":"Munitibar-Arbatzegi-Gerrikaitz","C":365},{"Z":2908,"N":"Murueta","O":184,"NE":"Murueta","NC":"Murueta","C":245},{"Z":2071,"N":"Muskiz","O":150,"NE":"Muskiz","NC":"Muskiz","C":6118},{"Z":2067,"N":"Muxika","O":146,"NE":"Muxika","NC":"Muxika","C":1161},{"Z":2909,"N":"Nabarniz","O":185,"NE":"Nabarniz","NC":"Nabarniz","C":207},{"Z":2073,"N":"Ondarroa","O":152,"NE":"Ondarroa","NC":"Ondarroa","C":6952},{"Z":2074,"N":"Orduña","O":153,"NE":"Urduña","NC":"Orduña","C":3333},{"Z":2075,"N":"Orozko","O":154,"NE":"Orozko","NC":"Orozko","C":1975},{"Z":2083,"N":"Ortuella","O":162,"NE":"Ortuella","NC":"Ortuella","C":6950},{"Z":2072,"N":"Otxandio","O":151,"NE":"Otxandio","NC":"Otxandio","C":974},{"Z":2077,"N":"Plentzia","O":156,"NE":"Plentzia","NC":"Plentzia","C":3367},{"Z":2078,"N":"Portugalete","O":157,"NE":"Portugalete","NC":"Portugalete","C":38742},{"Z":2082,"N":"Santurtzi","O":161,"NE":"Santurtzi","NC":"Santurtzi","C":37673},{"Z":2084,"N":"Sestao","O":163,"NE":"Sestao","NC":"Sestao","C":22577},{"Z":2904,"N":"Sondika","O":180,"NE":"Sondika","NC":"Sondika","C":3504},{"Z":2085,"N":"Sopelana","O":164,"NE":"Sopela","NC":"Sopela","C":10301},{"Z":2086,"N":"Sopuerta","O":165,"NE":"Sopuerta","NC":"Sopuerta","C":2073},{"Z":2076,"N":"Sukarrieta","O":155,"NE":"Sukarrieta","NC":"Sukarrieta","C":314},{"Z":2087,"N":"Trucios-Turtzioz","O":166,"NE":"Turtzioz","NC":"Trucios","C":429},{"Z":2088,"N":"Ubide","O":167,"NE":"Ubide","NC":"Ubide","C":135},{"Z":2065,"N":"Ugao-Miraballes","O":144,"NE":"Ugao","NC":"Ugao-Miraballes","C":3315},{"Z":2089,"N":"Urduliz","O":168,"NE":"Urduliz","NC":"Urduliz","C":3266},{"Z":2022,"N":"Carranza","O":101,"NE":"Karrantza","NC":"Valle de Carranza","C":2355},{"Z":2080,"N":"Valle de Trápaga-Trapagaran","O":159,"NE":"Trapagaran","NC":"Valle de Trápaga","C":9971},{"Z":2095,"N":"Zaldibar","O":174,"NE":"Zaldibar","NC":"Zaldibar","C":2352},{"Z":2096,"N":"Zalla","O":175,"NE":"Zalla","NC":"Zalla","C":6608},{"Z":2905,"N":"Zamudio","O":181,"NE":"Zamudio","NC":"Zamudio","C":2565},{"Z":2097,"N":"Zaratamo","O":176,"NE":"Zaratamo","NC":"Zaratamo","C":1303},{"Z":2024,"N":"Zeanuri","O":103,"NE":"Zeanuri","NC":"Zeanuri","C":1003},{"Z":2025,"N":"Zeberio","O":104,"NE":"Zeberio","NC":"Zeberio","C":883},{"Z":2913,"N":"Zierbena","O":189,"NE":"Zierbena","NC":"Zierbena","C":1251},{"Z":2915,"N":"Ziortza-Bolibar","O":191,"NE":"Ziortza-Bolibar","NC":"Ziortza-Bolibar","C":362}]};
          var gip={"zonas":[{"Z":3001,"N":"Abaltzisketa","O":192,"NE":"Abaltzisketa","NC":"Abaltzisketa","C":242},{"Z":3002,"N":"Aduna","O":193,"NE":"Aduna","NC":"Aduna","C":343},{"Z":3016,"N":"Aia","O":207,"NE":"Aia","NC":"Aia","C":1514},{"Z":3003,"N":"Aizarnazabal","O":194,"NE":"Aizarnazabal","NC":"Aizarnazabal","C":541},{"Z":3004,"N":"Albiztur","O":195,"NE":"Albiztur","NC":"Albiztur","C":252},{"Z":3005,"N":"Alegia","O":196,"NE":"Alegia","NC":"Alegia","C":1261},{"Z":3006,"N":"Alkiza","O":197,"NE":"Alkiza","NC":"Alkiza","C":262},{"Z":3906,"N":"Altzaga","O":277,"NE":"Altzaga","NC":"Altzaga","C":121},{"Z":3007,"N":"Altzo","O":198,"NE":"Altzo","NC":"Altzo","C":304},{"Z":3008,"N":"Amezketa","O":199,"NE":"Amezketa","NC":"Amezketa","C":721},{"Z":3009,"N":"Andoain","O":200,"NE":"Andoain","NC":"Andoain","C":11528},{"Z":3010,"N":"Anoeta","O":201,"NE":"Anoeta","NC":"Anoeta","C":1494},{"Z":3011,"N":"Antzuola","O":202,"NE":"Antzuola","NC":"Antzuola","C":1660},{"Z":3012,"N":"Arama","O":203,"NE":"Arama","NC":"Arama","C":144},{"Z":3013,"N":"Aretxabaleta","O":204,"NE":"Aretxabaleta","NC":"Aretxabaleta","C":5427},{"Z":3014,"N":"Asteasu","O":205,"NE":"Asteasu","NC":"Asteasu","C":1111},{"Z":3903,"N":"Astigarraga","O":274,"NE":"Astigarraga","NC":"Astigarraga","C":4247},{"Z":3015,"N":"Ataun","O":206,"NE":"Ataun","NC":"Ataun","C":1272},{"Z":3017,"N":"Azkoitia","O":208,"NE":"Azkoitia","NC":"Azkoitia","C":8580},{"Z":3018,"N":"Azpeitia","O":209,"NE":"Azpeitia","NC":"Azpeitia","C":11074},{"Z":3904,"N":"Baliarrain","O":275,"NE":"Baliarrain","NC":"Baliarrain","C":96},{"Z":3019,"N":"Beasain","O":210,"NE":"Beasain","NC":"Beasain","C":10053},{"Z":3020,"N":"Beizama","O":211,"NE":"Beizama","NC":"Beizama","C":129},{"Z":3021,"N":"Belauntza","O":212,"NE":"Belauntza","NC":"Belauntza","C":199},{"Z":3022,"N":"Berastegi","O":213,"NE":"Berastegi","NC":"Berastegi","C":834},{"Z":3074,"N":"Bergara","O":264,"NE":"Bergara","NC":"Bergara","C":11610},{"Z":3023,"N":"Berrobi","O":214,"NE":"Berrobi","NC":"Berrobi","C":445},{"Z":3024,"N":"Bidania-Goiatz","O":215,"NE":"Bidania-Goiatz","NC":"Bidania-Goiatz","C":393},{"Z":3029,"N":"Deba","O":220,"NE":"Deba","NC":"Deba","C":4258},{"Z":30,"N":"Donostia","O":9,"NE":"Donostia","NC":"Donostia-San Sebastián","C":147189},{"Z":3030,"N":"Eibar","O":221,"NE":"Eibar","NC":"Eibar","C":21515},{"Z":3031,"N":"Elduain","O":222,"NE":"Elduain","NC":"Elduain","C":180},{"Z":3033,"N":"Elgeta","O":224,"NE":"Elgeta","NC":"Elgeta","C":864},{"Z":3032,"N":"Elgoibar","O":223,"NE":"Elgoibar","NC":"Elgoibar","C":8785},{"Z":3067,"N":"Errenteria","O":258,"NE":"Errenteria","NC":"Errenteria","C":30825},{"Z":3066,"N":"Errezil","O":257,"NE":"Errezil","NC":"Errezil","C":461},{"Z":3034,"N":"Eskoriatza","O":225,"NE":"Eskoriatza","NC":"Eskoriatza","C":3157},{"Z":3035,"N":"Ezkio-Itsaso","O":226,"NE":"Ezkio-Itsaso","NC":"Ezkio-Itsaso","C":482},{"Z":3038,"N":"Gabiria","O":229,"NE":"Gabiria","NC":"Gabiria","C":392},{"Z":3037,"N":"Gaintza","O":228,"NE":"Gaintza","NC":"Gaintza","C":97},{"Z":3907,"N":"Gaztelu","O":278,"NE":"Gaztelu","NC":"Gaztelu","C":120},{"Z":3039,"N":"Getaria","O":230,"NE":"Getaria","NC":"Getaria","C":2111},{"Z":3040,"N":"Hernani","O":231,"NE":"Hernani","NC":"Hernani","C":15321},{"Z":3041,"N":"Hernialde","O":232,"NE":"Hernialde","NC":"Hernialde","C":258},{"Z":3036,"N":"Hondarribia","O":227,"NE":"Hondarribia","NC":"Hondarribia","C":13148},{"Z":3042,"N":"Ibarra","O":233,"NE":"Ibarra","NC":"Ibarra","C":3251},{"Z":3043,"N":"Idiazabal","O":234,"NE":"Idiazabal","NC":"Idiazabal","C":1740},{"Z":3044,"N":"Ikaztegieta","O":235,"NE":"Ikaztegieta","NC":"Ikaztegieta","C":368},{"Z":3045,"N":"Irun","O":236,"NE":"Irun","NC":"Irun","C":46691},{"Z":3046,"N":"Irura","O":237,"NE":"Irura","NC":"Irura","C":1167},{"Z":3047,"N":"Itsasondo","O":238,"NE":"Itsasondo","NC":"Itsasondo","C":477},{"Z":3048,"N":"Larraul","O":239,"NE":"Larraul","NC":"Larraul","C":176},{"Z":3902,"N":"Lasarte-Oria","O":273,"NE":"Lasarte-Oria","NC":"Lasarte-Oria","C":14193},{"Z":3049,"N":"Lazkao","O":240,"NE":"Lazkao","NC":"Lazkao","C":4124},{"Z":3050,"N":"Leaburu","O":241,"NE":"Leaburu","NC":"Leaburu","C":263},{"Z":3051,"N":"Legazpi","O":242,"NE":"Legazpi","NC":"Legazpi","C":6904},{"Z":3052,"N":"Legorreta","O":243,"NE":"Legorreta","NC":"Legorreta","C":1091},{"Z":3068,"N":"Leintz-Gatzaga","O":259,"NE":"Leintz Gatzaga","NC":"Leintz-Gatzaga","C":183},{"Z":3053,"N":"Lezo","O":244,"NE":"Lezo","NC":"Lezo","C":4765},{"Z":3054,"N":"Lizartza","O":245,"NE":"Lizartza","NC":"Lizartza","C":447},{"Z":3901,"N":"Mendaro","O":272,"NE":"Mendaro","NC":"Mendaro","C":1441},{"Z":3055,"N":"Arrasate/Mondragón","O":246,"NE":"Arrasate","NC":"Mondragón","C":17522},{"Z":3057,"N":"Mutiloa","O":248,"NE":"Mutiloa","NC":"Mutiloa","C":201},{"Z":3056,"N":"Mutriku","O":247,"NE":"Mutriku","NC":"Mutriku","C":4104},{"Z":3063,"N":"Oiartzun","O":254,"NE":"Oiartzun","NC":"Oiartzun","C":7990},{"Z":3058,"N":"Olaberria","O":249,"NE":"Olaberria","NC":"Olaberria","C":746},{"Z":3059,"N":"Oñati","O":250,"NE":"Oñati","NC":"Oñati","C":8863},{"Z":3076,"N":"Ordizia","O":266,"NE":"Ordizia","NC":"Ordizia","C":6978},{"Z":3905,"N":"Orendain","O":276,"NE":"Orendain","NC":"Orendain","C":141},{"Z":3060,"N":"Orexa","O":251,"NE":"Orexa","NC":"Orexa","C":89},{"Z":3061,"N":"Orio","O":252,"NE":"Orio","NC":"Orio","C":4273},{"Z":3062,"N":"Ormaiztegi","O":253,"NE":"Ormaiztegi","NC":"Ormaiztegi","C":982},{"Z":3064,"N":"Pasaia","O":255,"NE":"Pasaia","NC":"Pasaia","C":12526},{"Z":3070,"N":"Segura","O":260,"NE":"Segura","NC":"Segura","C":1099},{"Z":3065,"N":"Soraluze","O":256,"NE":"Soraluze","NC":"Soraluze","C":3006},{"Z":3071,"N":"Tolosa","O":261,"NE":"Tolosa","NC":"Tolosa","C":14818},{"Z":3072,"N":"Urnieta","O":262,"NE":"Urnieta","NC":"Urnieta","C":4731},{"Z":3077,"N":"Urretxu","O":267,"NE":"Urretxu","NC":"Urretxu","C":5243},{"Z":3073,"N":"Usurbil","O":263,"NE":"Usurbil","NC":"Usurbil","C":4677},{"Z":3075,"N":"Villabona","O":265,"NE":"Villabona","NC":"Villabona","C":4359},{"Z":3078,"N":"Zaldibia","O":268,"NE":"Zaldibia","NC":"Zaldibia","C":1155},{"Z":3079,"N":"Zarautz","O":269,"NE":"Zarautz","NC":"Zarautz","C":17835},{"Z":3025,"N":"Zegama","O":216,"NE":"Zegama","NC":"Zegama","C":1144},{"Z":3026,"N":"Zerain","O":217,"NE":"Zerain","NC":"Zerain","C":202},{"Z":3027,"N":"Zestoa","O":218,"NE":"Zestoa","NC":"Zestoa","C":2816},{"Z":3028,"N":"Zizurkil","O":219,"NE":"Zizurkil","NC":"Zizurkil","C":2255},{"Z":3081,"N":"Zumaia","O":271,"NE":"Zumaia","NC":"Zumaia","C":7460},{"Z":3080,"N":"Zumarraga","O":270,"NE":"Zumarraga","NC":"Zumarraga","C":7900}]}
          //var nav={"zonas":[{"Z":4001,"N":"Abáigar","O":279,"NE":"Abaigar","NC":"Abáigar","C":90},{"Z":4002,"N":"Abárzuza","O":280,"NE":"Abartzuza","NC":"Abárzuza","C":424},{"Z":4003,"N":"Abaurregaina/Abaurrea Alta","O":281,"NE":"Abaurregaina","NC":"Abaurrea Alta","C":124},{"Z":4004,"N":"Abaurrepea/Abaurrea Baja","O":282,"NE":"Abaurrepea","NC":"Abaurrea Baja","C":35},{"Z":4005,"N":"Aberin","O":283,"NE":"Aberin","NC":"Aberin","C":296},{"Z":4006,"N":"Ablitas","O":284,"NE":"Ablitas","NC":"Ablitas","C":1952},{"Z":4007,"N":"Adiós","O":285,"NE":"Adios","NC":"Adiós","C":136},{"Z":4008,"N":"Aguilar de Codés","O":286,"NE":"Aguilar Kodes","NC":"Aguilar de Codés","C":80},{"Z":4009,"N":"Aibar/Oibar","O":287,"NE":"Oibar","NC":"Aibar","C":690},{"Z":4011,"N":"Allín","O":289,"NE":"Allin","NC":"Allín","C":697},{"Z":4012,"N":"Allo","O":290,"NE":"Allo","NC":"Allo","C":814},{"Z":4010,"N":"Altsasu/Alsasua","O":288,"NE":"Altsasu","NC":"Alsasua","C":5721},{"Z":4013,"N":"Améscoa Baja","O":291,"NE":"Ameskoabarrena","NC":"Améscoa Baja","C":661},{"Z":4014,"N":"Ancín","O":292,"NE":"Antzin","NC":"Ancín","C":274},{"Z":4015,"N":"Andosilla","O":293,"NE":"Andosilla","NC":"Andosilla","C":2001},{"Z":4016,"N":"Ansoáin","O":294,"NE":"Antsoain","NC":"Ansoáin","C":7642},{"Z":4017,"N":"Anue","O":295,"NE":"Anue","NC":"Anue","C":361},{"Z":4018,"N":"Añorbe","O":296,"NE":"Añorbe","NC":"Añorbe","C":409},{"Z":4019,"N":"Aoiz/Agoitz","O":297,"NE":"Agoitz","NC":"Aoiz","C":1809},{"Z":4020,"N":"Araitz","O":298,"NE":"Araitz","NC":"Araitz","C":454},{"Z":4025,"N":"Arakil","O":303,"NE":"Arakil","NC":"Arakil","C":768},{"Z":4021,"N":"Aranarache","O":299,"NE":"Aranaratxe","NC":"Aranarache","C":64},{"Z":4023,"N":"Aranguren","O":301,"NE":"Aranguren","NC":"Aranguren","C":6826},{"Z":4024,"N":"Arano","O":302,"NE":"Arano","NC":"Arano","C":102},{"Z":4022,"N":"Arantza","O":300,"NE":"Arantza","NC":"Arantza","C":526},{"Z":4026,"N":"Aras","O":304,"NE":"Aras","NC":"Aras","C":147},{"Z":4027,"N":"Arbizu","O":305,"NE":"Arbizu","NC":"Arbizu","C":838},{"Z":4028,"N":"Arce/Artzi","O":306,"NE":"Artzibar","NC":"Arce","C":211},{"Z":4030,"N":"Arellano","O":308,"NE":"Arellano","NC":"Arellano","C":145},{"Z":4031,"N":"Areso","O":309,"NE":"Areso","NC":"Areso","C":221},{"Z":4032,"N":"Arguedas","O":310,"NE":"Arguedas","NC":"Arguedas","C":1733},{"Z":4033,"N":"Aria","O":311,"NE":"Aria","NC":"Aria","C":49},{"Z":4034,"N":"Aribe","O":312,"NE":"Aribe","NC":"Aribe","C":40},{"Z":4035,"N":"Armañanzas","O":313,"NE":"Armañantzas","NC":"Armañanzas","C":63},{"Z":4036,"N":"Arróniz","O":314,"NE":"Arronitz","NC":"Arróniz","C":921},{"Z":4037,"N":"Arruazu","O":315,"NE":"Arruazu","NC":"Arruazu","C":86},{"Z":4038,"N":"Artajona","O":316,"NE":"Artaxoa","NC":"Artajona","C":1348},{"Z":4039,"N":"Artazu","O":317,"NE":"Artazu","NC":"Artazu","C":83},{"Z":4040,"N":"Atez","O":318,"NE":"Atetz","NC":"Atez","C":194},{"Z":4041,"N":"Ayegui","O":319,"NE":"Aiegi","NC":"Ayegui","C":1583},{"Z":4042,"N":"Azagra","O":320,"NE":"Azagra","NC":"Azagra","C":2744},{"Z":4043,"N":"Azuelo","O":321,"NE":"Azuelo","NC":"Azuelo","C":38},{"Z":4044,"N":"Bakaiku","O":322,"NE":"Bakaiku","NC":"Bakaiku","C":290},{"Z":4901,"N":"Barañain","O":542,"NE":"Barañain","NC":"Barañáin","C":15475},{"Z":4045,"N":"Barásoain","O":323,"NE":"Barasoain","NC":"Barasoáin","C":504},{"Z":4046,"N":"Barbarin","O":324,"NE":"Barbarin","NC":"Barbarin","C":60},{"Z":4047,"N":"Bargota","O":325,"NE":"Bargota","NC":"Bargota","C":261},{"Z":4048,"N":"Barillas","O":326,"NE":"Barillas","NC":"Barillas","C":169},{"Z":4049,"N":"Basaburua","O":327,"NE":"Basaburua","NC":"Basaburua","C":704},{"Z":4050,"N":"Baztan","O":328,"NE":"Baztan","NC":"Baztan","C":6058},{"Z":4051,"N":"Beire","O":329,"NE":"Beire","NC":"Beire","C":253},{"Z":4052,"N":"Belascoáin","O":330,"NE":"Beraskoain","NC":"Belascoáin","C":88},{"Z":4250,"N":"Bera/Vera de Bidasoa","O":526,"NE":"Bera","NC":"Bera","C":2832},{"Z":4053,"N":"Berbinzana","O":331,"NE":"Berbintzana","NC":"Berbinzana","C":532},{"Z":4905,"N":"Beriáin","O":546,"NE":"Beriain","NC":"Beriain","C":2847},{"Z":4902,"N":"Berrioplano","O":543,"NE":"Berriobeiti","NC":"Berrioplano","C":4346},{"Z":4903,"N":"Berriozar","O":544,"NE":"Berriozar","NC":"Berriozar","C":6593},{"Z":4054,"N":"Bertizarana","O":332,"NE":"Bertizarana","NC":"Bertizarana","C":460},{"Z":4055,"N":"Betelu","O":333,"NE":"Betelu","NC":"Betelu","C":259},{"Z":4253,"N":"Bidaurreta","O":529,"NE":"Bidaurreta","NC":"Bidaurreta","C":129},{"Z":4056,"N":"Biurrun-Olcoz","O":334,"NE":"Biurrun-Olkotz","NC":"Biurrun-Olcoz","C":179},{"Z":4057,"N":"Buñuel","O":335,"NE":"Buñuel","NC":"Buñuel","C":1812},{"Z":4058,"N":"Auritz/Burguete","O":336,"NE":"Auritz","NC":"Burguete","C":215},{"Z":4059,"N":"Burgui/Burgi","O":337,"NE":"Burgi","NC":"Burgui","C":191},{"Z":4060,"N":"Burlata/Burlada","O":338,"NE":"Burlata","NC":"Burlada","C":13723},{"Z":4062,"N":"Cabanillas","O":340,"NE":"Cabanillas","NC":"Cabanillas","C":1088},{"Z":4063,"N":"Cabredo","O":341,"NE":"Cabredo","NC":"Cabredo","C":88},{"Z":4064,"N":"Cadreita","O":342,"NE":"Cadreita","NC":"Cadreita","C":1447},{"Z":4065,"N":"Caparroso","O":343,"NE":"Caparroso","NC":"Caparroso","C":1892},{"Z":4066,"N":"Carcar","O":344,"NE":"Carcar","NC":"Cárcar","C":867},{"Z":4067,"N":"Carcastillo","O":345,"NE":"Zarrakaztelu","NC":"Carcastillo","C":1938},{"Z":4068,"N":"Cascante","O":346,"NE":"Cascante","NC":"Cascante","C":2893},{"Z":4069,"N":"Cáseda","O":347,"NE":"Kaseda","NC":"Cáseda","C":847},{"Z":4070,"N":"Castejón","O":348,"NE":"Castejon","NC":"Castejón","C":2652},{"Z":4071,"N":"Castillonuevo","O":349,"NE":"Gazteluberri","NC":"Castillo-Nuevo","C":17},{"Z":4193,"N":"Oltza","O":471,"NE":"Oltza zendea","NC":"Cendea de Olza","C":1414},{"Z":4072,"N":"Cintruénigo","O":350,"NE":"Cintruenigo","NC":"Cintruénigo","C":5288},{"Z":4074,"N":"Cirauqui","O":352,"NE":"Zirauki","NC":"Cirauqui","C":394},{"Z":4075,"N":"Ciriza","O":353,"NE":"Ziritza","NC":"Ciriza","C":101},{"Z":4076,"N":"Cizur","O":354,"NE":"Zizur","NC":"Cizur","C":2407},{"Z":4077,"N":"Corella","O":355,"NE":"Corella","NC":"Corella","C":5384},{"Z":4078,"N":"Cortes","O":356,"NE":"Cortes","NC":"Cortes","C":2447},{"Z":4079,"N":"Desojo","O":357,"NE":"Desoio","NC":"Desojo","C":76},{"Z":4080,"N":"Dicastillo","O":358,"NE":"Deikaztelu","NC":"Dicastillo","C":510},{"Z":4081,"N":"Donamaria","O":359,"NE":"Donamaria","NC":"Donamaria","C":342},{"Z":4083,"N":"Echarri","O":361,"NE":"Etxarri","NC":"Echarri","C":56},{"Z":4086,"N":"Egüés","O":364,"NE":"Eguesibar","NC":"Egüés","C":12987},{"Z":4061,"N":"Busto (El)","O":339,"NE":"El Busto","NC":"El Busto","C":56},{"Z":4087,"N":"Elgorriaga","O":365,"NE":"Elgorriaga","NC":"Elgorriaga","C":169},{"Z":4089,"N":"Enériz","O":367,"NE":"Eneritz","NC":"Enériz","C":242},{"Z":4090,"N":"Eratsun","O":368,"NE":"Eratsun","NC":"Eratsun","C":146},{"Z":4091,"N":"Ergoiena","O":369,"NE":"Ergoiena","NC":"Ergoiena","C":347},{"Z":4092,"N":"Erro","O":370,"NE":"Erroibar","NC":"Erro","C":662},{"Z":4093,"N":"Ezcároz/Ezkaroze","O":371,"NE":"Ezkaroze","NC":"Escároz","C":293},{"Z":4094,"N":"Eslava","O":372,"NE":"Eslaba","NC":"Eslava","C":112},{"Z":4095,"N":"Esparza de Salazar","O":373,"NE":"Espartza","NC":"Esparza de Salazar","C":76},{"Z":4096,"N":"Espronceda","O":374,"NE":"Esprontzeda","NC":"Espronceda","C":115},{"Z":4097,"N":"Estella/Lizarra","O":375,"NE":"Lizarra","NC":"Estella","C":10436},{"Z":4098,"N":"Esteribar","O":376,"NE":"Esteribar","NC":"Esteribar","C":1918},{"Z":4099,"N":"Etayo","O":377,"NE":"Etaiu","NC":"Etayo","C":63},{"Z":4082,"N":"Etxalar","O":360,"NE":"Etxalar","NC":"Etxalar","C":615},{"Z":4084,"N":"Etxarri-Aranatz","O":362,"NE":"Etxarri Aranatz","NC":"Etxarri Aranatz","C":1935},{"Z":4085,"N":"Etxauri","O":363,"NE":"Etxauri","NC":"Etxauri","C":471},{"Z":4100,"N":"Eulate","O":378,"NE":"Eulate","NC":"Eulate","C":264},{"Z":4101,"N":"Ezcabarte","O":379,"NE":"Ezkabarte","NC":"Ezcabarte","C":1390},{"Z":4102,"N":"Ezkurra","O":380,"NE":"Ezkurra","NC":"Ezkurra","C":146},{"Z":4103,"N":"Ezprogui","O":381,"NE":"Ezporogi","NC":"Ezprogui","C":46},{"Z":4104,"N":"Falces","O":382,"NE":"Faltzes","NC":"Falces","C":1876},{"Z":4105,"N":"Fitero","O":383,"NE":"Fitero","NC":"Fitero","C":1535},{"Z":4106,"N":"Fontellas","O":384,"NE":"Fontellas","NC":"Fontellas","C":689},{"Z":4107,"N":"Funes","O":385,"NE":"Funes","NC":"Funes","C":1707},{"Z":4108,"N":"Fustiñana","O":386,"NE":"Fustiñana","NC":"Fustiñana","C":1878},{"Z":4109,"N":"Galar","O":387,"NE":"Galar","NC":"Galar","C":1562},{"Z":4110,"N":"Gallipienzo","O":388,"NE":"Galipentzu","NC":"Gallipienzo","C":90},{"Z":4111,"N":"Gallués/Galoze","O":389,"NE":"Galoze","NC":"Gallués","C":96},{"Z":4112,"N":"Garaioa","O":390,"NE":"Garaioa","NC":"Garaioa","C":94},{"Z":4113,"N":"Garde","O":391,"NE":"Garde","NC":"Garde","C":137},{"Z":4114,"N":"Garínoain","O":392,"NE":"Garinoain","NC":"Garínoain","C":362},{"Z":4115,"N":"Garralda","O":393,"NE":"Garralda","NC":"Garralda","C":166},{"Z":4116,"N":"Genevilla","O":394,"NE":"Genevilla","NC":"Genevilla","C":65},{"Z":4117,"N":"Goizueta","O":395,"NE":"Goizueta","NC":"Goizueta","C":620},{"Z":4118,"N":"Goñi","O":396,"NE":"Goñerri","NC":"Goñi","C":165},{"Z":4119,"N":"Guesa/Gorza","O":397,"NE":"Gorza","NC":"Güesa","C":40},{"Z":4120,"N":"Guesálaz","O":398,"NE":"Gesalatz","NC":"Guesálaz","C":394},{"Z":4121,"N":"Guirguillano","O":399,"NE":"Girgillao","NC":"Guirguillano","C":64},{"Z":4122,"N":"Huarte/Uharte","O":400,"NE":"Uharte","NC":"Huarte","C":4719},{"Z":4124,"N":"Ibargoiti","O":402,"NE":"Ibargoiti","NC":"Ibargoiti","C":210},{"Z":4259,"N":"Igantzi","O":535,"NE":"Igantzi","NC":"Igantzi","C":485},{"Z":4125,"N":"Igúzquiza","O":403,"NE":"Iguzkitza","NC":"Igúzquiza","C":275},{"Z":4126,"N":"Imotz","O":404,"NE":"Imotz","NC":"Imotz","C":357},{"Z":4127,"N":"Irañeta","O":405,"NE":"Irañeta","NC":"Irañeta","C":143},{"Z":4904,"N":"Irurtzun","O":545,"NE":"Irurtzun","NC":"Irurtzun","C":1559},{"Z":4128,"N":"Isaba/Izaba","O":406,"NE":"Izaba","NC":"Isaba","C":370},{"Z":4129,"N":"Ituren","O":407,"NE":"Ituren","NC":"Ituren","C":393},{"Z":4130,"N":"Iturmendi","O":408,"NE":"Iturmendi","NC":"Iturmendi","C":310},{"Z":4131,"N":"Iza","O":409,"NE":"Itza","NC":"Iza","C":871},{"Z":4132,"N":"Izagaondoa","O":410,"NE":"Itzagaondoa","NC":"Izagaondoa","C":146},{"Z":4133,"N":"Izalzu/Itzaltzu","O":411,"NE":"Itzaltzu","NC":"Izalzu","C":44},{"Z":4134,"N":"Jaurrieta","O":412,"NE":"Jaurrieta","NC":"Jaurrieta","C":178},{"Z":4135,"N":"Javier","O":413,"NE":"Xabier","NC":"Javier","C":102},{"Z":4136,"N":"Juslapeña","O":414,"NE":"Txulapain","NC":"Juslapeña","C":444},{"Z":4137,"N":"Labaien","O":415,"NE":"Labaien","NC":"Labaien","C":208},{"Z":4138,"N":"Lakuntza","O":416,"NE":"Lakuntza","NC":"Lakuntza","C":934},{"Z":4139,"N":"Lana","O":417,"NE":"Lana","NC":"Lana","C":159},{"Z":4140,"N":"Lantz","O":418,"NE":"Lantz","NC":"Lantz","C":116},{"Z":4141,"N":"Lapoblación","O":419,"NE":"Lapoblacion","NC":"Lapoblación","C":109},{"Z":4142,"N":"Larraga","O":420,"NE":"Larraga","NC":"Larraga","C":1411},{"Z":4143,"N":"Larraona","O":421,"NE":"Larragoa","NC":"Larraona","C":98},{"Z":4144,"N":"Larraun","O":422,"NE":"Larraun","NC":"Larraun","C":804},{"Z":4145,"N":"Lazagurría","O":423,"NE":"Elizagorria","NC":"Lazagurría","C":171},{"Z":4146,"N":"Leache","O":424,"NE":"Leatxe","NC":"Leache","C":35},{"Z":4147,"N":"Legarda","O":425,"NE":"Legarda","NC":"Legarda","C":98},{"Z":4148,"N":"Legaria","O":426,"NE":"Legaria","NC":"Legaria","C":93},{"Z":4149,"N":"Leitza","O":427,"NE":"Leitza","NC":"Leitza","C":2338},{"Z":4908,"N":"Lekunberri","O":549,"NE":"Lekunberri","NC":"Lekunberri","C":1008},{"Z":4150,"N":"Leoz","O":428,"NE":"Leotz","NC":"Leoz","C":213},{"Z":4151,"N":"Lerga","O":429,"NE":"Lerga","NC":"Lerga","C":67},{"Z":4152,"N":"Lerín","O":430,"NE":"Lerin","NC":"Lerín","C":1347},{"Z":4153,"N":"Lesaka","O":431,"NE":"Lesaka","NC":"Lesaka","C":2172},{"Z":4154,"N":"Lezáun","O":432,"NE":"Lezaun","NC":"Lezáun","C":227},{"Z":4155,"N":"Liédena","O":433,"NE":"Ledea","NC":"Liédena","C":253},{"Z":4156,"N":"Lizoain-Arriasgoiti","O":434,"NE":"Lizoain-Arriasgoiti","NC":"Lizoain-Arriasgoiti","C":252},{"Z":4157,"N":"Lodosa","O":435,"NE":"Lodosa","NC":"Lodosa","C":3546},{"Z":4158,"N":"Lónguida/Longida","O":436,"NE":"Longida","NC":"Lónguida","C":252},{"Z":4029,"N":"Arcos (Los)","O":307,"NE":"Los Arcos","NC":"Los Arcos","C":925},{"Z":4159,"N":"Lumbier","O":437,"NE":"Irunberri","NC":"Lumbier","C":1134},{"Z":4160,"N":"Luquin","O":438,"NE":"Lukin","NC":"Luquin","C":107},{"Z":4161,"N":"Mañeru","O":439,"NE":"Mañeru","NC":"Mañeru","C":344},{"Z":4162,"N":"Marañón","O":440,"NE":"Marañon","NC":"Marañón","C":47},{"Z":4163,"N":"Marcilla","O":441,"NE":"Martzilla","NC":"Marcilla","C":2017},{"Z":4164,"N":"Mélida","O":442,"NE":"Melida","NC":"Mélida","C":582},{"Z":4165,"N":"Mendavia","O":443,"NE":"Mendabia","NC":"Mendavia","C":2794},{"Z":4166,"N":"Mendaza","O":444,"NE":"Mendaza","NC":"Mendaza","C":260},{"Z":4167,"N":"Mendigorría","O":445,"NE":"Mendigorria","NC":"Mendigorría","C":827},{"Z":4168,"N":"Metauten","O":446,"NE":"Metauten","NC":"Metauten","C":248},{"Z":4169,"N":"Milagro","O":447,"NE":"Milagro","NC":"Milagro","C":2217},{"Z":4170,"N":"Mirafuentes","O":448,"NE":"Mirafuentes","NC":"Mirafuentes","C":49},{"Z":4171,"N":"Miranda de Arga","O":449,"NE":"Miranda Arga","NC":"Miranda de Arga","C":693},{"Z":4172,"N":"Monreal","O":450,"NE":"Elo","NC":"Monreal","C":367},{"Z":4173,"N":"Monteagudo","O":451,"NE":"Monteagudo","NC":"Monteagudo","C":873},{"Z":4174,"N":"Morentin","O":452,"NE":"Morentin","NC":"Morentin","C":110},{"Z":4175,"N":"Mues","O":453,"NE":"Mues","NC":"Mués","C":72},{"Z":4176,"N":"Murchante","O":454,"NE":"Murchante","NC":"Murchante","C":2856},{"Z":4177,"N":"Murieta","O":455,"NE":"Murieta","NC":"Murieta","C":262},{"Z":4178,"N":"Murillo el Cuende","O":456,"NE":"Murillo el Cuende","NC":"Murillo el Cuende","C":495},{"Z":4179,"N":"Murillo el Fruto","O":457,"NE":"Murillo el Fruto","NC":"Murillo el Fruto","C":509},{"Z":4180,"N":"Muruzábal","O":458,"NE":"Muruzabal","NC":"Muruzábal","C":216},{"Z":4181,"N":"Navascués","O":459,"NE":"Nabaskoze","NC":"Navascués","C":150},{"Z":4182,"N":"Nazar","O":460,"NE":"Nazar","NC":"Nazar","C":37},{"Z":4088,"N":"Noáin (Valle de Elorz)","O":366,"NE":"Noain Elortzibar","NC":"Noain","C":5574},{"Z":4183,"N":"Obanos","O":461,"NE":"Obanos","NC":"Obanos","C":681},{"Z":4185,"N":"Ochagavía/Otsagabia","O":463,"NE":"Otsagabia","NC":"Ochagavía","C":501},{"Z":4184,"N":"Oco","O":462,"NE":"Oko","NC":"Oco","C":61},{"Z":4186,"N":"Odieta","O":464,"NE":"Odieta","NC":"Odieta","C":302},{"Z":4187,"N":"Oitz","O":465,"NE":"Oitz","NC":"Oitz","C":111},{"Z":4188,"N":"Olaibar","O":466,"NE":"Olaibar","NC":"Oláibar","C":227},{"Z":4189,"N":"Olazti/Olazagutía","O":467,"NE":"Olatzagutia","NC":"Olazagutía","C":1170},{"Z":4190,"N":"Olejua","O":468,"NE":"Olexua","NC":"Olejua","C":44},{"Z":4191,"N":"Olite","O":469,"NE":"Erriberri","NC":"Olite","C":3018},{"Z":4194,"N":"Ollo","O":472,"NE":"Ollaran","NC":"Ollo","C":315},{"Z":4192,"N":"Olóriz","O":470,"NE":"Oloritz","NC":"Olóriz","C":159},{"Z":4195,"N":"Orbaizeta","O":473,"NE":"Orbaizeta","NC":"Orbaizeta","C":180},{"Z":4196,"N":"Orbara","O":474,"NE":"Orbara","NC":"Orbara","C":39},{"Z":4197,"N":"Orísoain","O":475,"NE":"Orisoain","NC":"Orísoain","C":70},{"Z":4906,"N":"Orkoien","O":547,"NE":"Orkoien","NC":"Orkoien","C":2553},{"Z":4198,"N":"Oronz/Orontze","O":476,"NE":"Orontze","NC":"Oronz","C":36},{"Z":4199,"N":"Orotz-Betelu","O":477,"NE":"Orotz-Betelu","NC":"Orotz-Betelu","C":150},{"Z":4200,"N":"Oteiza","O":478,"NE":"Oteitza","NC":"Oteiza","C":764},{"Z":40,"N":"Iruña","O":10,"NE":"Iruñea","NC":"Pamplona-Iruña","C":147803},{"Z":4202,"N":"Peralta","O":479,"NE":"Azkoien","NC":"Peralta","C":4326},{"Z":4203,"N":"Petilla de Aragón","O":480,"NE":"Petilla Aragoi","NC":"Petilla de Aragón","C":40},{"Z":4204,"N":"Piedramillera","O":481,"NE":"Piedramillera","NC":"Piedramillera","C":37},{"Z":4205,"N":"Pitillas","O":482,"NE":"Pitillas","NC":"Pitillas","C":427},{"Z":4206,"N":"Puente la Reina/Gares","O":483,"NE":"Gares","NC":"Puente la Reina","C":2095},{"Z":4207,"N":"Pueyo","O":484,"NE":"Puiu","NC":"Pueyo","C":271},{"Z":4208,"N":"Ribaforada","O":485,"NE":"Ribaforada","NC":"Ribaforada","C":2569},{"Z":4209,"N":"Romanzado","O":486,"NE":"Erromantzatua","NC":"Romanzado","C":157},{"Z":4210,"N":"Roncal/Erronkari","O":487,"NE":"Erronkari","NC":"Roncal","C":199},{"Z":4211,"N":"Orreaga/Roncesvalles","O":488,"NE":"Orreaga","NC":"Roncesvalles","C":25},{"Z":4212,"N":"Sada","O":489,"NE":"Zare","NC":"Sada","C":151},{"Z":4213,"N":"Saldías","O":490,"NE":"Saldias","NC":"Saldias","C":105},{"Z":4214,"N":"Salinas de Oro","O":491,"NE":"Jaitz","NC":"Salinas de Oro","C":93},{"Z":4215,"N":"San Adrián","O":492,"NE":"San Adrian","NC":"San Adrián","C":4649},{"Z":4217,"N":"San Martín de Unx","O":494,"NE":"San Martín de Unx","NC":"San Martín de Unx","C":337},{"Z":4216,"N":"Sangüesa/Zangoza","O":493,"NE":"Zangoza","NC":"Sangüesa","C":3882},{"Z":4219,"N":"Sansol","O":495,"NE":"Santsol","NC":"Sansol","C":88},{"Z":4220,"N":"Santacara","O":496,"NE":"Santakara","NC":"Santacara","C":752},{"Z":4221,"N":"Doneztebe/Santesteban","O":497,"NE":"Doneztebe","NC":"Santesteban","C":1211},{"Z":4222,"N":"Sarriés/Sartze","O":498,"NE":"Sartze","NC":"Sarriés","C":63},{"Z":4223,"N":"Sartaguda","O":499,"NE":"Sartaguda","NC":"Sartaguda","C":995},{"Z":4224,"N":"Sesma","O":500,"NE":"Sesma","NC":"Sesma","C":914},{"Z":4225,"N":"Sorlada","O":501,"NE":"Sorlada","NC":"Sorlada","C":36},{"Z":4226,"N":"Sunbilla","O":502,"NE":"Sunbilla","NC":"Sunbilla","C":585},{"Z":4227,"N":"Tafalla","O":503,"NE":"Tafalla","NC":"Tafalla","C":8226},{"Z":4228,"N":"Tiebas-Muruarte de Reta","O":504,"NE":"Tiebas-Muru Artederreta","NC":"Tiebas-Muruarte de Reta","C":496},{"Z":4229,"N":"Tirapu","O":505,"NE":"Tirapu","NC":"Tirapu","C":50},{"Z":4230,"N":"Torralba del Río","O":506,"NE":"Torralba del Rio","NC":"Torralba del Río","C":107},{"Z":4231,"N":"Torres del Río","O":507,"NE":"Torres del Rio","NC":"Torres del Río","C":115},{"Z":4232,"N":"Tudela","O":508,"NE":"Tutera","NC":"Tudela","C":25152},{"Z":4233,"N":"Tulebras","O":509,"NE":"Tulebras","NC":"Tulebras","C":96},{"Z":4234,"N":"Ucar","O":510,"NE":"Ukar","NC":"Úcar","C":144},{"Z":4123,"N":"Uharte-Arakil","O":401,"NE":"Uharte Arakil","NC":"Uharte Arakil","C":654},{"Z":4235,"N":"Ujué","O":511,"NE":"Uxue","NC":"Ujué","C":166},{"Z":4236,"N":"Ultzama","O":512,"NE":"Ultzama","NC":"Ultzama","C":1324},{"Z":4237,"N":"Unciti","O":513,"NE":"Untzitibar","NC":"Unciti","C":195},{"Z":4238,"N":"Unzué","O":514,"NE":"Untzue","NC":"Unzué","C":110},{"Z":4239,"N":"Urdazubi/Urdax","O":515,"NE":"Urdazubi","NC":"Urdax","C":310},{"Z":4240,"N":"Urdiain","O":516,"NE":"Urdiain","NC":"Urdiain","C":531},{"Z":4241,"N":"Urraul Alto","O":517,"NE":"Urraulgoiti","NC":"Urraul Alto","C":134},{"Z":4242,"N":"Urraul Bajo","O":518,"NE":"Urraulbeiti","NC":"Urraul Bajo","C":253},{"Z":4244,"N":"Urrotz","O":520,"NE":"Urrotz","NC":"Urrotz","C":156},{"Z":4243,"N":"Urroz","O":519,"NE":"Urroz","NC":"Urroz","C":314},{"Z":4245,"N":"Urzainqui/Urzainki","O":521,"NE":"Urzainki","NC":"Urzainqui","C":83},{"Z":4246,"N":"Uterga","O":522,"NE":"Uterga","NC":"Uterga","C":140},{"Z":4247,"N":"Uztárroz/Uztarroze","O":523,"NE":"Uztarroze","NC":"Uztárroz","C":152},{"Z":4248,"N":"Luzaide/Valcarlos","O":524,"NE":"Luzaide","NC":"Valcarlos","C":295},{"Z":4249,"N":"Valtierra","O":525,"NE":"Valtierra","NC":"Valtierra","C":1885},{"Z":4251,"N":"Viana","O":527,"NE":"Viana","NC":"Viana","C":3110},{"Z":4252,"N":"Vidángoz/Bidankoze","O":528,"NE":"Bidankoze","NC":"Vidángoz","C":87},{"Z":4254,"N":"Villafranca","O":530,"NE":"Villafranca","NC":"Villafranca","C":1920},{"Z":4255,"N":"Villamayor de Monjardín","O":531,"NE":"Villamayor de Monjardin","NC":"Villamayor de Monjardín","C":102},{"Z":4256,"N":"Hiriberri/Villanueva de Aezkoa","O":532,"NE":"Hiriberri","NC":"Villanueva de Aezkoa","C":109},{"Z":4257,"N":"Villatuerta","O":533,"NE":"Villatuerta","NC":"Villatuerta","C":866},{"Z":4258,"N":"Villava/Atarrabia","O":534,"NE":"Atarrabia","NC":"Villava","C":7841},{"Z":4260,"N":"Yerri/Deierri","O":536,"NE":"Deierri","NC":"Yerri","C":1245},{"Z":4261,"N":"Yesa","O":537,"NE":"Esa","NC":"Yesa","C":235},{"Z":4262,"N":"Zabalza","O":538,"NE":"Zabaltza","NC":"Zabalza","C":206},{"Z":4073,"N":"Ziordia","O":351,"NE":"Ziordia","NC":"Ziordia","C":315},{"Z":4907,"N":"Zizur Mayor/Zizur Nagusia","O":548,"NE":"Zizur Nagusia","NC":"Zizur Mayor","C":10677},{"Z":4263,"N":"Zubieta","O":539,"NE":"Zubieta","NC":"Zubieta","C":236},{"Z":4264,"N":"Zugarramurdi","O":540,"NE":"Zugarramurdi","NC":"Zugarramurdi","C":179},{"Z":4265,"N":"Zúñiga","O":541,"NE":"Zuñiga","NC":"Zúñiga","C":86}]};
          for(var i=0;i<gen.zonas.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+gen.zonas[i]['NC']+gen.zonas[i]['Z']);
            for(var k=0;k<elToChange.length;k++){
              if(l==='es'){
                elToChange[k].innerHTML=gen.zonas[i]['NC'];
              }
              else if(l==='eu'){
                elToChange[k].innerHTML=gen.zonas[i]['NE'];
              }
            }
          }


          findElement=function(collection, value, attrName)
          {
            for (var i = 0, len = collection.length; i < len; i++)
            {
              var collection_value = collection[i][attrName];
              if (collection_value == value)
              {
                return collection[i];
              }
            }
            return null;
          }
          var elToChange=document.querySelector('#fullTemp').querySelectorAll('x-select');
          for(var i=0;i<elToChange.length;i++){
            var isInGen=findElement(gen.zonas,elToChange[i].getAttribute('val'),'Z');
            var isInAr=findElement(ar.zonas,elToChange[i].getAttribute('val'),'Z');
            var isInViz=findElement(viz.zonas,elToChange[i].getAttribute('val'),'Z');
            var isInGip=findElement(gip.zonas,elToChange[i].getAttribute('val'),'Z');
            //var isInNav=findElement(nav.zonas,elToChange[i].getAttribute('val'),'Z');
            if(isInGen!==null){
              if(l==='es'){
                elToChange[i].$.selectBut.innerHTML=isInGen['NC'];
              }
              else if(l==='eu'){
                elToChange[i].$.selectBut.innerHTML=isInGen['NE'];
              }
            }
            else if(isInAr!==null){
              if(l==='es'){
                elToChange[i].$.selectBut.innerHTML=isInAr['NC'];
              }
              else if(l==='eu'){
                elToChange[i].$.selectBut.innerHTML=isInAr['NE'];
              }
            }
            else if(isInViz!==null){
              if(l==='es'){
                elToChange[i].$.selectBut.innerHTML=isInViz['NC'];
              }
              else if(l==='eu'){
                elToChange[i].$.selectBut.innerHTML=isInViz['NE'];
              }
            }
            else if(isInGip!==null){
              if(l==='es'){
                elToChange[i].$.selectBut.innerHTML=isInGip['NC'];
              }
              else if(l==='eu'){
                elToChange[i].$.selectBut.innerHTML=isInGip['NE'];
              }
            }
           /*else if(isInNav!==null){
              if(l==='es'){
                elToChange[i].$.selectBut.innerHTML=isInNav['NC'];
              }
              else if(l==='eu'){
                elToChange[i].$.selectBut.innerHTML=isInNav['NE'];
              }
            }*/
          }
          for(var i=0;i<ar.zonas.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+ar.zonas[i]['NC']+ar.zonas[i]['Z']);
            for(var k=0;k<elToChange.length;k++){
              if(l==='es'){
                elToChange[k].innerHTML=ar.zonas[i]['NC'];
              }
              else if(l==='eu'){
                elToChange[k].innerHTML=ar.zonas[i]['NE'];
              }
            }
          }
          for(var i=0;i<viz.zonas.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+viz.zonas[i]['NC']+viz.zonas[i]['Z']);
            for(var k=0;k<elToChange.length;k++){
              if(l==='es'){
                elToChange[k].innerHTML=viz.zonas[i]['NC'];
              }
              else if(l==='eu'){
                elToChange[k].innerHTML=viz.zonas[i]['NE'];
              }
            }
          }
          for(var i=0;i<gip.zonas.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+gip.zonas[i]['NC']+gip.zonas[i]['Z']);
            for(var k=0;k<elToChange.length;k++){
              if(l==='es'){
                elToChange[k].innerHTML=gip.zonas[i]['NC'];
              }
              else if(l==='eu'){
                elToChange[k].innerHTML=gip.zonas[i]['NE'];
              }
            }
          }
          /*for(var i=0;i<nav.zonas.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+nav.zonas[i]['NC']+nav.zonas[i]['Z']);
            for(var k=0;k<elToChange.length;k++){
              if(l==='es'){
                elToChange[k].innerHTML=nav.zonas[i]['NC'];
              }
              else if(l==='eu'){
                elToChange[k].innerHTML=nav.zonas[i]['NE'];
              }
            }
          }*/
          var elToChange=document.querySelector('#fullTemp').querySelectorAll('#imgAvisoCam');
            for(var k=0;k<elToChange.length;k++){
              if(l==='es'){
                elToChange[k].src='../resources/configPanel/img/camara/camconfiges.png';
              }
              else if(l==='eu'){
                elToChange[k].src='../resources/configPanel/img/camara/camconfigeu.png';
              }
            }

           /* var elToChange=document.querySelector('#fullTemp').querySelectorAll('#imgAvisoRadio');
            for(var k=0;k<elToChange.length;k++){
              if(l==='es'){
                elToChange[k].src='../resources/configPanel/img/radio/radconfes.png';
              }
              else if(l==='eu'){
                elToChange[k].src='../resources/configPanel/img/radio/radconfeu.png';
              }
            }*/
      }

      }
      _this.changeSoundSWActive();

    }
    else {
      /* kendu gailua */
      devBox.removeDevice(event.detail.agentid);
      var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
      var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
      var sectionDiv=document.querySelector('#fullTemp').children;
      var removed=0;
      for(var i=2;i<sectionNum;i++){

        if(sections[i-removed].name.indexOf(event.detail.agentid)===0)
        {
          mediascape.AdaptationToolkit.uiComponents.ctrlPanel.removeItem(sections[i-removed].name);
          sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
          container.removeChild(sectionDiv[i-removed]);

          removed=removed+1;

        }
        else{
          if(sections[i-removed].name.indexOf('cameras')>-1){
            var sectionToReplace=new section();
            sectionToReplace.setName(sections[i-removed].name);
            sectionToReplace.addItem(devBox);
            var dc=sections[i-removed].name.split('cameras')[0];
            function filterByIdR(el){
              if(el.id===dc)return el;
            }
            var dtc=sections[i-removed].items[0].devices.filter(filterByIdR);
            camerasSect.setCamsViewStatus(sections[i-removed].name.split('cameras')[0]);
            camerasSect.setCamsSoundStatus(sections[i-removed].name.split('cameras')[0]);
            sectionToReplace.addItem(camerasSect);
            _this.removeItem(sections[i-removed].name);
            _this.addItemPos(sectionToReplace,(i-removed));
            if(dtc[0].icon.indexOf('TV')>-1){
              container.replaceChild(sectionToReplace.render('tv'),sectionDiv[i-removed]);
            }
            else{
              container.replaceChild(sectionToReplace.render('other'),sectionDiv[i-removed]);
            }


          }
          else if(sections[i-removed].name.indexOf('twitter')>-1){
            var sectionToReplace=new section();
            sectionToReplace.setName(sections[i-removed].name);
            sectionToReplace.addItem(devBox);
            twitterSect.setViewerViewStatus(sections[i-removed].name.split('twitter')[0]);
            //twitterSect.setViewerHTStatus(sections[i-removed].name.split('twitter')[0]);
            //twitterSect.setMapViewStatus(sections[i-removed].name.split('twitter')[0]);
            sectionToReplace.addItem(twitterSect);
            _this.removeItem(sections[i-removed].name);
            _this.addItemPos(sectionToReplace,(i-removed));
            container.replaceChild(sectionToReplace.render(),sectionDiv[i-removed]);
          }
          /*else if(sections[i-removed].name.indexOf('radio')>-1){
            var sectionToReplace=new section();
            sectionToReplace.setName(sections[i-removed].name);
            sectionToReplace.addItem(devBox);
            var dc=sections[i-removed].name.split('radio')[0];
            function filterByIdR(el){
              if(el.id===dc)return el;
            }
            var dtc=sections[i-removed].items[0].devices.filter(filterByIdR);
            radioSect.setRadioViewStatus(sections[i-removed].name.split('radio')[0]);
            sectionToReplace.addItem(radioSect);
            _this.removeItem(sections[i-removed].name);
            _this.addItemPos(sectionToReplace,(i-removed));
            if(dtc[0].icon.indexOf('TV')>-1){
              container.replaceChild(sectionToReplace.render('tv'),sectionDiv[i-removed]);
            }
            else{
              container.replaceChild(sectionToReplace.render('other'),sectionDiv[i-removed]);
            }
          }*/
          else if(sections[i-removed].name.indexOf('graphics')>-1){
            var sectionToReplace=new section();
            sectionToReplace.setName(sections[i-removed].name);
            sectionToReplace.addItem(devBox);
            graphicSect.setTableViewStatus(sections[i-removed].name.split('graphics')[0]);
            graphicSect.setTablePlaceStatus(sections[i-removed].name.split('graphics')[0]);
            graphicSect.setTableTipoStatus(sections[i-removed].name.split('graphics')[0]);
            graphicSect.setPieViewStatus(sections[i-removed].name.split('graphics')[0]);
            graphicSect.setPiePlaceStatus(sections[i-removed].name.split('graphics')[0]);
            graphicSect.setPieTipoStatus(sections[i-removed].name.split('graphics')[0]);
            graphicSect.setPartyMapViewStatus(sections[i-removed].name.split('graphics')[0]);
            graphicSect.setPartyMapLugarStatus(sections[i-removed].name.split('graphics')[0]);
            graphicSect.setPartyMapTipoStatus(sections[i-removed].name.split('graphics')[0]);
            sectionToReplace.addItem(graphicSect);
            _this.removeItem(sections[i-removed].name);
            _this.addItemPos(sectionToReplace,(i-removed));
            container.replaceChild(sectionToReplace.render(),sectionDiv[i-removed]);
          }

          sectionDiv[i-removed].replaceChild(devBox.render(),sectionDiv[i-removed].children[0]);

        }
      }
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSection(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeSection,undefined);
      if(mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAppAttribute('language')===undefined){
        if(window.location.href.indexOf('?lang')>-1){
          ediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setAppAttribute('language',mediascape.AdaptationToolkit.Utils.getUrlVar('lang'));
       }else{
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setAppAttribute('language','eu');
       }

      }
      else{
        var l=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAppAttribute('language');
        if(l==='es' || l==='eu'){
          var elToChange1=document.querySelector('#fullTemp').querySelectorAll('#arMun');
          var elToChange2=document.querySelector('#fullTemp').querySelectorAll('#vizMun');
          var elToChange3=document.querySelector('#fullTemp').querySelectorAll('#gipMun');
          //var elToChange4=document.querySelector('#fullTemp').querySelectorAll('#navMun');
          if(l==='es'){
            document.querySelector('#langes').className='active';
            document.querySelector('#langeu').className='';
            for(var k=0;k<elToChange1.length;k++){
              elToChange1[k].label='Municipios de Alava';
              elToChange2[k].label='Municipios de Bizkaia';
              elToChange3[k].label='Municipios de Guipuzcoa';
              //elToChange4[k].label='Municipios de Navarra';

            }
            document.querySelector('#loadingNotif').src='../resources/images/cargandoes.png';

          }
          else if(l==='eu'){
            document.querySelector('#langeu').className='active';
            document.querySelector('#langes').className='';

            for(var k=0;k<elToChange1.length;k++){
              elToChange1[k].label='Arabako udalerriak';
              elToChange2[k].label='Bizkaiako udalerriak';
              elToChange3[k].label='Gipuzkoako udalerriak';
              //elToChange4[k].label='Nafarroako udalerriak';

            }
            document.querySelector('#loadingNotif').src='../resources/images/cargandoeu.png';


          }
           if(document.querySelector('#qrNotif')!==null){
            document.querySelector('#qrNotif').src=document.querySelector('#qrNotif').src.split('notif')[0]+'notif'+l+'.png';
          }
          for(var i=0;i<_this.textos.menu.length;i++){
            if(document.querySelector('#fullTemp').querySelector('#'+_this.textos.menu[i].id)!==null){
              document.querySelector('#fullTemp').querySelector('#'+_this.textos.menu[i].id).innerHTML=_this.textos.menu[i][l];
            }
          }
          for(var i=0;i<_this.textos.addDev.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+_this.textos.addDev[i].id);
            for(var k=0;k<elToChange.length;k++){
              elToChange[k].innerHTML=_this.textos.addDev[i][l];
            }

          }
          for(var i=0;i<_this.textos.twitter.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+_this.textos.twitter[i].id);
            for(var k=0;k<elToChange.length;k++){
              elToChange[k].innerHTML=_this.textos.twitter[i][l];
            }

          }
          for(var i=0;i<_this.textos.graficos.length;i++){

            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+_this.textos.graficos[i].id);
            for(var k=0;k<elToChange.length;k++){
              elToChange[k].innerHTML=_this.textos.graficos[i][l];
            }
          }
          var gen={"zonas":[{"Z":1,"N":"Alava-Araba","O":28,"NE":"Araba","NC":"Alava","C":1984},{"Z":2,"N":"Vizcaya","O":28,"NE":"Bizkaia","NC":"Bizkaia","C":1984},{"Z":3,"N":"Guipuzcoa","O":28,"NE":"Gipuzkoa","NC":"Guipúzcoa","C":1984},{"Z":5,"N":"CAV-EAE","O":28,"NE":"EAE","NC":"CAV","C":1984}]};
          var ar={"zonas":[{"Z":1001,"N":"Alegría-Dulantzi","O":28,"NE":"Dulantzi","NC":"Alegría-Dulantzi","C":1984},{"Z":1002,"N":"Amurrio","O":29,"NE":"Amurrio","NC":"Amurrio","C":8139},{"Z":1049,"N":"Añana","O":63,"NE":"Añana","NC":"Añana","C":140},{"Z":1003,"N":"Aramaio","O":30,"NE":"Aramaio","NC":"Aramaio","C":1186},{"Z":1006,"N":"Armiñón","O":32,"NE":"Armiñon","NC":"Armiñón","C":176},{"Z":1037,"N":"Arraia-Maeztu","O":55,"NE":"Arraia-Maeztu","NC":"Arraia-Maeztu","C":586},{"Z":1008,"N":"Arratzua-Ubarrundia","O":33,"NE":"Arratzua-Ubarrundia","NC":"Arratzua-Ubarrundia","C":790},{"Z":1004,"N":"Artziniega","O":31,"NE":"Artziniega","NC":"Artziniega","C":1405},{"Z":1009,"N":"Asparrena","O":34,"NE":"Asparrena","NC":"Asparrena","C":1281},{"Z":1010,"N":"Ayala/Aiara","O":35,"NE":"Aiara","NC":"Ayala","C":2275},{"Z":1011,"N":"Baños de Ebro/Mañueta","O":36,"NE":"Mañueta","NC":"Baños de Ebro","C":237},{"Z":1013,"N":"Barrundia","O":37,"NE":"Barrundia","NC":"Barrundia","C":711},{"Z":1014,"N":"Berantevilla","O":38,"NE":"Berantevilla","NC":"Berantevilla","C":372},{"Z":1016,"N":"Bernedo","O":39,"NE":"Bernedo","NC":"Bernedo","C":439},{"Z":1017,"N":"Campezo/Kanpezu","O":40,"NE":"Kanpezu","NC":"Campezo","C":869},{"Z":1021,"N":"Elburgo/Burgelu","O":44,"NE":"Burgu","NC":"Elburgo","C":460},{"Z":1022,"N":"Elciego","O":45,"NE":"Eltziego","NC":"Elciego","C":805},{"Z":1023,"N":"Elvillar/Bilar","O":46,"NE":"Bilar","NC":"Elvillar","C":269},{"Z":1901,"N":"Iruña Oka/Iruña de Oca","O":76,"NE":"Iruña Oka","NC":"Iruña de Oca","C":2344},{"Z":1027,"N":"Iruraiz-Gauna","O":47,"NE":"Iruraitz-Gauna","NC":"Iruraitz-Gauna","C":416},{"Z":1019,"N":"Kripan","O":42,"NE":"Kripan","NC":"Kripan","C":144},{"Z":1020,"N":"Kuartango","O":43,"NE":"Kuartango","NC":"Kuartango","C":326},{"Z":1028,"N":"Labastida","O":48,"NE":"Bastida","NC":"Labastida","C":1077},{"Z":1030,"N":"Lagrán","O":49,"NE":"Lagran","NC":"Lagrán","C":159},{"Z":1031,"N":"Laguardia","O":50,"NE":"Guardia","NC":"Laguardia","C":1183},{"Z":1032,"N":"Lanciego/Lantziego","O":51,"NE":"Lantziego","NC":"Lanciego","C":522},{"Z":1902,"N":"Lantarón","O":77,"NE":"Lantaron","NC":"Lantarón","C":738},{"Z":1033,"N":"Lapuebla de Labarca","O":52,"NE":"Lapuebla de Labarca","NC":"Lapuebla de Labarca","C":649},{"Z":1058,"N":"Legutiano","O":71,"NE":"Legutio","NC":"Legutio","C":1327},{"Z":1034,"N":"Leza","O":53,"NE":"Leza","NC":"Leza","C":165},{"Z":1036,"N":"Llodio/Laudio","O":54,"NE":"Laudio","NC":"Llodio","C":15034},{"Z":1039,"N":"Moreda de Alava","O":56,"NE":"Moreda Araba","NC":"Moreda de Alava","C":202},{"Z":1041,"N":"Navaridas","O":57,"NE":"Navaridas","NC":"Navaridas","C":153},{"Z":1042,"N":"Okondo","O":58,"NE":"Okondo","NC":"Okondo","C":901},{"Z":1043,"N":"Oyón/Oion","O":59,"NE":"Oion","NC":"Oyón","C":2318},{"Z":1044,"N":"Peñacerrada-Urizaharra","O":60,"NE":"Urizaharra","NC":"Peñacerrada","C":236},{"Z":1046,"N":"Ribera Alta","O":61,"NE":"Erriberagoitia","NC":"Ribera Alta","C":594},{"Z":1047,"N":"Ribera Baja/Erribera Beitia","O":62,"NE":"Erriberabeitia","NC":"Ribera Baja","C":964},{"Z":1051,"N":"Salvatierra/Agurain","O":64,"NE":"Agurain","NC":"Salvatierra","C":3606},{"Z":1052,"N":"Samaniego","O":65,"NE":"Samaniego","NC":"Samaniego","C":244},{"Z":1053,"N":"San Millán/Donemiliaga","O":66,"NE":"Donemiliaga","NC":"San Millán","C":587},{"Z":1054,"N":"Urkabustaiz","O":67,"NE":"Urkabustaiz","NC":"Urkabustaiz","C":952},{"Z":1055,"N":"Valdegovía/Gaubea","O":68,"NE":"Gaubea","NC":"Valdegovía","C":836},{"Z":1056,"N":"Harana/Valle de Arana","O":69,"NE":"Harana","NC":"Valle de Arana","C":218},{"Z":1057,"N":"Villabuena de Alava/Eskuernaga","O":70,"NE":"Villabuena","NC":"Villabuena de Alava","C":245},{"Z":10,"N":"Gasteiz","O":7,"NE":"Gasteiz","NC":"Vitoria-Gasteiz","C":186354},{"Z":1060,"N":"Yécora/Iekora","O":72,"NE":"Ekora","NC":"Yécora","C":199},{"Z":1061,"N":"Zalduondo","O":73,"NE":"Zalduondo","NC":"Zalduondo","C":153},{"Z":1062,"N":"Zambrana","O":74,"NE":"Zanbrana","NC":"Zambrana","C":314},{"Z":1018,"N":"Zigoitia","O":41,"NE":"Zigoitia","NC":"Zigoitia","C":1370},{"Z":1063,"N":"Zuia","O":75,"NE":"Zuia","NC":"Zuia","C":1799}]};
          var viz={"zonas":[{"Z":2001,"N":"Abadiño","O":81,"NE":"Abadiño","NC":"Abadiño","C":5832},{"Z":2002,"N":"Abanto y Ciérvana/Abanto Zierbena","O":82,"NE":"Abanto","NC":"Abanto y Ciérvana","C":7851},{"Z":2911,"N":"Ajangiz","O":187,"NE":"Ajangiz","NC":"Ajangiz","C":382},{"Z":2912,"N":"Alonsotegi","O":188,"NE":"Alonsotegi","NC":"Alonsotegi","C":2308},{"Z":2003,"N":"Amorebieta-Etxano","O":83,"NE":"Zornotza","NC":"Amorebieta-Etxano","C":14338},{"Z":2004,"N":"Amoroto","O":84,"NE":"Amoroto","NC":"Amoroto","C":334},{"Z":2005,"N":"Arakaldo","O":85,"NE":"Arakaldo","NC":"Arakaldo","C":117},{"Z":2006,"N":"Arantzazu","O":86,"NE":"Arantzazu","NC":"Arantzazu","C":289},{"Z":2093,"N":"Areatza","O":172,"NE":"Areatza","NC":"Areatza","C":900},{"Z":2009,"N":"Arrankudiaga","O":89,"NE":"Arrankudiaga","NC":"Arrankudiaga","C":786},{"Z":2914,"N":"Arratzu","O":190,"NE":"Arratzu","NC":"Arratzu","C":330},{"Z":2010,"N":"Arrieta","O":90,"NE":"Arrieta","NC":"Arrieta","C":457},{"Z":2011,"N":"Arrigorriaga","O":91,"NE":"Arrigorriaga","NC":"Arrigorriaga","C":9692},{"Z":2023,"N":"Artea","O":102,"NE":"Arteaga","NC":"Artea","C":594},{"Z":2008,"N":"Arcentales","O":88,"NE":"Artzentales","NC":"Artzentales","C":617},{"Z":2091,"N":"Atxondo","O":170,"NE":"Atxondo","NC":"Atxondo","C":1134},{"Z":2070,"N":"Aulesti","O":149,"NE":"Aulesti","NC":"Aulesti","C":545},{"Z":2012,"N":"Bakio","O":92,"NE":"Bakio","NC":"Bakio","C":2041},{"Z":2090,"N":"Balmaseda","O":169,"NE":"Balmaseda","NC":"Balmaseda","C":6022},{"Z":2013,"N":"Barakaldo","O":93,"NE":"Barakaldo","NC":"Barakaldo","C":79984},{"Z":2014,"N":"Barrika","O":94,"NE":"Barrika","NC":"Barrika","C":1218},{"Z":2015,"N":"Basauri","O":95,"NE":"Basauri","NC":"Basauri","C":33690},{"Z":2092,"N":"Bedia","O":171,"NE":"Bedia","NC":"Bedia","C":837},{"Z":2016,"N":"Berango","O":96,"NE":"Berango","NC":"Berango","C":5260},{"Z":2017,"N":"Bermeo","O":97,"NE":"Bermeo","NC":"Bermeo","C":13290},{"Z":2018,"N":"Berriatua","O":98,"NE":"Berriatua","NC":"Berriatua","C":875},{"Z":2019,"N":"Berriz","O":99,"NE":"Berriz","NC":"Berriz","C":3594},{"Z":20,"N":"Bilbao","O":8,"NE":"Bilbo","NC":"Bilbao","C":274076},{"Z":2021,"N":"Busturia","O":100,"NE":"Busturia","NC":"Busturia","C":1352},{"Z":2901,"N":"Derio","O":177,"NE":"Derio","NC":"Derio","C":4775},{"Z":2026,"N":"Dima","O":105,"NE":"Dima","NC":"Dima","C":1134},{"Z":2027,"N":"Durango","O":106,"NE":"Durango","NC":"Durango","C":22033},{"Z":2028,"N":"Ea","O":107,"NE":"Ea","NC":"Ea","C":715},{"Z":2031,"N":"Elantxobe","O":110,"NE":"Elantxobe","NC":"Elantxobe","C":340},{"Z":2032,"N":"Elorrio","O":111,"NE":"Elorrio","NC":"Elorrio","C":5735},{"Z":2902,"N":"Erandio","O":178,"NE":"Erandio","NC":"Erandio","C":19124},{"Z":2033,"N":"Ereño","O":112,"NE":"Ereño","NC":"Ereño","C":215},{"Z":2034,"N":"Ermua","O":113,"NE":"Ermua","NC":"Ermua","C":12902},{"Z":2079,"N":"Errigoiti","O":158,"NE":"Errigoiti","NC":"Errigoiti","C":425},{"Z":2029,"N":"Etxebarri Anteiglesia de San Esteban","O":108,"NE":"Etxebarri","NC":"Etxebarri","C":8332},{"Z":2030,"N":"Etxebarria","O":109,"NE":"Etxebarria","NC":"Etxebarria","C":608},{"Z":2906,"N":"Forua","O":182,"NE":"Forua","NC":"Forua","C":775},{"Z":2035,"N":"Fruiz","O":114,"NE":"Fruiz","NC":"Fruiz","C":412},{"Z":2036,"N":"Galdakao","O":115,"NE":"Galdakao","NC":"Galdakao","C":24144},{"Z":2037,"N":"Galdames","O":116,"NE":"Galdames","NC":"Galdames","C":678},{"Z":2038,"N":"Gamiz-Fika","O":117,"NE":"Gamiz-Fika","NC":"Gamiz-Fika","C":1122},{"Z":2039,"N":"Garai","O":118,"NE":"Garai","NC":"Garai","C":243},{"Z":2040,"N":"Gatika","O":119,"NE":"Gatika","NC":"Gatika","C":1299},{"Z":2041,"N":"Gautegiz Arteaga","O":120,"NE":"Gautegiz-Arteaga","NC":"Gautegiz-Arteaga","C":704},{"Z":2046,"N":"Gernika-Lumo","O":125,"NE":"Gernika-Lumo","NC":"Gernika-Lumo","C":12617},{"Z":2044,"N":"Getxo","O":123,"NE":"Getxo","NC":"Getxo","C":62989},{"Z":2047,"N":"Gizaburuaga","O":126,"NE":"Gizaburuaga","NC":"Gizaburuaga","C":161},{"Z":2042,"N":"Gordexola","O":121,"NE":"Gordexola","NC":"Gordexola","C":1384},{"Z":2043,"N":"Gorliz","O":122,"NE":"Gorliz","NC":"Gorliz","C":4403},{"Z":2045,"N":"Güeñes","O":124,"NE":"Gueñes","NC":"Güeñes","C":5149},{"Z":2048,"N":"Ibarrangelu","O":127,"NE":"Ibarrangelu","NC":"Ibarrangelu","C":562},{"Z":2094,"N":"Igorre","O":173,"NE":"Igorre","NC":"Igorre","C":3193},{"Z":2049,"N":"Ispaster","O":128,"NE":"Ispaster","NC":"Ispaster","C":548},{"Z":2910,"N":"Iurreta","O":186,"NE":"Iurreta","NC":"Iurreta","C":2948},{"Z":2050,"N":"Izurtza","O":129,"NE":"Izurtza","NC":"Izurtza","C":198},{"Z":2907,"N":"Kortezubi","O":183,"NE":"Kortezubi","NC":"Kortezubi","C":355},{"Z":2051,"N":"Lanestosa","O":130,"NE":"Lanestosa","NC":"Lanestosa","C":220},{"Z":2052,"N":"Larrabetzu","O":131,"NE":"Larrabetzu","NC":"Larrabetzu","C":1559},{"Z":2053,"N":"Laukiz","O":132,"NE":"Laukiz","NC":"Laukiz","C":900},{"Z":2054,"N":"Leioa","O":133,"NE":"Leioa","NC":"Leioa","C":24135},{"Z":2057,"N":"Lekeitio","O":136,"NE":"Lekeitio","NC":"Lekeitio","C":5749},{"Z":2055,"N":"Lemoa","O":134,"NE":"Lemoa","NC":"Lemoa","C":2662},{"Z":2056,"N":"Lemoiz","O":135,"NE":"Lemoiz","NC":"Lemoiz","C":978},{"Z":2081,"N":"Lezama","O":160,"NE":"Lezama","NC":"Lezama","C":1883},{"Z":2903,"N":"Loiu","O":179,"NE":"Loiu","NC":"Loiu","C":1838},{"Z":2058,"N":"Mallabia","O":137,"NE":"Mallabia","NC":"Mallabia","C":972},{"Z":2059,"N":"Mañaria","O":138,"NE":"Mañaria","NC":"Mañaria","C":402},{"Z":2060,"N":"Markina-Xemein","O":139,"NE":"Markina-Xemein","NC":"Markina-Xemein","C":3645},{"Z":2061,"N":"Maruri-Jatabe","O":140,"NE":"Jatabe","NC":"Maruri-Jatabe","C":762},{"Z":2062,"N":"Mendata","O":141,"NE":"Mendata","NC":"Mendata","C":300},{"Z":2063,"N":"Mendexa","O":142,"NE":"Mendexa","NC":"Mendexa","C":373},{"Z":2064,"N":"Meñaka","O":143,"NE":"Meñaka","NC":"Meñaka","C":603},{"Z":2066,"N":"Morga","O":145,"NE":"Morga","NC":"Morga","C":346},{"Z":2068,"N":"Mundaka","O":147,"NE":"Mundaka","NC":"Mundaka","C":1551},{"Z":2069,"N":"Mungia","O":148,"NE":"Mungia","NC":"Mungia","C":12765},{"Z":2007,"N":"Munitibar-Arbatzegi Gerrikaitz","O":87,"NE":"Munitibar","NC":"Munitibar-Arbatzegi-Gerrikaitz","C":365},{"Z":2908,"N":"Murueta","O":184,"NE":"Murueta","NC":"Murueta","C":245},{"Z":2071,"N":"Muskiz","O":150,"NE":"Muskiz","NC":"Muskiz","C":6118},{"Z":2067,"N":"Muxika","O":146,"NE":"Muxika","NC":"Muxika","C":1161},{"Z":2909,"N":"Nabarniz","O":185,"NE":"Nabarniz","NC":"Nabarniz","C":207},{"Z":2073,"N":"Ondarroa","O":152,"NE":"Ondarroa","NC":"Ondarroa","C":6952},{"Z":2074,"N":"Orduña","O":153,"NE":"Urduña","NC":"Orduña","C":3333},{"Z":2075,"N":"Orozko","O":154,"NE":"Orozko","NC":"Orozko","C":1975},{"Z":2083,"N":"Ortuella","O":162,"NE":"Ortuella","NC":"Ortuella","C":6950},{"Z":2072,"N":"Otxandio","O":151,"NE":"Otxandio","NC":"Otxandio","C":974},{"Z":2077,"N":"Plentzia","O":156,"NE":"Plentzia","NC":"Plentzia","C":3367},{"Z":2078,"N":"Portugalete","O":157,"NE":"Portugalete","NC":"Portugalete","C":38742},{"Z":2082,"N":"Santurtzi","O":161,"NE":"Santurtzi","NC":"Santurtzi","C":37673},{"Z":2084,"N":"Sestao","O":163,"NE":"Sestao","NC":"Sestao","C":22577},{"Z":2904,"N":"Sondika","O":180,"NE":"Sondika","NC":"Sondika","C":3504},{"Z":2085,"N":"Sopelana","O":164,"NE":"Sopela","NC":"Sopela","C":10301},{"Z":2086,"N":"Sopuerta","O":165,"NE":"Sopuerta","NC":"Sopuerta","C":2073},{"Z":2076,"N":"Sukarrieta","O":155,"NE":"Sukarrieta","NC":"Sukarrieta","C":314},{"Z":2087,"N":"Trucios-Turtzioz","O":166,"NE":"Turtzioz","NC":"Trucios","C":429},{"Z":2088,"N":"Ubide","O":167,"NE":"Ubide","NC":"Ubide","C":135},{"Z":2065,"N":"Ugao-Miraballes","O":144,"NE":"Ugao","NC":"Ugao-Miraballes","C":3315},{"Z":2089,"N":"Urduliz","O":168,"NE":"Urduliz","NC":"Urduliz","C":3266},{"Z":2022,"N":"Carranza","O":101,"NE":"Karrantza","NC":"Valle de Carranza","C":2355},{"Z":2080,"N":"Valle de Trápaga-Trapagaran","O":159,"NE":"Trapagaran","NC":"Valle de Trápaga","C":9971},{"Z":2095,"N":"Zaldibar","O":174,"NE":"Zaldibar","NC":"Zaldibar","C":2352},{"Z":2096,"N":"Zalla","O":175,"NE":"Zalla","NC":"Zalla","C":6608},{"Z":2905,"N":"Zamudio","O":181,"NE":"Zamudio","NC":"Zamudio","C":2565},{"Z":2097,"N":"Zaratamo","O":176,"NE":"Zaratamo","NC":"Zaratamo","C":1303},{"Z":2024,"N":"Zeanuri","O":103,"NE":"Zeanuri","NC":"Zeanuri","C":1003},{"Z":2025,"N":"Zeberio","O":104,"NE":"Zeberio","NC":"Zeberio","C":883},{"Z":2913,"N":"Zierbena","O":189,"NE":"Zierbena","NC":"Zierbena","C":1251},{"Z":2915,"N":"Ziortza-Bolibar","O":191,"NE":"Ziortza-Bolibar","NC":"Ziortza-Bolibar","C":362}]};
          var gip={"zonas":[{"Z":3001,"N":"Abaltzisketa","O":192,"NE":"Abaltzisketa","NC":"Abaltzisketa","C":242},{"Z":3002,"N":"Aduna","O":193,"NE":"Aduna","NC":"Aduna","C":343},{"Z":3016,"N":"Aia","O":207,"NE":"Aia","NC":"Aia","C":1514},{"Z":3003,"N":"Aizarnazabal","O":194,"NE":"Aizarnazabal","NC":"Aizarnazabal","C":541},{"Z":3004,"N":"Albiztur","O":195,"NE":"Albiztur","NC":"Albiztur","C":252},{"Z":3005,"N":"Alegia","O":196,"NE":"Alegia","NC":"Alegia","C":1261},{"Z":3006,"N":"Alkiza","O":197,"NE":"Alkiza","NC":"Alkiza","C":262},{"Z":3906,"N":"Altzaga","O":277,"NE":"Altzaga","NC":"Altzaga","C":121},{"Z":3007,"N":"Altzo","O":198,"NE":"Altzo","NC":"Altzo","C":304},{"Z":3008,"N":"Amezketa","O":199,"NE":"Amezketa","NC":"Amezketa","C":721},{"Z":3009,"N":"Andoain","O":200,"NE":"Andoain","NC":"Andoain","C":11528},{"Z":3010,"N":"Anoeta","O":201,"NE":"Anoeta","NC":"Anoeta","C":1494},{"Z":3011,"N":"Antzuola","O":202,"NE":"Antzuola","NC":"Antzuola","C":1660},{"Z":3012,"N":"Arama","O":203,"NE":"Arama","NC":"Arama","C":144},{"Z":3013,"N":"Aretxabaleta","O":204,"NE":"Aretxabaleta","NC":"Aretxabaleta","C":5427},{"Z":3014,"N":"Asteasu","O":205,"NE":"Asteasu","NC":"Asteasu","C":1111},{"Z":3903,"N":"Astigarraga","O":274,"NE":"Astigarraga","NC":"Astigarraga","C":4247},{"Z":3015,"N":"Ataun","O":206,"NE":"Ataun","NC":"Ataun","C":1272},{"Z":3017,"N":"Azkoitia","O":208,"NE":"Azkoitia","NC":"Azkoitia","C":8580},{"Z":3018,"N":"Azpeitia","O":209,"NE":"Azpeitia","NC":"Azpeitia","C":11074},{"Z":3904,"N":"Baliarrain","O":275,"NE":"Baliarrain","NC":"Baliarrain","C":96},{"Z":3019,"N":"Beasain","O":210,"NE":"Beasain","NC":"Beasain","C":10053},{"Z":3020,"N":"Beizama","O":211,"NE":"Beizama","NC":"Beizama","C":129},{"Z":3021,"N":"Belauntza","O":212,"NE":"Belauntza","NC":"Belauntza","C":199},{"Z":3022,"N":"Berastegi","O":213,"NE":"Berastegi","NC":"Berastegi","C":834},{"Z":3074,"N":"Bergara","O":264,"NE":"Bergara","NC":"Bergara","C":11610},{"Z":3023,"N":"Berrobi","O":214,"NE":"Berrobi","NC":"Berrobi","C":445},{"Z":3024,"N":"Bidania-Goiatz","O":215,"NE":"Bidania-Goiatz","NC":"Bidania-Goiatz","C":393},{"Z":3029,"N":"Deba","O":220,"NE":"Deba","NC":"Deba","C":4258},{"Z":30,"N":"Donostia","O":9,"NE":"Donostia","NC":"Donostia-San Sebastián","C":147189},{"Z":3030,"N":"Eibar","O":221,"NE":"Eibar","NC":"Eibar","C":21515},{"Z":3031,"N":"Elduain","O":222,"NE":"Elduain","NC":"Elduain","C":180},{"Z":3033,"N":"Elgeta","O":224,"NE":"Elgeta","NC":"Elgeta","C":864},{"Z":3032,"N":"Elgoibar","O":223,"NE":"Elgoibar","NC":"Elgoibar","C":8785},{"Z":3067,"N":"Errenteria","O":258,"NE":"Errenteria","NC":"Errenteria","C":30825},{"Z":3066,"N":"Errezil","O":257,"NE":"Errezil","NC":"Errezil","C":461},{"Z":3034,"N":"Eskoriatza","O":225,"NE":"Eskoriatza","NC":"Eskoriatza","C":3157},{"Z":3035,"N":"Ezkio-Itsaso","O":226,"NE":"Ezkio-Itsaso","NC":"Ezkio-Itsaso","C":482},{"Z":3038,"N":"Gabiria","O":229,"NE":"Gabiria","NC":"Gabiria","C":392},{"Z":3037,"N":"Gaintza","O":228,"NE":"Gaintza","NC":"Gaintza","C":97},{"Z":3907,"N":"Gaztelu","O":278,"NE":"Gaztelu","NC":"Gaztelu","C":120},{"Z":3039,"N":"Getaria","O":230,"NE":"Getaria","NC":"Getaria","C":2111},{"Z":3040,"N":"Hernani","O":231,"NE":"Hernani","NC":"Hernani","C":15321},{"Z":3041,"N":"Hernialde","O":232,"NE":"Hernialde","NC":"Hernialde","C":258},{"Z":3036,"N":"Hondarribia","O":227,"NE":"Hondarribia","NC":"Hondarribia","C":13148},{"Z":3042,"N":"Ibarra","O":233,"NE":"Ibarra","NC":"Ibarra","C":3251},{"Z":3043,"N":"Idiazabal","O":234,"NE":"Idiazabal","NC":"Idiazabal","C":1740},{"Z":3044,"N":"Ikaztegieta","O":235,"NE":"Ikaztegieta","NC":"Ikaztegieta","C":368},{"Z":3045,"N":"Irun","O":236,"NE":"Irun","NC":"Irun","C":46691},{"Z":3046,"N":"Irura","O":237,"NE":"Irura","NC":"Irura","C":1167},{"Z":3047,"N":"Itsasondo","O":238,"NE":"Itsasondo","NC":"Itsasondo","C":477},{"Z":3048,"N":"Larraul","O":239,"NE":"Larraul","NC":"Larraul","C":176},{"Z":3902,"N":"Lasarte-Oria","O":273,"NE":"Lasarte-Oria","NC":"Lasarte-Oria","C":14193},{"Z":3049,"N":"Lazkao","O":240,"NE":"Lazkao","NC":"Lazkao","C":4124},{"Z":3050,"N":"Leaburu","O":241,"NE":"Leaburu","NC":"Leaburu","C":263},{"Z":3051,"N":"Legazpi","O":242,"NE":"Legazpi","NC":"Legazpi","C":6904},{"Z":3052,"N":"Legorreta","O":243,"NE":"Legorreta","NC":"Legorreta","C":1091},{"Z":3068,"N":"Leintz-Gatzaga","O":259,"NE":"Leintz Gatzaga","NC":"Leintz-Gatzaga","C":183},{"Z":3053,"N":"Lezo","O":244,"NE":"Lezo","NC":"Lezo","C":4765},{"Z":3054,"N":"Lizartza","O":245,"NE":"Lizartza","NC":"Lizartza","C":447},{"Z":3901,"N":"Mendaro","O":272,"NE":"Mendaro","NC":"Mendaro","C":1441},{"Z":3055,"N":"Arrasate/Mondragón","O":246,"NE":"Arrasate","NC":"Mondragón","C":17522},{"Z":3057,"N":"Mutiloa","O":248,"NE":"Mutiloa","NC":"Mutiloa","C":201},{"Z":3056,"N":"Mutriku","O":247,"NE":"Mutriku","NC":"Mutriku","C":4104},{"Z":3063,"N":"Oiartzun","O":254,"NE":"Oiartzun","NC":"Oiartzun","C":7990},{"Z":3058,"N":"Olaberria","O":249,"NE":"Olaberria","NC":"Olaberria","C":746},{"Z":3059,"N":"Oñati","O":250,"NE":"Oñati","NC":"Oñati","C":8863},{"Z":3076,"N":"Ordizia","O":266,"NE":"Ordizia","NC":"Ordizia","C":6978},{"Z":3905,"N":"Orendain","O":276,"NE":"Orendain","NC":"Orendain","C":141},{"Z":3060,"N":"Orexa","O":251,"NE":"Orexa","NC":"Orexa","C":89},{"Z":3061,"N":"Orio","O":252,"NE":"Orio","NC":"Orio","C":4273},{"Z":3062,"N":"Ormaiztegi","O":253,"NE":"Ormaiztegi","NC":"Ormaiztegi","C":982},{"Z":3064,"N":"Pasaia","O":255,"NE":"Pasaia","NC":"Pasaia","C":12526},{"Z":3070,"N":"Segura","O":260,"NE":"Segura","NC":"Segura","C":1099},{"Z":3065,"N":"Soraluze","O":256,"NE":"Soraluze","NC":"Soraluze","C":3006},{"Z":3071,"N":"Tolosa","O":261,"NE":"Tolosa","NC":"Tolosa","C":14818},{"Z":3072,"N":"Urnieta","O":262,"NE":"Urnieta","NC":"Urnieta","C":4731},{"Z":3077,"N":"Urretxu","O":267,"NE":"Urretxu","NC":"Urretxu","C":5243},{"Z":3073,"N":"Usurbil","O":263,"NE":"Usurbil","NC":"Usurbil","C":4677},{"Z":3075,"N":"Villabona","O":265,"NE":"Villabona","NC":"Villabona","C":4359},{"Z":3078,"N":"Zaldibia","O":268,"NE":"Zaldibia","NC":"Zaldibia","C":1155},{"Z":3079,"N":"Zarautz","O":269,"NE":"Zarautz","NC":"Zarautz","C":17835},{"Z":3025,"N":"Zegama","O":216,"NE":"Zegama","NC":"Zegama","C":1144},{"Z":3026,"N":"Zerain","O":217,"NE":"Zerain","NC":"Zerain","C":202},{"Z":3027,"N":"Zestoa","O":218,"NE":"Zestoa","NC":"Zestoa","C":2816},{"Z":3028,"N":"Zizurkil","O":219,"NE":"Zizurkil","NC":"Zizurkil","C":2255},{"Z":3081,"N":"Zumaia","O":271,"NE":"Zumaia","NC":"Zumaia","C":7460},{"Z":3080,"N":"Zumarraga","O":270,"NE":"Zumarraga","NC":"Zumarraga","C":7900}]}
          //var nav={"zonas":[{"Z":4001,"N":"Abáigar","O":279,"NE":"Abaigar","NC":"Abáigar","C":90},{"Z":4002,"N":"Abárzuza","O":280,"NE":"Abartzuza","NC":"Abárzuza","C":424},{"Z":4003,"N":"Abaurregaina/Abaurrea Alta","O":281,"NE":"Abaurregaina","NC":"Abaurrea Alta","C":124},{"Z":4004,"N":"Abaurrepea/Abaurrea Baja","O":282,"NE":"Abaurrepea","NC":"Abaurrea Baja","C":35},{"Z":4005,"N":"Aberin","O":283,"NE":"Aberin","NC":"Aberin","C":296},{"Z":4006,"N":"Ablitas","O":284,"NE":"Ablitas","NC":"Ablitas","C":1952},{"Z":4007,"N":"Adiós","O":285,"NE":"Adios","NC":"Adiós","C":136},{"Z":4008,"N":"Aguilar de Codés","O":286,"NE":"Aguilar Kodes","NC":"Aguilar de Codés","C":80},{"Z":4009,"N":"Aibar/Oibar","O":287,"NE":"Oibar","NC":"Aibar","C":690},{"Z":4011,"N":"Allín","O":289,"NE":"Allin","NC":"Allín","C":697},{"Z":4012,"N":"Allo","O":290,"NE":"Allo","NC":"Allo","C":814},{"Z":4010,"N":"Altsasu/Alsasua","O":288,"NE":"Altsasu","NC":"Alsasua","C":5721},{"Z":4013,"N":"Améscoa Baja","O":291,"NE":"Ameskoabarrena","NC":"Améscoa Baja","C":661},{"Z":4014,"N":"Ancín","O":292,"NE":"Antzin","NC":"Ancín","C":274},{"Z":4015,"N":"Andosilla","O":293,"NE":"Andosilla","NC":"Andosilla","C":2001},{"Z":4016,"N":"Ansoáin","O":294,"NE":"Antsoain","NC":"Ansoáin","C":7642},{"Z":4017,"N":"Anue","O":295,"NE":"Anue","NC":"Anue","C":361},{"Z":4018,"N":"Añorbe","O":296,"NE":"Añorbe","NC":"Añorbe","C":409},{"Z":4019,"N":"Aoiz/Agoitz","O":297,"NE":"Agoitz","NC":"Aoiz","C":1809},{"Z":4020,"N":"Araitz","O":298,"NE":"Araitz","NC":"Araitz","C":454},{"Z":4025,"N":"Arakil","O":303,"NE":"Arakil","NC":"Arakil","C":768},{"Z":4021,"N":"Aranarache","O":299,"NE":"Aranaratxe","NC":"Aranarache","C":64},{"Z":4023,"N":"Aranguren","O":301,"NE":"Aranguren","NC":"Aranguren","C":6826},{"Z":4024,"N":"Arano","O":302,"NE":"Arano","NC":"Arano","C":102},{"Z":4022,"N":"Arantza","O":300,"NE":"Arantza","NC":"Arantza","C":526},{"Z":4026,"N":"Aras","O":304,"NE":"Aras","NC":"Aras","C":147},{"Z":4027,"N":"Arbizu","O":305,"NE":"Arbizu","NC":"Arbizu","C":838},{"Z":4028,"N":"Arce/Artzi","O":306,"NE":"Artzibar","NC":"Arce","C":211},{"Z":4030,"N":"Arellano","O":308,"NE":"Arellano","NC":"Arellano","C":145},{"Z":4031,"N":"Areso","O":309,"NE":"Areso","NC":"Areso","C":221},{"Z":4032,"N":"Arguedas","O":310,"NE":"Arguedas","NC":"Arguedas","C":1733},{"Z":4033,"N":"Aria","O":311,"NE":"Aria","NC":"Aria","C":49},{"Z":4034,"N":"Aribe","O":312,"NE":"Aribe","NC":"Aribe","C":40},{"Z":4035,"N":"Armañanzas","O":313,"NE":"Armañantzas","NC":"Armañanzas","C":63},{"Z":4036,"N":"Arróniz","O":314,"NE":"Arronitz","NC":"Arróniz","C":921},{"Z":4037,"N":"Arruazu","O":315,"NE":"Arruazu","NC":"Arruazu","C":86},{"Z":4038,"N":"Artajona","O":316,"NE":"Artaxoa","NC":"Artajona","C":1348},{"Z":4039,"N":"Artazu","O":317,"NE":"Artazu","NC":"Artazu","C":83},{"Z":4040,"N":"Atez","O":318,"NE":"Atetz","NC":"Atez","C":194},{"Z":4041,"N":"Ayegui","O":319,"NE":"Aiegi","NC":"Ayegui","C":1583},{"Z":4042,"N":"Azagra","O":320,"NE":"Azagra","NC":"Azagra","C":2744},{"Z":4043,"N":"Azuelo","O":321,"NE":"Azuelo","NC":"Azuelo","C":38},{"Z":4044,"N":"Bakaiku","O":322,"NE":"Bakaiku","NC":"Bakaiku","C":290},{"Z":4901,"N":"Barañain","O":542,"NE":"Barañain","NC":"Barañáin","C":15475},{"Z":4045,"N":"Barásoain","O":323,"NE":"Barasoain","NC":"Barasoáin","C":504},{"Z":4046,"N":"Barbarin","O":324,"NE":"Barbarin","NC":"Barbarin","C":60},{"Z":4047,"N":"Bargota","O":325,"NE":"Bargota","NC":"Bargota","C":261},{"Z":4048,"N":"Barillas","O":326,"NE":"Barillas","NC":"Barillas","C":169},{"Z":4049,"N":"Basaburua","O":327,"NE":"Basaburua","NC":"Basaburua","C":704},{"Z":4050,"N":"Baztan","O":328,"NE":"Baztan","NC":"Baztan","C":6058},{"Z":4051,"N":"Beire","O":329,"NE":"Beire","NC":"Beire","C":253},{"Z":4052,"N":"Belascoáin","O":330,"NE":"Beraskoain","NC":"Belascoáin","C":88},{"Z":4250,"N":"Bera/Vera de Bidasoa","O":526,"NE":"Bera","NC":"Bera","C":2832},{"Z":4053,"N":"Berbinzana","O":331,"NE":"Berbintzana","NC":"Berbinzana","C":532},{"Z":4905,"N":"Beriáin","O":546,"NE":"Beriain","NC":"Beriain","C":2847},{"Z":4902,"N":"Berrioplano","O":543,"NE":"Berriobeiti","NC":"Berrioplano","C":4346},{"Z":4903,"N":"Berriozar","O":544,"NE":"Berriozar","NC":"Berriozar","C":6593},{"Z":4054,"N":"Bertizarana","O":332,"NE":"Bertizarana","NC":"Bertizarana","C":460},{"Z":4055,"N":"Betelu","O":333,"NE":"Betelu","NC":"Betelu","C":259},{"Z":4253,"N":"Bidaurreta","O":529,"NE":"Bidaurreta","NC":"Bidaurreta","C":129},{"Z":4056,"N":"Biurrun-Olcoz","O":334,"NE":"Biurrun-Olkotz","NC":"Biurrun-Olcoz","C":179},{"Z":4057,"N":"Buñuel","O":335,"NE":"Buñuel","NC":"Buñuel","C":1812},{"Z":4058,"N":"Auritz/Burguete","O":336,"NE":"Auritz","NC":"Burguete","C":215},{"Z":4059,"N":"Burgui/Burgi","O":337,"NE":"Burgi","NC":"Burgui","C":191},{"Z":4060,"N":"Burlata/Burlada","O":338,"NE":"Burlata","NC":"Burlada","C":13723},{"Z":4062,"N":"Cabanillas","O":340,"NE":"Cabanillas","NC":"Cabanillas","C":1088},{"Z":4063,"N":"Cabredo","O":341,"NE":"Cabredo","NC":"Cabredo","C":88},{"Z":4064,"N":"Cadreita","O":342,"NE":"Cadreita","NC":"Cadreita","C":1447},{"Z":4065,"N":"Caparroso","O":343,"NE":"Caparroso","NC":"Caparroso","C":1892},{"Z":4066,"N":"Carcar","O":344,"NE":"Carcar","NC":"Cárcar","C":867},{"Z":4067,"N":"Carcastillo","O":345,"NE":"Zarrakaztelu","NC":"Carcastillo","C":1938},{"Z":4068,"N":"Cascante","O":346,"NE":"Cascante","NC":"Cascante","C":2893},{"Z":4069,"N":"Cáseda","O":347,"NE":"Kaseda","NC":"Cáseda","C":847},{"Z":4070,"N":"Castejón","O":348,"NE":"Castejon","NC":"Castejón","C":2652},{"Z":4071,"N":"Castillonuevo","O":349,"NE":"Gazteluberri","NC":"Castillo-Nuevo","C":17},{"Z":4193,"N":"Oltza","O":471,"NE":"Oltza zendea","NC":"Cendea de Olza","C":1414},{"Z":4072,"N":"Cintruénigo","O":350,"NE":"Cintruenigo","NC":"Cintruénigo","C":5288},{"Z":4074,"N":"Cirauqui","O":352,"NE":"Zirauki","NC":"Cirauqui","C":394},{"Z":4075,"N":"Ciriza","O":353,"NE":"Ziritza","NC":"Ciriza","C":101},{"Z":4076,"N":"Cizur","O":354,"NE":"Zizur","NC":"Cizur","C":2407},{"Z":4077,"N":"Corella","O":355,"NE":"Corella","NC":"Corella","C":5384},{"Z":4078,"N":"Cortes","O":356,"NE":"Cortes","NC":"Cortes","C":2447},{"Z":4079,"N":"Desojo","O":357,"NE":"Desoio","NC":"Desojo","C":76},{"Z":4080,"N":"Dicastillo","O":358,"NE":"Deikaztelu","NC":"Dicastillo","C":510},{"Z":4081,"N":"Donamaria","O":359,"NE":"Donamaria","NC":"Donamaria","C":342},{"Z":4083,"N":"Echarri","O":361,"NE":"Etxarri","NC":"Echarri","C":56},{"Z":4086,"N":"Egüés","O":364,"NE":"Eguesibar","NC":"Egüés","C":12987},{"Z":4061,"N":"Busto (El)","O":339,"NE":"El Busto","NC":"El Busto","C":56},{"Z":4087,"N":"Elgorriaga","O":365,"NE":"Elgorriaga","NC":"Elgorriaga","C":169},{"Z":4089,"N":"Enériz","O":367,"NE":"Eneritz","NC":"Enériz","C":242},{"Z":4090,"N":"Eratsun","O":368,"NE":"Eratsun","NC":"Eratsun","C":146},{"Z":4091,"N":"Ergoiena","O":369,"NE":"Ergoiena","NC":"Ergoiena","C":347},{"Z":4092,"N":"Erro","O":370,"NE":"Erroibar","NC":"Erro","C":662},{"Z":4093,"N":"Ezcároz/Ezkaroze","O":371,"NE":"Ezkaroze","NC":"Escároz","C":293},{"Z":4094,"N":"Eslava","O":372,"NE":"Eslaba","NC":"Eslava","C":112},{"Z":4095,"N":"Esparza de Salazar","O":373,"NE":"Espartza","NC":"Esparza de Salazar","C":76},{"Z":4096,"N":"Espronceda","O":374,"NE":"Esprontzeda","NC":"Espronceda","C":115},{"Z":4097,"N":"Estella/Lizarra","O":375,"NE":"Lizarra","NC":"Estella","C":10436},{"Z":4098,"N":"Esteribar","O":376,"NE":"Esteribar","NC":"Esteribar","C":1918},{"Z":4099,"N":"Etayo","O":377,"NE":"Etaiu","NC":"Etayo","C":63},{"Z":4082,"N":"Etxalar","O":360,"NE":"Etxalar","NC":"Etxalar","C":615},{"Z":4084,"N":"Etxarri-Aranatz","O":362,"NE":"Etxarri Aranatz","NC":"Etxarri Aranatz","C":1935},{"Z":4085,"N":"Etxauri","O":363,"NE":"Etxauri","NC":"Etxauri","C":471},{"Z":4100,"N":"Eulate","O":378,"NE":"Eulate","NC":"Eulate","C":264},{"Z":4101,"N":"Ezcabarte","O":379,"NE":"Ezkabarte","NC":"Ezcabarte","C":1390},{"Z":4102,"N":"Ezkurra","O":380,"NE":"Ezkurra","NC":"Ezkurra","C":146},{"Z":4103,"N":"Ezprogui","O":381,"NE":"Ezporogi","NC":"Ezprogui","C":46},{"Z":4104,"N":"Falces","O":382,"NE":"Faltzes","NC":"Falces","C":1876},{"Z":4105,"N":"Fitero","O":383,"NE":"Fitero","NC":"Fitero","C":1535},{"Z":4106,"N":"Fontellas","O":384,"NE":"Fontellas","NC":"Fontellas","C":689},{"Z":4107,"N":"Funes","O":385,"NE":"Funes","NC":"Funes","C":1707},{"Z":4108,"N":"Fustiñana","O":386,"NE":"Fustiñana","NC":"Fustiñana","C":1878},{"Z":4109,"N":"Galar","O":387,"NE":"Galar","NC":"Galar","C":1562},{"Z":4110,"N":"Gallipienzo","O":388,"NE":"Galipentzu","NC":"Gallipienzo","C":90},{"Z":4111,"N":"Gallués/Galoze","O":389,"NE":"Galoze","NC":"Gallués","C":96},{"Z":4112,"N":"Garaioa","O":390,"NE":"Garaioa","NC":"Garaioa","C":94},{"Z":4113,"N":"Garde","O":391,"NE":"Garde","NC":"Garde","C":137},{"Z":4114,"N":"Garínoain","O":392,"NE":"Garinoain","NC":"Garínoain","C":362},{"Z":4115,"N":"Garralda","O":393,"NE":"Garralda","NC":"Garralda","C":166},{"Z":4116,"N":"Genevilla","O":394,"NE":"Genevilla","NC":"Genevilla","C":65},{"Z":4117,"N":"Goizueta","O":395,"NE":"Goizueta","NC":"Goizueta","C":620},{"Z":4118,"N":"Goñi","O":396,"NE":"Goñerri","NC":"Goñi","C":165},{"Z":4119,"N":"Guesa/Gorza","O":397,"NE":"Gorza","NC":"Güesa","C":40},{"Z":4120,"N":"Guesálaz","O":398,"NE":"Gesalatz","NC":"Guesálaz","C":394},{"Z":4121,"N":"Guirguillano","O":399,"NE":"Girgillao","NC":"Guirguillano","C":64},{"Z":4122,"N":"Huarte/Uharte","O":400,"NE":"Uharte","NC":"Huarte","C":4719},{"Z":4124,"N":"Ibargoiti","O":402,"NE":"Ibargoiti","NC":"Ibargoiti","C":210},{"Z":4259,"N":"Igantzi","O":535,"NE":"Igantzi","NC":"Igantzi","C":485},{"Z":4125,"N":"Igúzquiza","O":403,"NE":"Iguzkitza","NC":"Igúzquiza","C":275},{"Z":4126,"N":"Imotz","O":404,"NE":"Imotz","NC":"Imotz","C":357},{"Z":4127,"N":"Irañeta","O":405,"NE":"Irañeta","NC":"Irañeta","C":143},{"Z":4904,"N":"Irurtzun","O":545,"NE":"Irurtzun","NC":"Irurtzun","C":1559},{"Z":4128,"N":"Isaba/Izaba","O":406,"NE":"Izaba","NC":"Isaba","C":370},{"Z":4129,"N":"Ituren","O":407,"NE":"Ituren","NC":"Ituren","C":393},{"Z":4130,"N":"Iturmendi","O":408,"NE":"Iturmendi","NC":"Iturmendi","C":310},{"Z":4131,"N":"Iza","O":409,"NE":"Itza","NC":"Iza","C":871},{"Z":4132,"N":"Izagaondoa","O":410,"NE":"Itzagaondoa","NC":"Izagaondoa","C":146},{"Z":4133,"N":"Izalzu/Itzaltzu","O":411,"NE":"Itzaltzu","NC":"Izalzu","C":44},{"Z":4134,"N":"Jaurrieta","O":412,"NE":"Jaurrieta","NC":"Jaurrieta","C":178},{"Z":4135,"N":"Javier","O":413,"NE":"Xabier","NC":"Javier","C":102},{"Z":4136,"N":"Juslapeña","O":414,"NE":"Txulapain","NC":"Juslapeña","C":444},{"Z":4137,"N":"Labaien","O":415,"NE":"Labaien","NC":"Labaien","C":208},{"Z":4138,"N":"Lakuntza","O":416,"NE":"Lakuntza","NC":"Lakuntza","C":934},{"Z":4139,"N":"Lana","O":417,"NE":"Lana","NC":"Lana","C":159},{"Z":4140,"N":"Lantz","O":418,"NE":"Lantz","NC":"Lantz","C":116},{"Z":4141,"N":"Lapoblación","O":419,"NE":"Lapoblacion","NC":"Lapoblación","C":109},{"Z":4142,"N":"Larraga","O":420,"NE":"Larraga","NC":"Larraga","C":1411},{"Z":4143,"N":"Larraona","O":421,"NE":"Larragoa","NC":"Larraona","C":98},{"Z":4144,"N":"Larraun","O":422,"NE":"Larraun","NC":"Larraun","C":804},{"Z":4145,"N":"Lazagurría","O":423,"NE":"Elizagorria","NC":"Lazagurría","C":171},{"Z":4146,"N":"Leache","O":424,"NE":"Leatxe","NC":"Leache","C":35},{"Z":4147,"N":"Legarda","O":425,"NE":"Legarda","NC":"Legarda","C":98},{"Z":4148,"N":"Legaria","O":426,"NE":"Legaria","NC":"Legaria","C":93},{"Z":4149,"N":"Leitza","O":427,"NE":"Leitza","NC":"Leitza","C":2338},{"Z":4908,"N":"Lekunberri","O":549,"NE":"Lekunberri","NC":"Lekunberri","C":1008},{"Z":4150,"N":"Leoz","O":428,"NE":"Leotz","NC":"Leoz","C":213},{"Z":4151,"N":"Lerga","O":429,"NE":"Lerga","NC":"Lerga","C":67},{"Z":4152,"N":"Lerín","O":430,"NE":"Lerin","NC":"Lerín","C":1347},{"Z":4153,"N":"Lesaka","O":431,"NE":"Lesaka","NC":"Lesaka","C":2172},{"Z":4154,"N":"Lezáun","O":432,"NE":"Lezaun","NC":"Lezáun","C":227},{"Z":4155,"N":"Liédena","O":433,"NE":"Ledea","NC":"Liédena","C":253},{"Z":4156,"N":"Lizoain-Arriasgoiti","O":434,"NE":"Lizoain-Arriasgoiti","NC":"Lizoain-Arriasgoiti","C":252},{"Z":4157,"N":"Lodosa","O":435,"NE":"Lodosa","NC":"Lodosa","C":3546},{"Z":4158,"N":"Lónguida/Longida","O":436,"NE":"Longida","NC":"Lónguida","C":252},{"Z":4029,"N":"Arcos (Los)","O":307,"NE":"Los Arcos","NC":"Los Arcos","C":925},{"Z":4159,"N":"Lumbier","O":437,"NE":"Irunberri","NC":"Lumbier","C":1134},{"Z":4160,"N":"Luquin","O":438,"NE":"Lukin","NC":"Luquin","C":107},{"Z":4161,"N":"Mañeru","O":439,"NE":"Mañeru","NC":"Mañeru","C":344},{"Z":4162,"N":"Marañón","O":440,"NE":"Marañon","NC":"Marañón","C":47},{"Z":4163,"N":"Marcilla","O":441,"NE":"Martzilla","NC":"Marcilla","C":2017},{"Z":4164,"N":"Mélida","O":442,"NE":"Melida","NC":"Mélida","C":582},{"Z":4165,"N":"Mendavia","O":443,"NE":"Mendabia","NC":"Mendavia","C":2794},{"Z":4166,"N":"Mendaza","O":444,"NE":"Mendaza","NC":"Mendaza","C":260},{"Z":4167,"N":"Mendigorría","O":445,"NE":"Mendigorria","NC":"Mendigorría","C":827},{"Z":4168,"N":"Metauten","O":446,"NE":"Metauten","NC":"Metauten","C":248},{"Z":4169,"N":"Milagro","O":447,"NE":"Milagro","NC":"Milagro","C":2217},{"Z":4170,"N":"Mirafuentes","O":448,"NE":"Mirafuentes","NC":"Mirafuentes","C":49},{"Z":4171,"N":"Miranda de Arga","O":449,"NE":"Miranda Arga","NC":"Miranda de Arga","C":693},{"Z":4172,"N":"Monreal","O":450,"NE":"Elo","NC":"Monreal","C":367},{"Z":4173,"N":"Monteagudo","O":451,"NE":"Monteagudo","NC":"Monteagudo","C":873},{"Z":4174,"N":"Morentin","O":452,"NE":"Morentin","NC":"Morentin","C":110},{"Z":4175,"N":"Mues","O":453,"NE":"Mues","NC":"Mués","C":72},{"Z":4176,"N":"Murchante","O":454,"NE":"Murchante","NC":"Murchante","C":2856},{"Z":4177,"N":"Murieta","O":455,"NE":"Murieta","NC":"Murieta","C":262},{"Z":4178,"N":"Murillo el Cuende","O":456,"NE":"Murillo el Cuende","NC":"Murillo el Cuende","C":495},{"Z":4179,"N":"Murillo el Fruto","O":457,"NE":"Murillo el Fruto","NC":"Murillo el Fruto","C":509},{"Z":4180,"N":"Muruzábal","O":458,"NE":"Muruzabal","NC":"Muruzábal","C":216},{"Z":4181,"N":"Navascués","O":459,"NE":"Nabaskoze","NC":"Navascués","C":150},{"Z":4182,"N":"Nazar","O":460,"NE":"Nazar","NC":"Nazar","C":37},{"Z":4088,"N":"Noáin (Valle de Elorz)","O":366,"NE":"Noain Elortzibar","NC":"Noain","C":5574},{"Z":4183,"N":"Obanos","O":461,"NE":"Obanos","NC":"Obanos","C":681},{"Z":4185,"N":"Ochagavía/Otsagabia","O":463,"NE":"Otsagabia","NC":"Ochagavía","C":501},{"Z":4184,"N":"Oco","O":462,"NE":"Oko","NC":"Oco","C":61},{"Z":4186,"N":"Odieta","O":464,"NE":"Odieta","NC":"Odieta","C":302},{"Z":4187,"N":"Oitz","O":465,"NE":"Oitz","NC":"Oitz","C":111},{"Z":4188,"N":"Olaibar","O":466,"NE":"Olaibar","NC":"Oláibar","C":227},{"Z":4189,"N":"Olazti/Olazagutía","O":467,"NE":"Olatzagutia","NC":"Olazagutía","C":1170},{"Z":4190,"N":"Olejua","O":468,"NE":"Olexua","NC":"Olejua","C":44},{"Z":4191,"N":"Olite","O":469,"NE":"Erriberri","NC":"Olite","C":3018},{"Z":4194,"N":"Ollo","O":472,"NE":"Ollaran","NC":"Ollo","C":315},{"Z":4192,"N":"Olóriz","O":470,"NE":"Oloritz","NC":"Olóriz","C":159},{"Z":4195,"N":"Orbaizeta","O":473,"NE":"Orbaizeta","NC":"Orbaizeta","C":180},{"Z":4196,"N":"Orbara","O":474,"NE":"Orbara","NC":"Orbara","C":39},{"Z":4197,"N":"Orísoain","O":475,"NE":"Orisoain","NC":"Orísoain","C":70},{"Z":4906,"N":"Orkoien","O":547,"NE":"Orkoien","NC":"Orkoien","C":2553},{"Z":4198,"N":"Oronz/Orontze","O":476,"NE":"Orontze","NC":"Oronz","C":36},{"Z":4199,"N":"Orotz-Betelu","O":477,"NE":"Orotz-Betelu","NC":"Orotz-Betelu","C":150},{"Z":4200,"N":"Oteiza","O":478,"NE":"Oteitza","NC":"Oteiza","C":764},{"Z":40,"N":"Iruña","O":10,"NE":"Iruñea","NC":"Pamplona-Iruña","C":147803},{"Z":4202,"N":"Peralta","O":479,"NE":"Azkoien","NC":"Peralta","C":4326},{"Z":4203,"N":"Petilla de Aragón","O":480,"NE":"Petilla Aragoi","NC":"Petilla de Aragón","C":40},{"Z":4204,"N":"Piedramillera","O":481,"NE":"Piedramillera","NC":"Piedramillera","C":37},{"Z":4205,"N":"Pitillas","O":482,"NE":"Pitillas","NC":"Pitillas","C":427},{"Z":4206,"N":"Puente la Reina/Gares","O":483,"NE":"Gares","NC":"Puente la Reina","C":2095},{"Z":4207,"N":"Pueyo","O":484,"NE":"Puiu","NC":"Pueyo","C":271},{"Z":4208,"N":"Ribaforada","O":485,"NE":"Ribaforada","NC":"Ribaforada","C":2569},{"Z":4209,"N":"Romanzado","O":486,"NE":"Erromantzatua","NC":"Romanzado","C":157},{"Z":4210,"N":"Roncal/Erronkari","O":487,"NE":"Erronkari","NC":"Roncal","C":199},{"Z":4211,"N":"Orreaga/Roncesvalles","O":488,"NE":"Orreaga","NC":"Roncesvalles","C":25},{"Z":4212,"N":"Sada","O":489,"NE":"Zare","NC":"Sada","C":151},{"Z":4213,"N":"Saldías","O":490,"NE":"Saldias","NC":"Saldias","C":105},{"Z":4214,"N":"Salinas de Oro","O":491,"NE":"Jaitz","NC":"Salinas de Oro","C":93},{"Z":4215,"N":"San Adrián","O":492,"NE":"San Adrian","NC":"San Adrián","C":4649},{"Z":4217,"N":"San Martín de Unx","O":494,"NE":"San Martín de Unx","NC":"San Martín de Unx","C":337},{"Z":4216,"N":"Sangüesa/Zangoza","O":493,"NE":"Zangoza","NC":"Sangüesa","C":3882},{"Z":4219,"N":"Sansol","O":495,"NE":"Santsol","NC":"Sansol","C":88},{"Z":4220,"N":"Santacara","O":496,"NE":"Santakara","NC":"Santacara","C":752},{"Z":4221,"N":"Doneztebe/Santesteban","O":497,"NE":"Doneztebe","NC":"Santesteban","C":1211},{"Z":4222,"N":"Sarriés/Sartze","O":498,"NE":"Sartze","NC":"Sarriés","C":63},{"Z":4223,"N":"Sartaguda","O":499,"NE":"Sartaguda","NC":"Sartaguda","C":995},{"Z":4224,"N":"Sesma","O":500,"NE":"Sesma","NC":"Sesma","C":914},{"Z":4225,"N":"Sorlada","O":501,"NE":"Sorlada","NC":"Sorlada","C":36},{"Z":4226,"N":"Sunbilla","O":502,"NE":"Sunbilla","NC":"Sunbilla","C":585},{"Z":4227,"N":"Tafalla","O":503,"NE":"Tafalla","NC":"Tafalla","C":8226},{"Z":4228,"N":"Tiebas-Muruarte de Reta","O":504,"NE":"Tiebas-Muru Artederreta","NC":"Tiebas-Muruarte de Reta","C":496},{"Z":4229,"N":"Tirapu","O":505,"NE":"Tirapu","NC":"Tirapu","C":50},{"Z":4230,"N":"Torralba del Río","O":506,"NE":"Torralba del Rio","NC":"Torralba del Río","C":107},{"Z":4231,"N":"Torres del Río","O":507,"NE":"Torres del Rio","NC":"Torres del Río","C":115},{"Z":4232,"N":"Tudela","O":508,"NE":"Tutera","NC":"Tudela","C":25152},{"Z":4233,"N":"Tulebras","O":509,"NE":"Tulebras","NC":"Tulebras","C":96},{"Z":4234,"N":"Ucar","O":510,"NE":"Ukar","NC":"Úcar","C":144},{"Z":4123,"N":"Uharte-Arakil","O":401,"NE":"Uharte Arakil","NC":"Uharte Arakil","C":654},{"Z":4235,"N":"Ujué","O":511,"NE":"Uxue","NC":"Ujué","C":166},{"Z":4236,"N":"Ultzama","O":512,"NE":"Ultzama","NC":"Ultzama","C":1324},{"Z":4237,"N":"Unciti","O":513,"NE":"Untzitibar","NC":"Unciti","C":195},{"Z":4238,"N":"Unzué","O":514,"NE":"Untzue","NC":"Unzué","C":110},{"Z":4239,"N":"Urdazubi/Urdax","O":515,"NE":"Urdazubi","NC":"Urdax","C":310},{"Z":4240,"N":"Urdiain","O":516,"NE":"Urdiain","NC":"Urdiain","C":531},{"Z":4241,"N":"Urraul Alto","O":517,"NE":"Urraulgoiti","NC":"Urraul Alto","C":134},{"Z":4242,"N":"Urraul Bajo","O":518,"NE":"Urraulbeiti","NC":"Urraul Bajo","C":253},{"Z":4244,"N":"Urrotz","O":520,"NE":"Urrotz","NC":"Urrotz","C":156},{"Z":4243,"N":"Urroz","O":519,"NE":"Urroz","NC":"Urroz","C":314},{"Z":4245,"N":"Urzainqui/Urzainki","O":521,"NE":"Urzainki","NC":"Urzainqui","C":83},{"Z":4246,"N":"Uterga","O":522,"NE":"Uterga","NC":"Uterga","C":140},{"Z":4247,"N":"Uztárroz/Uztarroze","O":523,"NE":"Uztarroze","NC":"Uztárroz","C":152},{"Z":4248,"N":"Luzaide/Valcarlos","O":524,"NE":"Luzaide","NC":"Valcarlos","C":295},{"Z":4249,"N":"Valtierra","O":525,"NE":"Valtierra","NC":"Valtierra","C":1885},{"Z":4251,"N":"Viana","O":527,"NE":"Viana","NC":"Viana","C":3110},{"Z":4252,"N":"Vidángoz/Bidankoze","O":528,"NE":"Bidankoze","NC":"Vidángoz","C":87},{"Z":4254,"N":"Villafranca","O":530,"NE":"Villafranca","NC":"Villafranca","C":1920},{"Z":4255,"N":"Villamayor de Monjardín","O":531,"NE":"Villamayor de Monjardin","NC":"Villamayor de Monjardín","C":102},{"Z":4256,"N":"Hiriberri/Villanueva de Aezkoa","O":532,"NE":"Hiriberri","NC":"Villanueva de Aezkoa","C":109},{"Z":4257,"N":"Villatuerta","O":533,"NE":"Villatuerta","NC":"Villatuerta","C":866},{"Z":4258,"N":"Villava/Atarrabia","O":534,"NE":"Atarrabia","NC":"Villava","C":7841},{"Z":4260,"N":"Yerri/Deierri","O":536,"NE":"Deierri","NC":"Yerri","C":1245},{"Z":4261,"N":"Yesa","O":537,"NE":"Esa","NC":"Yesa","C":235},{"Z":4262,"N":"Zabalza","O":538,"NE":"Zabaltza","NC":"Zabalza","C":206},{"Z":4073,"N":"Ziordia","O":351,"NE":"Ziordia","NC":"Ziordia","C":315},{"Z":4907,"N":"Zizur Mayor/Zizur Nagusia","O":548,"NE":"Zizur Nagusia","NC":"Zizur Mayor","C":10677},{"Z":4263,"N":"Zubieta","O":539,"NE":"Zubieta","NC":"Zubieta","C":236},{"Z":4264,"N":"Zugarramurdi","O":540,"NE":"Zugarramurdi","NC":"Zugarramurdi","C":179},{"Z":4265,"N":"Zúñiga","O":541,"NE":"Zuñiga","NC":"Zúñiga","C":86}]};
          for(var i=0;i<gen.zonas.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+gen.zonas[i]['NC']+gen.zonas[i]['Z']);
            for(var k=0;k<elToChange.length;k++){
              if(l==='es'){
                elToChange[k].innerHTML=gen.zonas[i]['NC'];
              }
              else if(l==='eu'){
                elToChange[k].innerHTML=gen.zonas[i]['NE'];
              }
            }
          }

             findElement=function(collection, value, attrName)
          {
            for (var i = 0, len = collection.length; i < len; i++)
            {
              var collection_value = collection[i][attrName];
              if (collection_value == value)
              {
                return collection[i];
              }
            }
            return null;
          }
          var elToChange=document.querySelector('#fullTemp').querySelectorAll('x-select');
          for(var i=0;i<elToChange.length;i++){
            var isInGen=findElement(gen.zonas,elToChange[i].getAttribute('val'),'Z');
            var isInAr=findElement(ar.zonas,elToChange[i].getAttribute('val'),'Z');
            var isInViz=findElement(viz.zonas,elToChange[i].getAttribute('val'),'Z');
            var isInGip=findElement(gip.zonas,elToChange[i].getAttribute('val'),'Z');
            //var isInNav=findElement(nav.zonas,elToChange[i].getAttribute('val'),'Z');
            if(isInGen!==null){
              if(l==='es'){
                elToChange[i].$.selectBut.innerHTML=isInGen['NC'];
              }
              else if(l==='eu'){
                elToChange[i].$.selectBut.innerHTML=isInGen['NE'];
              }
            }
            else if(isInAr!==null){
              if(l==='es'){
                elToChange[i].$.selectBut.innerHTML=isInAr['NC'];
              }
              else if(l==='eu'){
                elToChange[i].$.selectBut.innerHTML=isInAr['NE'];
              }
            }
            else if(isInViz!==null){
              if(l==='es'){
                elToChange[i].$.selectBut.innerHTML=isInViz['NC'];
              }
              else if(l==='eu'){
                elToChange[i].$.selectBut.innerHTML=isInViz['NE'];
              }
            }
            else if(isInGip!==null){
              if(l==='es'){
                elToChange[i].$.selectBut.innerHTML=isInGip['NC'];
              }
              else if(l==='eu'){
                elToChange[i].$.selectBut.innerHTML=isInGip['NE'];
              }
            }
            /*else if(isInNav!==null){
              if(l==='es'){
                elToChange[i].$.selectBut.innerHTML=isInNav['NC'];
              }
              else if(l==='eu'){
                elToChange[i].$.selectBut.innerHTML=isInNav['NE'];
              }
            }*/
          }
          for(var i=0;i<ar.zonas.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+ar.zonas[i]['NC']+ar.zonas[i]['Z']);
            for(var k=0;k<elToChange.length;k++){
              if(l==='es'){
                elToChange[k].innerHTML=ar.zonas[i]['NC'];
              }
              else if(l==='eu'){
                elToChange[k].innerHTML=ar.zonas[i]['NE'];
              }
            }
          }
          for(var i=0;i<viz.zonas.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+viz.zonas[i]['NC']+viz.zonas[i]['Z']);
            for(var k=0;k<elToChange.length;k++){
              if(l==='es'){
                elToChange[k].innerHTML=viz.zonas[i]['NC'];
              }
              else if(l==='eu'){
                elToChange[k].innerHTML=viz.zonas[i]['NE'];
              }
            }
          }
          for(var i=0;i<gip.zonas.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+gip.zonas[i]['NC']+gip.zonas[i]['Z']);
            for(var k=0;k<elToChange.length;k++){
              if(l==='es'){
                elToChange[k].innerHTML=gip.zonas[i]['NC'];
              }
              else if(l==='eu'){
                elToChange[k].innerHTML=gip.zonas[i]['NE'];
              }
            }
          }
          /*for(var i=0;i<nav.zonas.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+nav.zonas[i]['NC']+nav.zonas[i]['Z']);
            for(var k=0;k<elToChange.length;k++){
              if(l==='es'){
                elToChange[k].innerHTML=nav.zonas[i]['NC'];
              }
              else if(l==='eu'){
                elToChange[k].innerHTML=nav.zonas[i]['NE'];
              }
            }
          }*/

          var elToChange=document.querySelector('#fullTemp').querySelectorAll('#imgAvisoCam');
            for(var k=0;k<elToChange.length;k++){
              if(l==='es'){
                elToChange[k].src='../resources/configPanel/img/camara/camconfiges.png';
              }
              else if(l==='eu'){
                elToChange[k].src='../resources/configPanel/img/camara/camconfigeu.png';
              }
            }

            /*var elToChange=document.querySelector('#fullTemp').querySelectorAll('#imgAvisoRadio');
            for(var k=0;k<elToChange.length;k++){
              if(l==='es'){
                elToChange[k].src='../resources/configPanel/img/radio/radconfes.png';
              }
              else if(l==='eu'){
                elToChange[k].src='../resources/configPanel/img/radio/radconfeu.png';
              }
            }*/

        }
      }

      _this.changeSoundSWActive();
    }
  },500);

  }
  document.addEventListener('agentChange',this.onAgentChange.bind(this));


  this.onLanguageChange=function(event){
      if(event.detail.value==='es' || event.detail.value==='eu'){
          var elToChange1=document.querySelector('#fullTemp').querySelectorAll('#arMun');
          var elToChange2=document.querySelector('#fullTemp').querySelectorAll('#vizMun');
          var elToChange3=document.querySelector('#fullTemp').querySelectorAll('#gipMun');
          //var elToChange4=document.querySelector('#fullTemp').querySelectorAll('#navMun');
          if(event.detail.value==='es'){
            document.querySelector('#langes').className='active';
            document.querySelector('#langeu').className='';
            for(var k=0;k<elToChange1.length;k++){
              elToChange1[k].label='Municipios de Alava';
              elToChange2[k].label='Municipios de Bizkaia';
              elToChange3[k].label='Municipios de Guipuzcoa';
              //elToChange4[k].label='Municipios de Navarra';

            }
            document.querySelector('#loadingNotif').src='../resources/images/cargandoes.png';
          }
          else if(event.detail.value==='eu'){
            document.querySelector('#langeu').className='active';
            document.querySelector('#langes').className='';
            for(var k=0;k<elToChange1.length;k++){
              elToChange1[k].label='Arabako udalerriak';
              elToChange2[k].label='Bizkaiako udalerriak';
              elToChange3[k].label='Gipuzkoako udalerriak';
              //elToChange4[k].label='Nafarroako udalerriak';

            }
            document.querySelector('#loadingNotif').src='../resources/images/cargandoeu.png';
          }
           if(document.querySelector('#qrNotif')!==null){
            document.querySelector('#qrNotif').src=document.querySelector('#qrNotif').src.split('notif')[0]+'notif'+event.detail.value+'.png';
          }
          for(var i=0;i<this.textos.menu.length;i++){

            if(document.querySelector('#fullTemp').querySelector('#'+this.textos.menu[i].id)!==null){
              document.querySelector('#fullTemp').querySelector('#'+this.textos.menu[i].id).innerHTML=this.textos.menu[i][event.detail.value];
            }

          }
          for(var i=0;i<this.textos.addDev.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+this.textos.addDev[i].id);
            for(var k=0;k<elToChange.length;k++){
              elToChange[k].innerHTML=this.textos.addDev[i][event.detail.value];
            }

          }

          for(var i=0;i<this.textos.twitter.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+this.textos.twitter[i].id);
            for(var k=0;k<elToChange.length;k++){
              elToChange[k].innerHTML=this.textos.twitter[i][event.detail.value];
            }

          }
          for(var i=0;i<this.textos.graficos.length;i++){

            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+this.textos.graficos[i].id);
            for(var k=0;k<elToChange.length;k++){
              elToChange[k].innerHTML=this.textos.graficos[i][event.detail.value];
            }
          }
          var gen={"zonas":[{"Z":1,"N":"Alava-Araba","O":28,"NE":"Araba","NC":"Alava","C":1984},{"Z":2,"N":"Vizcaya","O":28,"NE":"Bizkaia","NC":"Bizkaia","C":1984},{"Z":3,"N":"Guipuzcoa","O":28,"NE":"Gipuzkoa","NC":"Guipúzcoa","C":1984},{"Z":5,"N":"CAV-EAE","O":28,"NE":"EAE","NC":"CAV","C":1984}]};
          var ar={"zonas":[{"Z":1001,"N":"Alegría-Dulantzi","O":28,"NE":"Dulantzi","NC":"Alegría-Dulantzi","C":1984},{"Z":1002,"N":"Amurrio","O":29,"NE":"Amurrio","NC":"Amurrio","C":8139},{"Z":1049,"N":"Añana","O":63,"NE":"Añana","NC":"Añana","C":140},{"Z":1003,"N":"Aramaio","O":30,"NE":"Aramaio","NC":"Aramaio","C":1186},{"Z":1006,"N":"Armiñón","O":32,"NE":"Armiñon","NC":"Armiñón","C":176},{"Z":1037,"N":"Arraia-Maeztu","O":55,"NE":"Arraia-Maeztu","NC":"Arraia-Maeztu","C":586},{"Z":1008,"N":"Arratzua-Ubarrundia","O":33,"NE":"Arratzua-Ubarrundia","NC":"Arratzua-Ubarrundia","C":790},{"Z":1004,"N":"Artziniega","O":31,"NE":"Artziniega","NC":"Artziniega","C":1405},{"Z":1009,"N":"Asparrena","O":34,"NE":"Asparrena","NC":"Asparrena","C":1281},{"Z":1010,"N":"Ayala/Aiara","O":35,"NE":"Aiara","NC":"Ayala","C":2275},{"Z":1011,"N":"Baños de Ebro/Mañueta","O":36,"NE":"Mañueta","NC":"Baños de Ebro","C":237},{"Z":1013,"N":"Barrundia","O":37,"NE":"Barrundia","NC":"Barrundia","C":711},{"Z":1014,"N":"Berantevilla","O":38,"NE":"Berantevilla","NC":"Berantevilla","C":372},{"Z":1016,"N":"Bernedo","O":39,"NE":"Bernedo","NC":"Bernedo","C":439},{"Z":1017,"N":"Campezo/Kanpezu","O":40,"NE":"Kanpezu","NC":"Campezo","C":869},{"Z":1021,"N":"Elburgo/Burgelu","O":44,"NE":"Burgu","NC":"Elburgo","C":460},{"Z":1022,"N":"Elciego","O":45,"NE":"Eltziego","NC":"Elciego","C":805},{"Z":1023,"N":"Elvillar/Bilar","O":46,"NE":"Bilar","NC":"Elvillar","C":269},{"Z":1901,"N":"Iruña Oka/Iruña de Oca","O":76,"NE":"Iruña Oka","NC":"Iruña de Oca","C":2344},{"Z":1027,"N":"Iruraiz-Gauna","O":47,"NE":"Iruraitz-Gauna","NC":"Iruraitz-Gauna","C":416},{"Z":1019,"N":"Kripan","O":42,"NE":"Kripan","NC":"Kripan","C":144},{"Z":1020,"N":"Kuartango","O":43,"NE":"Kuartango","NC":"Kuartango","C":326},{"Z":1028,"N":"Labastida","O":48,"NE":"Bastida","NC":"Labastida","C":1077},{"Z":1030,"N":"Lagrán","O":49,"NE":"Lagran","NC":"Lagrán","C":159},{"Z":1031,"N":"Laguardia","O":50,"NE":"Guardia","NC":"Laguardia","C":1183},{"Z":1032,"N":"Lanciego/Lantziego","O":51,"NE":"Lantziego","NC":"Lanciego","C":522},{"Z":1902,"N":"Lantarón","O":77,"NE":"Lantaron","NC":"Lantarón","C":738},{"Z":1033,"N":"Lapuebla de Labarca","O":52,"NE":"Lapuebla de Labarca","NC":"Lapuebla de Labarca","C":649},{"Z":1058,"N":"Legutiano","O":71,"NE":"Legutio","NC":"Legutio","C":1327},{"Z":1034,"N":"Leza","O":53,"NE":"Leza","NC":"Leza","C":165},{"Z":1036,"N":"Llodio/Laudio","O":54,"NE":"Laudio","NC":"Llodio","C":15034},{"Z":1039,"N":"Moreda de Alava","O":56,"NE":"Moreda Araba","NC":"Moreda de Alava","C":202},{"Z":1041,"N":"Navaridas","O":57,"NE":"Navaridas","NC":"Navaridas","C":153},{"Z":1042,"N":"Okondo","O":58,"NE":"Okondo","NC":"Okondo","C":901},{"Z":1043,"N":"Oyón/Oion","O":59,"NE":"Oion","NC":"Oyón","C":2318},{"Z":1044,"N":"Peñacerrada-Urizaharra","O":60,"NE":"Urizaharra","NC":"Peñacerrada","C":236},{"Z":1046,"N":"Ribera Alta","O":61,"NE":"Erriberagoitia","NC":"Ribera Alta","C":594},{"Z":1047,"N":"Ribera Baja/Erribera Beitia","O":62,"NE":"Erriberabeitia","NC":"Ribera Baja","C":964},{"Z":1051,"N":"Salvatierra/Agurain","O":64,"NE":"Agurain","NC":"Salvatierra","C":3606},{"Z":1052,"N":"Samaniego","O":65,"NE":"Samaniego","NC":"Samaniego","C":244},{"Z":1053,"N":"San Millán/Donemiliaga","O":66,"NE":"Donemiliaga","NC":"San Millán","C":587},{"Z":1054,"N":"Urkabustaiz","O":67,"NE":"Urkabustaiz","NC":"Urkabustaiz","C":952},{"Z":1055,"N":"Valdegovía/Gaubea","O":68,"NE":"Gaubea","NC":"Valdegovía","C":836},{"Z":1056,"N":"Harana/Valle de Arana","O":69,"NE":"Harana","NC":"Valle de Arana","C":218},{"Z":1057,"N":"Villabuena de Alava/Eskuernaga","O":70,"NE":"Villabuena","NC":"Villabuena de Alava","C":245},{"Z":10,"N":"Gasteiz","O":7,"NE":"Gasteiz","NC":"Vitoria-Gasteiz","C":186354},{"Z":1060,"N":"Yécora/Iekora","O":72,"NE":"Ekora","NC":"Yécora","C":199},{"Z":1061,"N":"Zalduondo","O":73,"NE":"Zalduondo","NC":"Zalduondo","C":153},{"Z":1062,"N":"Zambrana","O":74,"NE":"Zanbrana","NC":"Zambrana","C":314},{"Z":1018,"N":"Zigoitia","O":41,"NE":"Zigoitia","NC":"Zigoitia","C":1370},{"Z":1063,"N":"Zuia","O":75,"NE":"Zuia","NC":"Zuia","C":1799}]};
          var viz={"zonas":[{"Z":2001,"N":"Abadiño","O":81,"NE":"Abadiño","NC":"Abadiño","C":5832},{"Z":2002,"N":"Abanto y Ciérvana/Abanto Zierbena","O":82,"NE":"Abanto","NC":"Abanto y Ciérvana","C":7851},{"Z":2911,"N":"Ajangiz","O":187,"NE":"Ajangiz","NC":"Ajangiz","C":382},{"Z":2912,"N":"Alonsotegi","O":188,"NE":"Alonsotegi","NC":"Alonsotegi","C":2308},{"Z":2003,"N":"Amorebieta-Etxano","O":83,"NE":"Zornotza","NC":"Amorebieta-Etxano","C":14338},{"Z":2004,"N":"Amoroto","O":84,"NE":"Amoroto","NC":"Amoroto","C":334},{"Z":2005,"N":"Arakaldo","O":85,"NE":"Arakaldo","NC":"Arakaldo","C":117},{"Z":2006,"N":"Arantzazu","O":86,"NE":"Arantzazu","NC":"Arantzazu","C":289},{"Z":2093,"N":"Areatza","O":172,"NE":"Areatza","NC":"Areatza","C":900},{"Z":2009,"N":"Arrankudiaga","O":89,"NE":"Arrankudiaga","NC":"Arrankudiaga","C":786},{"Z":2914,"N":"Arratzu","O":190,"NE":"Arratzu","NC":"Arratzu","C":330},{"Z":2010,"N":"Arrieta","O":90,"NE":"Arrieta","NC":"Arrieta","C":457},{"Z":2011,"N":"Arrigorriaga","O":91,"NE":"Arrigorriaga","NC":"Arrigorriaga","C":9692},{"Z":2023,"N":"Artea","O":102,"NE":"Arteaga","NC":"Artea","C":594},{"Z":2008,"N":"Arcentales","O":88,"NE":"Artzentales","NC":"Artzentales","C":617},{"Z":2091,"N":"Atxondo","O":170,"NE":"Atxondo","NC":"Atxondo","C":1134},{"Z":2070,"N":"Aulesti","O":149,"NE":"Aulesti","NC":"Aulesti","C":545},{"Z":2012,"N":"Bakio","O":92,"NE":"Bakio","NC":"Bakio","C":2041},{"Z":2090,"N":"Balmaseda","O":169,"NE":"Balmaseda","NC":"Balmaseda","C":6022},{"Z":2013,"N":"Barakaldo","O":93,"NE":"Barakaldo","NC":"Barakaldo","C":79984},{"Z":2014,"N":"Barrika","O":94,"NE":"Barrika","NC":"Barrika","C":1218},{"Z":2015,"N":"Basauri","O":95,"NE":"Basauri","NC":"Basauri","C":33690},{"Z":2092,"N":"Bedia","O":171,"NE":"Bedia","NC":"Bedia","C":837},{"Z":2016,"N":"Berango","O":96,"NE":"Berango","NC":"Berango","C":5260},{"Z":2017,"N":"Bermeo","O":97,"NE":"Bermeo","NC":"Bermeo","C":13290},{"Z":2018,"N":"Berriatua","O":98,"NE":"Berriatua","NC":"Berriatua","C":875},{"Z":2019,"N":"Berriz","O":99,"NE":"Berriz","NC":"Berriz","C":3594},{"Z":20,"N":"Bilbao","O":8,"NE":"Bilbo","NC":"Bilbao","C":274076},{"Z":2021,"N":"Busturia","O":100,"NE":"Busturia","NC":"Busturia","C":1352},{"Z":2901,"N":"Derio","O":177,"NE":"Derio","NC":"Derio","C":4775},{"Z":2026,"N":"Dima","O":105,"NE":"Dima","NC":"Dima","C":1134},{"Z":2027,"N":"Durango","O":106,"NE":"Durango","NC":"Durango","C":22033},{"Z":2028,"N":"Ea","O":107,"NE":"Ea","NC":"Ea","C":715},{"Z":2031,"N":"Elantxobe","O":110,"NE":"Elantxobe","NC":"Elantxobe","C":340},{"Z":2032,"N":"Elorrio","O":111,"NE":"Elorrio","NC":"Elorrio","C":5735},{"Z":2902,"N":"Erandio","O":178,"NE":"Erandio","NC":"Erandio","C":19124},{"Z":2033,"N":"Ereño","O":112,"NE":"Ereño","NC":"Ereño","C":215},{"Z":2034,"N":"Ermua","O":113,"NE":"Ermua","NC":"Ermua","C":12902},{"Z":2079,"N":"Errigoiti","O":158,"NE":"Errigoiti","NC":"Errigoiti","C":425},{"Z":2029,"N":"Etxebarri Anteiglesia de San Esteban","O":108,"NE":"Etxebarri","NC":"Etxebarri","C":8332},{"Z":2030,"N":"Etxebarria","O":109,"NE":"Etxebarria","NC":"Etxebarria","C":608},{"Z":2906,"N":"Forua","O":182,"NE":"Forua","NC":"Forua","C":775},{"Z":2035,"N":"Fruiz","O":114,"NE":"Fruiz","NC":"Fruiz","C":412},{"Z":2036,"N":"Galdakao","O":115,"NE":"Galdakao","NC":"Galdakao","C":24144},{"Z":2037,"N":"Galdames","O":116,"NE":"Galdames","NC":"Galdames","C":678},{"Z":2038,"N":"Gamiz-Fika","O":117,"NE":"Gamiz-Fika","NC":"Gamiz-Fika","C":1122},{"Z":2039,"N":"Garai","O":118,"NE":"Garai","NC":"Garai","C":243},{"Z":2040,"N":"Gatika","O":119,"NE":"Gatika","NC":"Gatika","C":1299},{"Z":2041,"N":"Gautegiz Arteaga","O":120,"NE":"Gautegiz-Arteaga","NC":"Gautegiz-Arteaga","C":704},{"Z":2046,"N":"Gernika-Lumo","O":125,"NE":"Gernika-Lumo","NC":"Gernika-Lumo","C":12617},{"Z":2044,"N":"Getxo","O":123,"NE":"Getxo","NC":"Getxo","C":62989},{"Z":2047,"N":"Gizaburuaga","O":126,"NE":"Gizaburuaga","NC":"Gizaburuaga","C":161},{"Z":2042,"N":"Gordexola","O":121,"NE":"Gordexola","NC":"Gordexola","C":1384},{"Z":2043,"N":"Gorliz","O":122,"NE":"Gorliz","NC":"Gorliz","C":4403},{"Z":2045,"N":"Güeñes","O":124,"NE":"Gueñes","NC":"Güeñes","C":5149},{"Z":2048,"N":"Ibarrangelu","O":127,"NE":"Ibarrangelu","NC":"Ibarrangelu","C":562},{"Z":2094,"N":"Igorre","O":173,"NE":"Igorre","NC":"Igorre","C":3193},{"Z":2049,"N":"Ispaster","O":128,"NE":"Ispaster","NC":"Ispaster","C":548},{"Z":2910,"N":"Iurreta","O":186,"NE":"Iurreta","NC":"Iurreta","C":2948},{"Z":2050,"N":"Izurtza","O":129,"NE":"Izurtza","NC":"Izurtza","C":198},{"Z":2907,"N":"Kortezubi","O":183,"NE":"Kortezubi","NC":"Kortezubi","C":355},{"Z":2051,"N":"Lanestosa","O":130,"NE":"Lanestosa","NC":"Lanestosa","C":220},{"Z":2052,"N":"Larrabetzu","O":131,"NE":"Larrabetzu","NC":"Larrabetzu","C":1559},{"Z":2053,"N":"Laukiz","O":132,"NE":"Laukiz","NC":"Laukiz","C":900},{"Z":2054,"N":"Leioa","O":133,"NE":"Leioa","NC":"Leioa","C":24135},{"Z":2057,"N":"Lekeitio","O":136,"NE":"Lekeitio","NC":"Lekeitio","C":5749},{"Z":2055,"N":"Lemoa","O":134,"NE":"Lemoa","NC":"Lemoa","C":2662},{"Z":2056,"N":"Lemoiz","O":135,"NE":"Lemoiz","NC":"Lemoiz","C":978},{"Z":2081,"N":"Lezama","O":160,"NE":"Lezama","NC":"Lezama","C":1883},{"Z":2903,"N":"Loiu","O":179,"NE":"Loiu","NC":"Loiu","C":1838},{"Z":2058,"N":"Mallabia","O":137,"NE":"Mallabia","NC":"Mallabia","C":972},{"Z":2059,"N":"Mañaria","O":138,"NE":"Mañaria","NC":"Mañaria","C":402},{"Z":2060,"N":"Markina-Xemein","O":139,"NE":"Markina-Xemein","NC":"Markina-Xemein","C":3645},{"Z":2061,"N":"Maruri-Jatabe","O":140,"NE":"Jatabe","NC":"Maruri-Jatabe","C":762},{"Z":2062,"N":"Mendata","O":141,"NE":"Mendata","NC":"Mendata","C":300},{"Z":2063,"N":"Mendexa","O":142,"NE":"Mendexa","NC":"Mendexa","C":373},{"Z":2064,"N":"Meñaka","O":143,"NE":"Meñaka","NC":"Meñaka","C":603},{"Z":2066,"N":"Morga","O":145,"NE":"Morga","NC":"Morga","C":346},{"Z":2068,"N":"Mundaka","O":147,"NE":"Mundaka","NC":"Mundaka","C":1551},{"Z":2069,"N":"Mungia","O":148,"NE":"Mungia","NC":"Mungia","C":12765},{"Z":2007,"N":"Munitibar-Arbatzegi Gerrikaitz","O":87,"NE":"Munitibar","NC":"Munitibar-Arbatzegi-Gerrikaitz","C":365},{"Z":2908,"N":"Murueta","O":184,"NE":"Murueta","NC":"Murueta","C":245},{"Z":2071,"N":"Muskiz","O":150,"NE":"Muskiz","NC":"Muskiz","C":6118},{"Z":2067,"N":"Muxika","O":146,"NE":"Muxika","NC":"Muxika","C":1161},{"Z":2909,"N":"Nabarniz","O":185,"NE":"Nabarniz","NC":"Nabarniz","C":207},{"Z":2073,"N":"Ondarroa","O":152,"NE":"Ondarroa","NC":"Ondarroa","C":6952},{"Z":2074,"N":"Orduña","O":153,"NE":"Urduña","NC":"Orduña","C":3333},{"Z":2075,"N":"Orozko","O":154,"NE":"Orozko","NC":"Orozko","C":1975},{"Z":2083,"N":"Ortuella","O":162,"NE":"Ortuella","NC":"Ortuella","C":6950},{"Z":2072,"N":"Otxandio","O":151,"NE":"Otxandio","NC":"Otxandio","C":974},{"Z":2077,"N":"Plentzia","O":156,"NE":"Plentzia","NC":"Plentzia","C":3367},{"Z":2078,"N":"Portugalete","O":157,"NE":"Portugalete","NC":"Portugalete","C":38742},{"Z":2082,"N":"Santurtzi","O":161,"NE":"Santurtzi","NC":"Santurtzi","C":37673},{"Z":2084,"N":"Sestao","O":163,"NE":"Sestao","NC":"Sestao","C":22577},{"Z":2904,"N":"Sondika","O":180,"NE":"Sondika","NC":"Sondika","C":3504},{"Z":2085,"N":"Sopelana","O":164,"NE":"Sopela","NC":"Sopela","C":10301},{"Z":2086,"N":"Sopuerta","O":165,"NE":"Sopuerta","NC":"Sopuerta","C":2073},{"Z":2076,"N":"Sukarrieta","O":155,"NE":"Sukarrieta","NC":"Sukarrieta","C":314},{"Z":2087,"N":"Trucios-Turtzioz","O":166,"NE":"Turtzioz","NC":"Trucios","C":429},{"Z":2088,"N":"Ubide","O":167,"NE":"Ubide","NC":"Ubide","C":135},{"Z":2065,"N":"Ugao-Miraballes","O":144,"NE":"Ugao","NC":"Ugao-Miraballes","C":3315},{"Z":2089,"N":"Urduliz","O":168,"NE":"Urduliz","NC":"Urduliz","C":3266},{"Z":2022,"N":"Carranza","O":101,"NE":"Karrantza","NC":"Valle de Carranza","C":2355},{"Z":2080,"N":"Valle de Trápaga-Trapagaran","O":159,"NE":"Trapagaran","NC":"Valle de Trápaga","C":9971},{"Z":2095,"N":"Zaldibar","O":174,"NE":"Zaldibar","NC":"Zaldibar","C":2352},{"Z":2096,"N":"Zalla","O":175,"NE":"Zalla","NC":"Zalla","C":6608},{"Z":2905,"N":"Zamudio","O":181,"NE":"Zamudio","NC":"Zamudio","C":2565},{"Z":2097,"N":"Zaratamo","O":176,"NE":"Zaratamo","NC":"Zaratamo","C":1303},{"Z":2024,"N":"Zeanuri","O":103,"NE":"Zeanuri","NC":"Zeanuri","C":1003},{"Z":2025,"N":"Zeberio","O":104,"NE":"Zeberio","NC":"Zeberio","C":883},{"Z":2913,"N":"Zierbena","O":189,"NE":"Zierbena","NC":"Zierbena","C":1251},{"Z":2915,"N":"Ziortza-Bolibar","O":191,"NE":"Ziortza-Bolibar","NC":"Ziortza-Bolibar","C":362}]};
          var gip={"zonas":[{"Z":3001,"N":"Abaltzisketa","O":192,"NE":"Abaltzisketa","NC":"Abaltzisketa","C":242},{"Z":3002,"N":"Aduna","O":193,"NE":"Aduna","NC":"Aduna","C":343},{"Z":3016,"N":"Aia","O":207,"NE":"Aia","NC":"Aia","C":1514},{"Z":3003,"N":"Aizarnazabal","O":194,"NE":"Aizarnazabal","NC":"Aizarnazabal","C":541},{"Z":3004,"N":"Albiztur","O":195,"NE":"Albiztur","NC":"Albiztur","C":252},{"Z":3005,"N":"Alegia","O":196,"NE":"Alegia","NC":"Alegia","C":1261},{"Z":3006,"N":"Alkiza","O":197,"NE":"Alkiza","NC":"Alkiza","C":262},{"Z":3906,"N":"Altzaga","O":277,"NE":"Altzaga","NC":"Altzaga","C":121},{"Z":3007,"N":"Altzo","O":198,"NE":"Altzo","NC":"Altzo","C":304},{"Z":3008,"N":"Amezketa","O":199,"NE":"Amezketa","NC":"Amezketa","C":721},{"Z":3009,"N":"Andoain","O":200,"NE":"Andoain","NC":"Andoain","C":11528},{"Z":3010,"N":"Anoeta","O":201,"NE":"Anoeta","NC":"Anoeta","C":1494},{"Z":3011,"N":"Antzuola","O":202,"NE":"Antzuola","NC":"Antzuola","C":1660},{"Z":3012,"N":"Arama","O":203,"NE":"Arama","NC":"Arama","C":144},{"Z":3013,"N":"Aretxabaleta","O":204,"NE":"Aretxabaleta","NC":"Aretxabaleta","C":5427},{"Z":3014,"N":"Asteasu","O":205,"NE":"Asteasu","NC":"Asteasu","C":1111},{"Z":3903,"N":"Astigarraga","O":274,"NE":"Astigarraga","NC":"Astigarraga","C":4247},{"Z":3015,"N":"Ataun","O":206,"NE":"Ataun","NC":"Ataun","C":1272},{"Z":3017,"N":"Azkoitia","O":208,"NE":"Azkoitia","NC":"Azkoitia","C":8580},{"Z":3018,"N":"Azpeitia","O":209,"NE":"Azpeitia","NC":"Azpeitia","C":11074},{"Z":3904,"N":"Baliarrain","O":275,"NE":"Baliarrain","NC":"Baliarrain","C":96},{"Z":3019,"N":"Beasain","O":210,"NE":"Beasain","NC":"Beasain","C":10053},{"Z":3020,"N":"Beizama","O":211,"NE":"Beizama","NC":"Beizama","C":129},{"Z":3021,"N":"Belauntza","O":212,"NE":"Belauntza","NC":"Belauntza","C":199},{"Z":3022,"N":"Berastegi","O":213,"NE":"Berastegi","NC":"Berastegi","C":834},{"Z":3074,"N":"Bergara","O":264,"NE":"Bergara","NC":"Bergara","C":11610},{"Z":3023,"N":"Berrobi","O":214,"NE":"Berrobi","NC":"Berrobi","C":445},{"Z":3024,"N":"Bidania-Goiatz","O":215,"NE":"Bidania-Goiatz","NC":"Bidania-Goiatz","C":393},{"Z":3029,"N":"Deba","O":220,"NE":"Deba","NC":"Deba","C":4258},{"Z":30,"N":"Donostia","O":9,"NE":"Donostia","NC":"Donostia-San Sebastián","C":147189},{"Z":3030,"N":"Eibar","O":221,"NE":"Eibar","NC":"Eibar","C":21515},{"Z":3031,"N":"Elduain","O":222,"NE":"Elduain","NC":"Elduain","C":180},{"Z":3033,"N":"Elgeta","O":224,"NE":"Elgeta","NC":"Elgeta","C":864},{"Z":3032,"N":"Elgoibar","O":223,"NE":"Elgoibar","NC":"Elgoibar","C":8785},{"Z":3067,"N":"Errenteria","O":258,"NE":"Errenteria","NC":"Errenteria","C":30825},{"Z":3066,"N":"Errezil","O":257,"NE":"Errezil","NC":"Errezil","C":461},{"Z":3034,"N":"Eskoriatza","O":225,"NE":"Eskoriatza","NC":"Eskoriatza","C":3157},{"Z":3035,"N":"Ezkio-Itsaso","O":226,"NE":"Ezkio-Itsaso","NC":"Ezkio-Itsaso","C":482},{"Z":3038,"N":"Gabiria","O":229,"NE":"Gabiria","NC":"Gabiria","C":392},{"Z":3037,"N":"Gaintza","O":228,"NE":"Gaintza","NC":"Gaintza","C":97},{"Z":3907,"N":"Gaztelu","O":278,"NE":"Gaztelu","NC":"Gaztelu","C":120},{"Z":3039,"N":"Getaria","O":230,"NE":"Getaria","NC":"Getaria","C":2111},{"Z":3040,"N":"Hernani","O":231,"NE":"Hernani","NC":"Hernani","C":15321},{"Z":3041,"N":"Hernialde","O":232,"NE":"Hernialde","NC":"Hernialde","C":258},{"Z":3036,"N":"Hondarribia","O":227,"NE":"Hondarribia","NC":"Hondarribia","C":13148},{"Z":3042,"N":"Ibarra","O":233,"NE":"Ibarra","NC":"Ibarra","C":3251},{"Z":3043,"N":"Idiazabal","O":234,"NE":"Idiazabal","NC":"Idiazabal","C":1740},{"Z":3044,"N":"Ikaztegieta","O":235,"NE":"Ikaztegieta","NC":"Ikaztegieta","C":368},{"Z":3045,"N":"Irun","O":236,"NE":"Irun","NC":"Irun","C":46691},{"Z":3046,"N":"Irura","O":237,"NE":"Irura","NC":"Irura","C":1167},{"Z":3047,"N":"Itsasondo","O":238,"NE":"Itsasondo","NC":"Itsasondo","C":477},{"Z":3048,"N":"Larraul","O":239,"NE":"Larraul","NC":"Larraul","C":176},{"Z":3902,"N":"Lasarte-Oria","O":273,"NE":"Lasarte-Oria","NC":"Lasarte-Oria","C":14193},{"Z":3049,"N":"Lazkao","O":240,"NE":"Lazkao","NC":"Lazkao","C":4124},{"Z":3050,"N":"Leaburu","O":241,"NE":"Leaburu","NC":"Leaburu","C":263},{"Z":3051,"N":"Legazpi","O":242,"NE":"Legazpi","NC":"Legazpi","C":6904},{"Z":3052,"N":"Legorreta","O":243,"NE":"Legorreta","NC":"Legorreta","C":1091},{"Z":3068,"N":"Leintz-Gatzaga","O":259,"NE":"Leintz Gatzaga","NC":"Leintz-Gatzaga","C":183},{"Z":3053,"N":"Lezo","O":244,"NE":"Lezo","NC":"Lezo","C":4765},{"Z":3054,"N":"Lizartza","O":245,"NE":"Lizartza","NC":"Lizartza","C":447},{"Z":3901,"N":"Mendaro","O":272,"NE":"Mendaro","NC":"Mendaro","C":1441},{"Z":3055,"N":"Arrasate/Mondragón","O":246,"NE":"Arrasate","NC":"Mondragón","C":17522},{"Z":3057,"N":"Mutiloa","O":248,"NE":"Mutiloa","NC":"Mutiloa","C":201},{"Z":3056,"N":"Mutriku","O":247,"NE":"Mutriku","NC":"Mutriku","C":4104},{"Z":3063,"N":"Oiartzun","O":254,"NE":"Oiartzun","NC":"Oiartzun","C":7990},{"Z":3058,"N":"Olaberria","O":249,"NE":"Olaberria","NC":"Olaberria","C":746},{"Z":3059,"N":"Oñati","O":250,"NE":"Oñati","NC":"Oñati","C":8863},{"Z":3076,"N":"Ordizia","O":266,"NE":"Ordizia","NC":"Ordizia","C":6978},{"Z":3905,"N":"Orendain","O":276,"NE":"Orendain","NC":"Orendain","C":141},{"Z":3060,"N":"Orexa","O":251,"NE":"Orexa","NC":"Orexa","C":89},{"Z":3061,"N":"Orio","O":252,"NE":"Orio","NC":"Orio","C":4273},{"Z":3062,"N":"Ormaiztegi","O":253,"NE":"Ormaiztegi","NC":"Ormaiztegi","C":982},{"Z":3064,"N":"Pasaia","O":255,"NE":"Pasaia","NC":"Pasaia","C":12526},{"Z":3070,"N":"Segura","O":260,"NE":"Segura","NC":"Segura","C":1099},{"Z":3065,"N":"Soraluze","O":256,"NE":"Soraluze","NC":"Soraluze","C":3006},{"Z":3071,"N":"Tolosa","O":261,"NE":"Tolosa","NC":"Tolosa","C":14818},{"Z":3072,"N":"Urnieta","O":262,"NE":"Urnieta","NC":"Urnieta","C":4731},{"Z":3077,"N":"Urretxu","O":267,"NE":"Urretxu","NC":"Urretxu","C":5243},{"Z":3073,"N":"Usurbil","O":263,"NE":"Usurbil","NC":"Usurbil","C":4677},{"Z":3075,"N":"Villabona","O":265,"NE":"Villabona","NC":"Villabona","C":4359},{"Z":3078,"N":"Zaldibia","O":268,"NE":"Zaldibia","NC":"Zaldibia","C":1155},{"Z":3079,"N":"Zarautz","O":269,"NE":"Zarautz","NC":"Zarautz","C":17835},{"Z":3025,"N":"Zegama","O":216,"NE":"Zegama","NC":"Zegama","C":1144},{"Z":3026,"N":"Zerain","O":217,"NE":"Zerain","NC":"Zerain","C":202},{"Z":3027,"N":"Zestoa","O":218,"NE":"Zestoa","NC":"Zestoa","C":2816},{"Z":3028,"N":"Zizurkil","O":219,"NE":"Zizurkil","NC":"Zizurkil","C":2255},{"Z":3081,"N":"Zumaia","O":271,"NE":"Zumaia","NC":"Zumaia","C":7460},{"Z":3080,"N":"Zumarraga","O":270,"NE":"Zumarraga","NC":"Zumarraga","C":7900}]}
          //var nav={"zonas":[{"Z":4001,"N":"Abáigar","O":279,"NE":"Abaigar","NC":"Abáigar","C":90},{"Z":4002,"N":"Abárzuza","O":280,"NE":"Abartzuza","NC":"Abárzuza","C":424},{"Z":4003,"N":"Abaurregaina/Abaurrea Alta","O":281,"NE":"Abaurregaina","NC":"Abaurrea Alta","C":124},{"Z":4004,"N":"Abaurrepea/Abaurrea Baja","O":282,"NE":"Abaurrepea","NC":"Abaurrea Baja","C":35},{"Z":4005,"N":"Aberin","O":283,"NE":"Aberin","NC":"Aberin","C":296},{"Z":4006,"N":"Ablitas","O":284,"NE":"Ablitas","NC":"Ablitas","C":1952},{"Z":4007,"N":"Adiós","O":285,"NE":"Adios","NC":"Adiós","C":136},{"Z":4008,"N":"Aguilar de Codés","O":286,"NE":"Aguilar Kodes","NC":"Aguilar de Codés","C":80},{"Z":4009,"N":"Aibar/Oibar","O":287,"NE":"Oibar","NC":"Aibar","C":690},{"Z":4011,"N":"Allín","O":289,"NE":"Allin","NC":"Allín","C":697},{"Z":4012,"N":"Allo","O":290,"NE":"Allo","NC":"Allo","C":814},{"Z":4010,"N":"Altsasu/Alsasua","O":288,"NE":"Altsasu","NC":"Alsasua","C":5721},{"Z":4013,"N":"Améscoa Baja","O":291,"NE":"Ameskoabarrena","NC":"Améscoa Baja","C":661},{"Z":4014,"N":"Ancín","O":292,"NE":"Antzin","NC":"Ancín","C":274},{"Z":4015,"N":"Andosilla","O":293,"NE":"Andosilla","NC":"Andosilla","C":2001},{"Z":4016,"N":"Ansoáin","O":294,"NE":"Antsoain","NC":"Ansoáin","C":7642},{"Z":4017,"N":"Anue","O":295,"NE":"Anue","NC":"Anue","C":361},{"Z":4018,"N":"Añorbe","O":296,"NE":"Añorbe","NC":"Añorbe","C":409},{"Z":4019,"N":"Aoiz/Agoitz","O":297,"NE":"Agoitz","NC":"Aoiz","C":1809},{"Z":4020,"N":"Araitz","O":298,"NE":"Araitz","NC":"Araitz","C":454},{"Z":4025,"N":"Arakil","O":303,"NE":"Arakil","NC":"Arakil","C":768},{"Z":4021,"N":"Aranarache","O":299,"NE":"Aranaratxe","NC":"Aranarache","C":64},{"Z":4023,"N":"Aranguren","O":301,"NE":"Aranguren","NC":"Aranguren","C":6826},{"Z":4024,"N":"Arano","O":302,"NE":"Arano","NC":"Arano","C":102},{"Z":4022,"N":"Arantza","O":300,"NE":"Arantza","NC":"Arantza","C":526},{"Z":4026,"N":"Aras","O":304,"NE":"Aras","NC":"Aras","C":147},{"Z":4027,"N":"Arbizu","O":305,"NE":"Arbizu","NC":"Arbizu","C":838},{"Z":4028,"N":"Arce/Artzi","O":306,"NE":"Artzibar","NC":"Arce","C":211},{"Z":4030,"N":"Arellano","O":308,"NE":"Arellano","NC":"Arellano","C":145},{"Z":4031,"N":"Areso","O":309,"NE":"Areso","NC":"Areso","C":221},{"Z":4032,"N":"Arguedas","O":310,"NE":"Arguedas","NC":"Arguedas","C":1733},{"Z":4033,"N":"Aria","O":311,"NE":"Aria","NC":"Aria","C":49},{"Z":4034,"N":"Aribe","O":312,"NE":"Aribe","NC":"Aribe","C":40},{"Z":4035,"N":"Armañanzas","O":313,"NE":"Armañantzas","NC":"Armañanzas","C":63},{"Z":4036,"N":"Arróniz","O":314,"NE":"Arronitz","NC":"Arróniz","C":921},{"Z":4037,"N":"Arruazu","O":315,"NE":"Arruazu","NC":"Arruazu","C":86},{"Z":4038,"N":"Artajona","O":316,"NE":"Artaxoa","NC":"Artajona","C":1348},{"Z":4039,"N":"Artazu","O":317,"NE":"Artazu","NC":"Artazu","C":83},{"Z":4040,"N":"Atez","O":318,"NE":"Atetz","NC":"Atez","C":194},{"Z":4041,"N":"Ayegui","O":319,"NE":"Aiegi","NC":"Ayegui","C":1583},{"Z":4042,"N":"Azagra","O":320,"NE":"Azagra","NC":"Azagra","C":2744},{"Z":4043,"N":"Azuelo","O":321,"NE":"Azuelo","NC":"Azuelo","C":38},{"Z":4044,"N":"Bakaiku","O":322,"NE":"Bakaiku","NC":"Bakaiku","C":290},{"Z":4901,"N":"Barañain","O":542,"NE":"Barañain","NC":"Barañáin","C":15475},{"Z":4045,"N":"Barásoain","O":323,"NE":"Barasoain","NC":"Barasoáin","C":504},{"Z":4046,"N":"Barbarin","O":324,"NE":"Barbarin","NC":"Barbarin","C":60},{"Z":4047,"N":"Bargota","O":325,"NE":"Bargota","NC":"Bargota","C":261},{"Z":4048,"N":"Barillas","O":326,"NE":"Barillas","NC":"Barillas","C":169},{"Z":4049,"N":"Basaburua","O":327,"NE":"Basaburua","NC":"Basaburua","C":704},{"Z":4050,"N":"Baztan","O":328,"NE":"Baztan","NC":"Baztan","C":6058},{"Z":4051,"N":"Beire","O":329,"NE":"Beire","NC":"Beire","C":253},{"Z":4052,"N":"Belascoáin","O":330,"NE":"Beraskoain","NC":"Belascoáin","C":88},{"Z":4250,"N":"Bera/Vera de Bidasoa","O":526,"NE":"Bera","NC":"Bera","C":2832},{"Z":4053,"N":"Berbinzana","O":331,"NE":"Berbintzana","NC":"Berbinzana","C":532},{"Z":4905,"N":"Beriáin","O":546,"NE":"Beriain","NC":"Beriain","C":2847},{"Z":4902,"N":"Berrioplano","O":543,"NE":"Berriobeiti","NC":"Berrioplano","C":4346},{"Z":4903,"N":"Berriozar","O":544,"NE":"Berriozar","NC":"Berriozar","C":6593},{"Z":4054,"N":"Bertizarana","O":332,"NE":"Bertizarana","NC":"Bertizarana","C":460},{"Z":4055,"N":"Betelu","O":333,"NE":"Betelu","NC":"Betelu","C":259},{"Z":4253,"N":"Bidaurreta","O":529,"NE":"Bidaurreta","NC":"Bidaurreta","C":129},{"Z":4056,"N":"Biurrun-Olcoz","O":334,"NE":"Biurrun-Olkotz","NC":"Biurrun-Olcoz","C":179},{"Z":4057,"N":"Buñuel","O":335,"NE":"Buñuel","NC":"Buñuel","C":1812},{"Z":4058,"N":"Auritz/Burguete","O":336,"NE":"Auritz","NC":"Burguete","C":215},{"Z":4059,"N":"Burgui/Burgi","O":337,"NE":"Burgi","NC":"Burgui","C":191},{"Z":4060,"N":"Burlata/Burlada","O":338,"NE":"Burlata","NC":"Burlada","C":13723},{"Z":4062,"N":"Cabanillas","O":340,"NE":"Cabanillas","NC":"Cabanillas","C":1088},{"Z":4063,"N":"Cabredo","O":341,"NE":"Cabredo","NC":"Cabredo","C":88},{"Z":4064,"N":"Cadreita","O":342,"NE":"Cadreita","NC":"Cadreita","C":1447},{"Z":4065,"N":"Caparroso","O":343,"NE":"Caparroso","NC":"Caparroso","C":1892},{"Z":4066,"N":"Carcar","O":344,"NE":"Carcar","NC":"Cárcar","C":867},{"Z":4067,"N":"Carcastillo","O":345,"NE":"Zarrakaztelu","NC":"Carcastillo","C":1938},{"Z":4068,"N":"Cascante","O":346,"NE":"Cascante","NC":"Cascante","C":2893},{"Z":4069,"N":"Cáseda","O":347,"NE":"Kaseda","NC":"Cáseda","C":847},{"Z":4070,"N":"Castejón","O":348,"NE":"Castejon","NC":"Castejón","C":2652},{"Z":4071,"N":"Castillonuevo","O":349,"NE":"Gazteluberri","NC":"Castillo-Nuevo","C":17},{"Z":4193,"N":"Oltza","O":471,"NE":"Oltza zendea","NC":"Cendea de Olza","C":1414},{"Z":4072,"N":"Cintruénigo","O":350,"NE":"Cintruenigo","NC":"Cintruénigo","C":5288},{"Z":4074,"N":"Cirauqui","O":352,"NE":"Zirauki","NC":"Cirauqui","C":394},{"Z":4075,"N":"Ciriza","O":353,"NE":"Ziritza","NC":"Ciriza","C":101},{"Z":4076,"N":"Cizur","O":354,"NE":"Zizur","NC":"Cizur","C":2407},{"Z":4077,"N":"Corella","O":355,"NE":"Corella","NC":"Corella","C":5384},{"Z":4078,"N":"Cortes","O":356,"NE":"Cortes","NC":"Cortes","C":2447},{"Z":4079,"N":"Desojo","O":357,"NE":"Desoio","NC":"Desojo","C":76},{"Z":4080,"N":"Dicastillo","O":358,"NE":"Deikaztelu","NC":"Dicastillo","C":510},{"Z":4081,"N":"Donamaria","O":359,"NE":"Donamaria","NC":"Donamaria","C":342},{"Z":4083,"N":"Echarri","O":361,"NE":"Etxarri","NC":"Echarri","C":56},{"Z":4086,"N":"Egüés","O":364,"NE":"Eguesibar","NC":"Egüés","C":12987},{"Z":4061,"N":"Busto (El)","O":339,"NE":"El Busto","NC":"El Busto","C":56},{"Z":4087,"N":"Elgorriaga","O":365,"NE":"Elgorriaga","NC":"Elgorriaga","C":169},{"Z":4089,"N":"Enériz","O":367,"NE":"Eneritz","NC":"Enériz","C":242},{"Z":4090,"N":"Eratsun","O":368,"NE":"Eratsun","NC":"Eratsun","C":146},{"Z":4091,"N":"Ergoiena","O":369,"NE":"Ergoiena","NC":"Ergoiena","C":347},{"Z":4092,"N":"Erro","O":370,"NE":"Erroibar","NC":"Erro","C":662},{"Z":4093,"N":"Ezcároz/Ezkaroze","O":371,"NE":"Ezkaroze","NC":"Escároz","C":293},{"Z":4094,"N":"Eslava","O":372,"NE":"Eslaba","NC":"Eslava","C":112},{"Z":4095,"N":"Esparza de Salazar","O":373,"NE":"Espartza","NC":"Esparza de Salazar","C":76},{"Z":4096,"N":"Espronceda","O":374,"NE":"Esprontzeda","NC":"Espronceda","C":115},{"Z":4097,"N":"Estella/Lizarra","O":375,"NE":"Lizarra","NC":"Estella","C":10436},{"Z":4098,"N":"Esteribar","O":376,"NE":"Esteribar","NC":"Esteribar","C":1918},{"Z":4099,"N":"Etayo","O":377,"NE":"Etaiu","NC":"Etayo","C":63},{"Z":4082,"N":"Etxalar","O":360,"NE":"Etxalar","NC":"Etxalar","C":615},{"Z":4084,"N":"Etxarri-Aranatz","O":362,"NE":"Etxarri Aranatz","NC":"Etxarri Aranatz","C":1935},{"Z":4085,"N":"Etxauri","O":363,"NE":"Etxauri","NC":"Etxauri","C":471},{"Z":4100,"N":"Eulate","O":378,"NE":"Eulate","NC":"Eulate","C":264},{"Z":4101,"N":"Ezcabarte","O":379,"NE":"Ezkabarte","NC":"Ezcabarte","C":1390},{"Z":4102,"N":"Ezkurra","O":380,"NE":"Ezkurra","NC":"Ezkurra","C":146},{"Z":4103,"N":"Ezprogui","O":381,"NE":"Ezporogi","NC":"Ezprogui","C":46},{"Z":4104,"N":"Falces","O":382,"NE":"Faltzes","NC":"Falces","C":1876},{"Z":4105,"N":"Fitero","O":383,"NE":"Fitero","NC":"Fitero","C":1535},{"Z":4106,"N":"Fontellas","O":384,"NE":"Fontellas","NC":"Fontellas","C":689},{"Z":4107,"N":"Funes","O":385,"NE":"Funes","NC":"Funes","C":1707},{"Z":4108,"N":"Fustiñana","O":386,"NE":"Fustiñana","NC":"Fustiñana","C":1878},{"Z":4109,"N":"Galar","O":387,"NE":"Galar","NC":"Galar","C":1562},{"Z":4110,"N":"Gallipienzo","O":388,"NE":"Galipentzu","NC":"Gallipienzo","C":90},{"Z":4111,"N":"Gallués/Galoze","O":389,"NE":"Galoze","NC":"Gallués","C":96},{"Z":4112,"N":"Garaioa","O":390,"NE":"Garaioa","NC":"Garaioa","C":94},{"Z":4113,"N":"Garde","O":391,"NE":"Garde","NC":"Garde","C":137},{"Z":4114,"N":"Garínoain","O":392,"NE":"Garinoain","NC":"Garínoain","C":362},{"Z":4115,"N":"Garralda","O":393,"NE":"Garralda","NC":"Garralda","C":166},{"Z":4116,"N":"Genevilla","O":394,"NE":"Genevilla","NC":"Genevilla","C":65},{"Z":4117,"N":"Goizueta","O":395,"NE":"Goizueta","NC":"Goizueta","C":620},{"Z":4118,"N":"Goñi","O":396,"NE":"Goñerri","NC":"Goñi","C":165},{"Z":4119,"N":"Guesa/Gorza","O":397,"NE":"Gorza","NC":"Güesa","C":40},{"Z":4120,"N":"Guesálaz","O":398,"NE":"Gesalatz","NC":"Guesálaz","C":394},{"Z":4121,"N":"Guirguillano","O":399,"NE":"Girgillao","NC":"Guirguillano","C":64},{"Z":4122,"N":"Huarte/Uharte","O":400,"NE":"Uharte","NC":"Huarte","C":4719},{"Z":4124,"N":"Ibargoiti","O":402,"NE":"Ibargoiti","NC":"Ibargoiti","C":210},{"Z":4259,"N":"Igantzi","O":535,"NE":"Igantzi","NC":"Igantzi","C":485},{"Z":4125,"N":"Igúzquiza","O":403,"NE":"Iguzkitza","NC":"Igúzquiza","C":275},{"Z":4126,"N":"Imotz","O":404,"NE":"Imotz","NC":"Imotz","C":357},{"Z":4127,"N":"Irañeta","O":405,"NE":"Irañeta","NC":"Irañeta","C":143},{"Z":4904,"N":"Irurtzun","O":545,"NE":"Irurtzun","NC":"Irurtzun","C":1559},{"Z":4128,"N":"Isaba/Izaba","O":406,"NE":"Izaba","NC":"Isaba","C":370},{"Z":4129,"N":"Ituren","O":407,"NE":"Ituren","NC":"Ituren","C":393},{"Z":4130,"N":"Iturmendi","O":408,"NE":"Iturmendi","NC":"Iturmendi","C":310},{"Z":4131,"N":"Iza","O":409,"NE":"Itza","NC":"Iza","C":871},{"Z":4132,"N":"Izagaondoa","O":410,"NE":"Itzagaondoa","NC":"Izagaondoa","C":146},{"Z":4133,"N":"Izalzu/Itzaltzu","O":411,"NE":"Itzaltzu","NC":"Izalzu","C":44},{"Z":4134,"N":"Jaurrieta","O":412,"NE":"Jaurrieta","NC":"Jaurrieta","C":178},{"Z":4135,"N":"Javier","O":413,"NE":"Xabier","NC":"Javier","C":102},{"Z":4136,"N":"Juslapeña","O":414,"NE":"Txulapain","NC":"Juslapeña","C":444},{"Z":4137,"N":"Labaien","O":415,"NE":"Labaien","NC":"Labaien","C":208},{"Z":4138,"N":"Lakuntza","O":416,"NE":"Lakuntza","NC":"Lakuntza","C":934},{"Z":4139,"N":"Lana","O":417,"NE":"Lana","NC":"Lana","C":159},{"Z":4140,"N":"Lantz","O":418,"NE":"Lantz","NC":"Lantz","C":116},{"Z":4141,"N":"Lapoblación","O":419,"NE":"Lapoblacion","NC":"Lapoblación","C":109},{"Z":4142,"N":"Larraga","O":420,"NE":"Larraga","NC":"Larraga","C":1411},{"Z":4143,"N":"Larraona","O":421,"NE":"Larragoa","NC":"Larraona","C":98},{"Z":4144,"N":"Larraun","O":422,"NE":"Larraun","NC":"Larraun","C":804},{"Z":4145,"N":"Lazagurría","O":423,"NE":"Elizagorria","NC":"Lazagurría","C":171},{"Z":4146,"N":"Leache","O":424,"NE":"Leatxe","NC":"Leache","C":35},{"Z":4147,"N":"Legarda","O":425,"NE":"Legarda","NC":"Legarda","C":98},{"Z":4148,"N":"Legaria","O":426,"NE":"Legaria","NC":"Legaria","C":93},{"Z":4149,"N":"Leitza","O":427,"NE":"Leitza","NC":"Leitza","C":2338},{"Z":4908,"N":"Lekunberri","O":549,"NE":"Lekunberri","NC":"Lekunberri","C":1008},{"Z":4150,"N":"Leoz","O":428,"NE":"Leotz","NC":"Leoz","C":213},{"Z":4151,"N":"Lerga","O":429,"NE":"Lerga","NC":"Lerga","C":67},{"Z":4152,"N":"Lerín","O":430,"NE":"Lerin","NC":"Lerín","C":1347},{"Z":4153,"N":"Lesaka","O":431,"NE":"Lesaka","NC":"Lesaka","C":2172},{"Z":4154,"N":"Lezáun","O":432,"NE":"Lezaun","NC":"Lezáun","C":227},{"Z":4155,"N":"Liédena","O":433,"NE":"Ledea","NC":"Liédena","C":253},{"Z":4156,"N":"Lizoain-Arriasgoiti","O":434,"NE":"Lizoain-Arriasgoiti","NC":"Lizoain-Arriasgoiti","C":252},{"Z":4157,"N":"Lodosa","O":435,"NE":"Lodosa","NC":"Lodosa","C":3546},{"Z":4158,"N":"Lónguida/Longida","O":436,"NE":"Longida","NC":"Lónguida","C":252},{"Z":4029,"N":"Arcos (Los)","O":307,"NE":"Los Arcos","NC":"Los Arcos","C":925},{"Z":4159,"N":"Lumbier","O":437,"NE":"Irunberri","NC":"Lumbier","C":1134},{"Z":4160,"N":"Luquin","O":438,"NE":"Lukin","NC":"Luquin","C":107},{"Z":4161,"N":"Mañeru","O":439,"NE":"Mañeru","NC":"Mañeru","C":344},{"Z":4162,"N":"Marañón","O":440,"NE":"Marañon","NC":"Marañón","C":47},{"Z":4163,"N":"Marcilla","O":441,"NE":"Martzilla","NC":"Marcilla","C":2017},{"Z":4164,"N":"Mélida","O":442,"NE":"Melida","NC":"Mélida","C":582},{"Z":4165,"N":"Mendavia","O":443,"NE":"Mendabia","NC":"Mendavia","C":2794},{"Z":4166,"N":"Mendaza","O":444,"NE":"Mendaza","NC":"Mendaza","C":260},{"Z":4167,"N":"Mendigorría","O":445,"NE":"Mendigorria","NC":"Mendigorría","C":827},{"Z":4168,"N":"Metauten","O":446,"NE":"Metauten","NC":"Metauten","C":248},{"Z":4169,"N":"Milagro","O":447,"NE":"Milagro","NC":"Milagro","C":2217},{"Z":4170,"N":"Mirafuentes","O":448,"NE":"Mirafuentes","NC":"Mirafuentes","C":49},{"Z":4171,"N":"Miranda de Arga","O":449,"NE":"Miranda Arga","NC":"Miranda de Arga","C":693},{"Z":4172,"N":"Monreal","O":450,"NE":"Elo","NC":"Monreal","C":367},{"Z":4173,"N":"Monteagudo","O":451,"NE":"Monteagudo","NC":"Monteagudo","C":873},{"Z":4174,"N":"Morentin","O":452,"NE":"Morentin","NC":"Morentin","C":110},{"Z":4175,"N":"Mues","O":453,"NE":"Mues","NC":"Mués","C":72},{"Z":4176,"N":"Murchante","O":454,"NE":"Murchante","NC":"Murchante","C":2856},{"Z":4177,"N":"Murieta","O":455,"NE":"Murieta","NC":"Murieta","C":262},{"Z":4178,"N":"Murillo el Cuende","O":456,"NE":"Murillo el Cuende","NC":"Murillo el Cuende","C":495},{"Z":4179,"N":"Murillo el Fruto","O":457,"NE":"Murillo el Fruto","NC":"Murillo el Fruto","C":509},{"Z":4180,"N":"Muruzábal","O":458,"NE":"Muruzabal","NC":"Muruzábal","C":216},{"Z":4181,"N":"Navascués","O":459,"NE":"Nabaskoze","NC":"Navascués","C":150},{"Z":4182,"N":"Nazar","O":460,"NE":"Nazar","NC":"Nazar","C":37},{"Z":4088,"N":"Noáin (Valle de Elorz)","O":366,"NE":"Noain Elortzibar","NC":"Noain","C":5574},{"Z":4183,"N":"Obanos","O":461,"NE":"Obanos","NC":"Obanos","C":681},{"Z":4185,"N":"Ochagavía/Otsagabia","O":463,"NE":"Otsagabia","NC":"Ochagavía","C":501},{"Z":4184,"N":"Oco","O":462,"NE":"Oko","NC":"Oco","C":61},{"Z":4186,"N":"Odieta","O":464,"NE":"Odieta","NC":"Odieta","C":302},{"Z":4187,"N":"Oitz","O":465,"NE":"Oitz","NC":"Oitz","C":111},{"Z":4188,"N":"Olaibar","O":466,"NE":"Olaibar","NC":"Oláibar","C":227},{"Z":4189,"N":"Olazti/Olazagutía","O":467,"NE":"Olatzagutia","NC":"Olazagutía","C":1170},{"Z":4190,"N":"Olejua","O":468,"NE":"Olexua","NC":"Olejua","C":44},{"Z":4191,"N":"Olite","O":469,"NE":"Erriberri","NC":"Olite","C":3018},{"Z":4194,"N":"Ollo","O":472,"NE":"Ollaran","NC":"Ollo","C":315},{"Z":4192,"N":"Olóriz","O":470,"NE":"Oloritz","NC":"Olóriz","C":159},{"Z":4195,"N":"Orbaizeta","O":473,"NE":"Orbaizeta","NC":"Orbaizeta","C":180},{"Z":4196,"N":"Orbara","O":474,"NE":"Orbara","NC":"Orbara","C":39},{"Z":4197,"N":"Orísoain","O":475,"NE":"Orisoain","NC":"Orísoain","C":70},{"Z":4906,"N":"Orkoien","O":547,"NE":"Orkoien","NC":"Orkoien","C":2553},{"Z":4198,"N":"Oronz/Orontze","O":476,"NE":"Orontze","NC":"Oronz","C":36},{"Z":4199,"N":"Orotz-Betelu","O":477,"NE":"Orotz-Betelu","NC":"Orotz-Betelu","C":150},{"Z":4200,"N":"Oteiza","O":478,"NE":"Oteitza","NC":"Oteiza","C":764},{"Z":40,"N":"Iruña","O":10,"NE":"Iruñea","NC":"Pamplona-Iruña","C":147803},{"Z":4202,"N":"Peralta","O":479,"NE":"Azkoien","NC":"Peralta","C":4326},{"Z":4203,"N":"Petilla de Aragón","O":480,"NE":"Petilla Aragoi","NC":"Petilla de Aragón","C":40},{"Z":4204,"N":"Piedramillera","O":481,"NE":"Piedramillera","NC":"Piedramillera","C":37},{"Z":4205,"N":"Pitillas","O":482,"NE":"Pitillas","NC":"Pitillas","C":427},{"Z":4206,"N":"Puente la Reina/Gares","O":483,"NE":"Gares","NC":"Puente la Reina","C":2095},{"Z":4207,"N":"Pueyo","O":484,"NE":"Puiu","NC":"Pueyo","C":271},{"Z":4208,"N":"Ribaforada","O":485,"NE":"Ribaforada","NC":"Ribaforada","C":2569},{"Z":4209,"N":"Romanzado","O":486,"NE":"Erromantzatua","NC":"Romanzado","C":157},{"Z":4210,"N":"Roncal/Erronkari","O":487,"NE":"Erronkari","NC":"Roncal","C":199},{"Z":4211,"N":"Orreaga/Roncesvalles","O":488,"NE":"Orreaga","NC":"Roncesvalles","C":25},{"Z":4212,"N":"Sada","O":489,"NE":"Zare","NC":"Sada","C":151},{"Z":4213,"N":"Saldías","O":490,"NE":"Saldias","NC":"Saldias","C":105},{"Z":4214,"N":"Salinas de Oro","O":491,"NE":"Jaitz","NC":"Salinas de Oro","C":93},{"Z":4215,"N":"San Adrián","O":492,"NE":"San Adrian","NC":"San Adrián","C":4649},{"Z":4217,"N":"San Martín de Unx","O":494,"NE":"San Martín de Unx","NC":"San Martín de Unx","C":337},{"Z":4216,"N":"Sangüesa/Zangoza","O":493,"NE":"Zangoza","NC":"Sangüesa","C":3882},{"Z":4219,"N":"Sansol","O":495,"NE":"Santsol","NC":"Sansol","C":88},{"Z":4220,"N":"Santacara","O":496,"NE":"Santakara","NC":"Santacara","C":752},{"Z":4221,"N":"Doneztebe/Santesteban","O":497,"NE":"Doneztebe","NC":"Santesteban","C":1211},{"Z":4222,"N":"Sarriés/Sartze","O":498,"NE":"Sartze","NC":"Sarriés","C":63},{"Z":4223,"N":"Sartaguda","O":499,"NE":"Sartaguda","NC":"Sartaguda","C":995},{"Z":4224,"N":"Sesma","O":500,"NE":"Sesma","NC":"Sesma","C":914},{"Z":4225,"N":"Sorlada","O":501,"NE":"Sorlada","NC":"Sorlada","C":36},{"Z":4226,"N":"Sunbilla","O":502,"NE":"Sunbilla","NC":"Sunbilla","C":585},{"Z":4227,"N":"Tafalla","O":503,"NE":"Tafalla","NC":"Tafalla","C":8226},{"Z":4228,"N":"Tiebas-Muruarte de Reta","O":504,"NE":"Tiebas-Muru Artederreta","NC":"Tiebas-Muruarte de Reta","C":496},{"Z":4229,"N":"Tirapu","O":505,"NE":"Tirapu","NC":"Tirapu","C":50},{"Z":4230,"N":"Torralba del Río","O":506,"NE":"Torralba del Rio","NC":"Torralba del Río","C":107},{"Z":4231,"N":"Torres del Río","O":507,"NE":"Torres del Rio","NC":"Torres del Río","C":115},{"Z":4232,"N":"Tudela","O":508,"NE":"Tutera","NC":"Tudela","C":25152},{"Z":4233,"N":"Tulebras","O":509,"NE":"Tulebras","NC":"Tulebras","C":96},{"Z":4234,"N":"Ucar","O":510,"NE":"Ukar","NC":"Úcar","C":144},{"Z":4123,"N":"Uharte-Arakil","O":401,"NE":"Uharte Arakil","NC":"Uharte Arakil","C":654},{"Z":4235,"N":"Ujué","O":511,"NE":"Uxue","NC":"Ujué","C":166},{"Z":4236,"N":"Ultzama","O":512,"NE":"Ultzama","NC":"Ultzama","C":1324},{"Z":4237,"N":"Unciti","O":513,"NE":"Untzitibar","NC":"Unciti","C":195},{"Z":4238,"N":"Unzué","O":514,"NE":"Untzue","NC":"Unzué","C":110},{"Z":4239,"N":"Urdazubi/Urdax","O":515,"NE":"Urdazubi","NC":"Urdax","C":310},{"Z":4240,"N":"Urdiain","O":516,"NE":"Urdiain","NC":"Urdiain","C":531},{"Z":4241,"N":"Urraul Alto","O":517,"NE":"Urraulgoiti","NC":"Urraul Alto","C":134},{"Z":4242,"N":"Urraul Bajo","O":518,"NE":"Urraulbeiti","NC":"Urraul Bajo","C":253},{"Z":4244,"N":"Urrotz","O":520,"NE":"Urrotz","NC":"Urrotz","C":156},{"Z":4243,"N":"Urroz","O":519,"NE":"Urroz","NC":"Urroz","C":314},{"Z":4245,"N":"Urzainqui/Urzainki","O":521,"NE":"Urzainki","NC":"Urzainqui","C":83},{"Z":4246,"N":"Uterga","O":522,"NE":"Uterga","NC":"Uterga","C":140},{"Z":4247,"N":"Uztárroz/Uztarroze","O":523,"NE":"Uztarroze","NC":"Uztárroz","C":152},{"Z":4248,"N":"Luzaide/Valcarlos","O":524,"NE":"Luzaide","NC":"Valcarlos","C":295},{"Z":4249,"N":"Valtierra","O":525,"NE":"Valtierra","NC":"Valtierra","C":1885},{"Z":4251,"N":"Viana","O":527,"NE":"Viana","NC":"Viana","C":3110},{"Z":4252,"N":"Vidángoz/Bidankoze","O":528,"NE":"Bidankoze","NC":"Vidángoz","C":87},{"Z":4254,"N":"Villafranca","O":530,"NE":"Villafranca","NC":"Villafranca","C":1920},{"Z":4255,"N":"Villamayor de Monjardín","O":531,"NE":"Villamayor de Monjardin","NC":"Villamayor de Monjardín","C":102},{"Z":4256,"N":"Hiriberri/Villanueva de Aezkoa","O":532,"NE":"Hiriberri","NC":"Villanueva de Aezkoa","C":109},{"Z":4257,"N":"Villatuerta","O":533,"NE":"Villatuerta","NC":"Villatuerta","C":866},{"Z":4258,"N":"Villava/Atarrabia","O":534,"NE":"Atarrabia","NC":"Villava","C":7841},{"Z":4260,"N":"Yerri/Deierri","O":536,"NE":"Deierri","NC":"Yerri","C":1245},{"Z":4261,"N":"Yesa","O":537,"NE":"Esa","NC":"Yesa","C":235},{"Z":4262,"N":"Zabalza","O":538,"NE":"Zabaltza","NC":"Zabalza","C":206},{"Z":4073,"N":"Ziordia","O":351,"NE":"Ziordia","NC":"Ziordia","C":315},{"Z":4907,"N":"Zizur Mayor/Zizur Nagusia","O":548,"NE":"Zizur Nagusia","NC":"Zizur Mayor","C":10677},{"Z":4263,"N":"Zubieta","O":539,"NE":"Zubieta","NC":"Zubieta","C":236},{"Z":4264,"N":"Zugarramurdi","O":540,"NE":"Zugarramurdi","NC":"Zugarramurdi","C":179},{"Z":4265,"N":"Zúñiga","O":541,"NE":"Zuñiga","NC":"Zúñiga","C":86}]};
          for(var i=0;i<gen.zonas.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+gen.zonas[i]['NC']+gen.zonas[i]['Z']);
            for(var k=0;k<elToChange.length;k++){
              if(event.detail.value==='es'){
                elToChange[k].innerHTML=gen.zonas[i]['NC'];
              }
              else if(event.detail.value==='eu'){
                elToChange[k].innerHTML=gen.zonas[i]['NE'];
              }
            }
          }
             findElement=function(collection, value, attrName)
            {
              for (var i = 0, len = collection.length; i < len; i++)
              {
                var collection_value = collection[i][attrName];
                if (collection_value == value)
                {
                  return collection[i];
                }
              }
              return null;
            }
          var elToChange=document.querySelector('#fullTemp').querySelectorAll('x-select');
          for(var i=0;i<elToChange.length;i++){
            var isInGen=findElement(gen.zonas,elToChange[i].getAttribute('val'),'Z');
            var isInAr=findElement(ar.zonas,elToChange[i].getAttribute('val'),'Z');
            var isInViz=findElement(viz.zonas,elToChange[i].getAttribute('val'),'Z');
            var isInGip=findElement(gip.zonas,elToChange[i].getAttribute('val'),'Z');
            //var isInNav=findElement(nav.zonas,elToChange[i].getAttribute('val'),'Z');
            if(isInGen!==null){
              if(event.detail.value==='es'){
                elToChange[i].$.selectBut.innerHTML=isInGen['NC'];
              }
              else if(event.detail.value==='eu'){
                elToChange[i].$.selectBut.innerHTML=isInGen['NE'];
              }
            }
            else if(isInAr!==null){
              if(event.detail.value==='es'){
                elToChange[i].$.selectBut.innerHTML=isInAr['NC'];
              }
              else if(event.detail.value==='eu'){
                elToChange[i].$.selectBut.innerHTML=isInAr['NE'];
              }
            }
            else if(isInViz!==null){
              if(event.detail.value==='es'){
                elToChange[i].$.selectBut.innerHTML=isInViz['NC'];
              }
              else if(event.detail.value==='eu'){
                elToChange[i].$.selectBut.innerHTML=isInViz['NE'];
              }
            }
            else if(isInGip!==null){
              if(event.detail.value==='es'){
                elToChange[i].$.selectBut.innerHTML=isInGip['NC'];
              }
              else if(event.detail.value==='eu'){
                elToChange[i].$.selectBut.innerHTML=isInGip['NE'];
              }
            }
            /*else if(isInNav!==null){
              if(event.detail.value==='es'){
                elToChange[i].$.selectBut.innerHTML=isInNav['NC'];
              }
              else if(event.detail.value==='eu'){
                elToChange[i].$.selectBut.innerHTML=isInNav['NE'];
              }
            }*/
          }
          for(var i=0;i<ar.zonas.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+ar.zonas[i]['NC']+ar.zonas[i]['Z']);
            for(var k=0;k<elToChange.length;k++){
              if(event.detail.value==='es'){
                elToChange[k].innerHTML=ar.zonas[i]['NC'];
              }
              else if(event.detail.value==='eu'){
                elToChange[k].innerHTML=ar.zonas[i]['NE'];
              }
            }
          }
          for(var i=0;i<viz.zonas.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+viz.zonas[i]['NC']+viz.zonas[i]['Z']);
            for(var k=0;k<elToChange.length;k++){
              if(event.detail.value==='es'){
                elToChange[k].innerHTML=viz.zonas[i]['NC'];
              }
              else if(event.detail.value==='eu'){
                elToChange[k].innerHTML=viz.zonas[i]['NE'];
              }
            }
          }
          for(var i=0;i<gip.zonas.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+gip.zonas[i]['NC']+gip.zonas[i]['Z']);
            for(var k=0;k<elToChange.length;k++){
              if(event.detail.value==='es'){
                elToChange[k].innerHTML=gip.zonas[i]['NC'];
              }
              else if(event.detail.value==='eu'){
                elToChange[k].innerHTML=gip.zonas[i]['NE'];
              }
            }
          }
          /*for(var i=0;i<nav.zonas.length;i++){
            var elToChange=document.querySelector('#fullTemp').querySelectorAll('#'+nav.zonas[i]['NC']+nav.zonas[i]['Z']);
            for(var k=0;k<elToChange.length;k++){
              if(event.detail.value==='es'){
                elToChange[k].innerHTML=nav.zonas[i]['NC'];
              }
              else if(event.detail.value==='eu'){
                elToChange[k].innerHTML=nav.zonas[i]['NE'];
              }
            }
          }*/
          var elToChange=document.querySelector('#fullTemp').querySelectorAll('#imgAvisoCam');
            for(var k=0;k<elToChange.length;k++){
              if(event.detail.value==='es'){
                elToChange[k].src='../resources/configPanel/img/camara/camconfiges.png';
              }
              else if(event.detail.value==='eu'){
                elToChange[k].src='../resources/configPanel/img/camara/camconfigeu.png';
              }
            }

            /*var elToChange=document.querySelector('#fullTemp').querySelectorAll('#imgAvisoRadio');
            for(var k=0;k<elToChange.length;k++){
              if(event.detail.value==='es'){
                elToChange[k].src='../resources/configPanel/img/radio/radconfes.png';
              }
              else if(event.detail.value==='eu'){
                elToChange[k].src='../resources/configPanel/img/radio/radconfeu.png';
              }
            }*/
      }
  }

  document.addEventListener('appAttributeChange',this.onLanguageChange.bind(this),false);
  document.addEventListener('cameraAdminChange',function(event){
    var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
    var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
    var sectionDiv=document.querySelector('#fullTemp').children;

    var vMute='';
    var muteVal='';
    if(event.detail.pnv!==undefined){
      vMute='video2';
      muteVal=event.detail.pnv;
    }
    else if(event.detail.bildu!==undefined){
      vMute='video5';
      muteVal=event.detail.bildu;
    }
    else if(event.detail.pse!==undefined){
      vMute='video3';
      muteVal=event.detail.pse;
    }
    else if(event.detail.pp!==undefined){
      vMute='video6';
      muteVal=event.detail.pp;
    }
    else if(event.detail.podemos!==undefined){
      vMute='video4';
      muteVal=event.detail.podemos;
    }
    var vMuteCompId=document.querySelector('#'+vMute).compId;
    if(muteVal==='off'){
      var agentsToMute=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext().agents;
      var smallerId=agentsToMute[0]._id;
      function filterBy_Id(el){
        if(el._id<smallerId)return el;
      }
      if(agentsToMute.length>1){
        var smallestId=agentsToMute.filter(filterBy_Id)._id;
        if(smallestId===undefined){
          smallestId=agentsToMute[0];
        }

      }
      else{
        var smallestId=agentsToMute[0];
      }

      if(smallestId.id===mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgentId()){
        for(var k=0;k<agentsToMute.length;k++){
          !function outer(k){
          setTimeout(function(){
            mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentsToMute[k].id,vMuteCompId,'mutePlayer');
            mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSoundSwVal(agentsToMute[k].id,vMuteCompId,false);


          },k*2000);
        }(k);


        }
        for(var k=0;k<agentsToMute.length;k++){
          !function outer(k){
            setTimeout(function(){
              mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentsToMute[k].id,vMuteCompId,'muteEtb');

            },(k*2000)+1000);
          }(k);


        }
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeOwnCamera(smallestId.id,vMute,'off');
      }

      for(var i=2;i<sectionNum;i++){
        if(sections[i].name.indexOf('cameras')>-1){
          sectionDiv[i].querySelector('#soundCheck'+vMuteCompId).style.pointerEvents='none';

        }
      }

    }
    else if(muteVal==='on'){
      var agentsToMute=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext().agents;
      var smallerId=agentsToMute[0]._id;
      function filterBy_Id(el){
        if(el._id<smallerId)return el;
      }
      if(agentsToMute.length>1){
        var smallestId=agentsToMute.filter(filterBy_Id)._id;
        if(smallestId===undefined){
          smallestId=agentsToMute[0];
        }
      }
      else{
        var smallestId=agentsToMute[0];
      }
      if(smallestId.id===mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getAgentId()){
        for(var k=0;k<agentsToMute.length;k++){
          //mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentsToMute[k].id,vMuteCompId,'soundPlayer');
          //mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSoundSwVal(agentsToMute[k].id,vMuteCompId,true);
          !function outer(k){
          setTimeout(function(){
            mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentsToMute[k].id,vMuteCompId,'soundEtb');
          },1000*(k));
          }(k);

        }
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeOwnCamera(smallestId.id,vMute,'on');
      }
      for(var i=2;i<sectionNum;i++){
        if(sections[i].name.indexOf('cameras')>-1){
          sectionDiv[i].querySelector('#soundCheck'+vMuteCompId).style.pointerEvents='auto';

        }
      }
    }





  });
  this.onCtxUpdate=function(event){
    //console.log(event);

    var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
    var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
    var sectionDiv=document.querySelector('#fullTemp').children;


    if(event.detail.context.lastChange!==undefined){
    if(event.detail.context.lastChange.diff!==null ){
      var changes=event.detail.context.lastChange.diff;

      for(var j=0;j<changes.length;j++){
        for(var i=2;i<sectionNum;i++){
          //if(changes[j].property==='show'){
          var selector = '#viewCheck'+changes[j].compId;
          if(changes[j].property==='show'){

            if(sections[i].name.indexOf(event.detail.agentid)===0 &&
                sectionDiv[i].querySelector(selector)!==null){
              // Show/hide commands
              if(changes[j].newValue===false){


                sectionDiv[i].querySelector(selector).setAttribute('val',false);

              }
              else if(changes[j].newValue===true){

                sectionDiv[i].querySelector(selector).setAttribute('val',true);
              }
            }
            /*else if(sections[i].name.indexOf(event.detail.agentid)===0 &&
                sectionDiv[i].querySelector('#radioViewBut'+changes[j].compId)!==null){
              if(changes[j].newValue===false){

                sectionDiv[i].querySelector('#radioViewBut'+changes[j].compId).setAttribute('src','../resources/configPanel/img/radio/Radio_btn_play.png');
                sectionDiv[i].querySelector('#radioEq'+changes[j].compId).setAttribute('src','../resources/configPanel/img/radio/Radio-animacion-off-estatico.png');

              }
              else if(changes[j].newValue===true){
                sectionDiv[i].querySelector('#radioViewBut'+changes[j].compId).setAttribute('src','../resources/configPanel/img/radio/Radio_btn_pausa.png');
                sectionDiv[i].querySelector('#radioEq'+changes[j].compId).setAttribute('src','../resources/configPanel/img/radio/animacion-ecualizador_transp.gif');
              }
            }*/

          }
          else if(changes[j].property==='customCmd'){
            if(changes[j].newValue==='hide' || changes[j].newValue==='show'){
              var selector = '#viewCheck'+changes[j].compId;
              if(sections[i].name.indexOf(event.detail.agentid)===0 && sectionDiv[i].querySelector(selector)!==null){
                // Show/hide commands
                if(changes[j].newValue==='hide'){


                  sectionDiv[i].querySelector(selector).setAttribute('val',false);
                }
                else if(changes[j].newValue==='show'){

                  sectionDiv[i].querySelector(selector).setAttribute('val',true);
                }
              }
              /*else if(sections[i].name.indexOf(event.detail.agentid)===0 &&
                sectionDiv[i].querySelector('#radioViewBut'+changes[j].compId)!==null){
              if(changes[j].newValue==='hide'){

                sectionDiv[i].querySelector('#radioViewBut'+changes[j].compId).setAttribute('src','../resources/configPanel/img/radio/Radio_btn_play.png');
                sectionDiv[i].querySelector('#radioEq'+changes[j].compId).setAttribute('src','../resources/configPanel/img/radio/Radio-animacion-off-estatico.png');

              }
              else if(changes[j].newValue==='show'){
                sectionDiv[i].querySelector('#radioViewBut'+changes[j].compId).setAttribute('src','../resources/configPanel/img/radio/Radio_btn_pausa.png');
                sectionDiv[i].querySelector('#radioEq'+changes[j].compId).setAttribute('src','../resources/configPanel/img/radio/animacion-ecualizador_transp.gif');
              }
            }*/



            }
            //Sound/mute
            //else{
            if(changes[j].newValue==='mutePlayer' || changes[j].newValue==='soundPlayer'){
              var selector = '#soundCheck'+changes[j].compId;
              if(sections[i].name.indexOf(event.detail.agentid)===0 && sectionDiv[i].querySelector(selector)!==null){
                if(changes[j].newValue==='mutePlayer'){

                  sectionDiv[i].querySelector(selector).setAttribute('val',false);
                }
                else if(changes[j].newValue==='soundPlayer'){

                  sectionDiv[i].querySelector(selector).setAttribute('val',true);
                }
              }
            }
            if(changes[j].newValue==='offSound' || changes[j].newValue==='onSound'){
              var selector = '#soundCheck'+changes[j].compId;
              if(sections[i].name.indexOf(event.detail.agentid)===0 && sectionDiv[i].querySelector(selector)!==null){
                if(changes[j].newValue==='offSound'){

                  sectionDiv[i].querySelector(selector).setAttribute('val',false);
                }
                else if(changes[j].newValue==='onSound'){

                  sectionDiv[i].querySelector(selector).setAttribute('val',true);
                }
              }
            }

            /*if(sections[i].name===event.detail.agentid+'twitter' && sectionDiv[i].querySelector('#htSelect')!==null){
              sectionDiv[i].querySelector('#htSelect').value=changes[j].newValue;
            }*/
            if(navigator.appVersion.indexOf('Panasonic')>-1){
              if(sections[i].name===event.detail.agentid+'graphics' && changes[j].newValue.indexOf('lugar')>-1){
                sectionDiv[i].querySelector('#lugarSelect'+changes[j].compId).setAttribute('val',changes[j].newValue.split('lugar')[1]);
              }
              if(sections[i].name===event.detail.agentid+'graphics' && changes[j].newValue.indexOf('pielug')>-1){
                sectionDiv[i].querySelector('#pieSelect'+changes[j].compId).setAttribute('val',changes[j].newValue.split('pielug')[1]);
              }
              if(sections[i].name===event.detail.agentid+'graphics' && changes[j].newValue.indexOf('tablelug')>-1){
                sectionDiv[i].querySelector('#tableSelect'+changes[j].compId).setAttribute('val',changes[j].newValue.split('tablelug')[1]);
              }
            }
            else{
              if(sections[i].name===event.detail.agentid+'graphics' && changes[j].newValue.indexOf('lugar')>-1){
                sectionDiv[i].querySelector('#lugarSelect'+changes[j].compId).value=changes[j].newValue.split('lugar')[1];
              }
              if(sections[i].name===event.detail.agentid+'graphics' && changes[j].newValue.indexOf('pielug')>-1){
                sectionDiv[i].querySelector('#pieSelect'+changes[j].compId).value=changes[j].newValue.split('pielug')[1];
              }
              if(sections[i].name===event.detail.agentid+'graphics' && changes[j].newValue.indexOf('tablelug')>-1){
                sectionDiv[i].querySelector('#tableSelect'+changes[j].compId).value=changes[j].newValue.split('tablelug')[1];
              }
            }


            /*if(sections[i].name===event.detail.agentid+'graphics' && changes[j].newValue.indexOf('tabletipo')>-1){
              if(changes[j].newValue.indexOf('S')>-1){
                sectionDiv[i].querySelector('#congInp'+changes[j].compId).checked=false;
                sectionDiv[i].querySelector('#senInp'+changes[j].compId).checked=true;
              }
              else if(changes[j].newValue.indexOf('C')>-1){
                sectionDiv[i].querySelector('#congInp'+changes[j].compId).checked=true;
                sectionDiv[i].querySelector('#senInp'+changes[j].compId).checked=false;
              }

            }
            if(sections[i].name===event.detail.agentid+'graphics' && changes[j].newValue.indexOf('maptipo')>-1){
              if(changes[j].newValue.indexOf('S')>-1){
                sectionDiv[i].querySelector('#congInp'+changes[j].compId).checked=false;
                sectionDiv[i].querySelector('#senInp'+changes[j].compId).checked=true;
              }
              else if(changes[j].newValue.indexOf('C')>-1){
                sectionDiv[i].querySelector('#congInp'+changes[j].compId).checked=true;
                sectionDiv[i].querySelector('#senInp'+changes[j].compId).checked=false;
              }

            }
            if(sections[i].name===event.detail.agentid+'graphics' && changes[j].newValue.indexOf('pietipo')>-1){
              if(changes[j].newValue.indexOf('S')>-1){
                sectionDiv[i].querySelector('#congInp'+changes[j].compId).checked=false;
                sectionDiv[i].querySelector('#senInp'+changes[j].compId).checked=true;
              }
              else if(changes[j].newValue.indexOf('C')>-1){
                sectionDiv[i].querySelector('#congInp'+changes[j].compId).checked=true;
                sectionDiv[i].querySelector('#senInp'+changes[j].compId).checked=false;
              }

            }*/


          }
        }
      }
    }
    else if(event.detail.context.lastChange.key==='layoutEvent'){
      for(var i=2;i<sectionNum;i++){
        if(sections[i].name===event.detail.agentid+'layouts'){
          var layoutList=sections[i].items[1].layouts;
          for(var j=0;j<layoutList.length;j++){
            if(layoutList[j].name===event.detail.context.lastChange.value){
              sectionDiv[i].querySelector('#'+event.detail.context.lastChange.value+'Layout').className='active';
            }
            else{
              sectionDiv[i].querySelector('#'+layoutList[j].name+'Layout').className='';
            }
            /*if(event.detail.context.lastChange.value!=='carousel'){
              sectionDiv[i].querySelector('#ctrlDiv').style.display='none';

            }
            else{
              sectionDiv[i].querySelector('#ctrlDiv').style.display='block';

            }*/
          }
        }
      }
    }
  }

  }
  document.addEventListener('contextUpdate',this.onCtxUpdate.bind(this));
  this.render=function(sectionName){

    var div=document.createElement('div');
    div.className='fullwidth-template';
    div.id='fullTemp';
    div.style.position='absolute';
    div.style.top='0';
    div.style.zIndex='99999';
    div.style.backgroundColor='rgba(255, 255, 255, 0.5)';

    this.activeSection=sectionName;
    this.items.forEach(function(it){
      if(it instanceof menu ||  it.name===sectionName){
        div.appendChild(it.render());
        div.lastElementChild.style.display='block';

      }
      else{
        div.appendChild(it.render());
        div.lastElementChild.style.display='none';
      }
    });
    return div;
  }
  this.changeSection=function(sectionName,device){

    var scope=this;

    if(this.activeDevice+this.activeSection!==device+sectionName){
      this.items.forEach(function(it,i){

        if(sectionName==='AddDevice'){
          if(it.name===sectionName){
            document.querySelector('#fullTemp').children[i].style.display='block';
          }
          if(it.name===scope.activeDevice+scope.activeSection)
          {
            document.querySelector('#fullTemp').children[i].style.display='none';
          }
        }


        else if(sectionName!=='AddDevice' && device!==undefined && device!=='same'){
          if(it.name===device+sectionName){
            document.querySelector('#fullTemp').children[i].style.display='block';
            var devNum=document.querySelector('#fullTemp').children[i].children[0].children;
            for(var j=0;j<devNum.length;j++){
              if(devNum[j].id===device){
                devNum[j].className="col-md-"+(12/devNum.length)+" col-xs-"+(12/devNum.length)+" boxdevice active";
              }
              if(devNum[j].id===scope.activeDevice){
                devNum[j].className="col-md-"+(12/devNum.length)+" col-xs-"+(12/devNum.length)+" boxdevice";
              }
            }

          }
          if(it.name===scope.activeDevice+scope.activeSection)
          {
            document.querySelector('#fullTemp').children[i].style.display='none';
          }
        }
        else{
          if(device===undefined){
            if(it.name===scope.selfID+sectionName){
              document.querySelector('#fullTemp').children[i].style.display='block';
              var devNum=document.querySelector('#fullTemp').children[i].children[0].children;
              for(var j=0;j<devNum.length;j++){
                if(devNum[j].id===scope.selfID){
                  devNum[j].className="col-md-"+(12/devNum.length)+" col-xs-"+(12/devNum.length)+" boxdevice active";
                }
                if(devNum[j].id===scope.activeDevice && scope.activeDevice!==scope.selfID){
                  devNum[j].className="col-md-"+(12/devNum.length)+" col-xs-"+(12/devNum.length)+" boxdevice";
                }
              }
            }
            if((it.name===scope.activeDevice+scope.activeSection || it.name==='AddDevice') && scope.activeSection!==sectionName)
            {
              document.querySelector('#fullTemp').children[i].style.display='none';
            }
          }
          else if(device==='same'){
            if(scope.activeDevice===''){
              scope.activeDevice=scope.selfID;
            }
            if(it.name===scope.activeDevice+sectionName){
              document.querySelector('#fullTemp').children[i].style.display='block';
              var devNum=document.querySelector('#fullTemp').children[i].children[0].children;
              for(var j=0;j<devNum.length;j++){
                if(devNum[j].id===scope.activeDevice){
                  devNum[j].className="col-md-"+(12/devNum.length)+" col-xs-"+(12/devNum.length)+" boxdevice active";
                }
                if(devNum[j].id!==scope.activeDevice){
                  devNum[j].className="col-md-"+(12/devNum.length)+" col-xs-"+(12/devNum.length)+" boxdevice";
                }
              }
            }
            if((it.name===scope.activeDevice+scope.activeSection || it.name==='AddDevice') && scope.activeSection!==sectionName)
            {
              document.querySelector('#fullTemp').children[i].style.display='none';
            }
          }
        }

      });



      if(this.activeSection!=='' && this.activeDevice!==''){
        document.querySelector('#'+this.activeSection).className='';
      }
      if(this.activeSection==='AddDevice'){
        document.querySelector('#'+this.activeSection).className='options';
      }
      if(sectionName!==''){
        document.querySelector('#'+sectionName).className='active';
      }

      if(device!==undefined && device!=='same'){
        this.activeSection=sectionName;
        this.activeDevice=device;
      }
      else if(device===undefined){
        this.activeSection=sectionName;
        this.activeDevice=this.selfID;
      }
      else if(device==='same'){
        this.activeSection=sectionName;
      }
      if(this.activeSection===''){
      document.querySelector('#fullTemp').style.width='auto';
      }
      else{
        document.querySelector('#fullTemp').style.width='100%';
      }
    }


  }
  this.changeLayout=function(agentToChange,layoutName){
    var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
    var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
    var sectionDiv=document.querySelector('#fullTemp').children;



    for(var i=2;i<sectionNum;i++){
      if(sections[i].name===agentToChange+'layouts'){
        var layoutList=sections[i].items[1].layouts;
        for(var j=0;j<layoutList.length;j++){
          if(layoutList[j].name===layoutName){
            sectionDiv[i].querySelector('#'+layoutName+'Layout').className='active';
          }
          else{
            sectionDiv[i].querySelector('#'+layoutList[j].name+'Layout').className='';
          }
          /*if(layoutName!=='carousel'){
            sectionDiv[i].querySelector('#ctrlDiv').style.display='none';

          }
          else{
            sectionDiv[i].querySelector('#ctrlDiv').style.display='block';

          }*/
        }
      }
    }
  }

  /*this.changeHashtag=function(agentToChange,h){
    var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
    var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
    var sectionDiv=document.querySelector('#fullTemp').children;
    for(var i=2;i<sectionNum;i++){
      if(sections[i].name===agentToChange+'twitter'){
        sectionDiv[i].querySelector('#htSelect').value=h;
      }
    }

  }*/
  this.changeLugar=function(agentToChange,h,cId){
    var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
    var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
    var sectionDiv=document.querySelector('#fullTemp').children;
    for(var i=2;i<sectionNum;i++){
      if(sections[i].name===agentToChange+'graphics'){
        if(navigator.appVersion.indexOf('Panasonic')>-1){
          sectionDiv[i].querySelector('#lugarSelect'+cId).setAttribute('val',h);
        }
        else{
          sectionDiv[i].querySelector('#lugarSelect'+cId).setAttribute('value',h);
        }
      }
    }

  }


  this.changeTablePlace=function(agentToChange,h,cId){
    var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
    var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
    var sectionDiv=document.querySelector('#fullTemp').children;
    for(var i=2;i<sectionNum;i++){
      if(sections[i].name===agentToChange+'graphics'){
        if(navigator.appVersion.indexOf('Panasonic')>-1){
          sectionDiv[i].querySelector('#tableSelect'+cId).setAttribute('val',h);
        }
        else{
          sectionDiv[i].querySelector('#tableSelect'+cId).setAttribute('value',h);
        }
      }
    }
  }

  /*this.changeTableTipo=function(agentToChange,h,cId){
    var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
    var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
    var sectionDiv=document.querySelector('#fullTemp').children;
    for(var i=2;i<sectionNum;i++){
      if(sections[i].name===agentToChange+'graphics'){
        if(h.indexOf('S')>-1){
          sectionDiv[i].querySelector('#congInp'+cId).checked=false;
          sectionDiv[i].querySelector('#senInp'+cId).checked=true;
        }
        else if(h.indexOf('C')>-1){
          sectionDiv[i].querySelector('#congInp'+cId).checked=true;
          sectionDiv[i].querySelector('#senInp'+cId).checked=false;
        }
      }
    }
  }*/
  this.changeOwnCamera=function(agentToChange,cId,val){
    //console.log('It has to change');
    if(val==='on'){
      document.querySelector('#'+cId).querySelector('video').style.display='block';
      //document.querySelector('#'+cId).querySelector('video').setAttribute('muted',false);
      document.querySelector('#'+cId).querySelector('#etbmuteimg').style.display='none';
    }
    else if(val==='off'){
      document.querySelector('#'+cId).querySelector('video').style.display='none';
      document.querySelector('#'+cId).querySelector('video').muted=true;
      document.querySelector('#'+cId).querySelector('#etbmuteimg').style.display='block';
    }

  }
  this.changePiePlace=function(agentToChange,h,cId){
    var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
    var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
    var sectionDiv=document.querySelector('#fullTemp').children;
    for(var i=2;i<sectionNum;i++){
      if(sections[i].name===agentToChange+'graphics'){
        if(navigator.appVersion.indexOf('Panasonic')>-1){
          sectionDiv[i].querySelector('#pieSelect'+cId).setAttribute('val',h);
        }
        else{
          sectionDiv[i].querySelector('#pieSelect'+cId).setAttribute('value',h);
        }
      }
    }
  }

  this.changeSoundSwVal=function(agentToChange,cId,v){
    var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
    var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
    var sectionDiv=document.querySelector('#fullTemp').children;



    for(var i=2;i<sectionNum;i++){
      if(sections[i].name===agentToChange+'cameras'){
        sectionDiv[i].querySelector('#soundCheck'+cId).setAttribute('val',v);

      }
    }
  }
  this.changeViewSwVal=function(agentToChange,cId,v){
    var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
    var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
    var sectionDiv=document.querySelector('#fullTemp').children;



    for(var i=2;i<sectionNum;i++){
      if(sections[i].name.indexOf(agentToChange)===0 && sectionDiv[i].querySelector('#viewCheck'+cId)!==null){
        sectionDiv[i].querySelector('#viewCheck'+cId).setAttribute('val',v);

      }
    }
  }
  this.changeSoundSWActive=function(){
    var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
    var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
    var sectionDiv=document.querySelector('#fullTemp').children;



    for(var i=2;i<sectionNum;i++){
      if(sections[i].name.indexOf('cameras')>-1){
        if(mediascape.cameras.pnv==='off'){
          sectionDiv[i].querySelector('#soundCheck'+document.querySelector('#video2').compId).style.pointerEvents='none';
        }
        if(mediascape.cameras.pse==='off'){
          sectionDiv[i].querySelector('#soundCheck'+document.querySelector('#video3').compId).style.pointerEvents='none';
        }
        if(mediascape.cameras.podemos==='off'){
          sectionDiv[i].querySelector('#soundCheck'+document.querySelector('#video4').compId).style.pointerEvents='none';
        }
        if(mediascape.cameras.bildu==='off'){
          sectionDiv[i].querySelector('#soundCheck'+document.querySelector('#video5').compId).style.pointerEvents='none';
        }
        if(mediascape.cameras.pp==='off'){
          sectionDiv[i].querySelector('#soundCheck'+document.querySelector('#video6').compId).style.pointerEvents='none';
        }


        if(mediascape.cameras.pnv==='on'){
          sectionDiv[i].querySelector('#soundCheck'+document.querySelector('#video2').compId).style.pointerEvents='auto';
        }
        if(mediascape.cameras.pse==='on'){
          sectionDiv[i].querySelector('#soundCheck'+document.querySelector('#video3').compId).style.pointerEvents='auto';
        }
        if(mediascape.cameras.podemos==='on'){
          sectionDiv[i].querySelector('#soundCheck'+document.querySelector('#video4').compId).style.pointerEvents='auto';
        }
        if(mediascape.cameras.bildu==='on'){
          sectionDiv[i].querySelector('#soundCheck'+document.querySelector('#video5').compId).style.pointerEvents='auto';
        }
        if(mediascape.cameras.pp==='on'){
          sectionDiv[i].querySelector('#soundCheck'+document.querySelector('#video6').compId).style.pointerEvents='auto';
        }


      }
    }
  }
  /*this.changeRadioViewImgVal=function(agentToChange,cId,v){
    var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
    var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
    var sectionDiv=document.querySelector('#fullTemp').children;



    for(var i=2;i<sectionNum;i++){
      if(sections[i].name.indexOf(agentToChange)===0 && sectionDiv[i].querySelector('#radioViewBut'+cId)!==null){
        if(v===false){

          sectionDiv[i].querySelector('#radioViewBut'+cId).setAttribute('src','../resources/configPanel/img/radio/Radio_btn_play.png');
          sectionDiv[i].querySelector('#radioEq'+cId).setAttribute('src','../resources/configPanel/img/radio/Radio-animacion-off-estatico.png');

        }
        else if(v===true){
          sectionDiv[i].querySelector('#radioViewBut'+cId).setAttribute('src','../resources/configPanel/img/radio/Radio_btn_pausa.png');
          sectionDiv[i].querySelector('#radioEq'+cId).setAttribute('src','../resources/configPanel/img/radio/animacion-ecualizador_transp.gif');
        }


      }
    }
  }*/

  this.hide=function(){
    document.querySelector('#fullTemp').style.display='none';
    document.querySelector('#menuButtonP').style.display='none';
    this.showing=false;
    if(this.activeSection===''){
      document.querySelector('#fullTemp').style.width='auto';
    }
    else{
      document.querySelector('#fullTemp').style.width='100%';
    }
  }
  this.show=function(){
    document.querySelector('#fullTemp').style.display='block';
    document.querySelector('#menuButtonP').style.display='';
    this.showing=true;
    if(this.activeSection===''){
      document.querySelector('#fullTemp').style.width='auto';
    }
    else{
      document.querySelector('#fullTemp').style.width='100%';
    }
  }
  //security time between clicks
  this.enableClicks=function(){
    var scope=this;
    setTimeout(function(){
        scope.enabled=true;
        if(document.querySelector('#loadingNotif').style.display==='block'){
          console.log('KENDUTA');
          mediascape.AdaptationToolkit.uiComponents.unloadingNotification();
        }
    },scope.securityTime);
  }
  this.controlPanel();
}


var menuItem = function (){
  this.text = "";
  this.icon='';
  this.aSection='';
  this.id='';

  this.setText=function (text){
    this.text=text;
  }
  this.setIcon=function (icon){
    this.icon=icon;
  }
  this.setTextId=function(id){
    this.textId=id;
  }
  this.setSection=function (aSection){
    this.aSection=aSection;
  }
  this.getId = function(){
    return this.aSection;
  }
  this.render=function(next,prev){
    var li=document.createElement('li');
    li.addEventListener('click',this.onclick.bind(this));
    li.id=this.aSection;
    li.tabIndex=1;
    var _this=this;
    li.onfocus=function(event){
      //window.alert("focus");
      li.addEventListener('keyDown',function(event){
        if(event.keyCode===17){
          _this.onclick.bind(_this);
        }
      });
    }


    var a=document.createElement('a');
    //a.href='#';

    var span=document.createElement('span');

    var i=document.createElement('i');
    i.className=this.icon;
    span.appendChild(i);

    var strong=document.createElement('strong');
    strong.innerHTML=this.text;
    strong.id=this.textId;
    span.appendChild(strong);

    a.appendChild(span);
    if(this.aSection==='AddDevice'){
      li.className='options';
      li.onfocus=function(){

        a.style.backgroundColor='orange';
      }
      li.onblur=function(){
        a.style.backgroundColor='';
      }
    }
    else{
      li.onfocus=function(){

        a.style.backgroundColor='orange';
      }
      li.onblur=function(){
        a.style.backgroundColor='';
      }
   }


    li.appendChild(a);

    li.setAttribute('style','nav-down:#'+next+';nav-up:#'+prev+';');
return li;
}
this.onclick = function (event){
  console.log(this.aSection);

  mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSection(this.aSection,'same');


}
}

var menu = function (){
  this.items=[];
  this.addItem = function(item){
    this.items.push(item);
  }

  this.render=function(){
    var containerDiv=document.createElement('div');
    containerDiv.className="col-md-2 col-sm-2 menu-sidebar fixed";

    //take the agent number which is related to the agentId

    var langconf=new langItem();
    containerDiv.appendChild(langconf.render());


    var device=new devId();


    var dev=device.render();
    containerDiv.appendChild(dev);

    var div=document.createElement('div');
    div.className="sidebar-menu";

    //To fullScreen


    var ul=document.createElement('ul');

    var hide=new hideItem();
    ul.appendChild(hide.render());

    var _this=this;
    this.items.forEach(function(it,i){
      if((i!==_this.items.length-1) && (i!==0))ul.appendChild(it.render(_this.items[i+1].aSection,_this.items[i-1].aSection));
      else if((i!==_this.items.length-1) && (i===0)){ul.appendChild(it.render(_this.items[i+1].aSection,'hide'));}
      else if((i===_this.items.length-1) && (i!==0)){
        if(mediascape.deviceType.toLowerCase().indexOf('tv')>-1){
          ul.appendChild(it.render('cappli',_this.items[i-1].aSection));
        }
        else{
          ul.appendChild(it.render('fullli',_this.items[i-1].aSection));
        }
      }

    });


    if(mediascape.deviceType.toLowerCase().indexOf('tv')===-1){
      var full=new fullScreenItem();
      ul.appendChild(full.render());
    }
    if(mediascape.deviceType.toLowerCase().indexOf('tv')>-1){
      var closeApp=new closeAppItem();
    ul.appendChild(closeApp.render());
    }


    var logo=new logoItem();
    ul.appendChild(logo.render());



    div.appendChild(ul);
    containerDiv.appendChild(div);


    return containerDiv;

  }
}

var devId=function(){
  this.num='';
  this.setNum=function(number){
    this.num=number;
  }
  this.render=function(){
    var div=document.createElement('div');
    div.className='mydevice';

    var img=document.createElement('img');
    img.src='';
    img.id='devNum';


    div.appendChild(img);

    return div;
  }
}
var langItem=function(){
  this.render=function(){
    var div=document.createElement('div');
    div.className='lang';

    var eu=document.createElement('a');
    eu.innerHTML='eu';
    eu.className='active';
    eu.tabIndex=1;
    eu.id='langeu';

    var span=document.createElement('span');
    span.innerHTML=' | ';

    var es=document.createElement('a');
    es.innerHTML='es';
    es.tabIndex=1;
    es.id='langes';

    eu.onfocus=function(){

      eu.style.border='5px solid orange';
      //mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setAppAttribute('language','eu');
    }
    eu.onblur=function(){
      eu.style.border='';
       //mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setAppAttribute('language','es');
    }
    if(mediascape.deviceType.toLowerCase().indexOf('tv')>-1){
       eu.setAttribute('style','nav-right:#langes;nav-up:#graphics;nav-down:#hide;');
    }
    else{
       eu.setAttribute('style','nav-right:#langes;nav-up:#fullli;nav-down:#hide;');
    }

     es.onfocus=function(){

      es.style.border='5px solid orange';
    }

    es.onblur=function(){
      es.style.border='';
    }
    if(mediascape.deviceType.toLowerCase().indexOf('tv')>-1){
       es.setAttribute('style','nav-left:#langeu;nav-up:#cappli;nav-down:#hide;');
    }
    else{
        es.setAttribute('style','nav-left:#langeu;nav-up:#fullli;nav-down:#hide;');
    }

    eu.onclick=function(){
      if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
        mediascape.AdaptationToolkit.uiComponents.loadingNotification();
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
        setTimeout(function(){
          eu.className='active';
          es.className='';
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setAppAttribute('language','eu');
          mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
        },500);

      }
    }
    es.onclick=function(){
      if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
        mediascape.AdaptationToolkit.uiComponents.loadingNotification();
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
        setTimeout(function(){
          eu.className='';
          es.className='active';
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setAppAttribute('language','es');
          mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
        },500);
      }
    }


    div.appendChild(eu);
    div.appendChild(span);
    div.appendChild(es);


    return div;
  }
}
var hideItem=function(){
  this.render=function(){
    var li=document.createElement('li');
    li.className='options';
    var a=document.createElement('a');
    //a.href='#';


    var span=document.createElement('span');

    var i=document.createElement('i');
    i.className="zmdi zmdi-chevron-left";
    span.appendChild(i);

    var strong=document.createElement('strong');
    strong.innerHTML='Hide';
    strong.id='stronghide';
    span.appendChild(strong);
    a.appendChild(span);
    li.appendChild(a);
    li.onfocus=function(event){
      a.style.backgroundColor='orange';
    }
    li.onblur=function(){
      a.style.backgroundColor='';
    }
    li.id='hide';
    li.tabIndex=1;
    li.setAttribute('style','nav-down:#AddDevice;nav-up:#langeu;')
    li.onclick=function(event){
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.hide();
    }
    return li;
  }
}

var fullScreenItem=function(){
  this.render=function(){
    var li=document.createElement('li');
    //li.className='options';
    var a=document.createElement('a');
    //a.href='#';


    var span=document.createElement('span');

    var i=document.createElement('i');
    i.className="zmdi zmdi-fullscreen";
    span.appendChild(i);

    var strong=document.createElement('strong');
    strong.innerHTML='FullScreen';
    strong.id='strongfull';
    span.appendChild(strong);
    a.appendChild(span);
    li.appendChild(a);
     li.onfocus=function(event){
      a.style.backgroundColor='orange';
    }
    li.onblur=function(){
      a.style.backgroundColor='';
    }
    li.id='fullli';


       li.tabIndex=1;


           li.setAttribute('style','nav-down:#langeu;nav-up:#graphics;');




    li.onclick=function(event){
      mediascape.AdaptationToolkit.uiComponents.toggleFullScreen();
      document.querySelector('#devNum').setAttribute('src',mediascape.AdaptationToolkit.uiComponents.ctrlPanel.selfDev);
      document.querySelector('#tabDevId').setAttribute('src',mediascape.AdaptationToolkit.uiComponents.ctrlPanel.selfDev);
    }
    return li;
  }
}

var closeAppItem=function(){
  this.render=function(){
    var li=document.createElement('li');
    //li.className='options';
    var a=document.createElement('a');
    //a.href='#';


    var span=document.createElement('span');

    var i=document.createElement('i');
    i.className="zmdi zmdi-close-circle";
    span.appendChild(i);

    var strong=document.createElement('strong');
    strong.innerHTML='CloseApp';
    strong.id='strongcloseapp';
    span.appendChild(strong);
    a.appendChild(span);
    li.appendChild(a);
     li.onfocus=function(event){
      a.style.backgroundColor='orange';
    }
    li.onblur=function(){
      a.style.backgroundColor='';
    }
    li.id='cappli';


       li.tabIndex=1;
       li.setAttribute('style','nav-down:#langeu;nav-up:#graphics;');


    li.onclick=function(event){

        var app = document['appmgr'].getOwnerApplication(document);
        app.destroyApplication();



    }
    return li;
  }
}



var logoItem=function(){

  this.render=function(){
    var li=document.createElement('li');
    li.className="vicomtechlogo-li";

    var img1=document.createElement('img');
    img1.src="../resources/configPanel/img/logo-etb-menu.png";

    var img2=document.createElement('img');
    img2.className='vicomtechlogo';
    img2.src='../resources/configPanel/img/LogoVicomtech.png';

    li.appendChild(img1);
    li.appendChild(img2);

    return li;
  }
}


var section=function(){

  this.items=[];
  this.name='';

  this.setName=function(name){
    this.name=name;
  }

  this.addItem = function(item){
    this.items.push(item);
  }

  this.render=function(d){

    var div=document.createElement('div');
    if(this.name==='AddDevice'){
      div.className="col-md-10 col-md-offset-2 template-content section-add-device";
    }
    else{
      div.className="col-md-10 col-md-offset-2 template-content";
    }
    var _this=this;
    this.items.forEach(function(it){
      if(_this.name.indexOf('cameras')>-1 || _this.name.indexOf('radio')){
        div.appendChild(it.render(d));
      }else{
        div.appendChild(it.render());
      }

    });
    div.style.display='none';
    return div;
  }

}
var device=function(){
  this.icon='';



  this.setIcon=function(icon){
    this.icon=icon;
  }
  this.setID=function(id){
    this.id=id;
  }
  this.render=function(){
    var div=document.createElement('div');
    div.addEventListener('click',this.onclick.bind(this));
    var a=document.createElement('a');
    //a.href='';
    a.tabIndex=1;

    a.onfocus=function(){
        div.style.border='solid 5px orange';
      }
      a.onblur=function(){
        div.style.border='';
      }
      a.addEventListener('click',this.onclick.bind(this));
    var img1=document.createElement('img');
    img1.src='../resources/configPanel/img/devices/'+this.icon;

    a.appendChild(img1);




    div.appendChild(a);


    return div;
  }
  this.onclick=function(event){
    mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSection(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeSection,this.id);
  }
}
var deviceBox=function(){
  this.devices=[];

  this.addDevice=function(dev){
    this.devices.push(dev);
  }
  this.removeDevice=function(devid){
    for(var i=0;i<this.devices.length;i++){
      if(this.devices[i].id===devid){
        this.devices.splice(i,1);
      }
    }
  }
  this.render=function(){
    var extDiv=document.createElement('div');
    extDiv.className='all-boxdevices';
    var scope=this;
    this.devices.forEach(function(it,i){
      var div=document.createElement('div');
      div.id=it.id;


      div.className="col-md-"+(12/scope.devices.length)+" col-xs-"+(12/scope.devices.length)+" boxdevice";

      div.appendChild(it.render());
      extDiv.appendChild(div);
    });

    return extDiv;
  }

}

var layout=function(){
  this.image='';
  this.name='';

  this.setImage=function(image){
    this.image=image;
  }

  this.setName=function(name){
    this.name=name;
  }


  this.render=function(actLay){
    var div=document.createElement('div');
    div.className="col-md-6 boxlayout";

    var a=document.createElement('a');
    //a.href='#';
    a.id=this.name+'Layout';


    if(this.name==='carousel'){
        var divctrl=document.createElement('div');
        divctrl.id='ctrlDiv';
        divctrl.style.position='absolute';
        divctrl.style.bottom='10px';
        divctrl.style.width='20%';
        divctrl.style.left='40%';
        var prev=document.createElement('img');
        prev.src='../resources/images/Previous-256.png';
        prev.style.width='30px';
        prev.style.height='30px';
        prev.id='previous';

        var next=document.createElement('img');
        next.src='../resources/images/Next-256.png';
        next.style.width='30px';
        next.style.height='30px';
        next.style.marginLeft='10px';

        next.id='next';
        divctrl.appendChild(prev);
        divctrl.appendChild(next);
        a.appendChild(divctrl);


        divctrl.style.display='none';
        prev.addEventListener('click',this.prevClick.bind(this));
        next.addEventListener('click',this.nextClick.bind(this));
    }
    if(this.name===actLay){//jarri aktibatua dagoena
      a.className='active';
      if(actLay==='carousel'){
       divctrl.style.display='block';
      }
    }


    var img=document.createElement('img');
    img.src=this.image;
    div.tabIndex=0;
    div.onfocus=function(){
      div.style.border='solid 5px orange';
    }
    var _this=this;
    div.onblur=function(){
      div.style.border='';
    }

    div.addEventListener('click',this.onclick.bind(this));
    a.appendChild(img);
    div.appendChild(a);
    return div;
  }
  this.onclick=function(event){
    if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
      mediascape.AdaptationToolkit.uiComponents.loadingNotification();
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
      var _this=this;
      setTimeout(function(){
        var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
        mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.changeAgentlayout(agentToChange,_this.name);
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeLayout(agentToChange,_this.name);
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
      },500);
    }
  }
  this.prevClick=function(event){
    event.preventDefault();
    var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
    mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setLayoutParameter(agentToChange,{'type':'prev','time':event.timeStamp});
  }
  this.nextClick=function(event){
    event.preventDefault();
    var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
    mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setLayoutParameter(agentToChange,{'type':'next','time':event.timeStamp});
  }

}


var layoutSection=function(){
  this.layouts=[];
  this.activeLayout='';

  this.addLayout=function(lay){
    this.layouts.push(lay);
  }
  this.setActiveLayout=function(actLay){
    this.activeLayout=actLay;
  }

  this.render=function(){
    var div=document.createElement('div');
    div.className='template-content-center';
    div.id='layoutCont';
    var layoutCol=document.createElement('div');
    layoutCol.className="col-md-12 layout-columns";
    var scope=this;
    this.layouts.forEach(function(it){

      layoutCol.appendChild(it.render(scope.activeLayout));
    });

    div.appendChild(layoutCol);

    return div;
  }
}

var qrSection=function(url){
  this.render=function(){

    var extDiv=document.createElement('div');
    extDiv.className='template-content-center add-device-content';
    var width=window.innerWidth ||document.documentElement.clientWidth ||document.body.clientWidth;
    //extDiv.style.width=width;
    if(document.querySelector('#qr-code-content')){
      document.querySelector('.add-device-content').removeChild(document.querySelector('#qr-code-content'));
    }
    var qrdiv=document.createElement('div');
    qrdiv.className='qr-code-content';
    qrdiv.id='qr-code-content';

    if(width<767)leftMargin=35*width/100;
        else leftMargin=25*width/100;
        //mediascape.association.createQRcode(url,qrdiv,(30*width/100),(30*width/100),'',leftMargin,50);

    var animationdiv=document.createElement('div');
    animationdiv.id='animated-example';
    animationdiv.className='animated bounceInUp qr-code-toy';

    var animationimg=document.createElement('img');
    animationimg.src='../resources/configPanel/img/QR-manos_grande.png';

    animationdiv.appendChild(animationimg);
    var p=document.createElement('p');
    p.id='qrexplanation';
    p.innerHTML='Escanea el codigo QR o introduce la url para añadir otro dispositivo';

    extDiv.appendChild(p);
    extDiv.appendChild(qrdiv);
    extDiv.appendChild(animationdiv);
    if(mediascape.deviceType.toLowerCase()==='mobile'){
      mediascape.association.doAssociation('qr','qr-code-content', url, true,(50*width/100),(50*width/100),(30*width/100),0);
    }
    else{
      mediascape.association.doAssociation('qr','qr-code-content', url, true,(30*width/100),(30*width/100),leftMargin,0);
    }

    return extDiv;
  }
}
var camera=function(){

  this.setImage=function(image){
    this.image=image;
  }
  this.setID=function(camID){
    this.id=camID;
  }
  this.setName=function(name){
    this.name=name;
  }
  this.setViewStatus=function(stat){
    this.viewStatus=stat;
  }
  this.setSoundStatus=function(stat){
    this.soundStatus=stat;
  }

  this.render=function(){
    var div1=document.createElement('div');
    div1.className='col-md-12 camara';

    var div2=document.createElement('div');
    div2.className='col-md-6 col-sm-6 camara-logo-partidos';

    var img1=document.createElement('img');
    img1.src=this.image;

    div2.appendChild(img1);

    var div3=document.createElement('div');
    div3.className='col-md-6 col-sm-6 camara-all-switch';

    var div4=document.createElement('div');
    div4.className='col-md-12';

    var div5=document.createElement('div');
    div5.className='col-md-3 col-sm-3 iconos-camara';
    var i1=document.createElement('i');
    i1.className='zmdi zmdi-videocam zmdi-hc-2x';

    div5.appendChild(i1);


    var s2=document.createElement('paper-switch');
    s2.id='viewCheck'+this.id;
    s2.className='col-md-8 col-sm-8 check-switch-camara';
    s2.setAttribute('val',this.viewStatus);
    s2.addEventListener('click',this.viewclick.bind(this),true);
    s2.tabIndex=0;
    s2.onfocus=function(){
      s2.querySelector('#apagado').style.border='solid 5px orange';
    }
    s2.onblur=function(){
      s2.querySelector('#apagado').style.border='';
    }
    div4.appendChild(div5);
    div4.appendChild(s2);

    var div7=document.createElement('div');
    div7.className='col-md-12 divVol';

    var div8=document.createElement('div');
    div8.className='col-md-3 col-sm-3 iconos-camara';
    var i2=document.createElement('i');
    i2.className='zmdi zmdi-volume-up zmdi-hc-2x';

    div8.appendChild(i2);



    var s1=document.createElement('paper-switch');
    s1.id='soundCheck'+this.id;
    s1.className='col-md-8 col-sm-8 check-switch-vol';
    s1.setAttribute('val',this.soundStatus);
    s1.addEventListener('click',this.soundclick.bind(this),true);


    s1.tabIndex=0;
    s1.onfocus=function(){

      s1.querySelector('#apagado').style.border='solid 5px orange';
    }
    s1.onblur=function(){
      s1.querySelector('#apagado').style.border='';
    }

    div7.appendChild(div8);
    div7.appendChild(s1);
    div3.appendChild(div4);
    div3.appendChild(div7);

    div1.appendChild(div2);
    div1.appendChild(div3);
    return div1;
  }
  this.viewclick=function(event){
    if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
      mediascape.AdaptationToolkit.uiComponents.loadingNotification();

      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
      event.preventDefault();
      var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
      var agents=agCtx.agents;
      var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
      var val=agentToChange;


      function filterById(el){
        if(el.id===val)return el;
      }

      var a=agents.filter(filterById);
      var scope=this;
      var b=a[0].capabilities.componentsStatus.filter(function(el,i){
        if(el.compId===scope.id)return el;
      });
      var camToCheck='';

      if(scope.name==='video2'){
        camToCheck=mediascape.cameras.pnv;
      }
      else if(scope.name==='video3'){
        camToCheck=mediascape.cameras.pse;
      }
      else if(scope.name==='video4'){
        camToCheck=mediascape.cameras.podemos;
      }
      else if(scope.name==='video5'){
        camToCheck=mediascape.cameras.bildu;
      }
      else if(scope.name==='video6'){
        camToCheck=mediascape.cameras.pp;
      }

      console.log('viewClick');
      setTimeout(function(){
        if(b[0].show===true){
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'hide');
          mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeViewSwVal(agentToChange,scope.id,false);
          setTimeout(function(){
            if(b[0].customCmd.lastIndexOf('mutePlayer')===-1 && b[0].customCmd.lastIndexOf('soundPlayer')===-1){
            if(document.querySelector('#'+scope.name).ismuted==='false' ){
              mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'offSound');
              mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSoundSwVal(agentToChange,scope.id,false);
            }
          }
          else if(b[0].customCmd.lastIndexOf('mutePlayer') <b[0].customCmd.lastIndexOf('soundPlayer')){
              mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'offSound');
              mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSoundSwVal(agentToChange,scope.id,false);
          }
          },1000);




        }
        else{
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'show');
          mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeViewSwVal(agentToChange,this.id,true);

          setTimeout(function(){
            if(camToCheck==='on'){
              if(b[0].customCmd.lastIndexOf('offSound')===-1 && b[0].customCmd.lastIndexOf('mutePlayer')===-1 &&
                b[0].customCmd.lastIndexOf('soundPlayer')===-1){
                if(document.querySelector('#'+scope.name).ismuted==='false' || document.querySelector('#'+scope.name).ismuted===false){
                  mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'soundPlayer');
                  mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSoundSwVal(agentToChange,scope.id,true);
                }


              }
              else if(b[0].customCmd.lastIndexOf('offSound')>b[0].customCmd.lastIndexOf('mutePlayer')){
                mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'onSound');
                mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSoundSwVal(agentToChange,scope.id,true);
              }
              else if(b[0].customCmd.lastIndexOf('offSound')!==-1 && b[0].customCmd.lastIndexOf('mutePlayer')===-1 &&
                document.querySelector('#'+scope.name).ismuted!=='false' && document.querySelector('#'+scope.name).ismuted!==false){
                mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'onSound');
                mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSoundSwVal(agentToChange,scope.id,true);
              }
              else if(b[0].customCmd.lastIndexOf('offSound')===-1 && b[0].customCmd.lastIndexOf('mutePlayer')===-1 &&
                b[0].customCmd.lastIndexOf('soundPlayer')!==-1){
                mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'onSound');
                  mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSoundSwVal(agentToChange,scope.id,true);
              }
              else if(b[0].customCmd.lastIndexOf('offSound')===-1 && b[0].customCmd.lastIndexOf('mutePlayer')<
                b[0].customCmd.lastIndexOf('soundPlayer')){
                mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'onSound');
                  mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSoundSwVal(agentToChange,scope.id,true);
              }
            }
          },1000);




        }
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
    },500);
    }
  }
  this.soundclick=function(event){
    if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
      mediascape.AdaptationToolkit.uiComponents.loadingNotification();
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
      event.preventDefault();
      var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
      var agents=agCtx.agents;
      var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
      var val=agentToChange;
      function filterById(el){
        if(el.id===val)return el;
      }

      var a=agents.filter(filterById);
      var scope=this;
      var b=a[0].capabilities.componentsStatus.filter(function(el,i){
        if(el.compId===scope.id)return el;
      });

      console.log('soundClick');
      setTimeout(function(){
        if(b[0].show===true){
        if(b[0].customCmd.lastIndexOf('mutePlayer')===-1 && b[0].customCmd.lastIndexOf('soundPlayer')===-1){
            if(document.querySelector('#'+scope.name).ismuted==='false' ){

                mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'mutePlayer');
                mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSoundSwVal(agentToChange,scope.id,false);


            }
            else{

              mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'soundPlayer');
              mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSoundSwVal(agentToChange,scope.id,true);

            }

        }
        else{
          if(b[0].customCmd.lastIndexOf('mutePlayer') <b[0].customCmd.lastIndexOf('soundPlayer')){

            mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'mutePlayer');
            mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSoundSwVal(agentToChange,scope.id,false);

          }
          else{

            mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'soundPlayer');
            mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSoundSwVal(agentToChange,scope.id,true);

          }
        }
      }
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
    },500);
  }
}
}
var camerasSection=function(){
  this.cameras=[];

  this.addCamera=function(cam){
    this.cameras.push(cam);
  }
  this.render=function(d){

    var extDiv=document.createElement('div');
    extDiv.className='template-content-center ';
    if(d==='tv'){

      var imgAviso=document.createElement('img');
      imgAviso.id='imgAvisoCam';
      imgAviso.src='../resources/configPanel/img/camara/camconfigeu.png';
      imgAviso.style.position='absolute';
      imgAviso.style.zIndex='9999999999999';
      imgAviso.style.width='50%';
      imgAviso.style.marginLeft='25%';
      imgAviso.style.marginRight='25%';
      imgAviso.style.marginTop='15%';
      extDiv.appendChild(imgAviso);
    }
    extDiv.id='camerasCont';
    var div1=document.createElement('div');
    div1.className='col-md-12 layout-columns';
    if(d==='tv'){
      div1.setAttribute('style','pointer-events:none;opacity:0.4;');
    }
    var div2=document.createElement('div');
    div2.className='col-md-6';

    var div3=document.createElement('div');
    div3.className='contenido-camaras content-camara';



    for(var i=0;i<Math.round(this.cameras.length/2);i++){

      div3.appendChild(this.cameras[i].render());
    }

    div2.appendChild(div3);

    var div4=document.createElement('div');
    div4.className='col-md-6';

    var div5=document.createElement('div');
    div5.className='contenido-camaras content-camara';

    for(var i=Math.round(this.cameras.length/2);i<this.cameras.length;i++){

      div5.appendChild(this.cameras[i].render());
    }

    div4.appendChild(div5);

    div1.appendChild(div2);
    div1.appendChild(div4);
    extDiv.appendChild(div1);

    return extDiv;
  }
  this.setCamsViewStatus=function(agentID){

    var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
    var agents=agCtx.agents;
    var agentToChange=agentID;

    var a=agents.filter(function(el){
      if(el.id===agentToChange)return el;
    });
    var scope=this;

    for(var i=0;i<this.cameras.length;i++){

      var cam=this.cameras[i].id;
      b=a[0].capabilities.componentsStatus.filter(function(el){
        if(el.compId===cam)return el;
      });


      if(b[0].show===true){
        this.cameras[i].setViewStatus(true);
      }
      else{
        this.cameras[i].setViewStatus(false);
      }

    }


  }
  this.setCamsSoundStatus=function(agentID){
    console.log('DENTRO');
    var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
    var agents=agCtx.agents;
    var agentToChange=agentID;

    var a=agents.filter(function(el){
      if(el.id===agentToChange)return el;
    });
    var scope=this;

    for(var i=0;i<this.cameras.length;i++){

      var cam=this.cameras[i].id;
      b=a[0].capabilities.componentsStatus.filter(function(el){
        if(el.compId===cam)return el;
      });


      if(b[0].customCmd.lastIndexOf('mutePlayer')===-1 && b[0].customCmd.lastIndexOf('soundPlayer')===-1
        && b[0].customCmd.lastIndexOf('offSound')===-1 && b[0].customCmd.lastIndexOf('onSound')===-1){

        if(document.querySelector('#'+this.cameras[i].name).ismuted==='false' && b[0].show===true){
          this.cameras[i].setSoundStatus(true);

        }

        else{
          this.cameras[i].setSoundStatus(false);

        }


      }
      else {

        if(b[0].customCmd.lastIndexOf('offSound')===-1 && b[0].customCmd.lastIndexOf('onSound')===-1){

          if((b[0].customCmd.lastIndexOf('mutePlayer') <b[0].customCmd.lastIndexOf('soundPlayer') ) &&
            (b[0].customCmd.lastIndexOf('mutePlayer')!==-1) && (b[0].customCmd.lastIndexOf('soundPlayer')!==-1)
            && b[0].show===true){

            this.cameras[i].setSoundStatus(true);
          }
          else if((b[0].customCmd.lastIndexOf('mutePlayer') <b[0].customCmd.lastIndexOf('soundPlayer') ) &&
            (b[0].customCmd.lastIndexOf('mutePlayer')!==-1) && (b[0].customCmd.lastIndexOf('soundPlayer')!==-1)
            && b[0].show===false){

            this.cameras[i].setSoundStatus(false);
          }
          else if((b[0].customCmd.lastIndexOf('mutePlayer')===-1)
            && (b[0].customCmd.lastIndexOf('soundPlayer')!==-1 && b[0].show===true)){
            this.cameras[i].setSoundStatus(true);
          }
          else if((b[0].customCmd.lastIndexOf('mutePlayer')===-1)
            && (b[0].customCmd.lastIndexOf('soundPlayer')!==-1 && b[0].show===false)){
            this.cameras[i].setSoundStatus(false);

          }
          else if((b[0].customCmd.lastIndexOf('mutePlayer')!==-1)
            && (b[0].customCmd.lastIndexOf('soundPlayer')===-1)){
            this.cameras[i].setSoundStatus(false);
          }

          else{
            if(b[0].show===true){
              this.cameras[i].setSoundStatus(true);
            }
          }
        }
        else{


          if(b[0].customCmd.lastIndexOf('offSound')>b[0].customCmd.lastIndexOf('mutePlayer')){
            this.cameras[i].setSoundStatus(false);
          }
          else if(b[0].customCmd.lastIndexOf('offSound')!==-1 && b[0].customCmd.lastIndexOf('mutePlayer')===-1 &&
            document.querySelector('#'+scope.name).ismuted!=='false'){
            this.cameras[i].setSoundStatus(false);
          }



        }
      }




    }

  }
}

var hashtag=function(){

  this.setID=function(hId){
    this.id=hId;
  }
  this.setViewStatus=function(stat){
    this.viewStatus=stat;
  }
  this.setHTStatus=function(stat){
    this.HTStatus=stat;
  }
  this.render=function(){
    var hashtagDiv=document.createElement('div');
    hashtagDiv.className='col-md-10 twitter-hashtag';

    var div1=document.createElement('div');
    div1.className='col-md-3 col-xs-3 seleccionImg';
    var img=document.createElement('img');
    img.src='../resources/configPanel/img/twitter_consombra.png';
    div1.appendChild(img);

    var div2=document.createElement('div');
    div2.className='col-md-6 col-xs-9 seleccion-hashtag';

    var p1=document.createElement('p');
    p1.className='titulo-seccion';
    p1.innerHTML='Hashtag selection';
    p1.id='titTw';
    var p2=document.createElement('p');
    p2.innerHTML='Select the hashtag to show tweets about it';
    p2.id='subTw';

   /* var select=document.createElement('select');
    select.className='form-control select-hashtag';
    select.addEventListener('change',this.sendHTclick.bind(this),true);
    select.id='htSelect';
    select.tabIndex=1;
    select.onfocus=function(){
      select.style.border='solid 5px orange';
    }
    select.onblur=function(){
      select.style.border='';
    }
    var HT=['','Elecciones',' elecciones',' Hauteskundeak',' hauteskundeak',' eleccion',' #elecciones24m',' #24m',' #L6elecciones','#eleccionesA3',' #eleccion2015',' hauteskundeak',' elecciones',' @hauteskundeak',' #hauteskundeak2015',' #Elecciones2015',' #hauteskundeak15',' #Elecciones15',' #M24Donostia',' #eleccionesVG',' @Navarra2015',' #Navarra24M',' #24M',' #M24Donostia',' #EleccionesNA15',' #Navarra24M',' @PPopular',' @PSOE',' @vox_es',' @UPyD',' @ahorapodemos',' @PartidoPACMA',' @Equo',' @CiudadanosCs',' @webpcpe',' @RecortesCero',' @phumanista_esp',' #UPyD',' #PSOE',' #PP',' #BILDU',' #Podemos',' #HagamosHistoria24M',' #VOX',' #AhoraVOX',' #Ciudadanos',' #UPN',' @PPvasco',' @UPyDEuskadi',' @Cs_Euskadi',' @IrabaziEuskadi',' @PES_PSE',' @EzkerBatua',' @ealkartasuna',' @plaZFeminista',' @PodemosEuskadi_',' @ehbildu',' @IkuneICP',' @eajpnv',' @PacmaEuskadi',' @UdalBerri',' @GastoriaVG',' @hegasum',' @IUEzker',' @upn_navarra',' @libertadnavarra',' @SainNavarra',' @RCN_NOK',' Kike Fernández',' @KikeFdzdePinedo',' @arabaehbildu',' @ehbilduaraba',' Miren Larrion',' @miren_larrion',' @ehbildugasteiz',' @EA_Araba',' Ramiro González',' @ramirogonza',' @eajpnvaraba',' @pnvjuntasaraba',' Gorka Urtaran',' @pnvgasteiz',' @gorka__urtaran',' Cristina González',' @CristinaGnlz',' @psealava',' @PSEporAlava',' Peio López De Munain',' @porvitoria',' @peiomunain_xvg',' Javier De Andrés',' @JavierdAndres',' @PP_Juntas_Alava',' Javier Maroto',' @JavierMaroto',' Koldo Martin',' @KoldoPodemos',' @PodemosVitoria',' Ana Unibaso',' @IkuneICP',' Niko Gutiérrez',' @Nik0Gutierrez',' Ignacio Oñate',' @Ignacionate',' Miguel Angel Carrera',' @MikelK10',' Rodrigo Zamora',' @Rodri_Zamora_Al',' José Damían Garcia-Moreno',' @josedamian1980',' #IrabaziAlaba',' @iu_araba',' @EquoAraba',' Óscar Fernández',' @oskar_fm',' @IrabaziGasteiz',' @EQUO_VG',' @EBgasteiz',' Esaú Martín',' @esaumartin',' @vox_alava',' #AhoraVOX',' Adolfo Gago',' @toohope',' Vanesa Costa',' Nerea Icuza',' @icuza',' Esther Saez de Argandoña',' @unicaire',' @GastoriaVG',' Jorge Hinojal',' @JorgeHiSo',' @shgjorge',' @hegasum',' Diana Plaza',' @RecortesCero',' Xabier Olano',' @Xabier_Olano_',' @ehbildugipuzkoa',' @alternatiba',' @EA_Gipuzkoa',' #gipuzkoarrokgaraile',' Juankar Izagirre',' @AlkateSS',' @HiriBizia',' @SortuDonostia',' @EA_Donostia',' #BILDU',' @ehbildu',' Markel Olano',' @eajpnvgipuzkoa',' @markelolano',' @markelolano2015',' Eneko Goia',' @enekogoia2015',' @DonostiaPNV',' @pnvdonostia',' @eajpnv',' Denis Itxaso',' @DenisItxaso',' @PSEGIPUZKOA',' Ernesto Gasco',' @gasco63',' Juan Carlos Cano',' @PPGipuzkoa',' @CanoAristoy',' Miren Albistur',' @MirenAlbistur',' @PPdonostiarras',' Juantxo Iturria',' @juantxo_iturria',' #BadaGaraia',' #GipuzkoaAldatu',' @podemosDonostia',' Amaia Martín',' @sybillacumas',' @Irabazidonostia',' #Podemos',' #HagamosHistoria24M',' Arantza González',' @arantzagg',' @IRABAZIGipuzkoa',' @Irabazidonostia',' @IUDonostia',' @eQuoGipuzkoa',' Manuel Aguirre',' @Mccguirre',' Arantza Aranzabal',' @aranaranzabal',' #donostiaUPyD',' @votaUPyD',' Jonathan Calvo',' @joncalrue',' Nicolás de Miguel',' @NicodeMig',' Josebe Iturrioz',' @JosebeIturrioz',' #AldaketaGorpuzteko',' @plaZFeminista',' Saioa Escolar',' @Pacma_Gipuzkoa',' @PacmaGipuzkoa',' @PacmaEuskadi',' Josu Unanue',' @unanuejosu',' @ehbildubizkaia',' #bizkaitarrokgaraile',' Aitziber Ibarbarriaga',' @AitziIbaiba',' @ehbildubilbo',' @SortuBilbo',' #BILDU',' @EA_Bizkaia',' Unai Rementeria',' @urementeria',' Juan María Aburto',' @juanmariaburto',' @AzalgorriBilbao',' @eajpnvbilbao @eajpnv',' Carlos Totorica',' @PSEBizkaia',' #CarlosTotorica',' Alfonso Gil',' @AlfonsoGil',' @PSEBilbao',' @GroupPES_Bilbao',' Javier Ruiz',' @JavierRuiz_PP',' @PPBizkaia',' Luis Eguiluz',' @LuisEguiluz_pp',' @PPdeBilbao',' Asun Merino',' @AsunPodemos',' @PodemosBizkaia',' Francisco Samir Lahdou',' @PodemosBilbao',' @PodemosBilbaoE',' Xabier Jiménez',' @Eljoventopo',' #IrabaziBizkaia',' @BilboIrabaziz',' @IUBilbao',' @EquoBizkaia',' Roque Adrada',' @RoqueAdrada',' Javier Gabilondo',' @JavierGabilondo',' Santiago Sáinz',' @Sainz_Robles',' @Ciudadanos',' David Pasarín',' @davidpasarin',' Patricia Gómez',' @vox_vizcaya',' Urko de Azumendi',' @urkobilbao2015',' @vox_bilbao',' Carmen Muñoz',' @CarmenMunozL',' #BilbaoEnComun',' @UdalBerri',' @Equo',' @iunida',' @ALTER_info',' JOSE MANUEL VÁZQUEZ RIOS',' @phumanista_esp',' Kepa Lozano',' @KEPALOZANO',' Goizane Rodríguez',' @JusticiaPAT',' Joseba Arroita',' @IkuneICP',' Sergio Saenz',' @webpcpe',' #24mvotapcpe',' Uxue Barkos',' @uxuebarkos',' Itziar Gomez',' @itziargomez',' @GeroaBaiIrunea',' @geroabai',' #orainbai',' @EAJPNVNafarroa',' Javier Esparza',' @JavierJesparza',' @_navarrisimo',' #Navarrisimo',' #adelantenavarros',' Enrique Maya',' #Navarrisimo',' #UPN',' @upn_navarra',' Ana Beltran',' @abeltran_ana',' @PPNavarra',' Pablo Zalba',' @PabloZalba',' #Pamplona',' #Navarra',' @PPNavarra',' #DespiertaPamplona',' María Chivite',' @mavichina',' @PSNPSOE',' Maite Esporrin',' @maiteesporrin',' @PamplonaPSN',' @psnpsoe',' #VotaPSOE',' #VotaPSNPSOE',' #EsporrinAlcaldesa',' #ActivemosPamplona',' Adolfo Araiz',' @AdolfoAraiz',' @EHbilduNafarroa',' #Nafarrokgaraile',' #nafarrokgaraile',' Joseba Asiron',' @josebaasiron',' @EAnafarroa',' Laura Pérez Ruano',' @laperua',' @Podemosnavarra',' #EsAhora',' #CambiaNavarra',' Diego Paños',' @diegopanos',' #CambiaNavarra',' @Cs_Navarra_',' Iñaki Arana',' #NavarraPideCambio',' Miguel Zarranz',' @miguelzarranz',' @UPyD_Navarra',' Damaso Crespo',' @upyd_navarra',' #LIBRES',' Jose Miguel Nuin',' @josemiguelnuin',' @IzdaNavarra @EzkerraN',' Mikel Iriarte',' @libertadnavarra',' David Marzo',' @davidMarzo',' @EquoNavarfarroa',' #LaAlternativaVerde',' #AukeraVerdea',' @EquoNavarra',' Maria Yazmina Larumbe',' @PacmaNavarra',' Daniel Fernández',' #SuVozTuVoto',' Luis Miguel Latasa',' @SainNavarra',' @PartidoSAIn',' Samuel Valderrey',' @SamuelValderrey',' #VOTASAIn',' Ramon Morcillo',' @RCN_NOK',' #marihuana',' Edurne Eguino',' @SoyEdurneNaiz',' @EdurneEguino',' @IUPamplona'];
    for(var i=0;i<HT.length;i++){
      var opt1=document.createElement('option');
      opt1.innerHTML=HT[i];
      opt1.value=HT[i];
      //opt1.addEventListener('click',this.sendHTclick.bind(this),true);
      select.appendChild(opt1);
    }
    select.value=this.HTStatus;*/

    div2.appendChild(p1);
    div2.appendChild(p2);
   // div2.appendChild(select);




    var s2=document.createElement('paper-switch');
    s2.id='viewCheck'+this.id;
    s2.className='col-md-3 check-switch-twitter';
    s2.setAttribute('val',this.viewStatus);
    s2.addEventListener('click',this.viewClick.bind(this),true);
    s2.tabIndex=1;
    s2.onfocus=function(){
      s2.querySelector('#apagado').style.border='solid 5px orange';
    }
    s2.onblur=function(){
      s2.querySelector('#apagado').style.border='';
    }
    hashtagDiv.appendChild(div1);
    hashtagDiv.appendChild(div2);
    hashtagDiv.appendChild(s2);
    return hashtagDiv;
  }
  /*this.sendHTclick=function(event){

    var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
    mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,event.target.value);
    mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeHashtag(agentToChange,event.target.value);
  }*/
  this.viewClick=function(event){

    if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
      mediascape.AdaptationToolkit.uiComponents.loadingNotification();
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
      event.preventDefault();
      var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
      var agents=agCtx.agents;
      var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
      var val=agentToChange;
      function filterById(el){
        if(el.id===val)return el;
      }

      var a=agents.filter(filterById);
      var scope=this;
      var b=a[0].capabilities.componentsStatus.filter(function(el,i){
        if(el.compId===scope.id)return el;
      });
      setTimeout(function(){


        console.log('viewClick');
        if(b[0].show===true){
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'hide');
          mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeViewSwVal(agentToChange,scope.id,false);
        }
        else{
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'show');
          mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeViewSwVal(agentToChange,scope.id,true);
        }
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
      },500);


    }
  }
}
var trendingMap=function(){
  this.setID=function(mapId){
    this.id=mapId;
  }
  this.setViewStatus=function(stat){
    this.viewStatus=stat;
  }
  this.render=function(){

    var trending=document.createElement('div');
    trending.className='col-md-10 twitter-topic';

    var div4=document.createElement('div');
    div4.className='col-md-3 col-xs-3 seleccionImg';
    var img2=document.createElement('img');
    img2.src='../resources/configPanel/img/twitter_consombra.png';
    div4.appendChild(img2);

    var div5=document.createElement('div');
    div5.className='col-md-6 col-xs-9 seleccion-hashtag';
    var p3=document.createElement('p');
    p3.className='titulo-seccion';
    p3.innerHTML='Map and trending topic';

    var p4=document.createElement('p');
    p4.innerHTML='Here you can activate a map showing the trending party of each region';

    div5.appendChild(p3);
    div5.appendChild(p4);


    var s2=document.createElement('paper-switch');
    s2.id='viewCheck'+this.id;
    s2.className='col-md-3 check-switch-twitter';
    s2.setAttribute('val',this.viewStatus);
    s2.addEventListener('click',this.viewClick.bind(this),true);

    trending.appendChild(div4);
    trending.appendChild(div5);
    trending.appendChild(s2);

    return trending;
  }
  this.viewClick=function(event){
    if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
      mediascape.AdaptationToolkit.uiComponents.loadingNotification();
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
      event.preventDefault();
      var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
      var agents=agCtx.agents;
      var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
      var val=agentToChange;
      function filterById(el){
        if(el.id===val)return el;
      }

      var a=agents.filter(filterById);
      var scope=this;
      var b=a[0].capabilities.componentsStatus.filter(function(el,i){
        if(el.compId===scope.id)return el;
      });

      console.log('viewClick');
      if(b[0].show===true){
        mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,'hide');
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeViewSwVal(agentToChange,this.id,false);
      }
      else{
        mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,'show');
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeViewSwVal(agentToChange,this.id,true);
      }
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
    }
  }
}

var twitterSection=function(){

  this.viewerComp=[];
  this.mapComp=[];
  this.addViewerComp=function(c){
    this.viewerComp.push(c);
  }
  this.addMapComp=function(c){
    this.mapComp.push(c);
  }
  this.render=function(){

    var extDiv=document.createElement('div');
    extDiv.className='template-content-center';
    extDiv.id='twCont';

    var tselector=document.createElement('div');
    tselector.className='col-md-12 layout-columns twitter-selector-container';
    //abstraer cada componente por separado? hashtag y trending map


    tselector.appendChild(this.viewerComp[0].render());



    //tselector.appendChild(this.mapComp[0].render());

    extDiv.appendChild(tselector);
    return extDiv;
  }
  this.setViewerViewStatus=function(agentID){

    var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
    var agents=agCtx.agents;
    var agentToChange=agentID;

    var a=agents.filter(function(el){
      if(el.id===agentToChange)return el;
    });
    var scope=this;


    var v=this.viewerComp[0].id;
    b=a[0].capabilities.componentsStatus.filter(function(el){
      if(el.compId===v)return el;
    });


    if(b[0].show===true){
      this.viewerComp[0].setViewStatus(true);
    }
    else{
      this.viewerComp[0].setViewStatus(false);
    }

  }
  this.setViewerHTStatus=function(agentID){

    var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
    var agents=agCtx.agents;
    var agentToChange=agentID;
    var AllHT=['','#FelizMiercoles', '#DiadelosMuseos','#ALaCalle28M','#RiveraenCOPE','#QueensSpeech'];
    var a=agents.filter(function(el){
      if(el.id===agentToChange)return el;
    });
    var scope=this;


    var v=this.viewerComp[0].id;
    b=a[0].capabilities.componentsStatus.filter(function(el){
      if(el.compId===v)return el;
    });


    if(b[0].customCmd.length===0){
      this.viewerComp[0].setHTStatus('');
    }
    else{
      var last=-1;
      for(var i=0;i<AllHT.length;i++){
        if(b[0].customCmd.lastIndexOf(AllHT[i])>last){
          last=b[0].customCmd.lastIndexOf(AllHT[i]);
        }
      }
      if(last!==-1){
        this.viewerComp[0].setHTStatus(b[0].customCmd[last]);
      }
      else{
        this.viewerComp[0].setHTStatus('');
      }

    }

  }
  this.setMapViewStatus=function(agentID){

    var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
    var agents=agCtx.agents;
    var agentToChange=agentID;

    var a=agents.filter(function(el){
      if(el.id===agentToChange)return el;
    });
    var scope=this;


    var m=this.mapComp[0].id;
    b=a[0].capabilities.componentsStatus.filter(function(el){
      if(el.compId===m)return el;
    });


    if(b[0].show===true){
      this.mapComp[0].setViewStatus(true);
    }
    else{
      this.mapComp[0].setViewStatus(false);
    }

  }
}

/*var radios=function(){
  this.setID=function(radId){
    this.id=radId;
  }
  this.setName=function(n){
    this.name=n;
  }
  this.setViewStatus=function(stat){
    this.viewStatus=stat;
  }
  this.render=function(){

    var div2=document.createElement('div');
    div2.className='col-md-12 layout-columns';

    var div3=document.createElement('div');
    div3.className='col-md-6 clm_2 izda';

    var div4=document.createElement('div');
    div4.className='contenido-radio';

    var div5=document.createElement('div');
    div5.className='radio_row1';

    var div6=document.createElement('div');
    div6.className='w-row';

    var div7=document.createElement('div');
    div7.className='col-xs-4 col-sm-6 col-md-4';

    var img=document.createElement('img');
    img.className="radio_btn_pausa";
    img.id='radioViewBut'+this.id;
    img.width='150';
    if(this.viewStatus===true){
      img.setAttribute('src','../resources/configPanel/img/radio/Radio_btn_pausa.png');
    }
    else{
      img.setAttribute('src','../resources/configPanel/img/radio/Radio_btn_play.png');
    }
    div7.addEventListener('click',this.viewClick.bind(this));
     div7.tabIndex=1;
      div7.onfocus=function(){
        img.style.border='solid 5px orange';
      }
      div7.onblur=function(){
        img.style.border='';
      }
    div7.appendChild(img);

    var div8=document.createElement('div');
    div8.className='col-xs-8 col-sm-6 col-md-8';

    var div9=document.createElement('div');
    div9.className='radio_nombre_emisora';

    var strong=document.createElement('strong');
    strong.className='radio_nombre_emisora_txt';
    if(this.name==='radio1'){
      strong.innerHTML='Radio Euskadi';
    }
    else if(this.name==='radio2'){
      strong.innerHTML='Euskadi Irratia';
    }
    div9.appendChild(strong);

    var div10=document.createElement('div');
    div10.className='radio_ecualizador_centrar';

    var img1=document.createElement('img');
    img1.className='radio_ecualizador_img';
    img1.id='radioEq'+this.id;
    if(this.viewStatus===true){
      img1.setAttribute('src','../resources/configPanel/img/radio/animacion-ecualizador_transp.gif');
    }
    else{
      img1.setAttribute('src','../resources/configPanel/img/radio/Radio-animacion-off-estatico.png');
    }
    div10.appendChild(img1);

    div8.appendChild(div9);
    div8.appendChild(div10);

    div6.appendChild(div7);
    div6.appendChild(div8);


    var div11=document.createElement('div');
    div11.className='separador_horizontal';

    var div12=document.createElement('div');
    div12.className='radio_logo_emisora';
    var div13=document.createElement('div');
    div13.className='radio_logo_centrar';

    var img3=document.createElement('img');
    if(this.name==='radio1'){
      img3.src='../resources/configPanel/img/radio/RadioEuskadi.png';
    }
    else if(this.name==='radio2'){
      img3.src='../resources/configPanel/img/radio/Euskadiirratia.png';
    }
    div13.appendChild(img3);
    div12.appendChild(div13);

    div5.appendChild(div6);
    div5.appendChild(div11);
    div5.appendChild(div12);
    div4.appendChild(div5);
    div3.appendChild(div4);



    var div14=document.createElement('div');
    div14.className='col-md-6 clm_2';




    var div15=document.createElement('div');
    div15.className='contenido-radio';

    return div4;
  }
  this.viewClick=function(event){
    if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
      mediascape.AdaptationToolkit.uiComponents.loadingNotification();
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
      event.preventDefault();
      var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
      var agents=agCtx.agents;
      var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
      var val=agentToChange;
      function filterById(el){
        if(el.id===val)return el;
      }

      var a=agents.filter(filterById);
      var scope=this;
      var b=a[0].capabilities.componentsStatus.filter(function(el,i){
        if(el.compId===scope.id)return el;
      });

      console.log('viewClick');
      setTimeout(function(){

        if(b[0].show===true){
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'hide');
          mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeRadioViewImgVal(agentToChange,scope.id,false);
        }
        else{
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'show');
          mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeRadioViewImgVal(agentToChange,scope.id,true);

        }
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
      },500);
    }
  }
}
var radioSection=function(){
  this.radioComponent=[];

  this.addComponent=function(c){
    this.radioComponent.push(c);
  }
  this.render=function(d){
    var div1=document.createElement('div');
    div1.className='template-content-center';
    div1.id='radioCont';
    if(d==='tv'){

      var imgAviso=document.createElement('img');
      imgAviso.id='imgAvisoRadio';
      imgAviso.src='../resources/configPanel/img/radio/radconfeu.png';
      imgAviso.style.position='absolute';
      imgAviso.style.zIndex='9999999999999';
      imgAviso.style.width='50%';
      imgAviso.style.marginLeft='25%';
      imgAviso.style.marginRight='25%';
      imgAviso.style.marginTop='15%';
      div1.appendChild(imgAviso);
    }
    var div2=document.createElement('div');
    div2.className='col-md-12 layout-columns';
    if(d==='tv'){
      div2.setAttribute('style','pointer-events:none;opacity:0.4;');
    }
    var div3=document.createElement('div');
    div3.className='col-md-6 clm_2 izda';

    div3.appendChild(this.radioComponent[0].render());

    var div4=document.createElement('div');
    div4.className='col-md-6 clm_2 izda';

    div4.appendChild(this.radioComponent[1].render());

    div2.appendChild(div3);
    div2.appendChild(div4);
    div1.appendChild(div2);

    return div1;

  }
  this.setRadioViewStatus=function(agentID){


    var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
    var agents=agCtx.agents;
    var agentToChange=agentID;

    var a=agents.filter(function(el){
      if(el.id===agentToChange)return el;
    });
    var scope=this;

    for(var i=0;i<this.radioComponent.length;i++){
      var rad=this.radioComponent[i].id;
      b=a[0].capabilities.componentsStatus.filter(function(el){
        if(el.compId===rad)return el;
      });


      if(b[0].show===true){
        this.radioComponent[i].setViewStatus(true);
      }
      else{
        this.radioComponent[i].setViewStatus(false);
      }
    }
  }

}*/
var table=function(){

  this.setID=function(tabId){
    this.id=tabId;
  }
  this.setName=function(n){
    this.name=n;
  }
  this.setViewStatus=function(stat){
    this.viewStatus=stat;
  }
  this.setPlaceStatus=function(stat){
    this.activePlace=stat;
  }
  this.setTipoStatus=function(stat){
    this.tipo=stat;
  }
  /*this.setYearStat=function(stat){
    this.activeYear=stat;
  }*/


  this.render=function(){




    var div10=document.createElement('div');
    div10.className='col-md-12 tabla';

    /*var div6=document.createElement('div');
    div6.className='col-md-9 txt_titular';
    div6.innerHTML='TABLE DATA INFORMATION';*/

    var div32=document.createElement('div');
    div32.className='col-md-8 col-sm-8 col-xs-8 cityName';

    var p5=document.createElement('p');
    p5.className='text_ciudad';
    p5.innerHTML='TABLA DE RESULTADOS';
    p5.id='ptabla'+this.name;
    div32.appendChild(p5);

    var s2=document.createElement('paper-switch');
    s2.id='viewCheck'+this.id;
    s2.className='col-md-4 col-sm-4 check-switch-eitb';
    s2.setAttribute('val',this.viewStatus);
    s2.addEventListener('click',this.viewclick.bind(this),true);
    //s2.style.position='absolute';
    s2.tabIndex=1;
    s2.onfocus=function(){
      s2.querySelector('#apagado').style.border='solid 5px orange';
    }
    s2.onblur=function(){
      s2.querySelector('#apagado').style.border='';
    }

    div10.appendChild(div32);
    div10.appendChild(s2);

    /*var form=document.createElement('form');
    var input1=document.createElement('input');
    input1.type='radio';
    //input1.checked=true;

    input1.value='C';
    input1.name='tipoe';
    input1.id='congInp'+this.id;
    var span1=document.createElement('span');


    var input2=document.createElement('input');
    input2.type='radio';
    //input2.checked=false;
    input2.value='S';
    input2.name='tipoe';
    input2.id='senInp'+this.id;
    var span2=document.createElement('span');


    if(this.tipo==='C'){
      input1.checked=true;
      input2.checked=false;
    }
    else if(this.tipo==='S'){
      input1.checked=false;
      input2.checked=true;
    }
    input1.tabIndex=1;
    input2.tabIndex=1;
    span1.appendChild(input1);
    var span3=document.createElement('span');
    span3.innerHTML='Congreso';
    span3.id='cong'+this.name;
    span1.appendChild(span3);

    span2.appendChild(input2);
    var span4=document.createElement('span');
    span4.innerHTML='Senado';
    span4.id='sen'+this.name;
    span2.appendChild(span4);

    form.appendChild(span1);
    input1.addEventListener('click',this.sendtipo.bind(this));
    input2.addEventListener('click',this.sendtipo.bind(this));

    //form.addEventListener('change',this.sendtipo.bind(this),true);

    var br=document.createElement('br');
    br.className='congreso-senado-br';
    form.appendChild(br);

    form.appendChild(span2);
    form.className='congreso-senado';

    input1.onfocus=function(){

      span1.style.border='5px solid orange';
    }
    input1.onblur=function(){
      span1.style.border='';
    }

    input2.onfocus=function(){

      span2.style.border='5px solid orange';
    }
    input2.onblur=function(){
      span2.style.border='';
    }*/
    var gen={"zonas":[{"Z":1,"N":"Alava-Araba","O":28,"NE":"Araba","NC":"Alava","C":1984},{"Z":2,"N":"Vizcaya","O":28,"NE":"Bizkaia","NC":"Bizkaia","C":1984},{"Z":3,"N":"Guipuzcoa","O":28,"NE":"Gipuzkoa","NC":"Guipúzcoa","C":1984},{"Z":5,"N":"CAV-EAE","O":28,"NE":"EAE","NC":"CAV","C":1984}]};
      //var ar={"zonas":[{"Z":1001,"N":"Alegría-Dulantzi","O":28,"NE":"Dulantzi","NC":"Alegría-Dulantzi","C":1984},{"Z":1002,"N":"Amurrio","O":29,"NE":"Amurrio","NC":"Amurrio","C":8139},{"Z":1049,"N":"Añana","O":63,"NE":"Añana","NC":"Añana","C":140},{"Z":1003,"N":"Aramaio","O":30,"NE":"Aramaio","NC":"Aramaio","C":1186},{"Z":1006,"N":"Armiñón","O":32,"NE":"Armiñon","NC":"Armiñón","C":176},{"Z":1037,"N":"Arraia-Maeztu","O":55,"NE":"Arraia-Maeztu","NC":"Arraia-Maeztu","C":586},{"Z":1008,"N":"Arratzua-Ubarrundia","O":33,"NE":"Arratzua-Ubarrundia","NC":"Arratzua-Ubarrundia","C":790},{"Z":1004,"N":"Artziniega","O":31,"NE":"Artziniega","NC":"Artziniega","C":1405},{"Z":1009,"N":"Asparrena","O":34,"NE":"Asparrena","NC":"Asparrena","C":1281},{"Z":1010,"N":"Ayala/Aiara","O":35,"NE":"Aiara","NC":"Ayala","C":2275},{"Z":1011,"N":"Baños de Ebro/Mañueta","O":36,"NE":"Mañueta","NC":"Baños de Ebro","C":237},{"Z":1013,"N":"Barrundia","O":37,"NE":"Barrundia","NC":"Barrundia","C":711},{"Z":1014,"N":"Berantevilla","O":38,"NE":"Berantevilla","NC":"Berantevilla","C":372},{"Z":1016,"N":"Bernedo","O":39,"NE":"Bernedo","NC":"Bernedo","C":439},{"Z":1017,"N":"Campezo/Kanpezu","O":40,"NE":"Kanpezu","NC":"Campezo","C":869},{"Z":1021,"N":"Elburgo/Burgelu","O":44,"NE":"Burgu","NC":"Elburgo","C":460},{"Z":1022,"N":"Elciego","O":45,"NE":"Eltziego","NC":"Elciego","C":805},{"Z":1023,"N":"Elvillar/Bilar","O":46,"NE":"Bilar","NC":"Elvillar","C":269},{"Z":1901,"N":"Iruña Oka/Iruña de Oca","O":76,"NE":"Iruña Oka","NC":"Iruña de Oca","C":2344},{"Z":1027,"N":"Iruraiz-Gauna","O":47,"NE":"Iruraitz-Gauna","NC":"Iruraitz-Gauna","C":416},{"Z":1019,"N":"Kripan","O":42,"NE":"Kripan","NC":"Kripan","C":144},{"Z":1020,"N":"Kuartango","O":43,"NE":"Kuartango","NC":"Kuartango","C":326},{"Z":1028,"N":"Labastida","O":48,"NE":"Bastida","NC":"Labastida","C":1077},{"Z":1030,"N":"Lagrán","O":49,"NE":"Lagran","NC":"Lagrán","C":159},{"Z":1031,"N":"Laguardia","O":50,"NE":"Guardia","NC":"Laguardia","C":1183},{"Z":1032,"N":"Lanciego/Lantziego","O":51,"NE":"Lantziego","NC":"Lanciego","C":522},{"Z":1902,"N":"Lantarón","O":77,"NE":"Lantaron","NC":"Lantarón","C":738},{"Z":1033,"N":"Lapuebla de Labarca","O":52,"NE":"Lapuebla de Labarca","NC":"Lapuebla de Labarca","C":649},{"Z":1058,"N":"Legutiano","O":71,"NE":"Legutio","NC":"Legutio","C":1327},{"Z":1034,"N":"Leza","O":53,"NE":"Leza","NC":"Leza","C":165},{"Z":1036,"N":"Llodio/Laudio","O":54,"NE":"Laudio","NC":"Llodio","C":15034},{"Z":1039,"N":"Moreda de Alava","O":56,"NE":"Moreda Araba","NC":"Moreda de Alava","C":202},{"Z":1041,"N":"Navaridas","O":57,"NE":"Navaridas","NC":"Navaridas","C":153},{"Z":1042,"N":"Okondo","O":58,"NE":"Okondo","NC":"Okondo","C":901},{"Z":1043,"N":"Oyón/Oion","O":59,"NE":"Oion","NC":"Oyón","C":2318},{"Z":1044,"N":"Peñacerrada-Urizaharra","O":60,"NE":"Urizaharra","NC":"Peñacerrada","C":236},{"Z":1046,"N":"Ribera Alta","O":61,"NE":"Erriberagoitia","NC":"Ribera Alta","C":594},{"Z":1047,"N":"Ribera Baja/Erribera Beitia","O":62,"NE":"Erriberabeitia","NC":"Ribera Baja","C":964},{"Z":1051,"N":"Salvatierra/Agurain","O":64,"NE":"Agurain","NC":"Salvatierra","C":3606},{"Z":1052,"N":"Samaniego","O":65,"NE":"Samaniego","NC":"Samaniego","C":244},{"Z":1053,"N":"San Millán/Donemiliaga","O":66,"NE":"Donemiliaga","NC":"San Millán","C":587},{"Z":1054,"N":"Urkabustaiz","O":67,"NE":"Urkabustaiz","NC":"Urkabustaiz","C":952},{"Z":1055,"N":"Valdegovía/Gaubea","O":68,"NE":"Gaubea","NC":"Valdegovía","C":836},{"Z":1056,"N":"Harana/Valle de Arana","O":69,"NE":"Harana","NC":"Valle de Arana","C":218},{"Z":1057,"N":"Villabuena de Alava/Eskuernaga","O":70,"NE":"Villabuena","NC":"Villabuena de Alava","C":245},{"Z":10,"N":"Gasteiz","O":7,"NE":"Gasteiz","NC":"Vitoria-Gasteiz","C":186354},{"Z":1060,"N":"Yécora/Iekora","O":72,"NE":"Ekora","NC":"Yécora","C":199},{"Z":1061,"N":"Zalduondo","O":73,"NE":"Zalduondo","NC":"Zalduondo","C":153},{"Z":1062,"N":"Zambrana","O":74,"NE":"Zanbrana","NC":"Zambrana","C":314},{"Z":1018,"N":"Zigoitia","O":41,"NE":"Zigoitia","NC":"Zigoitia","C":1370},{"Z":1063,"N":"Zuia","O":75,"NE":"Zuia","NC":"Zuia","C":1799}]};
      //var viz={"zonas":[{"Z":2001,"N":"Abadiño","O":81,"NE":"Abadiño","NC":"Abadiño","C":5832},{"Z":2002,"N":"Abanto y Ciérvana/Abanto Zierbena","O":82,"NE":"Abanto","NC":"Abanto y Ciérvana","C":7851},{"Z":2911,"N":"Ajangiz","O":187,"NE":"Ajangiz","NC":"Ajangiz","C":382},{"Z":2912,"N":"Alonsotegi","O":188,"NE":"Alonsotegi","NC":"Alonsotegi","C":2308},{"Z":2003,"N":"Amorebieta-Etxano","O":83,"NE":"Zornotza","NC":"Amorebieta-Etxano","C":14338},{"Z":2004,"N":"Amoroto","O":84,"NE":"Amoroto","NC":"Amoroto","C":334},{"Z":2005,"N":"Arakaldo","O":85,"NE":"Arakaldo","NC":"Arakaldo","C":117},{"Z":2006,"N":"Arantzazu","O":86,"NE":"Arantzazu","NC":"Arantzazu","C":289},{"Z":2093,"N":"Areatza","O":172,"NE":"Areatza","NC":"Areatza","C":900},{"Z":2009,"N":"Arrankudiaga","O":89,"NE":"Arrankudiaga","NC":"Arrankudiaga","C":786},{"Z":2914,"N":"Arratzu","O":190,"NE":"Arratzu","NC":"Arratzu","C":330},{"Z":2010,"N":"Arrieta","O":90,"NE":"Arrieta","NC":"Arrieta","C":457},{"Z":2011,"N":"Arrigorriaga","O":91,"NE":"Arrigorriaga","NC":"Arrigorriaga","C":9692},{"Z":2023,"N":"Artea","O":102,"NE":"Arteaga","NC":"Artea","C":594},{"Z":2008,"N":"Arcentales","O":88,"NE":"Artzentales","NC":"Artzentales","C":617},{"Z":2091,"N":"Atxondo","O":170,"NE":"Atxondo","NC":"Atxondo","C":1134},{"Z":2070,"N":"Aulesti","O":149,"NE":"Aulesti","NC":"Aulesti","C":545},{"Z":2012,"N":"Bakio","O":92,"NE":"Bakio","NC":"Bakio","C":2041},{"Z":2090,"N":"Balmaseda","O":169,"NE":"Balmaseda","NC":"Balmaseda","C":6022},{"Z":2013,"N":"Barakaldo","O":93,"NE":"Barakaldo","NC":"Barakaldo","C":79984},{"Z":2014,"N":"Barrika","O":94,"NE":"Barrika","NC":"Barrika","C":1218},{"Z":2015,"N":"Basauri","O":95,"NE":"Basauri","NC":"Basauri","C":33690},{"Z":2092,"N":"Bedia","O":171,"NE":"Bedia","NC":"Bedia","C":837},{"Z":2016,"N":"Berango","O":96,"NE":"Berango","NC":"Berango","C":5260},{"Z":2017,"N":"Bermeo","O":97,"NE":"Bermeo","NC":"Bermeo","C":13290},{"Z":2018,"N":"Berriatua","O":98,"NE":"Berriatua","NC":"Berriatua","C":875},{"Z":2019,"N":"Berriz","O":99,"NE":"Berriz","NC":"Berriz","C":3594},{"Z":20,"N":"Bilbao","O":8,"NE":"Bilbo","NC":"Bilbao","C":274076},{"Z":2021,"N":"Busturia","O":100,"NE":"Busturia","NC":"Busturia","C":1352},{"Z":2901,"N":"Derio","O":177,"NE":"Derio","NC":"Derio","C":4775},{"Z":2026,"N":"Dima","O":105,"NE":"Dima","NC":"Dima","C":1134},{"Z":2027,"N":"Durango","O":106,"NE":"Durango","NC":"Durango","C":22033},{"Z":2028,"N":"Ea","O":107,"NE":"Ea","NC":"Ea","C":715},{"Z":2031,"N":"Elantxobe","O":110,"NE":"Elantxobe","NC":"Elantxobe","C":340},{"Z":2032,"N":"Elorrio","O":111,"NE":"Elorrio","NC":"Elorrio","C":5735},{"Z":2902,"N":"Erandio","O":178,"NE":"Erandio","NC":"Erandio","C":19124},{"Z":2033,"N":"Ereño","O":112,"NE":"Ereño","NC":"Ereño","C":215},{"Z":2034,"N":"Ermua","O":113,"NE":"Ermua","NC":"Ermua","C":12902},{"Z":2079,"N":"Errigoiti","O":158,"NE":"Errigoiti","NC":"Errigoiti","C":425},{"Z":2029,"N":"Etxebarri Anteiglesia de San Esteban","O":108,"NE":"Etxebarri","NC":"Etxebarri","C":8332},{"Z":2030,"N":"Etxebarria","O":109,"NE":"Etxebarria","NC":"Etxebarria","C":608},{"Z":2906,"N":"Forua","O":182,"NE":"Forua","NC":"Forua","C":775},{"Z":2035,"N":"Fruiz","O":114,"NE":"Fruiz","NC":"Fruiz","C":412},{"Z":2036,"N":"Galdakao","O":115,"NE":"Galdakao","NC":"Galdakao","C":24144},{"Z":2037,"N":"Galdames","O":116,"NE":"Galdames","NC":"Galdames","C":678},{"Z":2038,"N":"Gamiz-Fika","O":117,"NE":"Gamiz-Fika","NC":"Gamiz-Fika","C":1122},{"Z":2039,"N":"Garai","O":118,"NE":"Garai","NC":"Garai","C":243},{"Z":2040,"N":"Gatika","O":119,"NE":"Gatika","NC":"Gatika","C":1299},{"Z":2041,"N":"Gautegiz Arteaga","O":120,"NE":"Gautegiz-Arteaga","NC":"Gautegiz-Arteaga","C":704},{"Z":2046,"N":"Gernika-Lumo","O":125,"NE":"Gernika-Lumo","NC":"Gernika-Lumo","C":12617},{"Z":2044,"N":"Getxo","O":123,"NE":"Getxo","NC":"Getxo","C":62989},{"Z":2047,"N":"Gizaburuaga","O":126,"NE":"Gizaburuaga","NC":"Gizaburuaga","C":161},{"Z":2042,"N":"Gordexola","O":121,"NE":"Gordexola","NC":"Gordexola","C":1384},{"Z":2043,"N":"Gorliz","O":122,"NE":"Gorliz","NC":"Gorliz","C":4403},{"Z":2045,"N":"Güeñes","O":124,"NE":"Gueñes","NC":"Güeñes","C":5149},{"Z":2048,"N":"Ibarrangelu","O":127,"NE":"Ibarrangelu","NC":"Ibarrangelu","C":562},{"Z":2094,"N":"Igorre","O":173,"NE":"Igorre","NC":"Igorre","C":3193},{"Z":2049,"N":"Ispaster","O":128,"NE":"Ispaster","NC":"Ispaster","C":548},{"Z":2910,"N":"Iurreta","O":186,"NE":"Iurreta","NC":"Iurreta","C":2948},{"Z":2050,"N":"Izurtza","O":129,"NE":"Izurtza","NC":"Izurtza","C":198},{"Z":2907,"N":"Kortezubi","O":183,"NE":"Kortezubi","NC":"Kortezubi","C":355},{"Z":2051,"N":"Lanestosa","O":130,"NE":"Lanestosa","NC":"Lanestosa","C":220},{"Z":2052,"N":"Larrabetzu","O":131,"NE":"Larrabetzu","NC":"Larrabetzu","C":1559},{"Z":2053,"N":"Laukiz","O":132,"NE":"Laukiz","NC":"Laukiz","C":900},{"Z":2054,"N":"Leioa","O":133,"NE":"Leioa","NC":"Leioa","C":24135},{"Z":2057,"N":"Lekeitio","O":136,"NE":"Lekeitio","NC":"Lekeitio","C":5749},{"Z":2055,"N":"Lemoa","O":134,"NE":"Lemoa","NC":"Lemoa","C":2662},{"Z":2056,"N":"Lemoiz","O":135,"NE":"Lemoiz","NC":"Lemoiz","C":978},{"Z":2081,"N":"Lezama","O":160,"NE":"Lezama","NC":"Lezama","C":1883},{"Z":2903,"N":"Loiu","O":179,"NE":"Loiu","NC":"Loiu","C":1838},{"Z":2058,"N":"Mallabia","O":137,"NE":"Mallabia","NC":"Mallabia","C":972},{"Z":2059,"N":"Mañaria","O":138,"NE":"Mañaria","NC":"Mañaria","C":402},{"Z":2060,"N":"Markina-Xemein","O":139,"NE":"Markina-Xemein","NC":"Markina-Xemein","C":3645},{"Z":2061,"N":"Maruri-Jatabe","O":140,"NE":"Jatabe","NC":"Maruri-Jatabe","C":762},{"Z":2062,"N":"Mendata","O":141,"NE":"Mendata","NC":"Mendata","C":300},{"Z":2063,"N":"Mendexa","O":142,"NE":"Mendexa","NC":"Mendexa","C":373},{"Z":2064,"N":"Meñaka","O":143,"NE":"Meñaka","NC":"Meñaka","C":603},{"Z":2066,"N":"Morga","O":145,"NE":"Morga","NC":"Morga","C":346},{"Z":2068,"N":"Mundaka","O":147,"NE":"Mundaka","NC":"Mundaka","C":1551},{"Z":2069,"N":"Mungia","O":148,"NE":"Mungia","NC":"Mungia","C":12765},{"Z":2007,"N":"Munitibar-Arbatzegi Gerrikaitz","O":87,"NE":"Munitibar","NC":"Munitibar-Arbatzegi-Gerrikaitz","C":365},{"Z":2908,"N":"Murueta","O":184,"NE":"Murueta","NC":"Murueta","C":245},{"Z":2071,"N":"Muskiz","O":150,"NE":"Muskiz","NC":"Muskiz","C":6118},{"Z":2067,"N":"Muxika","O":146,"NE":"Muxika","NC":"Muxika","C":1161},{"Z":2909,"N":"Nabarniz","O":185,"NE":"Nabarniz","NC":"Nabarniz","C":207},{"Z":2073,"N":"Ondarroa","O":152,"NE":"Ondarroa","NC":"Ondarroa","C":6952},{"Z":2074,"N":"Orduña","O":153,"NE":"Urduña","NC":"Orduña","C":3333},{"Z":2075,"N":"Orozko","O":154,"NE":"Orozko","NC":"Orozko","C":1975},{"Z":2083,"N":"Ortuella","O":162,"NE":"Ortuella","NC":"Ortuella","C":6950},{"Z":2072,"N":"Otxandio","O":151,"NE":"Otxandio","NC":"Otxandio","C":974},{"Z":2077,"N":"Plentzia","O":156,"NE":"Plentzia","NC":"Plentzia","C":3367},{"Z":2078,"N":"Portugalete","O":157,"NE":"Portugalete","NC":"Portugalete","C":38742},{"Z":2082,"N":"Santurtzi","O":161,"NE":"Santurtzi","NC":"Santurtzi","C":37673},{"Z":2084,"N":"Sestao","O":163,"NE":"Sestao","NC":"Sestao","C":22577},{"Z":2904,"N":"Sondika","O":180,"NE":"Sondika","NC":"Sondika","C":3504},{"Z":2085,"N":"Sopelana","O":164,"NE":"Sopela","NC":"Sopela","C":10301},{"Z":2086,"N":"Sopuerta","O":165,"NE":"Sopuerta","NC":"Sopuerta","C":2073},{"Z":2076,"N":"Sukarrieta","O":155,"NE":"Sukarrieta","NC":"Sukarrieta","C":314},{"Z":2087,"N":"Trucios-Turtzioz","O":166,"NE":"Turtzioz","NC":"Trucios","C":429},{"Z":2088,"N":"Ubide","O":167,"NE":"Ubide","NC":"Ubide","C":135},{"Z":2065,"N":"Ugao-Miraballes","O":144,"NE":"Ugao","NC":"Ugao-Miraballes","C":3315},{"Z":2089,"N":"Urduliz","O":168,"NE":"Urduliz","NC":"Urduliz","C":3266},{"Z":2022,"N":"Carranza","O":101,"NE":"Karrantza","NC":"Valle de Carranza","C":2355},{"Z":2080,"N":"Valle de Trápaga-Trapagaran","O":159,"NE":"Trapagaran","NC":"Valle de Trápaga","C":9971},{"Z":2095,"N":"Zaldibar","O":174,"NE":"Zaldibar","NC":"Zaldibar","C":2352},{"Z":2096,"N":"Zalla","O":175,"NE":"Zalla","NC":"Zalla","C":6608},{"Z":2905,"N":"Zamudio","O":181,"NE":"Zamudio","NC":"Zamudio","C":2565},{"Z":2097,"N":"Zaratamo","O":176,"NE":"Zaratamo","NC":"Zaratamo","C":1303},{"Z":2024,"N":"Zeanuri","O":103,"NE":"Zeanuri","NC":"Zeanuri","C":1003},{"Z":2025,"N":"Zeberio","O":104,"NE":"Zeberio","NC":"Zeberio","C":883},{"Z":2913,"N":"Zierbena","O":189,"NE":"Zierbena","NC":"Zierbena","C":1251},{"Z":2915,"N":"Ziortza-Bolibar","O":191,"NE":"Ziortza-Bolibar","NC":"Ziortza-Bolibar","C":362}]};
      //var gip={"zonas":[{"Z":3001,"N":"Abaltzisketa","O":192,"NE":"Abaltzisketa","NC":"Abaltzisketa","C":242},{"Z":3002,"N":"Aduna","O":193,"NE":"Aduna","NC":"Aduna","C":343},{"Z":3016,"N":"Aia","O":207,"NE":"Aia","NC":"Aia","C":1514},{"Z":3003,"N":"Aizarnazabal","O":194,"NE":"Aizarnazabal","NC":"Aizarnazabal","C":541},{"Z":3004,"N":"Albiztur","O":195,"NE":"Albiztur","NC":"Albiztur","C":252},{"Z":3005,"N":"Alegia","O":196,"NE":"Alegia","NC":"Alegia","C":1261},{"Z":3006,"N":"Alkiza","O":197,"NE":"Alkiza","NC":"Alkiza","C":262},{"Z":3906,"N":"Altzaga","O":277,"NE":"Altzaga","NC":"Altzaga","C":121},{"Z":3007,"N":"Altzo","O":198,"NE":"Altzo","NC":"Altzo","C":304},{"Z":3008,"N":"Amezketa","O":199,"NE":"Amezketa","NC":"Amezketa","C":721},{"Z":3009,"N":"Andoain","O":200,"NE":"Andoain","NC":"Andoain","C":11528},{"Z":3010,"N":"Anoeta","O":201,"NE":"Anoeta","NC":"Anoeta","C":1494},{"Z":3011,"N":"Antzuola","O":202,"NE":"Antzuola","NC":"Antzuola","C":1660},{"Z":3012,"N":"Arama","O":203,"NE":"Arama","NC":"Arama","C":144},{"Z":3013,"N":"Aretxabaleta","O":204,"NE":"Aretxabaleta","NC":"Aretxabaleta","C":5427},{"Z":3014,"N":"Asteasu","O":205,"NE":"Asteasu","NC":"Asteasu","C":1111},{"Z":3903,"N":"Astigarraga","O":274,"NE":"Astigarraga","NC":"Astigarraga","C":4247},{"Z":3015,"N":"Ataun","O":206,"NE":"Ataun","NC":"Ataun","C":1272},{"Z":3017,"N":"Azkoitia","O":208,"NE":"Azkoitia","NC":"Azkoitia","C":8580},{"Z":3018,"N":"Azpeitia","O":209,"NE":"Azpeitia","NC":"Azpeitia","C":11074},{"Z":3904,"N":"Baliarrain","O":275,"NE":"Baliarrain","NC":"Baliarrain","C":96},{"Z":3019,"N":"Beasain","O":210,"NE":"Beasain","NC":"Beasain","C":10053},{"Z":3020,"N":"Beizama","O":211,"NE":"Beizama","NC":"Beizama","C":129},{"Z":3021,"N":"Belauntza","O":212,"NE":"Belauntza","NC":"Belauntza","C":199},{"Z":3022,"N":"Berastegi","O":213,"NE":"Berastegi","NC":"Berastegi","C":834},{"Z":3074,"N":"Bergara","O":264,"NE":"Bergara","NC":"Bergara","C":11610},{"Z":3023,"N":"Berrobi","O":214,"NE":"Berrobi","NC":"Berrobi","C":445},{"Z":3024,"N":"Bidania-Goiatz","O":215,"NE":"Bidania-Goiatz","NC":"Bidania-Goiatz","C":393},{"Z":3029,"N":"Deba","O":220,"NE":"Deba","NC":"Deba","C":4258},{"Z":30,"N":"Donostia","O":9,"NE":"Donostia","NC":"Donostia-San Sebastián","C":147189},{"Z":3030,"N":"Eibar","O":221,"NE":"Eibar","NC":"Eibar","C":21515},{"Z":3031,"N":"Elduain","O":222,"NE":"Elduain","NC":"Elduain","C":180},{"Z":3033,"N":"Elgeta","O":224,"NE":"Elgeta","NC":"Elgeta","C":864},{"Z":3032,"N":"Elgoibar","O":223,"NE":"Elgoibar","NC":"Elgoibar","C":8785},{"Z":3067,"N":"Errenteria","O":258,"NE":"Errenteria","NC":"Errenteria","C":30825},{"Z":3066,"N":"Errezil","O":257,"NE":"Errezil","NC":"Errezil","C":461},{"Z":3034,"N":"Eskoriatza","O":225,"NE":"Eskoriatza","NC":"Eskoriatza","C":3157},{"Z":3035,"N":"Ezkio-Itsaso","O":226,"NE":"Ezkio-Itsaso","NC":"Ezkio-Itsaso","C":482},{"Z":3038,"N":"Gabiria","O":229,"NE":"Gabiria","NC":"Gabiria","C":392},{"Z":3037,"N":"Gaintza","O":228,"NE":"Gaintza","NC":"Gaintza","C":97},{"Z":3907,"N":"Gaztelu","O":278,"NE":"Gaztelu","NC":"Gaztelu","C":120},{"Z":3039,"N":"Getaria","O":230,"NE":"Getaria","NC":"Getaria","C":2111},{"Z":3040,"N":"Hernani","O":231,"NE":"Hernani","NC":"Hernani","C":15321},{"Z":3041,"N":"Hernialde","O":232,"NE":"Hernialde","NC":"Hernialde","C":258},{"Z":3036,"N":"Hondarribia","O":227,"NE":"Hondarribia","NC":"Hondarribia","C":13148},{"Z":3042,"N":"Ibarra","O":233,"NE":"Ibarra","NC":"Ibarra","C":3251},{"Z":3043,"N":"Idiazabal","O":234,"NE":"Idiazabal","NC":"Idiazabal","C":1740},{"Z":3044,"N":"Ikaztegieta","O":235,"NE":"Ikaztegieta","NC":"Ikaztegieta","C":368},{"Z":3045,"N":"Irun","O":236,"NE":"Irun","NC":"Irun","C":46691},{"Z":3046,"N":"Irura","O":237,"NE":"Irura","NC":"Irura","C":1167},{"Z":3047,"N":"Itsasondo","O":238,"NE":"Itsasondo","NC":"Itsasondo","C":477},{"Z":3048,"N":"Larraul","O":239,"NE":"Larraul","NC":"Larraul","C":176},{"Z":3902,"N":"Lasarte-Oria","O":273,"NE":"Lasarte-Oria","NC":"Lasarte-Oria","C":14193},{"Z":3049,"N":"Lazkao","O":240,"NE":"Lazkao","NC":"Lazkao","C":4124},{"Z":3050,"N":"Leaburu","O":241,"NE":"Leaburu","NC":"Leaburu","C":263},{"Z":3051,"N":"Legazpi","O":242,"NE":"Legazpi","NC":"Legazpi","C":6904},{"Z":3052,"N":"Legorreta","O":243,"NE":"Legorreta","NC":"Legorreta","C":1091},{"Z":3068,"N":"Leintz-Gatzaga","O":259,"NE":"Leintz Gatzaga","NC":"Leintz-Gatzaga","C":183},{"Z":3053,"N":"Lezo","O":244,"NE":"Lezo","NC":"Lezo","C":4765},{"Z":3054,"N":"Lizartza","O":245,"NE":"Lizartza","NC":"Lizartza","C":447},{"Z":3901,"N":"Mendaro","O":272,"NE":"Mendaro","NC":"Mendaro","C":1441},{"Z":3055,"N":"Arrasate/Mondragón","O":246,"NE":"Arrasate","NC":"Mondragón","C":17522},{"Z":3057,"N":"Mutiloa","O":248,"NE":"Mutiloa","NC":"Mutiloa","C":201},{"Z":3056,"N":"Mutriku","O":247,"NE":"Mutriku","NC":"Mutriku","C":4104},{"Z":3063,"N":"Oiartzun","O":254,"NE":"Oiartzun","NC":"Oiartzun","C":7990},{"Z":3058,"N":"Olaberria","O":249,"NE":"Olaberria","NC":"Olaberria","C":746},{"Z":3059,"N":"Oñati","O":250,"NE":"Oñati","NC":"Oñati","C":8863},{"Z":3076,"N":"Ordizia","O":266,"NE":"Ordizia","NC":"Ordizia","C":6978},{"Z":3905,"N":"Orendain","O":276,"NE":"Orendain","NC":"Orendain","C":141},{"Z":3060,"N":"Orexa","O":251,"NE":"Orexa","NC":"Orexa","C":89},{"Z":3061,"N":"Orio","O":252,"NE":"Orio","NC":"Orio","C":4273},{"Z":3062,"N":"Ormaiztegi","O":253,"NE":"Ormaiztegi","NC":"Ormaiztegi","C":982},{"Z":3064,"N":"Pasaia","O":255,"NE":"Pasaia","NC":"Pasaia","C":12526},{"Z":3070,"N":"Segura","O":260,"NE":"Segura","NC":"Segura","C":1099},{"Z":3065,"N":"Soraluze","O":256,"NE":"Soraluze","NC":"Soraluze","C":3006},{"Z":3071,"N":"Tolosa","O":261,"NE":"Tolosa","NC":"Tolosa","C":14818},{"Z":3072,"N":"Urnieta","O":262,"NE":"Urnieta","NC":"Urnieta","C":4731},{"Z":3077,"N":"Urretxu","O":267,"NE":"Urretxu","NC":"Urretxu","C":5243},{"Z":3073,"N":"Usurbil","O":263,"NE":"Usurbil","NC":"Usurbil","C":4677},{"Z":3075,"N":"Villabona","O":265,"NE":"Villabona","NC":"Villabona","C":4359},{"Z":3078,"N":"Zaldibia","O":268,"NE":"Zaldibia","NC":"Zaldibia","C":1155},{"Z":3079,"N":"Zarautz","O":269,"NE":"Zarautz","NC":"Zarautz","C":17835},{"Z":3025,"N":"Zegama","O":216,"NE":"Zegama","NC":"Zegama","C":1144},{"Z":3026,"N":"Zerain","O":217,"NE":"Zerain","NC":"Zerain","C":202},{"Z":3027,"N":"Zestoa","O":218,"NE":"Zestoa","NC":"Zestoa","C":2816},{"Z":3028,"N":"Zizurkil","O":219,"NE":"Zizurkil","NC":"Zizurkil","C":2255},{"Z":3081,"N":"Zumaia","O":271,"NE":"Zumaia","NC":"Zumaia","C":7460},{"Z":3080,"N":"Zumarraga","O":270,"NE":"Zumarraga","NC":"Zumarraga","C":7900}]}
      //var nav={"zonas":[{"Z":4001,"N":"Abáigar","O":279,"NE":"Abaigar","NC":"Abáigar","C":90},{"Z":4002,"N":"Abárzuza","O":280,"NE":"Abartzuza","NC":"Abárzuza","C":424},{"Z":4003,"N":"Abaurregaina/Abaurrea Alta","O":281,"NE":"Abaurregaina","NC":"Abaurrea Alta","C":124},{"Z":4004,"N":"Abaurrepea/Abaurrea Baja","O":282,"NE":"Abaurrepea","NC":"Abaurrea Baja","C":35},{"Z":4005,"N":"Aberin","O":283,"NE":"Aberin","NC":"Aberin","C":296},{"Z":4006,"N":"Ablitas","O":284,"NE":"Ablitas","NC":"Ablitas","C":1952},{"Z":4007,"N":"Adiós","O":285,"NE":"Adios","NC":"Adiós","C":136},{"Z":4008,"N":"Aguilar de Codés","O":286,"NE":"Aguilar Kodes","NC":"Aguilar de Codés","C":80},{"Z":4009,"N":"Aibar/Oibar","O":287,"NE":"Oibar","NC":"Aibar","C":690},{"Z":4011,"N":"Allín","O":289,"NE":"Allin","NC":"Allín","C":697},{"Z":4012,"N":"Allo","O":290,"NE":"Allo","NC":"Allo","C":814},{"Z":4010,"N":"Altsasu/Alsasua","O":288,"NE":"Altsasu","NC":"Alsasua","C":5721},{"Z":4013,"N":"Améscoa Baja","O":291,"NE":"Ameskoabarrena","NC":"Améscoa Baja","C":661},{"Z":4014,"N":"Ancín","O":292,"NE":"Antzin","NC":"Ancín","C":274},{"Z":4015,"N":"Andosilla","O":293,"NE":"Andosilla","NC":"Andosilla","C":2001},{"Z":4016,"N":"Ansoáin","O":294,"NE":"Antsoain","NC":"Ansoáin","C":7642},{"Z":4017,"N":"Anue","O":295,"NE":"Anue","NC":"Anue","C":361},{"Z":4018,"N":"Añorbe","O":296,"NE":"Añorbe","NC":"Añorbe","C":409},{"Z":4019,"N":"Aoiz/Agoitz","O":297,"NE":"Agoitz","NC":"Aoiz","C":1809},{"Z":4020,"N":"Araitz","O":298,"NE":"Araitz","NC":"Araitz","C":454},{"Z":4025,"N":"Arakil","O":303,"NE":"Arakil","NC":"Arakil","C":768},{"Z":4021,"N":"Aranarache","O":299,"NE":"Aranaratxe","NC":"Aranarache","C":64},{"Z":4023,"N":"Aranguren","O":301,"NE":"Aranguren","NC":"Aranguren","C":6826},{"Z":4024,"N":"Arano","O":302,"NE":"Arano","NC":"Arano","C":102},{"Z":4022,"N":"Arantza","O":300,"NE":"Arantza","NC":"Arantza","C":526},{"Z":4026,"N":"Aras","O":304,"NE":"Aras","NC":"Aras","C":147},{"Z":4027,"N":"Arbizu","O":305,"NE":"Arbizu","NC":"Arbizu","C":838},{"Z":4028,"N":"Arce/Artzi","O":306,"NE":"Artzibar","NC":"Arce","C":211},{"Z":4030,"N":"Arellano","O":308,"NE":"Arellano","NC":"Arellano","C":145},{"Z":4031,"N":"Areso","O":309,"NE":"Areso","NC":"Areso","C":221},{"Z":4032,"N":"Arguedas","O":310,"NE":"Arguedas","NC":"Arguedas","C":1733},{"Z":4033,"N":"Aria","O":311,"NE":"Aria","NC":"Aria","C":49},{"Z":4034,"N":"Aribe","O":312,"NE":"Aribe","NC":"Aribe","C":40},{"Z":4035,"N":"Armañanzas","O":313,"NE":"Armañantzas","NC":"Armañanzas","C":63},{"Z":4036,"N":"Arróniz","O":314,"NE":"Arronitz","NC":"Arróniz","C":921},{"Z":4037,"N":"Arruazu","O":315,"NE":"Arruazu","NC":"Arruazu","C":86},{"Z":4038,"N":"Artajona","O":316,"NE":"Artaxoa","NC":"Artajona","C":1348},{"Z":4039,"N":"Artazu","O":317,"NE":"Artazu","NC":"Artazu","C":83},{"Z":4040,"N":"Atez","O":318,"NE":"Atetz","NC":"Atez","C":194},{"Z":4041,"N":"Ayegui","O":319,"NE":"Aiegi","NC":"Ayegui","C":1583},{"Z":4042,"N":"Azagra","O":320,"NE":"Azagra","NC":"Azagra","C":2744},{"Z":4043,"N":"Azuelo","O":321,"NE":"Azuelo","NC":"Azuelo","C":38},{"Z":4044,"N":"Bakaiku","O":322,"NE":"Bakaiku","NC":"Bakaiku","C":290},{"Z":4901,"N":"Barañain","O":542,"NE":"Barañain","NC":"Barañáin","C":15475},{"Z":4045,"N":"Barásoain","O":323,"NE":"Barasoain","NC":"Barasoáin","C":504},{"Z":4046,"N":"Barbarin","O":324,"NE":"Barbarin","NC":"Barbarin","C":60},{"Z":4047,"N":"Bargota","O":325,"NE":"Bargota","NC":"Bargota","C":261},{"Z":4048,"N":"Barillas","O":326,"NE":"Barillas","NC":"Barillas","C":169},{"Z":4049,"N":"Basaburua","O":327,"NE":"Basaburua","NC":"Basaburua","C":704},{"Z":4050,"N":"Baztan","O":328,"NE":"Baztan","NC":"Baztan","C":6058},{"Z":4051,"N":"Beire","O":329,"NE":"Beire","NC":"Beire","C":253},{"Z":4052,"N":"Belascoáin","O":330,"NE":"Beraskoain","NC":"Belascoáin","C":88},{"Z":4250,"N":"Bera/Vera de Bidasoa","O":526,"NE":"Bera","NC":"Bera","C":2832},{"Z":4053,"N":"Berbinzana","O":331,"NE":"Berbintzana","NC":"Berbinzana","C":532},{"Z":4905,"N":"Beriáin","O":546,"NE":"Beriain","NC":"Beriain","C":2847},{"Z":4902,"N":"Berrioplano","O":543,"NE":"Berriobeiti","NC":"Berrioplano","C":4346},{"Z":4903,"N":"Berriozar","O":544,"NE":"Berriozar","NC":"Berriozar","C":6593},{"Z":4054,"N":"Bertizarana","O":332,"NE":"Bertizarana","NC":"Bertizarana","C":460},{"Z":4055,"N":"Betelu","O":333,"NE":"Betelu","NC":"Betelu","C":259},{"Z":4253,"N":"Bidaurreta","O":529,"NE":"Bidaurreta","NC":"Bidaurreta","C":129},{"Z":4056,"N":"Biurrun-Olcoz","O":334,"NE":"Biurrun-Olkotz","NC":"Biurrun-Olcoz","C":179},{"Z":4057,"N":"Buñuel","O":335,"NE":"Buñuel","NC":"Buñuel","C":1812},{"Z":4058,"N":"Auritz/Burguete","O":336,"NE":"Auritz","NC":"Burguete","C":215},{"Z":4059,"N":"Burgui/Burgi","O":337,"NE":"Burgi","NC":"Burgui","C":191},{"Z":4060,"N":"Burlata/Burlada","O":338,"NE":"Burlata","NC":"Burlada","C":13723},{"Z":4062,"N":"Cabanillas","O":340,"NE":"Cabanillas","NC":"Cabanillas","C":1088},{"Z":4063,"N":"Cabredo","O":341,"NE":"Cabredo","NC":"Cabredo","C":88},{"Z":4064,"N":"Cadreita","O":342,"NE":"Cadreita","NC":"Cadreita","C":1447},{"Z":4065,"N":"Caparroso","O":343,"NE":"Caparroso","NC":"Caparroso","C":1892},{"Z":4066,"N":"Carcar","O":344,"NE":"Carcar","NC":"Cárcar","C":867},{"Z":4067,"N":"Carcastillo","O":345,"NE":"Zarrakaztelu","NC":"Carcastillo","C":1938},{"Z":4068,"N":"Cascante","O":346,"NE":"Cascante","NC":"Cascante","C":2893},{"Z":4069,"N":"Cáseda","O":347,"NE":"Kaseda","NC":"Cáseda","C":847},{"Z":4070,"N":"Castejón","O":348,"NE":"Castejon","NC":"Castejón","C":2652},{"Z":4071,"N":"Castillonuevo","O":349,"NE":"Gazteluberri","NC":"Castillo-Nuevo","C":17},{"Z":4193,"N":"Oltza","O":471,"NE":"Oltza zendea","NC":"Cendea de Olza","C":1414},{"Z":4072,"N":"Cintruénigo","O":350,"NE":"Cintruenigo","NC":"Cintruénigo","C":5288},{"Z":4074,"N":"Cirauqui","O":352,"NE":"Zirauki","NC":"Cirauqui","C":394},{"Z":4075,"N":"Ciriza","O":353,"NE":"Ziritza","NC":"Ciriza","C":101},{"Z":4076,"N":"Cizur","O":354,"NE":"Zizur","NC":"Cizur","C":2407},{"Z":4077,"N":"Corella","O":355,"NE":"Corella","NC":"Corella","C":5384},{"Z":4078,"N":"Cortes","O":356,"NE":"Cortes","NC":"Cortes","C":2447},{"Z":4079,"N":"Desojo","O":357,"NE":"Desoio","NC":"Desojo","C":76},{"Z":4080,"N":"Dicastillo","O":358,"NE":"Deikaztelu","NC":"Dicastillo","C":510},{"Z":4081,"N":"Donamaria","O":359,"NE":"Donamaria","NC":"Donamaria","C":342},{"Z":4083,"N":"Echarri","O":361,"NE":"Etxarri","NC":"Echarri","C":56},{"Z":4086,"N":"Egüés","O":364,"NE":"Eguesibar","NC":"Egüés","C":12987},{"Z":4061,"N":"Busto (El)","O":339,"NE":"El Busto","NC":"El Busto","C":56},{"Z":4087,"N":"Elgorriaga","O":365,"NE":"Elgorriaga","NC":"Elgorriaga","C":169},{"Z":4089,"N":"Enériz","O":367,"NE":"Eneritz","NC":"Enériz","C":242},{"Z":4090,"N":"Eratsun","O":368,"NE":"Eratsun","NC":"Eratsun","C":146},{"Z":4091,"N":"Ergoiena","O":369,"NE":"Ergoiena","NC":"Ergoiena","C":347},{"Z":4092,"N":"Erro","O":370,"NE":"Erroibar","NC":"Erro","C":662},{"Z":4093,"N":"Ezcároz/Ezkaroze","O":371,"NE":"Ezkaroze","NC":"Escároz","C":293},{"Z":4094,"N":"Eslava","O":372,"NE":"Eslaba","NC":"Eslava","C":112},{"Z":4095,"N":"Esparza de Salazar","O":373,"NE":"Espartza","NC":"Esparza de Salazar","C":76},{"Z":4096,"N":"Espronceda","O":374,"NE":"Esprontzeda","NC":"Espronceda","C":115},{"Z":4097,"N":"Estella/Lizarra","O":375,"NE":"Lizarra","NC":"Estella","C":10436},{"Z":4098,"N":"Esteribar","O":376,"NE":"Esteribar","NC":"Esteribar","C":1918},{"Z":4099,"N":"Etayo","O":377,"NE":"Etaiu","NC":"Etayo","C":63},{"Z":4082,"N":"Etxalar","O":360,"NE":"Etxalar","NC":"Etxalar","C":615},{"Z":4084,"N":"Etxarri-Aranatz","O":362,"NE":"Etxarri Aranatz","NC":"Etxarri Aranatz","C":1935},{"Z":4085,"N":"Etxauri","O":363,"NE":"Etxauri","NC":"Etxauri","C":471},{"Z":4100,"N":"Eulate","O":378,"NE":"Eulate","NC":"Eulate","C":264},{"Z":4101,"N":"Ezcabarte","O":379,"NE":"Ezkabarte","NC":"Ezcabarte","C":1390},{"Z":4102,"N":"Ezkurra","O":380,"NE":"Ezkurra","NC":"Ezkurra","C":146},{"Z":4103,"N":"Ezprogui","O":381,"NE":"Ezporogi","NC":"Ezprogui","C":46},{"Z":4104,"N":"Falces","O":382,"NE":"Faltzes","NC":"Falces","C":1876},{"Z":4105,"N":"Fitero","O":383,"NE":"Fitero","NC":"Fitero","C":1535},{"Z":4106,"N":"Fontellas","O":384,"NE":"Fontellas","NC":"Fontellas","C":689},{"Z":4107,"N":"Funes","O":385,"NE":"Funes","NC":"Funes","C":1707},{"Z":4108,"N":"Fustiñana","O":386,"NE":"Fustiñana","NC":"Fustiñana","C":1878},{"Z":4109,"N":"Galar","O":387,"NE":"Galar","NC":"Galar","C":1562},{"Z":4110,"N":"Gallipienzo","O":388,"NE":"Galipentzu","NC":"Gallipienzo","C":90},{"Z":4111,"N":"Gallués/Galoze","O":389,"NE":"Galoze","NC":"Gallués","C":96},{"Z":4112,"N":"Garaioa","O":390,"NE":"Garaioa","NC":"Garaioa","C":94},{"Z":4113,"N":"Garde","O":391,"NE":"Garde","NC":"Garde","C":137},{"Z":4114,"N":"Garínoain","O":392,"NE":"Garinoain","NC":"Garínoain","C":362},{"Z":4115,"N":"Garralda","O":393,"NE":"Garralda","NC":"Garralda","C":166},{"Z":4116,"N":"Genevilla","O":394,"NE":"Genevilla","NC":"Genevilla","C":65},{"Z":4117,"N":"Goizueta","O":395,"NE":"Goizueta","NC":"Goizueta","C":620},{"Z":4118,"N":"Goñi","O":396,"NE":"Goñerri","NC":"Goñi","C":165},{"Z":4119,"N":"Guesa/Gorza","O":397,"NE":"Gorza","NC":"Güesa","C":40},{"Z":4120,"N":"Guesálaz","O":398,"NE":"Gesalatz","NC":"Guesálaz","C":394},{"Z":4121,"N":"Guirguillano","O":399,"NE":"Girgillao","NC":"Guirguillano","C":64},{"Z":4122,"N":"Huarte/Uharte","O":400,"NE":"Uharte","NC":"Huarte","C":4719},{"Z":4124,"N":"Ibargoiti","O":402,"NE":"Ibargoiti","NC":"Ibargoiti","C":210},{"Z":4259,"N":"Igantzi","O":535,"NE":"Igantzi","NC":"Igantzi","C":485},{"Z":4125,"N":"Igúzquiza","O":403,"NE":"Iguzkitza","NC":"Igúzquiza","C":275},{"Z":4126,"N":"Imotz","O":404,"NE":"Imotz","NC":"Imotz","C":357},{"Z":4127,"N":"Irañeta","O":405,"NE":"Irañeta","NC":"Irañeta","C":143},{"Z":4904,"N":"Irurtzun","O":545,"NE":"Irurtzun","NC":"Irurtzun","C":1559},{"Z":4128,"N":"Isaba/Izaba","O":406,"NE":"Izaba","NC":"Isaba","C":370},{"Z":4129,"N":"Ituren","O":407,"NE":"Ituren","NC":"Ituren","C":393},{"Z":4130,"N":"Iturmendi","O":408,"NE":"Iturmendi","NC":"Iturmendi","C":310},{"Z":4131,"N":"Iza","O":409,"NE":"Itza","NC":"Iza","C":871},{"Z":4132,"N":"Izagaondoa","O":410,"NE":"Itzagaondoa","NC":"Izagaondoa","C":146},{"Z":4133,"N":"Izalzu/Itzaltzu","O":411,"NE":"Itzaltzu","NC":"Izalzu","C":44},{"Z":4134,"N":"Jaurrieta","O":412,"NE":"Jaurrieta","NC":"Jaurrieta","C":178},{"Z":4135,"N":"Javier","O":413,"NE":"Xabier","NC":"Javier","C":102},{"Z":4136,"N":"Juslapeña","O":414,"NE":"Txulapain","NC":"Juslapeña","C":444},{"Z":4137,"N":"Labaien","O":415,"NE":"Labaien","NC":"Labaien","C":208},{"Z":4138,"N":"Lakuntza","O":416,"NE":"Lakuntza","NC":"Lakuntza","C":934},{"Z":4139,"N":"Lana","O":417,"NE":"Lana","NC":"Lana","C":159},{"Z":4140,"N":"Lantz","O":418,"NE":"Lantz","NC":"Lantz","C":116},{"Z":4141,"N":"Lapoblación","O":419,"NE":"Lapoblacion","NC":"Lapoblación","C":109},{"Z":4142,"N":"Larraga","O":420,"NE":"Larraga","NC":"Larraga","C":1411},{"Z":4143,"N":"Larraona","O":421,"NE":"Larragoa","NC":"Larraona","C":98},{"Z":4144,"N":"Larraun","O":422,"NE":"Larraun","NC":"Larraun","C":804},{"Z":4145,"N":"Lazagurría","O":423,"NE":"Elizagorria","NC":"Lazagurría","C":171},{"Z":4146,"N":"Leache","O":424,"NE":"Leatxe","NC":"Leache","C":35},{"Z":4147,"N":"Legarda","O":425,"NE":"Legarda","NC":"Legarda","C":98},{"Z":4148,"N":"Legaria","O":426,"NE":"Legaria","NC":"Legaria","C":93},{"Z":4149,"N":"Leitza","O":427,"NE":"Leitza","NC":"Leitza","C":2338},{"Z":4908,"N":"Lekunberri","O":549,"NE":"Lekunberri","NC":"Lekunberri","C":1008},{"Z":4150,"N":"Leoz","O":428,"NE":"Leotz","NC":"Leoz","C":213},{"Z":4151,"N":"Lerga","O":429,"NE":"Lerga","NC":"Lerga","C":67},{"Z":4152,"N":"Lerín","O":430,"NE":"Lerin","NC":"Lerín","C":1347},{"Z":4153,"N":"Lesaka","O":431,"NE":"Lesaka","NC":"Lesaka","C":2172},{"Z":4154,"N":"Lezáun","O":432,"NE":"Lezaun","NC":"Lezáun","C":227},{"Z":4155,"N":"Liédena","O":433,"NE":"Ledea","NC":"Liédena","C":253},{"Z":4156,"N":"Lizoain-Arriasgoiti","O":434,"NE":"Lizoain-Arriasgoiti","NC":"Lizoain-Arriasgoiti","C":252},{"Z":4157,"N":"Lodosa","O":435,"NE":"Lodosa","NC":"Lodosa","C":3546},{"Z":4158,"N":"Lónguida/Longida","O":436,"NE":"Longida","NC":"Lónguida","C":252},{"Z":4029,"N":"Arcos (Los)","O":307,"NE":"Los Arcos","NC":"Los Arcos","C":925},{"Z":4159,"N":"Lumbier","O":437,"NE":"Irunberri","NC":"Lumbier","C":1134},{"Z":4160,"N":"Luquin","O":438,"NE":"Lukin","NC":"Luquin","C":107},{"Z":4161,"N":"Mañeru","O":439,"NE":"Mañeru","NC":"Mañeru","C":344},{"Z":4162,"N":"Marañón","O":440,"NE":"Marañon","NC":"Marañón","C":47},{"Z":4163,"N":"Marcilla","O":441,"NE":"Martzilla","NC":"Marcilla","C":2017},{"Z":4164,"N":"Mélida","O":442,"NE":"Melida","NC":"Mélida","C":582},{"Z":4165,"N":"Mendavia","O":443,"NE":"Mendabia","NC":"Mendavia","C":2794},{"Z":4166,"N":"Mendaza","O":444,"NE":"Mendaza","NC":"Mendaza","C":260},{"Z":4167,"N":"Mendigorría","O":445,"NE":"Mendigorria","NC":"Mendigorría","C":827},{"Z":4168,"N":"Metauten","O":446,"NE":"Metauten","NC":"Metauten","C":248},{"Z":4169,"N":"Milagro","O":447,"NE":"Milagro","NC":"Milagro","C":2217},{"Z":4170,"N":"Mirafuentes","O":448,"NE":"Mirafuentes","NC":"Mirafuentes","C":49},{"Z":4171,"N":"Miranda de Arga","O":449,"NE":"Miranda Arga","NC":"Miranda de Arga","C":693},{"Z":4172,"N":"Monreal","O":450,"NE":"Elo","NC":"Monreal","C":367},{"Z":4173,"N":"Monteagudo","O":451,"NE":"Monteagudo","NC":"Monteagudo","C":873},{"Z":4174,"N":"Morentin","O":452,"NE":"Morentin","NC":"Morentin","C":110},{"Z":4175,"N":"Mues","O":453,"NE":"Mues","NC":"Mués","C":72},{"Z":4176,"N":"Murchante","O":454,"NE":"Murchante","NC":"Murchante","C":2856},{"Z":4177,"N":"Murieta","O":455,"NE":"Murieta","NC":"Murieta","C":262},{"Z":4178,"N":"Murillo el Cuende","O":456,"NE":"Murillo el Cuende","NC":"Murillo el Cuende","C":495},{"Z":4179,"N":"Murillo el Fruto","O":457,"NE":"Murillo el Fruto","NC":"Murillo el Fruto","C":509},{"Z":4180,"N":"Muruzábal","O":458,"NE":"Muruzabal","NC":"Muruzábal","C":216},{"Z":4181,"N":"Navascués","O":459,"NE":"Nabaskoze","NC":"Navascués","C":150},{"Z":4182,"N":"Nazar","O":460,"NE":"Nazar","NC":"Nazar","C":37},{"Z":4088,"N":"Noáin (Valle de Elorz)","O":366,"NE":"Noain Elortzibar","NC":"Noain","C":5574},{"Z":4183,"N":"Obanos","O":461,"NE":"Obanos","NC":"Obanos","C":681},{"Z":4185,"N":"Ochagavía/Otsagabia","O":463,"NE":"Otsagabia","NC":"Ochagavía","C":501},{"Z":4184,"N":"Oco","O":462,"NE":"Oko","NC":"Oco","C":61},{"Z":4186,"N":"Odieta","O":464,"NE":"Odieta","NC":"Odieta","C":302},{"Z":4187,"N":"Oitz","O":465,"NE":"Oitz","NC":"Oitz","C":111},{"Z":4188,"N":"Olaibar","O":466,"NE":"Olaibar","NC":"Oláibar","C":227},{"Z":4189,"N":"Olazti/Olazagutía","O":467,"NE":"Olatzagutia","NC":"Olazagutía","C":1170},{"Z":4190,"N":"Olejua","O":468,"NE":"Olexua","NC":"Olejua","C":44},{"Z":4191,"N":"Olite","O":469,"NE":"Erriberri","NC":"Olite","C":3018},{"Z":4194,"N":"Ollo","O":472,"NE":"Ollaran","NC":"Ollo","C":315},{"Z":4192,"N":"Olóriz","O":470,"NE":"Oloritz","NC":"Olóriz","C":159},{"Z":4195,"N":"Orbaizeta","O":473,"NE":"Orbaizeta","NC":"Orbaizeta","C":180},{"Z":4196,"N":"Orbara","O":474,"NE":"Orbara","NC":"Orbara","C":39},{"Z":4197,"N":"Orísoain","O":475,"NE":"Orisoain","NC":"Orísoain","C":70},{"Z":4906,"N":"Orkoien","O":547,"NE":"Orkoien","NC":"Orkoien","C":2553},{"Z":4198,"N":"Oronz/Orontze","O":476,"NE":"Orontze","NC":"Oronz","C":36},{"Z":4199,"N":"Orotz-Betelu","O":477,"NE":"Orotz-Betelu","NC":"Orotz-Betelu","C":150},{"Z":4200,"N":"Oteiza","O":478,"NE":"Oteitza","NC":"Oteiza","C":764},{"Z":40,"N":"Iruña","O":10,"NE":"Iruñea","NC":"Pamplona-Iruña","C":147803},{"Z":4202,"N":"Peralta","O":479,"NE":"Azkoien","NC":"Peralta","C":4326},{"Z":4203,"N":"Petilla de Aragón","O":480,"NE":"Petilla Aragoi","NC":"Petilla de Aragón","C":40},{"Z":4204,"N":"Piedramillera","O":481,"NE":"Piedramillera","NC":"Piedramillera","C":37},{"Z":4205,"N":"Pitillas","O":482,"NE":"Pitillas","NC":"Pitillas","C":427},{"Z":4206,"N":"Puente la Reina/Gares","O":483,"NE":"Gares","NC":"Puente la Reina","C":2095},{"Z":4207,"N":"Pueyo","O":484,"NE":"Puiu","NC":"Pueyo","C":271},{"Z":4208,"N":"Ribaforada","O":485,"NE":"Ribaforada","NC":"Ribaforada","C":2569},{"Z":4209,"N":"Romanzado","O":486,"NE":"Erromantzatua","NC":"Romanzado","C":157},{"Z":4210,"N":"Roncal/Erronkari","O":487,"NE":"Erronkari","NC":"Roncal","C":199},{"Z":4211,"N":"Orreaga/Roncesvalles","O":488,"NE":"Orreaga","NC":"Roncesvalles","C":25},{"Z":4212,"N":"Sada","O":489,"NE":"Zare","NC":"Sada","C":151},{"Z":4213,"N":"Saldías","O":490,"NE":"Saldias","NC":"Saldias","C":105},{"Z":4214,"N":"Salinas de Oro","O":491,"NE":"Jaitz","NC":"Salinas de Oro","C":93},{"Z":4215,"N":"San Adrián","O":492,"NE":"San Adrian","NC":"San Adrián","C":4649},{"Z":4217,"N":"San Martín de Unx","O":494,"NE":"San Martín de Unx","NC":"San Martín de Unx","C":337},{"Z":4216,"N":"Sangüesa/Zangoza","O":493,"NE":"Zangoza","NC":"Sangüesa","C":3882},{"Z":4219,"N":"Sansol","O":495,"NE":"Santsol","NC":"Sansol","C":88},{"Z":4220,"N":"Santacara","O":496,"NE":"Santakara","NC":"Santacara","C":752},{"Z":4221,"N":"Doneztebe/Santesteban","O":497,"NE":"Doneztebe","NC":"Santesteban","C":1211},{"Z":4222,"N":"Sarriés/Sartze","O":498,"NE":"Sartze","NC":"Sarriés","C":63},{"Z":4223,"N":"Sartaguda","O":499,"NE":"Sartaguda","NC":"Sartaguda","C":995},{"Z":4224,"N":"Sesma","O":500,"NE":"Sesma","NC":"Sesma","C":914},{"Z":4225,"N":"Sorlada","O":501,"NE":"Sorlada","NC":"Sorlada","C":36},{"Z":4226,"N":"Sunbilla","O":502,"NE":"Sunbilla","NC":"Sunbilla","C":585},{"Z":4227,"N":"Tafalla","O":503,"NE":"Tafalla","NC":"Tafalla","C":8226},{"Z":4228,"N":"Tiebas-Muruarte de Reta","O":504,"NE":"Tiebas-Muru Artederreta","NC":"Tiebas-Muruarte de Reta","C":496},{"Z":4229,"N":"Tirapu","O":505,"NE":"Tirapu","NC":"Tirapu","C":50},{"Z":4230,"N":"Torralba del Río","O":506,"NE":"Torralba del Rio","NC":"Torralba del Río","C":107},{"Z":4231,"N":"Torres del Río","O":507,"NE":"Torres del Rio","NC":"Torres del Río","C":115},{"Z":4232,"N":"Tudela","O":508,"NE":"Tutera","NC":"Tudela","C":25152},{"Z":4233,"N":"Tulebras","O":509,"NE":"Tulebras","NC":"Tulebras","C":96},{"Z":4234,"N":"Ucar","O":510,"NE":"Ukar","NC":"Úcar","C":144},{"Z":4123,"N":"Uharte-Arakil","O":401,"NE":"Uharte Arakil","NC":"Uharte Arakil","C":654},{"Z":4235,"N":"Ujué","O":511,"NE":"Uxue","NC":"Ujué","C":166},{"Z":4236,"N":"Ultzama","O":512,"NE":"Ultzama","NC":"Ultzama","C":1324},{"Z":4237,"N":"Unciti","O":513,"NE":"Untzitibar","NC":"Unciti","C":195},{"Z":4238,"N":"Unzué","O":514,"NE":"Untzue","NC":"Unzué","C":110},{"Z":4239,"N":"Urdazubi/Urdax","O":515,"NE":"Urdazubi","NC":"Urdax","C":310},{"Z":4240,"N":"Urdiain","O":516,"NE":"Urdiain","NC":"Urdiain","C":531},{"Z":4241,"N":"Urraul Alto","O":517,"NE":"Urraulgoiti","NC":"Urraul Alto","C":134},{"Z":4242,"N":"Urraul Bajo","O":518,"NE":"Urraulbeiti","NC":"Urraul Bajo","C":253},{"Z":4244,"N":"Urrotz","O":520,"NE":"Urrotz","NC":"Urrotz","C":156},{"Z":4243,"N":"Urroz","O":519,"NE":"Urroz","NC":"Urroz","C":314},{"Z":4245,"N":"Urzainqui/Urzainki","O":521,"NE":"Urzainki","NC":"Urzainqui","C":83},{"Z":4246,"N":"Uterga","O":522,"NE":"Uterga","NC":"Uterga","C":140},{"Z":4247,"N":"Uztárroz/Uztarroze","O":523,"NE":"Uztarroze","NC":"Uztárroz","C":152},{"Z":4248,"N":"Luzaide/Valcarlos","O":524,"NE":"Luzaide","NC":"Valcarlos","C":295},{"Z":4249,"N":"Valtierra","O":525,"NE":"Valtierra","NC":"Valtierra","C":1885},{"Z":4251,"N":"Viana","O":527,"NE":"Viana","NC":"Viana","C":3110},{"Z":4252,"N":"Vidángoz/Bidankoze","O":528,"NE":"Bidankoze","NC":"Vidángoz","C":87},{"Z":4254,"N":"Villafranca","O":530,"NE":"Villafranca","NC":"Villafranca","C":1920},{"Z":4255,"N":"Villamayor de Monjardín","O":531,"NE":"Villamayor de Monjardin","NC":"Villamayor de Monjardín","C":102},{"Z":4256,"N":"Hiriberri/Villanueva de Aezkoa","O":532,"NE":"Hiriberri","NC":"Villanueva de Aezkoa","C":109},{"Z":4257,"N":"Villatuerta","O":533,"NE":"Villatuerta","NC":"Villatuerta","C":866},{"Z":4258,"N":"Villava/Atarrabia","O":534,"NE":"Atarrabia","NC":"Villava","C":7841},{"Z":4260,"N":"Yerri/Deierri","O":536,"NE":"Deierri","NC":"Yerri","C":1245},{"Z":4261,"N":"Yesa","O":537,"NE":"Esa","NC":"Yesa","C":235},{"Z":4262,"N":"Zabalza","O":538,"NE":"Zabaltza","NC":"Zabalza","C":206},{"Z":4073,"N":"Ziordia","O":351,"NE":"Ziordia","NC":"Ziordia","C":315},{"Z":4907,"N":"Zizur Mayor/Zizur Nagusia","O":548,"NE":"Zizur Nagusia","NC":"Zizur Mayor","C":10677},{"Z":4263,"N":"Zubieta","O":539,"NE":"Zubieta","NC":"Zubieta","C":236},{"Z":4264,"N":"Zugarramurdi","O":540,"NE":"Zugarramurdi","NC":"Zugarramurdi","C":179},{"Z":4265,"N":"Zúñiga","O":541,"NE":"Zuñiga","NC":"Zúñiga","C":86}]};
    if(navigator.appVersion.indexOf('Panasonic')>-1){
      var select=document.createElement('x-select');
      select.className='tableSelect';
      //select.addEventListener('change',this.sendLugarclick.bind(this),true);
      var _this=this;
      select.id='tableSelect'+this.id;

      for(var i=0;i<gen.zonas.length;i++){
        var opt1=document.createElement('a');
        opt1.id=gen.zonas[i]['NC']+gen.zonas[i]['Z'];
        opt1.innerHTML=gen.zonas[i]['NC'];
        opt1.setAttribute('value',gen.zonas[i]['Z']);
        opt1.tabIndex=1;
        opt1.className='dropdown-content-a';
        opt1.style.color='black';
        opt1.style.paddingLeft='12px';
        opt1.style.textDecoration='none';
        opt1.style.display='block';
        opt1.addEventListener('click',function(event){
          event.stopPropagation();
          select.val=event.target.getAttribute('value');
          select.$.selectBut.innerHTML=event.target.innerText;
          select.focus();
          _this.sendPlaceclick(event.target.getAttribute('value'));
        },true);
        opt1.addEventListener('focus',function(event){
           event.target.style.border='solid 5px orange';
        });
        opt1.addEventListener('blur',function(event){
           event.target.style.border='';
        });


        select.$.myDropdown.appendChild(opt1);
        //select.style.position='fixed';

      }
      /*var munAr=document.createElement('a');
      munAr.id='arMun';
      munAr.style.fontWeight='bold';
      munAr.style.paddingLeft='12px';
      munAr.style.fontColor='black';
      munAr.innerHTML='Municipios de Álava';
      select.$.myDropdown.appendChild(munAr);

      for(var i=0;i<ar.zonas.length;i++){
        var opt1=document.createElement('a');
        opt1.id=ar.zonas[i]['NC']+ar.zonas[i]['Z'];
        opt1.innerHTML=ar.zonas[i]['NC'];
        opt1.setAttribute('value',ar.zonas[i]['Z']);
        opt1.tabIndex=1;
        opt1.className='dropdown-content-a';
        opt1.style.color='black';
        opt1.style.paddingLeft='17px';
        opt1.style.textDecoration='none';
        opt1.style.display='block';
        opt1.addEventListener('click',function(event){
          event.stopPropagation();
          select.val=event.target.getAttribute('value');
          select.$.selectBut.innerHTML=event.target.innerText;
          select.focus();
          _this.sendPlaceclick(event.target.getAttribute('value'));
        },true);
        opt1.addEventListener('focus',function(event){
           event.target.style.border='solid 5px orange';
        });
        opt1.addEventListener('blur',function(event){
           event.target.style.border='';
        });


        select.$.myDropdown.appendChild(opt1);
        //select.style.position='fixed';

      }
      var munViz=document.createElement('a');
      munViz.id='vizMun';
      munViz.style.fontWeight='bold';
      munViz.style.paddingLeft='12px';
      munViz.innerHTML='Municipios de Bizkaia';
      select.$.myDropdown.appendChild(munViz);

      for(var i=0;i<viz.zonas.length;i++){
        var opt1=document.createElement('a');
        opt1.id=viz.zonas[i]['NC']+viz.zonas[i]['Z'];
        opt1.innerHTML=viz.zonas[i]['NC'];
        opt1.setAttribute('value',viz.zonas[i]['Z']);
        opt1.tabIndex=1;
        opt1.className='dropdown-content-a';
        opt1.style.color='black';
        opt1.style.paddingLeft='17px';
        opt1.style.textDecoration='none';
        opt1.style.display='block';
        opt1.addEventListener('click',function(event){
          event.stopPropagation();
          select.val=event.target.getAttribute('value');
          select.$.selectBut.innerHTML=event.target.innerText;
          select.focus();
          _this.sendPlaceclick(event.target.getAttribute('value'));
        },true);
        opt1.addEventListener('focus',function(event){
           event.target.style.border='solid 5px orange';
        });
        opt1.addEventListener('blur',function(event){
           event.target.style.border='';
        });


        select.$.myDropdown.appendChild(opt1);
        //select.style.position='fixed';

      }
      var munGip=document.createElement('a');
      munGip.id='gipMun';
      munGip.style.fontWeight='bold';
      munGip.style.paddingLeft='12px';
      munGip.innerHTML='Municipios de Guipuzcoa';
      select.$.myDropdown.appendChild(munGip);

      for(var i=0;i<gip.zonas.length;i++){
        var opt1=document.createElement('a');
        opt1.id=gip.zonas[i]['NC']+gip.zonas[i]['Z'];
        opt1.innerHTML=gip.zonas[i]['NC'];
        opt1.setAttribute('value',gip.zonas[i]['Z']);
        opt1.tabIndex=1;
        opt1.className='dropdown-content-a';
        opt1.style.color='black';
        opt1.style.paddingLeft='17px';
        opt1.style.textDecoration='none';
        opt1.style.display='block';
        opt1.addEventListener('click',function(event){
          event.stopPropagation();
          select.val=event.target.getAttribute('value');
          select.$.selectBut.innerHTML=event.target.innerText;
          select.focus();
          _this.sendPlaceclick(event.target.getAttribute('value'));
        },true);
        opt1.addEventListener('focus',function(event){
           event.target.style.border='solid 5px orange';
        });
        opt1.addEventListener('blur',function(event){
           event.target.style.border='';
        });


        select.$.myDropdown.appendChild(opt1);
        //select.style.position='fixed';

      }
       /*var munNav=document.createElement('a');
      munNav.id='navMun';
      munNav.style.fontWeight='bold';
      munNav.style.paddingLeft='12px';
      munNav.innerHTML='Municipios de Navarra';
      select.$.myDropdown.appendChild(munNav);

      for(var i=0;i<nav.zonas.length;i++){
        var opt1=document.createElement('a');
        opt1.id=nav.zonas[i]['NC']+nav.zonas[i]['Z'];
        opt1.innerHTML=nav.zonas[i]['NC'];
        opt1.setAttribute('value',nav.zonas[i]['Z']);
        opt1.tabIndex=1;
        opt1.className='dropdown-content-a';
        opt1.style.color='black';
        opt1.style.paddingLeft='17px';
        opt1.style.textDecoration='none';
        opt1.style.display='block';
        opt1.addEventListener('click',function(event){
          event.stopPropagation();
          select.val=event.target.getAttribute('value');
          select.$.selectBut.innerHTML=event.target.innerText;
          select.focus();
          _this.sendPlaceclick(event.target.getAttribute('value'));
        },true);
        opt1.addEventListener('focus',function(event){
           event.target.style.border='solid 5px orange';
        });
        opt1.addEventListener('blur',function(event){
           event.target.style.border='';
        });


        select.$.myDropdown.appendChild(opt1);
        //select.style.position='fixed';

      }*/
      select.style.zIndex=999999999999999;
      select.tabIndex=1;
      select.onfocus=function(){
        select.$.selectBut.style.border='solid 5px orange';

      }
      select.onblur=function(){
        select.$.selectBut.style.border='';
      }
      select.setAttribute('val',this.activePlace);
    }
    else{
      var _this=this;
      var select=document.createElement('select');
      select.className='form-control tableSelect';
      select.addEventListener('change',function(event){
        _this.sendPlaceclick(event.target.value);
      },true);
      select.id='tableSelect'+this.id;
      //var lugares=['alava','vizcaya','guipuzcoa','cav','navarra','estado'];


      for(var i=0;i<gen.zonas.length;i++){
        var opt1=document.createElement('option');
        opt1.id=gen.zonas[i]['NC']+gen.zonas[i]['Z'];
        opt1.innerHTML=gen.zonas[i]['NC'];
        opt1.value=gen.zonas[i]['Z'];
        //opt1.addEventListener('click',this.sendPlaceclick.bind(this),true);
        select.appendChild(opt1);
      }
      /*var optG1=document.createElement('optgroup');
      optG1.id='arMun';
      optG1.label='Municipios de Alava';

      for (var i=0;i<ar.zonas.length;i++){
        var opt1=document.createElement('option');
        opt1.id=ar.zonas[i]['NC']+ar.zonas[i]['Z'];
        opt1.innerHTML=ar.zonas[i]['NC'];
        opt1.value=ar.zonas[i]['Z'];
        //opt1.addEventListener('click',this.sendPlaceclick.bind(this),true);
        optG1.appendChild(opt1);
      }
      select.appendChild(optG1);

      var optG1=document.createElement('optgroup');
      optG1.id='vizMun';
      optG1.label='Municipios de Bizkaia';
      for (var i=0;i<viz.zonas.length;i++){
        var opt1=document.createElement('option');
        opt1.id=viz.zonas[i]['NC']+viz.zonas[i]['Z'];
        opt1.innerHTML=viz.zonas[i]['NC'];
        opt1.value=viz.zonas[i]['Z'];
        //opt1.addEventListener('click',this.sendPlaceclick.bind(this),true);
        optG1.appendChild(opt1);
      }
      select.appendChild(optG1);

      var optG1=document.createElement('optgroup');
      optG1.id='gipMun';
      optG1.label='Municipios de Guipuzcoa';
      for (var i=0;i<gip.zonas.length;i++){
        var opt1=document.createElement('option');
        opt1.id=gip.zonas[i]['NC']+gip.zonas[i]['Z'];
        opt1.innerHTML=gip.zonas[i]['NC'];
        opt1.value=gip.zonas[i]['Z'];
        //opt1.addEventListener('click',this.sendPlaceclick.bind(this),true);
        optG1.appendChild(opt1);
      }
      select.appendChild(optG1);

       /*var optG1=document.createElement('optgroup');
       optG1.id='navMun';
      optG1.label='Municipios de Navarra';
      for (var i=0;i<nav.zonas.length;i++){
        var opt1=document.createElement('option');
         opt1.id=nav.zonas[i]['NC']+nav.zonas[i]['Z'];
        opt1.innerHTML=nav.zonas[i]['NC'];
        opt1.value=nav.zonas[i]['Z'];
        //opt1.addEventListener('click',this.sendPlaceclick.bind(this),true);
        optG1.appendChild(opt1);
      }
      select.appendChild(optG1);*/

      select.value=this.activePlace;
      select.tabIndex=1;
      select.onfocus=function(){
        select.style.border='solid 5px orange';
      }
      select.onblur=function(){
        select.style.border='';
      }
    }
    div10.appendChild(select);
    //div10.appendChild(form);


    return div10;
  }

  /*this.placeClick=function(event){
    var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
    mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,event.currentTarget.id);
    mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeTablePlace(agentToChange,event.currentTarget.id);
  }*/
  /*this.sendtipo=function(event){
    if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
      mediascape.AdaptationToolkit.uiComponents.loadingNotification();
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
      var _this=this;
      setTimeout(function(){
        var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
        var tip='tabletipo'+event.target.value;
        mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,_this.id,tip);
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeTableTipo(agentToChange,event.target.value,_this.id);
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
      },500);
    }
  }*/
  this.viewclick=function(event){
    if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
      mediascape.AdaptationToolkit.uiComponents.loadingNotification();
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
      event.preventDefault();
      var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
      var agents=agCtx.agents;
      var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
      var val=agentToChange;
      function filterById(el){
        if(el.id===val)return el;
      }

      var a=agents.filter(filterById);
      var scope=this;
      var b=a[0].capabilities.componentsStatus.filter(function(el,i){
        if(el.compId===scope.id)return el;
      });

      console.log('viewClick');
      var _this=this;
      setTimeout(function(){


        if(b[0].show===true){
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,_this.id,'hide');
          mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeViewSwVal(agentToChange,_this.id,false);
        }
        else{
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,_this.id,'show');
          mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeViewSwVal(agentToChange,_this.id,true);
        }
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
      },500);
    }
  }
  this.sendPlaceclick=function(v){
    if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
      mediascape.AdaptationToolkit.uiComponents.loadingNotification();
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
      var _this=this;
      setTimeout(function(){
        var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
        var lug='tablelug'+v;
        mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,_this.id,lug);
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeTablePlace(agentToChange,v,_this.id);
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
      },500);
    }
  }

}

var partyMap=function(){


  this.setID=function(resMapId){
    this.id=resMapId;
  }
  this.setName=function(n){
    this.name=n;
  }
  this.setViewStatus=function(stat){
    this.viewStatus=stat;
  }
  this.setTipoStatus=function(stat){
    this.tipo=stat;
  }
  this.setLugarStatus=function(stat){
    this.LugarStatus=stat;
  }
  this.render=function(){
    var div30=document.createElement('div');
    div30.className='col-md-12 tabla';



    var div32=document.createElement('div');
    div32.className='col-md-8 col-sm-8 col-xs-8 cityName';
    var p5=document.createElement('p');
    p5.className='text_ciudad';
    p5.innerHTML='MAPA DE RESULTADOS';
    p5.id='pmapa'+this.name;

    var br=document.createElement('br');
    p5.appendChild(br);

    var span3=document.createElement('span');
    span3.className='comparative';
    span3.innerHTML='COMPARATIVE';
    p5.appendChild(span3);

    div32.appendChild(p5);



    var s2=document.createElement('paper-switch');
    s2.id='viewCheck'+this.id;
    s2.className='col-md-4 col-sm-4 check-switch-eitb';
    s2.setAttribute('val',this.viewStatus);
    s2.addEventListener('click',this.viewclick.bind(this),true);
    //s2.style.position='absolute';
    s2.tabIndex=1;
    s2.onfocus=function(){
      s2.querySelector('#apagado').style.border='solid 5px orange';
    }
    s2.onblur=function(){
      s2.querySelector('#apagado').style.border='';
    }

    /*var form=document.createElement('form');
    var input1=document.createElement('input');
    input1.type='radio';
    //input1.checked=true;

    input1.value='C';
    input1.name='tipoe';
    input1.id='congInp'+this.id;
    var span1=document.createElement('span');


    var input2=document.createElement('input');
    input2.type='radio';
    //input2.checked=false;
    input2.value='S';
    input2.name='tipoe';
    input2.id='senInp'+this.id;
    var span2=document.createElement('span');


    if(this.tipo==='C'){
      input1.checked=true;
      input2.checked=false;
    }
    else if(this.tipo==='S'){
      input1.checked=false;
      input2.checked=true;
    }
    input1.tabIndex=1;
    input2.tabIndex=1;
    span1.appendChild(input1);
    var span3=document.createElement('span');
    span3.innerHTML='Congreso';
    span3.id='cong'+this.name;
    span1.appendChild(span3);

    span2.appendChild(input2);
    var span4=document.createElement('span');
    span4.innerHTML='Senado';
    span4.id='sen'+this.name;
    span2.appendChild(span4);

    form.appendChild(span1);
    input1.addEventListener('click',this.sendtipo.bind(this));
    input2.addEventListener('click',this.sendtipo.bind(this));
    //form.addEventListener('change',this.sendtipo.bind(this),true);

    var br=document.createElement('br');
    br.className='congreso-senado-br';
    form.appendChild(br);

    form.appendChild(span2);
    form.className='congreso-senado';

    input1.onfocus=function(){

      span1.style.border='5px solid orange';
    }
    input1.onblur=function(){
      span1.style.border='';
    }

    input2.onfocus=function(){

      span2.style.border='5px solid orange';
    }
    input2.onblur=function(){
      span2.style.border='';
    }*/
    if(navigator.appVersion.indexOf('Panasonic')>-1){

      var select=document.createElement('x-select');
      select.className='lugarSelect';
      //select.addEventListener('change',this.sendLugarclick.bind(this),true);
      var _this=this;
      select.id='lugarSelect'+this.id;
      var gen={"zonas":[{"Z":1,"N":"Alava-Araba","O":28,"NE":"Araba","NC":"Alava","C":1984},{"Z":2,"N":"Vizcaya","O":28,"NE":"Bizkaia","NC":"Bizkaia","C":1984},{"Z":3,"N":"Guipuzcoa","O":28,"NE":"Gipuzkoa","NC":"Guipúzcoa","C":1984},{"Z":5,"N":"CAV-EAE","O":28,"NE":"EAE","NC":"CAV","C":1984}]};
      for(var i=0;i<gen.zonas.length;i++){
        var opt1=document.createElement('a');
        opt1.id=gen.zonas[i]['NC']+gen.zonas[i]['Z'];
        opt1.innerHTML=gen.zonas[i]['NC'];
        opt1.setAttribute('value',gen.zonas[i]['Z']);
        opt1.tabIndex=1;
        opt1.className='dropdown-content-a';
        opt1.style.color='black';
        opt1.style.paddingLeft='12px';
        opt1.style.textDecoration='none';
        opt1.style.display='block';
        opt1.addEventListener('click',function(event){
          event.stopPropagation();
          select.val=event.target.getAttribute('value');
          select.$.selectBut.innerHTML=event.target.innerText;
          select.focus();
          _this.sendLugarclick(event.target.getAttribute('value'));
        },true);
        opt1.addEventListener('focus',function(event){
           event.target.style.border='solid 5px orange';
        });
        opt1.addEventListener('blur',function(event){
           event.target.style.border='';
        });


        select.$.myDropdown.appendChild(opt1);
        //select.style.position='fixed';
        select.style.zIndex=999999999999999;
      }

      select.tabIndex=1;
      select.onfocus=function(){
        select.$.selectBut.style.border='solid 5px orange';

      }
      select.onblur=function(){
        select.$.selectBut.style.border='';
      }
      select.setAttribute('val',this.LugarStatus);
    }
    else{
      var _this=this;
      var select=document.createElement('select');
      select.className='form-control lugarSelect';
      select.addEventListener('change',function(){
        _this.sendLugarclick(event.target.value);
      },true);
      select.id='lugarSelect'+this.id;
      //var lugares=['alava','vizcaya','guipuzcoa','cav','navarra','estado'];
      var gen={"zonas":[{"Z":1,"N":"Alava-Araba","O":28,"NE":"Araba","NC":"Alava","C":1984},{"Z":2,"N":"Vizcaya","O":28,"NE":"Bizkaia","NC":"Bizkaia","C":1984},{"Z":3,"N":"Guipuzcoa","O":28,"NE":"Gipuzkoa","NC":"Guipúzcoa","C":1984},{"Z":5,"N":"CAV-EAE","O":28,"NE":"EAE","NC":"CAV","C":1984}]};
      for(var i=0;i<gen.zonas.length;i++){
        var opt1=document.createElement('option');
        opt1.id=gen.zonas[i]['NC']+gen.zonas[i]['Z'];
        opt1.innerHTML=gen.zonas[i]['NC'];
        opt1.value=gen.zonas[i]['Z'];
        //opt1.addEventListener('click',this.sendLugarclick.bind(this),true);
        select.appendChild(opt1);
      }
      select.value=this.LugarStatus;
      select.tabIndex=1;
      select.onfocus=function(){
        select.style.border='solid 5px orange';
      }
      select.onblur=function(){
        select.style.border='';
      }
    }
    div30.appendChild(div32);
    div30.appendChild(s2);
    div30.appendChild(select);
    //div30.appendChild(form);
    return div30;

  }
  /*this.sendtipo=function(event){
    if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
      mediascape.AdaptationToolkit.uiComponents.loadingNotification();
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
      var _this=this;
      setTimeout(function(){
        var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
        var tip='maptipo'+event.target.value;
        mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,_this.id,tip);
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeTableTipo(agentToChange,event.target.value,_this.id);
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
      },500);
    }
  }*/
  this.sendLugarclick=function(v){
    if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
      mediascape.AdaptationToolkit.uiComponents.loadingNotification();
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
      var _this=this;
      setTimeout(function(){
        var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
        var lug='lugar'+v;
        mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,_this.id,lug);
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeLugar(agentToChange,v,_this.id);
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
      },500);
    }
  }
  this.viewclick=function(event){
    if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
      mediascape.AdaptationToolkit.uiComponents.loadingNotification();
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
      event.preventDefault();
      var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
      var agents=agCtx.agents;
      var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
      var val=agentToChange;
      function filterById(el){
        if(el.id===val)return el;
      }

      var a=agents.filter(filterById);
      var scope=this;
      var b=a[0].capabilities.componentsStatus.filter(function(el,i){
        if(el.compId===scope.id)return el;
      });

      console.log('viewClick');
      setTimeout(function(){
        if(b[0].show===true){
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'hide');
          mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeViewSwVal(agentToChange,scope.id,false);
        }
        else{
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'show');
          mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeViewSwVal(agentToChange,scope.id,true);
        }
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
      },500);
    }
  }
}
var pieChart=function(){


  this.setID=function(pieId){
    this.id=pieId;
  }
  this.setName=function(n){
    this.name=n;
  }
  this.setViewStatus=function(stat){
    this.viewStatus=stat;
  }
  this.setLugarStatus=function(stat){
    this.LugarStatus=stat;
  }
  this.setTipoStatus=function(stat){
    this.tipo=stat;
  }
  this.render=function(){
    var div30=document.createElement('div');
    div30.className='col-md-12 tabla';



    var div32=document.createElement('div');
    div32.className='col-md-8 col-sm-8 col-xs-8 cityName';
    var p5=document.createElement('p');
    p5.className='text_ciudad';
    p5.innerHTML='SECTORES';
    p5.id='pgraph'+this.name;

    var br=document.createElement('br');
    p5.appendChild(br);

    var span3=document.createElement('span');
    span3.className='comparative';
    span3.innerHTML='COMPARATIVE';
    p5.appendChild(span3);

    div32.appendChild(p5);



    var s2=document.createElement('paper-switch');
    s2.id='viewCheck'+this.id;
    s2.className='col-md-4 col-sm-4 check-switch-eitb-pie';
    s2.setAttribute('val',this.viewStatus);
    s2.addEventListener('click',this.viewclick.bind(this),true);
    //s2.style.position='absolute';

    s2.tabIndex=1;
    s2.onfocus=function(){
      s2.querySelector('#apagado').style.border='solid 5px orange';
    }
    s2.onblur=function(){
      s2.querySelector('#apagado').style.border='';
    }

     /*var form=document.createElement('form');
    var input1=document.createElement('input');
    input1.type='radio';
    //input1.checked=true;

    input1.value='C';
    input1.name='tipoe';
    input1.id='congInp'+this.id;
    var span1=document.createElement('span');


    var input2=document.createElement('input');
    input2.type='radio';
    //input2.checked=false;
    input2.value='S';
    input2.name='tipoe';
    input2.id='senInp'+this.id;
    var span2=document.createElement('span');


    if(this.tipo==='C'){
      input1.checked=true;
      input2.checked=false;
    }
    else if(this.tipo==='S'){
      input1.checked=false;
      input2.checked=true;
    }
    input1.tabIndex=1;
    input2.tabIndex=1;
    span1.appendChild(input1);
    var span3=document.createElement('span');
    span3.innerHTML='Congreso';
    span3.id='cong'+this.name;
    span1.appendChild(span3);

    span2.appendChild(input2);
    var span4=document.createElement('span');
    span4.id='sen'+this.name;
    span4.innerHTML='Senado';
    span2.appendChild(span4);

    input1.onfocus=function(){

      span1.style.border='5px solid orange';
    }
    input1.onblur=function(){
      span1.style.border='';
    }

    input2.onfocus=function(){

      span2.style.border='5px solid orange';
    }
    input2.onblur=function(){
      span2.style.border='';
    }

    form.appendChild(span1);
    input1.addEventListener('click',this.sendtipo.bind(this));
    input2.addEventListener('click',this.sendtipo.bind(this));
    //form.addEventListener('change',this.sendtipo.bind(this),true);

    var br=document.createElement('br');
    br.className='congreso-senado-br';
    form.appendChild(br);

    form.appendChild(span2);

    form.className='congreso-senado';*/


    /*if(navigator.appVersion.indexOf('Panasonic')>-1){

      var select=document.createElement('x-select');
      select.className='pieSelect';
      //select.addEventListener('change',this.sendLugarclick.bind(this),true);
      var _this=this;
      select.id='pieSelect'+this.id;
      var gen={"zonas":[{"Z":1,"N":"Alava-Araba","O":28,"NE":"Araba","NC":"Alava","C":1984},{"Z":2,"N":"Vizcaya","O":28,"NE":"Bizkaia","NC":"Vizcaya","C":1984},{"Z":3,"N":"Guipuzcoa","O":28,"NE":"Gipuzkoa","NC":"Guipúzcoa","C":1984},{"Z":5,"N":"CAV-EAE","O":28,"NE":"EAE","NC":"CAV","C":1984}]};
      for(var i=0;i<gen.zonas.length;i++){
        var opt1=document.createElement('a');
        opt1.id=gen.zonas[i]['NC']+gen.zonas[i]['Z'];
        opt1.innerHTML=gen.zonas[i]['NC'];
        opt1.setAttribute('value',gen.zonas[i]['Z']);
        opt1.tabIndex=1;
        opt1.className='dropdown-content-a';
        opt1.style.color='black';
        opt1.style.paddingLeft='12px';
        opt1.style.textDecoration='none';
        opt1.style.display='block';
        opt1.addEventListener('click',function(event){
          event.stopPropagation();
          select.val=event.target.getAttribute('value');
          select.$.selectBut.innerHTML=event.target.innerText;
          select.focus();
          _this.sendLugarclick(event.target.getAttribute('value'));
        },true);
        opt1.addEventListener('focus',function(event){
           event.target.style.border='solid 5px orange';
        });
        opt1.addEventListener('blur',function(event){
           event.target.style.border='';
        });


        select.$.myDropdown.appendChild(opt1);
        //select.style.position='fixed';
        select.style.zIndex=999999999999999;
      }

      select.tabIndex=1;
      select.onfocus=function(){
        select.$.selectBut.style.border='solid 5px orange';

      }
      select.onblur=function(){
        select.$.selectBut.style.border='';
      }
      select.setAttribute('val',this.LugarStatus);
    }
    else{
      var _this=this;
      var select=document.createElement('select');
      select.className='form-control pieSelect';
      select.addEventListener('change',function(event){
         _this.sendLugarclick(event.target.value);
      },true);
      select.id='pieSelect'+this.id;
      var gen={"zonas":[{"Z":1,"N":"Alava-Araba","O":28,"NE":"Araba","NC":"Alava","C":1984},{"Z":2,"N":"Vizcaya","O":28,"NE":"Bizkaia","NC":"Vizcaya","C":1984},{"Z":3,"N":"Guipuzcoa","O":28,"NE":"Gipuzkoa","NC":"Guipúzcoa","C":1984},{"Z":5,"N":"CAV-EAE","O":28,"NE":"EAE","NC":"CAV","C":1984}]};
      for(var i=0;i<gen.zonas.length;i++){
        var opt1=document.createElement('option');
        opt1.id=gen.zonas[i]['NC']+gen.zonas[i]['Z'];
        opt1.innerHTML=gen.zonas[i]['NC'];
        opt1.value=gen.zonas[i]['Z'];
        opt1.tabIndex=1;
        //opt1.addEventListener('click',this.sendLugarclick.bind(this),true);
        select.appendChild(opt1);
      }

      select.tabIndex=1;
      select.onfocus=function(){
        select.style.border='solid 5px orange';

      }
      select.onblur=function(){
        select.style.border='';
      }
      select.value=this.LugarStatus;
    }*/

    div30.appendChild(div32);
    div30.appendChild(s2);
    //div30.appendChild(select);
   // div30.appendChild(form);
    return div30;

  }
  this.sendtipo=function(event){
    if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
      mediascape.AdaptationToolkit.uiComponents.loadingNotification();
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
      var _this=this;
      setTimeout(function(){
        var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
        var tip='pietipo'+event.target.value;
        mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,_this.id,tip);
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeTableTipo(agentToChange,event.target.value,_this.id);
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
      },500);
    }
  }
  this.sendLugarclick=function(v){
    if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
      mediascape.AdaptationToolkit.uiComponents.loadingNotification();
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
      var _this=this;
      setTimeout(function(){
        var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
        var lug='pielug'+v;
        mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,_this.id,lug);
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changePiePlace(agentToChange,v,_this.id);
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
      },500);
    }
  }
  this.viewclick=function(event){
    if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
      mediascape.AdaptationToolkit.uiComponents.loadingNotification();
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
      event.preventDefault();
      var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
      var agents=agCtx.agents;
      var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
      var val=agentToChange;
      function filterById(el){
        if(el.id===val)return el;
      }

      var a=agents.filter(filterById);
      var scope=this;
      var b=a[0].capabilities.componentsStatus.filter(function(el,i){
        if(el.compId===scope.id)return el;
      });

      console.log('viewClick');
      setTimeout(function(){

        if(b[0].show===true){
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'hide');
          mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeViewSwVal(agentToChange,scope.id,false);
        }
        else{
          mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,scope.id,'show');
          mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeViewSwVal(agentToChange,scope.id,true);
        }
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
      },500);
    }
  }
}
var graph=function(){
  this.place='';
  this.setPlace=function(where){
    this.place=where;
  }
  this.setID=function(graphId){
    this.id=graphId;
  }
  this.setViewStatus=function(stat){
    this.viewStatus=stat;
  }
  this.render=function(){
    var div30=document.createElement('div');
    div30.className='col-md-12 emisora';



    var div32=document.createElement('div');
    div32.className='col-md-8 col-sm-8 col-xs-8 cityName';
    var p5=document.createElement('p');
    p5.className='text_ciudad';
    p5.innerHTML=this.place;

    var br=document.createElement('br');
    p5.appendChild(br);

    var span3=document.createElement('span');
    span3.className='comparative';
    span3.innerHTML='COMPARATIVE';
    p5.appendChild(span3);

    div32.appendChild(p5);



    var s2=document.createElement('paper-switch');
    s2.id='viewCheck'+this.id;
    s2.className='col-md-4 col-sm-4 check-switch-graphics';
    s2.setAttribute('val',this.viewStatus);
    s2.addEventListener('click',this.viewclick.bind(this),true);
    s2.style.position='absolute';

    div30.appendChild(div32);
    div30.appendChild(s2);
    return div30;

  }

  this.viewclick=function(event){
    if(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled===true){
      mediascape.AdaptationToolkit.uiComponents.loadingNotification();
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enabled=false;
      event.preventDefault();
      var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
      var agents=agCtx.agents;
      var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
      var val=agentToChange;
      function filterById(el){
        if(el.id===val)return el;
      }

      var a=agents.filter(filterById);
      var scope=this;
      var b=a[0].capabilities.componentsStatus.filter(function(el,i){
        if(el.compId===scope.id)return el;
      });

      console.log('viewClick');
      if(b[0].show===true){
        mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,'hide');
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeViewSwVal(agentToChange,this.id,false);
      }
      else{
        mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,'show');
        mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeViewSwVal(agentToChange,this.id,true);
      }
      mediascape.AdaptationToolkit.uiComponents.ctrlPanel.enableClicks();
    }
  }
}
var graphicSection=function(){
  this.tableComp=[];
  this.graphComps=[];
  this.partyMapComp=[];
  this.pieComp=[];
  this.addTableComp=function(c){
    this.tableComp.push(c);
  }

  this.addPartyMapComp=function(c){
    this.partyMapComp.push(c);
  }
  this.addPieComp=function(c){
    this.pieComp.push(c);
  }

  this.render=function(){
    var div1=document.createElement('div');
    div1.className='template-content-center';
    div1.id='graphicCont';
    var div2=document.createElement('div');
    div2.className='col-md-12 layout-columns';

    var div3=document.createElement('div');
    div3.className='col-md-6 clm_2_graph izda';

    var div4=document.createElement('div');
    div4.className='contenido_graphics';

    var div5=document.createElement('div');
    div5.className='col-md-12 ';


    div5.appendChild(this.tableComp[0].render());
    //div5.appendChild(this.partyMapComp[0].render());
    div5.appendChild(this.pieComp[0].render());
    div5.appendChild(this.pieComp[2].render());

    var div6=document.createElement('div');
    div6.className='col-md-6 clm_2_graph izda';

    var div7=document.createElement('div');
    div7.className='contenido_graphics ';

    var div8=document.createElement('div');
    div8.className='col-md-12 ';

    //div8.appendChild(this.tableComp[1].render());
    div8.appendChild(this.partyMapComp[0].render());
    div8.appendChild(this.pieComp[1].render());
    div8.appendChild(this.pieComp[3].render());

    div7.appendChild(div8);
    div6.appendChild(div7);

    div4.appendChild(div5);
    div3.appendChild(div4);

    div2.appendChild(div3);
    div2.appendChild(div6);

    div1.appendChild(div2);
    return div1;



  }
  this.setTableViewStatus=function(agentID){

    var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
    var agents=agCtx.agents;
    var agentToChange=agentID;

    var a=agents.filter(function(el){
      if(el.id===agentToChange)return el;
    });
    var scope=this;


    for(var i=0;i<this.tableComp.length;i++){

      var tab=this.tableComp[i].id;
      b=a[0].capabilities.componentsStatus.filter(function(el){
        if(el.compId===tab)return el;
      });


      if(b[0].show===true){
        this.tableComp[i].setViewStatus(true);
      }
      else{
        this.tableComp[i].setViewStatus(false);
      }
    }

  }

  this.setTablePlaceStatus=function(agentID){

    var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
    var agents=agCtx.agents;
    var agentToChange=agentID;
    //var AllLugar=['alava','vizcaya','guipuzcoa','cav','navarra','estado'];
    var a=agents.filter(function(el){
      if(el.id===agentToChange)return el;
    });
    var scope=this;

    for(var p=0;p<this.tableComp.length;p++){
    var v=this.tableComp[p].id;
    b=a[0].capabilities.componentsStatus.filter(function(el){
      if(el.compId===v)return el;
    });


      var matches = _.filter(
      b[0].customCmd,
      function( s ) { return s.indexOf( 'tablelug' ) !== -1; }
      );

      if(matches.length===0){
        if(document.querySelector('#'+this.tableComp[p].name).getAttribute('lugar')!==undefined &&
          document.querySelector('#'+this.tableComp[p].name).getAttribute('lugar')!==null){
          var initLug='';
          if(document.querySelector('#'+this.tableComp[p].name).getAttribute('lugar')==='alava'){
            initLug=1;
          }
          else if(document.querySelector('#'+this.tableComp[p].name).getAttribute('lugar')==='vizcaya'){
            initLug=2;
          }
          else if(document.querySelector('#'+this.tableComp[p].name).getAttribute('lugar')==='guipuzcoa'){
            initLug=3;
          }
          /*else if(document.querySelector('#'+this.tableComp[p].name).getAttribute('lugar')==='navarra'){
            initLug=4;
          }*/
          else if(document.querySelector('#'+this.tableComp[p].name).getAttribute('lugar')==='cav'){
            initLug=5;
          }
          /*else if(document.querySelector('#'+this.tableComp[p].name).getAttribute('lugar')==='estado'){
            initLug=6;
          }*/
          this.tableComp[p].setPlaceStatus(initLug);
        }
        else{
          this.tableComp[p].setPlaceStatus('5');
        }
      }
      else{
        var last=-1;
        /*for(var i=0;i<AllLugar.length;i++){
          if(b[0].customCmd.lastIndexOf('tablelug'+AllLugar[i])>last){
            last=b[0].customCmd.lastIndexOf('tablelug'+AllLugar[i]);
          }
        }*/
        last=matches[matches.length-1].split('tablelug')[1];
        if(last!==-1){
          this.tableComp[p].setPlaceStatus(last);
        }
        else{
          this.tableComp[p].setPlaceStatus('');
        }

      }
    }

  }
  this.setTableTipoStatus=function(agentID){

    var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
    var agents=agCtx.agents;
    var agentToChange=agentID;
    var AllTipo=['S','C'];
    var a=agents.filter(function(el){
      if(el.id===agentToChange)return el;
    });
    var scope=this;

    for(var p=0;p<this.tableComp.length;p++){
    var v=this.tableComp[p].id;
    b=a[0].capabilities.componentsStatus.filter(function(el){
      if(el.compId===v)return el;
    });


      if(b[0].customCmd.indexOf('tabletipoS')===-1 && b[0].customCmd.indexOf('tabletipoC')===-1){

        this.tableComp[p].setTipoStatus(document.querySelector('#'+this.tableComp[p].name).getAttribute('tipoEleccion'));
      }
      else{
        var last=-1;
        for(var i=0;i<AllTipo.length;i++){
          if(b[0].customCmd.lastIndexOf('tabletipo'+AllTipo[i])>last){
            last=b[0].customCmd.lastIndexOf('tabletipo'+AllTipo[i]);
          }
        }
        if(last!==-1){
          this.tableComp[p].setTipoStatus(b[0].customCmd[last].split('tabletipo')[1]);
        }
        else{
          this.tableComp[p].setTipoStatus('');
        }

      }
    }

  }


  this.setGraphsViewStatus=function(agentID){
    var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
    var agents=agCtx.agents;
    var agentToChange=agentID;

    var a=agents.filter(function(el){
      if(el.id===agentToChange)return el;
    });
    var scope=this;

    for(var i=0;i<this.graphComps.length;i++){

      var graphic=this.graphComps[i].id;
      b=a[0].capabilities.componentsStatus.filter(function(el){
        if(el.compId===graphic)return el;
      });


      if(b[0].show===true){
        this.graphComps[i].setViewStatus(true);
      }
      else{
        this.graphComps[i].setViewStatus(false);
      }

    }
  }
  this.setPieViewStatus=function(agentID){
    var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
    var agents=agCtx.agents;
    var agentToChange=agentID;

    var a=agents.filter(function(el){
      if(el.id===agentToChange)return el;
    });
    var scope=this;

    for(var p=0;p<this.pieComp.length;p++){
      var tab=this.pieComp[p].id;
      b=a[0].capabilities.componentsStatus.filter(function(el){
        if(el.compId===tab)return el;
      });


      if(b[0].show===true){
        this.pieComp[p].setViewStatus(true);
      }
      else{
        this.pieComp[p].setViewStatus(false);
      }
    }
}
this.setPieTipoStatus=function(agentID){

    var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
    var agents=agCtx.agents;
    var agentToChange=agentID;
    var AllTipo=['S','C'];
    var a=agents.filter(function(el){
      if(el.id===agentToChange)return el;
    });
    var scope=this;

    for(var p=0;p<this.pieComp.length;p++){
    var v=this.pieComp[p].id;
    b=a[0].capabilities.componentsStatus.filter(function(el){
      if(el.compId===v)return el;
    });


      if(b[0].customCmd.indexOf('pietipoS')===-1 && b[0].customCmd.indexOf('pietipoC')===-1){

        this.pieComp[p].setTipoStatus(document.querySelector('#'+this.pieComp[p].name).getAttribute('tipoEleccion'));
      }
      else{
        var last=-1;
        for(var i=0;i<AllTipo.length;i++){
          if(b[0].customCmd.lastIndexOf('pietipo'+AllTipo[i])>last){
            last=b[0].customCmd.lastIndexOf('pietipo'+AllTipo[i]);
          }
        }
        if(last!==-1){
          this.pieComp[p].setTipoStatus(b[0].customCmd[last].split('pietipo')[1]);
        }
        else{
          this.pieComp[p].setTipoStatus('');
        }

      }
    }

  }
this.setPiePlaceStatus=function(agentID){

    var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
    var agents=agCtx.agents;
    var agentToChange=agentID;
    //var AllLugar=['alava','vizcaya','guipuzcoa','cav','navarra','estado'];
    var a=agents.filter(function(el){
      if(el.id===agentToChange)return el;
    });
    var scope=this;

    for(var p=0;p<this.pieComp.length;p++){
      var v=this.pieComp[p].id;
      b=a[0].capabilities.componentsStatus.filter(function(el){
        if(el.compId===v)return el;
      });


       var matches = _.filter(
      b[0].customCmd,
      function( s ) { return s.indexOf('pielug') !== -1; }
      );

      if(matches.length===0){
        if(document.querySelector('#'+this.pieComp[p].name).getAttribute('lugar')!==undefined &&
          document.querySelector('#'+this.pieComp[p].name).getAttribute('lugar')!==null){
          var initLug='';
          if(document.querySelector('#'+this.pieComp[p].name).getAttribute('lugar')==='alava'){
            initLug=1;
          }
          else if(document.querySelector('#'+this.pieComp[p].name).getAttribute('lugar')==='vizcaya'){
            initLug=2;
          }
          else if(document.querySelector('#'+this.pieComp[p].name).getAttribute('lugar')==='guipuzcoa'){
            initLug=3;
          }
          /*else if(document.querySelector('#'+this.pieComp[p].name).getAttribute('lugar')==='navarra'){
            initLug=4;
          }*/
          else if(document.querySelector('#'+this.pieComp[p].name).getAttribute('lugar')==='cav'){
            initLug=5;
          }
          /*else if(document.querySelector('#'+this.pieComp[p].name).getAttribute('lugar')==='estado'){
            initLug=6;
          }*/
          this.pieComp[p].setLugarStatus(initLug);
        }
        else{
          this.pieComp[p].setLugarStatus('5');
        }
      }
      else{
        var last=-1;

        last=matches[matches.length-1].split('pielug')[1];
        if(last!==-1){
          this.pieComp[p].setLugarStatus(last);
        }
        else{
          this.pieComp[p].setLugarStatus('');
        }

      }
    }

  }
   this.setPartyMapTipoStatus=function(agentID){

    var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
    var agents=agCtx.agents;
    var agentToChange=agentID;
    var AllTipo=['S','C'];
    var a=agents.filter(function(el){
      if(el.id===agentToChange)return el;
    });
    var scope=this;

    for(var p=0;p<this.partyMapComp.length;p++){
      var v=this.partyMapComp[p].id;
      b=a[0].capabilities.componentsStatus.filter(function(el){
        if(el.compId===v)return el;
      });


        if(b[0].customCmd.indexOf('maptipoS')===-1 && b[0].customCmd.indexOf('maptipoC')===-1){

          this.partyMapComp[p].setTipoStatus(document.querySelector('#'+this.partyMapComp[p].name).getAttribute('tipoEleccion'));
        }
        else{
          var last=-1;
          for(var i=0;i<AllTipo.length;i++){
            if(b[0].customCmd.lastIndexOf('maptipo'+AllTipo[i])>last){
              last=b[0].customCmd.lastIndexOf('maptipo'+AllTipo[i]);
            }
          }
          if(last!==-1){
            this.partyMapComp[p].setTipoStatus(b[0].customCmd[last].split('maptipo')[1]);
          }
          else{
            this.partyMapComp[p].setTipoStatus('');
          }

        }
      }

  }

  this.setPartyMapViewStatus=function(agentID){
    var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
    var agents=agCtx.agents;
    var agentToChange=agentID;

    var a=agents.filter(function(el){
      if(el.id===agentToChange)return el;
    });
    var scope=this;
    for(var p=0;p<this.partyMapComp.length;p++){

      var tab=this.partyMapComp[p].id;
      b=a[0].capabilities.componentsStatus.filter(function(el){
        if(el.compId===tab)return el;
      });


      if(b[0].show===true){
        this.partyMapComp[p].setViewStatus(true);
      }
      else{
        this.partyMapComp[p].setViewStatus(false);
      }
    }
  }

 this.setPartyMapLugarStatus=function(agentID){

    var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
    var agents=agCtx.agents;
    var agentToChange=agentID;
    var AllLugar=['alava','vizcaya','guipuzcoa','cav'];
    var a=agents.filter(function(el){
      if(el.id===agentToChange)return el;
    });
    var scope=this;

    for(var p=0;p<this.partyMapComp.length;p++){
      var v=this.partyMapComp[p].id;
      b=a[0].capabilities.componentsStatus.filter(function(el){
        if(el.compId===v)return el;
      });


      var matches = _.filter(
      b[0].customCmd,
      function( s ) { return s.indexOf( 'lugar' ) !== -1; }
      );

      if(matches.length===0){
        if(document.querySelector('#'+this.partyMapComp[p].name).getAttribute('lugar')!==undefined &&
          document.querySelector('#'+this.partyMapComp[p].name).getAttribute('lugar')!==null){
          var initLug='';
          if(document.querySelector('#'+this.partyMapComp[p].name).getAttribute('lugar')==='alava'){
            initLug=1;
          }
          else if(document.querySelector('#'+this.partyMapComp[p].name).getAttribute('lugar')==='vizcaya'){
            initLug=2;
          }
          else if(document.querySelector('#'+this.partyMapComp[p].name).getAttribute('lugar')==='guipuzcoa'){
            initLug=3;
          }
          /*else if(document.querySelector('#'+this.partyMapComp[p].name).getAttribute('lugar')==='navarra'){
            initLug=4;
          }*/
          else if(document.querySelector('#'+this.partyMapComp[p].name).getAttribute('lugar')==='cav'){
            initLug=5;
          }
          /*else if(document.querySelector('#'+this.partyMapComp[p].name).getAttribute('lugar')==='estado'){
            initLug=6;
          }*/
          this.partyMapComp[p].setLugarStatus(initLug);
        }
        else{
          this.partyMapComp[p].setLugarStatus('5');
        }
      }
      else{
        var last=-1;

        last=matches[matches.length-1].split('lugar')[1];
        if(last!==-1){
          this.partyMapComp[p].setLugarStatus(last);
        }
        else{
          this.partyMapComp[p].setLugarStatus('');
        }

      }
    }

  }

}


window.ControlPanel = ControlPanel;
});
