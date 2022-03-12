import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ChatPage from './ChatPage';
import Signup from './Signup';

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [logins, setLogins] = useState([{ User: "Jon", Password: "1234" }, { User: "Sarah", Password: "3425"}]);
    const [isRegistered, setIsRegistered] = useState();



    //const history = useHistory();
    
    //const Login = () => {
    //    let user = {};
    //    if (username != null || username != "" && password != null || password != "") {
    //        user = { User: username, Password: password }
    //        logins.some(loginUser =>
    //            if (loginUser.User === user.User && loginUser.Password === user.Password) {
    //            setIsRegistered(true);
    //            }
    //         )
    //        //setLogins([...logins, user]);
    //        console.log(logins);
    //    }
    //}

    //const handleSubmit = async (e) => {
    //    e.preventDefault();

    //    try {
    //        await Auth.signIn(username, password);
    //        userHasAuthenticated(true);
    //        history.push("/ChatPage");

    //    } catch (err) {
    //        alert(err.message);
    //    }
    //}




   return (
          <div className="container login">
                    <div className="row">
                        <div className="col-4">
                            <form>
                                <div className="form-group  mx-sm-3 mb-2 mt-5">
                           <label for="username">Username</label>
                           <input type="text" className="form-control" id="usernameInput" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="form-group mx-sm-3 mb-2">
                           <label for="password">Password</label>
                           <input type="text" className="form-control" id="passwordInput" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                       </div>
                       <button type="submit" className="btn btn-primary mx-sm-3 mb-2 mt-3" >Login</button>
                                <p className="or mx-sm-3 mb-1 mt-2">Don't have an account?</p>
                                <button type="submit" className="signup btn mx-sm-1 mb-2 mt-1 text-primary">Signup</button>
                            </form>
                        </div>
                        <div className="col-8"></div>
                    </div>
                </div>
            )
        }
           
    
  


export default Login;
