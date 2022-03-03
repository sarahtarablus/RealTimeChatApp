import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import '../custom.css';

const ChatPage = () => {



    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-3 bg-info">
                    <h5 className="title">Users</h5>
                </div>
                <div className="col-9 bg-light">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Text here" aria-label="Text here" aria-describedby="basic-addon2">
                         </input>
                    
                    </div>
                </div>
            </div>
        </div>

        );
    
}

export default ChatPage;