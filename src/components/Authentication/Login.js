import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate(); // Use useNavigate instead of useHistory in v6
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });

            const json = await response.json();
            console.log(json);
            if (json.success) {
                // Save credentials and redirect 
                localStorage.setItem('token', json.authtoken);
                navigate("/"); // Use navigate to redirect in v6+
                props.showAlert("login successfully","success");
            } else {
                props.showAlert("invalid credentials","danger");
            }

        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='login'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} />
                </div>

                <button type="submit" className="btn btn-primary" id='submit'>Submit</button>
            </form>
        </>
    );
};

export default Login;
