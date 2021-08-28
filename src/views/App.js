import '../css/App.css';
import Navbar from '../components/Navbar';
import Home from '../views/Home';
import Team from '../views/Team';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Web3 from 'web3'

function App() {

  const loadWeb3 = async () => {
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert("Non-Ethereum browser detected")
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3
    
    // console.log(accounts[0]);
    const accounts = await web3.eth.getAccounts()
    const ethBalance = await web3.eth.getBalance(accounts[0]) / 10 ** 18
    
    // console.log(data.accounts);

    setData({ accounts: accounts[0], ethBalance })
    
  }
  
  const [data, setData] = useState({
    accounts: '',
    balance: 0
  });

  useEffect(() => {
    loadWeb3()
    // console.log(window.web3);
    loadBlockchainData()
    
  }, [])

  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Home}/>
          {/* <Route path="/swap" component={Swap} /> */}
          <Route path="/team" component={Team} />
        </Switch>
        <h3 style={{color: "white"}}>address: { data.accounts }</h3>
        <h3 style={{color: "white"}}>balance: { data.ethBalance } ETH</h3>
         
      </div>
    </Router>
  );
}


export default App;
