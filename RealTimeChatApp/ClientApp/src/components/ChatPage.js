import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import LoginSignup from './LoginSignup';
import '../custom.css';

const ChatPage = () => {
    const [user, setUser] = useState("");
    const [token, setToken] = useState("");
    const [channelId, setChannelId] = useState(null);
    const [channelPage, setChannelPage] = useState({});
    const [userId, setUserId] = useState(null);
    const [messages, setMessages] = useState([{}]);
    const [inputText, setInputText] = useState("");
    const [inputValue, setInputValue] = useState(); //??


    let history = useHistory();
  
  
    useEffect(() => {       
        getUser();
    }, []);


    const getUser = () => {
        const data = localStorage.getItem("user");
        const jsonData = JSON.parse(data);
        setUser(jsonData.name);
        setUserId(jsonData.id);
        setToken(jsonData.password);
    };



    const getMessages = async () => {
        const url = "https://localhost:5001/api/Messages";
        try {
            const response = await fetch(url);
            return response;
        } catch (err) {
            console.log(err);
            return err;
        }
    };



    const postMessage = async (name, id, message, date, channelId) => {
        const url = "https://localhost:5001/api/Messages";
        try {
            const options = {
                method: "POST",
                headers: { "Accept": "application/json", "Content-type": "application/json", "Authorization" : `Bearer ${token}`},
                body: JSON.stringify({ UserName: name, UserId: id, Text: message, CreatedDate: date, ChannelId: channelId })
            };
            const response = await fetch(url, options)
                .then(res => console.log(res))
        } catch (err) {
            console.log(err);
            return err;
        }
    };



    const sendMessage = async () => {
        let newMessage;
        let date = new Date().toJSON().slice(0, 10);
        if (inputText !== "") {
            newMessage = { User: user, Message: inputText };
            setMessages(mes => [...mes, newMessage]);
            console.log(user + " " +  userId +  " " + inputText + " " + date + " " + 1);
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
                                <p className="userName">{user}</p>                   
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
                    <input type="text" className="form-control" placeholder="Text here" value={inputValue} onChange={(e) => setInputText(e.target.value)} />
                    <div className="input-group-append">
                        <button className="btn" type="button" onClick={sendMessage}>Send</button>
                        </div>
                </div>
            </div>
      </div>


        );
    
    
}

export default ChatPage;