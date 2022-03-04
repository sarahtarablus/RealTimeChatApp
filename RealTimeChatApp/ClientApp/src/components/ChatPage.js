import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import '../custom.css';

const ChatPage = () => {
    const [users, setUsers] = useState("Jon");
    const [messages, setMessages] = useState([{}]);
    const [inputText, setInputText] = useState();
    const [inputValue, setInputValue] = useState();

    //set user to the login user

    const sendMessage = () => {
        let newMessage = {};
        if (inputText !== "") {
            newMessage = { User: users + ":", Message: inputText };
            setMessages([...messages, newMessage]);
        } else {
            return false;
        }
        //setInputValue("");
    }



 
    return (
      <div>
            <div className="container rounded">
                <p className="title-1">Chat App</p>
                <button className="btn logout" type="button">LOGOUT</button>
            </div>
            <div className="container-2 rounded">
                    <div className="row">
                        <div className="col-3 rounded">
                        <p className="title rounded">ONLINE USERS</p>
                        <div className="user">
                            <p className="userName">{users}</p>
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
                    <div class="input-group-append">
                        <button class="btn btn-secondary" type="button" onClick={sendMessage}>Send</button>
                        </div>
                </div>
            </div>
      </div>


        );
    
    
}

export default ChatPage;