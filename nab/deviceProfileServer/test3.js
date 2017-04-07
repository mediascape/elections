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
		
                classifierGnl.save('classifier.json', function(err, classifier) {
                        console.log("classifier saved");
                });
                rl.pause();
		exitNow = true;

   }
  });
});
natural.LogisticRegressionClassifier.load('classifier.json', null, function(err, classifier) {
	var fromFile = true;
	if (classifier===null){
	     console.log("error",err);
	     var rules = require('./browscap.json');
		Object.keys(rules).forEach(function(r,i){
		 if (i>2 && i<15000)
	        {
        	         var tnp = JSON.parse (rules[r]);
                	 var device = tnp.Device_Type;
	                if (device)
                        {
                           classifierGnl.addDocument(r,device);
                        }
       		 }

		});
		classifierGnl.train();
		fromFile = false;
		console.log('reading rules from database');
	}
	console.log(classifierGnl);
	if (!fromFile) classifierGnl = classifier;
});
 function checkDevice (classifierGnl){
         rl.question("What your information about the device?", function(answer) {
         console.log(answer);
         var result = classifierGnl.classify(answer);
           console.log("Device type:"+result);
           rl.question("is this correct?",function(ans){
                if (ans.toLowerCase() === 'y')
                {
                        console.log("training");
                        classifierGnl.addDocument(answer,result);
                        classifierGnl.train();
                        console.log("done");
                }
                else {
                  rl.question("What is the right answer?",function(an){
                        classifierGnl.addDocument(answer,an);
                        console.log("fixing knowledge");
                        classifierGnl.train();
                         var result = classifierGnl.classify(answer);
                         console.log("Device type:"+result);


                   });
                }
        });
      });
     }
function learn (quetion,answer){
	
}
module.exports.checkDevice = checkDevice;
module.exports.learn = learn;
