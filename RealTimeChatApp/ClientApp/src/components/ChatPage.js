import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import '../custom.css';

const ChatPage = () => {
    const [message, setMessage] = useState({});
    const [user, setUser] = useState("Julia");
    const [inputText, setInputText] = useState();
    const [value, setValue] = useState();

    const handleChange = (event) => {
        setInputText(event.target.value);
        console.log(event.target.value);
    }

    //set user to the login user

    const sendMessage = () => {
        let updatedValue = {};
        
        if (inputText !== "") {
          updatedValue = { "user": "inputText" };
          setMessage(message => ({...message, ...updatedValue}));

        } else {
            return false;
        }     
        //setValue("");
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
                        </div>
                    <div className="col-9 bg-light rounded">
                        <p className="message bg-light">{user}: {message}</p>
                    </div>
                    </div>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Text here" value={value} onChange={handleChange} />
                        <div class="input-group-append">
                        <button class="btn btn-secondary" type="button" onClick={sendMessage}>Send</button>
                        </div>
                    </div>
            </div>
      </div>


        );
    
    
}

export default ChatPage;