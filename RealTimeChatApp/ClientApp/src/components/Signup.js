import React, { useState } from 'react';
import "../custom.css";

const Signup = ({ signup, show, value1, value2, handleUsername, handlePassword, onClick }) => {
    const showOrHide = show ? "modal display-block" : "modal display-none";
 

  

    return (
        <div className={showOrHide}>
            <section className="modal-main rounded">
                <form>
                    <button className="close-button" type="button" onClick={onClick}>x</button>
                    <div className="form-group  mx-sm-5 mb-2 mt-2 pt-3">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="usernameInput" placeholder="Enter username" value={value1} onChange={handleUsername} />
                    </div>
                    <div className="form-group mx-sm-5 mb-2 pb-3">
                        <label htmlFor="password">Password</label>
                        <input type="text" className="form-control" id="passwordInput" placeholder="Password" value={value2} onChange={handlePassword} />
                    </div>
                    <button type="submit" className="btn mx-sm-5 mb-2 mt-2 mb-4" onClick={signup}>Signup</button>
                </form>
            </section>
        </div>



       
    );
}

export default Signup;