//////////////
// Author: lenczes@algonquincollege.com
// Co.: Algonquin College
// Date: 21/11/2014

// Make a temporary object that will be used as our fake login data object
var userObject = {
	name: 'guest',
	password: 'pass123',
	age: 22
}


// A variable to hold our socket.io connection
var socket;

// Override the windows.onload function to call our initialize function
window.onload=function(){
   initialize();
}



// A function called on window.onload to initialize
// the socket.io connection and inject page content.
function initialize()
{
	// The following line connects the user to the server.
	// The connecting client auto-detects the port from the url.
	socket = io();
	
	// After connecting we send a custom login message to the server.
	// The 'chat login' is the type of message we are sending. It is
	// a made up name I chose for this example, and could be anything.
	// The "" is a value we can send along, like user name and
	// password (CSV formatted) to perform secure logins.
	socket.emit('login', userObject);
	
	// The 'socket.on' is triggered when the client recieves a message 
	// from the server, in this case the first parameter 'chat message', 
	// indicating that we have an incoming text message recieved by the server.
	// The second parameter that the 'socket.on' function takes is a function
	// that is run when the message is recieved so it can be processed
	socket.on('broadcast message', function(msg){
		// In this case the msg variable contains the text message being sent.
		// So we will add this as a new list item in out message list
		document.querySelector("#messages").innerHTML += "<li>" + msg + "</li>";
		// This command will automatically scroll the messages to the bottom
		document.querySelector("#msgDiv").scrollTop = document.querySelector("#msgDiv").scrollHeight;
	});
	
	
	// It is smart to manually close the connection when the page is closed
	document.body.onbeforeunload=function(){
		socket.close();
	};
}




// The function called when the user clicks the 'send' button
function sendData()
{
	// Get the form data for the name and msg text field.
	var name = document.querySelector("#name").value;
	var msg = document.querySelector("#msg").value;
	
	// Do client side validation to make sure neither are empty
	if( name != ""  &&  name != null && msg != ""  &&  msg != null )
	{
		// Make a temporary object to hold the users message data
		var messageObject = {
			userName: name,
			text: msg
		}
		
		// Send the message object as the message for the 'chat message'.
		socket.emit('new message', messageObject);
		// Clear the msg form field after sending the message.
		document.querySelector("#msg").value = "";
	}
	else
	{
		// Else one of the fields is empty.
		alert("Enter a name and text for your message");
	}
	return false;
}



