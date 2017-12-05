const express = require('express');
const ws = require('ws');
const SocketServer = ws.Server;

// Set the port to 3001
const PORT = 3001;
const clients = [];

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
//give the information to the client server
wss.clients.forEach(function each(client) {
  if (client.readyState === ws.OPEN) {
    client.send(data);
  }
});
};

wss.countUser = function countUser(data) {
//counting for users how many people are connected.
const usersNum = {
  type : 'incomingUser',
  count : data
}
return usersNum;
}

wss.on('connection', (ws) => {
//connet between server and client side
  var userCount = wss.countUser(wss.clients.size);
  wss.broadcast(JSON.stringify(userCount));
});

wss.on('connection', (socket) => {
  console.log('Client connected');
  clients.push(socket);
  var userCount = wss.countUser(wss.clients.size);
  wss.broadcast(JSON.stringify(userCount));
  
  socket.on('message', function incoming(message) {
    console.log('received: %s', message);
    const receivedMessage = JSON.parse(message);
    switch(receivedMessage.type) {
    	case "postNotification":
        receivedMessage.type = "incomingNotification"
        clients.forEach((client) => {
      		if (client.readyState == ws.OPEN) {
       			client.send(JSON.stringify(receivedMessage));
       			console.log(clients.length);
      		}
    		});
        break;
      case "postMessage":
        receivedMessage.type = "incomingMessage";
        clients.forEach((client) => {
      		if (client.readyState == ws.OPEN) {
       			client.send(JSON.stringify(receivedMessage));
       		}
    		});
        break;
      default:
        throw new Error(`Unknown event type: ${receivedMessage.type}`)
    }
    
    
  });

  socket.on('close', () => {
    console.log('Client disconnected');
    const userCount = wss.countUser(wss.clients.size);
    wss.broadcast(JSON.stringify(userCount));
  });
});

