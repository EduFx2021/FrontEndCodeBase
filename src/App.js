import React, { Component } from 'react';
import Header from './components/layout/Header';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/layout/HomePage';
import Login from './components/forms/Login';


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
          <Header showModal={this.showModal}/>
          <Login toggleModal={this.state.displayModal} showModal={this.showModal}/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
          </Switch>
        </div>
      </Router>
    );
  }
}