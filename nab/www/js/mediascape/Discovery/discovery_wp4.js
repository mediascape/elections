define(["mediascape/Agentcontext/agentcontext", "shake"], function (agentContext, Shake) {

    var DiscoveryWP4 = function () {
        // Synchronous items first
        var ac = mediascape.agentContext;
        var instruments = {};
        // Screen size
        if (window.innerHeight) {
            instruments.screenSize = {
                init: function () {
                    this.setCapability("screenSize", "supported");
                    ac.setItem("screenSize", [window.innerWidth, window.innerHeight]);
                },
                on: function () {
                    window.onresize = function () {
                        ac.setItem("screenSize", [window.innerWidth, window.innerHeight]);
                    }
                },
                off: function () {
                    window.onresize = null;
                }
            }
        }

        // Language
        if (navigator.language) {
            instruments.language = {
                init: function () {
                    this.setCapability("language", "supported");
                    ac.setItem("language", navigator.language);
                }
            }
        }

        // Platform
        if (navigator.platform) {
            instruments.platform = {
                init: function () {
                    this.setCapability("platform", "supported");
                    mediascape.DeviceProfile.checkDevice(navigator.platform).done(function(result){
                      ac.setItem("platform", result.deviceType);
                    });

                },
                on:function{
                  mediascape.DeviceProfile.checkDevice(navigator.platform).done(function(result){
                    ac.setItem("platform", result.deviceType);
                  });
                }
            }
        }

        // Product
        if (navigator.product) {
            instruments.navigatorProduct = {
                init: function () {
                    this.setCapability("navigatorProduct", "supported");
                    ac.setItem("navigatorProduct", navigator.product);
                }
            }
        }

        // Online?
        if (navigator.onLine) {
            instruments.onLine = {
                init: function () {
                    this.setCapability("onLine", "supported");
                }
            }
        }


        // Geolocation
        if (navigator.geolocation) {
            // TODO: check if geolocation actually returns something (seems to not do it on my non-gps enabled desktop)
            var wid;
            instruments.geolocation = {
                init: function () {
                    this.setCapability("geolocation", "supported")
                },
                on: function () {
                    wid = navigator.geolocation.watchPosition(function (position) {
                        ac.setItem("geolocation", position);
                    });
                },
                off: function () {
                    navigator.geolocation.clearWatch(wid);
                }
            }
        }

        // UserProximity
        if (window.UserProximityEvent) {
            function listener(e) {
                ac.setItem("userProximity", event.near);
            }
            instruments.userProximity = {
                init: function () {
                    this.setCapability("userProximity", "supported");
                },
                on: function () {
                    window.addEventListener("userProximity", listener);
                },
                off: function () {
                    window.removeEventListener("userProximity", listener);
                }
            }
        }

        // Touch device
        if ("ontouchstart" in window) {
            instruments.touchScreen = {
                init: function () {
                    this.setCapability("touchScreen", "supported");
                }
            }
        }

        // Vibration
        if (navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate) {
            instruments.vibrate = {
                init: function () {
                    this.setCapability("vibrate", "maybe") // Chrome on my desktop believes it can vibrate, even returns true to vibrate(time)...
                }
            }
        }

        // Device orientation
        if (window.DeviceOrientationEvent) {
            // TODO: Downsample, convert to something more useful?
            var events = [];
            var last_report = 0;

            function average(dataset, key) {
                var count = 0;
                var val = 0.0;
                for (var i in dataset) {
                    val += dataset[i][key];
                    count++;
                }
                return val / count;
            }

            function orientationHandler(e) {
                var event = {
                    alpha: e.alpha,
                    beta: e.beta,
                    gamma: e.gamma
                }
                events.push(event);
                var now = new Date();
                if (now - last_report > 150) {
                    // Average
                    var event = {
                        alpha: average(events, "alpha"),
                        beta: average(events, "beta"),
                        gamma: average(events, "gamma")
                    };
                    ac.setItem("deviceOrientation", event);
                    events = [];
                    last_report = now;
                }
            }

            instruments.deviceOrientation = {
                init: function () {
                    var t = this;
                    this.setCapability("deviceOrientation", "unsupported");

                    function test(e) {
                        window.ondeviceorientation = null;
                        if (e.gamma == null && e.beta == null && e.alpha == null) {
                            t.setCapability("deviceOrientation", "unsupported");
                        } else {
                            t.setCapability("deviceOrientation", "supported");
                        }
                    }
                    window.ondeviceorientation = test;
                },
                on: function () {
                    window.addEventListener("deviceorientation", orientationHandler);
                },
                off: function () {
                    window.removeEventListener("deviceorientation", orientationHandler);
                }
            }
        }

        // Screen orientation
        if (window.orientation != undefined) {
            var orientations = {
                "0": "portait",
                "90": "landscape",
                "180": "reverse portait",
                "-90": "reverse landscape"
            }

            function handler() {
                ac.setItem("orientation", orientations[window.orientation])
            }
            instruments.orientation = {
                init: function () {
                    this.setCapability("orientation", "supported");
                },
                on: function () {
                    window.addEventListener("orientationchange", handler);
                    handler(); // Trigger handling now
                },
                off: function () {
                    window.removeEventListener("orientationchange", handler);
                }
            }

        }

        // Device motion
        if (window.DeviceMotionEvent) {
            var motions = [];
            var last_motion_report = 0;

            function average(dataset, key) {
                var count = 0;
                var val = 0.0;
                for (var i in dataset) {
                    val += dataset[i][key];
                    count++;
                }
                return val / count;
            }

            // Bind to sensors
            var on_device_motion = function (event) {
                var x = event.accelerationIncludingGravity.x;
                var y = event.accelerationIncludingGravity.y;
                var z = event.accelerationIncludingGravity.z;
                var val = {
                    x: x,
                    y: y,
                    z: z,
                    xAngle: Math.atan2(y, z),
                    yAngle: Math.atan2(x, z),
                    zAngle: Math.atan2(x, y)
                };

                motions.push(val);
                var now = new Date();
                if (now - last_motion_report > 150) {
                    // Create averages
                    var v = {
                        x: average(motions, "x"),
                        y: average(motions, "y"),
                        z: average(motions, "z"),
                        xAngle: average(motions, "xAngle"),
                        yAngle: average(motions, "yAngle"),
                        zAngle: average(motions, "zAngle"),
                    };
                    ac.setItem("deviceMotion", v)
                    motions = [];
                    last_motion_report = now;
                }
            }

            instruments.deviceMotion = {
                init: function () {
                    this.setCapability("deviceMotion", "unsupported");
                    var t = this;
                    motiontest = function (e) {
                        window.ondevicemotion = null;
                        if (e.acceleration.x == null && e.acceleration.y == null && e.acceleration.z == null) {
                            t.setCapability("deviceMotion", "unsupported");
                        } else {
                            t.setCapability("deviceMotion", "supported");
                        }
                    }

                    if (window.DeviceMotionEvent == undefined) {
                        t.setCapability("deviceMotion", "unsupported");
                    } else {
                        // Can't use addEventListener as Android fails to unregister it later!
                        window.ondevicemotion = motiontest;
                    };
                },
                on: function () {
                    window.addEventListener("devicemotion", on_device_motion, false);
                },
                off: function () {
                    window.removeEventListener("devicemotion", on_device_motion);
                }
            }
        }

        // Shake - require shake.js to work
        if (Shake) {
            window.myShakeEvent = new Shake({
                threshold: 3, // optional shake strength threshold
                timeout: 100 // optional, determines the frequency of event generation
            });
        }
        if (window.DeviceMotionEvent && window.myShakeEvent) {
            instruments.shake = {
                init: function () {
                    var t = this;
                    this.setCapability("shake", "unsupported");
                    motiontest = function (e) {
                        window.ondevicemotion = null;
                        if (e.acceleration.x == null && e.acceleration.y == null && e.acceleration.z == null) {
                            t.setCapability("shake", "unsupported");
                        } else {
                            t.setCapability("shake", "supported");
                            var timer;
                            window.addEventListener("shake", function () {
                                if (timer) {
                                    clearTimeout(timer);
                                    timer = null;
                                } else {
                                    ac.setItem("shake", true);
                                }
                                timer = setTimeout(function () {
                                    ac.setItem("shake", false);
                                    timer = null;
                                }, 500);
                            }, false);
                        }
                    }

                    // Can't use addEventListener as Android fails to unregister it later!
                    window.ondevicemotion = motiontest;
                },
                on: function () {
                    window.myShakeEvent.start();
                },
                off: function () {
                    window.myShakeEvent.stop();
                }
            }
        }


        // Connectivity
        if (navigator.connection) {
            var update = function () {
                ac.setItem("connection", navigator.connection.type);
            }
            instruments.connection = {
                init: function () {
                    this.setCapability("connection", "supported");
                    update();
                },
                on: function () {
                    navigator.connection.ontypechange = update;
                },
                off: function () {
                    navigator.connection.ontypechange = null;
                }
            }
        }

        // Pointer function for touch screens
        if (instruments.touchScreen) {
            instruments.pointer = { // Add pointer movements @10hz max
                init: function () {
                    this.setCapability("pointer", "supported");
                },
                on: function () {
                    var startpos = [null, null];
                    document.ontouchstart = function (event) {
                        var touchobj = event.changedTouches[0];
                        startpos = [touchobj.clientX, touchobj.clientY];
                    }
                    var last_report = 0;
                    document.ontouchmove = function (event) {
                        if (new Date() - last_report > 100) {
                            last_report = new Date();
                            var touchobj = event.changedTouches[0];
                            ac.setItem("pointer", {
                                x: touchobj.clientX,
                                y: touchobj.clientY,
                                deltaX: touchobj.clientX - startpos[0],
                                deltaY: startpos[1] - touchobj.clientY
                            });
                        }
                    };
                },
                off: function () {
                    document.ontouchstart = null;
                    document.ontouchmove = null;
                }
            }
        }

        // Load them
        ac.load(instruments);

        // Asynchronous items

        // Camera && audio recordings
        if (typeof MediaStreamTrack.getSources != 'undefined') { // changed to .getSources as MediaStreamTrack is also available on Firefox, but without .getSources

            var audio = false;
            var video = [];
            MediaStreamTrack.getSources(function (sources) {
                for (var idx = 0; idx < sources.length; idx++) {
                    if (sources[idx].kind === "audio") {
                        audio = true;
                    } else if (sources[idx].kind === "video") {
                        video.push(sources[idx].facing);
                    }
                }

                var i = {};
                if (audio) {
                    i.microphone = {
                        init: function () {
                                this.setCapability("microphone", "supported");
                            }
                            // Don't do on/off as we don't know how to make the data available
                    }
                }
                if (video) {
                    i.camera = {
                        init: function () {
                                this.setCapability("camera", "supported");
                                ac.setItem("camera", video);
                            }
                            // Don't do on/off as we don't know how to make the data available
                    }
                }
                if (audio || video != {}) {
                    ac.load(i);
                }
            });

        }

        // Battery
        if (navigator.getBattery) {
            navigator.getBattery().then(function (battery) {
                function updateBattery(battery) {
                    var state = {
                        "level": battery.level,
                        "charging": battery.charging,
                        "dischargeTime": battery.dischargeTime
                    };
                    ac.setItem("battery", state);
                }
                var instrument = {
                    init: function () {
                        this.setCapability("battery", "supported");
                        updateBattery(battery);
                    },
                    on: function () {
                        battery.onlevelchange = function () {
                            updateBattery(battery);
                        };
                        battery.onchargingchange = function () {
                            updateBattery(battery);
                        };
                        battery.ondischargingtimechange = function () {
                            updateBattery(battery);
                        };
                    },
                    off: function () {
                        battery.onlevelchange = undefined;
                        battery.onchargingchange = undefined;
                        battery.ondischarchingtimechange = undefined;
                    }
                };
                ac.load({
                    "battery": instrument
                });
            });
        }
    };

    DiscoveryWP4.__moduleName = "discovery_wp4";

    return DiscoveryWP4;
});
