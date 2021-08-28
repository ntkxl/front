import React from 'react'
import logo from '../images/logo.png'
import '../css/Navbar.css'
import { Link }from 'react-router-dom';

export default function Navbar() {

    const navStyle = {
        color: 'white'
    }

    return (
        <nav>
            <img src={logo}/>
            <ul className="nav-links">
                <Link to='/' className="text-link">
                    <li>Home</li>
                </Link>
                <Link className="text-link">
                    <li>Swap</li>
                </Link>
                <Link to='/team' className="text-link">
                    <li>Team</li>
                </Link>
            </ul>
        </nav>
    )
}
