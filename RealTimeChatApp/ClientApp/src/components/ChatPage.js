import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../custom.css';

const ChatPage = () => {
    const [user, setUser] = useState("");
    const [userId, setUserId] = useState(null);
    const [messages, setMessages] = useState([{}]);
    const [inputText, setInputText] = useState("");
    const [inputValue, setInputValue] = useState(); //??

    let history = useHistory();

    const url = "https://localhost:5001/api/Messages";


    useEffect(() => {
        getUsername();
    });


    const getUsername = () => {
        const data = localStorage.getItem("user");
        const jsonData = JSON.parse(data);
        setUser(jsonData.name);
        setUserId(jsonData.id);
    }



    const logOut = () => {
        localStorage.removeItem("user");
        history.push("/")
    }




    const getMessages = async () => {
        try {
            const response = await fetch(url);
            console.log(response)
            return response;
        } catch (err) {
            console.log(err);
            return err;
        }
    }





    const postMessage = async (id, message, date, channelId) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({UserId: id, Text: message, CreatedDate: date, ChannelId: channelId )
            }
            );
            console.log(response)
            return response;
        } catch (err) {
            console.log(err);
            return err;
        }
    }



    const sendMessage = async () => {
        let newMessage = {};
        let newMessage2 = {};
        if (inputText === "") {
            return false;
        } else {
            newMessage = { User: user, Message: inputText };
            setMessages([...messages, newMessage]);
            newMessage2 = { user: { id: 0, name: user }, text: inputText };

            postMessage(newMessage2);
        }
    }



 
    return (
      <div>
            <div className="container rounded">
                <p className="title-1">Chat App</p>
                <button className="btn logout" type="button" onClick={logOut}>LOGOUT</button>
            </div>
            <div className="container-2 rounded">
                    <div className="row">
                        <div className="col-3 rounded">
                        <p className="title rounded">ONLINE USERS</p>
                        <div className="user">
                                <p className="userName">{user}</p>                   
                        </div>
                        </div>
                    <div className="col-9 bg-light rounded">
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
                        <button className="btn btn-secondary" type="button" onClick={sendMessage}>Send</button>
                        </div>
                </div>
            </div>
      </div>


        );
    
    
}

export default ChatPage;