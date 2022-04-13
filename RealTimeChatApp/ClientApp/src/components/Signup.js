import React, { useState } from 'react';
import "../custom.css";

const Signup = ({ signup, show, handleUsername, handlePassword }) => {
    const showOrHide = show ? "modal display-block" : "modal display-none";
 

  

    return (
        <div className={showOrHide}>
                <section className="modal-main rounded">
                <form>
                   <button className="close-button" type="button">
                        x
                  </button>
                    <div className="form-group  mx-sm-5 mb-2 mt-2 pt-3">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="usernameInput" placeholder="Enter username" onChange={handleUsername} />
                    </div>
                    <div className="form-group mx-sm-5 mb-2 pb-3">
                        <label htmlFor="password">Password</label>
                        <input type="text" className="form-control" id="passwordInput" placeholder="Password" onChange={handlePassword} />
                    </div>
                    <button type="submit" className="btn mx-sm-5 mb-2 mt-2 mb-4" onClick={signup}>Signup</button>
                </form>
                </section>
           </div>



       
    );
}

export default Signup;