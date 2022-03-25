import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
//import axios from 'axios';

import ChatPage from './ChatPage';
import Signup from './Signup';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});

    const url = "https://localhost:5001/api/Login";
    
   
    //create user object that can translate to dictionary for post request in Login.cs

    const submitLoginRequest = async (e) => {
        e.preventDefault();
        try {
            if (username === "" || password === "") {
                alert("Make sure to fill both username and password");
                return false;
            } else {

                let person = { Name: username, Password: password };
                setUser({ person });
                const options = {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify(user)
                };

                const response1 = await fetch(url, options)
                    .then(data => data)
                    .catch(err => console.log(err))
                //const response2 = await fetch(url)
                //    .then(res => console.log(res))
                //    .catch(err => console.log(err))


            }
        } catch (err) {
            console.log(err);
            
        }   
    }




    //const postUser = async (user) => {
    //    try {
    //        const response = await fetch(url, {
    //            method: "POST",
    //            headers: { "Content-type": "application/json" },
    //            body: JSON.stringify(user)
    //        });
    //        console.log(response);
    //        return response;

    //    } catch (err) {
    //        console.log(err);
    //        return err;
    //    }
    //}



    //const getUser = async () => {
    //    try {
    //        const options = {
    //            headers: {
    //                Content
    //            }
    //        }

    //        const response = await fetch(url);
    //        console.log(response);
    //        return response;
    //    } catch (err) {
    //        console.log(err);
    //        return err;
    //    }
    //}




   return (
          <div className="container login">
                    <div className="row">
                        <div className="col-4">
                            <form>
                                <div className="form-group  mx-sm-3 mb-2 mt-5">
                           <label htmlFor="username">Username</label>
                           <input type="text" className="form-control" id="usernameInput" placeholder="Enter username" onChange={(e) => {
                               setUsername(e.target.value)
                           }}/>
                                </div>
                                <div className="form-group mx-sm-3 mb-2">
                           <label htmlFor="password">Password</label>
                           <input type="text" className="form-control" id="passwordInput" placeholder="Password" onChange={(e) => {
                               setPassword(e.target.value)
                           }} /> 
                       </div>
                       <button type="submit" className="btn btn-primary mx-sm-3 mb-2 mt-3" onClick={submitLoginRequest}>Login</button>
                                <p className="or mx-sm-3 mb-1 mt-2">Don't have an account?</p>
                                <button type="button" className="signup btn mx-sm-1 mb-2 mt-1 text-primary">Signup</button>
                            </form>
                        </div>
                        <div className="col-8"></div>
                    </div>
                </div>
            )
        }
           
    
  


export default Login;
