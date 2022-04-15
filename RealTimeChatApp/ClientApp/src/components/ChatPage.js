import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import LoginSignup from './LoginSignup';
import '../custom.css';


const ChatPage = () => {
    const [user, setUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState("");
    const [channelId, setChannelId] = useState(null);
    const [channelPage, setChannelPage] = useState({});
    const [userId, setUserId] = useState(null);
    const [messages, setMessages] = useState([{}]);
    const [inputText, setInputText] = useState("");
    const [inputValue, setInputValue] = useState(); 

   

    let history = useHistory();


    //const socket = socketIOClient("https://127.0.0.1:7891");
   
  
    useEffect(() => {       
        showPage();
        let year = new Date().getFullYear();
        let month = new Date().getUTCMonth() + 1;
        let day = new Date().getUTCDate();
        let date = year + "-" + month + "-" + day;
        console.log(date);
        //socket.on("message", message => {
        //    console.log(message);
        //})
    }, []);



    const showPage = () => {
        let userLocalStorage = localStorage.getItem("user")
        if (!userLocalStorage) {
            history.push('/')
        } else {
            history.push('/Home');
            getUser();
        }
    }



    const getMessages = (newLogin) => {
        const data = JSON.parse(newLogin.data);
        console.log("hello from server");
        if (data.type === "newLogin") {
            let newMessage = { User: data.UserName, Message: data.Text };
            setMessages(mes => [...mes, newMessage]);
        }
    }



    const getUser = () => {
        const data = localStorage.getItem("user");
        const jsonData = JSON.parse(data);
        setUser(jsonData.name);
        setUserId(jsonData.id);
        setToken(jsonData.token);
    };



    const postMessage = async (name, id, message, date, channelId) => {
        const url = "https://localhost:5001/api/Messages";
        try {
            const options = {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}`, "Content-type": "application/json" },
                body: JSON.stringify({ UserName: name, UserId: id, Text: message, CreatedDate: date, ChannelId: channelId })
            };
            console.log(options);
            const response = await fetch(url, options)
                .then(res => console.log(res))
        } catch (err) {
            console.log(err);
            return err;
        }
    };



    const sendMessage = async () => {
        //setInputValue(""); 
        let date = new Date().toJSON().slice(0, 10);
        if (inputText !== "") {
            postMessage(user, userId, inputText, date, 1); 
        } else {
            return false;
        }
    };


    const showChannelChat = (e) => {
        e.preventDefault();
        console.log(e.target);
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
                    <div className="col-2 channel-column rounded">
                        <p className="title channel-column rounded">CHANNELS</p>
                        <div className="channels">
                            <div className="row d-flex flex-column h-100 buttons">
                                <button className="flex-item channel" type="button" onClick={() => setChannelPage(1)}>#General</button> 
                                <button className="flex-item channel" type="button" onClick={() => setChannelPage(2)}>#Sports</button>
                                <button className="flex-item channel" type="button" onClick={() => setChannelPage(3)}>#Music</button>
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
                    <input tyep="text" className="form-control" placeholder="Text here" value={inputValue} onChange={(e) => setInputText(e.target.value)} />
                    <div className="input-group-append">
                        <button className="btn" type="button" onClick={sendMessage}>Send</button>
                        </div>
                </div>
            </div>
      </div>


        );
    
    
}

export default ChatPage;