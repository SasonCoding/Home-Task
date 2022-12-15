import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <ul className="navbar-nav mr-auto">
                <li>
                    <Link className="nav-link" to="/">
                        Main
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/users">
                        Users
                    </Link>
                </li>
                <li>
                    <Link className="nav-link" to="/blogs">
                        Blogs
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
