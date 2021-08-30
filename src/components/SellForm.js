import React from 'react'
import '../css/SwapForm.css'
import logoEth from '../images/token/eth.png'
import logoWaff from '../images/token/waff.png'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown} from '@fortawesome/free-solid-svg-icons'

export default function BuyForm(props) {

    const [waffAmount, setWaffAmount] = useState(0)
    const [rate, setRate] = useState(100)

    const formatBalance = (balance) => {
        return parseFloat(balance).toFixed(2)
    }
    const toWei = (amount) => {
        return (amount * 10 ** 18).toString()
    }

    const checkValidValue = (value) => {
        if(!value){
            window.alert('Please enter amount of WAFF')
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(checkValidValue(waffAmount))
            props.sellWaff(toWei(waffAmount))
        console.log("selling waff");
        console.log(waffAmount);
    }

    return (
        <div>
            <h3>This is Sell Waff</h3>
            <div className="main-container" 
                // e.preventDefault()
                // if(checkValidValue(waffAmount))
                //     props.sellWaff(toWei(waffAmount))
                // console.log("selling waff");
                // console.log(waffAmount);
                >
                <h2>Swap</h2>
                <div className="text-detail">
                    <p>From</p>
                    <p>Balance: {formatBalance(props.waffBalance)}</p>
                </div>
                <div className="input-wrap">
                    <input type="number" placeholder="0.0" 
                    onChange={e => setWaffAmount(e.target.value)}>
                    </input>
                    <div className="token">
                        <img src={logoWaff} className="logo-img" alt="waff-logo"/>
                        <p>WAFF</p>
                    </div>
                </div>
                <div className="arrow-wrap" onClick={() => props.handleChangeState(true)}>
                    <FontAwesomeIcon icon={faArrowDown} className="arrow-icon" />
                </div>
                <div className="text-detail">
                    <p>To</p>
                    <p>Balance: {formatBalance(props.ethBalance)}</p>
                </div>
                <div className="input-wrap">
                    <input type="number" value={waffAmount / rate} placeholder="0.0" disabled="true"></input>
                    <div className="token">
                        <img src={logoEth} className="logo-img" alt="eth-logo"/>
                        <p>ETH</p>
                    </div>
                </div>
                <button className="swap-btn" onClick={handleSubmit} >SWAP</button>
            </div>
        </div>
    )
}
