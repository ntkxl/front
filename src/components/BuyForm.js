import React from 'react'
import '../css/BuyForm.css'
import logoEth from '../images/token/eth.png'
import logoWaff from '../images/token/waff.png'
import { useState } from 'react'

export default function BuyForm(props) {

    const [ethAmount, setEthAmount] = useState(0)
    const [rate, setRate] = useState(100)

    const formatBalance = (balance) => {
        return parseFloat(balance).toFixed(2)
    }
    const toWei = (amount) => {
        return amount * 10 ** 18
    }

    const checkValidValue = (value) => {
        if(!value){
            window.alert('Please enter amount of ETH')
            return false
        }
        return true
    }

    return (
        <div>
            <h3>This is Buy Waff</h3>
            <form className="main-container" onSubmit={(e) => {
                e.preventDefault()
                if(checkValidValue(ethAmount))
                    props.buyWaff(toWei(ethAmount))
                console.log("buying waff");
                console.log(ethAmount);
                }}>
                <h2>Swap</h2>
                <div className="text-detail">
                    <p>From</p>
                    <p>Balance: {formatBalance(props.ethBalance)}</p>
                </div>
                <div className="wrap-input">
                    <input type="number" placeholder="0.0" 
                    onChange={e => setEthAmount(e.target.value)}>
                    </input>
                    <div className="token">
                        <img src={logoEth} className="logo-img" alt="eth-logo"/>
                        <p>ETH</p>
                    </div>
                </div>
                <div className="text-detail">
                    <p>To</p>
                    <p>Balance: {formatBalance(props.waffBalance)}</p>
                </div>
                <div className="wrap-input">
                    <input type="number" value={ethAmount * rate} placeholder="0.0" disabled="true"></input>
                    <div className="token">
                        <img src={logoWaff} className="logo-img" alt="waff-logo"/>
                        <p>WAFF</p>
                    </div>
                </div>
                <button className="swap-btn" >SWAP</button>
            </form>
        </div>
    )
}
