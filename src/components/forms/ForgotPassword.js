import React, { Component } from 'react';
import axios from 'axios';
import PhoneAuth from '../PhoneAuth/PhoneAuth';

export default class ForgotPassword extends Component {

    constructor(props){
        super(props);

        this.emailRef=React.createRef();
        this.emailError= React.createRef();
        this.passRef=React.createRef();
        this.passError=React.createRef();
        this.confirmPassRef= React.createRef();
        this.confirmPassError= React.createRef();
        this.changeButtonRef= React.createRef();
        

        this.state={
            users:'',
            userId:'',
            username:'',
            email:'',
            phone:'',
            newPass:'',
            confirmPass:'',
            isPhoneAuthenticated:false,
            isEmailRegistered:false
        };
    }

    componentDidMount=()=>{
        this.emailRef.current.addEventListener("keydown",this.handleInput);
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

    checkEmailAvailability= async function(){
        let emailCheck=false;
        let emailregistered = false; //temp var to check email registered

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
            const res=await axios.get(`http://localhost:3000/${this.props.forgotPassFor}`);

            this.setState({
                users: res.data
            });

            this.state.users.forEach((user)=> {
                
                if(user.email === this.state.email){
                    
                    this.setState({
                        isEmailRegistered:false
                    });
                    emailregistered=true;
                }
                
            });
            
            console.log(emailregistered)
            if(emailregistered){
                this.setState({
                    isEmailRegistered:true
                });
            } 
            else{
                this.emailRef.current.classList.add('is-invalid');
                this.emailError.current.innerText="Email is not registered";    
            }
        }
    }

    // This method is fired when the form is submitted
    handleFormSubmit=async function(){
        const pass= this.state.password;
        let isValid=false;
        let isRegistered=false;
        
        //validate email input
        //isvalid is true if the email is not available that is email is already registered and since here we are resetting password only for registered users this idf
        if(this.state.isEmailAvailable){
            isValid=false;
        }
        else {
            isValid=true;
        }

        //Password Validation
        var regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/;
        var minNumberofChars = 8;
        var maxNumberofChars = 25;

        if(pass.length < minNumberofChars || pass.length > maxNumberofChars){
           this.passRef.current.classList.add('is-invalid');
           this.passError.current.innerText = "Password Length must be greater than 8 and less than 25";
           isValid=false;
        }
        else if(!regularExpression.test(pass)) {
            this.passRef.current.classList.add('is-invalid');
            this.passError.current.innerText = "Password should contain atleast one number and one special character";
            isValid=false;
        }
        else if(this.confirmPassRef.current.value!==this.passRef.current.value){
            this.confirmPassRef.current.classList.add('is-invalid');
            this.confirmPassError.current.innerText = "Password doesn't match";
            isValid=false;
        }
        else if (!this.state.isPhoneAuthenticated){
            isValid=false;
            alert("please enter and verify your phone number!!")
        }
        else{
            isValid=true;
        }

        if(isValid){
            //check user in database
            const res=await axios.get(`http://localhost:3000/${this.props.forgotPassFor}`);
            
            this.setState({
                users: res.data
            });

            this.state.users.forEach((user)=> {
                if(user.email === this.state.email && user.phone=== this.state.phone ){
                    isRegistered=true;
                    this.setState({
                        userId:user.id,
                        username:user.user
                    });
                }
                
            });
            

            if(isRegistered===true){
                const data = {
                    "id":this.state.userId,
                    "email":this.state.email,
                    "phone":this.state.phone,
                    "user":this.state.username,
                    "password":this.state.password
                }

                const res= await axios.put(`http://localhost:3000/${this.props.forgotPassFor}/${this.state.userId}`,data);

                alert("updated successfully")
            }
            else{
                alert('user not registered, please sign up');
            }
        }
        else {
            alert("Password Updation failed");
        }

        //clear input fields 
        this.setState({
            email:'',
            password:'',
            confirmpassword:''
        });
        

    }

    render() {
        return (
            <div className="forgotPassword mb-3">
                <h4 className="loginTitle mb-4">Forgot Password</h4>
                 <form>
                    <div className="mb-1 ms-5 mt-2">
                        <label htmlFor="userEmail" className="form-label">Email address</label>
                        <input 
                            type="email" 
                            className="form-control form__field"
                            id="userEmail"
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

                {this.state.isPhoneAuthenticated?
                <div>
                    <div className="mb-2 ms-5"> 
                        <label htmlFor="userPassword " className="form-label">New Password</label>
                        <input 
                            type="password" 
                            className="form-control form__field" 
                            id="userPassword"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangeHandler}
                            ref={this.passRef}
                        />
                        <div className="invalid-feedback" ref={this.passError}>
                
                        </div>
                    </div>
                    <div className="mb-2 ms-5">
                        <label htmlFor="userPasswordConfirm " className="form-label">Confirm Password</label>
                        <input 
                            type="password" 
                            className="form-control form__field"
                            value={this.state.confirmpassword} id="userPasswordConfirm"
                            name="confirmpassword"
                            onChange={this.onChangeHandler}
                            ref={this.confirmPassRef}
                        />
                        <div className="invalid-feedback " ref={this.confirmPassError}>
                
                        </div>    
                    </div>
                    <div className="d-grid gap-2 loginBtn">
                        <button type="button" className="btn mt-2 mb-3 fw-bold " style={{backgroundColor:'#00adef' , color:'white' }}
                        onClick={this.handleFormSubmit.bind(this)}
                        ref={this.changeButtonRef}
                        >
                        Change
                        </button>
                    </div>
                    </div>:null}
                      
            </div>
        )
    }
}
