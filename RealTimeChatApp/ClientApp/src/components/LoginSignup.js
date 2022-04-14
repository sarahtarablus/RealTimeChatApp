import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChatPage from './ChatPage';
import Signup from './Signup';
import '../custom.css';

const LoginSignup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [inputValue, setInputValue] = useState();
    const [id, setId] = useState(null);
    const [show, setShow] = useState(false);
    

    let history = useHistory();

    useEffect(() => {
        let user = getUser();
        user ? history.push('/Home') : history.push('/');      
    }, []);

 

    const getUserIdCount = async () => {
        const url = "https://localhost:5001/api/Users"
        try {
            const response = await fetch(url)
                .then(res => res.json())
                .then(res => res.length ? setId(res[0] + 1) : setId(1))
        } catch (err) {
            console.log(err);
            return err;
        }
    };



    const loginRequest = async (name, password) => {
        const url = "https://localhost:5001/api/Login";
        try {
            const options = {
                method: "POST",
                headers: { 'Accept': 'application/json', "Content-type": "application/json" },
                body: JSON.stringify({ Name: name.toLowerCase(), Password: password.toLowerCase() })
            };
            const response = await fetch(url, options)
                .then(res => res.json())

            if (!response.length) {
                alert("Sorry there is no user with those credentials");
            } else {
                setUserInLS(response[0].id, response[0].name, response[0].password);
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    };



    const SubmitLoginRequest = async (e) => {
        e.preventDefault();
        setInputValue("");
        try {
            if (username === "" || password === "") {
                alert("Make sure to fill both username and password");
                return false;
            } else {
                loginRequest(username, password);
            }
        } catch (err) {
            console.log(err);
        }
    };



    const setUserInLS = (id, name, token) => {
        localStorage.setItem("user", JSON.stringify({ id: id, name: name, token: token }));
        history.replace('/Home');
    };



    const setTokenInAuthorizationHeader = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.token) {
            return { Authorization: 'Bearer' + user.token };
        } else return {};
    }



    const getUser = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        return user;
    }



    const showSignUpWindow = () => {
        getUserIdCount();
        setShow(true);
    };



    const postUser = async (id, name, password) => {
        const url = "https://localhost:5001/api/Users";
        let nameToLowerCase = name.toLowerCase();
        let passwordToLowerCase = password.toLowerCase();
        try {
            const options = {
                method: "POST",
                headers: { 'Accept': 'application/json', "Content-type": "application/json" },
                body: JSON.stringify({ Id: id, Name: nameToLowerCase, Password: passwordToLowerCase })
            };
            const response = await fetch(url, options)
                .then(res => res.json())
        } catch (err) {
            console.log(err);
            return err;
        }
    };



    const signUp = () => {
        setInputValue("");
        try {
            if (username === "" || password === "") {
                alert("Make sure to fill both username and password");
                return false;
            } else {
                setShow(false);
                postUser(id, username, password);
            }
        } catch (err) {
            console.log(err);
            return err;
        }
             
    };








   return (
          <div className="container login">
                    <div className="row">
                        <div className="col-4">
                            <form>
                                <div className="form-group  mx-sm-3 mb-2 mt-5">
                           <label htmlFor="username">Username</label>
                           <input type="text" className="form-control" id="usernameInput" placeholder="Enter username" value={inputValue} onChange={(e) => {
                               setUsername(e.target.value)
                           }}/>
                                </div>
                                <div className="form-group mx-sm-3 mb-2">
                           <label htmlFor="password">Password</label>
                           <input type="text" className="form-control" id="passwordInput" placeholder="Password" value={inputValue} onChange={(e) => {
                               setPassword(e.target.value)
                           }} /> 
                           </div>
                            <button type="submit" className="btn mx-sm-3 mb-2 mt-3" onClick={SubmitLoginRequest}>Login</button>
                                <p className="or mx-sm-3 mb-1 mt-2">Don't have an account?</p>
                            <button type="button" className="signup btn mx-sm-1 mb-2 mt-1" onClick={showSignUpWindow}>Signup</button>
                   </form>
                   <Signup show={show} signup={signUp} value={inputValue} handleUsername={(e) => { setUsername(e.target.value) }} handlePassword={(e) => {
                       setPassword(e.target.value)
                   }}>
                   </Signup>
                        </div>
                        <div className="col-8"></div>
                    </div>
                </div>
            )
        }
           
    
  


export default LoginSignup;
