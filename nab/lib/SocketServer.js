#!/usr/bin/env node

"use strict";

/**
 * MediaScape SharedState - SocketServer.js
 * Enable the Socket connection
 *
 * @author Andreas Bosl <bosl@irt.de>
 * @copyright 2014 Institut für Rundfunktechnik GmbH, All rights reserved.
 */

function SocketServer(server) {
    var that;

    var EventEmitter = require('events').EventEmitter;

    var config = require('../config');

    var log4js = require('log4js');
    log4js.configure(config.logConfig);
    var logger = log4js.getLogger('SocketServer');

    var io = require('socket.io')(server);

	var Tweet = require('../models/tweet');

    var cookieParser = require('cookie-parser');
    var session = require('express-session');
    var sessionStore = require('connect-mongo')(session);
    var passportSocketIo = require("passport.socketio");

    var nameSpaces = {};


    io.use(passportSocketIo.authorize({
        cookieParser: cookieParser,
        key: config.auth.session_name, // the name of the cookie where express/connect stores its session_id
        secret: config.auth.session_secret, // the session_secret to parse the cookie
        store: new sessionStore({
            url: config.mongoose.uri + 'session'
        }), // we NEED to use a sessionstore. no memorystore please
        success: onAuthorizeSuccess, // *optional* callback on success - read more below
        fail: onAuthorizeFail, // *optional* callback on fail/error - read more below
    }));

    function onAuthorizeSuccess(data, accept) {
        logger.info('accepted', data.user.displayName);
        accept();
    }

    function onAuthorizeFail(data, message, error, accept) {
        logger.info('User accepted without authentication', message);
        accept();

        // error indicates whether the fail is due to an error or just a unauthorized client
        // if (error) throw new Error(message);
        // send the (not-fatal) error-message to the client and deny the connection
        // return accept(new Error(message));
    }



    function init() {
        io.on('connection', function (socket) {
            socket.on('getMapping', function (request) {
                if (!config.auth.useAuthentication) {
                    if (request.userId || (request.groupId && !request.appId)) {
                        that.emit('getMapping', request, function (response) {
                            socket.emit('mapping', response);
                        });
                    }
                } else {
                    if (socket.request.user.logged_in && socket.request.user.id) {
                        request.userId = socket.request.user.id;
                        that.emit('getMapping', request, function (response) {
                            socket.emit('mapping', response);
                        });
                    } else {
                        if (request.groupId && !request.appId) {
                            that.emit('getMapping', request, function (response) {
                                socket.emit('mapping', response);
                            });
                        }
                    }

                }
            });
		var oldTime;
		socket.on('start', function(time) {
			console.log('start');
			console.log(time);
			time=(time*1000)-7200000;
			oldTime=time;
			var names = 'Elecciones, elecciones, Hauteskundeak, hauteskundeak, eleccion, #elecciones24m, #24m, #L6elecciones,#eleccionesA3, #eleccion2015, hauteskundeak, elecciones, @hauteskundeak, #hauteskundeak2015, #Elecciones2015, #hauteskundeak15, #Elecciones15, #M24Donostia, #eleccionesVG, @Navarra2015, #Navarra24M, #24M, #M24Donostia, #EleccionesNA15, #Navarra24M, @PPopular, @PSOE, @vox_es, @UPyD, @ahorapodemos, @PartidoPACMA, @Equo, @CiudadanosCs, @webpcpe, @RecortesCero, @phumanista_esp, #UPyD, #PSOE, #PP, #BILDU, #Podemos, #HagamosHistoria24M, #VOX, #AhoraVOX, #Ciudadanos, #UPN, @PPvasco, @UPyDEuskadi, @Cs_Euskadi, @IrabaziEuskadi, @PES_PSE, @EzkerBatua, @ealkartasuna, @plaZFeminista, @PodemosEuskadi_, @ehbildu, @IkuneICP, @eajpnv, @PacmaEuskadi, @UdalBerri, @EquoNavarfarroa, #LaAlternativaVerde, #AukeraVerdea, @EquoNavarra, @PacmaNavarra';
			Tweet.find({created_at: { $lt: new Date(time)}}).exec(function(err, posts) {
				if(posts){
					for(var i=0;i<posts.length;i++){
						var data=JSON.parse(posts[i].data);
						var places = ["Bilbao", "Bilbo", "Donostia", "Donosti", "San Sebastián", "San Sebastian", "Vitoria", "Gasteiz", "Pamplona", "Iruña", "Vizkaya", "Bizkaia", "Guipúzcoa", "Guipuzcoa", "Gipuzkoa", "Álava", "Alava", "Araba", "Navarra", "Nafarroa","bilbao", "bilbo", "donostia", "donosti", "san sebastián", "san sebastian", "vitoria", "gasteiz", "pamplona", "iruña", "vizkaya", "bizkaia", "guipúzcoa", "guipuzcoa", "gipuzkoa", "álava", "alava", "araba", "navarra", "nafarroa", "EH", "Euskal Herria", "Euskadi"];
						if(data.user.location){
							if(exist(data.user.location,places)){
								socket.emit('place', data);
							}
						}
					}
				}
			});
		});

		socket.on('time', function(data) {
			console.log('time');
			console.log(data.timestamp);
			var time=(data.timestamp*1000)-7200000;
			if(time-3000!=oldTime&&time+3000!=oldTime){
				console.log("Changed");
				socket.emit('changed');
				Tweet.find({created_at: { $lt: new Date(time)}}).exec(function(err, posts) {
					if(posts){
						for(var i=0;i<posts.length;i++){
							var data=JSON.parse(posts[i].data);
							var places = ["Bilbao", "Bilbo", "Donostia", "Donosti", "San Sebastián", "San Sebastian", "Vitoria", "Gasteiz", "Pamplona", "Iruña", "Vizkaya", "Bizkaia", "Guipúzcoa", "Guipuzcoa", "Gipuzkoa", "Álava", "Alava", "Araba", "Navarra", "Nafarroa","bilbao", "bilbo", "donostia", "donosti", "san sebastián", "san sebastian", "vitoria", "gasteiz", "pamplona", "iruña", "vizkaya", "bizkaia", "guipúzcoa", "guipuzcoa", "gipuzkoa", "álava", "alava", "araba", "navarra", "nafarroa", "EH", "Euskal Herria", "Euskadi"];
							if(data.user.location){
								if(exist(data.user.location,places)){
									socket.emit('place', data);
								}
							}
						}
					}
				});
			}
			oldTime=time;
			console.log(time);
			var names = 'Bilbao", "Bilbo", "Donostia", "Donosti", "San Sebastián", "San Sebastian", "Vitoria", "Gasteiz", "Pamplona", "Iruña", "Vizkaya", "Bizkaia", "Guipúzcoa", "Guipuzcoa", "Gipuzkoa", "Álava", "Alava", "Araba", "Navarra", "Nafarroa';
			Tweet.find({ data : new RegExp(data.text.split(', ').join('|'), "i")}).where('created_at',new Date(time)).exec(function(err, posts) {
				if(posts&&posts.length>0){
					var data=JSON.parse(posts[0].data);
					socket.emit("tweet", data);
				}
			});
			Tweet.find({ data : new RegExp(names.split(', ').join('|'), "i")}).where('created_at',new Date(time)).exec(function(err, posts) {
					if(posts){
						console.log(posts.length);
						for(var i=0;i<posts.length;i++){
							var data=JSON.parse(posts[i].data);
							var centerLat = 0;
							var centerLng = 0;
							if (data.coordinates){
								if (data.coordinates !== null){
									//If so then build up some nice json and send out to web sockets
									if((43.930152>=data.coordinates.coordinates[0]>=41.890633)&&(-3.448726>=data.coordinates.coordinates[1]>=-0.551836)){
										console.log("coordinates");
										var outputPoint = {"lat": data.coordinates.coordinates[0],"lng": data.coordinates.coordinates[1]};

										//Send out to web sockets channel.
										socket.emit('place', data);
									}
								} else if(data.place){
									console.log("Place");
									if(data.place.bounding_box === 'Polygon'){
										// Calculate the center of the bounding box for the tweet
										var coord, _i, _len;

										for (_i = 0, _len = coords.length; _i < _len; _i++) {
											coord = coords[_i];
											centerLat += coord[0];
											centerLng += coord[1];
										}
										centerLat = centerLat / coords.length;
										centerLng = centerLng / coords.length;

										// Build json object and broadcast it
										var outputPoint = {"lat": centerLat,"lng": centerLng};
										socket.emit('place', data);
									}
								}
							}else if(data.user.location){
								var places = ["Bilbao", "Bilbo", "Donostia", "San Sebastián", "San Sebastián","Vitoria", "Gasteiz", "Pamplona", "Iruña","Vizkaya", "Bizkaia", "Guipúzcoa", "Guipuzcoa", "Gipuzkoa", "Álava", "Alava", "Araba", "Navarra", "Nafarroa"];
								if(exist(data.user.location,places)){
									console.log("Location");
									if(data.user.location.toLowerCase().indexOf("bilbao")!=-1||data.user.location.toLowerCase().indexOf("bilbo")!=-1){
										centerLng = 43.2633235;
										centerLat = -2.9335644;
									}
									if(data.user.location.toLowerCase().indexOf("vizkaya")!=-1||data.user.location.toLowerCase().indexOf("bizkaia")!=-1){
										centerLng = 43.2195601;
										centerLat = -2.9309956;
									}
									if(data.user.location.toLowerCase().indexOf("san sebastián")!=-1||data.user.location.toLowerCase().indexOf("san sebastian")!=-1||data.user.location.toLowerCase().indexOf("donostia")!=-1){
										centerLng = 43.3072926;
										centerLat = -1.9738829;
									}
									if(data.user.location.toLowerCase().indexOf("guipúzcoa")!=-1||data.user.location.toLowerCase().indexOf("guipuzcoa")!=-1||data.user.location.toLowerCase().indexOf("gipuzkoa")!=-1){
										centerLng = 43.1454624;
										centerLat = -2.1660135;
									}
									if(data.user.location.toLowerCase().indexOf("vitoria")!=-1||data.user.location.toLowerCase().indexOf("gasteiz")!=-1){
										centerLng = 42.8540369;
										centerLat = -2.6771581;
									}
									if(data.user.location.toLowerCase().indexOf("álava")!=-1||data.user.location.toLowerCase().indexOf("alava")!=-1||data.user.location.toLowerCase().indexOf("araba")!=-1){
										centerLng = 42.8446121;
										centerLat = -2.759727;
									}
									if(data.user.location.toLowerCase().indexOf("pamplona")!=-1||data.user.location.toLowerCase().indexOf("iruña")!=-1){
										centerLng = 42.815766;
										centerLat = -1.6500216;
									}
									if(data.user.location.toLowerCase().indexOf("navarra")!=-1||data.user.location.toLowerCase().indexOf("nafarroa")!=-1){
										centerLng = 42.6123428;
										centerLat = -1.6120166;
									}
									// Build json object and broadcast it
									var outputPoint = {"lat": centerLat,"lng": centerLng};
									socket.emit('place', data);
								}
							}
						}
					}
				});
		});
		socket.emit('connected');
	});
	function exist(term,list){
		for(var i=0;i<list.length;i++){
			if(list[i].toLowerCase()==term.toLowerCase()) return true;
		}
		return false;
	}
    }

    function createNameSpace(path) {
        var nsp = io.of('/' + path);



        logger.info('created nsp with', path);
        var clients = {};
        var allowedUsers = [];

        nsp.on('connection', function (socket) {


            var thisIsGroup = false;

            socket.on('join', onJoin);
            socket.on('disconnect', onDisconnect);
            socket.on('changePresence', onChangePresence);
            socket.on('getState', onGetState);
            socket.on('changeState', onChangeState);
            socket.on('getInitState', onGetInitState);

            function onGetInitState(data) {
                if (checkIfAllowed()) {
                    that.emit('getState', path, data, function (datagram) {
                        sendPrivate('initState', datagram);
                    });
                } else {
                    sendPrivate('ssError', 'not logged in');
                }
            };

            function onJoin(data) {
                logger.debug('somebody want to join', path, 'with', data);
                if (config.auth.useAuthentication) {
                    data.userId = socket.request.user.id;
                }
                that.emit('join', path, data, function (allowed, isGroup) {
                    logger.info('path', path, 'data', data, 'allowed', allowed, 'isGroup', isGroup);
                    if (allowed) {
                        socket.MSagentID = data.agentID
                        socket.MSpresence = 'connected';
                        allowedUsers.push(socket.request.user.id);
                        clients[socket.id] = socket;
                        sendPrivate('joined', data);
                        if (isGroup) {
                            thisIsGroup = true;
                        }
                        doStatus();
                        doUpdateStatus(socket);
                    } else {
                        sendPrivate('ssError', 'not allowed to join');
                    }
                });


            };

            function onDisconnect() {
                if (allowedUsers.indexOf(socket.request.user.id) >= 0) {
                    allowedUsers.splice(allowedUsers.indexOf(socket.request.user.id), 1);
                }
                if (clients[socket.id]) {
                    delete clients[socket.id];
                    doUpdateStatus(socket.MSagentID);
                }
            };


            function onChangePresence(data) {
                if (checkIfAllowed()) {
                    if (data.agentID == socket.MSagentID) {
                        socket.MSpresence = data.presence;
                        doUpdateStatus(socket);
                    } else {
                        sendPrivate('ssError', 'wrong AgentID??');
                    }
                } else {
                    sendPrivate('ssError', 'not logged in');
                }
            };


            function onGetState(data) {
                if (checkIfAllowed()) {
                    doGetState(data);
                } else {
                    sendPrivate('ssError', 'not logged in');
                }
            };


            function onChangeState(data) {
                if (checkIfAllowed()) {
                    doChangeState(data);
                } else {
                    sendPrivate('ssError', 'not logged in');
                }
            };

            function doStatus() {
                if (checkIfAllowed()) {
                    var clientKeys = Object.keys(clients);
                    var statusInfo = {
                        clients: clientKeys.length,
                        presence: []
                    }
                    for (var i = 0; i < clientKeys.length; i++) {
                        var clientstatus = {
                            key: clients[clientKeys[i]].MSagentID,
                            value: clients[clientKeys[i]].MSpresence
                        };
                        statusInfo.presence.push(clientstatus);
                    }

                    sendPrivate('status', statusInfo);
                }
            };

            function doUpdateStatus(theSocket) {
                if (checkIfAllowed()) {
                    var clientKeys = Object.keys(clients);

                    var statusInfo = {
                        clients: clientKeys.length,
                        presence: []
                    }


                    if (typeof theSocket == 'string') {
                        statusInfo.presence = [{
                            key: theSocket,
                            value: 'offline'
                    }];
                    } else {
                        statusInfo.presence = [{
                            key: theSocket.MSagentID,
                            value: theSocket.MSpresence
                    }];
                    }

                    sendAll('status', statusInfo);
                } else {
                    sendPrivate('ssError', 'not logged in');
                }
            };

            function doGetState(data) {
                that.emit('getState', path, data, function (datagram) {
                    sendPrivate('changeState', datagram);
                });
            };

            function doChangeState(data) {
                that.emit('changeState', path, data);
            };

            function sendPrivate(event, msg) {
                socket.emit(event, msg);
            };

            function sendAll(event, msg) {
                nsp.emit(event, msg);
            }

            function checkIfAllowed() {
                if (thisIsGroup) {
                    return true;
                }
                if ((socket.request.user.logged_in && socket.request.user.id) || !config.auth.useAuthentication) {
                    if (allowedUsers.indexOf(socket.request.user.id) >= 0) {
                        return true;
                    } else {
                        return false;
                    }

                } else {
                    return false;
                }
            }

            nsp.sendALL = sendAll;
        });



        nameSpaces[path] = nsp;
    };





    function createNSP(pathes) {
        if (Array.isArray(pathes)) {
            for (var i = 0, len = pathes.length; i < len; i++) {
                createNameSpace(pathes[i]);
            }
        } else {
            createNameSpace(pathes);
        }
    };



    function changeState(path, data) {
        nameSpaces[path].sendALL('changeState', data);
    };


    that = {
        changeState: changeState,
        createNSP: createNSP

    };

    init();

    that.__proto__ = EventEmitter.prototype;

    return that;
}

module.exports = SocketServer;
