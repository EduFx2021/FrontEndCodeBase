import React, { Component } from 'react';
import Header from './components/layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/layout/HomePage';
import Login from './components/forms/Login';
import SignUp from './components/forms/SignUp';
import Footer from './components/layout/Footer';
import Progress from './components/progress/Progress';

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
                  <Footer/>
                </>
              }
            />
            
            <Route exact path="/signup" render={(props)=>(<SignUp {...props} showModal={this.showModal}/>)}/>
            <Route exact path="/progress" component={Progress}/>
          </Switch>
        </div>
      </Router>
    );
  }
}