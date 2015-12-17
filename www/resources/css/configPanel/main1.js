


var ControlPanel= function (url){

	this.items=[];
	this.activeSection='';
	this.activeDevice='';
	this.selfID='';
	this.selfIDNum='';
	this.showing=true;
	var devBox=null;
	var QRurl=url;
	var layoutSect1=null;
	var qrSect=null;
	var camerasSect=null;
	var graphicSect=null;
	var radioSect=null
	/* Kontruktorea gauza inizializatzen diren lekua */
	this.controlPanel = function(){

		var cmps=mediascape.AdaptationToolkit.componentManager.core.getComponents();
		console.log('Konstruktorea');
		//'../resources/css/configPanel/img/camara/logo_etb2.png'
		var comp='video1';

		function filterById(el){
			if(el.id===comp)return el;
		}
		var c=cmps.filter(filterById);

		var cam1=new camera();
		cam1.setID(c[0].getAttribute('compId'));
		cam1.setName(c[0].id);
		cam1.setImage('../resources/css/configPanel/img/camara/logo_etb2.png');


		comp='video2';
		c=cmps.filter(filterById);
		var cam2=new camera();
		cam2.setID(c[0].getAttribute('compId'));
		cam2.setName(c[0].id);
		cam2.setImage('../resources/css/configPanel/img/camara/logo_bildu.png');

		comp='video3';
		c=cmps.filter(filterById);
		var cam3=new camera();
		cam3.setID(c[0].getAttribute('compId'));
		cam3.setName(c[0].id);
		cam3.setImage('../resources/css/configPanel/img/camara/logos_partidos_PNV_BLANCO.png');

		/*comp='video4';
		c=cmps.filter(filterById);
		var cam4=new camera();
		cam4.setID(c[0].getAttribute('compId'));
		cam4.setName(c[0].id);
		cam4.setImage('../resources/css/configPanel/img/camara/logo_sozialista.png');

		comp='video5';
		c=cmps.filter(filterById);
		var cam5=new camera();
		cam5.setID(c[0].getAttribute('compId'));
		cam5.setName(c[0].id);
		cam5.setImage('../resources/css/configPanel/img/camara/logos_partidos_Populares_vascos_BLANCO.png');

		comp='video6';
		c=cmps.filter(filterById);
		var cam6=new camera();
		cam6.setID(c[0].getAttribute('compId'));
		cam6.setName(c[0].id);
		cam6.setImage('../resources/css/configPanel/img/camara/logos_partidos_Populares_genova_BLANCO.png');

		comp='video7';
		c=cmps.filter(filterById);
		var cam7=new camera();
		cam7.setID(c[0].getAttribute('compId'));
		cam7.setName(c[0].id);
		cam7.setImage('../resources/css/configPanel/img/camara/logos_partidos_Podemos_BLANCO.png');*/

		comp='results';
		c=cmps.filter(filterById);
		var resTable=new table();
		resTable.setID(c[0].getAttribute('compId'));

		comp='radio';
		c=cmps.filter(filterById);
		var radioComp=new radios();
		radioComp.setID(c[0].getAttribute('compId'));

		

		comp='graph1';
		c=cmps.filter(filterById);
		var iruneaGraph=new graph();
		iruneaGraph.setPlace('IRUNEA/PAMPLONA');
		iruneaGraph.setID(c[0].getAttribute('compId'));

		comp='graph2';
		c=cmps.filter(filterById);
		var bilboGraph=new graph();
		bilboGraph.setPlace('BILBAO');
		bilboGraph.setID(c[0].getAttribute('compId'));

		comp='graph3';
		c=cmps.filter(filterById);
		var donostiGraph=new graph();
		donostiGraph.setPlace('DONOSTIA/SAN SEBASTIAN');
		donostiGraph.setID(c[0].getAttribute('compId'));

		comp='graph4';
		c=cmps.filter(filterById);
		var gasteizGraph=new graph();
		gasteizGraph.setPlace('VITORIA-GASTEIZ');
		gasteizGraph.setID(c[0].getAttribute('compId'));



		camerasSect=new camerasSection();
		camerasSect.addCamera(cam1);
		camerasSect.addCamera(cam2);
		camerasSect.addCamera(cam3);
		/*camerasSect.addCamera(cam4);
		camerasSect.addCamera(cam5);
		camerasSect.addCamera(cam6);
		camerasSect.addCamera(cam7);*/


		graphicSect=new graphicSection();
		graphicSect.addTableComp(resTable);
		graphicSect.addGraphComp(iruneaGraph);
		graphicSect.addGraphComp(bilboGraph);
		graphicSect.addGraphComp(donostiGraph);
		graphicSect.addGraphComp(gasteizGraph);

		radioSect=new radioSection();
		radioSect.addComponent(radioComp);

		devBox=new deviceBox();
		var lay1=new layout();
		lay1.setName('menu');
		lay1.setImage('../resources/css/configPanel/img/layouts/layout_01.png');

		var lay2=new layout();
		lay2.setName('spinner');
		lay2.setImage('../resources/css/configPanel/img/layouts/layout_02.png');

		var lay3=new layout();
		lay3.setName('pip');
		lay3.setImage('../resources/css/configPanel/img/layouts/layout_03.png');

		var lay4=new layout();
		lay4.setName('customGrid');
		lay4.setImage('../resources/css/configPanel/img/layouts/layout_10.png');

		var lay5=new layout();
		lay5.setName('accordion');
		lay5.setImage('../resources/css/configPanel/img/layouts/layout_05.png');

		var lay6=new layout();
		lay6.setName('verticalMenu');
		lay6.setImage('../resources/css/configPanel/img/layouts/layout_06.png');

		var lay7=new layout();
		lay7.setName('horizontal');
		lay7.setImage('../resources/css/configPanel/img/layouts/layout_09.png');

		var lay8=new layout();
		lay8.setName('carousel');
		lay8.setImage('../resources/css/configPanel/img/layouts/layout_08.png');

		var lay9=new layout();
		lay9.setName('divided');
		lay9.setImage('../resources/css/configPanel/img/layouts/layout_06.png');

		layoutSect1=new layoutSection();
		layoutSect1.addLayout(lay1);
		layoutSect1.addLayout(lay2);
		layoutSect1.addLayout(lay3);
		layoutSect1.addLayout(lay4);
		layoutSect1.addLayout(lay5);
		layoutSect1.addLayout(lay6);
		layoutSect1.addLayout(lay7);
		layoutSect1.addLayout(lay8);
		layoutSect1.addLayout(lay9);
		qrSect=new qrSection(QRurl);
		
		//sidebar menu
		var menu1=new menu();

		var item1=new menuItem();
		item1.setText('Add device');
		item1.setIcon('zmdi zmdi-plus');
		item1.setSection('AddDevice');
		menu1.addItem(item1);

		var item2=new menuItem();
		item2.setText('Layouts');
		item2.setIcon('zmdi zmdi-view-quilt');
		item2.setSection('layouts');
		menu1.addItem(item2);



		var item3=new menuItem();
		item3.setText('Cameras');
		item3.setIcon('zmdi zmdi-videocam');
		item3.setSection('cameras');
		menu1.addItem(item3);

		var item4=new menuItem();
		item4.setText('Twitter');
		item4.setIcon('zmdi zmdi-twitter');
		item4.setSection('twitter');
		menu1.addItem(item4);

		var item5=new menuItem();
		item5.setText('Radio');
		item5.setIcon('zmdi zmdi-radio');
		item5.setSection('radio');
		menu1.addItem(item5);

		var item6=new menuItem();
		item6.setText('Graphics');
		item6.setIcon('zmdi zmdi-equalizer');
		item6.setSection('graphics');
		menu1.addItem(item6);




		this.addItem(menu1);



		document.body.appendChild(this.render(''));





	}
	this.addItem=function(item){
		this.items.push(item);
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

			container.querySelector('#devNum').innerHTML=a[0]._id+1;
			mediascape.AdaptationToolkit.uiComponents.ctrlPanel.selfIDNum=a[0]._id+1;

			var val=event.detail.agentid;
			var b=agents.filter(filterById);





			if(agCtx.agents.length>1 && devBox.devices.length===0)
			{
				for(var i=0;i<agCtx.agents.length;i++){
					var dev1=new device();
					if(agCtx.agents[i].capabilities.platform.deviceType==='TV'){
						
						dev1.setIcon('TV_'+(agCtx.agents[i]._id+1)+'.png');
					}
					else if(agCtx.agents[i].capabilities.platform.deviceType==='desktop' || agCtx.agents[i].capabilities.platform.deviceType==='Desktop')
					{
						
						dev1.setIcon('LAPTOP_'+(agCtx.agents[i]._id+1)+'.png');
					}
					else if(agCtx.agents[i].capabilities.platform.deviceType==='Tablet')
					{
						
						dev1.setIcon('TABLET_'+(agCtx.agents[i]._id+1)+'.png');
					}
					else if(agCtx.agents[i].capabilities.platform.deviceType==='Mobile' || agCtx.agents[i].capabilities.platform.deviceType==='mobile')
					{
						
						dev1.setIcon('MOVIL_'+(agCtx.agents[i]._id+1)+'.png');
					}
					dev1.setID(agCtx.agents[i].id);


					var twitterSect=new twitterSection();
					


					if(i===0){
						var section2=new section();
						section2.setName('AddDevice');
						section2.addItem(qrSect);
						this.addItem(section2);
						container.appendChild(section2.render());
					}

					var section1=new section();
					section1.setName(agCtx.agents[i].id+'layouts');
					section1.addItem(devBox);
					layoutSect1.setActiveLayout(agCtx.agents[i].capabilities.layoutStatus);
					section1.addItem(layoutSect1);
					this.addItem(section1);
					container.appendChild(section1.render());

					var section3=new section();
					section3.setName(agCtx.agents[i].id+'cameras');
					section3.addItem(devBox);
					camerasSect.setCamsViewStatus(agCtx.agents[i].id);
					camerasSect.setCamsSoundStatus(agCtx.agents[i].id);
					section3.addItem(camerasSect);
					this.addItem(section3);
					container.appendChild(section3.render());

					var section4=new section();
					section4.setName(agCtx.agents[i].id+'twitter');
					section4.addItem(devBox);
					section4.addItem(twitterSect);
					this.addItem(section4);
					container.appendChild(section4.render());

					var section5=new section();
					section5.setName(agCtx.agents[i].id+'radio');
					section5.addItem(devBox);
					radioSect.setRadioViewStatus(agCtx.agents[i].id);
					section5.addItem(radioSect);
					this.addItem(section5);
					container.appendChild(section5.render());

					var section6=new section();
					section6.setName(agCtx.agents[i].id+'graphics');
					section6.addItem(devBox);
					graphicSect.setTableViewStatus(agCtx.agents[i].id);
					graphicSect.setTableDataStatus(agCtx.agents[i].id);
					graphicSect.setGraphsViewStatus(agCtx.agents[i].id);
					section6.addItem(graphicSect);
					this.addItem(section6);
					container.appendChild(section6.render());

					$("[name='twitter-checkbox']").bootstrapSwitch();
					$("[name='set-graphic']").bootstrapSwitch();
					$("[name='set-graphic-emisora']").bootstrapSwitch();
					$("[name='set-camara']").bootstrapSwitch();
					$("[name='set-graphic-camara']").bootstrapSwitch();
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
				/* ERABILI gailua gehitzeko
				*event.detail.profile.deviceType
				*	  Desktop, tablet, mobile, tv
				*/
				if(event.detail.profile.deviceType==='TV'){
					
					dev1.setIcon('TV_'+(b[0]._id+1)+'.png');
				}
				else if(event.detail.profile.deviceType==='desktop' || event.detail.profile.deviceType==='Desktop')
				{
					
					dev1.setIcon('LAPTOP_'+(b[0]._id+1)+'.png');
				}
				else if(event.detail.profile.deviceType==='Tablet')
				{
					
					dev1.setIcon('TABLET_'+(b[0]._id+1)+'.png');
				}
				else if(event.detail.profile.deviceType==='mobile')
				{
			
					dev1.setIcon('MOVIL_'+(b[0]._id+1)+'.png');
				}

				if(devBox.devices.length===0)
				{/* Agentid-a * event.detail.agentid*/
					dev1.setID(event.detail.agentid);


					var twitterSect=new twitterSection();
					



					var section2=new section();
					section2.setName('AddDevice');
					section2.addItem(qrSect);
					this.addItem(section2);
					container.appendChild(section2.render());

					var section1=new section();
					section1.setName(event.detail.agentid+'layouts');
					section1.addItem(devBox);
					layoutSect1.setActiveLayout(b[0].capabilities.layoutStatus);
					section1.addItem(layoutSect1);
					this.addItem(section1);
					container.appendChild(section1.render());



					var section3=new section();
					section3.setName(event.detail.agentid+'cameras');
					section3.addItem(devBox);
					camerasSect.setCamsViewStatus(event.detail.agentid);
					camerasSect.setCamsSoundStatus(event.detail.agentid);
					section3.addItem(camerasSect);
					this.addItem(section3);
					container.appendChild(section3.render());

					var section4=new section();
					section4.setName(event.detail.agentid+'twitter');
					section4.addItem(devBox);
					section4.addItem(twitterSect);
					this.addItem(section4);
					container.appendChild(section4.render());

					var section5=new section();
					section5.setName(event.detail.agentid+'radio');
					section5.addItem(devBox);
					radioSect.setRadioViewStatus(event.detail.agentid);
					section5.addItem(radioSect);
					this.addItem(section5);
					container.appendChild(section5.render());

					var section6=new section();
					section6.setName(event.detail.agentid+'graphics');
					section6.addItem(devBox);
					graphicSect.setTableViewStatus(event.detail.agentid);
					graphicSect.setTableDataStatus(event.detail.agentid);
					graphicSect.setGraphsViewStatus(event.detail.agentid);
					section6.addItem(graphicSect);
					this.addItem(section6);
					container.appendChild(section6.render());
					$("[name='twitter-checkbox']").bootstrapSwitch();
					$("[name='set-graphic']").bootstrapSwitch();
					$("[name='set-graphic-emisora']").bootstrapSwitch();
					$("[name='set-camara']").bootstrapSwitch();
					$("[name='set-graphic-camara']").bootstrapSwitch();



				}
				else{
					dev1.setID(event.detail.agentid);

					var twitterSect=new twitterSection();
					



					var section1=new section();
					section1.setName(event.detail.agentid+'layouts');
					section1.addItem(devBox);
					layoutSect1.setActiveLayout(b[0].capabilities.layoutStatus);
					section1.addItem(layoutSect1);
					this.addItem(section1);
					container.appendChild(section1.render());

					var section3=new section();
					section3.setName(event.detail.agentid+'cameras');
					section3.addItem(devBox);
					camerasSect.setCamsViewStatus(event.detail.agentid);
					camerasSect.setCamsSoundStatus(event.detail.agentid);
					section3.addItem(camerasSect);
					this.addItem(section3);
					container.appendChild(section3.render());

					var section4=new section();
					section4.setName(event.detail.agentid+'twitter');
					section4.addItem(devBox);
					section4.addItem(twitterSect);
					this.addItem(section4);
					container.appendChild(section4.render());

					var section5=new section();
					section5.setName(event.detail.agentid+'radio');
					section5.addItem(devBox);
					radioSect.setRadioViewStatus(event.detail.agentid);
					section5.addItem(radioSect);
					this.addItem(section5);
					container.appendChild(section5.render());

					var section6=new section();
					section6.setName(event.detail.agentid+'graphics');
					section6.addItem(devBox);
					graphicSect.setTableViewStatus(event.detail.agentid);
					graphicSect.setTableDataStatus(event.detail.agentid);
					graphicSect.setGraphsViewStatus(event.detail.agentid);
					section6.addItem(graphicSect);
					this.addItem(section6);
					container.appendChild(section6.render());


					$("[name='twitter-checkbox']").bootstrapSwitch();
					$("[name='set-graphic']").bootstrapSwitch();
					$("[name='set-graphic-emisora']").bootstrapSwitch();
					$("[name='set-camara']").bootstrapSwitch();
					$("[name='set-camara-camara']").bootstrapSwitch();

				}
				devBox.addDevice(dev1);

				var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
				var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
				var sectionDiv=document.querySelector('#fullTemp').children;
				for(var i=2;i<sectionNum;i++){
					sectionDiv[i].replaceChild(devBox.render(),sectionDiv[i].children[0]);
				}
				mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSection(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeSection,undefined);
			}


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
					sectionDiv[i-removed].replaceChild(devBox.render(),sectionDiv[i-removed].children[0]);
				}
			}
			mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSection(mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeSection,undefined);


		}
	}
	document.addEventListener('agentChange',this.onAgentChange.bind(this));

	this.onCtxUpdate=function(event){
		console.log(event);

		var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
		var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
		var sectionDiv=document.querySelector('#fullTemp').children;


		if(event.detail.context.lastChange!==undefined){
		if(event.detail.context.lastChange.diff!==null ){
			var changes=event.detail.context.lastChange.diff;

			for(var j=0;j<changes.length;j++){
				for(var i=2;i<sectionNum;i++){
					//if(changes[j].property==='show'){
					var selector = '#view'+changes[j].compId;
					if(changes[j].property==='show'){

						if(sections[i].name.indexOf(event.detail.agentid)===0 &&
								sectionDiv[i].querySelector(selector)!==null){
							// Show/hide commands
							if(changes[j].newValue===false){

								sectionDiv[i].querySelector(selector).children[0].className='bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-id-viewCheck'+changes[j].compId+' bootstrap-switch-animate bootstrap-switch-off';
								sectionDiv[i].querySelector(selector).children[0].children[0].style.width='150px'
								sectionDiv[i].querySelector(selector).children[0].children[0].style.marginLeft='-50px';

							}
							else if(changes[j].newValue===true){
								sectionDiv[i].querySelector(selector).children[0].className='bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-id-viewCheck'+changes[j].compId+' bootstrap-switch-animate bootstrap-switch-on';
								sectionDiv[i].querySelector(selector).children[0].children[0].style.width='150px'
								sectionDiv[i].querySelector(selector).children[0].children[0].style.marginLeft='0px';

							}
						}
						else if(sections[i].name.indexOf(event.detail.agentid)===0 &&
								sectionDiv[i].querySelector('#radioViewBut')!==null){
							if(changes[j].newValue===false){

								sectionDiv[i].querySelector('#radioViewBut').src='../resources/css/configPanel/img/radio/Radio_btn_play.png';
								sectionDiv[i].querySelector('#radioEq').src='../resources/css/configPanel/img/radio/Radio-animacion-off-estatico.png';

							}
							else if(changes[j].newValue===true){
								sectionDiv[i].querySelector('#radioViewBut').src='../resources/css/configPanel/img/radio/Radio_btn_pausa.png';
								sectionDiv[i].querySelector('#radioEq').src='../resources/css/configPanel/img/radio/animacion-ecualizador_transp.gif';
							}
						}

					}
					else if(changes[j].property==='customCmd'){
						/*if(changes[j].newValue==='hide' || changes[j].newValue==='show'){
							if(sections[i].name.indexOf(event.detail.agentid)===0 && sectionDiv[i].querySelector(selector)!==null){
								// Show/hide commands
								if(changes[j].newValue==='hide'){

									sectionDiv[i].querySelector(selector).children[0].className='bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-id-viewCheck'+changes[j].compId+' bootstrap-switch-animate bootstrap-switch-off';
									sectionDiv[i].querySelector(selector).children[0].children[0].style.width='150px'
									sectionDiv[i].querySelector(selector).children[0].children[0].style.marginLeft='-50px';

								}
								else if(changes[j].newValue==='show'){
									sectionDiv[i].querySelector(selector).children[0].className='bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-id-viewCheck'+changes[j].compId+' bootstrap-switch-animate bootstrap-switch-on';
									sectionDiv[i].querySelector(selector).children[0].children[0].style.width='150px'
									sectionDiv[i].querySelector(selector).children[0].children[0].style.marginLeft='0px';

								}
							}
						}*/

						//}
						if(sections[i].name.indexOf(event.detail.agentid)===0 &&
								sectionDiv[i].querySelector('#radioViewBut')!==null){
							if(changes[j].newValue==='hide'){

								sectionDiv[i].querySelector('#radioViewBut').src='../resources/css/configPanel/img/radio/Radio_btn_play.png';
								sectionDiv[i].querySelector('#radioEq').src='../resources/css/configPanel/img/radio/Radio-animacion-off-estatico.png';

							}
							else if(changes[j].newValue==='show'){
								sectionDiv[i].querySelector('#radioViewBut').src='../resources/css/configPanel/img/radio/Radio_btn_pausa.png';
								sectionDiv[i].querySelector('#radioEq').src='../resources/css/configPanel/img/radio/animacion-ecualizador_transp.gif';
							}
						}
						//Sound/mute
						//else{
						if(changes[j].newValue==='mutePlayer' || changes[j].newValue==='soundPlayer'){
							var selector = '#sound'+changes[j].compId;
							if(sections[i].name.indexOf(event.detail.agentid)===0 && sectionDiv[i].querySelector(selector)!==null){
								if(changes[j].newValue==='mutePlayer'){
									sectionDiv[i].querySelector(selector).children[0].className='bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-id-soundCheck'+changes[j].compId+' bootstrap-switch-animate bootstrap-switch-off';
									sectionDiv[i].querySelector(selector).children[0].children[0].style.width='150px'
									sectionDiv[i].querySelector(selector).children[0].children[0].style.marginLeft='-50px';
								}
								else if(changes[j].newValue==='soundPlayer'){
									sectionDiv[i].querySelector(selector).children[0].className='bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-id-soundCheck'+changes[j].compId+' bootstrap-switch-animate bootstrap-switch-on';
									sectionDiv[i].querySelector(selector).children[0].children[0].style.width='150px'
									sectionDiv[i].querySelector(selector).children[0].children[0].style.marginLeft='0px';

								}
							}
						}
						//Table values
						if(changes[j].newValue==='resultTablePresent' || changes[j].newValue==='resultTablePast'|| changes[j].newValue==='donostia'
							|| changes[j].newValue==='bilbo' || changes[j].newValue==='gasteiz' || changes[j].newValue==='irunea'){


								if(sections[i].name===event.detail.agentid+'graphics'){

									if(changes[j].newValue==='resultTablePresent'){
										sectionDiv[i].querySelector('#presentLI').className='active';
										sectionDiv[i].querySelector('#pastLI').className='';
										sectionDiv[i].querySelector('#presentPanel').className='col-md-12 fade in tab-pane active';
										sectionDiv[i].querySelector('#pastPanel').className='col-md-12 fade in tab-pane ';

									}
									else if(changes[j].newValue==='resultTablePast'){
										sectionDiv[i].querySelector('#presentLI').className='';
										sectionDiv[i].querySelector('#pastLI').className='active';
										sectionDiv[i].querySelector('#presentPanel').className='col-md-12 fade in tab-pane ';
										sectionDiv[i].querySelector('#pastPanel').className='col-md-12 fade in tab-pane active';
									}

									else{
										var places=sectionDiv[i].querySelectorAll('.pastilla_ciudad');
										for(var k=0;k<places.length;k++){

											if(places[k].id===changes[j].newValue){
												places[k].className='col-md-12 pastilla_ciudad active';

											}
											else{
												places[k].className='col-md-12 pastilla_ciudad';
											}

										}
									}

								}

							}

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


				else if(sectionName!=='AddDevice' && device!==undefined){
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

			if(device!==undefined){
				this.activeSection=sectionName;
				this.activeDevice=device;
			}
			else{
				this.activeSection=sectionName;
				this.activeDevice=this.selfID;
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
				}
			}
		}
	}

	this.changeTableYear=function(agentToChange,year){
		var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
		var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
		var sectionDiv=document.querySelector('#fullTemp').children;



		for(var i=2;i<sectionNum;i++){
			if(sections[i].name===agentToChange+'graphics'){

				if(year===2015){
					sectionDiv[i].querySelector('#presentLI').className='active';
					sectionDiv[i].querySelector('#pastLI').className='';
					sectionDiv[i].querySelector('#presentPanel').className='col-md-12 fade in tab-pane active';
					sectionDiv[i].querySelector('#pastPanel').className='col-md-12 fade in tab-pane ';

				}
				else if(year===2011){
					sectionDiv[i].querySelector('#presentLI').className='';
					sectionDiv[i].querySelector('#pastLI').className='active';
					sectionDiv[i].querySelector('#presentPanel').className='col-md-12 fade in tab-pane ';
					sectionDiv[i].querySelector('#pastPanel').className='col-md-12 fade in tab-pane active';
				}

			}
		}
	}

	this.changeTablePlace=function(agentToChange,place){
		var sections=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items;
		var sectionNum=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.items.length;
		var sectionDiv=document.querySelector('#fullTemp').children;



		for(var i=2;i<sectionNum;i++){
			if(sections[i].name===agentToChange+'graphics'){

				var opts=sectionDiv[i].querySelectorAll('.pastilla_ciudad');
				for(var j=0;j<opts.length;j++){
					if(opts[j].id===place){
						opts[j].className='col-md-12 pastilla_ciudad active';
					}
					else{
						opts[j].className='col-md-12 pastilla_ciudad';
					}
				}

			}
		}
	}

	this.hide=function(){
		document.querySelector('#fullTemp').style.display='none';
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
		this.showing=true;
		if(this.activeSection===''){
			document.querySelector('#fullTemp').style.width='auto';
		}
		else{
			document.querySelector('#fullTemp').style.width='100%';
		}
	}
	this.controlPanel();
}


var menuItem = function (){
	this.text = "";
	this.icon='';
	this.aSection='';

	this.setText=function (text){
		this.text=text;
	}
	this.setIcon=function (icon){
		this.icon=icon;
	}
	this.setSection=function (aSection){
		this.aSection=aSection;
	}
	this.render=function(){
		var li=document.createElement('li');
		li.addEventListener('click',this.onclick.bind(this));
		li.id=this.aSection;
		if(this.aSection==='AddDevice'){
			li.className='options';
		}
		var a=document.createElement('a');
		a.href='#';

		var span=document.createElement('span');

		var i=document.createElement('i');
		i.className=this.icon;
		span.appendChild(i);

		var strong=document.createElement('strong');
		strong.innerHTML=this.text;
		span.appendChild(strong);

		a.appendChild(span);
		li.appendChild(a);

		/*li.onclick=function(event){
		var allLi=document.querySelectorAll('li');
		for(var j=0;j<allLi.length;j++){
		if(allLi[j].className==='active'){
		allLi[j].className='';
	}
}

li.className='active';
if(document.querySelector('#fullTemp').querySelector('#panel')){
document.querySelector('#fullTemp').removeChild(document.querySelector('#fullTemp').querySelector('#panel'));
}
var panel=eval(renderFunc);
document.querySelector('#fullTemp').appendChild(panel);
}*/
return li;
}
this.onclick = function (event){
	console.log(this.aSection);

	mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeSection(this.aSection,undefined);


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
		var device=new devId();


		var dev=device.render();
		containerDiv.appendChild(dev);

		var div=document.createElement('div');
		div.className="sidebar-menu";

		//To fullScreen


		var ul=document.createElement('ul');

		var hide=new hideItem();
		ul.appendChild(hide.render());

		this.items.forEach(function(it){
			ul.appendChild(it.render());
		});

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
		var p=document.createElement('p');
		p.innerHTML="device <strong id='devNum'>"+this.num+"</strong>";

		div.appendChild(p);

		return div;
	}
}
var hideItem=function(){
	this.render=function(){
		var li=document.createElement('li');
		li.className='options';
		var a=document.createElement('a');
		a.href='#';


		var span=document.createElement('span');

		var i=document.createElement('i');
		i.className="zmdi zmdi-chevron-left";
		span.appendChild(i);

		var strong=document.createElement('strong');
		strong.innerHTML='Hide';
		span.appendChild(strong);
		a.appendChild(span);
		li.appendChild(a);
		li.onclick=function(event){
			mediascape.AdaptationToolkit.uiComponents.ctrlPanel.hide();
		}
		return li;
	}
}


var logoItem=function(){

	this.render=function(){
		var li=document.createElement('li');
		li.className="vicomtechlogo-li";

		var img1=document.createElement('img');
		img1.src="../resources/css/configPanel/img/mediascape_logo.png";

		var img2=document.createElement('img');
		img2.className='vicomtechlogo';
		img2.src='../resources/css/configPanel/img/LogoVicomtech.png';

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

	this.render=function(){
		var div=document.createElement('div');
		if(this.name==='AddDevice'){
			div.className="col-md-10 col-md-offset-2 template-content section-add-device";
		}
		else{
			div.className="col-md-10 col-md-offset-2 template-content";
		}
		this.items.forEach(function(it){
			div.appendChild(it.render());
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
		a.href='#';

		var img1=document.createElement('img');
		img1.src='../resources/css/configPanel/img/devices/'+this.icon;
		//img1.style.width='20%';
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
		div.className="col-md-4 boxlayout";

		var a=document.createElement('a');
		a.href='#';
		a.id=this.name+'Layout';
		if(this.name===actLay){//jarri aktibatua dagoena
			a.className='active';
		}

		var img=document.createElement('img');
		img.src=this.image;
		img.addEventListener('click',this.onclick.bind(this));
		a.appendChild(img);
		div.appendChild(a);
		return div;
	}
	this.onclick=function(event){
		var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
		mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.changeAgentlayout(agentToChange,this.name);
		mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeLayout(agentToChange,this.name);
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
		var qrdiv=document.createElement('div');
		qrdiv.className='qr-code-content';

		if(width<767)leftMargin=35*width/100;
        else leftMargin=25*width/100;
        mediascape.association.createQRcode(url,qrdiv,(30*width/100),(30*width/100),'',leftMargin,50);
		
		/*
			

	
		*/

		
		//var qrimg=document.createElement('img');
		//qrimg.src="../resources/css/configPanel/img/qr/qrcode.png";

		//var p=document.createElement('p');
		//p.innerHTML='www.paginaweb.com';

		//qrdiv.appendChild(qrimg);
		//qrdiv.appendChild(p);

		var animationdiv=document.createElement('div');
		animationdiv.id='animated-example';
		animationdiv.className='animated bounceInUp qr-code-toy';

		var animationimg=document.createElement('img');
		animationimg.src='../resources/css/configPanel/img/QR-manos_grande.png';

		animationdiv.appendChild(animationimg);

		extDiv.appendChild(qrdiv);
		extDiv.appendChild(animationdiv);

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

		var div6=document.createElement('div');
		div6.className='col-md-8 col-sm-8 check-switch-camara';
		var input1=document.createElement('input');
		input1.type='checkbox';
		input1.name='set-camara';
		input1.checked=this.viewStatus;
		input1.id='viewCheck'+this.id;

		div6.appendChild(input1);
		div6.id='view'+this.id;
		div6.addEventListener('click',this.viewclick.bind(this),true);

		div4.appendChild(div5);
		div4.appendChild(div6);

		var div7=document.createElement('div');
		div7.className='col-md-12';

		var div8=document.createElement('div');
		div8.className='col-md-3 col-sm-3 iconos-camara';
		var i2=document.createElement('i');
		i2.className='zmdi zmdi-volume-up zmdi-hc-2x';

		div8.appendChild(i2);

		var div9=document.createElement('div');
		div9.className='col-md-8 col-sm-8 check-switch-vol';
		var input2=document.createElement('input');
		input2.type='checkbox';
		input2.name='set-camara';
		input2.checked=this.soundStatus;

		input2.id='soundCheck'+this.id;
		div9.appendChild(input2);
		div9.id='sound'+this.id;


		div9.addEventListener('click',this.soundclick.bind(this),true);

		div7.appendChild(div8);
		div7.appendChild(div9);
		div3.appendChild(div4);
		div3.appendChild(div7);

		div1.appendChild(div2);
		div1.appendChild(div3);
		return div1;
	}
	this.viewclick=function(event){
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
		}
		else{
			mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,'show');
		}
	}
	this.soundclick=function(event){

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


		if(b[0].customCmd.lastIndexOf('mutePlayer')===-1 && b[0].customCmd.lastIndexOf('soundPlayer')===-1){
				if(document.querySelector('#'+scope.name).ismuted==='false'){
					mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,'mutePlayer');

				}
				else{
					mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,'soundPlayer');

				}

		}
		else{
			if(b[0].customCmd.lastIndexOf('mutePlayer') <b[0].customCmd.lastIndexOf('soundPlayer')){

				mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,'mutePlayer');
			}
			else{
				mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,'soundPlayer');
			}
		}
	}
}
var camerasSection=function(){
	this.cameras=[];

	this.addCamera=function(cam){
		this.cameras.push(cam);
	}
	this.render=function(){

		var extDiv=document.createElement('div');
		extDiv.className='template-content-center ';
		extDiv.id='camerasCont';
		var div1=document.createElement('div');
		div1.className='col-md-12 layout-columns';

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


			if(b[0].customCmd.lastIndexOf('mutePlayer')===-1 && b[0].customCmd.lastIndexOf('soundPlayer')===-1){
				if(document.querySelector('#'+this.cameras[i].name).ismuted==='false'){
					this.cameras[i].setSoundStatus(true);

				}
				else{
					this.cameras[i].setSoundStatus(false);

				}

			}
			else {
				if(b[0].customCmd.lastIndexOf('mutePlayer') <b[0].customCmd.lastIndexOf('soundPlayer')){

					this.cameras[i].setSoundStatus(false);
				}
				else{
					this.cameras[i].setSoundStatus(true);
				}
			}
		}

	}
}

var hashtag=function(){
	this.render=function(){
		var hashtagDiv=document.createElement('div');
		hashtagDiv.className='col-md-10 twitter-hashtag';

		var div1=document.createElement('div');
		div1.className='col-md-3 col-xs-3';
		var img=document.createElement('img');
		img.src='../resources/css/configPanel/img/hastag_consombra.png';
		div1.appendChild(img);

		var div2=document.createElement('div');
		div2.className='col-md-6 col-xs-9 seleccion-hashtag';

		var p1=document.createElement('p');
		p1.className='titulo-seccion';
		p1.innerHTML='Hashtag selection';

		var p2=document.createElement('p');
		p2.innerHTML='Select the hashtag to show tweets about it';

		var select=document.createElement('select');
		select.className='form-control select-hashtag';
		select.addEventListener('change',this.sendHTclick.bind(this),true);

		var HT=['','Elecciones',' elecciones',' Hauteskundeak',' hauteskundeak',' eleccion',' #elecciones24m',' #24m',' #L6elecciones','#eleccionesA3',' #eleccion2015',' hauteskundeak',' elecciones',' @hauteskundeak',' #hauteskundeak2015',' #Elecciones2015',' #hauteskundeak15',' #Elecciones15',' #M24Donostia',' #eleccionesVG',' @Navarra2015',' #Navarra24M',' #24M',' #M24Donostia',' #EleccionesNA15',' #Navarra24M',' @PPopular',' @PSOE',' @vox_es',' @UPyD',' @ahorapodemos',' @PartidoPACMA',' @Equo',' @CiudadanosCs',' @webpcpe',' @RecortesCero',' @phumanista_esp',' #UPyD',' #PSOE',' #PP',' #BILDU',' #Podemos',' #HagamosHistoria24M',' #VOX',' #AhoraVOX',' #Ciudadanos',' #UPN',' @PPvasco',' @UPyDEuskadi',' @Cs_Euskadi',' @IrabaziEuskadi',' @PES_PSE',' @EzkerBatua',' @ealkartasuna',' @plaZFeminista',' @PodemosEuskadi_',' @ehbildu',' @IkuneICP',' @eajpnv',' @PacmaEuskadi',' @UdalBerri',' @GastoriaVG',' @hegasum',' @IUEzker',' @upn_navarra',' @libertadnavarra',' @SainNavarra',' @RCN_NOK',' Kike Fernández',' @KikeFdzdePinedo',' @arabaehbildu',' @ehbilduaraba',' Miren Larrion',' @miren_larrion',' @ehbildugasteiz',' @EA_Araba',' Ramiro González',' @ramirogonza',' @eajpnvaraba',' @pnvjuntasaraba',' Gorka Urtaran',' @pnvgasteiz',' @gorka__urtaran',' Cristina González',' @CristinaGnlz',' @psealava',' @PSEporAlava',' Peio López De Munain',' @porvitoria',' @peiomunain_xvg',' Javier De Andrés',' @JavierdAndres',' @PP_Juntas_Alava',' Javier Maroto',' @JavierMaroto',' Koldo Martin',' @KoldoPodemos',' @PodemosVitoria',' Ana Unibaso',' @IkuneICP',' Niko Gutiérrez',' @Nik0Gutierrez',' Ignacio Oñate',' @Ignacionate',' Miguel Angel Carrera',' @MikelK10',' Rodrigo Zamora',' @Rodri_Zamora_Al',' José Damían Garcia-Moreno',' @josedamian1980',' #IrabaziAlaba',' @iu_araba',' @EquoAraba',' Óscar Fernández',' @oskar_fm',' @IrabaziGasteiz',' @EQUO_VG',' @EBgasteiz',' Esaú Martín',' @esaumartin',' @vox_alava',' #AhoraVOX',' Adolfo Gago',' @toohope',' Vanesa Costa',' Nerea Icuza',' @icuza',' Esther Saez de Argandoña',' @unicaire',' @GastoriaVG',' Jorge Hinojal',' @JorgeHiSo',' @shgjorge',' @hegasum',' Diana Plaza',' @RecortesCero',' Xabier Olano',' @Xabier_Olano_',' @ehbildugipuzkoa',' @alternatiba',' @EA_Gipuzkoa',' #gipuzkoarrokgaraile',' Juankar Izagirre',' @AlkateSS',' @HiriBizia',' @SortuDonostia',' @EA_Donostia',' #BILDU',' @ehbildu',' Markel Olano',' @eajpnvgipuzkoa',' @markelolano',' @markelolano2015',' Eneko Goia',' @enekogoia2015',' @DonostiaPNV',' @pnvdonostia',' @eajpnv',' Denis Itxaso',' @DenisItxaso',' @PSEGIPUZKOA',' Ernesto Gasco',' @gasco63',' Juan Carlos Cano',' @PPGipuzkoa',' @CanoAristoy',' Miren Albistur',' @MirenAlbistur',' @PPdonostiarras',' Juantxo Iturria',' @juantxo_iturria',' #BadaGaraia',' #GipuzkoaAldatu',' @podemosDonostia',' Amaia Martín',' @sybillacumas',' @Irabazidonostia',' #Podemos',' #HagamosHistoria24M',' Arantza González',' @arantzagg',' @IRABAZIGipuzkoa',' @Irabazidonostia',' @IUDonostia',' @eQuoGipuzkoa',' Manuel Aguirre',' @Mccguirre',' Arantza Aranzabal',' @aranaranzabal',' #donostiaUPyD',' @votaUPyD',' Jonathan Calvo',' @joncalrue',' Nicolás de Miguel',' @NicodeMig',' Josebe Iturrioz',' @JosebeIturrioz',' #AldaketaGorpuzteko',' @plaZFeminista',' Saioa Escolar',' @Pacma_Gipuzkoa',' @PacmaGipuzkoa',' @PacmaEuskadi',' Josu Unanue',' @unanuejosu',' @ehbildubizkaia',' #bizkaitarrokgaraile',' Aitziber Ibarbarriaga',' @AitziIbaiba',' @ehbildubilbo',' @SortuBilbo',' #BILDU',' @EA_Bizkaia',' Unai Rementeria',' @urementeria',' Juan María Aburto',' @juanmariaburto',' @AzalgorriBilbao',' @eajpnvbilbao @eajpnv',' Carlos Totorica',' @PSEBizkaia',' #CarlosTotorica',' Alfonso Gil',' @AlfonsoGil',' @PSEBilbao',' @GroupPES_Bilbao',' Javier Ruiz',' @JavierRuiz_PP',' @PPBizkaia',' Luis Eguiluz',' @LuisEguiluz_pp',' @PPdeBilbao',' Asun Merino',' @AsunPodemos',' @PodemosBizkaia',' Francisco Samir Lahdou',' @PodemosBilbao',' @PodemosBilbaoE',' Xabier Jiménez',' @Eljoventopo',' #IrabaziBizkaia',' @BilboIrabaziz',' @IUBilbao',' @EquoBizkaia',' Roque Adrada',' @RoqueAdrada',' Javier Gabilondo',' @JavierGabilondo',' Santiago Sáinz',' @Sainz_Robles',' @Ciudadanos',' David Pasarín',' @davidpasarin',' Patricia Gómez',' @vox_vizcaya',' Urko de Azumendi',' @urkobilbao2015',' @vox_bilbao',' Carmen Muñoz',' @CarmenMunozL',' #BilbaoEnComun',' @UdalBerri',' @Equo',' @iunida',' @ALTER_info',' JOSE MANUEL VÁZQUEZ RIOS',' @phumanista_esp',' Kepa Lozano',' @KEPALOZANO',' Goizane Rodríguez',' @JusticiaPAT',' Joseba Arroita',' @IkuneICP',' Sergio Saenz',' @webpcpe',' #24mvotapcpe',' Uxue Barkos',' @uxuebarkos',' Itziar Gomez',' @itziargomez',' @GeroaBaiIrunea',' @geroabai',' #orainbai',' @EAJPNVNafarroa',' Javier Esparza',' @JavierJesparza',' @_navarrisimo',' #Navarrisimo',' #adelantenavarros',' Enrique Maya',' #Navarrisimo',' #UPN',' @upn_navarra',' Ana Beltran',' @abeltran_ana',' @PPNavarra',' Pablo Zalba',' @PabloZalba',' #Pamplona',' #Navarra',' @PPNavarra',' #DespiertaPamplona',' María Chivite',' @mavichina',' @PSNPSOE',' Maite Esporrin',' @maiteesporrin',' @PamplonaPSN',' @psnpsoe',' #VotaPSOE',' #VotaPSNPSOE',' #EsporrinAlcaldesa',' #ActivemosPamplona',' Adolfo Araiz',' @AdolfoAraiz',' @EHbilduNafarroa',' #Nafarrokgaraile',' #nafarrokgaraile',' Joseba Asiron',' @josebaasiron',' @EAnafarroa',' Laura Pérez Ruano',' @laperua',' @Podemosnavarra',' #EsAhora',' #CambiaNavarra',' Diego Paños',' @diegopanos',' #CambiaNavarra',' @Cs_Navarra_',' Iñaki Arana',' #NavarraPideCambio',' Miguel Zarranz',' @miguelzarranz',' @UPyD_Navarra',' Damaso Crespo',' @upyd_navarra',' #LIBRES',' Jose Miguel Nuin',' @josemiguelnuin',' @IzdaNavarra @EzkerraN',' Mikel Iriarte',' @libertadnavarra',' David Marzo',' @davidMarzo',' @EquoNavarfarroa',' #LaAlternativaVerde',' #AukeraVerdea',' @EquoNavarra',' Maria Yazmina Larumbe',' @PacmaNavarra',' Daniel Fernández',' #SuVozTuVoto',' Luis Miguel Latasa',' @SainNavarra',' @PartidoSAIn',' Samuel Valderrey',' @SamuelValderrey',' #VOTASAIn',' Ramon Morcillo',' @RCN_NOK',' #marihuana',' Edurne Eguino',' @SoyEdurneNaiz',' @EdurneEguino',' @IUPamplona'];
		for(var i=0;i<HT.length;i++){
			var opt1=document.createElement('option');
			opt1.innerHTML=HT[i];
			//opt1.addEventListener('click',this.sendHTclick.bind(this),true);
			select.appendChild(opt1);
		}

		div2.appendChild(p1);
		div2.appendChild(p2);
		div2.appendChild(select);

		var div3=document.createElement('div');
		div3.className='col-md-3 check-switch-twitter';

		var input1=document.createElement('input');
		input1.type='checkbox';
		input1.name='twitter-checkbox';
		input1.checked=true;

		div3.appendChild(input1);
		hashtagDiv.appendChild(div1);
		hashtagDiv.appendChild(div2);
		hashtagDiv.appendChild(div3);
		return hashtagDiv;
	}
	this.sendHTclick=function(event){

		var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
		//mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,"compId0",event.srcElement.value);
	}
}
var trendingMap=function(){
	this.render=function(){

		var trending=document.createElement('div');
		trending.className='col-md-10 twitter-topic';

		var div4=document.createElement('div');
		div4.className='col-md-3 col-xs-3';
		var img2=document.createElement('img');
		img2.src='../resources/css/configPanel/img/twitter_consombra.png';
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

		var div6=document.createElement('div');
		div6.className='col-md-3 check-switch-twitter';

		var input2=document.createElement('input');
		input2.type='checkbox';
		input2.name='twitter-checkbox';
		input2.checked=true;

		div6.appendChild(input2);
		trending.appendChild(div4);
		trending.appendChild(div5);
		trending.appendChild(div6);

		return trending;
	}
}

var twitterSection=function(){
	this.render=function(){

		var extDiv=document.createElement('div');
		extDiv.className='template-content-center';

		var tselector=document.createElement('div');
		tselector.className='col-md-12 layout-columns twitter-selector-container';
		//abstraer cada componente por separado? hashtag y trending map

		var hashtagComp=new hashtag();
		tselector.appendChild(hashtagComp.render());


		var trendingComp=new trendingMap();
		tselector.appendChild(trendingComp.render());

		extDiv.appendChild(tselector);
		return extDiv;
	}
}

var radios=function(){
	this.setID=function(radId){
		this.id=radId;
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
		img.id='radioViewBut';
		img.width='150';
		if(this.viewStatus===true){
			img.src='../resources/css/configPanel/img/radio/Radio_btn_pausa.png';
		}
		else{
			img.src='../resources/css/configPanel/img/radio/Radio_btn_play.png';
		}
		img.addEventListener('click',this.viewClick.bind(this),true);

		div7.appendChild(img);

		var div8=document.createElement('div');
		div8.className='col-xs-8 col-sm-6 col-md-8';

		var div9=document.createElement('div');
		div9.className='radio_nombre_emisora';

		var strong=document.createElement('strong');
		strong.className='radio_nombre_emisora_txt';
		strong.innerHTML='Radio Euskadi';
		div9.appendChild(strong);

		var div10=document.createElement('div');
		div10.className='radio_ecualizador_centrar';

		var img1=document.createElement('img');
		img1.className='radio_ecualizador_img';
		img1.id='radioEq';
		if(this.viewStatus===true){
			img1.src='../resources/css/configPanel/img/radio/animacion-ecualizador_transp.gif';
		}
		else{
			img1.src='../resources/css/configPanel/img/radio/Radio-animacion-off-estático.png';
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
		img3.src='../resources/css/configPanel/img/radio/logo_eitb.png';
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

		
		var div16=document.createElement('div');
		div16.className='emisoras';

		//Radio1
		var div17=document.createElement('div');
		div17.className='emisora_logo';

		var div18=document.createElement('div');
		div18.className='logo_emisora_p';

		var img4=document.createElement('img');
		img4.className='logo_emisora_img';
		img4.src='../resources/css/configPanel/img/radio/logo_ser_blanco.png';
		div18.appendChild(img4);

		div17.appendChild(div18);

		//Radio2
		var div19=document.createElement('div');
		div19.className='emisora_logo';

		var div20=document.createElement('div');
		div20.className='logo_emisora_p';

		var img5=document.createElement('img');
		img5.className='logo_emisora_img';
		img5.src='../resources/css/configPanel/img/radio/logo_bbc_blanco.png';
		div20.appendChild(img5);

		div19.appendChild(div20);



		var div21=document.createElement('div');
		div21.className='emisora_logo';

		var div22=document.createElement('div');
		div22.className='logo_emisora_p';

		var img6=document.createElement('img');
		img6.className='logo_emisora_img';
		img6.src='../resources/css/configPanel/img/radio/logo_eitb_blanco.png';
		div22.appendChild(img6);

		div21.appendChild(div22);



		div16.appendChild(div17);
		div16.appendChild(div19);
		div16.appendChild(div21);

		div15.appendChild(div16);
		div14.appendChild(div15);
		div2.appendChild(div3);
		div2.appendChild(div14);

		return div2;
	}
	this.viewClick=function(event){
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
		}
		else{
			mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,'show');
		}
	}
}
var radioSection=function(){
	this.radioComponent=[];

	this.addComponent=function(c){
		this.radioComponent.push(c);
	}
	this.render=function(){
		var div1=document.createElement('div');
		div1.className='template-content-center';		
		div1.id='radioCont';
		div1.appendChild(this.radioComponent[0].render());

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


		var rad=this.radioComponent[0].id;
		b=a[0].capabilities.componentsStatus.filter(function(el){
			if(el.compId===rad)return el;
		});


		if(b[0].show===true){
			this.radioComponent[0].setViewStatus(true);
		}
		else{
			this.radioComponent[0].setViewStatus(false);
		}

	}
	
}
var table=function(){

	this.setID=function(tabId){
		this.id=tabId;
	}
	this.setViewStatus=function(stat){
		this.viewStatus=stat;
	}
	this.setPlaceStat=function(stat){
		this.activePlace=stat;
	}
	this.setYearStat=function(stat){
		this.activeYear=stat;
	}


	this.render=function(){
		var div4=document.createElement('div');
		div4.className='contenido_graphics';

		var div5=document.createElement('div');
		div5.className='col-md-12 data-information-section';

		var div6=document.createElement('div');
		div6.className='col-md-9 txt_titular';
		div6.innerHTML='Table data information';

		var div7=document.createElement('div');
		div7.className='col-md-3 check-switch-graphics';
		div7.addEventListener('click',this.viewclick.bind(this),true);
		var input1=document.createElement('input');
		input1.type='checkbox';
		input1.name='set-graphic-emisora';
		input1.id='viewCheck'+this.id;
		input1.checked=this.viewStatus;
		div7.id='view'+this.id;

		div7.appendChild(input1);

		div5.appendChild(div6);
		div5.appendChild(div7);

		var div8=document.createElement('div');
		div8.className='col-md-12 tabs-graficos';


		var ul=document.createElement('ul');
		ul.className='nav nav-tabs';
		ul.role='tablist';

		var li1=document.createElement('li');
		li1.id='pastLi';
		li1.role='presentation';
		if(this.activeYear==='2011'){
			li1.className='active';
		}
		else{
			li1.className='';
		}
		li1.addEventListener('click',this.pastClick.bind(this),true);
		
		li1.innerHTML='<a href="#2011" aria-controls="2011" role="tab" data-toggle="tab"><img src="../resources/css/configPanel/img/graphics/icon_chart.png"/><br><span class="year-text">2011</span></a>'



		var li2=document.createElement('li');
		li2.id='presentLi';
		li2.role='presentation';
		if(this.activeYear==='2015'){
			li2.className='active';
		}
		else{
			li2.className='';
		}
		li2.addEventListener('click',this.presentClick.bind(this),true);
		li2.innerHTML='<a href="#2012" aria-controls="2015" role="tab" data-toggle="tab"><img src="../resources/css/configPanel/img/graphics/icon_chart.png"/><br><span class="year-text">2015</span></a>';
		
		ul.appendChild(li1);
		ul.appendChild(li2);

		var div9=document.createElement('div');
		div9.className='tab-content';

		var div10=document.createElement('div');

		if(this.activeYear==='2011'){
			div10.className='col-md-12 fade in tab-pane active ';
		}
		else{
			div10.className='col-md-12 fade in tab-pane';
		}
		div10.id='pastPanel';
		div10.role='tabpanel';

		var div11=document.createElement('div');
		div11.id='bilbo';
		if(this.activePlace===div11.id){
			div11.className='col-md-12 pastilla_ciudad active';
		}
		else{
			div11.className='col-md-12 pastilla_ciudad';
		}
		div11.addEventListener('click',this.placeClick.bind(this));

		var div12=document.createElement('div');
		div12.className='txt_ciudad';
		div12.innerHTML='Bilbao';

		div11.appendChild(div12);


		var div13=document.createElement('div');
		div13.id='donostia';
		div13.addEventListener('click',this.placeClick.bind(this));
		if(this.activePlace===div13.id){
			div13.className='col-md-12 pastilla_ciudad active';
		}
		else{
			div13.className='col-md-12 pastilla_ciudad';
		}
		var div14=document.createElement('div');
		div14.className='txt_ciudad';
		div14.innerHTML='Donostia - San Sebastian';

		div13.appendChild(div14);

		var div15=document.createElement('div');
		div15.id='gasteiz';
		div15.addEventListener('click',this.placeClick.bind(this));
		if(this.activePlace===div15.id){
			div15.className='col-md-12 pastilla_ciudad active';
		}
		else{
			div15.className='col-md-12 pastilla_ciudad';
		}
		var div16=document.createElement('div');
		div16.className='txt_ciudad';
		div16.innerHTML='Vitoria / Gasteiz';

		div15.appendChild(div16);

		var div17=document.createElement('div');
		div17.id='irunea';
		div17.addEventListener('click',this.placeClick.bind(this));
		if(this.activePlace===div17.id){
			div17.className='col-md-12 pastilla_ciudad active';
		}
		else{
			div17.className='col-md-12 pastilla_ciudad';
		}
		var div18=document.createElement('div');
		div18.className='txt_ciudad';
		div18.innerHTML='Iruña / Pamplona';

		div17.appendChild(div18);

		div10.appendChild(div11);
		div10.appendChild(div13);
		div10.appendChild(div15);
		div10.appendChild(div17);



		var div19=document.createElement('div');
		if(this.activeYear==='2015'){
			div19.className='col-md-12 fade in tab-pane active ';
		}
		else{
			div19.className='col-md-12 fade in tab-pane';
		}
		div19.id='presentPanel';
		div19.role='tabpanel';

		var div20=document.createElement('div');
		div20.id='bilbo';
		div20.addEventListener('click',this.placeClick.bind(this));
		if(this.activePlace===div20.id){
			div20.className='col-md-12 pastilla_ciudad active';
		}
		else{
			div20.className='col-md-12 pastilla_ciudad';
		}
		var div21=document.createElement('div');
		div21.className='txt_ciudad';
		div21.innerHTML='Bilbao';

		div20.appendChild(div21);


		var div22=document.createElement('div');
		div22.id='donostia';
		div22.addEventListener('click',this.placeClick.bind(this));
		if(this.activePlace===div22.id){
			div22.className='col-md-12 pastilla_ciudad active';
		}
		else{
			div22.className='col-md-12 pastilla_ciudad';
		}
		var div23=document.createElement('div');
		div23.className='txt_ciudad';
		div23.innerHTML='Donostia - San Sebastian';

		div22.appendChild(div23);

		var div24=document.createElement('div');
		div24.id='gasteiz';
		div24.addEventListener('click',this.placeClick.bind(this));
		if(this.activePlace===div24.id){
			div24.className='col-md-12 pastilla_ciudad active';
		}
		else{
			div24.className='col-md-12 pastilla_ciudad';
		}
		var div25=document.createElement('div');
		div25.className='txt_ciudad';
		div25.innerHTML='Vitoria / Gasteiz';

		div24.appendChild(div25);

		var div26=document.createElement('div');
		div26.id='irunea';
		div26.addEventListener('click',this.placeClick.bind(this));
		if(this.activePlace===div26.id){
			div26.className='col-md-12 pastilla_ciudad active';
		}
		else{
			div26.className='col-md-12 pastilla_ciudad';
		}
		var div27=document.createElement('div');
		div27.className='txt_ciudad';
		div27.innerHTML='Iruña / Pamplona';

		div26.appendChild(div27);

		div19.appendChild(div20);
		div19.appendChild(div22);
		div19.appendChild(div24);
		div19.appendChild(div26);

		div9.appendChild(div10);
		div9.appendChild(div19);
		div8.appendChild(ul);
		div8.appendChild(div9);
		div4.appendChild(div5);
		div4.appendChild(div8);
		return div4;
	}
	this.presentClick=function(event){
		var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
		mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,'resultTablePresent');
		mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeTableYear(agentToChange,2015);

	}
	this.pastClick=function(event){
		var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
		mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,'resultTablePast');
		mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeTableYear(agentToChange,2011);
	}
	this.placeClick=function(event){
		var agentToChange=mediascape.AdaptationToolkit.uiComponents.ctrlPanel.activeDevice;
		mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,event.currentTarget.id);
		mediascape.AdaptationToolkit.uiComponents.ctrlPanel.changeTablePlace(agentToChange,event.currentTarget.id);
	}
	this.viewclick=function(event){
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
		}
		else{
			mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,'show');
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

		var div33=document.createElement('div');
		div33.className='col-md-4 col-sm-4 col-xs-12 check-switch-graphics';

		var input3=document.createElement('input');
		input3.type='checkbox';
		input3.name='set-graphic-emisora';
		input3.checked=this.viewStatus;
		input3.id='viewCheck'+this.id;

		div33.id='view'+this.id;
		div33.addEventListener('click',this.viewclick.bind(this),true);

		div33.appendChild(input3);


		div30.appendChild(div32);
		div30.appendChild(div33);
		return div30;

	}
	this.viewclick=function(event){
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
		}
		else{
			mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.setRemoteAgentComponentStatus(agentToChange,this.id,'show');
		}
	}
}
var graphicSection=function(){
	this.tableComp=[];
	this.graphComps=[];
	this.addTableComp=function(c){
		this.tableComp.push(c);
	}
	this.addGraphComp=function(c){
		this.graphComps.push(c);
	}

	this.render=function(){
		var div1=document.createElement('div');
		div1.className='template-content-center';
		div1.id='graphicCont';
		var div2=document.createElement('div');
		div2.className='col-md-12 layout-columns';

		var div3=document.createElement('div');
		div3.className='col-md-6 clm_2_graph izda';


		div3.appendChild(this.tableComp[0].render());

		var div4=document.createElement('div');
		div4.className='col-md-6 clm_2_graph';

		var div5=document.createElement('div');
		div5.className='contenido_graphics content-emisoras';

		for(var i=0;i<this.graphComps.length;i++){
			div5.appendChild(this.graphComps[i].render());
		}

		div4.appendChild(div5);

		div2.appendChild(div3);
		div2.appendChild(div4);

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


		var tab=this.tableComp[0].id;
		b=a[0].capabilities.componentsStatus.filter(function(el){
			if(el.compId===tab)return el;
		});


		if(b[0].show===true){
			this.tableComp[0].setViewStatus(true);
		}
		else{
			this.tableComp[0].setViewStatus(false);
		}

	}
	this.setTableDataStatus=function(agentID){

		var agCtx=mediascape.AdaptationToolkit.Adaptation.multiDeviceAdaptation.getLocalContext();
		var agents=agCtx.agents;
		var agentToChange=agentID;

		var a=agents.filter(function(el){
			if(el.id===agentToChange)return el;
		});
		var scope=this;

		var tab=this.tableComp[0].id;
		b=a[0].capabilities.componentsStatus.filter(function(el){
			if(el.compId===tab)return el;
		});


		if(b[0].customCmd.lastIndexOf('resultTablePast')===-1 && b[0].customCmd.lastIndexOf('resultTablePresent')===-1
			&& b[0].customCmd.lastIndexOf('donostia')===-1 && b[0].customCmd.lastIndexOf('bilbo')===-1
			&& b[0].customCmd.lastIndexOf('gasteiz')===-1 && b[0].customCmd.lastIndexOf('irunea')===-1){

				this.tableComp[0].setPlaceStat('irunea');
				this.tableComp[0].setYearStat('2015');

		}
		else if(b[0].customCmd.lastIndexOf('resultTablePast')<b[0].customCmd.lastIndexOf('resultTablePresent')
			&& b[0].customCmd.lastIndexOf('donostia')===-1 && b[0].customCmd.lastIndexOf('bilbo')===-1
			&& b[0].customCmd.lastIndexOf('gasteiz')===-1 && b[0].customCmd.lastIndexOf('irunea')===-1 ){

				this.tableComp[0].setPlaceStat('irunea');
				this.tableComp[0].setYearStat('2015');
		}
		else if(b[0].customCmd.lastIndexOf('resultTablePast')>b[0].customCmd.lastIndexOf('resultTablePresent')
			&& b[0].customCmd.lastIndexOf('donostia')===-1 && b[0].customCmd.lastIndexOf('bilbo')===-1
			&& b[0].customCmd.lastIndexOf('gasteiz')===-1 && b[0].customCmd.lastIndexOf('irunea')===-1){

			this.tableComp[0].setPlaceStat('irunea');
			this.tableComp[0].setYearStat('2011');
		}
		else{


			var indexes=[];

			indexes.push([b[0].customCmd.lastIndexOf('donostia'),'donostia']);
			indexes.push([b[0].customCmd.lastIndexOf('bilbo'),'bilbo']);
			indexes.push([b[0].customCmd.lastIndexOf('gasteiz'),'gasteiz']);
			indexes.push([b[0].customCmd.lastIndexOf('irunea'),'irunea']);


			var ordered_ind=[];
      		ordered_ind = indexes.sort(function(it1,it2){
      		if (it1[0] > it2[0]) return 1;
      		else return -1;
      		});

			this.tableComp[0].setPlaceStat(indexes[3][1]);

			if(b[0].customCmd.lastIndexOf('resultTablePast')===-1 && b[0].customCmd.lastIndexOf('resultTablePresent')===-1){
				this.tableComp[0].setYearStat('2015');
			}
			else if(b[0].customCmd.lastIndexOf('resultTablePast')<b[0].customCmd.lastIndexOf('resultTablePresent')){
				this.tableComp[0].setYearStat('2015');
			}
			else if(b[0].customCmd.lastIndexOf('resultTablePast')>b[0].customCmd.lastIndexOf('resultTablePresent')){
				this.tableComp[0].setYearStat('2011');
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

}
