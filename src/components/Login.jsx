import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux';

const Login = (props) => {
    const host = "http://localhost:5000";   //Hard Coding just for now
    const navigate = useNavigate();     //for the purpose of redirecting to another page

    //to get setUser action-creator to set user state in redux store
    const dispatch = useDispatch();
    const { setUser } = bindActionCreators(actionCreators, dispatch);

    const [credentials, setcredentials] = useState({ email: "", password: "" });

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });
        const res = await response.json();

        if (res.success) {
            const { authToken } = res;
            setUser({ authToken });
            localStorage.setItem('authToken', res.authToken);
            navigate("/");
            props.showAlert("Logged In Successfully!", "success");
        }
        else {
            props.showAlert("Invalid Credentials!", "danger");
        }
    }

    return (
        <form onSubmit={handleClick}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" name="email" value={credentials.email} onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp" autoComplete='email' />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name="password" value={credentials.password} onChange={onChange} className="form-control" id="password" autoComplete='off' />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    )
}

export default Login