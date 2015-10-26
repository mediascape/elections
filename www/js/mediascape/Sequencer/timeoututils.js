/*
  Written by Ingar Arntzen, Norut
*/

if (typeof define !== 'function') {var define = require('amdefine')(module);}


define (function () {

	'use strict';

	var clock_ms = function (){return new Date().getTime();}; 

	/*
	  TIMEOUT

	  Wraps setTimeout() to implement improved version
	  - guarantee that timeout does not wake up too early
	  - offers precise timeout by "busy"-looping just before timeout 
	  - wraps a single timeout
	  - operates on milliseconds
	  - wake up 3 seconds before on long timeouts to readjust
	*/

	var Timeout = function (callback, delay, options) {	
		this.tid = null;
		this.callback = callback;
		this.delay_counter = 0;
		this.options = options || {};
		var now = clock_ms();
		this.options.anchor = this.options.anchor || now; // epoch millis
		this.options.early = Math.abs(this.options.early) || 0; // millis
		this.target = this.options.anchor + delay; // epoch millis

		// Initialise
		var self = this;
		window.addEventListener("message", this, true); // this.handleEvent
		var time_left = this.target - clock_ms(); // millis
		if (time_left > 10000) {
			// long timeout > 10s - wakeup 3 seconds earlier to readdjust
			this.tid = setTimeout(function () {self._ontimeout();}, time_left - 3000);
		} else {
			// wake up just before
			this.tid = setTimeout(function () {self._ontimeout();}, time_left - self.options.early);
		}
	};

	// Internal function
	Timeout.prototype._ontimeout = function () {
	    if (this.tid !== null) {
	    	var time_left = this.target - clock_ms(); // millis
			if (time_left <= 0) {
			    // callback due
			    this.cancel();
			    this.callback();
			} else if (time_left > this.options.early) {
				// wakeup before target - options early sleep more
				var self = this;
				this.tid = setTimeout(function () {self._ontimeout();}, time_left - this.options.early);
			} else {
				// wake up just before (options early) - event loop
			    this._smalldelay();
			}
	    }
	};
	
	// Internal function - handler for small delays
	Timeout.prototype.handleEvent = function (event) {
	    if (event.source === window && event.data.indexOf("smalldelaymsg_") === 0) {
			event.stopPropagation();
			// ignore if timeout has been canceled
			var the_tid = parseInt(event.data.split("_")[1]);
			if (this.tid !== null && this.tid === the_tid) {
			    this._ontimeout();
			}
	    }
	};

	Timeout.prototype._smalldelay = function () {
	    this.delay_counter ++;
	    var self = this;
	    window.postMessage("smalldelaymsg_" + self.tid, "*");
	};

	Timeout.prototype.cancel = function () {
	    if (this.tid !== null) {
			clearTimeout(this.tid);
			this.tid = null;
			var self = this;
			window.removeEventListener("message", this, true);	
	    }
	};
	
	// return module object
	return Timeout;
});

