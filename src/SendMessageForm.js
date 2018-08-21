import React from 'react';

class SendMessageForm extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      messages: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.messages);
    this.props.sendMessage(this.state.messages);
    this.setState({
      messages: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          onChange={this.handleChange}
          value={this.state.messages}
          placeholder="Type your message and hit ENTER"
          type="text"
        />
      </form>
    );
  }
}

export default SendMessageForm;
