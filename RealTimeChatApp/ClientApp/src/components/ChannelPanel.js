import React from 'react';
import Channel from './Channel';

const ChannelPanel = ({ onClick, channelList }) => {
    let list;
    if (channelList) {
        list = channelList.map(c => <Channel onClick={onClick} id={c.id} title={c.name} name={c.name}></Channel>);
    }

    return (
        <div className="col-2 channel-column rounded">
            <p className="title channel-column rounded">CHANNELS</p>
            <div className="channels">
                <div className="row d-flex flex-column h-100 buttons">
                    {list}
                </div>
            </div>
        </div>
        );
}

export default ChannelPanel;

 