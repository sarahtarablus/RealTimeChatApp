import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChatPage from './ChatPage';
import Signup from './Signup';
import '../custom.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [show, setShow] = useState(false);

    let history = useHistory();


    useEffect(() => {
        localStorage.getItem("user") ? history.push("/Home") : console.log("welcome");
    }, []);




    const getUsersCountInDatabase = async () => {
        const url = "https://localhost:5001/api/Users"
        try {
            const response = await fetch(url);
            console.log(response)
            return response;
        } catch (err) {
            console.log(err);
            return err;
        }
    }


    const SubmitLoginRequest = async (e) => {
        e.preventDefault();
        const url = "https://localhost:5001/api/Login";
        try {
            if (username === "" || password === "") {
                alert("Make sure to fill both username and password");
                return false;
            } else {
                postUser(url, username, password);
            }
        } catch (err) {
            console.log(err);
        }
    }

    


    const showModal = () => {
        setShow(true);
    }



    const signUp = () => {
        setShow(false);

    }




    const postUser = async (url, name, password) => {
        try {
            const options = {
                method: "POST",
                headers: { 'Accept': 'application/json', "Content-type": "application/json" },
                body: JSON.stringify({ Name: name, Password: password })
            };
            const response = await fetch(url, options)
                .then(res => res.json())
            response.length ? localStorage.setItem("user", JSON.stringify(response[0].name)) : console.log('empty');
            history.push("/Home");
            } catch (err) {
                console.log(err);
                return err;
            }
    }



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
                       <button type="submit" className="btn btn-primary mx-sm-3 mb-2 mt-3" onClick={SubmitLoginRequest}>Login</button>
                                <p className="or mx-sm-3 mb-1 mt-2">Don't have an account?</p>
                       <button type="button" className="signup btn mx-sm-1 mb-2 mt-1 text-primary" onClick={showModal}>Signup</button>
                       <Signup show={show} signup={signUp} handleUsername={(e) => { setUsername(e.target.value) }} handlePassword={(e) => {
                           setPassword(e.target.value)
                       }}>
                           <p>Modal</p>
                       </Signup>
                            </form>
                        </div>
                        <div className="col-8"></div>
                    </div>
                </div>
            )
        }
           
    
  


export default Login;
