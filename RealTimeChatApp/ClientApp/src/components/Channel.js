import React from 'react';

const Channel = ({ onClick, title, id, name }) => {

    return (
        <button className="flex-item channel" type="button" onClick={onClick} id={id} name={name}>{title}</button>
    );
}

export default Channel;