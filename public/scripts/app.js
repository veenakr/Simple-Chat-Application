'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MessageList = require('./MessageList');

var _MessageList2 = _interopRequireDefault(_MessageList);

var _SendMessageForm = require('./SendMessageForm');

var _SendMessageForm2 = _interopRequireDefault(_SendMessageForm);

var _Title = require('./Title');

var _Title2 = _interopRequireDefault(_Title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var instanceLocator = 'v1:us1:f2b5c98d-7d8b-4751-9f9e-4d9b61ce4f2c';
var testToken = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/f2b5c98d-7d8b-4751-9f9e-4d9b61ce4f2c/token';

var userName = 'Veena';
var roomId = 14379966;
var DUMMY_DATA = [{
  senderId: 'Veena',
  text: "who'll win?"
}, {
  senderId: 'Sachin',
  text: 'Brazil?'
}];

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

    _this.state = {
      messages: DUMMY_DATA
    };
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var chatManager = new Chatkit.ChatManager({
        instanceLocator: instanceLocator,
        userId: userName,
        tokenProvider: new Chatkit.TokenProvider({
          url: testToken
        })
      });

      chatManager.connect().then(function (currentUser) {
        currentUser.subscribeToRoom({
          roomId: roomId,
          hooks: {
            onNewMessage: function onNewMessage(messages) {
              _this2.setState({
                messages: [].concat(_toConsumableArray(_this2.state.messages), [messages])
              });
            }
          }
        });
      });
    }
  }, {
    key: 'sendMessage',
    value: function sendMessage(text) {
      console.log(this.currentUser);
      this.currentUser.sendMessage({
        text: text,
        roomId: roomId
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Title2.default, null),
        _react2.default.createElement(_MessageList2.default, { messages: this.state.messages }),
        _react2.default.createElement(_SendMessageForm2.default, { sendMessage: this.sendMessage })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));
