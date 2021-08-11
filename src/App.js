import Header from './components/layout/Header';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Test from './Test';
import HomePage from './components/layout/HomePage';


function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
