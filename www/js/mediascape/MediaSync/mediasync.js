/**
 * MediaSync
 *
 * author: njaal.borch@motioncorporation.com
 *
 * Copyright 2015
 * License: LGPL
 */

var mediascape = function(_MS_) {

  /**
   * Detect if we need to kick the element
   * If it returns true, you can re-run this function on
   * a user interaction to actually perform the kick
   */
  var _need_kick;
  function needKick(elem) {
    if (_need_kick === false) {
      return false;
    }
    if (elem.canplay) {
      _need_kick = false;
      return false;
    }
    var m = elem.muted;
    elem.muted = true
    elem.play();
    _need_kick = elem.paused == true;
    elem.pause();
    elem.muted = m;
    return _need_kick;
  }

  /**
   * The mediaSync object will try to synchronize an HTML
   * media element to a Shared Motion.  It exploits
   * playbackRate functionality if possible, but will fallback
   * to only currentTime manipulation (skipping) if neccesariy.
   *
   * Options:
   *  * skew (default 0.0)
   *     how many seconds (float) should be added to the
   *     motion before synchronization.  Calculate by
   *     start point of element - start point of motion
   *  * automute (default true)
   *     Mute the media element when playing too fast (or too slow)
   *  * mode (default "auto")
   *     "skip": Force "skip" mode - i.e. don't try using playbackRate.
   *     "vpbr": Force variable playback rate.  Normally not a good idea
   *     "auto" (default): try playbackRate. If it's not supported, it will
   *     struggle for a while before reverting.  If 'remember' is not set to
   *     false, this will only happen once after each browser update.
   *  * debug (default null)
   *     If debug is true, log to console, if a function, the function
   *     will be called with debug info
   *  * target (default 0.025 - 25ms ~ lipsync)
   *     What are we aiming for?  Default is likely OK, if we can do
   *     better, we will.  If the target is too narrow, you'll end up
   *     with a more skippy experience.  When using variable playback
   *     rates, this parameter is ignored (target is always 0)
   *  * remember (default true)
   *     Remember the last experience on this device - stores support
   *     or lack of support for variable playback rate.  Records in
   *     localStorage under key "mediascape_vpbr", clear it to re-learn
   */
  function mediaSync(elem, motion, options) {
    var _options = options || {};
    _options.skew = _options.skew || 0.0;
    _options.target = _options.target || 0.025;
    _options.original_target = _options.target;
    _options.target = _options.target * 5; // Start out coarse
    if (_options.remember === undefined){
      _options.remember = true;
    }
    if (_options.automute === undefined) {
      _options.automute = true;
    }
    var _motion = motion;

    elem.addEventListener("paused", function() {
        if (_motion.vel == 1) {
          elem.play();
        }
      });
    elem.addEventListener("play", function() {
      if (_motion.vel == 0) {
        elem.pause();
      }
    });
    elem.addEventListener("error", function(err) {
      console.log(err); // TODO: REPORT ERRORS
    });

    var _last_skip;
    var skip = function(pos) {
      var adjust = 0;
      var now = new Date(); //performance.now();
      if (_last_skip) {
        var elapsed = (now - _last_skip.ts) / 1000;
        var cur_pos = elem.currentTime;
        var miss = (_last_skip.pos + elapsed) - cur_pos;
        adjust = _last_skip.adjust + miss;
        if (adjust > 2) adjust = 0; // Too sluggish, likely unlucky
      }
      _dbg("SKIP:", pos, _motion.pos, adjust);
      if (_motion.vel != 1) {
        elem.currentTime = pos;
      } else {
        elem.currentTime = pos + adjust;
        _last_skip = {
          ts: now, //performance.now(),
          pos: pos,
          adjust: adjust
        }
      }
    };

    var _update_func;
    var _bad = 0;
    var _amazing = 0;
    var last_update;
    var _samples = [];
    var _vpbr; // Variable playback rate
    // onTimeChange handler for variable playback rate
    var update_func_playbackspeed = function(e) {
        var snapshot = _motion.query();
        if (snapshot.pos == last_update) {
          return;
        }
        last_update = snapshot.pos;

        // If we're outside of the media range, don't stress the system
        var p = snapshot.pos + _options.skew;
        var duration = elem.duration;
        if (duration) {
          if (p < 0 || p > duration) {
            if (!elem.paused) {
              elem.pause();
            }
            return;
          }
        }

        // Force element to play/pause correctly
        if (snapshot.vel != 0) {
          if (elem.paused) {
            elem.play();
          }
        } else if (!elem.paused) {
          elem.pause();
        }

        try {
          if (!_vpbr && _bad > 80) {
            elem.muted = false;
            throw Error("Variable playback rate seems broken");
          }
          // If we're WAY OFF, jump
          var diff = p - elem.currentTime;
          if ((diff < -1) || (snapshot.vel == 0 || Math.abs(diff) > 1) || (diff > 6)) {
            _dbg("JUMP: diff", diff);
            // Stationary, we need to just jump
            var new_pos = snapshot.pos + _options.skew;
            _bad += 20;
            skip(new_pos);
            return;
          }

          // Need to smooth diffs, many browsers are too inconsistent!
          _samples.push(diff);
          if (_samples.length >= 3) {
            var avg = 0;
            for (var i = 0; i < _samples.length; i++) {
              avg += _samples[i];
            }
            diff = avg / _samples.length;
            _samples = _samples.splice(0, 1);;
          } else {
            return;
          }

          // Actual sync
          _dbg("diff:", diff, "bad:", _bad, "vpbr:", _vpbr);

          if (Math.abs(diff) > 1) {
            _samples = [];
            elem.playbackRate = Math.max(0, _motion.vel + (diff * 1.25));
            _dbg("coarse", elem.playbackRate);
            _bad += 3;
          } else if (Math.abs(diff) > 0.1) {
            _samples = [];
            elem.playbackRate = _motion.vel + (diff * 0.65);
            _dbg("mid", elem.playbackRate);
            _bad += 2;
          } else if (Math.abs(diff) > 0.025) {
            _samples = [];
            elem.playbackRate = _motion.vel + (diff * 0.25);
            _dbg("fine", elem.playbackRate);
          } else {
            if (!_vpbr) {
              _bad = Math.max(0, _bad-10);
              _amazing++;
              if (_amazing > 5) {
                _vpbr = true; // Very unlikely to get here if we don't support it!
                if (localStorage && _options.remember) {
                  _dbg("Variable Playback Rate capability stored");
                  localStorage["mediascape_vpbr"] = JSON.stringify({'appVersion':navigator.appVersion, "vpbr":true});
                }
              }
            }

            elem.playbackRate = _motion.vel + (diff * 0.02);
          }
        if (_options.automute) {
          if (elem.playbackRate > 1.05 || elem.playbackRate < 0.95) {
            elem.muted = true;
          } else {
            elem.muted = false;
          }
        }

      } catch (err) {
        // Not supported after all!
        if (_options.automute) {
          elem.muted = false;
        }
        _last_skip = null;  // Reset skip stuff
        if (localStorage && _options.remember) {
          _dbg("Variable Playback Rate NOT SUPPORTED, remembering this  ");
          localStorage["mediascape_vpbr"] = JSON.stringify({'appVersion':navigator.appVersion, "vpbr":false});
        }
        console.log("Error setting variable playback speed - seems broken", err);
        elem.removeEventListener("timeupdate", update_func_playbackspeed);
        elem.playbackRate = 1.0;
        elem.addEventListener("timeupdate", update_func_skip);
      }
    };

    var _perfect = 5;
    var last_pos;
    var last_diff;
    // timeUpdate handler for skip based sync
    var update_func_skip = function(ev) {
      var snapshot = _motion.query();
      if (snapshot.vel <= 0) {
        if (elem.paused) {
          elem.play();
        }
      } else if (!elem.paused) {
        elem.pause();
      }

      if (snapshot.vel != 1) {
        if (snapshot.pos == last_pos) {
          return;
        }
        last_pos = snapshot.pos;
        _dbg("Jump, playback speed is not 1:", snapshot.vel);
        // We need to just jump
        var new_pos = snapshot.pos + _options.skew;
        if (elem.currentTime != new_pos) {
          skip(new_pos, "jump");
        }
        return;
      }

      var p = snapshot.pos + _options.skew;
      var diff = p - elem.currentTime;

      // If this was a Motion jump, skip immediately
      if (ev != undefined && ev.pos != undefined) {
        _dbg("MOTION JUMP");
        var new_pos = snapshot.pos + _options.skew;
        skip(new_pos);
        return;
      }

      // Smooth diffs as currentTime is often inconsistent
      _samples.push(diff);
      if (_samples.length >= 3) {
        var avg = 0;
        for (var i = 0; i < _samples.length; i++) {
          avg += _samples[i];
        }
        diff = avg / _samples.length;
        _samples.splice(0, 1);
      } else {
        return;
      }

      // We use the number of very good hits to build confidence
      if (Math.abs(diff) < 0.001) {
        _perfect = Math.max(5, _perfect); // Give us some breathing space!
      }

      if (_perfect <= -2) {
        // We are failing to meet the target, make target bigger
        _dbg("Lost all confidence");
        _options.target = Math.min(1, _options.target*1.4);
        _perfect = 0;
      } else if (_perfect > 15) {
        // We are hitting the target, make target smaller if we're beyond the users preference
        _dbg("Feels better");
        _options.target = Math.max(Math.abs(diff) * 1.3, _options.original_target);
        _perfect -= 8;
      }

      _dbg("diff:",diff, "target:", _options.target, "perfect:", _perfect);

      if (Math.abs(diff) > _options.target) {
        // Target miss - if we're still confident, don't do anything about it
        _perfect -= 1;
        if (_perfect > 0) {
          return;
        }
        // We've had too many misses, skip
        new_pos = _motion.pos + _options.skew
        _dbg("Adjusting time to " + new_pos);
        skip(new_pos);
        _perfect += 8;  // Give some breathing space
      } else {
        // Target hit
        if (Math.abs(diff - last_diff) < _options.target / 2) {
          _perfect++;
        }
        last_diff = diff;
      }
    }

    var _initialized = false;
    function init() {
      if (_initialized) return;
      _initialized = true;

      if (localStorage && _options.remember) {
         if (localStorage["mediascape_vpbr"]) {
            var vpbr = JSON.parse(localStorage["mediascape_vpbr"]);
            if (vpbr.appVersion === navigator.appVersion) {
              _vpbr = vpbr.vpbr;
            }
         }
      }

      if (_options.mode === "vpbr") {
        _vpbr = true;
      }
      if (_options.mode === "skip" || _vpbr === false) {
        elem.playbackRate = 1.0;
        _update_func = update_func_skip;
      } else {
        if (_options.automute) {
          elem.muted = true;
        }
        _update_func = update_func_playbackspeed;
      }
      elem.removeEventListener("canplay", init);
      elem.removeEventListener("playing", init);
      elem.addEventListener("timeupdate", _update_func);
      _motion.on("change", function(e) {
        _samples = [];
        _last_skip = null;
        _update_func(e);
      });
    }

    elem.addEventListener("canplay", init);
    elem.addEventListener("playing", init);
    var setSkew = function(skew) {
      _options.skew = skew;
    }

    var getSkew = function() {
      return _options.skew;
    }

    var setOption = function(option, value) {
      _options[option] = value;
    }

    /*
     * Return 'playbackRate' or 'skip' for play method
     */
    var getMethod = function() {
      if (_update_func === update_func_playbackspeed) {
        return "playbackRate";
      }
      return "skip";
    }

    // As we are likely asynchronous, we don't really know if elem is already
    // ready!  If it has, it will not emit canplay.  Also, canplay seems shady
    // regardless
    var beater = setInterval(function() {
      if (elem.readyState >= 2) {
        clearInterval(beater);
        try {
          var event = new Event("canplay");
          elem.dispatchEvent(event);
        } catch (e) {
          var event = document.createEvent("Event");
          event.initEvent("canplay", true, false)
          elem.dispatchEvent(event);
        }
      };
    }, 100);

    function _dbg() {
      var args = [];
      for (var k in arguments) {
        args.push(arguments[k]);
      }
      if (options.debug) {
        if (typeof(options.debug) === "function") {
          options.debug(args);
        } else {
          console.log(args);
        }
      }
    }

    // Export the API
    var API = {
      setSkew: setSkew,
      getSkew: getSkew,
      setOption: setOption,
      getMethod: getMethod
    };
    return API;
  }

  _MS_.mediaSync = mediaSync;
  _MS_.mediaNeedKick = needKick;
  return _MS_;
} (mediascape || {});
