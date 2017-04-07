var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.question("how are you",function(ans){
	console.log(ans);
})
