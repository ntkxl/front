import React from 'react'
import logo from '../images/logo.png'
import '../css/Navbar.css'
import { Link }from 'react-router-dom';
import ConnectWallet from './ConnectWallet';

export default function Navbar(props) {

    const handleChangeAccount = (newAccount) => {
        props.onChange(newAccount);
    }
    // handleChangeAccount()
    return (
        <nav>
            <img src={logo} alt="logo"/>
            
            <ul className="nav-links">
                <Link to='/' className="text-link">
                    <li>Home</li>
                </Link>
                <Link to='/swap' className="text-link">
                    <li>Swap</li>
                </Link>
                <Link to='/team' className="text-link">
                    <li>Team</li>
                </Link>
                {/* {props.account} */}
                <ConnectWallet account={props.account} onChange={handleChangeAccount}/>
            </ul>
                
        </nav>
    )
}
