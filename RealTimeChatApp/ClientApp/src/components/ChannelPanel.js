import React from 'react';

const ChannelPanel = ({ changeChannel1, changeChannel2, changeChannel3 }) => {


    return (
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
        );
}

export default ChannelPanel;