import 'bootstrap/dist/css/bootstrap.css';
import '../custom.css';
import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useHistory } from 'react-router-dom';
import jwt from 'jwt-decode';
import LoginSignup from './LoginSignup';
import Page from './Page';




const ChatPage = () => {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([{}]);
    const [token, setToken] = useState("");
    const [channelId, setChannelId] = useState(1);
    const [channels, setChannels] = useState([{}]);
    const [userId, setUserId] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([{}]);
    const [messages2, setMessages2] = useState([{}]);
    const [messages3, setMessages3] = useState([{}]);
    const [inputText, setInputText] = useState("");
    const [value, setValue] = useState("");
    const [connection, setConnection] = useState(null);

    //const urlLocation = window.location.pathname.split("/").pop();

    let history = useHistory();




    useEffect(() => {
        isLoggedIn();
        const newConnection = new HubConnectionBuilder()
            .withUrl("/chat")
            .withAutomaticReconnect()
            .build();
        setConnection(newConnection);
    }, []);



    useEffect(() => {
        startConnection();
        requestMessages(channelId)
        getMessages();
    }, [connection]);



    const startConnection = () => {
        if (connection) {
            connection.start()
                .then(res => {
                    loadChannels();
                    sendUsers();                 
                    getMessage();
                    getUsers();
                });
        }
    }



    const getUserInLS = () => {
        const userLS = JSON.parse(localStorage.getItem("user"));
        setUser(userLS.name);
        setUserId(userLS.id);
        setToken(userLS.token);
        return userLS.token;
    }



    const isLoggedIn = () => {
        const userLS = getUserInLS();
        if (userLS) {
            const decodedJwt = jwt(userLS);
            if (decodedJwt.exp * 1000 < Date.now()) {
                logOut();
            } else {
                history.push("/Home/general");
            }
        }
    }




    const getMethod = async (url) => {
        const response = await fetch(url)
            .then(res => res.json())
        return response;
    }




    const postMethod = async (newUrl, body, headers) => {
        const url = newUrl;
        const options = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        };
        const response = await fetch(url, options)
            .then(res => res.json())
        return response;
    }



    const loadChannels = async () => {
        const url = "https://localhost:5001/api/Channels";
        try {
            const response = await getMethod(url);
            if (response.length) {
                for (var i = 0; i < response.length; i++) {
                    let newChannel = { id: response[i].id, name: response[i].name };
                    setChannels(cha => [...cha, newChannel]);
                }
            }
        } catch (err) {
            return err;
        }
    }



    const sendUsers = async () => {
        if (userId) {
            try {
                const url = "https://localhost:5001/api/Login/GetUser";
                let newUser = { Name: user, Id: userId };
                postMethod(url, newUser, { "Content-type": "application/json" })
            } catch (err) { return err; }
        }
    }



    const getUsers = () => {
            connection.on("NewLogin", (newUser) => {
                users.some(usr => {
                    if (usr.id === newUser.id) {
                        return false;
                    } else {
                        setUsers(users => [...users, newUser]);
                    }
                });
            });
    };



    const getMessageIdCount = async () => {
        const url = "https://localhost:5001/api/Messages";
        try {
            let id;
            const response = await getMethod(url);
            if (response.length) {
                id = response[0] + 1
            } else id = 1
            return id;
        } catch (err) {
            return err;
        }
    };



    const sendMessage = async () => {
        let id = await getMessageIdCount();
        if (inputText !== "") {
            try {
                postMethod("https://localhost:5001/api/Messages/PostMessages", { UserName: user, UserId: userId, Text: inputText, ChannelId: channelId, Id: id }, { "Authorization": `Bearer ${JSON.stringify(token)}`, "Content-type": "application/json" });
                setInputText("");
            } catch (err) { return err; }
        } else {
            return false;
        }
    };



    const getMessage = () => {
        connection.on("ReceiveMessage", msg => {
            let newMessage = { User: msg.userName, Message: msg.message, channelId: msg.channelId, id: msg.id };
            switch (newMessage.channelId) {
                case 1:
                    setMessages(msg => [...msg, newMessage]);
                    break;
                case 2:
                    setMessages2(msg => [...msg, newMessage]);
                    break;
                case 3:
                    setMessages3(msg => [...msg, newMessage]);
                    break;
            }

        });
    }



    const requestMessages = async (channel) => {
        const url = "https://localhost:5001/api/Messages/GetMessages";
        try {
            const response = await postMethod(url, { Id: channel }, { "Content-type": "application/json" });
        } catch (err) { return err; }
    }



    const getMessages = () => {
        if (connection) {
            connection.on("DisplayMessages", (msg) => {
                setMessages([{}]);
                setMessages2([{}]);
                setMessages3([{}]);
                for (let i = 0; i < msg.length; i++) {
                    let newMessage = { User: msg[i].userName, Message: msg[i].message, ChannelId: msg[i].channelId, Id: msg[i].id };
                    switch (newMessage.ChannelId) {
                        case 1:                      
                            setMessages(messages => [...messages, newMessage]);              
                            break;
                        case 2:                     
                            setMessages2(messages => [...messages, newMessage]);                       
                            break;
                        case 3:                    
                           setMessages3(messages => [...messages, newMessage]);                
                            break;
                    }
                    
                }                       
            })
        }
    }



    const changeChannel = (e) => {
        e.preventDefault();
        let newChannel = JSON.parse(e.target.id)
        setChannelId(newChannel);       
        history.push(`/Home/${e.target.name}`);
        requestMessages(newChannel);
        getMessages();
    }



    const logOut = () => {
        localStorage.removeItem("user");
        history.push("/")
    };


    let messagesList;
    if (channelId === 1) {
        messagesList = messages;
    } else if (channelId === 2) {
        messagesList = messages2;
    } else if (channelId === 3) {
        messagesList = messages3;
    }

   
    return (
 
        <Page onClick={logOut} changeChannel={changeChannel} channelList={channels} users={users} messages={messagesList} onChange={(e) => setInputText(e.target.value)} sendMessage={sendMessage} value={inputText}></Page>
        );
 


}

export default ChatPage;