import React from 'react';
import Header from './Header';
import Messages from './Messages';
import Users from './Users';
import ChannelPanel from './ChannelPanel';
import InputGroup from './InputGroup';


const Page = ({ onClick, changeChannel, channelList, users, messages, onChange, sendMessage, value, loading }) => {
  


    return (
        <div>
            <Header onClick={onClick}></Header>
            <div className="container-2 rounded">
                <div className="row">
                    <ChannelPanel onClick={changeChannel} channelList={channelList} loading={loading}></ChannelPanel>
                    <Users users={users}></Users>             
                    <Messages messages={messages}></Messages>                                    
                </div>
                <InputGroup onChange={onChange} onClick={sendMessage} value={value}></InputGroup>
            </div>
        </div>
    );
}

export default Page;


