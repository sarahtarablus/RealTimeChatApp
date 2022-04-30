import React from 'react';

const InputGroup = ({ onChange, onClick, value }) => {

    return (
        <div className="input-group">
            <input type="text" className="form-control" placeholder="Text here" onChange={onChange} value={value}/>
            <div className="input-group-append">
                <button className="btn" type="button" onClick={onClick}>Send</button>
            </div>
        </div>
     );
}


export default InputGroup;
