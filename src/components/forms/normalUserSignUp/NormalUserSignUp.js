import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/form.css';
import { v1 as uuidv1 } from 'uuid';
import { Link } from "react-router-dom";
import PhoneAuth from '../../PhoneAuth/PhoneAuth';
import { OverlayTrigger,Tooltip } from 'react-bootstrap';


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
        

        this.state={
            email:'',
            username:'',
            password:'',
            confirmpassword:'',
            phone:'',
            isPhoneAuthenticated:false,
            users:[],
            isUserNameAvailable:false,
            isEmailAvailable:false
        }

    }
    
    //This method checks for events on form fields so as to remove invalid classes from these fields
    componentDidMount(){
        this.signUpButtonRef.current.disabled=true;
        this.usernameRef.current.addEventListener("keydown",this.handleInput);
        this.passRef.current.addEventListener("keydown",this.handleInput);
        this.emailRef.current.addEventListener("keydown",this.handleInput);
        this.confirmPassRef.current.addEventListener("keydown",this.handleInput);

        this.emailRef.current.addEventListener("focusout",this.checkEmailAvailability.bind(this));
    }
    
    // This method removes 'is-invalid' class from validated fields
    handleInput(e){
        e.target.classList.remove('is-invalid');
        e.target.classList.remove('is-valid');
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

    checkUsernameAvailability=async function(e){
        e.preventDefault();
        let usernameCheck=false;
        let usernameAvail = true; //temp var to check username availability
        
        //validate username input
        if(this.state.username===''){
            this.usernameRef.current.classList.add('is-invalid');
            this.usernameError.current.innerText="Username field can't be empty!";
            usernameCheck=false;
        }
        else if(this.state.username.length<3 || this.state.username.length>15){
            this.usernameRef.current.classList.add('is-invalid');
            this.usernameError.current.innerText="Username Length must be greater than 3 and less than 15";
            usernameCheck=false;
        }
        else {
            usernameCheck=true;
            this.setState({
                usernameAvail:true
            })
        }

        if(usernameCheck){

            const res=await axios.get('http://localhost:3000/users');
            this.setState({
                users: res.data
            });

            this.state.users.forEach((user)=> {
                if(user.user === this.state.username){
                    this.usernameRef.current.classList.add('is-invalid');
                    this.usernameError.current.innerText="Username is not available";
                    this.setState({
                        isUserNameAvailable:false
                    });
                    usernameAvail=false;
                }
            });

        }   
        if(usernameAvail!==false) {
            this.usernameRef.current.classList.add('is-valid');
            this.usernameError.current.innerText="Username is available";
            this.setState({
                isUserNameAvailable:true
            });
        }
    }

    checkEmailAvailability= async function(){
        let emailCheck=false;
        let emailAvail = true; //temp var to check email availability
        //validate email input
        var emailExpr = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
        if(!emailExpr.test(this.state.email)){
            this.emailRef.current.classList.add('is-invalid');
            this.emailError.current.innerText="Please write the correct email format user@xyz.com";
            emailCheck=false;
        }
        else {
            emailCheck=true;
        }

        if(emailCheck){
            const res=await axios.get('http://localhost:3000/users');

            this.setState({
                users: res.data
            });

            this.state.users.forEach((user)=> {
                
                if(user.email === this.state.email){
                    this.emailRef.current.classList.add('is-invalid');
                    this.emailError.current.innerText="Email is already registered please login";
                    this.setState({
                        isEmailAvailable:false
                    });
                    emailAvail=false;
                }
                
            });

            if(emailAvail!==false){
                this.setState({
                    isEmailAvailable:true
                });
            }
        }
    }

    // This method is fired when the form is submitted
    handleFormSubmit=async function(){
        const pass= this.state.password;
        let isEmailValid=false;
        let isPassValid=false;
        let isUsernameValid=false;
        let isPhoneValid=false;
        let isRegistered=false;

        // Checking if email is available at the time of submitting
        if(this.state.isEmailAvailable && this.state.email!==''){
            isEmailValid=true;
        }
        else{
            this.emailRef.current.classList.add('is-invalid');
            this.emailError.current.innerText="Please enter an email";
            isEmailValid=false;
        }

        //validate Input
        if(this.state.isUserNameAvailable && this.state.username!==''){
            isUsernameValid=true;
        }
        else{
            isUsernameValid=false;
            this.usernameRef.current.classList.add('is-invalid');
            this.usernameError.current.innerText="Please enter a username";
        }
        //Password Validation
        var regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/;
        var minNumberofChars = 8;
        var maxNumberofChars = 25;

        if(pass.length < minNumberofChars || pass.length > maxNumberofChars){
           this.passRef.current.classList.add('is-invalid');
           this.passError.current.innerText = "Password Length must be greater than 8 and less than 25";
           isPassValid=false;
        }
        else if(!regularExpression.test(pass)) {
            this.passRef.current.classList.add('is-invalid');
            this.passError.current.innerText = "Password should contain atleast one number and one special character";
            isPassValid=false;
        }
        else if(this.confirmPassRef.current.value!==this.passRef.current.value){
            this.confirmPassRef.current.classList.add('is-invalid');
            this.confirmPassError.current.innerText = "Password doesn't match";
            isPassValid=false;
        }
         
        else{
            isPassValid=true;
        }

        if (!this.state.isPhoneAuthenticated){
            isPhoneValid=false;
            alert("please enter and verify your phone number!!")
        }
        else {
            isPhoneValid=true;
        }


        if(isEmailValid && isPhoneValid && isUsernameValid && isPassValid){
            //check user in database
            const res=await axios.get('http://localhost:3000/users');
            
            this.setState({
                users: res.data
            });

            this.state.users.forEach((user)=> {
                
                if(user.email === this.state.email ){
                    alert("User Already registered please login");
                    isRegistered=true;
                }
            
            });
            
            if(!this.state.isUserNameAvailable){
                alert("Please check first if the username is available");
                isRegistered=true;
            }

            if(isRegistered===false){
                const data = {
                    "id":uuidv1(),
                    "email":this.state.email,
                    "user":this.state.username,
                    "phone":this.state.phone,
                    "password":this.state.password
                }

                this.setState({
                    users:[...this.state.users,data]
                });

                axios.post('http://localhost:3000/users',data)
                .then(res=>{
                    alert('Signed Up');
                });
            }
        }
        else {
            alert("Sign Up failed");
        }

        //clear input fields 
        this.setState({
            email:'',
            username:'',
            password:'',
            confirmpassword:''
        });
        this.checkboxref.current.checked=false;

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

    // These methods renders tooltip on username and password fields containing the info
    renderPassTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props} >
          Password length must be greater than 8 and less than 25 and must contain A Capital Alphabet, a number and a special character.
        </Tooltip>
    );

    renderUsernameTooltip=(props)=>(
        <Tooltip id="button-tooltip" {...props} >
          Username length must be greater than 3 and less than 15
        </Tooltip>
    );

    render() {
        return (
            <div className="normalusersignup" id="normalSignUp" >
                <div className="container" style={{marginLeft:"0px"}}>
                    <div className="row">
                        <div className="col-6">  
                        <Link to="/" type="button" className="btn btn-outline-dark btn-sm mt-2">Home</Link>  
                        </div>
                        <div className="col-6 " style={{marginLeft:"650px"}}>
                            <h3 className="mt-3 ms-4 display-5 "style={{color:"#4d4d4d"}}>Individual User Sign Up</h3>
                            
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
                                    <label htmlFor="normalUsername" className="form-label d-block">Username</label>
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 200, hide: 200 }}
                                        overlay={this.renderUsernameTooltip}
                                    >
                                    <input 
                                        type="text" 
                                        className="form-control usernameField form__field d-inline"
                                        id="normalUsername"
                                        value={this.state.username}
                                        onChange={this.onChangeHandler}
                                        name="username"
                                        ref={this.usernameRef}
                                    />
                                    </OverlayTrigger>
                                    <button 
                                        className="btn btn-sm btn-outline-dark ms-3 mt-1 verifyBtn "
                                        type="submit"
                                        ref={this.verifyBtnRef}
                                        onClick={this.checkUsernameAvailability.bind(this)}
                                    >
                                        Check
                                    </button>
                                    <div className="invalid-feedback " ref={this.usernameError}>
                            
                                    </div>
                                </div>
                            </form>
                            
                            <PhoneAuth isPhoneAuthenticated={this.onPhoneAuthentication} onPhoneNumberVerification={this.onPhoneNumberVerification}/>
                            
                            
                            <form>    
                                <div className="mb-2 ms-4">
                                    <label htmlFor="normalUserPassword " className="form-label">Password</label>
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 200, hide: 200 }}
                                        overlay={this.renderPassTooltip}
                                    >                                    
                                        <input 
                                            type="password" 
                                            className="form-control form__field" 
                                            id="normalUserPassword"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChangeHandler}
                                            ref={this.passRef}
                                        />
                                    </OverlayTrigger>
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
                                    onClick={this.handleFormSubmit.bind(this)}
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
