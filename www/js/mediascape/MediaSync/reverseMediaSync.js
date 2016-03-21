/**
 * MediaSync
 *
 * author: njaal.borch@motioncorporation.com
 *
 * Copyright 2015
 * License: LGPL
 */
define([],function(_TMC_) {

  function reverseMediaSync(element, motion, options) {
    var initialized = false;
    var last_update = 0;
    var debug = document.getElementById("debug");
    options = options || {};
    options.skew = options.skew || 0.0;
    var _start_samples = [];
    var _end_samples = [];
    var _last_avg;

    var _last_diff = 0;
    var _avg_diff = [];
    var the_diff = 0;
    var _measurements = 0;

    var init = function() {
      if (initialized) {
        return;
      }

      function average(l, skip) {  // Average a list, without the first two samples
        if (skip === undefined) skip = 0;
        var val = 0;
        for (var i = skip; i < l.length; i++) {
          val += l[i].pos;
        }
        var dt = l[l.length-1].ts - l[skip].ts;
        return {pos: val/(l.length-skip), ts: l[skip].ts + (dt/2)};
      }

      element.currentTime = motion.pos - options.skew;
      var RANDOM_NOISE_TEST;
      element.addEventListener("timeupdate", function() {
        var pos = element.currentTime + options.skew;
        _measurements++;
        if (RANDOM_NOISE_TEST) {
          element.currentTime += (Math.random()%RANDOM_NOISE_TEST*2) - RANDOM_NOISE_TEST;  // TEST FAKE BAD REPORTING;
        }
        var now = performance.now();
        _avg_diff.push({ts:0, pos:motion.pos - pos});
        if (_avg_diff.length > 20) {
          var idx=0;
          var biggest = 0;
          // Find the BIGGEST DIFF
          for (var i=0; i<_avg_diff.length; i++) {
            if (Math.abs(_avg_diff[i].pos - _avg_diff[i].ts) > biggest) {
              biggest = Math.abs(_avg_diff[i].pos - _avg_diff[i].ts);
              idx = i;
            }
          }
          if (biggest > 0.05) {
            _avg_diff.splice(idx, 1);
          } else {
            _avg_diff.splice(0, 1);
          }
        }
        the_diff = average(_avg_diff).pos;
        //console.log(now.toFixed(3), pos.toFixed(3), (pos-(now/1000)).toFixed(3));
        // Smooth diffs as currentTime is often inconsistent
        if (_start_samples.length < 10) {
          _start_samples.push({pos:pos, ts:now});
/*        } else {
          _end_samples.push({pos:pos, ts:now});
          if (_end_samples.length > 10) {
            _end_samples.splice(0, 1);
          }
  */      }

        if (_start_samples.length < 6) {
          return; // Not enough data
        }

        //var start_point = _start_samples[1];
        var start_point = average(_start_samples, 2);
        //console.log(start_point, _start_samples[1], _start_samples[_start_samples.length-1]);
        if (performance.now() - start_point.ts < 3) {
          return; // Not enough data
        }

        // Estimate the playback speed
        var speed = 1.0;
        var delta_t = 0;

        // The current time I should have now is then...
        var currentTime = options.skew + start_point.pos + ((performance.now() - start_point.ts)/1000);
        var can_skip = false;

        if (_measurements >= 30 && Math.abs(_last_diff - the_diff) < 0.001 ) {
          if (Math.abs(the_diff) > 0.005 && (new Date() - last_update) > 400 ) {
            console.log("Updating", the_diff.toFixed(4));
            if (debug) {
              debug.innerHTML = ("** SKIP " + the_diff.toFixed(3) + " ** <br>" + debug.innerHTML).substr(0, 100);
            }
            console.log("SKIPPING, diff is", the_diff);
              motion.update(motion.pos - the_diff);

              _measurements = 0;
              last_update = new Date();
              _avg_diff = [];
            return;
          }
        }
        _last_diff = the_diff;

        //console.log(currentTime.toFixed(3), element.currentTime.toFixed(3));

        // Can we estimate better using the monitored speed?
        /*
        var end_point;
        if (_end_samples.length > 6) {
          end_point = average(_end_samples);
          delta_t = (end_point.ts - start_point.ts) / 1000;
          var delta_p = end_point.pos - start_point.pos;
          speed = delta_p / delta_t;  // Should be 1 ideally....  Is this even sensible?
          //at = start_point.pos + (speed * ((performance.now() - start_point.ts)/1000));
          if (delta_t > 30) {
            currentTime = start_point.pos + (speed * ((performance.now() - start_point.ts)/1000));
          }
        }
*/
        if (options.data) {
          try {
            options.data[0].data.push([performance.now()/1000, currentTime]);
            options.data[1].data.push([now/1000, pos]);
            options.data[2].data = [
              [start_point.ts/1000, start_point.pos],
              [performance.now()/1000, currentTime]
            ];
          } catch (err) {}
        }
/*
        console.log("Local estimate (flat):", (currentTime - element.currentTime).toFixed(3),
          "Element vs motion (varies)", (element.currentTime - motion.pos).toFixed(3),
          "Estimate vs motion (0)", (currentTime - motion.pos).toFixed(3));
*/
        // USE FIXED PLAYBACK RATE OF 1 - should only do this for the first few minutes!
        //var diff = motion.pos - currentTime;
        //if (performance.now() - last_update > 400 && Math.abs(diff) > 0.005) {
          //motion.update(currentTime);
          //last_update = performance.now();
        //}

        if (debug) {
          debug.innerHTML = ((motion.pos - pos).toFixed(3) + "/" + the_diff.toFixed(3) + "/" + _avg_diff.length + "/" + delta_t.toFixed(2) + "<br>" + debug.innerHTML).substr(0, 100);
          //debug.innerHTML = ((motion.pos - pos).toFixed(3) + "/" + the_diff.toFixed(4) + "/" + (speed).toFixed(3) + "/" + delta_t.toFixed(2) + "<br>" + debug.innerHTML).substr(0, 100);
        }
      });
      initialized = true;
    };

    motion.on("change", function() {
      console.log("Motion changed:" + motion.query());
      if (Math.abs(element.currentTime - motion.pos + options.skew) > 1) {
        _start_samples = [];
        _end_samples = [];
        _avg_diff = [];
        if (options.data) {
          try {
            options.data[0].data = [];
            options.data[1].data = [];
            options.data[2].data = [];
          } catch (err) {}
        }
        console.log("Updating playback position");
        element.currentTime = motion.pos - options.skew;
      }
      if (motion.vel == 1) {
        element.play();
      } else {
        element.pause();
      }
    });

    element.addEventListener("canplay", init);
    if (element.readyState > 1) {
      init();
    }
    return this;
  }
  reverseMediaSync.__moduleName = "reverseMediaSync";
  return reverseMediaSync;

});
