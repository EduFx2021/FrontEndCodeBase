import React, { Component } from 'react';
import Header from './components/layout/Header';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/layout/HomePage';
import Login from './components/forms/Login';
import SignUp from './components/forms/SignUp'
import NormalUserSignUp from './components/forms/normalUserSignUp/NormalUserSignUp';
import NGOSignUp from './components/forms/ngoSignUp/NGOSignUp';

export default class App extends Component{
  state={
    displayModal: false
  }

  showModal=e=>{
    this.setState({
      displayModal:!this.state.displayModal
    });
  }

  

  render(){
    return (
      <Router>
        <div className="App">

          <Login toggleModal={this.state.displayModal} showModal={this.showModal}/>
          {/* {this.state.displaySignUp?<SignUp/>:null} */}
          <Switch>
            <Route exact path='/' render={() =>
                <>
                  <Header showModal={this.showModal} showSignUp={this.showSignUp} />
                  <HomePage />
                </>
              }
            />
            
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/signup/normaluser" component={NormalUserSignUp}/>
            <Route exact path="/signup/ngo" component={NGOSignUp}/>
          </Switch>
        </div>
      </Router>
    );
  }
}