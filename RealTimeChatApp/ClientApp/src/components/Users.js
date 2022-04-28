import React from 'react';

const Users = ({ users }) => {
    return (
        <div className="col-2 rounded">
            <p className="title rounded">ONLINE</p>
            <div className="user">
                {users.map((user, index) => (
                    <p className="userName" key={index}>{user.name}</p>
                ))}
              
            </div>
        </div>
   );
}

export default Users;