import React, { Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content : "",
      username: this.props.currentUser.name
    }

    // this.handleContentChange = this.handleContentChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleContentChange = (event) => {
    this.setState({content: event.target.value})
  }

  handleSubmit = (event) => {
    // console.log("this is chatbar event :", event )
    if(event.key === 'Enter') {
      this.props.handleInsertMessage(this.state);
      this.setState({content: ""})
    }
  }

  handleNameChange = (event) => {
    this.setState({username: event.target.value});
  }

  handleNameSubmit = (event) => {
    if(event.key === "Enter") {
      // this.props.currentUser(this.state.username);
      this.setState({username: event.target.value});
      this.props.handleNameChange(this.state.username);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="enter your name"
          value={this.state.username} onChange={this.handleNameChange}
          onKeyPress={this.handleNameSubmit} />
        <input className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          value={this.state.content} onChange={this.handleContentChange}
          onKeyPress={this.handleSubmit} />
      </footer>
    )
  }
}

export default ChatBar;