import React from 'react';

const Header = ({ onClick }) => {


    return (
        <div className="container rounded">
            <p className="title-1">Let's chat</p>
            <button className="btn logout" type="button" onClick={onClick}>LOGOUT</button>
        </div>
   );
}

export default Header;