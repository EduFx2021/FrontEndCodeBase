import React, { Component } from 'react';
import firebase from '../firebase';
import { getAuth,RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";
import '../../css/otpInput.css'

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
        e.preventDefault();
        if(this.state.phone==='' || this.state.phone.length<10 ){
            this.phoneRef.current.classList.add("is-invalid");
        }
        
        else {

            if(this.phoneRef.current.classList.contains('is-invalid')){
                this.phoneRef.current.classList.remove("is-invalid");
            }
            this.verifyBtnRef.current.classList.add('d-none');
            this.otpdivRef.current.classList.remove('d-none');

            this.setUpRecaptcha();
            
            const phoneNumber = "+91"+this.state.phone;
            
            const appVerifier = window.recaptchaVerifier;

            const auth = getAuth();
            signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    
                    window.confirmationResult = confirmationResult;
                    this.props.showPhoneAlerts("Otp Sent",'success');

                }).catch((error) => {
                    this.props.showPhoneAlerts("Error Sending Otp",'danger');
                });
        }
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
        
        if(this.state.otp==='' || this.state.otp.length<6 ){
            this.otpRef.current.classList.add('is-invalid');
        }
        else {
            if(this.otpRef.current.classList.contains('is-invalid')){
                this.otpRef.current.classList.remove('is-invalid')
            }

            const code = this.state.otp;
            window.confirmationResult.confirm(code).then((result) => {
                
                const user = result.user;
                this.phoneRef.current.classList.add('is-valid');
                this.phoneRef.current.readOnly= true;
                this.otpdivRef.current.classList.add('d-none');
                this.props.isPhoneAuthenticated();
                this.props.onPhoneNumberVerification(this, this.state.phone);
                

            }).catch((error) => {
                console.log("Fail");
                this.phoneRef.current.classList.add('is-invalid');
                this.phoneRef.current.readOnly= false;
                this.otpdivRef.current.classList.add('d-none');
                this.verifyBtnRef.current.classList.remove('d-none');
                this.setState({
                    otp:''
                });
            });
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSignInSubmit} >
                    <div className="mb-1 ms-4 mt-2">
                        <label htmlFor="phoneNumber" className="form-label d-block">Phone number</label>
                        <input 
                            type="number" 
                            className="form-control form__field phoneNumber d-inline "
                            id="phoneNumber"
                            value={this.state.phone}
                            onChange={this.onChangeHandler}
                            name="phone"
                            ref={this.phoneRef}
                            maxLength="10"
                        />
                        
                        <button 
                            className="btn btn-sm btn-outline-dark ms-3 mt-1 verifyBtn "
                            type="submit"
                            ref={this.verifyBtnRef}
                        >
                            Verify
                        </button>
                        <div className="invalid-feedback " ref={this.phoneError}>
                            Please Enter a valid phone number
                        </div>
                        <div id="recaptcha-container"></div>
                    </div>
                </form>
                <form onSubmit={this.onSubmitOtp}>    
                    <div className="mb-1 ms-4 mt-2 d-none" ref={this.otpdivRef}>
                        <label htmlFor="otp" className="mt-2">Enter OTP :  </label>
                        <input 
                            type="text" 
                            className="form-control form__field partitionedOTP d-inline"
                            id="otp"
                            value={this.state.otp}
                            onChange={this.onChangeHandler}
                            name="otp"
                            ref={this.otpRef}
                            maxLength="6"
                        />
                        <button
                            type="submit"
                            className="btn btn-sm btn-outline-dark mt-1 ms-3 verifyBtn d-inline"
                        >submit</button>
                        <div className="invalid-feedback " ref={this.otpError}>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
