import 'bootstrap/dist/css/bootstrap.css';
import '../custom.css';
import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useHistory } from 'react-router-dom';
import jwt from "jwt-decode";
import LoginSignup from './LoginSignup';
import GeneralPage from './GeneralPage';
import SportsPage from './SportsPage';
//import Messages from './Messages';
//import Users from './Users';
//import ChannelPanel from './ChannelPanel';
//import InputGroup from './InputGroup';
//import Header from './Header';




const ChatPage = () => {
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([{}]);
    const [token, setToken] = useState("");
    const [channelId, setChannelId] = useState(1);
   // const [channelPage, setChannelPage] = useState({});

    const [channels, setChannels] = useState([{}]);
    const [userId, setUserId] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([{}]);
    const [inputText, setInputText] = useState("");
    const [connection, setConnection] = useState(null);



    let history = useHistory();




    useEffect(() => {
        isLoggedIn();
        const newConnection = new HubConnectionBuilder()
            .withUrl("/chat ")
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
                    loadChannels();
                    sendUsers();
                    requestMessages(channelId);
                    getMessage();
                    getUsers();
                    getMessages();
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
                history.push('/Home/General');

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
        if (connection) {
            connection.on("NewLogin", (newUser) => {
                users.some(usr => {
                    if (usr.id === newUser.id) {
                        return false;
                    } else {
                        setUsers(users => [...users, newUser]);
                    }
                });
            });
        }
    };



    const sendMessage = async () => {
        if (inputText !== "") {
            try {
                postMethod("https://localhost:5001/api/Messages/PostMessages", { UserName: user, UserId: userId, Text: inputText, ChannelId: channelId }, { "Authorization": `Bearer ${JSON.stringify(token)}`, "Content-type": "application/json" });
            } catch (err) { return err; }

        } else {
            return false;
        }
    };



    const getMessage = () => {
        connection.on("ReceiveMessage", msg => {
            let newMessage = { User: msg.userName, Message: msg.message };
            setMessages(msg => [...msg, newMessage]);
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
                for (let i = 0; i < msg.length; i++) {
                   let newMessage = { User: msg[i].userName, Message: msg[i].message };
                   setMessages(msg => [...msg, newMessage]);
                }
            });
        }
    }




    const changeChannel = (e) => {
        e.preventDefault();
        setChannelId(e.target.id);
        history.push(`/Home/${e.target.name}`);
    }




    //const selectChannel = (id) => {
    //    if (connection) {
    //      connection.send("joinChannel", id)
    //    }     
    //}


    const logOut = () => {
        localStorage.removeItem("user");
        history.push("/")
    };




  
    return (
        <GeneralPage onClick={logOut} changeChannel={changeChannel} channelList={channels} users={users} messages={messages} onChange={(e) => setInputText(e.target.value)} sendMessage={sendMessage}></GeneralPage>
    );

}

export default ChatPage;