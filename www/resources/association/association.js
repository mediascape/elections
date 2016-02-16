define( ["jquery","qrcode","webcodecam","qrcodelib"], function($) {
	var Association = function() {
		var freq;
		var interval;
		var timeout;
		var audioCtx;
		var req;
		var tones = {};

		/*****************************************************************************************
		*
		*	mediascape.association.doAssociation()
		*
		*	Function that associates different devices. It uses as a association technology 
		*	the technology passed as a parameter.
		*
		******************************************************************************************/
		this.doAssociation = function(){
			//Bitly Legacy API Key: https://bitly.com/a/settings/advanced
			var bitlyUser="ionalberdi";
			var bitlyPass="R_978251cf3ed04317a147fde5a237b13c";
			var serverUrl=window.location.host;
			var args = Array.prototype.slice.call(arguments);

			if(args[0].toLowerCase()==="qr"){
					if(args.length==4||args.length==6||args.length==8){
						console.log("Trigger");
						return qrCodeAssociationTrigger(args);
					}else if(args.length==2){
						console.log("Catcher");
						return qrCodeAssociationCatcher(args);
					}else return errorParametersNumber("<p>Review the number of parameters used.</p>");
				}else if(args[0].toLowerCase()==="acoustic"){
						if(args.length==3){
							console.log("Trigger");
							return acousticAssociationTrigger(args);
						}else if(args.length==2){
							console.log("Catcher");
							return acousticAssociationCatcher(args);
						}else return errorParametersNumber("<p>Review the number of parameters used.</p>");
					}else if(args[0].toLowerCase()==="nws"){
							if(args.length==4){
								console.log("Trigger");
								return nwsAssociationTrigger(args);
							}else if(args.length==2){
								console.log("Catcher");
								return nwsAssociationCatcher(args);
							}else return errorParametersNumber("<p>Review the number of parameters used.</p>");
						}else if(args[0].toLowerCase()==="shake"){
								if(args.length==2){
									console.log("Trigger");
									return shakeAssociationTrigger(args);
								}else if(args.length==3){
									console.log("Catcher");
									return shakeAssociationCatcher(args);
								}else return errorParametersNumber("<p>Review the number of parameters used.</p>");
							}else if(args[0].toLowerCase()==="dial"){
									/*if(args.length>2){
										console.log("Trigger");
										return dialAssociationTrigger(args);
									}else{
										console.log("Catcher");
										return dialAssociationCatcher(args);
									}*/
								}else if(args[0].toLowerCase()==="presentation"){
										/*if(args.length>2){
											console.log("Trigger");
											return presentationAssociationTrigger(args);
										}else{
											console.log("Catcher");
											return presentationAssociationCatcher(args);
										}*/
									}else if(args[0].toLowerCase()==="text"){
											if(args.length==3){
												return textAssociationTrigger(args);
											}else return errorParametersNumber("<p>Review the number of parameters used.</p>");
										}else if(args[0].toLowerCase()==="sync"){
											if(args.length==2){
												console.log("Trigger");
												return syncAssociationTrigger(args);
											}else if(args.length==1){
												console.log("Catcher");
												return syncAssociationCatcher(args);
											}else return errorParametersNumber("<p>Review the number of parameters used.</p>");
										}else return errorParametersNumber("<p>The technology has not been developed yet.</p>");

		function errorParametersNumber(arg){
			console.log('errorParametersNumber');
			var p1= new Promise(
				function(resolve,reject){
					resolve(JSON.parse('{"response":"'+arg+'"}'));
				});
			return p1;
		}
		
		/*****************************************************************************************
		*
		*	mediascape.association.doAssociation('text', url, short)
		*
		*	Function that returns shorted url.
		*
		******************************************************************************************/

			function textAssociationTrigger(args){
				console.log('textAssociationTrigger');
				var p1= new Promise(
					function(resolve,reject){
						var deferred = $.Deferred();
						if(args[2]&&args[1].indexOf("bit.ly")==-1&&bitlyUser!=""&&bitlyPass!=""){
							shortURL(args[1]).then(function(data){
								resolve(JSON.parse('{"response":"'+data.response+'"}'));
							});
						}else resolve(JSON.parse('{"response":"'+args[1]+'"}'));
					});
				return p1;
			}

		/*****************************************************************************************
		*
		*	mediascape.association.doAssociation('qr', "place", url, short[, width, height, marginLeft, marginTop])
		*
		*	Function that inserts a QR Code based in the url passed as a parameter. If the 
		*	short element is true, then the url will be shorted before create the QR Code. 
		*	The width and the height are optional values, by default their values are 160px.
		*
		******************************************************************************************/

			function qrCodeAssociationTrigger(args){
				console.log('qrCodeAssociationTrigger');
				var p1= new Promise(
					function(resolve,reject){
						var deferred = $.Deferred();
						var width="160";
						var height="160";
						var marginLeft=0;
						var marginTop=0;
						var type=args[0];
						var placeId=args[1];
						var url=args[2];
						var short=args[3];
						if(args.length==6){
							width=args[4];
							height=args[5];
						}else if(args.length==8){
							width=args[4];
							height=args[5];
							marginLeft=args[6];
							marginTop=args[7];
						}

						if(short&&url.indexOf("bit.ly")==-1&&bitlyUser!=""&&bitlyPass!=""){
							shortURL(url).then(function(data){
								return visualizeQr(placeId,data.response,width,height,marginLeft,marginTop,true,resolve);
							});
						}else{
							return visualizeQr(placeId,url,width,height,marginLeft,marginTop,true,resolve);
						}
				});
				return p1;
			}


			function visualizeQr(placeId,url,width,height,marginLeft,marginTop,link,resolve){
				var shortedUrl = url;
				var asociationElement=document.getElementById(placeId);
				var associationCode = document.createElement("div");
				associationCode.id="code";
				var qrElement = document.createElement("div");
				qrElement.id="qrcode";
				qrElement.style.width=width+"px";
				qrElement.style.height=height+"px";
				//qrElement.style.margin="auto auto";
				associationCode.style.transition="width 1.5s";
				if((marginLeft!=0)||(marginTop!=0)){
					qrElement.style.marginLeft=marginLeft+"px";
					qrElement.style.marginTop=marginTop+"px";
				}
				associationCode.appendChild(qrElement);
				if(link){
					associationCode.appendChild(document.createElement("br"));
					var urlLinkObject=visualizeLink(shortedUrl);
					associationCode.appendChild(urlLinkObject);
				}
				asociationElement.appendChild(associationCode);
				var qrcode = new QRCode("qrcode", {
					text: url,
					width:width,
					height:height, 
					colorDark : "#000000",
					colorLight : "#ffffff",
					correctLevel : QRCode.CorrectLevel.H
				});
				resolve(JSON.parse('{"response":"'+url+'"}'));
			}

			function visualizeLink(url){
				var urlElement = document.createElement("a");
				urlElement.id="url";
				urlElement.href=url;
				urlElement.innerHTML=url;
				urlElement.target='_blank';
				return urlElement;
			}

		/***********************************************************************************************
		*
		*	mediascape.association.doAssociation('acoustic', url, short)
		*
		*	Function that creates an acoustic signal based on the url passed as a parameter
		*	for the association of devices. The acoustic signal is based in the Frequency-shift
		*	keying technology.If the short element is true, then the url will be shorted 
		*	before create the acoustic signal.
		*
		***********************************************************************************************/

			function acousticAssociationTrigger(args){
				console.log('acousticAssociationTrigger');
				var p1= new Promise(
					function(resolve,reject){
						var deferred = $.Deferred();
						var alphabet = ",0123456789*#.|!:/? abcdefghijklmnopqrstuvwxyz&";
						var hi = 6000;//var hi = 3400;
						var low = 3500;//var low = 900;
						var start_array = [' ',' ',' ',' ','#','#','#','#','*','*','*','*','#','#','#','#'];
						var dupe = "|";
						var caps = "!";

						if(args[2]&&args[1].indexOf("bit.ly")==-1&&bitlyUser!=""&&bitlyPass!=""){
							shortURL(args[1]).then(function(data){
								acoustic(data.response);
							});
						}else acoustic(args[1]);

					function acoustic(data){
						audioCtx = new (window.AudioContext || window.webkitAudioContext)();
						if(args.length==3){
							var freqs = [];
							var keys = [];

							var increment = parseInt((hi - low)/alphabet.length);
							keys = alphabet.split("");
							var freq1 = low;
							for(var i=0; i<alphabet.length; i++){
								freqs[i] = freq1;
								freq1 = freq1 + increment;
							}
							freq_error = increment / 3;

							var note_length = 300;
							var text_array = encode(data);

							var count = 0;

							var i = text_array[count].toString();
							var index = keys.indexOf(i);

							if(!index){
								console.log(" key not found for "+i+" /// ");
							}else{
								freq = freqs[index];
								play_note(freq);
							}

							interval = setInterval(function(){
								if(freq){
									stop_playing_note(freq);
								}
								count = count+1;
								if(text_array[count]){
									var j = text_array[count].toString();
									var index = keys.indexOf(j);
									freq = freqs[index];

									if(!freq){
										console.log(" key not found for "+j+" ");
									}else{
										play_note(freq);
									}
								}else{
									clearInterval(interval);
									evt = document.createEvent('Event');
									evt.initEvent('ended', true, true);
									document.dispatchEvent(evt);
								}
							},note_length);
						}
					}

					function writeUTFBytes(view, offset, string){
						var lng = string.length;
						for (var i = 0; i < lng; i++){
							view.setUint8(offset + i, string.charCodeAt(i));
						}
					}

					function encode(text){
						var payloadLength = text.length;
						var arr = text.split("");
						var arr2 = [];

						//add the specified start code
						for(var i=0; i < start_array.length; i++){
							arr2.push(start_array[i]);
						}

						//add the length bits
						var tmpArr = (""+payloadLength).split("");
						if(tmpArr.length<3){
							for(var i = 0; i<(3 - tmpArr.length+1);i++){
								tmpArr.unshift("0");//dunno if it should be an int or char, don't think it matters
							}
						}

						for(var i=0; i< tmpArr.length; i++){
							arr2.push(tmpArr[i]);
						}

						//add the actual text
						for(var i=0; i< arr.length; i++){
							arr2.push(arr[i]);
						}

						//add the checksum
						var checksum = generate_checksum(text);

						var tmpArr = (""+checksum).split("");
						if(tmpArr.length<3){
							for(var i = 0; i<(3 - tmpArr.length+1);i++){
								tmpArr.unshift("0");//dunno if it should be an int or char, don't think it matters
							}
						}
						for(var i=0; i< tmpArr.length; i++){
							arr2.push(tmpArr[i]);
						}


						//process everything for duplicates and capitals
						var ip = [];

						for(var i=0; i<arr2.length; i++){
							var character = arr2[i];
							if (character != character.toLowerCase()){ // detect capital letters
								ip.push(caps);
							}
							if(arr2[i+1] && arr2[i+1].toLowerCase() == character.toLowerCase() && (character.toLowerCase()!="#") && (character.toLowerCase()!="*")){
								//@@ question - what if upper and lowercase same letter?
								ip.push(dupe);
								i++;
							}
							ip.push(character.toLowerCase());
						}

						console.log("playing "+ip+" length "+payloadLength+" checksum "+checksum);
						return ip;
					}

					function create_oscillator(freq) {
						var source = audioCtx.createOscillator();
						source.frequency.value = freq;
						//safari problem
						source.noteOn ? source.noteOn(0) : source.start(0);
						var gainNode = audioCtx.createGain();
						source.connect(gainNode);
						gainNode.connect(audioCtx.destination);
						gainNode.gain.value = 1;
						return source;
					}
					function play_note(freq){
						tones[freq.toString()] = create_oscillator(freq);
					}
				});
				return p1;
			}

		/***********************************************************************************************
		*
		*	mediascape.association.doAssociation('nws', nwsName, url, repeat)
		*
		*	Function that creates a connection via named web sockets proxy for the association 
		*	of devices. The nwsName defines the name of the channel that will be use to transmit
		*	the url passed as a parameter. If the repeat element is true, then the url will be 
		*	emited every second.
		*
		***********************************************************************************************/

			function nwsAssociationTrigger(args){
				console.log('nwsAssociationTrigger');
				var p1= new Promise(
					function(resolve,reject){
						var deferred = $.Deferred();
						var value;
						var interval;
						var interval1;
						var url;
						var repeatTime=20000;
						if(args[3]){
							value=null;
							delete interval;
							delete interval1;
							mediascape.discovery.connectNWS(args[1]).then(function(e){
								value=e;
								url=args[2];
								if(value.readyState == 1){
									console.log("Start Interval");
									console.log(value.peers.length);
									if(value.peers.length==0||value.peers.length==1) value.emiter=true;
									if(value.peersIds[0]==value.id && value.emiter==true){
										send(url);
									}
								}
								value.ondisconnect = function(event){
									console.log("Disconnection");
									console.log(value.peersIds);
									value.peersIds.splice(value.peersIds.indexOf(event.detail.target.id), 1);
									console.log(value.peersIds);
									if(value.readyState == 1){
										//console.log(value.peersIds[0]);
										//console.log(value.id)
										if(value.peersIds[0]==value.id && value.emiter!=true){
											value.emiter=true;
											//console.log("Send");
											send(url);
											
										}
									}
								};
								value.onmessage = function(e){
									console.log("Message: peersIds");
									console.log(value.peersIds);
									if(e.data.indexOf("peersIds")!=-1) value.peersIds=JSON.parse(e.data).peersIds;
								}

								function send(url){
									if(url.indexOf("localhost")==-1){
										if(url&&url.indexOf("bit.ly")==-1&&bitlyUser!=""&&bitlyPass!=""){
											shortURL(url).then(function(miniUrl){
												console.log(miniUrl.response);
												value.send(miniUrl.response);
												value.send(JSON.stringify({"peersIds":value.peersIds}));
												interval = setInterval(function (){
													console.log(miniUrl.response);
													value.send(miniUrl.response);
													value.send(JSON.stringify({"peersIds":value.peersIds}));
												}, repeatTime);
											});
										}else{
											interval = setInterval(function (){
												console.log(url);
												value.send(url);
												value.send(JSON.stringify({"peersIds":value.peersIds}));
											}, repeatTime);
										}
									}else{
										if((value.peersIds.length==0)||(value.peersIds[0]==value.id)){
											interval = setInterval(function (){
												value.send(miniUrl);
												value.send(JSON.stringify({"peersIds":value.peersIds}));
											}, repeatTime);
										}
									}
								}
							}).catch(function (erorr) {
								console.log(erorr);
							});
						}else{
							mediascape.discovery.connectNWS(args[1]).then(function(e){
								value=e;
								url=args[2];
								if(value.readyState == 1){
									console.log("Emit");
									value.emiter=true;
									if(url.indexOf("localhost")==-1){
										if(args[2]&&url.indexOf("bit.ly")==-1&&bitlyUser!=""&&bitlyPass!=""){
											shortURL(url).then(function(miniUrl){
												console.log(miniUrl.response);
												value.send(miniUrl.response);
												value.close();
											});
										}else{
											console.log(url);
											value.send(url);
											value.close();
										}
									}else{
										value.send(miniUrl);
										value.close();
									}
									value.ondisconnect = function(event){
										value.peersIds.splice(value.peersIds.indexOf(event.detail.target.id), 1);
										if(value.readyState == 1){
											if(value.peersIds[0]==value.id){
												value.send(data.group);
											}
										}
									};
									value.onmessage = function(e){
										if(e.data.indexOf("peersIds")!=-1) value.peersIds=JSON.parse(e.data).peersIds;
									}
								}
							}).catch(function (erorr) {
								console.log(erorr);
							});
						}
					});
				return p1;
			}

		/***********************************************************************************************
		*
		*	mediascape.association.doAssociation('shake', url)
		*
		*	Function that creates a trigger for the Shake&Go method that associates devices. The 
		*	url parameter is the url of the multimedia multi-screen application defined for the 
		*	association.
		*
		***********************************************************************************************/

			function shakeAssociationTrigger(args){
				console.log('shakeAssociationTrigger');
				var p1= new Promise(
					function(resolve,reject){
						var deferred = $.Deferred();
						var time;
						var url=args[1];
						$.ajax({
							type: 'GET',
							url:"http://www.timeapi.org/utc/now.json",
							dataType: 'jsonp',
							jsonpCallback: "myCallback",
							success: function (json) {
								time=Date.parse(new Date(json.dateString));
								if(url&&url.indexOf("bit.ly")==-1&&bitlyUser!=""&&bitlyPass!=""){
								shortURL(url).then(function(miniUrl){
									if(miniUrl.response!=undefined){
										mediascape.discovery.isPresent("geolocation").then(function(dataPresence){
											if(dataPresence.presence){
												mediascape.discovery.getExtra("geolocation").then(function(dataExtra){
													if(dataExtra.extra){
														createMessageEvent("shakeChange", true, "message", 1);
														$.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+dataExtra.extra[0].latitude+","+dataExtra.extra[1].longitude+"&sensor=false", function(place){
															if(place.status==="OK"){
																console.log("The place has been defined");
																req = $.post("http://"+serverUrl+"/api/associate",{timestamp: time,location:{latitude:dataExtra.extra[0].latitude,longitude:dataExtra.extra[1].longitude},place: place.results[0].formatted_address ,url:url, miniUrl:miniUrl.response}, function(data1){
																	if(data1)
																	{
																		console.log(data1);
																		if(data1.response.indexOf('http://')!=-1||data1.response.indexOf('https://')!=-1){
																			createMessageEvent("shakeChange", true, "errorMessage", 1);
																			createMessageEvent("shakeChange", true, "message", 2);
																		}
																		else {
																			createMessageEvent("shakeChange", true, "errorMessage", 1);
																			timeout=setTimeout(function(){
																				createMessageEvent("shakeChange", true, "message", 3);
																				mediascape.association.doAssociation("acoustic", miniUrl.response, false);
																			},5000);
																		}
																	}
																});
															}else{
																console.log("The place has not been defined");
																req = $.post("http://"+serverUrl+"/api/associate",{timestamp: time,location:{latitude:dataExtra.extra[0].latitude,longitude:dataExtra.extra[1].longitude},url:url, miniUrl:miniUrl.response}, function(data1){
																	if(data1)
																	{
																		if(data1.response.indexOf('http://')!=-1||data1.response.indexOf('https://')!=-1){
																			createMessageEvent("shakeChange", true, "errorMessage", 1);
																			createMessageEvent("shakeChange", true, "message", 2);
																		}
																		else {
																			createMessageEvent("shakeChange", true, "errorMessage", 1);
																			timeout=setTimeout(function(){
																				createMessageEvent("shakeChange", true, "message", 3);
																				mediascape.association.doAssociation("acoustic", miniUrl.response, false);
																			},5000);
																		}
																	}
																});
															}
														});
													}
												});
											}
										});
									}
								});
							}
							}
						});
					});
				return p1;
			}

		/***********************************************************************************************
		*
		*	mediascape.association.doAssociation('sync', url)
		*
		*	Function that creates a trigger for the sync method that associates devices. The 
		*	url parameter is the url of the multimedia multi-screen application defined for the 
		*	association.
		*
		***********************************************************************************************/

			function syncAssociationTrigger(args){
				console.log('syncAssociationTrigger');
				var p1= new Promise(
					function(resolve,reject){
						var deferred = $.Deferred();
						var time;
						var timeout;
						var url=args[1];
						$.ajax({
							type: 'GET',
							url:"http://www.timeapi.org/utc/now.json",
							dataType: 'jsonp',
							jsonpCallback: "myCallback",
							success: function (json) {
								time=Date.parse(new Date(json.dateString));
								if(url&&url.indexOf("bit.ly")==-1&&bitlyUser!=""&&bitlyPass!=""){
								shortURL(url).then(function(miniUrl){
									if(miniUrl.response!=undefined){
										mediascape.discovery.isPresent("geolocation").then(function(dataPresence){
											if(dataPresence.presence){
												mediascape.discovery.getExtra("geolocation").then(function(dataExtra){
													if(dataExtra.extra){
														createMessageEvent("shakeChange", true, "message", 1);
														$.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+dataExtra.extra[0].latitude+","+dataExtra.extra[1].longitude+"&sensor=false", function(place){
															if(place.status==="OK"){
																console.log("The place has been defined");
																req = $.post("http://"+serverUrl+"/api/associate",{timestamp: time,location:{latitude:dataExtra.extra[0].latitude,longitude:dataExtra.extra[1].longitude},place: place.results[0].formatted_address ,url:url, miniUrl:miniUrl.response}, function(data1){
																	if(data1)
																	{
																		if(data1.response.indexOf('http://')!=-1||data1.response.indexOf('https://')!=-1){
																			resolve(JSON.parse('{"response":"<p>Association process has been completed successfully</p>"}'));
																		}
																		else {
																			resolve(JSON.parse('{"response":"<p>The device can not be associated.</p>"}'));
																		}
																	}
																});
															}else{
																console.log("The place has not been defined");
																req = $.post("http://"+serverUrl+"/api/associate",{timestamp: time,location:{latitude:dataExtra.extra[0].latitude,longitude:dataExtra.extra[1].longitude},url:url, miniUrl:miniUrl.response}, function(data1){
																	if(data1)
																	{
																		if(data1.response.indexOf('http://')!=-1||data1.response.indexOf('https://')!=-1){
																			resolve(JSON.parse('{"response":"<p>Association process has been completed successfully</p>"}'));
																		}
																		else {
																			resolve(JSON.parse('{"response":"<p>The device can not be associated.</p>"}'));
																		}
																	}
																});
															}
														});
													}
												});
											}
										});
									}
								});
								}
							}
						});
					});
				return p1;
			}

			function dialAssociationTrigger(args){
				console.log('dialAssociationTrigger');
				var p1= new Promise(
					function(resolve,reject){
						var deferred = $.Deferred();
						resolve(JSON.parse('{"response":"<p>The technology has not been developed yet.</p>"}'));
					});
				return p1;
			}

			function presentationAssociationTrigger(args){
				console.log('presentationAssociationTrigger');
				var p1= new Promise(
					function(resolve,reject){
						var deferred = $.Deferred();
						resolve(JSON.parse('{"response":"<p>The technology has not been developed yet.</p>"}'));
					});
				return p1;
			}

		/***********************************************************************************************
		*
		*	mediascape.association.doAssociation("qr", "qrCatcherPlace")
		*
		*	Function that creates a Qr Codes catcher for the association of devices. The second 
		*	parameter is the id of the html element where the QR code reader will be inserted.
		*
		***********************************************************************************************/

			function qrCodeAssociationCatcher(args){
				console.log('qrCodeAssociationCatcher');
				var p1= new Promise(
					function(resolve,reject){
						var deferred = $.Deferred();
						if((navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)){
							if(MediaStreamTrack.toString() == 'function MediaStreamTrack() { [native code] }'){
								MediaStreamTrack.getSources(function(sourceInfos) {
									var videoSource = null;
									for (var i = 0; i != sourceInfos.length; ++i) {
										var sourceInfo = sourceInfos[i];
										if (sourceInfo.kind === 'video') {
											videoSource = sourceInfo.id;
										}
									}
									if(videoSource!=null){
										document.getElementById(args[1]).innerHTML='<h1>Qr Catcher</h1> \
															<br> \
															<div id="camera" style="width:320px;"> \
																<div style="position: relative;display: inline-block;"> \
																	<canvas id="qr-canvas" width="320" height="240" style="border:1px solid red;"></canvas> \
																	<div class="scanner-laser laser-rightBottom" style="opacity: 0.5;"></div> \
																	<div class="scanner-laser laser-rightTop" style="opacity: 0.5;"></div> \
																	<div class="scanner-laser laser-leftBottom" style="opacity: 0.5;"></div> \
																	<div class="scanner-laser laser-leftTop" style="opacity: 0.5;"></div> \
																</div> \
															</div>';
										for(var i=0;i<document.getElementsByClassName("scanner-laser").length;i++) document.getElementsByClassName("scanner-laser")[i].style.display = 'block';
										$('#qr-canvas').WebCodeCam({
											ReadQRCode: true, // false or true
											ReadBarecode: true, // false or true
											width: 320,
											height: 240,
											videoSource: {
												id: videoSource,      //default Videosource
												maxWidth: 640, //max Videosource resolution width
												maxHeight: 480 //max Videosource resolution height
											},
											flipVertical: false,  // false or true
											flipHorizontal: false,  // false or true
											zoom: -1, // if zoom = -1, auto zoom for optimal resolution else int
											beep: "audio/beep.mp3", // string, audio file location
											autoBrightnessValue: false, // functional when value autoBrightnessValue is int
											brightness: 0, // int 
											grayScale: false, // false or true
											contrast: 0, // int 
											threshold: 0, // int 
											sharpness: [], //or matrix, example for sharpness ->  [0, -1, 0, -1, 5, -1, 0, -1, 0]
											resultFunction: function(resText, lastImageSrc) {
												if(resText.indexOf('http://')!=-1||resText.indexOf('https://')!=-1) resolve(JSON.parse('{"response":"'+resText+'"}'));
											},
											getUserMediaError: function() {
												resolve(JSON.parse('{"response":"<p>The browser does not support getUserMedia.</p>"}'));
											},
											cameraError: function(error) {
												resolve(JSON.parse('{"response":"<p>Error with the camera.</p>"}'));
											}
										});
									}else{
										resolve(JSON.parse('{"response":"<p>The device does not contain any camera.</p>"}'));
									}
								});
							} else resolve(JSON.parse('{"response":"<p>The device does not contain any camera.</p>"}'));
						} else resolve(JSON.parse('{"response":"<p>The device does not contain any camera.</p>"}'));
					});
				return p1;
			}

		/***********************************************************************************************
		*
		*	mediascape.association.doAssociation("acoustic", "audioCatcherPlace")
		*
		*	Function that creates an acoustic catcher for the association of devices. The second 
		*	parameter is the id of the html element where the catched information will be shown.
		*
		***********************************************************************************************/

			function acousticAssociationCatcher(args){
				console.log('acousticAssociationCatcher');
				var p1= new Promise(
					function(resolve,reject){
						var deferred = $.Deferred();
						var alphabet = ",0123456789*#.|!:/? abcdefghijklmnopqrstuvwxyz&";
						var hi = 6000;//var hi = 3400;
						var low = 3500;//var low = 900;
						var dupe = "|";
						var caps = "!";

						// keys and associated freqncies
						var freqs = [];
						var keys = [];
						var data = [];

						var increment = parseInt((hi - low)/alphabet.length);
						keys = alphabet.split("");
						var freq = low;
						for(var i=0; i<alphabet.length; i++){
							freqs[i] = freq;
							freq = freq + increment;
						}
						freq_error = increment / 3;

						audioCtx = new (window.AudioContext || window.webkitAudioContext)();

						navigator.getMedia = ( navigator.getUserMedia
									|| navigator.webkitGetUserMedia
									|| navigator.mozGetUserMedia
									|| navigator.msGetUserMedia);

						if(navigator.getMedia){
							navigator.getMedia({audio: true, video: false}, function(stream) {
								console.log("Start Acoustic Catcher");
								var source = audioCtx.createMediaStreamSource(stream);
								var analyser = audioCtx.createAnalyser();
								var filter = audioCtx.createBiquadFilter();
								filter.type = 'highpass';
								filter.frequency.value = 3500; 
								source.connect(filter);
								filter.connect(analyser);

								var bufferLength = analyser.frequencyBinCount;
								var dataArray = new Uint8Array(bufferLength);
								var resul="";
								var checksum="";
								var predecessor="";
								var predecessorletter="";
								var predecessorletter2=false;
								var startProcessing=false;
								var endProcessing=false;
								var repeated=false;
								var upper=false;
								var resultChecksum="";
								var cont=1;
								var oldCont=0;
								var upperLetter="";
								var totalMessage=new Array();
								var totalMessageFrequency=new Array();
								document.getElementById(args[1]).innerHTML="";
								var the_interval = setInterval(function(){
									analyser.getByteFrequencyData(dataArray);
									var amp, freq;
									var max = -Infinity;
									var min = Infinity;
									var index = -1;
									for (var i = 0; i < dataArray.length; i++) {
										if (dataArray[i] > max) {
											max = dataArray[i];
											index = i;
										}
										if (dataArray[i] < max) {
											min = dataArray[i];
										}
									}

									amp = max - min;
									var nyquist = audioCtx.sampleRate/2;
									freq = nyquist/dataArray.length * index;
									totalMessageFrequency.push(result);
									for (var i in freqs){
										if (( freq > freqs[i]-freq_error) && (freq < freqs[i]+freq_error ) && (freq > low)&& (freq < hi)){
											var match = freqs[i];
											var result = keys[i];
											totalMessage.push(result);
											if(checksum.length < 3){
												if(predecessorletter!=""){
													if(predecessor==freqs[i]){
														cont=cont+1;
													}else if(predecessor!=freqs[i]){
															if(cont > 5){
																checksum=checksum+predecessorletter;
																if(checksum=="#*#") {
																	if(startProcessing==true) endProcessing=true;
																	startProcessing=true;
																	resul="#*";
																	createMessageEvent("startAudioProcessing");
																	setTimeout(function(){
																		clearInterval(the_interval);
																		resolve(JSON.parse('{"response":"<p>Problem catching the audio.</p>"}'));
																	},30000);
																}
															}
															oldCont=cont;
															cont=1;
														}
												}
											}
											/*if(predecessor!=freqs[i] && startProcessing && oldCont>5){
												if(result==dupe){
													repeated=true;
													resul=resul+predecessorletter;
													document.getElementById(args[1]).insertAdjacentHTML('beforeend', predecessorletter);
												} else if(result==caps){
															upper=true;
															resul=resul+predecessorletter;
															document.getElementById(args[1]).insertAdjacentHTML('beforeend', predecessorletter);
													 }else if(repeated){
															resul=resul+result;
															repeated=false;
															document.getElementById(args[1]).insertAdjacentHTML('beforeend', result);
														}else if(upper){
																resul=resul+result.toUpperCase();
																upper=false;
																upperLetter=result;
																document.getElementById(args[1]).insertAdjacentHTML('beforeend', result.toUpperCase());
															}else{
																if(predecessorletter!=upperLetter){
																	resul=resul+predecessorletter;
																	document.getElementById(args[1]).insertAdjacentHTML('beforeend', predecessorletter);
																}else upperLetter="";
															}
											}*/
											if(predecessor!=freqs[i] && startProcessing && oldCont>5){
												if(result==caps){
														if(!predecessorletter2){
															console.log("Mayuscula Detectada sin predecesor Mayuscula");
															//if result is !
															upper=true;
															predecessorletter2=true;
															resul=resul+predecessorletter;
															document.getElementById(args[1]).insertAdjacentHTML('beforeend', predecessorletter);
														}else{
															console.log("Mayuscula Detectada con predecesor Mayuscula");
															//if result is !
															upper=true;
															predecessorletter2=true;
														}
													}else if(result==dupe){
															//if result is |
															if(!upper){
																if(!predecessorletter2){
																	console.log("Duplicado Detectado Sin Mayuscula sin predecesor Mayuscula");
																	repeated=true;
																	resul=resul+predecessorletter;
																	document.getElementById(args[1]).insertAdjacentHTML('beforeend', predecessorletter);
																}else{
																	console.log("Duplicado Detectado Sin Mayuscula con predecesor Mayuscula");
																	repeated=true;
																}
															}else{
																console.log("Duplicado Detectado Con Mayuscula");
																repeated=true;
															}
														} else if(upper){
															if(!repeated){
																console.log("Upper !repeated");
																resul=resul+result.toUpperCase();
																upper=false;
																upperLetter=result;
																document.getElementById(args[1]).insertAdjacentHTML('beforeend', result.toUpperCase());
															}else {
																console.log("Upper repeated");
																resul=resul+result.toUpperCase()+result.toUpperCase();
																repeated=false;
																upperLetter=result;
																document.getElementById(args[1]).insertAdjacentHTML('beforeend', result.toUpperCase()+result.toUpperCase());
															}
														}else if(repeated){
																console.log("repeated");
																resul=resul+result;
																repeated=false;
																document.getElementById(args[1]).insertAdjacentHTML('beforeend', result);
																predecessorletter2=false;
															}else{
																console.log("last");
																predecessorletter2=false;
																if(predecessorletter!=upperLetter){
																	resul=resul+predecessorletter;
																	document.getElementById(args[1]).insertAdjacentHTML('beforeend', predecessorletter);
																}else upperLetter="";
															}
											}
											resultChecksum=generate_checksum(resul.substring(6,resul.length-3));
											if(checksum.indexOf("|")==0||checksum.indexOf("|")==1){
												if(checksum.indexOf("|")<checksum.length-1){
													checksum=checksum.replace("|", checksum.substring(checksum.indexOf("|")+1,checksum.indexOf("|")+2));
												}
											}
											if(checksum.length==3 && predecessor!=freqs[i]){
												if(parseInt(checksum)==resultChecksum && resultChecksum!=0){
													clearInterval(the_interval);
													var evt = document.createEvent('Event');
													evt.initEvent('ended', true, true);
													document.dispatchEvent(evt);
												}else checksum=checksum.substring(1,checksum.length);
											}else if(endProcessing){
												clearInterval(the_interval);
												var evt = document.createEvent('Event');
												evt.initEvent('ended', true, true);
												document.dispatchEvent(evt);
											}
											if(checksum.length < 3){
												if(predecessorletter==""){
													predecessor=freqs[i];
													predecessorletter=keys[i];
												}else if(predecessorletter!=""){
													if(predecessor!=freqs[i]){
														predecessor=freqs[i];
														predecessorletter=keys[i];
													}
												}
											}
										}
									}
								},10);

								document.getElementById(args[1]).insertAdjacentHTML('beforeend', "<br>"+resul);
								document.addEventListener('ended', function(e){
									console.log("Ended");
									if(resul!=""){
										console.log("Recived Message: "+resul);
										console.log("Start String: "+resul.substring(0,3));
										console.log("Length: "+resul.substring(3,6));
										console.log("Url: "+resul.substring(6,resul.length-3));
										console.log("Checksum: "+resul.substring(resul.length-3,resul.length));
										document.getElementById(args[1]).insertAdjacentHTML('beforeend', "<br>Result:<br>"+resul.substring(6,resul.length-3));
										clearInterval(the_interval);
										resolve(JSON.parse('{"response":"'+resul.substring(6,resul.length-3)+'"}'));
									}
								});
							}, function(e){alert(e);});
						}else{
							resolve(JSON.parse('{"response":"<p>The device can not catch audio.</p>"}'));
						}
					});
				return p1;
			}

		/***********************************************************************************************
		*
		*	mediascape.association.doAssociation("nws", nwsName)
		*
		*	Function that creates a connection via named web sockets proxy for the association 
		*	of devices. The nwsName defines the name of the channel that will be use to catch
		*	the url emited by the named web sockets trigger.
		*
		***********************************************************************************************/

			function nwsAssociationCatcher(args){
				console.log('nwsAssociationCatcher');
				var p1= new Promise(
					function(resolve,reject){
						var deferred = $.Deferred();
						var value;
						mediascape.discovery.isPresent('namedwebsockets').then(function(data){
							if(data.presence){
								delete value;
								delete interval;
								delete interval1;
								mediascape.discovery.connectNWS(args[1]).then(function(e){
									value=e;
									value.onmessage = function(e){
										console.log(e.data);
										if(e.data.indexOf("peersIds")!=-1) value.peersIds=JSON.parse(e.data).peersIds;
										else if(e.data.indexOf('http://')!=-1||e.data.indexOf('https://')!=-1) resolve(JSON.parse('{"response":"'+e.data+'"}'));
									}
								}).catch(function (erorr) {
									console.log(erorr);
								});
							}else{
								resolve(JSON.parse('{"response":"<p>It has been impossible to find the NamedWebSocket Proxy.</p><p>Remeber that you can associate using On Demand system.</p>"}'));
							}
						});
					});
				return p1;
			}

		/***********************************************************************************************
		*
		*	mediascape.association.doAssociation('shake', "qrCatcherPlace", "audioCatcherPlace")
		*
		*	Function that creates a catcher for the Shake&Go method that associates devices. 
		*	"qrCatcherPlace" parameter is the id of the html element where the QR code reader 
		*	will be inserted and "audioCatcherPlace" parameter is the id of the html element 
		*	where the acoustic catched information will be shown.
		*
		***********************************************************************************************/

			function shakeAssociationCatcher(args){
				console.log('shakeAssociationCatcher');
				var p1= new Promise(
					function(resolve,reject){
						var deferred = $.Deferred();
						$.ajax({
							type: 'GET',
							url:"http://www.timeapi.org/utc/now.json",
							dataType: 'jsonp',
							jsonpCallback: "myCallback",
							success: function (json) {
								time=Date.parse(new Date(json.dateString));
								mediascape.discovery.isPresent("geolocation").then(function(dataPresence){
									if(dataPresence.presence){
										mediascape.discovery.getExtra("geolocation").then(function(dataExtra){
											if(dataExtra.extra){
												createMessageEvent("shakeChange", true, "message", 1);
												$.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+dataExtra.extra[0].latitude+","+dataExtra.extra[1].longitude+"&sensor=false", function(place){
													if(place.status==="OK"){
														req = $.post("http://"+serverUrl+"/api/associate",{timestamp: time,location:{latitude:dataExtra.extra[0].latitude,longitude:dataExtra.extra[1].longitude},place: place.results[0].formatted_address}, function(data1){
															if(data1)
															{
																if(data1.response.indexOf('http://')!=-1||data1.response.indexOf('https://')!=-1) resolve(JSON.parse('{"response":"'+data1.response+'"}'));//window.location=data1.response;
																else {
																	createMessageEvent("shakeChange", true, "errorMessage", 3);
																	timeout=setTimeout(function(){
																		createMessageEvent("shakeChange", false);
																		var args1 =["qr",args[1]];
																		qrCodeAssociationCatcher(args1).then(function(data){
																			if(data.response.indexOf('http://')!=-1||data.response.indexOf('https://')!=-1) resolve(JSON.parse('{"response":"'+data.response+'"}'));
																			else console.log(data.response);
																		});
																		
																		var args2 =["acoustic",args[2]];
																		acousticAssociationCatcher(args2).then(function(data){
																			if(data.response.indexOf('http://')!=-1||data.response.indexOf('https://')!=-1){
																				req = $.post("http://"+serverUrl+"/api/associate",{url:url}, function(data1){
																					resolve(JSON.parse('{"response":"'+data.response+'"}'));//window.location=data.response;
																				});
																			}else{
																				createMessageEvent("shakeChange", true, "errorMessage", 3);
																				timeout=setTimeout(function(){
																					createMessageEvent("shakeChange", false);
																				},5000);
																			}
																		});
																		
																	},5000);
																}
															}
														});
													}else{
														req = $.post("http://"+serverUrl+"/api/associate",{timestamp: time,location:{latitude:dataExtra.extra[0].latitude,longitude:dataExtra.extra[1].longitude}}, function(data1){
															if(data1)
															{
																if(data1.response.indexOf('http://')!=-1||data1.response.indexOf('https://')!=-1) resolve(JSON.parse('{"response":"'+data1.response+'"}'));//window.location=data1.response;
																else {
																	createMessageEvent("shakeChange", true, "errorMessage", 3);
																	timeout=setTimeout(function(){
																		createMessageEvent("shakeChange", false);
																		var args1 =["qr",args[1]];
																		qrCodeAssociationCatcher(args1).then(function(data){
																			if(data.response.indexOf('http://')!=-1||data.response.indexOf('https://')!=-1) resolve(JSON.parse('{"response":"'+data.response+'"}'));//return data;
																			else console.log(data);
																		});
																		var args1 =["acoustic",args[2]];
																		acousticAssociationCatcher(args1).then(function(data){
																			if(data.response.indexOf('http://')!=-1||data.response.indexOf('https://')!=-1) resolve(JSON.parse('{"response":"'+data.response+'"}'));//window.location=data.response;
																			else{
																				createMessageEvent("shakeChange", true, "errorMessage", 3);
																				timeout=setTimeout(function(){
																					createMessageEvent("shakeChange", false);
																				},5000);
																			}
																		});
																	},5000);
																}
															}
														});
													}
												});
											}
										});
									}
								});
							}
						});
					});
				return p1;
			}

		/***********************************************************************************************
		*
		*	mediascape.association.doAssociation('sync')
		*
		*	Function that creates a catcher for the sync method that associates devices.
		*
		***********************************************************************************************/

			function syncAssociationCatcher(args){
				console.log(args);
				console.log('syncAssociationCatcher');
				var p1= new Promise(
					function(resolve,reject){
						var deferred = $.Deferred();
						$.ajax({
							type: 'GET',
							url:"http://www.timeapi.org/utc/now.json",
							dataType: 'jsonp',
							jsonpCallback: "myCallback",
							success: function (json) {
								time=Date.parse(new Date(json.dateString));
								mediascape.discovery.isPresent("geolocation").then(function(dataPresence){
									if(dataPresence.presence){
										mediascape.discovery.getExtra("geolocation").then(function(dataExtra){
											if(dataExtra.extra){
												createMessageEvent("shakeChange", true, "message", 1);
												$.get("http://maps.googleapis.com/maps/api/geocode/json?latlng="+dataExtra.extra[0].latitude+","+dataExtra.extra[1].longitude+"&sensor=false", function(place){
													if(place.status==="OK"){
														$.post("http://"+serverUrl+"/api/associate",{timestamp: time,location:{latitude:dataExtra.extra[0].latitude,longitude:dataExtra.extra[1].longitude},place: place.results[0].formatted_address}, function(data1){
															if(data1)
															{
																if(data1.response.indexOf('http://')!=-1||data1.response.indexOf('https://')!=-1) resolve(JSON.parse('{"response":"'+data1.response+'"}'));
																else {
																	resolve(JSON.parse('{"response":"<p>The device can not be associated.</p>"}'));
																}
															}
														});
													}else{
														$.post("http://"+serverUrl+"/api/associate",{timestamp: time,location:{latitude:dataExtra.extra[0].latitude,longitude:dataExtra.extra[1].longitude}}, function(data1){
															if(data1)
															{
																if(data1.response.indexOf('http://')!=-1||data1.response.indexOf('https://')!=-1) resolve(JSON.parse('{"response":"'+data1.response+'"}'));
																else {
																	resolve(JSON.parse('{"response":"<p>The device can not be associated.</p>"}'));
																}
															}
														});
													}
												});
											}
										});
									}
								});
							}
						});
					});
				return p1;
			}

			function dialAssociationCatcher(args){
				console.log('dialAssociationCatcher');
				var p1= new Promise(
					function(resolve,reject){
						var deferred = $.Deferred();
						resolve(JSON.parse('{"response":"<p>The technology has not been developed yet.</p>"}'));
					});
				return p1;
			}

			function presentationAssociationCatcher(args){
				console.log('presentationAssociationCatcher');
				var p1= new Promise(
					function(resolve,reject){
						var deferred = $.Deferred();
						resolve(JSON.parse('{"response":"<p>The technology has not been developed yet.</p>"}'));
					});
				return p1;
			}

			function shortURL(url){
				console.log("Short");
				var p1= new Promise(
					function(resolve,reject){
						var deferred = $.Deferred();
						if(bitlyPass!==""&&bitlyUser!==""){
							$.ajax({
								url:"http://api.bit.ly/v3/shorten",
								data:{
									longUrl:url,
									apiKey:bitlyPass,
									login:bitlyUser
								},
								dataType:"jsonp"
							})
							.done(function(data, textStatus, jqXHR) {
								if(data.status_code==200){
									var shortedUrl = data.data.url;
									resolve(JSON.parse('{"response":"'+shortedUrl+'"}'));
								}else resolve(JSON.parse('{"response":"<p>It has not been possible to minimize the url.</p>"}'));
							});
						}else resolve(JSON.parse('{"response":"<p>It has not been possible to minimize the url.<p></p> Define a Bitly user and pass.</p>"}'));
					});
				return p1;
			}

			function generate_checksum(str){
				var utf8 = unescape(encodeURIComponent(str));

				var total = 0;
				for (var i = 0; i < utf8.length; i++) {
					var byte = utf8.charCodeAt(i);
					total = total + byte;
				}
				var checksum = 255 & total;
				return checksum;
			}
		};


		/*****************************************************************************************
		*
		*	mediascape.association.stopAssociation('acoustic')
		*
		*	Function that stops acoustic association processes.
		*
		******************************************************************************************/

		this.stopAssociation = function(type){
			console.log('stopFSKModulator');
			var p1= new Promise(
				function(resolve,reject){
					var deferred = $.Deferred();
					if(type==="acoustic"){
						if(freq){
							stop_playing_note(freq);
							clearInterval(interval);
						}else{
							clearInterval(interval);
						}
					}
					if(audioCtx!=undefined) audioCtx.close();
					clearTimeout(timeout);
					if(req!=undefined) req.abort();
			});
			return p1;
		};


		/*****************************************************************************************
		*
		*	mediascape.association.on('event',cb(messageJSON))
		*
		*	Function that catches event during the association processes.
		*
		******************************************************************************************/

		this.on = function(type,callback){
			console.log('on');
			if(type=='shakeChange'){
				document.addEventListener("shakeChange",function(event){
					callback(JSON.parse('{"response":'+JSON.stringify(event.detail)+'}'));
				});
			}else if(type=='startAudioProcessing'){
				document.addEventListener("startAudioProcessing",function(){
					callback();
				});
			}
		};

		function stop_playing_note(freq){
			var note = tones[freq.toString()];
			if(note!=undefined) note.noteOff ? note.noteOff(0) : note.stop(0);
			delete tones[freq];
		}

		function createMessageEvent(){
			console.log('createMessageEvent');
			var args = Array.prototype.slice.call(arguments);
			var myEvent;
			if(args.length==4){
				myEvent = new CustomEvent(args[0], {
					detail: {
						show: args[1],
						type: args[2],
						text: args[3]
					}
				});
			}else{
				myEvent = new CustomEvent(args[0], {
					detail: {
						show: args[1],
					}
				});
			}
			document.dispatchEvent(myEvent);
		};

	};
	Association.__moduleName = "association";

	return Association;
});
