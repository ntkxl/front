import '../css/App.css';
import Navbar from '../components/Navbar';
import Home from '../views/Home';
import Team from '../views/Team';
import Swap from '../views/Swap';
import Stake from '../views/Stake';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';


function App() {
  
  const [account, setAccount] = useState('');

  const handleChangeAccount = (newAccount) => {
    setAccount(newAccount)
  }

  useEffect(() => {
    // console.log(account);
  }, [account])

  return (
    <Router>
      <div className="App">
        <Navbar account={account} onChange={handleChangeAccount}/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route 
            path="/swap" 
            render={() => (
              <Swap account={account}/>
            )} />
          <Route path="/stake"  render={() => (
              <Stake account={account}/>
            )} />
          <Route path="/team" component={Team} />
        </Switch>

        {/* <h3 style={{color: "white"}}>address: { account }</h3>
        <h3 style={{color: "white"}}>balance: { 0 } ETH</h3> */}
         
      </div>
    </Router>
  );
}


export default App;
