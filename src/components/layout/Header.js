import React, { Component } from 'react';
import logo from '../../images/logo.png';
import '../../css/header.css';

export default class Header extends Component {

    showModal = this.props.showModal;
    showSignUpPage= this.props.showSignUp;
    render() {
        return (
           <div>
                <header>
                    <img src={logo}/>
                    <div className="header-title">
                        <b>Eco Action</b>
                        <div className="header-right">
                            <a className="active " href="#" onClick={this.showModal} data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
                            <a className="active ms-3" href="/signup" onClick={this.showSignUpPage}>Sign Up</a>
                        </div>
                        <p>
                            SDG 4.7 - Quality Education
                        </p>
                    </div>

                </header>
                
            </div>
        )
    }
}

