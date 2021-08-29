import React from 'react'
import Web3 from 'web3'
import { useState, useEffect } from 'react'

export default function ConnectWallet(props) {

    const [isConnect, setIsConnect] = useState(false)

    const loadWeb3 = async () => {
        if(window.ethereum){
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
          loadBlockchainData()
        }
        else if (window.web3){
          window.web3 = new Web3(window.web3.currentProvider)
          loadBlockchainData()
        }
        else {
          window.alert("Non-Ethereum browser detected")
        }
    }
    
    const loadBlockchainData = async () => {
        const web3 = window.web3
        
        // console.log(accounts[0]);
        const accounts = await web3.eth.getAccounts()
        // const ethBalance = await web3.eth.getBalance(accounts[0]) / 10 ** 18
        // console.log(data.accounts);

        props.onChange(accounts[0])
        setIsConnect(true)
    }

    const connectWallet = () => {
        loadWeb3()
    }

    const shortAddress = (address) => {
        return(address.substr(0,4) + "..." + address.substr(-4))
    }
    
    useEffect (() => {
        // loadBlockchainData()
    }, [props.account])

    return (
        <div>    
            { isConnect
                ? <p className="address" disabled={true}>{ shortAddress(props.account) }</p>
                : <button onClick={connectWallet}> connect </button>

            }
        </div>
    )
}
