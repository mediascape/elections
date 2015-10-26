/*
  Written by Ingar Arntzen, Norut
*/

if (typeof define !== 'function') {var define = require('amdefine')(module);}

define(['./interval'], function (Interval) {

		'use strict';

		var P = 0, V = 1, A = 2, T = 3;
		
	    // Local time source (seconds)
	    var secClock = function () {
			return new Date().getTime()/1000.0;
	    };

	    // Local time source (milliseconds)
	    var msClock = function () {
	    	return new Date().getTime();
	    };
	   
	    // Calculate a snapshot of the motion vector,
	    // given initials conditions vector: [p0,v0,a0,t0] and t (absolute - not relative to t0) 
	    // if t is undefined - t is set to now
	    var calculateVector = function(vector, t) {
			if (t === undefined) {
			    t = clock();
			}
			var d = t - vector[T];
			var v = vector[V] + vector[A]*d;
			var p = vector[P] + vector[V]*d + 0.5*vector[A]*d*d;
			return [p,v,vector[A], t];
	    };
	    
	    // Determine if a motion vector represents movements or not.
	    var isMoving = function (vector) {
			if (vector === null) return false;
			if (vector[V] !== 0.0 || vector[A] !== 0.0) return true;
			return false;
	    };

	    // Compare values
	    var cmp = function (a, b) {
			if (a > b) {return 1;}
			if (a === b) {return 0;}
			if (a < b) {return -1;}
	    };

		// Calculate direction of movement at time t.
		// 1 : forwards, -1 : backwards: 0, no movement
	    var calculateDirection = function (vector, t) {
			/*
			  Given initial vector calculate direction of motion at time t 
			  (Result is valid only if (t > vector[T]))
			  Return Forwards:1, Backwards -1 or No-direction (i.e. no-motion) 0.
			  If t is undefined - t is assumed to be now.
			*/
			var freshVector = calculateVector(vector, t);
			// check velocity
			var direction = cmp(freshVector[V], 0.0);
			if (direction === 0) {
			    // check acceleration
		            direction = cmp(vector[A], 0.0);
			}
			return direction;
	    };


	    // Compare Vectors - strict equality of vector elements
	    // Another form of equality would be that vectors are sampled from the same motion
	    var compareVectors = function (old_vector, new_vector) {
			var p_equal = (new_vector[P] === null) || (new_vector[P] === old_vector[P]);
			var v_equal = (new_vector[V] === null) || (new_vector[V] === old_vector[V]);
			var a_equal = (new_vector[A] === null) || (new_vector[A] === old_vector[A]);
			var t_equal = (new_vector[T] === null) || (new_vector[T] === old_vector[T]);
			return [p_equal, v_equal, a_equal, t_equal];
	    };

	    // Given motion determined from p,v,a,t. 
	    // Determine if equation p(t) = p + vt + 0.5at^2 = x 
	    // has solutions for some real number t.
	    var hasRealSolution = function (p,v,a,x) {
			if ((Math.pow(v,2) - 2*a*(p-x)) >= 0.0) return true;
			else return false;
	    };
	    
	    // Given motion determined from p,v,a,t. 
	    // Determine if equation p(t) = p + vt + 0.5at^2 = x 
	    // has solutions for some real number t.
	    // Calculate and return real solutions, in ascending order.
	    var calculateRealSolutions = function (p,v,a,x) {
			// Constant Position
			if (a === 0.0 && v === 0.0) {
			    if (p != x) return [];
			    else return [0.0];
			}
			// Constant non-zero Velocity
			if (a === 0.0) return [(x-p)/v];
			// Constant Acceleration
			if (hasRealSolution(p,v,a,x) === false) return [];
			// Exactly one solution
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
	    var calculatePositiveRealSolutions = function (p,v,a,x) {
			var res = calculateRealSolutions(p,v,a,x);
			if (res.length === 0) return [];
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
	    var calculateMinPositiveRealSolution = function (p,v,a,x) {
			var res = calculatePositiveRealSolutions(p,v,a,x);
			if (res.length === 0) return null;
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
	    var calculateDelta = function (vector, rangeInterval ) {
			var p = vector[P];
			var v = vector[V];
			var a = vector[A];
			// Time delta to hit posBefore
			var deltaBefore = calculateMinPositiveRealSolution(p,v,a, rangeInterval.low);
			// Time delta to hit posAfter
			var deltaAfter = calculateMinPositiveRealSolution(p,v,a, rangeInterval.high);
			// Pick the appropriate solution
			if (deltaBefore !== null && deltaAfter !== null) {
			    if (deltaBefore < deltaAfter)
					return [deltaBefore, rangeInterval.low];
			    else 
					return [deltaAfter, rangeInterval.high];
			}
			else if (deltaBefore !== null)
			    return [deltaBefore, rangeInterval.low];
			else if (deltaAfter !== null)
			    return [deltaAfter, rangeInterval.high];
			else return [null,null];
	    };
	  

	    /*
	      calculate_solutions_in_interval (vector, d, plist)
	      
	      Find all intersects in time between a motion and a the
	      positions given in plist, within a given time-interval d. A
	      single position may be intersected at 0,1 or 2 two different
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
	    var sortFunc = function (a,b){return a[0]-b[0];};
	    var calculateSolutionsInInterval = function(vector, d, plist) {
			var solutions = [];
			var p0 = vector[P];
			var v0 = vector[V];
			var a0 = vector[A];
			for (var i=0; i<plist.length; i++) {
			    var o = plist[i];
			    var intersects = calculateRealSolutions(p0,v0,a0, o.point);
			    for (var j=0; j<intersects.length; j++) {
					var t = intersects[j];
					if (0.0 <= t && t <= d) {
					    solutions.push([t,o]);
					}
			    }
			}
			// sort solutions
			solutions.sort(sortFunc);
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
	    
	    var calculateInterval = function (vector_start, d) {
			var p0 = vector_start[P];
			var v0 = vector_start[V];
			var a0 = vector_start[A];
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
						return new Interval(p_turning, Math.max(p0, p1), true, true);
					    //return [p_turning, Math.max(p0,p1)];
					}
					else {
					    return new Interval(Math.min(p0,p1), p_turning, true, true);
					    //return [Math.min(p0,p1), p_turning];
					}
			    }
			}
			// no turning point or turning point was not reached
			return new Interval(Math.min(p0,p1), Math.max(p0,p1), true, true);
			//return [Math.min(p0,p1), Math.max(p0,p1)];
	    };


	// return module object
	return {
		P : P,
		V : V,
		A : A,
		T : T,
		msClock : msClock,
		secClock : secClock,
		compareVectors : compareVectors,
		isMoving : isMoving,
		calculateVector : calculateVector,
		calculateDirection : calculateDirection,
		calculateDelta : calculateDelta,
		calculateInterval : calculateInterval,
		calculateSolutionsInInterval : calculateSolutionsInInterval
	};
});


// TEST
var testCalculateInterval = function () {
    var vectors = [
        [0.0, 0.0, 0.0],
        [0.0, 0.0, 1.0],
        [0.0, 0.0, -1.0],
        
        [0.0, 1.0, 0.0],
        [0.0, 1.0, 1.0],
        [0.0, 1.0, -1.0],
        
        [0.0, -1.0, 0.0],
        [0.0, -1.0, 1.0],
        [0.0, -1.0, -1.0],
    ];

    var pos = [0.0, 1.0];
    var vel = [0.0, 1.0, -1.0];
    var acc = [0.0, 1.0, -1.0];

    var delays = [0.0,1.0,2.0,3.0];
    for (var i=0; i<delays.length; i++) {
        for (var j=0; j<pos.length; j++) {
            for (var k=0; k<vel.length; k++) {
	            for (var l=0; l<acc.length; l++) {
	                var t = [pos[j],vel[k],acc[l]];
	                var d = delays[i];
	                console.log(d + " " + t + " " + motionutils.calculateInterval(t,d).toString());
	            }
            }
        }
    }
};


var testCalculateSolutionsInInterval = function() {

    var vector = [0.0, 1.0, -1.0];
    var d = 3;
    // covers interval [-1.5, 0.5]
    var plist = [0.0, -1.5, 0.5, -2.0, 2.0, -0.5, 0.25];

    plist.map(function (p) {
    	return {point: p};
    });
 
    var solutions = motionutils.calculateSolutionsInInterval(vector, d, plist);

    // expected result 
    var expected = [[0.0, 0.0], ["?",0.25], ["?", 0.5], ["?", 0.25], ["?", 0.0], ["?", -0.5], [3.0,-1.5]];
    for (var i=0; i<Math.max(expected.length, solutions.length); i++) {
        console.log("(" + expected[i] + ") -> (" + solutions[i][0] + "," + solutions[i][1].point + ")");
    }
};

// MAIN
if (typeof module !== 'undefined' && require.main === module) {
    var motionutils = require('./motionutils');
    console.log(motionutils.secClock());
	testCalculateInterval();
    testCalculateSolutionsInInterval();
}