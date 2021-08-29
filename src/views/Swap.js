import React from 'react'
import '../css/Swap.css'
import TokenSwap from '../contracts/TokenSwap.json'
import WaffToken from '../contracts/WaffToken.json'
import { useState, useEffect } from 'react'
import BuyForm from '../components/BuyForm'

export default function Swap(props) {

    const [waff, setWaff] = useState({})
    const [waffBalance, setWaffBalance] = useState('0')
    const [ethBalance, setEthBalance] = useState('0')
    const [swapToken, setSwapToken] = useState({})
    const [account, setAccount] = useState(props.account)
    const [isBuy, setIsBuy] = useState(true)
    

    const Web3 = require('web3');
    const web3 = new Web3(Web3.givenProvider);

    const checkLogin = async () => {
        if(window.ethereum)
            await web3.eth.getAccounts().then(e => setAccount(e[0]))
        else
            window.alert('Please connect metamask')
    }

    const loadData = async () => {
        
        if(account) {
            let ethBalance = await web3.eth.getBalance(account) / 10 ** 18
            setEthBalance(ethBalance);

            const networkId = await web3.eth.net.getId()
            const tokenData = WaffToken.networks[networkId]

            if(tokenData){
                const waff = new web3.eth.Contract(WaffToken.abi, tokenData.address)
                setWaff(waff)
                
                let waffBalance = await waff.methods.balanceOf(account).call() / 10 ** 18
                setWaffBalance(waffBalance)
                console.log(waffBalance.toString());
            }else {
                window.alert('Token contract not deployed')
            }

            const swapData = TokenSwap.networks[networkId]
            if(swapData){
                const swapToken = new web3.eth.Contract(TokenSwap.abi, swapData.address)
                setSwapToken(swapToken)
                 
            }else {
                window.alert('Swap contract not deployed')
            }
            
            
        }
        // console.log(waff);
        // console.log(swapToken);
        // console.log(ethBalance);
        // console.log(waffBalance);
        
        // console.log(tokenData);
    } 
    const buyWaff = (ethAmount) => {
        swapToken.methods.buyWaffle(100).send({ from: account, value: ethAmount }).on('transactionHash', (hash) => {
            window.location.reload()
        })
        window.alert('swap success')
    }

    const handleConvert = () => {
        setIsBuy(!isBuy)
    }

    
    useEffect(() => {
        checkLogin()
        loadData()
    }, [account])

    return (
        <div>
            {!account ? 
            <div>
                <h3>Ahh</h3>
                <p>You are not connected</p>
            </div> 
            : 
            <div>
                {isBuy ? 
                    <BuyForm 
                        ethBalance={ethBalance} 
                        waffBalance={waffBalance}
                        buyWaff={buyWaff}
                    />
                    :
                    <h3>Mocksellform</h3>}
                <button onClick={handleConvert}>convert</button>
                
            </div>
            }
        </div>
    )
}
