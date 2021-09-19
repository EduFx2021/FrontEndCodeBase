import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/form.css';
import { v1 as uuidv1 } from 'uuid';
import { Link } from "react-router-dom";
import { OverlayTrigger,Tooltip,Alert } from 'react-bootstrap';

export default class NGOSignUp extends Component {
    constructor(props){
        super(props);
        this.checkboxref= React.createRef();
        this.emailRef=React.createRef();
        this.ngoIdRef=React.createRef();
        this.passRef=React.createRef();
        this.passError=React.createRef();
        this.ngoIdError= React.createRef();
        this.confirmPassRef= React.createRef();
        this.confirmPassError= React.createRef();
        this.signUpButtonRef= React.createRef();
        this.emailError= React.createRef();
        this.ngoNameRef= React.createRef();
        this.ngoNameError= React.createRef();

        this.state={
            email:'',
            ngos:[],
            ngoId:'',
            ngoName:'',
            password:'',
            confirmpassword:'',
            showAlert:false,
            alertVarient:'',
            alertText:'',
            isEmailAvailable:false
        }

    }
    
    //This method removes 'is-invalid' class from validated input fields
    handleInput(e){
        e.target.classList.remove('is-invalid');
    }

    //This method checks for events on form fields so as to remove invalid classes from these fields
    componentDidMount(){
        this.signUpButtonRef.current.disabled=true;
        this.ngoIdRef.current.addEventListener("keydown",this.handleInput);
        this.passRef.current.addEventListener("keydown",this.handleInput);
        this.emailRef.current.addEventListener("keydown",this.handleInput);
        this.confirmPassRef.current.addEventListener("keydown",this.handleInput);

        this.emailRef.current.addEventListener("focusout",this.checkEmailAvailability.bind(this));
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
            const res=await axios.get('http://localhost:3000/ngos');

            this.setState({
                ngos: res.data
            });

            this.state.ngos.forEach((ngo)=> {
                
                if(ngo.email === this.state.email){
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
        let isRegistered=false;
        let isNgoIdValid=false;

        // Checking if email is available at the time of submitting
        if(this.state.isEmailAvailable && this.state.email!==''){
            isEmailValid=true;
        }
        else{
            this.emailRef.current.classList.add('is-invalid');
            this.emailError.current.innerText="Please enter an email";
            isEmailValid=false;
        }

        //validate NGO ID
        if(this.state.ngoId===''){
            this.ngoIdRef.current.classList.add('is-invalid');
            this.ngoIdError.current.innerText="NGO ID field can't be empty!";
            isNgoIdValid=false;
        }
        else if(this.state.ngoId.length<3 || this.state.ngoId.length>15){
            this.ngoIdRef.current.classList.add('is-invalid');
            this.ngoIdError.current.innerText="ngoId Length must be greater than 3 and less than 15";
            isNgoIdValid=false;
        }
        else {
            isNgoIdValid=true;
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
        else if (this.confirmPassRef.current.value!==this.passRef.current.value){
            this.confirmPassRef.current.classList.add('is-invalid');
            this.confirmPassError.current.innerText = "Password doesn't match";
            isPassValid=false;
        }
        else{
            isPassValid=true;
        }

        if(isEmailValid && isPassValid && isNgoIdValid){
            
            //check user in database
            const response=await axios.get('http://localhost:3000/ngos')
            
            this.setState({
                ngos: response.data
            });

            this.state.ngos.forEach((ngo)=> {
                if(ngo.email === this.state.email ){
                    this.showAlert("NGO Already registered please login",'danger');
                    isRegistered=true;
                }
            });

            if(!isRegistered){
                //currently phone number is not added to ngo sign up but used for fogot password facility therefore the phone number is hardcoded while sending data to ngos db
                const data = {
                    "id":uuidv1(),
                    "email":this.state.email,
                    "user":this.state.ngoId,
                    "phone":'1234567891',
                    "password":this.state.password
                }

                this.setState({
                    ngos:[...this.state.ngos,data]
                });
                
                axios.post('http://localhost:3000/ngos',data)
                .then(res=>{
                    this.showAlert("Signed Up Successfully!",'success');
                });
            }
        }
        else {
            this.showAlert("Sign Up Failed",'danger');
        }

        //clear input fields 
        this.setState({
            email:'',
            ngoId:'',
            password:'',
            confirmpassword:''
        });
        this.checkboxref.current.checked=false;
    }

    // This method renders tooltip on password field containing the info
    renderPassTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Password length must be greater than 8 and less than 25 and must contain A Capital Alphabet, a number and a special character.
        </Tooltip>
    );

    showAlert=(msg,varient)=>{
        this.setState({
            showAlert: true,
            alertVarient:varient,
            alertText:msg
        });

        setTimeout(() => {
            this.setState({
                showAlert: false,
                alertText:''
            })
        }, 2000)
    }

    render() {
        return (
            <div className="ngosignup" id="ngoSignUp" >
                <div className="container" style={{marginLeft:"0px"}}>
                    <div className="row">
                        <div className="col-6">
                            <Link to="/" type="button" className="btn btn-outline-dark btn-sm mt-2">Home</Link>
                        </div>
                        <div className="col-6 pt-4" style={{marginLeft:"650px"}}>
                            
                            {this.state.showAlert?
                            <Alert 
                                variant={this.state.alertVarient}
                            >   
                                {this.state.alertText}
                            </Alert>
                            :null}

                            <h3 className="mt-4 ms-4 mb-3 display-6 "style={{color:"#4d4d4d"}}>Non Governmental Organization [NGO] Sign Up</h3>

                            <form>
                                <div className="mb-1 ms-4 mt-2">
                                    <label htmlFor="ngoEmail" className="form-label">Email address</label>
                                    <input 
                                        type="email" 
                                        className="form-control form__field"
                                        id="ngoEmail"
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
                                    <label htmlFor="normalUsername" className="form-label">NGO Identification Number</label>
                                    <input 
                                        type="text" 
                                        className="form-control form__field"
                                        id="normalUsername"
                                        value={this.state.ngoId}
                                        onChange={this.onChangeHandler}
                                        name="ngoId"
                                        ref={this.ngoIdRef}
                                    />
                                    
                                    <div className="invalid-feedback " ref={this.ngoIdError}>
                            
                                    </div>
                                </div>

                                {/* <div className="mb-1 ms-4 mt-2">
                                    <label htmlFor="ngoName" className="form-label">NGO Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control form__field"
                                        id="ngoName"
                                        value={this.state.ngoName}
                                        onChange={this.onChangeHandler}
                                        name="ngoName"
                                        ref={this.ngoNameRef}
                                    />
                                    
                                    <div className="invalid-feedback " ref={this.ngoNameError}>
                            
                                    </div>
                                </div> */}

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
                                    Are you a Regular User ? <a className="signUpLink" href="#normalSignUp"> <span style={{color:'blue'}}>Sign Up here!</span></a>
                                </div>
                                <div className="d-grid gap-2 mb-5 loginBtn">
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
