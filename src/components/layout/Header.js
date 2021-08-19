import React, { Component } from 'react'
import logo from '../../images/logo.png'

export default class Header extends Component {

    showModal = this.props.showModal;
    showSignUpPage= this.props.showSignUp;
    render() {
        return (
           <div>
                <nav className="navbar navbar-dark">
                    <a className="navbar-brand" href="/">
                        <img src={logo} width="40" height="40" className="d-inline-block align-top mx-3 rounded" alt=""/>
                        EcoAction
                    </a>
                    <div className="d-flex flex-row-reversed">
                        <a className="nav-item nav-link " href="#" onClick={this.showModal} data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
                        <a className="nav-item nav-link" href="/signup" onClick={this.showSignUpPage}>Sign up</a>
                    </div>
                    
                </nav>
            </div>
        )
    }
}

