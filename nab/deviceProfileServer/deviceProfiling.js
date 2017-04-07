var natural = require('natural');
var classifierGnl = new natural.LogisticRegressionClassifier();
var readline = require('readline');
var fs = require('fs');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var exitNow = false;
rl.on('SIGINT', function() {
  rl.question('Are you sure you want to exit?', function(answer) {
    if (answer.match(/^y(es)?$/i)) {

                classifierGnl.save('deviceProfileServer/classifier.json', function(err, classifier) {
                        console.log("classifier saved");
			process.exit()
                });
                rl.pause();
		exitNow = true;

   }
  });
});
console.log(process.cwd())

natural.LogisticRegressionClassifier.load('deviceProfileServer/classifier.json', null, function(err, classifier) {
	var fromFile = true;
	if (classifier===null){
	     console.log("error",err);
	     var rules = require('./browscap.json');
		Object.keys(rules).forEach(function(r,i){
		 if (i>2 && i<8000)
	        {
        	         var tnp = JSON.parse (rules[r]);
                	 var device = tnp.Device_Type;
	                if (device!==undefined)
                        {
                           if (device.indexOf('Mobile')!==-1) device = "Mobile";
	        	   if (device.indexOf('TV')!==-1) device = "TV";

			   classifierGnl.addDocument(r,device);
                        }
       		 }

		});
		classifierGnl.train();
		fromFile = false;
		console.log('reading rules from database');
	}
	console.log("Loading done",fromFile);
	if (classifier) classifierGnl = classifier;
//	console.log(classifierGnl);
});
 function checkDevice (userAgent){
         console.log(userAgent);
         var result ={};
	       result.deviceType = classifierGnl.classify(userAgent);
         console.log("Device type:"+result.deviceType);
         var probability= classifierGnl.getClassifications(userAgent);
         if (probability[0].value<0.75) console.warn('Not sure');
         console.log(probability[0].value);
         result.fiability = probability[0].value;
	 result.userAgent = userAgent;
	return result;
 }
function learn (question,answer){
	console.log(question,answer);
	classifierGnl.addDocument(question,answer);
         classifierGnl.train();
	console.log("train done");
        console.log(question,answer);
	var result = classifierGnl.classify(question);
        console.log("Device type:"+result);



	return true;
}
module.exports.checkDevice = checkDevice;
module.exports.learn = learn;
