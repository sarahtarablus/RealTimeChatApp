import React from 'react';

const Users = ({ username }) => {
    return (
        <div className="col-2 rounded">
            <p className="title rounded">ONLINE</p>
            <div className="user">
                <p className="userName">{username}</p>
            </div>
        </div>
   );
}

export default Users;