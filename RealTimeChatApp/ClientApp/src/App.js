import React, { useState } from 'react';
import ChatPage from './components/ChatPage';
import Login from './components/Login';



const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);


   
    if (!isLoggedIn) {
        return (
            <div><Login/></div>
        )
    } else {
        return(
            <div><ChatPage/></div>
        )
    }
   
}



export default App;

