import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useHistory } from 'react-router-dom';
import jwt from "jwt-decode";
import LoginSignup from './LoginSignup';
import Messages from './Messages';
import Users from './Users';
import Channels from './Channels';
import InputGroup from './InputGroup';
import '../custom.css';


const ChatPage = () => {
    const [user, setUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState("");
    const [channelId, setChannelId] = useState(1);
    const [channelPage, setChannelPage] = useState({});
    const [userId, setUserId] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([{}]);
    const [inputText, setInputText] = useState("");
    const [connection, setConnection] = useState(null);



    let history = useHistory();




    useEffect(() => {
        isLoggedIn();
        const newConnection = new HubConnectionBuilder()
            .withUrl("/message ")
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, []);


    useEffect(() => {
        startConnection();
    }, [connection]);



    const startConnection = () => {
        if (connection) {
            connection.start()
                .then(res => {
                    console.log('Connection started');
                    getMessage();
                });
        }
    }



    const getMessage = () => {
        connection.on("ReceiveMessage", msg => {
            let newMessage = { User: msg.userName, Message: msg.message };
            setMessages(msg => [...msg, newMessage]);
        });
    }


    const getMessages = async (channel) => {
        const url = "https://localhost:5001/api/Messages/GetMessages";
        try {
            const options = {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ Id: channel })
            };
            console.log(channel);
            const response = await fetch(url, options)
                .then(res => res.json())
  
            if (response.length) {
                for (var i = 0; i < response.length; i++) {
                    let newMessage = { User: response[i].userName, Message: response[i].message };
                    setMessages(msg => [...msg, newMessage])
                }
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    }

  

    const isLoggedIn = () => {
        const userLS = getUserInLS();
        if (userLS) {
            const decodedJwt = jwt(userLS);
            if (decodedJwt.exp * 1000 < Date.now()) {
                logOut();
            } else {
                history.push('/Home');
                getMessages(channelId);
            }
        }
    }



    const getUserInLS = () => {
        const userLS = JSON.parse(localStorage.getItem("user"));
        setUser(userLS.name);
        setUserId(userLS.id);
        setToken(userLS.token);
        return userLS.token;
    }




    const postMessage = async (name, id, message, channelId) => {
        const url = "https://localhost:5001/api/Messages/PostMessages";
        try {
            const options = {
                method: "POST",
                headers: { "Authorization": `Bearer ${JSON.stringify(token)}`, "Content-type": "application/json" },
                body: JSON.stringify({ UserName: name, UserId: id, Text: message, ChannelId: channelId })
            };
            const response = await fetch(url, options)
                .then(res => console.log(res))
        } catch (err) {
            console.log(err);
            return err;
        }
    };



    const sendMessage = async () => {
        if (inputText !== "") {
            postMessage(user, userId, inputText, channelId);
        } else {
            return false;
        }
    };


    const changeChannel1 = () => {
        setChannelId(1)
        history.push('/Home')
    }


    const changeChannel2 = () => {
        setChannelId(2)
        history.push('/Home/Sports')
    }


    const changeChannel3 = () => {
        setChannelId(3)
        history.push('/Home/Music')
    }



    const logOut = () => {
        localStorage.removeItem("user");
        history.push("/")
    };




  


    return (
        <div>
            <div className="container rounded">
                <p className="title-1">Let's chat</p>
                <button className="btn logout" type="button" onClick={logOut}>LOGOUT</button>
            </div>
            <div className="container-2 rounded">
                <div className="row">
                    <Channels changeChannel1={changeChannel1} changeChannel2={changeChannel2} changeChannel3={changeChannel3}></Channels>
                    <Users username={user}></Users>
                    <Messages messages={messages}></Messages>
                </div>
                <InputGroup onChange={(e) => setInputText(e.target.value)} onClick={sendMessage}></InputGroup>
            </div>
        </div>


    );


}

export default ChatPage;