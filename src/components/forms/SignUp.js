import React, { Component } from 'react';
import normalSignUp from '../../images/normalUser.svg';
import ngoSignUp from '../../images/NgoGroup.svg';
import { Link , animateScroll as scroll } from "react-scroll";
import NormalUserSignUp from './normalUserSignUp/NormalUserSignUp'
import NGOSignUp from './ngoSignUp/NGOSignUp';

export default class SignUp extends Component {

    loginHandler=e=>{
        this.props.showModal();
    }

    render() {
        return (
            <div className="signup" style={{height:"100vh",backgroundColor:"white"}}>
                <div className="container p-4">
                    <h2 className="text-center display-3 headerSignup" style={{color:"black", display:"inline"}}>
                        <a href="/" style={{color:"#00adef", textDecoration:"none", fontWeight:"450"}}>Eco-Action</a> Create an Account
                    </h2>
                    <Link to="/" type="button" className="btn btn-outline-dark float-end mt-4" onClick={this.loginHandler}>Login</Link>
                    <h4 className="text-center mt-4 display-6" style={{color:"black"}}>Choose which type of User You are:</h4>
                    <div className="row">
                        <div className="col-5">
                            <Link 
                                to="normalSignUp" 
                                style={{color:"black"}}
                                spy={true}
                                smooth={true}
                                offset={-10}
                                duration={500}
                            >
                                <div className="card mt-5 float-end" style={{width: "18rem", height:"22rem"}}>
                                    <img src={normalSignUp} className="card-img-top" alt="..."/>
                                        <div class="card-body">
                                            <h5 className="card-title">Individual User</h5>
                                            <p className="card-text">If You are a Regular user then please click on this to Sign up to Eco Action and Keep track of your registered Problem</p>
                                            
                                        </div>
                                </div>
                            </Link>
                        </div>
                        <div className="text-center col-2 mt-5" style={{color:'black'}}>
                            <h2 style={{marginTop:"130px"}}>OR</h2>
                        </div>
                        <div className="col-5">
                            <Link to="ngoSignUp" style={{color:"black"}}>
                                <div className="card mt-5" style={{width: "18rem", height:"22rem"}} onClick={this.onNgoCardClickHandler}>
                                    <img src={ngoSignUp} className="card-img-top" alt="..."/>
                                        <div class="card-body">
                                            <h5 className="card-title mt-3">NGO [Non-Governmental Organization]</h5>
                                            <p className="card-text">NGO's can click here to register to Sign up to Eco-Action </p>
                                            
                                        </div>
                                </div>
                            </Link>    
                        </div>
                    </div>
                </div>
                <div style={{height:"100px"}}></div>
                <NormalUserSignUp/>
                <NGOSignUp/>
            </div>
        )
    }
}
