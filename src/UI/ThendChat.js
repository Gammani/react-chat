import React, {useEffect, useState} from 'react';

let chatStyle = {
    padding: '10px',
    border: '1px solid black',
    height: '600px',
    overflowY: 'scroll'
};

const TrendChat = (props) => {

    const [messages, setMessages] = useState([]);
    let [socket, setSocket] = useState(null);

    let messagesRef = React.createRef();

    useEffect(() => {
        const newSocket = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");

        setSocket(newSocket);

        return () => {
            newSocket.close();
        }

    }, [])
    useEffect(() => {
        if(socket) {
           socket.onmessage = onMessage;
        }
    })
    useEffect(() => {
        let div = messagesRef.current;
        div.scrollTo(0, div.scrollHeight);
    })

   const onMessage = (messageEvent) =>  {
        if(messageEvent.data) {
            let newMessages = JSON.parse(messageEvent.data);
            setMessages([...messages, ...newMessages]);
        }
    }

    const onKeyPress = (e) => {
        if (e.ctrlKey && e.charCode === 13) {
            socket.send(e.target.value);
            e.target.value = ''
        }
    }

    return <div>
        <h3>CHAT IT-INCUBATOR TRASH</h3>
        <div style={chatStyle} ref={messagesRef}>
            {messages.map((m, i) => <div key={i}>
                <b>{m.userName}  </b> {m.message}
            </div>)}
        </div>
        <div style={{padding: '10px'}}>
            <textarea onKeyPress={onKeyPress}></textarea>
        </div>
    </div>
}

export default TrendChat;