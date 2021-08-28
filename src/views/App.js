import '../css/App.css';
import Navbar from '../components/Navbar';
import Home from '../views/Home';
import Team from '../views/Team';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Home}/>
          {/* <Route path="/swap" component={Swap} /> */}
          <Route path="/team" component={Team} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;
