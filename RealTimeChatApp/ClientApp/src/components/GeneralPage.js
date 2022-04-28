import React from 'react';
import Header from './Header';
import Messages from './Messages';
import Users from './Users';
import ChannelPanel from './ChannelPanel';
import InputGroup from './InputGroup';


const GeneralPage = ({ onClick, changeChannel, channelList, users, messages, onChange, sendMessage }) => {

    return (
        <div>
            <Header onClick={onClick}></Header>
            <div className="container-2 rounded">
                <div className="row">
                    <ChannelPanel onClick={changeChannel} channelList={channelList}></ChannelPanel>
                    <Users users={users}></Users>
                    <Messages messages={messages}></Messages>
                </div>
                <InputGroup onChange={onChange} onClick={sendMessage}></InputGroup>
            </div>
        </div>
    );
}

export default GeneralPage;


