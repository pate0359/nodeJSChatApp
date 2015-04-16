var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 8888;

var connections = 0;

//Give the App a title
app.locals.title = 'MAD9023-SocketIO Example';

// Allow users to have access to the files stored in the Assets folder on our server
app.use(express.static(__dirname + '/Assets'));


// Function called when a get request comes in at site root, so send the index.html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/Assets/index.html');
});


// Function that is called when a new user creates a connection to the server.
io.on('connection', function(socket){
	
	// Increment number of connections
	connections ++;
	
	// When anyone connects to the server emit a message to change the background colour
//	io.emit('colour change', randomHexColours[connections-1] );
//	console.log("User Logged IN (count: " + connections + ")");
	
	// Function that is called when a 'login' message is received
	socket.on("login",function(msg){
	
	if(msg.password == "pass123")
	{
		io.emit("broadcast message","--> User connected.");
		console.log("Welcome "+ msg.name);
	
	}
	});

	socket.on("new message",function(msg){
	
		io.emit("broadcast message",msg.userName + " -- "+msg.text);
	});

	socket.on("disconnected",function(msg){
		
		console.log("> User disconnected.");
		io.emit("broadcast message","--> " +msg.userName+ " disconnected.");
	});
//	socket.on("disconnect",function(msg){
//	
//		console.log("> User disconnected.";
//		io.emit("broadcast message","--> "+msg.userName+" disconnected.");
//	
//	});
});
	
//	// Function that is called when a 'login' message is received
//	socket.on('login', function(msg){
//		// We can access the Javascript variables directly if the message is an object
//		if(msg.name == "jon" && msg.age > 16){
//			// Calculate, and display new user id and ammount of users connected.
//			console.log("User Logged IN (count: " + connections + ")");
//		}
//	});
	
	
	
	// Function called if a 'disconnect' message is recieved
//	socket.on('disconnect', function(){
//		// Reduce the number of connections and emit 
//		connections --;
//		io.emit('colour change', randomHexColours[connections-1] );
//		console.log("User Logged OUT (count: " + connections + ")");
//  	});
	
	
//});



// Create the server listening on our predefined port, and output a welcome message
http.listen(port, function(){
	process.title = 'SOCKET_IO TEST SERVER v0.1';
	process.stdout.write('\033c');
	console.log('--SOCKET_IO TEST SERVER v0.1--\nlistening on port: ' + port);
});
