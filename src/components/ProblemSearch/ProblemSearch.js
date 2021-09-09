import React, { Component } from 'react';
import { getAuth } from "firebase/auth";
import { Redirect } from 'react-router';
export default class ProblemSearch extends Component {
    state={
        isSignOut:false
    }

    onSignOutHandler = async function(){
        const auth = getAuth();
        await auth.signOut();
        this.setState({
            isSignOut:true
        });
    }
    
    render() {
        return (
            <div>
            {
                this.state.isSignOut?<Redirect to='/' />
                :
                <div className="container text-center">
                    <h1 className="display-3"> User's Private Page</h1>
                    <h1 className="display-5">Page Under Construction</h1>
                    <button className="btn btn-success" onClick={this.onSignOutHandler.bind(this)}>Sign Out</button>
                </div>
            }
            </div>
        )
    }
}

