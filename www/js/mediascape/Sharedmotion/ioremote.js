////////////////////////////////////////////////////////////
// 
// AUTHOR : Ingar Arntzen, Motion Corporation
//
////////////////////////////////////////////////////////////

var MSV = function(_MSV_) {

    var MsvCmd = MSV.MsvCmd;
    var MsgType = MSV.MsgType;

    ////////////////////////////////////////////////////////////
	  // PINGER
	  ////////////////////////////////////////////////////////////

	  // Using three phases to implement backoff in tick frequency. 
	  // It is possible to use a more sophisticated function instead.
	  // e.g. (1 + tanh((x-c)/w))/2
	  // 
	  // Possible optimization, a function could be provided by the 
	  // programmer to specify a specific policy. 

	  var Tick = {
	    'SWITCH_MEDIUM': 3,
	    'SWITCH_LARGE': 10,
	    'SMALL_DELTA': 20,
	    'MEDIUM_DELTA': 500,
	    'LARGE_DELTA': 10000
	  };

	  var makePinger = function(ping_delay) {
	    var self = {};
	    var count = 0;
	    var tid = null;
	    var onping = null;

	    if (!ping_delay) {
	      ping_delay = Tick.LARGE_DELTA;
	    }

	    var pause = function() {
	      if (tid !== null) {
	        clearTimeout(tid);
	        tid = null;
	      }
	    };

	    var resume = function() {
	      if (tid !== null) {
	        clearTimeout(tid);
	        tid = null;
	      }
	      tick();
	    };

	    var tick = function() {
	      count += 1;
	      if (count < Tick.SWITCH_MEDIUM) {
	        this._tid = setTimeout(tick, Tick.SMALL_DELTA);
	      } else if (count < Tick.SWITCH_LARGE) {
	        tid = setTimeout(tick, Tick.MEDIUM_DELTA);
	      } else {
	        tid = setTimeout(tick, ping_delay);
	      }
	      if (onping) {
	        onping();
	      }
	    }

	    self.set_onping = function(handler) {
	      onping = handler;
	    };
	    self.pause = pause;
	    self.resume = resume;
	    self.start = function() {
	      count = 0;
	      resume();
	    };
	    return self;
	  };

  

    ////////////////////////////////////////////////////////////
    // SERVER CLOCK
    ////////////////////////////////////////////////////////////
    
    // server_clock = client_clock + skew

    var makeServerClock = function () {
		var self = {};
		var log = [];
		var N = 30;
		var est_trans = 1000.0;
		var est_skew = 0.0;

		var add_sample = function (cs, ss, cr) {
		    var trans = (cr-cs)/2.0;
		    var skew = ss-(cr+cs)/2.0;
		    var entry = [cs, ss, cr, trans, skew];

		    // Append to log
		    log.push(entry);
		    if (log.length > N) {
				// Remove first entry
				log.shift();
		    }
		    // Reevaluate estimates for trans and skew
		    var trans = 100000.0;
		    var skew = 0.0;
		    for (var i = 0; i < log.length; i++) {
				var e = log[i];
				if (e[3] < trans) {
				    trans = e[3];
				    skew = e[4];
				}	    
		    }
		    est_trans = trans;
		    est_skew = skew;
		};

		// server_clock = client_clock + skew
		var get_server_clock = function () {
		    return MSV.client_clock() + est_skew;
		};

		var get_skew = function () {
		    return est_skew;
		};

		var get_trans = function () {
		    return est_trans;
		};

		self.add_sample = add_sample;
		self.get_server_clock = get_server_clock;
		self.get_skew = get_skew;
		self.get_trans = get_trans;
		return self;
    };


    ////////////////////////////////////////////////////////////
    // HTTP REQUEST
    ////////////////////////////////////////////////////////////

    /*
    This implements HTTP Request.
    It is a simple emulation of the XMLHTTPRequest, limited
    to HTTP GET requests.
    Crucially, the HTTP Request is implemented using the
    script-tag-hack to avoid the cross-domain restrictions
    that apply for XMLHTTPRequest.

    Create a request object:
    var request = HTTPRequest.makeRequest();
    
    Bind handler
    request.set_onresult(my_handler(result));

    Send request (url supposed to be without query/fragments)
    request.send(url, msg)
    
    A single request object can only perform one request at a time.
    Still, it supports repeted sends by buffering. When
    As soon as response is given the next request is pulled from the buffer.

    If paralell execution is wanted this is achieved by using multiple 
    request objects.

    This implementation is tightly integrated with the MSV server.
    The server essentially receives this message request (as part of url query).
    request = {
       cb : "MSV.cb",
       reqid: reqid,
       msg: request-msg,  // actual request msg supplied to send
    };
    It is expected to respond with content-type "application/javascript"
    with the following response body
    MSV.cb(response)
    Where response preserves reqid from request, and adds
    a timestamp ts.
    request = {
       reqid: reqid,
       ts: ts,
       msg: response-msg,  // actual response-msg supplied by server
    };

    MSV.cb is a public function in the MSV namespace. Its single purpose
    is to receive response messages (dressed up as script loads)
    */

    var HTTPRequest = (function () {
		var counter = 1;
		var head_elem = document.getElementsByTagName("head").item(0);
		var pending = {};

		var handle_result = function (msg) {
		    if (msg.hasOwnProperty('reqid')) {
			var reqid = msg['reqid'];
			delete msg['reqid'];
			if (pending.hasOwnProperty(reqid)) {
			    var request = pending[reqid];
			    delete pending[reqid];
			    request.handle_result(msg);		
			}
		    } else {
			throw "HTTPRequest: Missing reqid in response from server";
		    }	    
		};

		var makeRequest = function (_options) {
		    var self = {};
		    var buf = [];
		    var result_handler;
		    var reqid = counter++; 
		    var script_elem;
		    var ts;
		    var tid = null; // script load timeout
		    var options = _options || {};

		    var send = function (url, msg) {
				if (!msg) {
				    throw "HTTPRequest: Send no message";
				}
				// Buffer
				buf.push({url: url, msg:msg});
				// Send
				_send();
		    };

		    var is_sending = function () {
				return (pending.hasOwnProperty(reqid) || buf.length > 0)
		    };
		    
		    var _send = function () {
				var item, url, msg, wmsg, data;

				// Send request only if not busy sending a request		
				if (!pending.hasOwnProperty(reqid) && buf.length > 0) {
				    pending[reqid] = self;
				    // Prepare script element
				    script_elem = document.createElement("script");
				    script_elem.setAttribute("type", "application/javascript");
				    script_elem.setAttribute("charset", "utf-8");
				    script_elem.setAttribute("id", 'JscriptId' + reqid);
				    // Firefox 3.6 : specify that external script-inserted scripts are
				    // to be executed as soon as they arrive from the network. 
				    script_elem.async = true;
				    script_elem.defer = false;
				    // Pop from buf
				    item = buf.shift();
				    url = item['url'];
				    msg = item['msg'];
				    // Hack to ensure that ping timing is not disturbed by buffereing
				    // Overwrite value with actual send time.
				    ts = MSV.client_clock();
				    if (msg.hasOwnProperty('msg')) {
						if (msg['cmd'] === MsvCmd.PING ) {
						    msg['data'] = ts;
						}
				    }
				    // Prepare data
				    msg['cb'] = "MSV.cb";
				    msg['reqid'] = reqid;
				    data = encodeURIComponent(JSON.stringify(msg));
				    // Prepare url 
				    url = url + "?data=" + data + '&noCacheIE=' + ts; 
				    // Send request
				    script_elem.setAttribute("src", url);
				    head_elem.appendChild(script_elem);		
				} 
		    };



		    var set_result_handler = function (handler) {
				result_handler = handler;
		    };
		    
		    var handle_result = function (msg) {
				head_elem.removeChild(script_elem);
				_send();
				// Forward result
				if (result_handler) {
				    result_handler.call(self, msg);
				}
		    };

		    var close = function () {
				if (pending.hasOwnProperty(reqid)) {
				    delete pending[reqid];
				}
				if (script_elem) {
				    head_elem.removeChild(script_elem);
				    script_elem = null;
				}		
				if (tid !== null) {
				    clearTimeout(tid);
				    tid = null;		    
				}
		    };


		    self.handle_result = handle_result;
		    self.send = send;
		    self.close = close;
		    self.is_sending = is_sending;
		    self.set_onresult = set_result_handler;
		    return self;
		};

		return {makeRequest: makeRequest, cb: handle_result};
    })();


    ////////////////////////////////////////////////////////////
    // HTTP CONNECTION
    ////////////////////////////////////////////////////////////

    var makeHTTPConnection = function (master_url) {
		var self = {};
		var _onopen = null;
		var _onerror = null;
		var _onmessage = null;
		var lp_request;
		var op_request;
		var sid = null;
		var worker_url = null;
		var _is_open = false;

		var handle_lp = function (result) {
		    longpoll();
		    if (_onmessage && result.hasOwnProperty('type')) {
				_onmessage.call(self, result);
		    }
		};

		var handle_op = function (result) {
		    var loc;
		    if (_is_open === false) {
				//  First response assumed to carry port and sid
				sid = result['sid'];
				loc = MSV.href_to_location(master_url);
				loc.port = result['port'];
				worker_url = loc.href;
				console.log(worker_url);
				// Open
				_is_open = true;
				// First longpoll
				longpoll();
				if (_onopen) {
				    _onopen.call(self);
				}
				return;
		    }

		    // Not first response
		    if (_onmessage && result.hasOwnProperty('type')) {
		    	_onmessage.call(self, result);
		    }
		}
		
		var longpoll = function () {
		    if (_is_open && ! lp_request.is_sending()) {
				lp_request.send(worker_url, {sid:sid, op:'lp'});
		    }
		}

		var send = function (msg) {
		    if (_is_open) {
				msg['sid'] = sid;
				msg['op'] = 'op';
				op_request.send(worker_url, msg);
				return true;
		    }
		    return false;
		};

		var close = function () {
		    _is_open = false;
		    _onopen = null;
		    _onerror = null;
		    _onmessage = null;
		    op_request.close();
		    lp_request.close();
		};

		// Public api
		self.send = send;
		self.close = close;
		self.set_onopen = function (handler){_onopen=handler;};
		self.set_onerror = function (handler){_onerror=handler;};
		self.set_onmessage =  function (handler){_onmessage=handler;};

		// Initialise
		lp_request = HTTPRequest.makeRequest();
		lp_request.set_onresult(handle_lp);
		op_request = HTTPRequest.makeRequest();
		op_request.set_onresult(handle_op);
		op_request.send(master_url + "/createsession", {});
		
		return self;
    };




    ////////////////////////////////////////////////////////////
    // WS CONNECTION
    ////////////////////////////////////////////////////////////

    /*
      WebSocket connection is a thin wrapper around the 
      WebSocket object. The purpose is simply to 
      modify the api by including parsing and encoding
      JSON inside the WS Connection.
     
     */

    var makeWSConnection = function (url) {
		var self = {};
		var conn;
		var _onmessage;
		var _onopen;
		var _onerror;
		
		var handle_message = function (event) {
		    if (_onmessage) {
		   		var msg = JSON.parse(event.data);
				_onmessage.call(self, msg);
		    }
		};

		var handle_open = function () {
		    if (_onopen) {
				_onopen.call(self);
		    }
		};

		var handle_error = function (e) {
		    conn = null;
		    if (_onerror) {
				_onerror.call(self, e);
		    }
		};

		var send = function (msg) {
		    if (!conn) return false;
		    try {
				conn.send(JSON.stringify(msg));
		    } catch (e) {
				console.log(e);
				return false;
		    }
		    return true;
		};

		var close = function() {
		    if (conn) {
				try {
				    conn.close();
				} catch (e) {}
		    }
		};

		self.send = send;
		self.close = close;
		self.set_onopen = function (handler){_onopen=handler;};
		self.set_onerror = function (handler){_onerror=handler;};
		self.set_onmessage = function (handler){_onmessage=handler;};

		// Initialise
		conn =  new WebSocket(url);
        conn.onmessage = handle_message;
		conn.onopen = handle_open;
		conn.onerror = handle_error;
		conn.onclose = handle_error;

		return self;
    };

    ////////////////////////////////////////////////////////////
	// IO REMOTE
	////////////////////////////////////////////////////////////

	/*
      This implements an IO interface that wraps a websocket.
      If websocket is not available the fallback is an emulated duplex connection
      based on two http connections, one of them using longpolling for timely
      receipt of messages. 
    */

  	var IOState = {
    	'DISCONNECTED': 0,
    	'CONNECTING': 1,
    	'CONNECTED': 2
  	};


  	var IORemote = function(host, options) {
	    var self = {};
	    options = options || {};
	    var Delay = { // seconds
	     	CONNECT: options['to-connect'] || 5.0,
	      	RECONNECT: options['to-reconnect'] || 10, // must be larger than connect delay
	      	PING: options['to-ping'] || 10
	    };
	    Delay.PONG = options['to-pong'] || 2 * Delay.PING + 1.0;

	    // Private variables
	    var _onconnect = null;
	    var _onmessage = null;
	    var conn = null;
	    var conn_tid = null; // connection timeout id
	    var pong_tid = null;
	    var reconnect_tid = null;

	    var pinger = makePinger(Delay.PING * 1000);
	    var server_clock = makeServerClock();

	    /*
			using local storage to record ws_works 
	    */
	    var localStorage = function () {
	    	var support = function () {
		    	try {
	   				return 'localStorage' in window && window['localStorage'] !== null;
	  			} catch (e) {
	    			return false;
	  			}
	    	}();
	    	var storage = (support) ? window['localStorage'] : undefined;
	    	return {
	    		getItem : function (key) {
	    			if (!support) return undefined; 
	    			else return storage.getItem(key);
	    		},
	    		setItem : function (key, value) {
            try {
  	    			if (support) storage.setItem(key, value);
            } catch (e) {
              // Ignore
            }
	    		}
	    	};
	    }();

	    /* 
	     ws_works indicates that the first ws connection has been attempted
	     and has succeded. if ws_works is true - the fallback HTTP connection 
	     will never be attempted.
	     option 'insist' : 'ws' can be supplied to set ws_works to true initially

	   */
	   	var ws_works = localStorage.getItem('mcorp_ws_works');
	   	if (ws_works === undefined) {
	   		ws_works = false || options['insist'] === 'ws';
	   	}
	 
	    /*
	    ws_attempted is used to compute the value of ws_works 
	    (if not overridden by option['insist'])
	    when (ws_attempted > 0 && ws_works === false)
	    the fallback to http will alway be prefered in this case
	    option 'insist' === 'http' will cause this to happen by setting
	    initialising ws_attempted = 1 
	   */
	    var ws_attempted = (options['insist'] === 'http') ? 1 : 0;
	    var http_attempted = 0;

	    // State transitions
	    var state = IOState.DISCONNECTED;
	    var failed_reconnects = 0;
	    var set_state = function(new_state) {
	      	if (new_state != state) {
		        var old_state = state;
		        state = new_state;
		        // Signal state change
		        // connecting -> connected
		        var fire = false;
		        if (old_state === IOState.CONNECTING && new_state === IOState.CONNECTED) {
		          	fire = true;
		          	failed_reconnects = 0;
		        }
		        // connected -> disconnected
		        else if (old_state === IOState.CONNECTED && new_state === IOState.DISCONNECTED) {
		          	console.log(new Date() + ": disconnected");
		          	fire = true;
		        }
		        // connecting -> disconnected
		        else if (old_state === IOState.CONNECTING && new_state === IOState.DISCONNECTED) {
		          	failed_reconnects++;
		          	console.log(new Date() + ": connect failed " + failed_reconnects);
		          	if (failed_reconnects === 3) {
		            	// TODO : go back to reconnecting every minute
		          	}
		        }
		        if (fire && _onconnect !== null) {
		          	_onconnect.call(self);
		        }
	      	}
	    };

	    // Signal that connection has failed
	    var connection_failed = function() {
	      	if (state !== IOState.DISCONNECTED) {
		        if (conn !== null) {
		        	conn.set_onopen(undefined);
		      		conn.set_onerror(undefined);
	    	  		conn.set_onmessage(undefined);
			        conn.close();
			        conn = null;
		        }
		        if (conn_tid !== null) {
			        clearTimeout(conn_tid);
			        conn_tid = null;
		        }
		        if (pong_tid !== null) {
			        clearTimeout(pong_tid);
			        pong_tid = null;
		        }
		        pinger.pause();
		        set_state(IOState.DISCONNECTED);
	      	}
	    };

	    // Connect
	    var connect = function() {
	      	if (state !== IOState.DISCONNECTED) {
	        	return;
	      	}
	      	// connect
	      	if (ws_works || ('WebSocket' in window && ws_attempted === 0)) {
	        	connect_ws();	
	      	} else {
		    	connect_http();   
	      	}
		    conn.set_onopen(handle_connect_ok);
	      	conn.set_onerror(handle_error);
	      	conn.set_onmessage(handle_message);
	      	// Check that onopen is called within X ms
	      	conn_tid = setTimeout(handle_connect_timeout, Delay.CONNECT * 1000);
	      	set_state(IOState.CONNECTING);
	    };

	    var connect_ws = function () {
	    	console.log(new Date() + ": connect ws://" + host);
		    conn = makeWSConnection("ws://" + host);
		    conn.type = 'ws';
		    ws_attempted += 1;
	    };
	    var connect_http = function () {
	    	console.log(new Date() + ": connect http://" + host);
		    conn = makeHTTPConnection("http://" + host);
		    conn.type = 'http';
		    http_attempted += 1;
	    };

	    // connect timed out
	    var handle_connect_timeout = function() {
	      	connection_failed();
	      	if (ws_works === false && ws_attempted === 1 && http_attempted === 0) {
	        	// fallback http immediately
	        	connect();
	      	}
	    };

	    // connect ok
	    var handle_connect_ok = function() {
	      	clearTimeout(conn_tid);
	      	conn_tid = null;
	      	if (!ws_works && conn.type === 'ws') {
	        	ws_works = true;
	        	localStorage.setItem('mcorp_ws_works', true);
	      	}
	      	// start pinging
	      	send_ping();
	      	if (pong_tid !== null) {
	        	clearTimeout(pong_tid);
	      	}
	      	pong_tid = setTimeout(handle_pong_timeout, (Delay.PONG + 1) * 1000);

	      	// state change CONNECTED not until first pong received
	      	// this guarantees that a clock estimate is available
	    };

	    // send ping to conn
	    var onping = function() {
	      	if (state === IOState.CONNECTED) {
	        	send_ping();
	      	}
	    };

	    var send_ping = function() {
	      	var msg = {
	        	'type': MsgType.REQUEST,
	        	'cmd': MsvCmd.PING,
	        	'data': MSV.client_clock()
	      	};
	      	var ok = conn.send(msg);
	      	if (!ok) {
	        	connection_failed();
	      	}
	    };
	    pinger.set_onping(onping);

	    // recv error signal from conn
	    var handle_error = function(e) {
	      	connection_failed();
	    };

	    var handle_pong_timeout = function() {
	      	connection_failed();
	      	connect();
	    };

	    // recv data from conn
	    var handle_message = function(msg) {
		    if (state === IOState.DISCONNECTED) {
	    	    return;
	    	}
		  	// recv pong from conn
	      	if (msg['cmd'] === MsvCmd.PONG) {
		        var ts = msg['data'];
		        if (pong_tid !== null) {
		          clearTimeout(pong_tid);
		        }
		        pong_tid = setTimeout(handle_pong_timeout, Delay.PONG * 1000);
		        server_clock.add_sample(ts[0], ts[1], MSV.client_clock());
		        // Connected on first pong
		        if (state == IOState.CONNECTING) {
		          console.log(new Date() + ": connected");
		          set_state(IOState.CONNECTED);
		          pinger.start();
		        }
		        return;
		    }

	      	// must be connected to receive messages?
	      	if (_onmessage != null) {
	        	_onmessage.call(self, msg);
	      	}
	    };

	    // public : send msg to conn
	    var send = function(msg) {
		    if (state === IOState.CONNECTED) {
	        	conn.send(msg);
	        	return true;
	      	} else {
	        	return false;
	      	}
	    };

	    // public : check state
	    var is_connected = function() {
	      return (state === IOState.CONNECTED) ? true : false;
	    };

	    // type of underlying connection
	    var get_type = function() {
	      return (state === IOState.CONNECTED) ? conn.type : null;
	    };

	    var get_host = function() {
	      return host;
	    };

	    var get_url = function() {
	      return "msv://" + host + "/";
	    };

	    // Start running
	    connect();
	    reconnect_tid = setInterval(connect, Delay.RECONNECT * 1000);

	    // Self
	    self.set_onconnect = function(handler) {
	      _onconnect = handler;
	    };
	    self.set_onmessage = function(handler) {
	      _onmessage = handler;
	    };
	    self.get_server_clock = server_clock.get_server_clock;
	    self.get_skew = server_clock.get_skew;
	    self.get_trans = server_clock.get_trans;
	    self.send = send;
	    self.is_connected = is_connected;
	    self.get_type = get_type;
	    self.get_host = get_host;
	    self.get_url = get_url;
	    self.connect = connect;
	    return self;
	};


  

  	

    _MSV_.IORemote = IORemote;
  	_MSV_.cb = HTTPRequest.cb;
  	// debug
	_MSV_.HTTPRequest = HTTPRequest.makeRequest;
    

    return _MSV_;
} (MSV || {});
