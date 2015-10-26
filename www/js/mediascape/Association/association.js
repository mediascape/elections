define( ["jquery","qrcode"], function($) {
	var Association = function() {
		this.createSessionID = function(){
			console.log('createSession');
			var args = Array.prototype.slice.call(arguments);
			var p1= new Promise(
				function(resolve,reject){
					var deferred = $.Deferred();
					if(args.length==2){
						var applicationID=args[0];
						var key=args[1];
						var sessionID = applicationID.concat(key);
						resolve('{"sessionID":'+sessionID+'}');
					}else{
						var timeStamp=args[0].toString();
						var applicationID=args[1];
						var key=args[2];
						var sessionID = timeStamp.concat(applicationID,key);
						resolve('{"sessionID":'+sessionID+'}');
					}
				});
			return p1;
		};

		this.shortURL = function(){
			console.log('shortURL');
			var args = Array.prototype.slice.call(arguments);
			var p1= new Promise(
				function(resolve,reject){
					var deferred = $.Deferred();
					var url=args[0];
					var username="ionalberdi"; // bit.ly username
					var key="R_978251cf3ed04317a147fde5a237b13c";
					var promise = $.ajax({
						url:"http://api.bit.ly/v3/shorten",
						data:{
							longUrl:url,
							apiKey:key,
							login:username
						},
						dataType:"jsonp"
					})
					.done(function(data, textStatus, jqXHR) {
						console.log(data);
						var shortedUrl = data.data.url;
						resolve(shortedUrl);
					});
				});
			return p1;
		};

		this.createQRcode = function(){
			console.log('createQRcode');
			var args = Array.prototype.slice.call(arguments);
			var p1= new Promise(
				function(resolve,reject){
					var deferred = $.Deferred();
					var width="160";
					var height="160";
					var type=args[0];
					if(args.length==4){
						width=args[2];
						height=args[3];
					}
					var asociationElement=document.getElementById("associationCodes");
					var associationCode = document.createElement("div");
					associationCode.id=type+"code";
					var hElement = document.createElement("h2");
					hElement.innerHTML=type;
					associationCode.appendChild(hElement);
					var qrElement = document.createElement("div");
					qrElement.id=type+"qrcode";
					qrElement.style.width=width+"px";
					qrElement.style.height=height+"px";
					qrElement.style.border="4px solid grey";
					associationCode.appendChild(qrElement);
					associationCode.appendChild(document.createElement("br"));
					var urlElement = document.createElement("div");
					urlElement.id="url";
					urlElement.innerHTML=args[1];
					urlElement.style.height="20px";
					associationCode.appendChild(urlElement);
					asociationElement.appendChild(associationCode);
					var qrcode = new QRCode(type+"qrcode", {
						text: args[1],
						width:width,
						height:height,
						colorDark : "#000000",
						colorLight : "#ffffff",
						correctLevel : QRCode.CorrectLevel.H
					});
					resolve(args[1]);
				});
			return p1;
		};

		this.createMinimunQRcode = function(){
			console.log('createMinimunQRcode');
			var args = Array.prototype.slice.call(arguments);
			var p1= new Promise(
				function(resolve,reject){
					var deferred = $.Deferred();
					var width="160";
					var height="160";
					var type=args[0];
					if(args.length==4){
						width=args[2];
						height=args[3];
					}

					var url=args[1];
					var username="ionalberdi"; // bit.ly username
					var key="R_978251cf3ed04317a147fde5a237b13c";
					var promise = $.ajax({
						url:"http://api.bit.ly/v3/shorten",
						data:{
							longUrl:url,
							apiKey:key,
							login:username
						},
						dataType:"jsonp"
					})
					.done(function(data, textStatus, jqXHR) {
						console.log(data);
						var shortedUrl = data.data.url;
						var asociationElement=document.getElementById("associationCodes");
						var associationCode = document.createElement("div");
						associationCode.id=type+"code";
						var hElement = document.createElement("h2");
						hElement.innerHTML=type;
						associationCode.appendChild(hElement);
						var qrElement = document.createElement("div");
						qrElement.id=type+"qrcode";
						qrElement.style.width=width+"px";
						qrElement.style.height=height+"px";
						associationCode.appendChild(qrElement);
						associationCode.appendChild(document.createElement("br"));
						var urlElement = document.createElement("div");
						urlElement.id="url";
						urlElement.innerHTML=shortedUrl;
						urlElement.style.height="20px";
						associationCode.appendChild(urlElement);
						asociationElement.appendChild(associationCode);
						var qrcode = new QRCode(type+"qrcode", {
							text: shortedUrl,
							width:width,
							height:height,
							colorDark : "#000000",
							colorLight : "#ffffff",
							correctLevel : QRCode.CorrectLevel.H
						});
						resolve(shortedUrl);
					});
			});
			return p1;
		};
	};
	Association.__moduleName = "association";

  	return Association;
});
