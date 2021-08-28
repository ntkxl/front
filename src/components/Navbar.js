import React from 'react'
import logo from '../images/logo.png'
import '../css/Navbar.css'
import { Link }from 'react-router-dom';

export default function Navbar() {

    return (
        <nav>
            <img src={logo} alt="logo"/>
            <ul className="nav-links">
                <Link to='/' className="text-link">
                    <li>Home</li>
                </Link>
                {/* will add path later */}
                {/* <Link className="text-link"> */}
                    <li>Swap</li>
                {/* </Link> */}
                <Link to='/team' className="text-link">
                    <li>Team</li>
                </Link>
            </ul>
        </nav>
    )
}
