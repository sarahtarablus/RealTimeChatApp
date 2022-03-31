import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ChatPage from './components/ChatPage';
import Login from './components/Login';
import Signup from './components/Signup';



const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    return (
        <div className="app">
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} component={Login} />
                    <Route exact path={"/Signup"} component={Signup} />
                    <Route exact path={"/Home"} component={ChatPage} />
                </Switch>
            </BrowserRouter>
        </div>
    );

}

export default App;

