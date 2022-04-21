import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useHistory } from 'react-router-dom';
import jwt from "jwt-decode";
import LoginSignup from './LoginSignup';
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
        console.log(newConnection)
    }, []);


    useEffect(() => {
        startConnection();
        sendUser();
        getUsers();
    }, [connection]);



    const startConnection = () => {
        if (connection) {
            connection.start()
                .then(res => {
                    console.log('Connection started');                  
                    getMessages();
                });
        }
    }



    const getMessages = () => {
        connection.on("ReceiveMessage", msg => {
            let newMessage = { User: msg.userName, Message: msg.message };
            setMessages(msg => [...msg, newMessage]);
        });
    }



    const sendUser = () => {
        const userLS = JSON.parse(localStorage.getItem("user"));
        connection.send("ReceiveUser", userLS.name)
        .then(data => console.log(data))
    }



    const getUsers = () => {
        connection.on("ReceiveUser", user => {
            let newUser = { UserName: user.userName};
            setUser(usr => [...usr, newUser]);
        });
    }


    const isLoggedIn = () => {
        const userLS = getUserInLS();
        if (userLS) {
            const decodedJwt = jwt(userLS);
            if (decodedJwt.exp * 1000 < Date.now()) {
                logOut();
            } else history.push('/Home');
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
        const url = "https://localhost:5001/api/Messages";
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
                    <div className="col-2 channel-column rounded">
                        <p className="title channel-column rounded">CHANNELS</p>
                        <div className="channels">
                            <div className="row d-flex flex-column h-100 buttons">
                                <button className="flex-item channel" type="button" onClick={() => setChannelId(1)}>#General</button>
                                <button className="flex-item channel" type="button" onClick={() => setChannelId(2)}>#Sports</button>
                                <button className="flex-item channel" type="button" onClick={() => setChannelId(3)}>#Music</button>
                            </div>
                        </div>
                    </div>
                        <div className="col-2 rounded">
                        <p className="title rounded">ONLINE</p>
                        <div className="user">
                            {users.map((u, index) => {
                                <p className="userName" key={index}>{u}</p>
                            })}                                          
                        </div>
                        </div>
                    <div className="col-8 bg-light rounded">
                        {messages.map((message, index) => (
                            <div className="message bg-light" key={index}>
                                <p className="msg-user bg-light">{message.User}</p>
                                <p className="msg-msg bg-light">{message.Message}</p>
                            </div>
                        ))}
               
                    </div>
                </div>          
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Text here" onChange={(e) => setInputText(e.target.value)}/>
                    <div className="input-group-append">
                        <button className="btn" type="button" onClick={sendMessage}>Send</button>
                        </div>
                </div>
            </div>
      </div>


        );
    
    
}

export default ChatPage;