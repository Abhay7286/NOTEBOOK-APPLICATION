import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword:"" });
    const navigate = useNavigate(); // Use useNavigate instead of useHistory in v6+

    const handleSubmit = async (e) => {
      const {name,email,password} = credentials;
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name,email,password}),
            });

            const json = await response.json();
            console.log(json);
            if (json.success) {
                // Save credentials and redirect 
                localStorage.setItem('token', json.authtoken);
                navigate("/"); // Use navigate to redirect in v6+
                props.showAlert("Account created successfully","success");
            } else {
                props.showAlert("unsuccess","danger");
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
     <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} value={credentials.name} />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} minLength={8} required/>
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} value={credentials.cpassword} minLength={8} required/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </>
  )
}

export default Signup
