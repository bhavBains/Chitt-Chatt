import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const letters = 'abcdefghijklmnopqrstuvwxyz';
const alphabet = `0123456789${letters}${letters.toUpperCase()}`;
const rando = () => {
  let output = '';
  for(let i = 0; i < 6; i++){
    output += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return output;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"},
      messages : [{
        username: 'Bhav',
        content: 'Hey, Joel',
        id: rando()
      },
      {
        username: 'Joel',
        content: 'Hey, Bhav',
        id: rando()
      }]
    }
    this.handleInsertMessage = this.handleInsertMessage.bind(this);
    this.socket = null;
  }

  handleNameChange = (name) => {
    this.setState({currentUser: { name: name}});
  }

   handleInsertMessage = (message) => {
    const newMessage = {
      type: "postMessage",
      username: message.username,
      content: message.content,
      id: rando()
    }
    this.socket.send(JSON.stringify(newMessage));

    if(this.state.currentUser.name !== message.username) {
      const newNotification = {type: "postNotification", id: rando(), content: `${this.state.currentUser.name} has changed their name to ${message.username}`}
      this.state.currentUser.name = message.username;
      this.socket.send(JSON.stringify(newNotification));
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    }

    this.socket.addEventListener('message', (msg) => {
      console.log(msg);
      const messageObject = JSON.parse(msg.data);
      const serverDataArray =[];

      switch(messageObject.type) {
        case "incomingMessage":
          serverDataArray.push(messageObject);
          break;
        case "incomingNotification":
          serverDataArray.push(messageObject);
          break;
        default:
        throw new Error("Unknown event type: " + messageObject.type)
      }

      this.setState({
        messages: this.state.messages.concat(serverDataArray)
      });
    });
  }

  render() {
    return (
      <div>
      	<nav className="navbar">
          <a href="/" className="navbar-brand">My Chatty App</a><img src="https://media.giphy.com/media/dUegoPhtD5hOU/giphy.gif"></img>
      		<span>Online Users: </span></nav>
    		<MessageList messages={this.state.messages}/>
    		<ChatBar currentUser={this.state.currentUser.name} handleInsertMessage={this.handleInsertMessage}
                 handleNameChange={this.handleNameChange} />
    	</div>
    );
  }
}

export default App;
