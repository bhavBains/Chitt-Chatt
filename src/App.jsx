import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
      currentUser: "Bob",
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id :1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2
        }
      ]
    }
    
  }

  render() {
    return (
      <div>
      	<nav className="navbar">
    		  <a href="/" className="navbar-brand">Chatty</a>
    		</nav>
    		<MessageList message={this.state.messages}/>
    		<ChatBar user={this.state.currentUser}/>
    	</div>
    );
  }
}
export default App;
