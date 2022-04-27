import React from 'react';

const Users = ({ users }) => {
    return (
        <div className="col-2 rounded">
            <p className="title rounded">ONLINE</p>
            <div className="user">
                {users.map((user) => {
                    <p className="userName" key={user}>{user}</p>
                })}
              
            </div>
        </div>
   );
}

export default Users;