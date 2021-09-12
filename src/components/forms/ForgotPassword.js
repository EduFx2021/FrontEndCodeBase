import React, { Component } from 'react'
import PhoneAuth from '../PhoneAuth/PhoneAuth';

export default class ForgotPassword extends Component {

    constructor(props){
        super(props);
        this.state={
            email:'',
            phone:'',
            newPass:'',
            confirmPass:'',
            isPhoneAuthenticated:false
        };
    }


    // This method is responsible for changing states as per values entered in form fields
    onChangeHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
        if(this.checkboxref.current.checked===true){
            this.signUpButtonRef.current.disabled=false;
        }
        else {
            this.signUpButtonRef.current.disabled=true;
        }
    }

    //This method is to check if the Phone is authenticated
    onPhoneAuthentication = (e) => {
        this.setState({
            isPhoneAuthenticated:true
        });
    }

    // This method fetches phone number from PhoneAuth.js and updates phone state
    onPhoneNumberVerification = (e,ph) => {
        this.setState({
            phone:ph
        });
    }

    render() {
        return (
            <div className="forgotPassword mb-3">
                <h4 className="loginTitle mb-4">Forgot Password</h4>
                 <form>
                    <div className="mb-1 ms-5 mt-2">
                        <label htmlFor="normalUserEmail" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            className="form-control form__field"
                            id="normalUserEmail"
                            value={this.state.email}
                            onChange={this.onChangeHandler}
                            name="email"
                            ref={this.emailRef}
                        />
                        <div className="invalid-feedback " ref={this.emailError}>
                
                        </div>
                    </div>
                </form>
                <div className="ms-4">
                    <PhoneAuth isPhoneAuthenticated={this.onPhoneAuthentication} onPhoneNumberVerification={this.onPhoneNumberVerification}/>
                </div>
            </div>
        )
    }
}
