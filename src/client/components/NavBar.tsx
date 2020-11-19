import React from 'react';
import { Link } from "react-router-dom";

const Navbar: React.FC<INavbarProps> = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
            <div className="container">
                <Link to="/" className="navbar-brand">3LOGGER</Link>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/blogs/add">New 3log</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

interface INavbarProps { }

export default Navbar