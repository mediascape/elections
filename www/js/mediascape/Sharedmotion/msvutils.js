/*
  Written by Ingar Arntzen, Norut & Motion Corporation
*/

var MSV = function(_MSV_) {

    var P = 0;
    var V = 1;
    var A = 2;
    var T = 3;

    var MsvCmd = {
	    'CREATE': 1,
	    'GET': 2,
	    'UPDATE': 3,
	    'DELETE': 4,
	    'PING': 5,
	    'PONG': 6,
	    'UNSUB': 7
  	};

  	var MsgType = {
	    'MESSAGE': 1,
	    'REQUEST': 2,
	    'RESPONSE': 3,
	    'EVENT': 4
  	};

    // Local time
    var client_clock = function () {
		return new Date().getTime()/1000.0;
    };

    // Compute a snapshot of the msv,
    // given initials conditions vector: [p0,v0,a0,t0] and t (absolute - not relative to t0) 
    // if t is undefined - t is set to now
    var compute_msv = function(vector, t) {
		if (t === undefined) {
		    t = client_clock();
		}
		var d = t - vector[T];
		var v = vector[V] + vector[A]*d;
		var p = vector[P] + vector[V]*d + 0.5*vector[A]*d*d;
		return [p,v,vector[A], t];
    };

    // Determine if a msv represents movements or not.
    var is_moving = function (vector) {
		if (vector == null) return false;
		if ([vector[V]] != 0.0 || vector[A] != 0.0) return true;
		return false;
    };

    // Determine the direction of movement
    var cmp = function (a, b) {
		if (a > b) {return 1};
		if (a === b) {return 0};
		if (a < b) {return -1}
    };

    var compute_direction = function (vector, t) {
		/*
		  Given initial vector calculate direction of motion at time t 
		  (Result is valid only if (t > vector[T]))
		  Return Forwards:1, Backwards -1 or No-direction (i.e. no-motion) 0.
		  If t is undefined - t is assumed to be now.
		*/
		var fresh_vector = compute_msv(vector, t);
		// check velocity
		var direction = cmp(fresh_vector[V], 0.0);
		if (direction === 0) {
		    // check acceleration
	            direction = cmp(vector[A], 0.0);
		}
		return direction;
    };


    // Compare Vectors
    var compare_vectors = function (old_vector, new_vector) {
		var p_equal = (new_vector[P] == null) || (new_vector[P] == old_vector[P]);
		var v_equal = (new_vector[V] == null) || (new_vector[V] == old_vector[V]);
		var a_equal = (new_vector[A] == null) || (new_vector[A] == old_vector[A]);
		var t_equal = (new_vector[T] == null) || (new_vector[T] == old_vector[T]);
		return [p_equal, v_equal, a_equal, t_equal];
    };

    // Given motion determined from p,v,a,t. 
    // Determine if equation p(t) = p + vt + 0.5at^2 = x 
    // has solutions for some real number t.
    var has_real_solution = function (p,v,a,x) {
		if ((Math.pow(v,2) - 2*a*(p-x)) >= 0.0) return true;
		else return false;
    };
    
    // Given motion determined from p,v,a,t. 
    // Determine if equation p(t) = p + vt + 0.5at^2 = x 
    // has solutions for some real number t.
    // Calculate and return real solutions, in ascending order.
    var get_real_solutions = function (p,v,a,x) {
		// Constant Position
		if (a == 0.0 && v == 0.0) {
		    if (p != x) return [];
		    else return [0.0];
		}
		// Constant non-zero Velocity
		if (a == 0.0) return [(x-p)/v];
		// Constant Acceleration
		if (has_real_solution(p,v,a,x) == false) return [];
		// Exactly on solution
		var discriminant = v*v - 2*a*(p-x);
		if (discriminant === 0.0) {
		    return [-v/a];
		}
		var sqrt = Math.sqrt(Math.pow(v,2) - 2*a*(p-x));
		var d1 = (-v + sqrt)/a;
		var d2 = (-v - sqrt)/a;
		return [Math.min(d1,d2),Math.max(d1,d2)];
    };

    // Given motion determined from p,v,a,t. 
    // Determine if equation p(t) = p + vt + 0.5at^2 = x 
    // has solutions for some real number t.
    // Calculate and return positive real solutions, in ascending order.
    var get_positive_real_solutions = function (p,v,a,x) {
		var res = get_real_solutions(p,v,a,x);
		if (res.length == 0) return [];
		else if (res.length == 1) {
		    if (res[0] > 0.0) { 
				return [res[0]];
		    }
		    else return []; 
		}
		else if (res.length == 2) {
		    if (res[1] < 0.0) return [];
		    if (res[0] > 0.0) return [res[0], res[1]];
		    if (res[1] > 0.0) return [res[1]];
		    return [];
		}
		else return [];
    };

    // Given motion determined from p,v,a,t. 
    // Determine if equation p(t) = p + vt + 0.5at^2 = x 
    // has solutions for some real number t.
    // Calculate and return the least positive real solution.
    var get_min_positive_real_solution = function (p,v,a,x) {
		var res = get_positive_real_solutions(p,v,a,x);
		if (res.length == 0) return null;
		else return res[0];
    };
    
    // Given motion determined from p0,v0,a0
    // (initial conditions or snapshot)
    // Supply two posisions, posBefore < p0 < posAfter.
    // Calculate which of these positions will be reached first,
    // if any, by the movement described by the vector.
    // In addition, calculate when this position will be reached.
    // Result will be expressed as time delta relative to t0, 
    // if solution exists,
    // and a flag to indicate Before (false) or After (true)
    // Note t1 == (delta + t0) is only guaranteed to be in the 
    // future as long as the function
    // is evaluated at time t0 or immediately after.
    var calculate_delta = function (vector, pos_before, pos_after) {
		var p = vector[P];
		var v = vector[V];
		var a = vector[A];
		// Time delta to hit posBefore
		var delta_before = get_min_positive_real_solution(p,v,a, pos_before);
		// Time delta to hit posAfter
		var delta_after = get_min_positive_real_solution(p,v,a, pos_after);
		// Pick the appropriate solution
		if (delta_before != null && delta_after != null) {
		    if (delta_before < delta_after) 
				return [delta_before, pos_before];
		    else 
				return [delta_after, pos_after];
		}
		else if (delta_before != null)
		    return [delta_before, pos_before];
		else if (delta_after != null)
		    return [delta_after, pos_after];
		else return [null,null];
    };


    /*
      calculate_solutions_in_interval (vector, d, plist)
      
      Find all intersects in time between a motion and a the
      positions given in plist, within a given time-interval d. A
      single point may be intersected at 0,1 or 2 two different
      times during the interval.
      
      - vector = (p0,v0,a0) describes the initial conditions of
      (an ongoing) motion
      
      - relative time interval d is used rather than a tuple of
      absolute values (t_start, t_stop). This essentially means
      that (t_start, t_stop) === (now, now + d). As a consequence,
      the result is independent of vector[T]. So, if the goal is
      to find the intersects of an ongoing motion during the next
      d seconds, be sure to give a fresh vector from msv.query()
      (so that vector[T] actually corresponds to now).
      
      
      - plist is an array of objects with .point property
      returning a floating point. plist represents the points
      where we investigate intersects in time.
      
      The following equation describes how position varies with time
      p(t) = 0.5*a0*t*t + v0*t + p0
      
      We solve this equation with respect to t, for all position
      values given in plist.  Only real solutions within the
      considered interval 0<=t<=d are returned.  Solutions are
      returned sorted by time, thus in the order intersects will
      occur.

    */
    var sort_func = function (a,b){return a[0]-b[0]};
    var calculate_solutions_in_interval = function(vector, d, plist) {
		var solutions = [];
		var p0 = vector[MSV.P];
		var v0 = vector[MSV.V];
		var a0 = vector[MSV.A];
		for (var i=0; i<plist.length; i++) {
		    var o = plist[i];
		    var intersects = get_real_solutions(p0,v0,a0, o.point);
		    for (var j=0; j<intersects.length; j++) {
				var t = intersects[j];
				if (0.0 <= t && t <= d) {
				    solutions.push([t,o]);
				}
		    }
		}
		// sort solutions
		solutions.sort(sort_func);
		return solutions;
    };
    
    /*
      Within a definite time interval, a motion will "cover" a
      definite interval on the dimension. Calculate the min, max
      positions of this interval, essentially the smallest
      position-interval that contains the entire motion during the
      time-interval of length d seconds.
      
      relative time interval d is used rather than a tuple of absolute values
      (t_start, t_stop). This essentially means that (t_start, t_stop) ===
      (now, now + d). As a consequence, the result
      is independent of vector_start[T]. So, if the goal is to
      find the interval covered by an ongoing motion during the
      next d seconds, be sure to give a fresh vector from
      msv.query() (so that vector_start[T] actually corresponds to
      now).
      
      The calculation takes into consideration that acceleration
      might turn the direction of motion during the time interval.
    */
    
    var calculate_interval = function (vector_start, d) {
		var p0 = vector_start[MSV.P];
		var v0 = vector_start[MSV.V];
		var a0 = vector_start[MSV.A];
		var p1 = p0 + v0*d + 0.5*a0*d*d;
		
		/*
		  general parabola
		  y = ax*x + bx + c
		  turning point (x,y) : x = - b/2a, y = -b*b/4a + c
		  
		  p_turning = 0.5*a0*d_turning*d_turning + v0*d_turning + p0
		  a = a0/2, b=v0, c=p0
		  turning point (d_turning, p_turning):
		  d_turning = -v0/a0
		  p_turning = p0 - v0*v0/(2*a0)
		*/
		
		if (a0 !== 0.0) {
		    var d_turning = -v0/a0;
		    if (0.0 <= d_turning && d_turning <= d) {
				// turning point was reached p_turning is an extremal value            
				var p_turning = p0 - 0.5*v0*v0/a0;
				// a0 > 0 => p_turning minimum
				// a0 < 0 => p_turning maximum
				if (a0 > 0.0) {
				    return [p_turning, Math.max(p0,p1)];
				}
				else {
				    return [Math.min(p0,p1), p_turning];
				}
		    }
		}
		// no turning point or turning point was not reached
		return [Math.min(p0,p1), Math.max(p0,p1)];
    };

    ////////////////////////////////////////////////////////////
  	// UTILITY
  	////////////////////////////////////////////////////////////

	// Convert url string to location object.
	var href_to_location = function(href) {
	    var loc = document.createElement("a");
	    loc.href = href;
	    // Make sure origin is defined
	    if (loc.origin == undefined) {
	      loc.origin = loc.protocol + "//" + loc.host;
	    }
	    return loc;
	};

	/*
      msv:///msvid -> host: ""
      msv://127.0.0.1/msvid -> host: "127.0.0.1"
      msv://msv.com:8080/msvid -> host: "msv.com:8080"

      supports urls with no msvid (msvid: "")

      The location object does not parse correctly for
      unknown protocols - internally we switch to http:// and file:// to
      work around this deficiency
     */

    var urlparse = function (url) {
		if (typeof(url) != "string") { 
		    throw "URL must be a string, was a " + typeof(url);
		}
		var self = {};
		var loc, local, host, msvid;
		// make sure protocol is msv:
		if (url.substring(0,6) != "msv://") {
			var e = {
			    'name': 'MsvUrlError', 
			    'message': 'protocol not supported  ' + url.substring(0,6)
			};
			throw e;
		}
		// parse - switch to file or http internally
		if (url.length > 6 && url.substring(0,7) === "msv:///") {
		    // Local MSV
		    local = true;
		    loc = href_to_location("file" + url.slice(3));
		    host = "";
		} else {
		    // Remote MSV
		    local = false;
		    loc = href_to_location("http" + url.slice(3));
		    host = loc.host;
		}
		msvid = (loc.pathname[0] === "/") ? loc.pathname.slice(1) : loc.pathname;
		if (check_msvid(msvid) === false) {
			throw "illegal msvid : [" + msvid + "]";
		}
		
		self.get_host = function () {return host;};
		self.get_port = function () {return loc.port;};
		self.get_protocol = function () {
			return "msv:";};
		self.is_local = function () {return local;};
		self.get_url = function () {
			if (self.is_local()) {
				return "msv:///" + msvid;
			} else {
				var u = "msv://" + host;
				if (host !== "") u += "/" + msvid;
			}
			var url = (self.is_local()) ? "msv:///" : "msv://";
			url += host; 
			return (msvid !== "") ? url + "/" + msvid : url;}; 
		self.get_msvid = function () {return msvid;};
		return self;
    };

    // msvid must be a string and must contain digits only
    var re = /^\d+$/;
    var check_msvid = function (msvid) {
    	if (typeof msvid !== "string") return false;
    	if (msvid === "") return true;
    	return re.test(msvid);
    };

    // constants
    _MSV_.P = P;
    _MSV_.V = V;
    _MSV_.A = A;
    _MSV_.T = T;

    // types
	_MSV_.MsgType = MsgType;
  	_MSV_.MsvCmd = MsvCmd;

    // functions
    _MSV_.client_clock = client_clock;
    _MSV_.is_moving = is_moving;
    _MSV_.compute_msv = compute_msv;
    _MSV_.compute_direction = compute_direction;
    _MSV_.compare_vectors = compare_vectors;
    _MSV_.calculate_delta = calculate_delta;
    _MSV_.calculate_interval = calculate_interval;
    _MSV_.calculate_solutions_in_interval = calculate_solutions_in_interval;
    _MSV_.urlparse = urlparse;
    _MSV_.href_to_location = href_to_location;

    return _MSV_;
    
} (MSV || {});
