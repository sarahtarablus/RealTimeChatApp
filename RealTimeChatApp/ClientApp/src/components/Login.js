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
        //localStorage.getItem("user") ? history.push("/Home") : console.log("welcome");

        getUserToken();
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
    };



    const loginRequest = async (name, password) => {
        const url = "https://localhost:5001/api/Login";
        try {
            const options = {
                method: "POST",
                headers: { 'Accept': 'application/json', "Content-type": "application/json" },
                body: JSON.stringify({ Name: name, Password: password })
            };
            const response = await fetch(url, options)
                .then(res => res.json())

            console.log(response);
            if (!response.length) {
                alert("Sorry there is no user with those credentials");
            } else {
                console.log(response);
                //let id = JSON.stringify({ response[0].id });
                //let name = JSON.stringify({ response[0].name });
                //let password = JSON.stringify({ response[0].password });
                localStorage.setItem("user", JSON.stringify({ id: response[0].id, name: response[0].name, token: response[0].password }));
            }

        } catch (err) {
            console.log(err);
            return err;
        }
    };





    const SubmitLoginRequest = async (e) => {
        e.preventDefault();
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


    const isTokenExpired = () => {
        const token = this.getUserFromLS()
    }


    //const setUserInLS = (id, token) => {
    //    localStorage.setItem("user", id, name, token);
    //};


    const getUserToken = () => {
        const user = JSON.parse(localStorage.getItem("user"));

        console.log(user);
        return user.token;
    }

    const getUserId = () => {
        const user = localStorage.getItem("user");
        return user.id;
    }

    const getUserName = () => {
        const user = localStorage.getItem("user");
        return user.name;
    }

    //const checkUser = async (name, password) => {
    //    const url = "https://localhost:5001/api/Login";
    //    try {
    //        const options = {
    //            method: "POST",
    //            headers: { 'Accept': 'application/json', "Content-type": "application/json" },
    //            body: JSON.stringify({ Name: name, Password: password })
    //        };
    //        const response = await fetch(url, options)
    //            .then(res => res.json())

    //        console.log(response);
    //        if (!response.length) {
    //            alert("Sorry there is no user with those credentials");
    //        } else {
    //            console.log(response);
    //            localStorage.setItem("user", JSON.stringify({ id: response[0].id, name: response[0].name, token: response[0].password}));
    //       // history.push("/Home");

    //        }

    //   } catch (err) {
    //        console.log(err);
    //        return err;
    //    }
    //};


    //const SubmitLoginRequest = async (e) => {
    //    e.preventDefault();
    //    try {
    //        if (username === "" || password === "") {
    //            alert("Make sure to fill both username and password");
    //            return false;
    //        } else {
    //            checkUser(username, password);
    //        }
    //    } catch (err) {
    //        console.log(err);
    //    }
    //};

    


    const showSignUpWindow = () => {
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
        setShow(false);
        postUser(id, username, password);
   
    };








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
