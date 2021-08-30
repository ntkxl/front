import React from 'react'
import '../css/Swap.css'
import TokenSwap from '../contracts/TokenSwap.json'
import WaffToken from '../contracts/WaffToken.json'
import { useState, useEffect } from 'react'
import BuyForm from '../components/BuyForm'
import SellForm from '../components/SellForm'

export default function Swap(props) {

    const [waff, setWaff] = useState({})
    const [waffBalance, setWaffBalance] = useState('0')
    const [ethBalance, setEthBalance] = useState('0')
    const [swapToken, setSwapToken] = useState({})
    const [account, setAccount] = useState(props.account)
    const [swapState, setSwapState] = useState(true)
    

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
                // console.log(waffBalance.toString());
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
        // console.log(swapToken._address);
    } 
    const buyWaff = async (ethAmount) => {
        await swapToken.methods.buyWaffle(100).send({ from: account, value: ethAmount })
        window.location.reload()
        window.alert('swap success')
        
    }

    const sellWaff = async (waffAmount) => {
        await waff.methods.approve(swapToken._address, waffAmount).send({ from: account })
        await swapToken.methods.sellWaffle(100, waffAmount).send({ from: account, value: waffBalance})
        window.location.reload()
        window.alert('swap success')
    }

    const handleChangeState = (state) => {
        setSwapState(state)
        
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
                {swapState ? 
                    <BuyForm 
                        ethBalance={ethBalance} 
                        waffBalance={waffBalance}
                        buyWaff={buyWaff}
                        handleChangeState = {handleChangeState}
                    />
                    :
                    <SellForm
                        ethBalance={ethBalance} 
                        waffBalance={waffBalance}
                        sellWaff={sellWaff}
                        handleChangeState = {handleChangeState}
                    />
                }
                {/* <button onClick={handleChangeState}>convert</button> */}
                
                
            </div>
            }
            
        </div>
    )
}
