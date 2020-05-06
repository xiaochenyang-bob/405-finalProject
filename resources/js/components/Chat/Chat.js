import React, {useState, useEffect} from 'react';
//useEffect is the hook for component life cycle methods
import queryString from 'query-string';
import io from 'socket.io-client';
import "./Chat.css";
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContrainer from '../TextContainer/TextContainer';
let socket;

const Chat = (props) =>{
    const {location} = props;
     const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'https://final-project-chat-server.herokuapp.com/';

    //for handling joining
    useEffect(()=>{
        const {name, room} = queryString.parse(location.search);
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);

        //emit message will be received on server side 
        socket.emit('join', {name,room}, ()=>{
          //this is an error handling function
        });

        return ()=>{
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);
    //only fire again if ENDPOINT or location.search changes 


    //for handling messages
    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    }, [messages]);

    const sendMessage = (event)=>{
        event.preventDefault();

        if (message) {
            //use the callback function to set the message value back to empty after sending
            socket.emit('sendMessage', message, ()=>setMessage(''));
        }
    }

    //console.log(message, messages);

    return (
        <div className = "outerContainer">
            <div className = "container">
                <InfoBar {...props} user={props.user} room={room}/>
                <Messages {...props} user={props.user} messages={messages} name={name}/>
                <Input {...props} user={props.user} message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div> 
            <TextContrainer users={users}/>
        </div>
    );
}

export default Chat;