import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import ChatPage from './components/ChatPage';
import LoginSignup from './components/LoginSignup';




const App = () => {

    return (
        <div className="app">
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} component={LoginSignup} />
                    <Route exact path={"/Home/general"} component={ChatPage} />
                    <Route exact path={"/Home/sports"} component={ChatPage} />
                    <Route exact path={"/Home/music"} component={ChatPage} />
                </Switch>
            </BrowserRouter>
        </div>
    );

}

export default App;
