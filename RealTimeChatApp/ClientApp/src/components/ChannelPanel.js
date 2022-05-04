import React from 'react';
import Channel from './Channel';

const ChannelPanel = ({ onClick, channelList }) => {
    return (
        <div className="col-2 channel-column rounded">
            <p className="title channel-column rounded">CHANNELS</p>
            <div className="channels">
                <div className="row d-flex flex-column h-100 buttons">
                    {channelList.map((c, index) => (<Channel onClick={onClick} id={c.id} title={c.name} name={c.name} key={index}></Channel>))}
                </div>
            </div>
        </div>
        );
}

export default ChannelPanel;

 