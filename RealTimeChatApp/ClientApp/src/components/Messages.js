import React from 'react';

const Messages = ({ messages }) => {
    return (
        <div className="col-8 bg-light rounded">
            {messages.map((message, index) => (
                <div className="message bg-light" key={index}>
                    <p className="msg-user bg-light">{message.User}</p>
                    <p className="msg-msg bg-light">{message.Message}</p>
                </div>
            ))}
        </div>
    );
}

export default Messages;