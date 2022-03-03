import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import '../custom.css';

const ChatPage = () => {
    const [message, setMessage] = useState("Hello");




    return (
        <div className="container">
            <div className="row">
                <div className="col-3 bg-info rounded">
                    <p className="title rounded">Online Users</p>
                </div>
                <div className="col-9 bg-light rounded">{message}
                </div>
            </div>
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Text here" aria-label="Text here" aria-describedby="basic-addon2"/>
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button">Send</button>
                    </div>
            </div>
        </div>

        );
    
}

export default ChatPage;