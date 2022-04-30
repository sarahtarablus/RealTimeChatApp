import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ChatPage from './ChatPage';
import Signup from './Signup';
import FormGroup from './FormGroup';
import '../custom.css';

const LoginSignup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState(null);
    const [show, setShow] = useState(false);
    

    let history = useHistory();

    useEffect(() => {
        let user = getUser();
        user ? history.push('/Home/general') : history.push('/');      
    }, []);



    const getUserIdCount = async () => {
        const url = "https://localhost:5001/api/Users";
        try {
            const response = await fetch(url)
                .then(res => res.json())
                .then(res => res.length ? setId(res[0] + 1) : setId(1))
        } catch (err) {
            console.log(err);
            return err;
        }
    };



    const postMethod = async (newUrl, body) => {
        const url = newUrl;
        const options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(body)
        };
        const response = await fetch(url, options)
            .then(res => res.json())
        return response;
    }



    const SubmitLoginRequest = async (e) => {
        e.preventDefault();
        try {
            if (username === "" || password === "") {
                alert("Make sure to fill both username and password");
                return false;
            } else {
                const url = "https://localhost:5001/api/Login/PostUser";
                const response = await postMethod(url, { Name: username.toLowerCase(), Password: password.toLowerCase() })
                if (!response.length) {
                    alert("Sorry there is no user with those credentials");
                } else {
                    setUserInLS(response[0].id, response[0].name, response[0].password);
                }
                setUsername("");
                setPassword("");
            }
        } catch (err) {
            return err;
        }
    };



    const setUserInLS = (id, name, token) => {
        localStorage.setItem("user", JSON.stringify({ id: id, name: name, token: token }));
        history.replace('/Home/general');
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



    const signUp = () => {
        try {
            if (username === "" || password === "") {
                alert("Make sure to fill both username and password");
                return false;
            } else {
                setShow(false);
                const url = "https://localhost:5001/api/Users";
                postMethod(url, { Id: id, Name: username.toLowerCase(), Password: password.toLowerCase() })
                setUsername("");
                setPassword("");
            }
        } catch (err) {
            return err;
        }            
    };








    return (
        <div className="container login">
            <div className="row">
                <div className="col-4">
                    <FormGroup value={username} onChange={(e) => setUsername(e.target.value)} value2={password} onChange2={(e) => setPassword(e.target.value)} onClick={SubmitLoginRequest} onClick2={showSignUpWindow}></FormGroup>
                    <Signup show={show} signup={signUp} value1={username} value2={password} handleUsername={(e) => setUsername(e.target.value)} handlePassword={(e) => setPassword(e.target.value)} onClick={() => setShow(false)}></Signup>
                </div>
                <div className="col-8"></div>
            </div>
        </div>
    );
}
           
    
  


export default LoginSignup;
