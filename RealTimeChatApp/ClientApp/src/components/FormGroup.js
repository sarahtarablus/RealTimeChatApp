import React from 'react';

const FormGroup = ({ value, onChange, value2, onChange2, onClick, onClick2}) => {

    return (
        <form>
            <div className="form-group  mx-sm-3 mb-2 mt-5">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="usernameInput" placeholder="Enter username" value={value} onChange={onChange}/>
            </div>
            <div className="form-group mx-sm-3 mb-2">
                <label htmlFor="password">Password</label>
                <input type="text" className="form-control" id="passwordInput" placeholder="Password" value={value2} onChange={onChange2}/>
            </div>
            <button type="submit" className="btn mx-sm-3 mb-2 mt-3" onClick={onClick}>Login</button>
            <p className="or mx-sm-3 mb-1 mt-2">Don't have an account?</p>
            <button type="button" className="signup btn mx-sm-1 mb-2 mt-1" onClick={onClick2}>Signup</button>
        </form>
    );

}

export default FormGroup;
