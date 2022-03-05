import React, { useState } from 'react';
//import { Route } from 'react-router';
//import { Layout } from './components/Layout';
//import { Home } from './components/Home';
//import { FetchData } from './components/FetchData';
//import { Counter } from './components/Counter';
import ChatPage from './components/ChatPage';
import Home from './components/Login';



const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


   
    if (!isLoggedIn) {
        return (
            <div><Home/></div>
        )
    } else {
        return(
            <div><ChatPage/></div>
        )
    }
   
}



export default App;

