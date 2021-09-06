import React, { Component } from 'react';
import firebase from '../firebase';
import { getAuth,RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";

export default class PhoneAuth extends Component {
    constructor(props){
        super(props);
        this.phoneRef= React.createRef();
        this.phoneError= React.createRef();
        this.otpRef= React.createRef();
        this.otpdivRef= React.createRef();
        this.otpError=React.createRef();
        this.verifyBtnRef= React.createRef();
        this.state = {
            phone:'',
            otp:''
        }
    }

    onChangeHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    onSignInSubmit = (e) => {
        console.log("onsign in clicked");
        e.preventDefault();
        this.verifyBtnRef.current.classList.add('d-none');
        this.otpdivRef.current.classList.remove('d-none');

        this.setUpRecaptcha();
        
        const phoneNumber = "+91"+this.state.phone;
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;

        const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                
                window.confirmationResult = confirmationResult;
                console.log('otp sent');

            }).catch((error) => {
                console.log("otp send error");
            });
    }

    setUpRecaptcha = () => {
        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
            console.log("Captcha Resolved")
            this.onSignInSubmit();
        }
        }, auth);
    }

    onSubmitOtp = (e) => {
        e.preventDefault();
        console.log("clicked");
        const code = this.state.otp;
        console.log(code);
        window.confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            console.log("Success")
        }).catch((error) => {
            console.log("Fail");
        });
    }

    render() {
        return (
            <div>
                <form >
                    <div className="mb-1 ms-4 mt-2">
                        <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                        <input 
                            type="text" 
                            className="form-control form__field"
                            id="phoneNumber"
                            value={this.state.phone}
                            onChange={this.onChangeHandler}
                            name="phone"
                            ref={this.phoneRef}
                        />
                        <button 
                            className="btn btn-sm btn-outline-dark mt-1 verifyBtn"
                            onClick={this.onSignInSubmit}
                            ref={this.verifyBtnRef}
                        >
                            verify
                        </button>
                        <div id="recaptcha-container"></div>
                        <div className="invalid-feedback " ref={this.phoneError}>
                
                        </div>
                    </div>
                </form>
                <form >    
                    <div className="mb-1 ms-4 mt-2 d-none " ref={this.otpdivRef}>
                        
                        <input 
                            type="text" 
                            className="form-control form__field"
                            id="otp"
                            value={this.state.otp}
                            onChange={this.onChangeHandler}
                            name="otp"
                            ref={this.otpRef}
                        />
                        <button
                            onClick={this.onSubmitOtp}
                            className="btn btn-sm btn-outline-dark mt-1 verifyBtn"
                            
                        >submit</button>
                        <div className="invalid-feedback " ref={this.otpError}>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
