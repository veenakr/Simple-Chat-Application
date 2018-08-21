import React from 'react';
import ReactDOM from 'react-dom';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import Title from './Title';

const instanceLocator = 'v1:us1:f2b5c98d-7d8b-4751-9f9e-4d9b61ce4f2c';
const testToken =
  'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/f2b5c98d-7d8b-4751-9f9e-4d9b61ce4f2c/token';

const userName = 'Veena';
const roomId = 14379966;
const DUMMY_DATA = [
  {
    senderId: 'Veena',
    text: "who'll win?"
  },
  {
    senderId: 'Sachin',
    text: 'Brazil?'
  }
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: DUMMY_DATA
    };
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: userName,
      tokenProvider: new Chatkit.TokenProvider({
        url: testToken
      })
    });

    chatManager.connect().then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: messages => {
            this.setState({
              messages: [...this.state.messages, messages]
            });
          }
        }
      });
    });
  }

  sendMessage(text) {
    console.log(this.currentUser);
    this.currentUser.sendMessage({
      text,
      roomId: roomId
    });
  }

  render() {
    return (
      <div>
        <Title />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
