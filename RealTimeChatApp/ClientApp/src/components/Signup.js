import React, { useState } from 'react';
import "../custom.css";

const Signup = ({ signup, show, handleUsername, handlePassword }) => {
    const showOrHide = show ? "modal display-block" : "modal display-none";
 

  

    return (
        <div className={showOrHide}>
                <section className="modal-main">
                <form>
                    <div className="form-group  mx-sm-3 mb-2 mt-5">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="usernameInput" placeholder="Enter username" onChange={handleUsername} />
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                        <label htmlFor="password">Password</label>
                        <input type="text" className="form-control" id="passwordInput" placeholder="Password" onChange={handlePassword} />
                    </div>
                    <button type="submit" className="btn btn-primary mx-sm-3 mb-2 mt-3" onClick={signup}>Signup</button>
                </form>
                  <button type="button">
                    Close
                  </button>
                </section>
           </div>



       
    );
}

export default Signup;