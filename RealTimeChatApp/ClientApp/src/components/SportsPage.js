import 'bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';


const SportsPage = ({ logOut, changeChannel1, changeChannel2, changeChannel3, user, messages, setInputText, sendMessage }) => {


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
                                <button className="flex-item channel" type="button" onClick={changeChannel1}>#General</button>
                                <button className="flex-item channel" type="button" onClick={changeChannel2}>#Sports</button>
                                <button className="flex-item channel" type="button" onClick={changeChannel3}>#Music</button>
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
                    <input type="text" className="form-control" placeholder="Text here" onChange={setInputText} />
                    <div className="input-group-append">
                        <button className="btn" type="button" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SportsPage;