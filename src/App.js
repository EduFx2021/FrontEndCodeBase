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
    displayModal: false,
    displaySignUp:false
  }

  showModal=e=>{
    this.setState({
      displayModal:!this.state.displayModal
    });
  }

  showSignUp=e=>{
    this.setState({
      displaySignUp:!this.state.displaySignUp
    });
  }

  render(){
    return (
      <Router>
        <div className="App">
        {this.state.displaySignUp?null:<Header showModal={this.showModal} showSignUp={this.showSignUp}/>}
          <Login toggleModal={this.state.displayModal} showModal={this.showModal}/>
          {/* {this.state.displaySignUp?<SignUp/>:null} */}
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/signup" render={(props)=>(<SignUp {...props} hideNav={this.showSignUp}/>)}/>
            <Route exact path="/signup/normaluser" render={(props)=>(<NormalUserSignUp {...props} hideNav={this.showSignUp}/>)}/>
            <Route exact path="/signup/ngo" render={(props)=>(<NGOSignUp {...props} hideNav={this.showSignUp}/>)}/>
          </Switch>
        </div>
      </Router>
    );
  }
}