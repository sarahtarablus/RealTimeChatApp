import React, { useState } from 'react';

const Signup = () => {
 






    return (
            <div className="container login">
                <div className="row">
                    <div className="col-4">
                        <form>
                            <div className="form-control mx-sm-3 mb-2 mt-5">
                                <label for="username">UserName</label>
                                <input type="text" className="form-control" id="passwordInput" placeholder="Enter username"/>
                            </div>
                            <div className="form-control mx-sm-3 mb-2 mt-5">
                                <label for="username">Username</label>
                                <input type="text" className="form-control" id="passwordInput" placeholder="Enter username" />
                            </div>
                            <button type="submit">Signup</button>
                        </form>
                    </div>
                    <div className="col-8"></div>
                </div>

            </div>
       
    );
}

export default Signup;