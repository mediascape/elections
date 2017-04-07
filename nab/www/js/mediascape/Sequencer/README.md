### Sequencer Module

## Resources
- sequencer.js : sequencer logic and module definition. 
- interval.js : datatype : Interval, the sequencer works on Intervals
- axis.js : datastructure for efficient ordering and lookup of Intervals
- sortedarraybinary.js : datastructure : efficient ordering and lookup of floats
- multimap.js : datastructure : (key,value) map supporting multiple values on single key
- motionutils.js : utility methods for correct time calculations
- timeoututils.js : timeout mechanism, improving setTimeout() by wrapping it.

## Sequencer Module
The sequencer module defines a Sequencer object and an Interval object. The Sequencer works on Intervals. Additionally, an inherit function is available, allowing the Sequencer to be specialized through inheritance.

```js
var mod = require('mediascape.sequencer');
var Sequencer = mod.Sequencer;
var Interval = mod.Interval;
var inherit = mod.inherit;
var SequencerError = mod.SequencerError;
```

## Interval
The Sequencer works on Interval objects.

#### Constructor
Returns an Interval object.
```js
var i = new Interval(low, high, lowInclude, highInclude);
```
- param: {float} [low] value of lower endpoint of interval 
- param: {float} [high] value of higher endpoint of interval
- param: optional {boolean} [lowInclude] lower endpoint included in interval : default true
- param: optional {boolean} [highInclude] higher endpoint included in interval : default false


## Sequencer

The sequencer works on a collection of cues. A cue is simply a (key, Interval) pair. Keys are unique strings and map to a single Interval.

A sequencer essentially works on motion and timed data to produce enter/exit event at the correct time.

#### Constructor
Returns a sequencer object.
```js
var s = new mediascape.Sequencer(motion);
```
var seq = require('./sequencer');
var Sequencer = seq.Sequencer;
var Interval = seq.Interval;

#### .addCue

#### .removeCue


### Example
```js
// register cues
var s = new Sequencer(motion);
s.addCue("key1", new Interval(1.0, 2.4));
s.removeCue("key2");

// attach handler
var handler = function (e) {
  console.log(e.toString());
}; 
s.on("enter", handler);
s.on("exit", handler);

// ready - control by updating motion

```


