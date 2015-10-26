////////////////////////////////////////////////////////////
// 
// AUTHOR : Ingar Arntzen, Motion Corporation
//
////////////////////////////////////////////////////////////

//emulate legacy getter/setter API using ES5 APIs
try {
   if (!Object.prototype.__defineGetter__ &&
        Object.defineProperty({},"x",{get: function(){return true}}).x) {
      Object.defineProperty(Object.prototype, "__defineGetter__",
         {enumerable: false, configurable: true,
          value: function(name,func)
             {Object.defineProperty(this,name,
                 {get:func,enumerable: true,configurable: true});
      }});
      Object.defineProperty(Object.prototype, "__defineSetter__",
         {enumerable: false, configurable: true,
          value: function(name,func)
             {Object.defineProperty(this,name,
                 {set:func,enumerable: true,configurable: true});
      }});
   }
} catch(defPropException) {/*Do nothing if an exception occurs*/};

var MSV = function(_MSV_) {

  var P = MSV.P;
  var V = MSV.V;
  var A = MSV.A;
  var T = MSV.T;

  var MsvCmd = MSV.MsvCmd;
  var MsgType = MSV.MsgType;

  var MsvError = function (message) {
    this.name = "MsvError";
    this.message = (message||"");
  };
  MsvError.prototype = Error.prototype;


  ////////////////////////////////////////////////////////////
  // REQUEST MANAGER
  ////////////////////////////////////////////////////////////

  var requestManager = function(msvclient, io) {
    var self = {};
    var reqid_counter = 0;
    var pending = {}; // reqid -> request

    var get_reqid = function() {
      return reqid_counter++;
    };

    var do_request = function(msg) {
      var reqid = get_reqid();
      msg.tunnel = reqid;
      var tid = setTimeout(function() {
        handle_timeout(reqid);
      }, 500000);
      var request = {
        msg: msg,
        tid: tid,
        sent: false
      };
      pending[reqid] = request;
      // try sending immediately
      return send(reqid);
    };

    var send = function(reqid) {
      if (io.is_connected()) {
        if (pending.hasOwnProperty(reqid)) {
          var request = pending[reqid];
          if (!request.sent) {
            try {
              io.send(request.msg);
            } catch (e) {
              return false;
            }
            request.sent = true;
            return true;
          }
        }
      }
      return false;
    };


    /*
    IO object has reconnected, send all pending requests 
    that have not been sent earlier.
    This method is invoked by msvclient. 
   */
    var handle_connect = function() {
      if (io.is_connected()) {
        for (var reqid in pending) {
          send(reqid);
        }
      }
    };

    /* 
     Response message received for one request 
     This method is invoked by msvclient. 
  */
    var handle_response = function(response_msg) {
      var request_msg;
      var reqid = response_msg.tunnel;      
      delete response_msg.tunnel;
      if (pending.hasOwnProperty(reqid)) {
        request_msg = pending[reqid].msg;
        cleanup(reqid);
      } 
      delete request_msg.tunnel;
      return request_msg;
    };

    /*
    Response was not received within timeout. Signal msvclient
   */
    var handle_timeout = function(reqid) {
      if (pending.hasOwnProperty(reqid)) {
        var request_msg = pending[reqid].msg;
        cleanup(reqid);
        msvclient.ontimeout(request_msg);
      }
    };

    /* cleanup and terminiate request */
    var cleanup = function(reqid) {
      if (pending.hasOwnProperty(reqid)) {
        var tid = pending[reqid].tid;
        if (tid !== null) {
          clearTimeout(tid);
        }
        delete pending[reqid];
      }
    };

    // api
    self.get_reqid = get_reqid;
    self.do_request = do_request;
    self.handle_connect = handle_connect;
    self.handle_response = handle_response;
    return self;
  };


  ///////////////////
  // TOKEN OBJECT
  ///////////////////


  var TokenObject = function () {
    this._token = undefined;
    this._confirmed = false;
  };
  TokenObject.prototype.refresh = function (token) {
    this._token = token;
    this._confirmed = false;
  };
  TokenObject.prototype.confirm = function () {
    this._confirmed = true;
  };
  TokenObject.prototype.isConfirmed = function () {
      return this._confirmed;
  };
  TokenObject.prototype.__defineGetter__('token', function () {return this._token;});



  /*
    Token serialization expects
    token {
      appid: appid,
      expire: new Date(),
      user: "usertoken",
      group: "grouptoken"
    }
    but only uses appid and user


  */
  var tokenToString = function (token) {
    return token.appid + "." + token.user;
  };


  ///////////////////
  // TOKEN MANAGER
  ///////////////////

  /*
    Manages token objects for different msvids
    timeoutHandler (msvidList)
  */

  var tokenManager = function (timeoutHandler) {
    var _tokenMap = {}; // msvid -> tokenObject
    /*
      old token is replaced immediately by new token
      a timeout is created from token.expire
    */

    var refreshToken = function (msvidList, token) {
      // create new timeout
      var timeleft = token.expire - new Date();
      var tid = setTimeout(function () {internalTimeoutHandler(msvidList, token)} , timeleft);

      // iterate msvidList
      msvidList.forEach(function (msvid) {
        // create and update tokenObjects
        if (!_tokenMap.hasOwnProperty(msvid)) {
          _tokenMap[msvid] = new TokenObject();
        }
        _tokenMap[msvid].refresh(token);
      });
    };

    /*
      all msvids from msvidList should have been refreshed with a new token
      before internaltimeouthandler runs. Fire externaltimeouthandler only for those msvids that have not
      been refreshed since created.
    */
    var internalTimeoutHandler = function (msvidList, token) {
      var timeout_msvid_list = msvidList.filter(function (msvid) {
        return (_tokenMap.hasOwnProperty(msvid) && _tokenMap[msvid].token === token); 
      });
      if (timeout_msvid_list.length > 0 ) {
        timeoutHandler(timeout_msvid_list, token);
      }
    };

    /*
      corfirm all token objects with new token, unless they have been refreshed in the mean time
    */
    var confirmToken = function (msvidList, token_str) { 
      msvidList.forEach(function (msvid) {
        if (!_tokenMap.hasOwnProperty(msvid)) 
          throw new MsvError("not tokenObject for given msvid " + msvid);
        if (tokenToString(_tokenMap[msvid].token) === token_str) {
            _tokenMap[msvid].confirm();
        }
      });
    };

    var getToken = function (msvid) {
      return (_tokenMap.hasOwnProperty(msvid) ? _tokenMap[msvid].token : null);
    };

    var getMsvidListByToken = function (token) {
      return Object.keys(_tokenMap).filter(function (msvid) {
        return (_tokenMap[msvid].token === token);
      })
    };

    // sort msvids by which token they are associated 
    var sortByToken = function (msvidList) {
      var token, res = {}; // token -> [msvid]
      msvidList.forEach(function (msvid) {
        token = _tokenMap(msvid).token;
        if (!res.hasOwnProperty(token)) {
          res[token] = [];
        }
        res[token].push(msvid);
      });
      return res;
    };

    var isConfirmed = function (msvid) {
      return (_tokenMap.hasOwnProperty(msvid) ? _tokenMap[msvid].isConfirmed() : false);
    };

    return {
      refreshToken : refreshToken,
      confirmToken : confirmToken,
      getToken : getToken,
      getMsvidListByToken : getMsvidListByToken,
      isConfirmed : isConfirmed,
      sortByToken : sortByToken
    };
  };




  ////////////////////////////////////////////////////////////
  // MSV CLIENT
  ////////////////////////////////////////////////////////////


  var msvclient = function(io, token, options) {
    var api_public = {};
    var api_proxy = {};
    var api_request = {};

    // Token Manager
    var _tokenManager;
    var _defaultToken = token;

    // Datastructures
    var req_manager;
    var msv_map = {}; // msvid -> msv_data
    var proxy_map = {}; // mvsvid -> proxy object
    var server_version;

    // UTILITY



    var parseNumber = function(n) {
      var f = parseFloat(n);
      if (!isNaN(f) && isFinite(n)) {
        return f;
      };
      return null;
    };

    var is_valid_event = function(msv_data) {
      if (!msv_data) return false;
      if (!msv_data.vector || msv_data.vector.length !== 4) return false;
      if (!msv_data.hasOwnProperty("eventid")) return false;
      if (!msv_data.hasOwnProperty("msvid")) return false;
      return true;
    };

    var is_valid_update = function (msv_data) {
      if (!msv_data) return false;
      if (!msv_data.hasOwnProperty('msvid')) return false;
      if (!msv_data.vector) return false;
      try {
        for (var i=0; i<3; i++) {
          if (msv_data.vector[i] === null || msv_data.vector[i] === undefined) continue;
          else {
            var f = parseNumber(msv_data.vector[i]);
            if (f === null) {
              // not parsable to number
              return false;
            } else {
              // parsable to number - use parsed version
              msv_data.vector[i] = f;
            }
          }
        }
      } catch (e) {
        return false;
      }
      return true;
    };

    var is_valid_response = function(msv_data) {
      return is_valid_event(msv_data);
    };

    var has_read_access = function(msv_data) {
      var cred = msv_data.cred || [true, true, true];
      return cred[0] ;
    };

    var has_write_access = function(msv_data) {
    	var cred = msv_data.cred || [true, true, true];
      return cred[1];
    };

    /* 
       input is a vector encoded with server time. The function
       returns the same vector with client time 
    */
    var transform_vector = function(v) {
      var server_ts = v[MSV.T];
      var client_ts = server_ts - io.get_skew();
      return [v[MSV.P], v[MSV.V], v[MSV.A], client_ts];
    };

    // check if all msvids are already monitored by the msvclient
    var check_all_monitored = function(msvid_list) {
      var new_list = msvid_list.filter(has_msv);
      return (new_list.length === msvid_list.length) ? true : false;
    };

    // check if all msvdata have correct parameters
    var check_all_params = function (msv_data_list) {
      var new_list = msv_data_list.filter(is_valid_update);
      return (new_list.length === msv_data_list.length) ? true : false;
    };

    // make msvid_list from msv_data_list
    var make_msvid_list = function(msv_data_list) {
      var res = [];
      for (var i = 0; i < msv_data_list.length; i++) {
        res.push(msv_data_list[i].msvid);
      }
      return res;
    }

    // TOKEN STUFF

    /*
      Internal method token_refresh
      used by both public token_refresh and proxy_token_refresh 
      If optional parameter msvid_list is supplied GET is run only for those msvids,
      else all msvids 
    */
    var _token_refresh = function (msvidList, token) {
      // refresh token
      _tokenManager.refreshToken(msvidList, token);
      /* TODO 
        in case ioObject is disconnected, trigger an immediate connect attempt
        io.connect();
        this is useless because io will not be in connected state after io.connect(),
        and reget() will therefore do nothing
      */ 
      // Trigger GET message with new token
      reget(msvidList, token);
    };

    /*
      Public method token_refresh
      set token as the new default token for the msvclient
      and refresh token for all msvids that were using the default token
    */
    var token_refresh = function (token) {
      console.log ("token refresh");
      // find all msvids that are currently associated with the defaultToken
      var msvid_list = _tokenManager.getMsvidListByToken(_defaultToken);
      // update default token
      _defaultToken = token;
      // refresh token
      _token_refresh(msvid_list, token);
    };

    /*
      Helper method used by msv proxies
      refreshes token for specific msvid
    */
    var proxy_token_refresh = function (msvid, token) {
      if (new Date() > token.expire) {
        throw new MsvError("token expired " + msvid);
        return;
      }
      _token_refresh([msvid], token)
    };

    // Fires whenever a token has expired
    var token_timeout_handler = function (token, msvid_list) {
      token_notify(msvid_list);
    };

    // trigger msvproxies to re-evaluate token validity
    var token_notify = function (msvid_list) {
      msvid_list.forEach(function (msvid) {
        if (proxy_map.hasOwnProperty(msvid)) {
          proxy_map[msvid].api_msvclient.handle_token();
        }
      });
    };

    var token_is_valid = function (msvid) {
      return _tokenManager.isConfirmed(msvid);
    };

    _tokenManager = tokenManager(token_timeout_handler);


    // CORE

    /* helper method to update msv map with new msv data */
    var update_msv_data = function(new_msv_data) {
      /* 
           calculate before_vector (server time) this is the value
           of the interrupted motion at the server - at the exact
           time when this update was applied 
        */
      var msvid = new_msv_data.msvid;
      var before_vector;
      if (msv_map.hasOwnProperty(msvid)) {
        var msv_data = msv_map[msvid];
        // check that eventid is incremented
        if (new_msv_data.eventid <= msv_data.eventid) {
          return false;
        }
        // calculate before vector from last msv_data
        before_vector = MSV.compute_msv(msv_data.vector,
          new_msv_data.vector[T]);

        // update
        msv_data.vector = new_msv_data.vector;
        msv_data.eventid = new_msv_data.eventid;
        msv_data.before_vector = before_vector;
      } else {
        // first
        new_msv_data.before_vector = new_msv_data.vector;
        msv_map[msvid] = new_msv_data;
        // onready event !!!
      }
      // notify proxy object
      if (proxy_map.hasOwnProperty(msvid)) {
        proxy_map[msvid].api_msvclient.handle_update();
      }
      return true;
    };

   

    // ON CONNECT
    var onconnect = function() {
      // notify request manager
      req_manager.handle_connect();
      // resend GETs
      // if request manager just sent buffered GET's, this seemingly duplicates that.
      // however, this should not happen - cause reget() is only issued on an open connection
      // and regular GETs can not be regetted before they have been successful.

      // find all msvids
      var msvidList = Object.keys(msv_map);
      // sortbytoken
      var tokenMap = _tokenManager.sortByToken(msvidList);
      // reget for each token
      Object.keys(tokenMap).forEach(function (token) {
        reget(tokenMap[token], token);
      });

      // notify proxies
      for (var msvid in proxy_map) {
        if (proxy_map.hasOwnProperty(msvid)) {
          proxy_map[msvid].api_msvclient.handle_connect();
        }
      }
    };

    // ON MESSAGE
    var onmessage = function(msg) {

      // Handle response
      if (msg.type === MsgType.RESPONSE) {

        // Notify request manager and get associated request message
        var request_msg = req_manager.handle_response(msg);
        
        if (!msg.hasOwnProperty("cmd")) 
          throw new MsvError("illegal msg, cmd missing");

        // Set server version
        if (msg.cmd == MsvCmd.GET) {          
          if (server_version === undefined) {
            server_version = msg.v;
            console.log(io.get_url() + " version " + msg.v);
          }
        }

        // Backward compatibility - old msv server does not provide status property
        if (server_version === "1") {
          msg.status = (msg.data.length > 0) ? 200 : 404;
        }
             
        // Handle successful response
        if (msg.status === 200) {
          // Handle successful GET responses
          if (msg.cmd === MsvCmd.GET) {
            // confirm tokens
            // (msvidList, token_str)
            var msvidList = msg.data.map(function (msvdata) {
              return msvdata.msvid;
            });
            _tokenManager.confirmToken(msvidList, request_msg.token);
            for (var i = 0; i < msg.data.length; i++) {
              if (is_valid_response(msg.data[i])) {
                update_msv_data(msg.data[i]);
              }
            }
          }
        } else {
          // Handle failed response
          // issue - should know which msvids are bad and which aren't'
          // for now - all msvids are bad
          setTimeout(function() {onerror(request_msg.data, msg.data);}, 0);
        }        
      }

      // Handle notifications
      if (msg.type === MsgType.EVENT) {
        // TODO - distinguish regular and error notification
        //if (msg.status === 200) {
          // Handle successful notification
        for (var i = 0; i < msg.data.length; i++) {
          var msv_data = msg.data[i];
          if (is_valid_event(msv_data)) {
            update_msv_data(msv_data);
          }
        } 
        //} else {
          // Handle error notifications
          //console.log("error notification");
        //}        
      }     
    };

    // ON TIMEOUT
    /* This handler is called when a GET(UPDATE?) request has not produced any
    response within timeout */
    var ontimeout = function (request_msg) {
      if (request_msg.cmd === MsvCmd.GET) {
        setTimeout(function() {onerror(request_msg.data, "GET timeout");}, 0);
      }
    }; 


    // ON ERROR
    // Handle errors on msvids in given list
    var onerror = function(msvid_list, reason) {
      // TODO - shut down IO object
      var msvid;
      for (var i=0; i<msvid_list.length; i++) {
        msvid = msvid_list[i];
        // remove msv data on error
        if (msv_map.hasOwnProperty(msvid)) {
          delete msv_map[msvid];
        }
        // notify failed msvproxies - and cleanup
        var msvproxy;
        if (proxy_map.hasOwnProperty(msvid)) {
          proxy_map[msvid].api_msvclient.handle_error(reason);
          delete proxy_map[msvid];
        }
      }
    };


    // UPDATE
    var update = function(arg_list) {
      // check first that all msvids are already monitored.
      var msvid_list = make_msvid_list(arg_list);
      var all = check_all_monitored(msvid_list);
      if (!all) {
        throw new MsvError("prior GET has not yet succeeded");
      }
      // check that write access is granted for all
      var tmp_list = msvid_list.filter(can_update);
      if (tmp_list.length !== arg_list.length) {
        throw new MsvError("write access has not been granted");
      }
      // check that parameters are correct
      var all = check_all_params(arg_list);
      if (!all) {
        throw new MsvError("illegal update parameter");
      }
      // possibly break arg_list into multiple update messages, if
      // msvs have different tokens
      var token, tokenMap = {}; // token -> [arg]
      arg_list.forEach(function (arg) {
        token = _tokenManager.getToken(arg.msvid);
        if (!tokenMap.hasOwnProperty(token)) {
          tokenMap[token] = [];
        }
        tokenMap[token].push(arg);
      });
      // send requests
      var msg;
      for (token in tokenMap) {
        // send request
        msg = {
          cmd: MsvCmd.UPDATE,
          token: tokenToString(token),
          data: tokenMap[token]
        }
        if (server_version === "1") {
          msg.type = MsgType.MESSAGE;
          io.send(msg);
        } else if (server_version === "2") {
          msg.type = MsgType.REQUEST;
          req_manager.do_request(msg);
        }
      }      
    };


    // GET
    // public get - used to initialise from externally.
    // token is optional - defaultToken used if not specified
    var get = function (msvid_list, token) {
      // Check first if all msvid are already monitored
      token = token || _defaultToken;
      _tokenManager.refreshToken(msvid_list, token);
      _get(msvid_list, token);      
    };

    var _get = function(msvid_list, token) {
      if (msvid_list.length === 0) return false;
      // Send GET request
      var msg = {
        type: MsgType.REQUEST,
        cmd: MsvCmd.GET,
        token: tokenToString(token),
        data: msvid_list
      };
      return req_manager.do_request(msg);
    };
    
    /*
      Re-send GET's if connected
    */
    var reget = function (msvid_list, token) {
      if (io.is_connected()) {
        // resend GET's to server
        try {
          _get(msvid_list, token);
        } catch (err) {
          // if token expired due to an expired token simply print a warning
          console.log("warning", err.message);
        }
      }
    };

    /*
      HAS MSV 
      
      Check if given msvid is currently managed by msvclient
    */

    var has_msv = function(msvid) {
      return msv_map.hasOwnProperty(msvid);
    };

    /*
		Get a list of msv objects
		Objects may or may not be ready to use
    */
    var get_msv = function (msvid) {
      var list = get_msvs([msvid]);
      return (list.length > 0) ? [] : null;
    }
    var get_msvs = function (msvid_list) {
    	var msv_list = [];
    	// get msv proxy objects
    	for (var i=0; i<msvid_list.length; i++) {
    		// instantiate proxy objects if needed
    		var msvid = msvid_list[i];
    		if (!proxy_map.hasOwnProperty(msvid)) {
		      	proxy_map[msvid] = msvproxy(api_proxy, msvid);
	    	}
	    	msv_list.push(proxy_map[msvid].api_public);
    	}
	  	// issue GET's if needed
	  	var get_list = [];
  	    for (var i=0; i<msvid_list.length; i++) {
        var msvid = msvid_list[i];
	    	if (!has_msv(msvid)) 
	    		get_list.push(msvid);
	    }
	    get(get_list);
	    return msv_list;
    };



    // PROXY API
    var get_vector = function(msvid) {
      if (msv_map.hasOwnProperty(msvid)) {
        return transform_vector(msv_map[msvid].vector);
      }
      return null;
    };
    var get_before_vector = function(msvid) {
      if (msv_map.hasOwnProperty(msvid)) {
        return transform_vector(msv_map[msvid].before_vector);
      }
      return null;
    };
    var query = function(msvid) {
      var v = get_vector(msvid);
      return (v !== null) ? MSV.compute_msv(v, MSV.client_clock()) : null;
    };
    var proxy_update = function(msvid, p, v, a, options) {
      update([{
        msvid: msvid,
        vector: [p, v, a]
      }]);
    };
    var is_moving = function(msvid) {
      var v = get_vector(msvid);
      return (v !== null) ? MSV.is_moving(v) : null;
    };
    var get_direction = function(msvid) {
      var v = get_vector(msvid);
      return (v !== null) ? MSV.compute_direction(v, MSV.client_clock()) : null;
    };

    var get_range = function(msvid) {
      return (msv_map.hasOwnProperty(msvid)) ? msv_map[msvid].range : null;
    };
    var can_update = function(msvid) {
      return (msv_map.hasOwnProperty(msvid)) ? has_write_access(msv_map[msvid]) : null;
    };
    var get_cred = function (msvid) {
      if (msv_map.hasOwnProperty(msvid)) {
        var msv_data = msv_map[msvid];
        var s = "";
        if (has_read_access(msv_data)) s += "r";
        if (has_write_access(msv_data)) s += "w";
        return s;
      }
      return null;
    };

    // IO Stuff 
    var proxy_get_url = function(msvid) {
      // Return url even if the msv is not currently managed by msvclient
      return (io !== null) ? io.get_url() + msvid : null;
    };
    var get_skew = function() {
      return (io !== null) ? io.get_skew() : null;
    };
    var get_latency = function() {
      return (io !== null) ? io.get_trans() : null;
    };
    var is_connected = function() {
      return (io !== null) ? io.is_connected() : false;
    };
    var conn_type = function() {
      return (io !== null) ? io.get_type() : "";
    };

    // api for public
    api_public.get_msvs = get_msvs;
    api_public.get_msv = get_msv;
    api_public.token_refresh = token_refresh;
    api_public.token_is_valid = token_is_valid;

    // api for msvproxy
    api_proxy.token_refresh = proxy_token_refresh;
    api_proxy.token_is_valid = token_is_valid;
    api_proxy.has_msv = has_msv;
    api_proxy.query = query;
    api_proxy.is_moving = is_moving;
    api_proxy.get_direction = get_direction;
    api_proxy.update = proxy_update;
    api_proxy.can_update = can_update;
    api_proxy.get_url = proxy_get_url;
    api_proxy.get_range = get_range;
    api_proxy.get_vector = get_vector;
    api_proxy.get_before_vector = get_before_vector;
    api_proxy.get_skew = get_skew;
    api_proxy.get_latency = get_latency;
    api_proxy.is_connected = is_connected;
    api_proxy.conn_type = conn_type;
    api_proxy.get_cred = get_cred;
   

    // api for request manager
    api_request.ontimeout = ontimeout;

    // initialize
    req_manager = requestManager(api_request, io);
    io.set_onmessage(onmessage);
    io.set_onconnect(onconnect);

    return api_public;
  }

  ////////////////////////////////////////////////////////////
  // MSVCLIENT INSTANCES
  ////////////////////////////////////////////////////////////

  var _local_msvclient = null;
  var _remote_msvclients = {}; // "host/appid" -> msvclient
  var get_msvclient = function(host, token) {
    var io;
    if (new Date() > token.expire) {
      throw new MsvError("Token expired");
    }
    if (host === "") {
      // local msvclient
      if (_local_msvclient === null) {
        if (!MSV.IOLocal) 
          throw new MsvError("Local Motion Not Supported"); 
        io = MSV.IOLocal();
        // value of token insignificant
        _local_msvclient = msvclient(io, token);
      }
      return _local_msvclient;
    } else {
      var key = host + "/" + token.appid;
      if (!_remote_msvclients.hasOwnProperty(key)) {
        io = MSV.IORemote(host);
        _remote_msvclients[key] = msvclient(io, token);
      }
      return _remote_msvclients[key];
    }
  };


  var token_refresh = function (token) {
    // check if token is expired
    if (new Date() > token.expire) {
      return;
    }
    var client;
    for (var key in _remote_msvclients) {
      if (!_remote_msvclients.hasOwnProperty(key)) continue;
      client = _remote_msvclients[key];
      client.token_refresh(token);
    }
  };




  ////////////////////////////////////////////////////////////
  // MSV
  ////////////////////////////////////////////////////////////

  /*
      Hides complexity of initialising msv objects.
    */

  var get_msv = function (url, token) {
    return get_msvs([url], token)[0];
  };

  // get multiple msv objects
  // will return existing msv objects - or start initialisation
  var get_msvs = function (url_list, token) {
    if (!token.hasOwnProperty("appid"))
      throw new MsvError("Illegal token, must specify \'appid\'");
    if (!token.hasOwnProperty("user"))
      throw new MsvError("Illegal token, must specify \'user\'");
     if (!token.hasOwnProperty("group"))
      throw new MsvError("Illegal token, must specify \'group\'");
    if (!token.hasOwnProperty("expire"))
      throw new MsvError("Illegal token, must specify \'expire\'");
    if (new Date() > token.expire) {
      throw new MsvError("Token expired");
    }
    var u, host, client, msvid, msv_list = [];
    // group url's by host
    var map = {}; // host -> [msvid,]
    for (var i=0; i<url_list.length; i++) {
      u = MSV.urlparse(url_list[i]);
      host = u.get_host();
      msvid = u.get_msvid();
      if (!map.hasOwnProperty(host)) {
        map[host] = [];
      }
      if (msvid === "") {
        throw new MsvError("msvid is empty string");
      }
      map[host].push(msvid);
    }
    // iterate per host
    for (host in map) {
      if (!map.hasOwnProperty(host)) continue;
      client = get_msvclient(host, token);
      msv_list = msv_list.concat(client.get_msvs(map[host]));
    }
    return msv_list;
  };



  ////////////////////////////////////////////////////////////
  // MSV PROXY
  ////////////////////////////////////////////////////////////

  var msvinfo = function(v) {
  	if (v === null) return null;
    return {
      pos: v[MSV.P],
      vel: v[MSV.V],
      acc: v[MSV.A],
      ts: v[MSV.T]
    };
  };

  // READY STATE
  var STATE = Object.freeze({
    INIT : "init",
    CONNECTING: "connecting",
    EXPIRED: "expired",
    OPEN: "open",
    CLOSED: "closed"
  });


  var msvproxy = function(msvclient, msvid) {

    var api_public = {};
    var api_msvclient = {};

    var readystate = function () {
    	var _readystate = STATE["INIT"];
		  // accessors  
    	return {
    		set : function (new_state) {
          if (_readystate === STATE["CLOSED"]) return; // never leave final state
  				if (new_state !== _readystate) {
  	    			_readystate = new_state;
  	    			_do_callbacks("readystatechange", new_state);
  	    		}
  	    	},
    		get : function () {return _readystate;}
    	}; 
    }();

    var refresh_readystate = function () {
      if (msvclient.has_msv(msvid)) {
        if (msvclient.token_is_valid(msvid)) {
          var state = (msvclient.is_connected()) ? STATE["OPEN"] : STATE["CONNECTING"];     
          readystate.set(state);
        } else {
          readystate.set(STATE["EXPIRED"]);
        }
      }
    };



    // EVENT NOTIFICATION

    // timeupdate
    var timeupdate_timer = null;
    var last_timeupdate = null;

    // event callbacks
    var _callbacks = {
      "readystatechange": [],
      "change": [],
      "timeupdate": [],
      "error": []
    };

    var _do_callbacks = function(what, e, handler) {
      if (!_callbacks.hasOwnProperty(what)) 
        throw new MsvError("Unsupported event " + what);
      var h;
      for (var i = 0; i < _callbacks[what].length; i++) {
          h = _callbacks[what][i];
          if (handler === undefined) {
            // all handlers to be invoked, except those with pending immeditate
            if (h._immediate_pending) {
              continue;
            }
          } else {
            // only given handler to be called
            if (h === handler) handler._immediate_pending = false;
            else {
              continue;
            }
          }
          try {
            h.call(api_public, e);
          } catch (e) {
            console.log("Error in " + what + ": " + h + ": ", e);
          }
        }
    };

    var on = function (what, handler) {
      if (!handler || typeof handler !== "function") 
        throw new MsvError("Illegal handler");
      if (!_callbacks.hasOwnProperty(what)) 
        throw new MsvError("Unsupported event " + what);
      var index = _callbacks[what].indexOf(handler);
      if (index === -1) {
        // register handler
        _callbacks[what].push(handler);
        // flag handler
        handler._immediate_pending = true;
        // do immediate callback
        setTimeout(function () {
          if (what === "readystatechange") {
            _do_callbacks("readystatechange", readystate.get(), handler);
          } else if (what === "change") {
            if (readystate.get() === STATE["INIT"]) {
              // immediate callback is noop
              handler._immediate_pending = false;
            } else {
              _do_callbacks("change", query(), handler);
            }
          } else if (what === "timeupdate") {
            if (readystate.get() === STATE["INIT"]) {
              // immediate callback is noop
              handler._immediate_pending = false;
            } else {
              _do_callbacks("timeupdate", query(), handler);
            }
          } else if (what === "error"){
            // immediate callback is noop
            handler._immediate_pending = false;
          }
        }, 0);
      }
      return api_public;
    };

    var off = function(what, handler) {
      if (_callbacks[what] !== undefined) {
        var index = _callbacks[what].indexOf(handler);
        if (index > -1) _callbacks[what].splice(index, 1);
      }
      return api_public;
    };



    // INTERNAL HANDLERS - invoked by msvclient
    var handle_update = function() {
    	refresh_readystate();
      var e = query();
      _do_callbacks("change", e);
      _do_callbacks("timeupdate", e);

      // start or stop timeupdate if motion has started or stopped
      var is_moving = msvclient.is_moving(msvid);
      if (is_moving && timeupdate_timer === null) {
        timeupdate_timer = setInterval(function() {
          _do_callbacks("timeupdate", query());
        }, 200);
      } else if (!is_moving && timeupdate_timer !== null) {
        clearTimeout(timeupdate_timer);
        timeupdate_timer = null;
      }      
    };

    var handle_connect = function() {
      // fires for both connect and disconnect
    	refresh_readystate();
    };

    var handle_token = function () {
      // fires for both token expired and token renewed
      refresh_readystate();
    };

    var handle_error = function (e) {
      readystate.set(STATE["CLOSED"]);
      _do_callbacks("error", e);
    };

    // METHODS
    var isValid = function () {
      return readystate.get() !== STATE["CLOSED"] && readystate.get() !== STATE["INIT"];
    };

    var query = function() {
      return msvinfo(msvclient.query(msvid));
    };
    var update = function(p, v, a, options) {
      return msvclient.update(msvid, p, v, a, options);
    };
    var getState = function() {
      return (isValid()) ? {
        readyState: readystate.get(),
        latency: msvclient.get_latency(),
        skew: msvclient.get_skew(),
        range: msvclient.get_range(msvid),
        connType: msvclient.conn_type(),
        src: msvclient.get_url(msvid),
        vector: msvclient.get_vector(msvid),
        lastVector: msvclient.get_before_vector(msvid),
        cred: msvclient.get_cred(msvid)
      } : null;
    };
    var isMoving = function() {
      return (isValid()) ? msvclient.is_moving(msvid) : null;
    };
    var getDirection = function() {
      return (isValid()) ? msvclient.get_direction(msvid) : null;
    };
    var tokenRefresh = function () {
      return (isValid()) ? msvclient.token_refresh(msvid) : null;
    };

    // MSVCLIENT API
    api_msvclient.handle_update = handle_update;
    api_msvclient.handle_connect = handle_connect;
    api_msvclient.handle_error = handle_error;
    api_msvclient.handle_token = handle_token;

    // PUBLIC API
    api_public.__defineGetter__("STATE", function () {return STATE;});
    api_public.query = query;
    api_public.update = update;
    api_public.isMoving = isMoving;
    api_public.getDirection = getDirection;
    api_public.tokenRefresh = tokenRefresh;
    api_public.__defineGetter__("pos", function () {return query().pos});
    api_public.__defineGetter__("vel", function () {return query().vel});
    api_public.__defineGetter__("acc", function () {return query().acc});

    //api_public.getDirection = getDirection;
    api_public.getState = getState;
    api_public.getInfo = getState;
    api_public.on = on;
    api_public.off = off;
    api_public.__defineGetter__("readyState", readystate.get);
    api_public.__defineGetter__("msvid", function () {return msvid;});
    api_public.__defineGetter__("id", function () {return msvid;});
    api_public.__defineGetter__("src", function () {return msvclient.get_url(msvid);});

    // INITIALISE
    // Initialise readystate
    refresh_readystate();

    return {
      api_public: api_public,
      api_msvclient: api_msvclient
    };
  };

  // Public namespace additions
  _MSV_.msv = get_msv;
  _MSV_.get_msvs = get_msvs;
  _MSV_.token_refresh = token_refresh;

  // Debugging
  _MSV_.get_msv = get_msv;
  _MSV_.msvclient = msvclient;
  _MSV_.msvproxy = msvproxy;
  _MSV_.get_msvclient = get_msvclient; 

  return _MSV_;
}(MSV || {});