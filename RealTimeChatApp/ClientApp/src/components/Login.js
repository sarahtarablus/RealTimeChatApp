import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChatPage from './ChatPage';
import Signup from './Signup';
import '../custom.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState(null);
    const [show, setShow] = useState(false);

    let history = useHistory();


    useEffect(() => {
        localStorage.getItem("user") ? history.push("/Home") : console.log("welcome");
        getUserIdCount();
        console.log(id);
    }, []);




    const getUserIdCount = async () => {
        const url = "https://localhost:5001/api/Users"
        try {
            const response = await fetch(url)
                .then(res => res.json())
                .then(res => !res.length ? setId(1) : setId(res[0] + 1))
        } catch (err) {
            console.log(err);
            return err;
        }
    }



    const checkUser = async (name, password) => {
        const url = "https://localhost:5001/api/Login";
        try {
            const options = {
                method: "POST",
                headers: { 'Accept': 'application/json', "Content-type": "application/json" },
                body: JSON.stringify({ Name: name, Password: password })
            };
            const response = await fetch(url, options)
                .then(res => res.json())
            response.length ? localStorage.setItem("user", JSON.stringify({id: response[0].id, name: response[0].name })) : console.log('empty');
            history.push("/Home");
        } catch (err) {
            console.log(err);
            return err;
        }
    }


    const SubmitLoginRequest = async (e) => {
        e.preventDefault();
        try {
            if (username === "" || password === "") {
                alert("Make sure to fill both username and password");
                return false;
            } else {
                checkUser(username, password);
            }
        } catch (err) {
            console.log(err);
        }
    }

    


    const showSignUpWindow = () => {
        setShow(true);
    }



    const postUser = async (id, name, password) => {
        const url = "https://localhost:5001/api/Users";
        try {
            const options = {
                method: "POST",
                headers: { 'Accept': 'application/json', "Content-type": "application/json" },
                body: JSON.stringify({ Id: id, Name: name, Password: password })
            };
            const response = await fetch(url, options)
                .then(res => res.json())
        } catch (err) {
            console.log(err);
            return err;
        }
    }


    const signUp = () => {
        setShow(false);
        postUser(id, username, password);
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
                       <button type="button" className="signup btn mx-sm-1 mb-2 mt-1 text-primary" onClick={showSignUpWindow}>Signup</button>
                       <Signup show={show} signup={signUp} handleUsername={(e) => { setUsername(e.target.value) }} handlePassword={(e) => {
                           setPassword(e.target.value)
                       }}>
                       </Signup>
                            </form>
                        </div>
                        <div className="col-8"></div>
                    </div>
                </div>
            )
        }
           
    
  


export default Login;
