import React, { useState } from 'react';
import Signup from './Signup';

const Home = () => {
    const [isRegistered, setIsRegistered] = useState(true);
    const getSignedUp = () => {
        setIsRegistered(false);
    }
    

    if (!isRegistered) {
        return (
            { Signup }
        )
    }else {
            return (
                <div className="container login">
                    <div className="row">
                        <div className="col-4">
                            <form>
                                <div className="form-group  mx-sm-3 mb-2 mt-5">
                                    <label for="username">Username</label>
                                    <input type="text" className="form-control" id="usernameInput" placeholder="Enter username" />
                                </div>
                                <div className="form-group mx-sm-3 mb-2">
                                    <label for="password">Password</label>
                                    <input type="text" className="form-control" id="passwordInput" placeholder="Password" />
                                </div>
                                <button type="submit" className="btn btn-primary mx-sm-3 mb-2 mt-3">Login</button>
                                <p className="or mx-sm-3 mb-1 mt-2">Don't have an account?</p>
                                <button type="submit" className="signup btn mx-sm-1 mb-2 mt-1 text-primary" onClick={getSignedUp}>Signup</button>
                            </form>
                        </div>
                        <div className="col-8"></div>
                    </div>
                </div>
            )
        }
           
    
  
}

export default Home;
