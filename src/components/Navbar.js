import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        console.log(location.pathname);
    }, [location]);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <>
            <nav className={`navbar navbar-expand-lg ${darkMode ? "bg-dark navbar-dark" : "bg-body-tertiary navbar-light"}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <Link to="/login" className="btn btn-primary mx-2" role="button">
                                Login
                            </Link>
                            <Link to="/signup" className="btn btn-primary mx-2" role="button">
                                Sign Up
                            </Link>
                        </form>

                        <button className="btn btn-secondary ms-3" onClick={toggleTheme}>
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
