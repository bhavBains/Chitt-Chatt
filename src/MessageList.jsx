import React, { Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
 
    const messageComponents = this.props.messages.map((messageDataObject) => {
      return <Message key={messageDataObject.id} message={messageDataObject}/>;
    });
    return (
      <main className="messages">
        {messageComponents}  
      </main>
    )
  }
}

export default MessageList;