import React, { Component } from 'react';
import normalSignUp from '../../images/normalUser.svg';
import ngoSignUp from '../../images/NgoGroup.svg'

export default class SignUp extends Component {

    componentDidMount(){
        this.props.hideNav();
    }

    render() {
        return (
            <div className="signup" style={{height:"100vh"}}>
                <div className="container p-4">
                    <h2 className="text-center " style={{color:"white"}}>Eco-Action Create an Account</h2>
                    <h4 className="text-center mt-4" style={{color:"white"}}>Choose which type of User You are:</h4>
                    <div className="row">
                        <div className="col-5">
                            <div className="card mt-5 float-end" style={{width: "18rem", height:"22rem"}}>
                                <img src={normalSignUp} className="card-img-top" alt="..."/>
                                    <div class="card-body">
                                        <h5 className="card-title">Normal User</h5>
                                        <p className="card-text">If You are a normal user then please click on this to Sign up to Eco Action and Keep track of your registered Problem</p>
                                        
                                    </div>
                            </div>
                        </div>
                        <div className="text-center col-2 mt-5" style={{color:'white'}}>
                            <h2 className="mt-5">OR</h2>
                        </div>
                        <div className="col-5">
                            <div className="card mt-5" style={{width: "18rem", height:"22rem"}}>
                                <img src={ngoSignUp} className="card-img-top" alt="..."/>
                                    <div class="card-body">
                                        <h5 className="card-title">NGO</h5>
                                        <p className="card-text">NGO's can click here to register to Sign up to Eco-Action </p>
                                        
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
