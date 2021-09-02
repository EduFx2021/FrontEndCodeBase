import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/form.css';
import { v1 as uuidv1 } from 'uuid';
import { Link } from "react-router-dom";
import firebase from '../../firebase';
import { getAuth,RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth";

export default class NormalUserSignUp extends Component {
    constructor(props){
        super(props);
        this.checkboxref= React.createRef();
        this.emailRef=React.createRef();
        this.usernameRef=React.createRef();
        this.passRef=React.createRef();
        this.passError=React.createRef();
        this.usernameError= React.createRef();
        this.confirmPassRef= React.createRef();
        this.confirmPassError= React.createRef();
        this.signUpButtonRef= React.createRef();
        this.emailError= React.createRef();
        this.phoneRef= React.createRef();
        this.phoneError= React.createRef();
        this.otpRef= React.createRef();
        this.otpdivRef= React.createRef();
        this.otpError=React.createRef();
        this.verifyBtnRef= React.createRef();

        this.state={
            email:'',
            username:'',
            phone:'',
            otp:'',
            password:'',
            confirmpassword:''
        }

    }
    
    handleInput(e){
        e.target.classList.remove('is-invalid');
    }
    
    onSignInSubmit = (e) => {
        e.preventDefault();
        this.verifyBtnRef.current.classList.add('d-none');
        this.otpdivRef.current.classList.remove('d-none');

        this.setUpRecaptcha();
        // Const phoneNumber me apna input number daalna h
        const phoneNumber = "+91"+this.state.phone;
        console.log(phoneNumber);
        const appVerifier = window.recaptchaVerifier;

        const auth = getAuth();
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            const code = prompt("Enter Otp")
                confirmationResult.confirm(code).then((result) => {
                    // User signed in successfully.
                    const user = result.user;
                    console.log(user);
                    console.log("Success");
                }).catch((error) => {
                    console.log("fail");
                });
            
            }).catch((error) => {
            // Error; SMS not sent
            // ...
            });
    }

    setUpRecaptcha = () => {
        const auth = getAuth();
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            this.onSignInSubmit();
        }
        }, auth);
    }

    componentDidMount(){
        this.signUpButtonRef.current.disabled=true;
        this.usernameRef.current.addEventListener("keydown",this.handleInput);
        this.passRef.current.addEventListener("keydown",this.handleInput);
        this.emailRef.current.addEventListener("keydown",this.handleInput);
        this.confirmPassRef.current.addEventListener("keydown",this.handleInput);
    }

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

    handleFormSubmit=()=>{
        const pass= this.state.password;
        let isValid=false;
        //validate email input
        var emailExpr = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
        if(!emailExpr.test(this.state.email)){
            this.emailRef.current.classList.add('is-invalid');
            this.emailError.current.innerText="Please write the correct email format user@xyz.com";
            isValid=false;
        }
        else {
            isValid=true;
        }

        //validate Input
        if(this.state.username===''){
            this.usernameRef.current.classList.add('is-invalid');
            this.usernameError.current.innerText="Username field can't be empty!";
            isValid=false;
        }
        else if(this.state.username.length<3 || this.state.username.length>15){
            this.usernameRef.current.classList.add('is-invalid');
            this.usernameError.current.innerText="Username Length must be greater than 3 and less than 15";
            isValid=false;
        }
        else {
            isValid=true;
        }
        //Password Validation
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        var minNumberofChars = 3;
        var maxNumberofChars = 16;

        if(pass.length < minNumberofChars || pass.length > maxNumberofChars){
           this.passRef.current.classList.add('is-invalid');
           this.passError.current.innerText = "Password Length must be greater than 3 and less than 16";
           isValid=false;
        }
        else if(!regularExpression.test(pass)) {
            this.passRef.current.classList.add('is-invalid');
            this.passError.current.innerText = "Password should contain atleast one number and one special character";
            isValid=false;
        }
        else{
            isValid=true;
        }

        if(this.confirmPassRef.current.value===this.passRef.current.value){
            isValid=true;
        }
        else {
            this.confirmPassRef.current.classList.add('is-invalid');
            this.confirmPassError.current.innerText = "Password doesn't match";
            isValid=false;
        }

        if(isValid){
            let users=[];
            //check user in database
            axios.get('http://localhost:3000/users')
            .then(response=>this.setState({
                users: response.data
            }));

            const data = {
                "id":uuidv1(),
                "email":this.state.email,
                "user":this.state.username,
                "password":this.state.password
            }

            users.push(data);
            
            axios.post('http://localhost:3000/users',data)
            .then(res=>{
                alert('Signed Up');
            });
            
        }

        //clear input fields 
        this.setState({
            email:'',
            username:'',
            password:'',
            confirmpassword:''
        });

    }

    render() {
        return (
            <div className="normalusersignup" id="normalSignUp" style={{height:"100vh"}}>
                <div className="container" style={{marginLeft:"0px"}}>
                    <div className="row">
                        <div className="col-6">  
                        <Link to="/" type="button" className="btn btn-outline-dark btn-sm mt-2">Home</Link>  
                        </div>
                        <div className="col-6 " style={{marginLeft:"650px"}}>
                            <h3 className="mt-5 ms-4 display-5 "style={{color:"#4d4d4d"}}>Individual User Sign Up</h3>

                            <form>
                                <div className="mb-1 ms-4 mt-2">
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
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    <div className="invalid-feedback " ref={this.emailError}>
                            
                                    </div>
                                </div>
                                <div className="mb-1 ms-4 mt-2">
                                    <label htmlFor="normalUsername" className="form-label">Username</label>
                                    <input 
                                        type="email" 
                                        className="form-control form__field"
                                        id="normalUsername"
                                        value={this.state.username}
                                        onChange={this.onChangeHandler}
                                        name="username"
                                        ref={this.usernameRef}
                                    />
                                    
                                    <div className="invalid-feedback " ref={this.usernameError}>
                            
                                    </div>
                                </div>
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
                                <div className="mb-1 ms-4 mt-2 d-none " ref={this.otpdivRef}>
                                    
                                    <input 
                                        type="number" 
                                        className="form-control form__field"
                                        id="otp"
                                        value={this.state.otp}
                                        onChange={this.onChangeHandler}
                                        name="otp"
                                        ref={this.otpRef}
                                    />
                                    <button className="btn btn-sm btn-outline-dark mt-1 verifyBtn"
                                        onClick={this.onSignInSubmit}
                                    >verify</button>
                                    <div className="invalid-feedback " ref={this.otpError}>
                                    </div>
                                </div>
                                <div className="mb-2 ms-4">
                                    <label htmlFor="normalUserPassword " className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control form__field" 
                                        id="normalUserPassword"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangeHandler}
                                        ref={this.passRef}
                                    />
                                    <div className="invalid-feedback" ref={this.passError}>
                            
                                    </div>
                                </div>
                                <div className="mb-2 ms-4">
                                    <label htmlFor="normalUserPasswordConfirm " className="form-label">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control form__field"
                                        value={this.state.confirmpassword} id="normalUserPasswordConfirm"
                                        name="confirmpassword"
                                        onChange={this.onChangeHandler}
                                        ref={this.confirmPassRef}
                                    />
                                    <div className="invalid-feedback " ref={this.confirmPassError}>
                            
                                    </div>    
                                </div>
                                <div className="mb-2 ms-4 form-check">
                                    <input 
                                        type="checkbox" 
                                        className="form-check-input"
                                        id="checkBox"
                                        ref={this.checkboxref}
                                        onChange={this.onChangeHandler}
                                    />
                                    <label className="form-check-label" htmlFor="exampleCheck1" style={{color:"black"}}>I Agree to <a href="https://www.termsandconditionsgenerator.com/live.php?token=QQ4YtMqswIGRlDHar7w03s7oAjjRXChF">terms and conditions</a></label>
                                </div>
                                <div className="form-text mt-0 ms-4 ">
                                    Are you a NGO ? <a className="signUpLink" href="#ngoSignUp"> <span style={{color:'blue'}}>Sign Up here!</span></a>
                                </div>
                                <div className="d-grid gap-2 loginBtn">
                                    <button type="button" className="btn mt-2 mb-3 fw-bold " style={{backgroundColor:'#00adef' , color:'white' }}
                                    onClick={this.handleFormSubmit}
                                    ref={this.signUpButtonRef}
                                    >
                                    Sign Up
                                     </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
