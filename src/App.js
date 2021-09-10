import React, { Component } from 'react';
import Header from './components/layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch,Redirect} from 'react-router-dom';
import HomePage from './components/layout/HomePage';
import Login from './components/forms/Login';
import SignUp from './components/forms/SignUp';
import Footer from './components/layout/Footer';
import { getAuth,getRedirectResult, signInWithPopup,GoogleAuthProvider } from "firebase/auth";
// import Progress from './components/progress/Progress';
import './css/App.css'
import ProblemSearch from './components/ProblemSearch/ProblemSearch';

export default class App extends Component{
  
  constructor() {
    super();
    this.state={
      displayModal: false,
      user:''
    }
  }

  showModal=e=>{
    this.setState({
      displayModal:!this.state.displayModal
    });
  }

  updateState(userDetail){
    this.setState({
      user:userDetail
    });
  }

  componentDidMount=()=>{ 
    const auth = getAuth();
    const storeThis= this;    // 'this' keyword is stored in a variable called storeThis so that we can use "this" keyword inside the onAuthStateChange Fucntion
    auth.onAuthStateChanged(function (userDetail) {
      if(userDetail){
        console.log('user logged in already');
        storeThis.updateState(userDetail);
      }
      else {
        console.log('user not logged in already');
        return null
      }
    });

  }

  render(){
    return (
      <Router>
        <div className="App">
          {this.state.user?<Redirect to="/private"/>:<Redirect to="/"/>}
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
            <Route exact path="/private" component={ProblemSearch}></Route>
          
            {/* <Route exact path="/progress" component={Progress}/> */}
            <Route exact path="/private" component={ProblemSearch}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}