import React from 'react';

let chatStyle = {
    padding: '10px',
    border: '1px solid black',
    height: '600px',
    overflowY: 'scroll'
};

class Chat extends React.Component {
    state = {messages: []}
    socket = null;

    componentDidMount() {
        // let baseUrl = "social-network.samuraijs.com";
        // socket = new WebSocket("wss://" + baseUrl + "/handlers/ChatHandler.ashx");
        this.socket = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
        this.socket.onmessage = this.onMessage.bind(this);
    }

    onMessage(messageEvent) {
        if(messageEvent.data) {
            let messages = JSON.parse(messageEvent.data);
            this.setState({
                messages:  [...this.state.messages, ...messages]
            });
        }
    }

    onKeyPress(e) {
        if (e.ctrlKey && e.charCode === 13) {
            this.socket.send(e.target.value);
            e.target.value = ''
        }
    }

    render() {
        return <div>
            <h3>CHAT IT-INCUBATOR TRASH</h3>
            <div style={chatStyle}>
                {this.state.messages.map(m => <div>
                    <b>{m.userName}  </b>{m.message}
                </div>)}
            </div>
            <div style={{padding: '10px'}}>
                <textarea onKeyPress={this.onKeyPress.bind(this)}></textarea>
            </div>
        </div>
    }
}

export default Chat;