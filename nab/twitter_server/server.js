//Setup web server and socket
var twitter = require('twitter'),
express = require('express'),
app = express(),
http = require('http'),
path = require('path'),
server = http.createServer(app);


app.use(express.static(path.join(__dirname, 'public')));

//Use the default port (for beanstalk) or default to 8081 locally
server.listen(process.env.PORT || 8081);
var _sockets = [];
var io = require('socket.io').listen(server);

var keys = require('./twitter-keys').keys;
//Setup twitter stream api
var twit = new twitter(keys);
// Data adquisition form twitter stream

var stream = null;
var cont=0;

//Create web sockets connection.
io.sockets.on('connection', function (socket) {
      socket.emit("connected");
      _sockets.push(socket);
});
if(stream === null) {
  //Connect to twitter stream passing in filter for entire world.
  twit.stream('statuses/filter', {track:'#I25,#i25,@eitbAlbisteak,#25s,#25S,@eitbNoticias',filter_level:"low",location:"Spain"},
   function(stream) {

      var euHT=['#I25','#i25','@eitbAlbisteak'];

      var esHT=['#25S','#25s','@eitbNoticias'];

      
      var time=false;
      var lasteu='';
      var lastes='';

      var emitedeu='';
      var emitedes='';

      setInterval(function(){
        if(emitedes!==lastes){
            emitedes=lastes;
            var dataToSend={'user_name':lastes.user.name,'user_image':lastes.user.profile_image_url,'text':lastes.text,'timestamp':lastes.created_at};
            _sockets.forEach(function(sc){
                sc.emit("twitter", dataToSend);
            });
            console.log(emitedes.text);
          }
          if(emitedeu!==lasteu){
            emitedeu=lasteu;
            var dataToSend={'user_name':lasteu.user.name,'user_image':lasteu.user.profile_image_url,'text':lasteu.text,'timestamp':lasteu.created_at};
            _sockets.forEach(function(sc){
                sc.emit("twitter", dataToSend);
            });
            console.log(emitedeu.text);
          }        
      },5000);     
      stream.on('data', function(data) { 
        var val=data;
        function filterByHT(el){

          if(val && val.text && val.text.indexOf(el)>-1)return el;
        }
        var isInEu=euHT.filter(filterByHT);
        var isInEs=esHT.filter(filterByHT);
      

        if(lasteu==='' && lastes===''){
          lastes=data;
          lasteu=data;
        }
        else{
          if(isInEu.length>0){
            lasteu=data;
          }
          if(isInEs.length>0){
            lastes=data;
          }
        }         

  });

  stream.on('limit', function(limitMessage) {
    return console.log(limitMessage);
  });

  stream.on('warning', function(warning) {
    return console.log(warning);
  });

  stream.on('disconnect', function(disconnectMessage) {
    return console.log(disconnectMessage);
  });
  stream.on('error', function(error) {
      	console.log(error);
	throw error;
  });
});
}

_sockets.forEach(function(socket){
      socket.on('disconnect', function () {
             delete sockects[socket];
             console.log('user disconnect');

         });
  });
// Emits signal to the client telling them that the
// they are connected and can start receiving Tweets



//get data from monodb database simulating data streaming.
/*var interval;
io.sockets.on('connection', function (socket) {
socket.on("start tweets", function(names) {
clearInterval(interval);
console.log(names);
var limit=100;
var baseDate=1432486483000;
var timer=1000;
interval=setInterval(function(){
console.log(baseDate);
//to find a simple word
Twit.find({ text : new RegExp(names, "i")}).where('created_at',baseDate).exec(function(err, posts) {
if(posts){
//console.log(posts);
for(var i=0;i<posts.length;i++){
data=JSON.parse(posts[i].data);
var centerLat = 0;
var centerLng = 0;
if (data.coordinates){
if (data.coordinates !== null){
//If so then build up some nice json and send out to web sockets
if((43.930152>=data.coordinates.coordinates[0]>=41.890633)&&(-3.448726>=data.coordinates.coordinates[1]>=-0.551836)){
console.log("coordinates");
var outputPoint = {"lat": data.coordinates.coordinates[0],"lng": data.coordinates.coordinates[1]};

//Send out to web sockets channel.
socket.emit('place', outputPoint);
socket.emit("twitter", data);
}
} else if(data.place){
console.log("Place");
if(data.place.bounding_box === 'Polygon'){
// Calculate the center of the bounding box for the tweet
var coord, _i, _len;

for (_i = 0, _len = coords.length; _i < _len; _i++) {
coord = coords[_i];
centerLat += coord[0];
centerLng += coord[1];
}
centerLat = centerLat / coords.length;
centerLng = centerLng / coords.length;

// Build json object and broadcast it
var outputPoint = {"lat": centerLat,"lng": centerLng};
//socket.broadcast.emit("place", outputPoint);
socket.emit('place', outputPoint);
socket.emit("twitter", data);
}
}
}else if(data.user.location){
console.log(data.user.location);
var places = ["Bilbao", "Bilbo", "Donostia", "San Sebastián", "San Sebastián","Vitoria", "Gasteiz", "Pamplona", "Iruña","Vizkaya", "Bizkaia", "Guipúzcoa", "Guipuzcoa", "Gipuzkoa", "Álava", "Alava", "Araba", "Navarra", "Nafarroa"];
if(exist(data.user.location,places)){
console.log("Location");
if(data.user.location.toLowerCase().indexOf("bilbao")!=-1||data.user.location.toLowerCase().indexOf("bilbo")!=-1){
centerLng = 43.2633235;
centerLat = -2.9335644;
}
if(data.user.location.toLowerCase().indexOf("vizkaya")!=-1||data.user.location.toLowerCase().indexOf("bizkaia")!=-1){
centerLng = 43.2195601;
centerLat = -2.9309956;
}
if(data.user.location.toLowerCase().indexOf("san sebastián")!=-1||data.user.location.toLowerCase().indexOf("san sebastian")!=-1||data.user.location.toLowerCase().indexOf("donostia")!=-1){
centerLng = 43.3072926;
centerLat = -1.9738829;
}
if(data.user.location.toLowerCase().indexOf("guipúzcoa")!=-1||data.user.location.toLowerCase().indexOf("guipuzcoa")!=-1||data.user.location.toLowerCase().indexOf("gipuzkoa")!=-1){
centerLng = 43.1454624;
centerLat = -2.1660135;
}
if(data.user.location.toLowerCase().indexOf("vitoria")!=-1||data.user.location.toLowerCase().indexOf("gasteiz")!=-1){
centerLng = 42.8540369;
centerLat = -2.6771581;
}
if(data.user.location.toLowerCase().indexOf("álava")!=-1||data.user.location.toLowerCase().indexOf("alava")!=-1||data.user.location.toLowerCase().indexOf("araba")!=-1){
centerLng = 42.8446121;
centerLat = -2.759727;
}
if(data.user.location.toLowerCase().indexOf("pamplona")!=-1||data.user.location.toLowerCase().indexOf("iruña")!=-1){
centerLng = 42.815766;
centerLat = -1.6500216;
}
if(data.user.location.toLowerCase().indexOf("navarra")!=-1||data.user.location.toLowerCase().indexOf("nafarroa")!=-1){
centerLng = 42.6123428;
centerLat = -1.6120166;
}
// Build json object and broadcast it
var outputPoint = {"lat": centerLat,"lng": centerLng};
socket.emit('place', outputPoint);
socket.emit("twitter", data);
}
}
//socket.emit("twitter", data);
}
}
});
baseDate=baseDate+timer;
}, timer);
});
socket.emit("connected");
});*/


function exist(term,list){
  for(var i=0;i<list.length;i++){
    if(list[i].toLowerCase()==term.toLowerCase()) return true;
  }
  return false;
}
