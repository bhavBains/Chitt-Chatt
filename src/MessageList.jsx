import React, { Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    let temp =[];
    this.props.message.forEach(msg => {
      temp.push(<Message key={msg.id} messages={msg}/>)
    })
    return (
      <main className="messages">
        {temp}
      </main>
    )
  }
}

export default MessageList;