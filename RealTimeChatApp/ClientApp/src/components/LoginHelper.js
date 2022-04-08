//import React, { useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
//import decode from 'jwt-decode';
//import ChatPage from './ChatPage';
//import Signup from './Signup';
//import '../custom.css';

//const Login = () => {
//    const [username, setUsername] = useState("");
//    const [password, setPassword] = useState("");
//    const [id, setId] = useState(null);
//    const [show, setShow] = useState(false);

//    let history = useHistory();


    //useEffect(() => {
    //    //localStorage.getItem("user") ? history.push("/Home") : console.log("welcome");

    //    getUserIdCount();
    //}, []);




    //const getUserIdCount = async () => {
    //    const url = "https://localhost:5001/api/Users"
    //    try {
    //        const response = await fetch(url)
    //            .then(res => res.json())
    //            .then(res => !res.length ? setId(1) : setId(res[0] + 1))
    //    } catch (err) {
    //        console.log(err);
    //        return err;
    //    }
    //};



    //const loginRequest = async (name, password) => {
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
    //            return response;
    //        }

    //    } catch (err) {
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
    //            const request = loginRequest(username, password);
    //            setUserInLS(request[0].id, request[0].password);
    //        }
    //    } catch (err) {
    //        console.log(err);
    //    }
    //};



    //const setUserInLS = (id, token) => {
    //    localStorage.setItem("user": id, token);
    //};


    //const getUserFromLS = () => {
    //    return localStorage.getItem("user");
    //}




    //const showSignUpWindow = () => {
    //    setShow(true);
    //};



    //const postUser = async (id, name, password) => {
    //    const url = "https://localhost:5001/api/Users";
    //    let nameToLowerCase = name.toLowerCase();
    //    let passwordToLowerCase = password.toLowerCase();
    //    try {
    //        const options = {
    //            method: "POST",
    //            headers: { 'Accept': 'application/json', "Content-type": "application/json" },
    //            body: JSON.stringify({ Id: id, Name: nameToLowerCase, Password: passwordToLowerCase })
    //        };
    //        const response = await fetch(url, options)
    //            .then(res => res.json())
    //    } catch (err) {
    //        console.log(err);
    //        return err;
    //    }
    //};


    //const signUp = () => {
    //    setShow(false);
    //    postUser(id, username, password);
    //};


    //export default LoginHelper;