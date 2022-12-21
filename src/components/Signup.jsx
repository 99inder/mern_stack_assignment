import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux';

const Signup = (props) => {
    const host = "http://localhost:5000";   //Hard Coding just for now

    const navigate = useNavigate();     //for the purpose of redirecting to another page

    //to get setUser action-creator to set user state in redux store
    const dispatch = useDispatch();
    const { setUser } = bindActionCreators(actionCreators, dispatch);

    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
    const onChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/create-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        });
        const res = await response.json();

        if (res.success) {
            const { authToken } = res;
            setUser({ authToken });
            localStorage.setItem('authToken', res.authToken);
            navigate("/");
            props.showAlert("Account created Successfully!", "success");
        }
        else {
            props.showAlert("User with this email already exists! Try Logging-in instead!", "danger");
        }
    }

    return (
        <form onSubmit={handleClick}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name='name' value={newUser.name} onChange={onChange} aria-describedby="nameHelp" autoComplete='name' minLength={3} required />
                <div id="nameHelp" className="form-text">We'll never share your personal details with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' value={newUser.email} onChange={onChange} aria-describedby="emailHelp" autoComplete='email' required />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' value={newUser.password} onChange={onChange} autoComplete="new-password" minLength={5} required />
            </div>
            {/* <div className="mb-3">
                <label htmlFor="reEnterPassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="reEnterPassword" autoComplete="new-password" required />
            </div> */}
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>

    )
}

export default Signup