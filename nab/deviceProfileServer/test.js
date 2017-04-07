var classifier = require("classifier");
var bayes = new classifier.Bayesian();
var rules = require('./browscap.json');
Object.keys(rules).forEach(function(r,i){
   if (i>2) 
	{
		 var tnp = JSON.parse (rules[r]);
		 var device = tnp.Device_Type || tnp.Device_Name;
	        if (device)  
			{
			   bayes.train(r,device);
			   console.log(device);
 			}
	}

});

var category = bayes.classify("mwb-db-client Opera/9.80 (Linux armv7l ; U; HbbTV/1.1.1 (; TOSHIBA; 32SL863; 19.2.39.208; 3; ) ; ToshibaTP/1.1.1 () ; en) Presto/2.6.33 Version/10.60");   // "spam"
console.log("Device type detected",category);
