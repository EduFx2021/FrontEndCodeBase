import React, { Component } from 'react';
import axios from 'axios';
import '../../../css/form.css';
import { v1 as uuidv1 } from 'uuid';
import { Link } from "react-router-dom";

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
            ngoId:'',
            ngoName:'',
            password:'',
            confirmpassword:''
        }

    }
    
    handleInput(e){
        e.target.classList.remove('is-invalid');
    }
    
    componentDidMount(){
        this.signUpButtonRef.current.disabled=true;
        this.ngoIdRef.current.addEventListener("keydown",this.handleInput);
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
        if(this.state.ngoId===''){
            this.ngoIdRef.current.classList.add('is-invalid');
            this.ngoIdError.current.innerText="ngoId field can't be empty!";
            isValid=false;
        }
        else if(this.state.ngoId.length<3 || this.state.ngoId.length>15){
            this.ngoIdRef.current.classList.add('is-invalid');
            this.ngoIdError.current.innerText="ngoId Length must be greater than 3 and less than 15";
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
            let ngos=[];
            //check user in database
            axios.get('http://localhost:3000/ngos')
            .then(response=>this.setState({
                ngos: response.data
            }));

            const data = {
                "id":uuidv1(),
                "email":this.state.email,
                "user":this.state.ngoId,
                "password":this.state.password
            }

            ngos.push(data);
            
            axios.post('http://localhost:3000/ngos',data)
            .then(res=>{
                alert('Signed Up');
            });
            
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
    render() {
        return (
            <div className="ngosignup" id="ngoSignUp" style={{height:"100vh"}}>
                <div className="container" style={{marginLeft:"0px"}}>
                    <div className="row">
                        <div className="col-6">
                            <Link to="/" type="button" className="btn btn-outline-dark btn-sm mt-2">Home</Link>
                        </div>
                        <div className="col-6 pt-4" style={{marginLeft:"650px"}}>
                            <h3 className="mt-5 ms-4 mb-3 display-6 "style={{color:"#4d4d4d"}}>Non Governmental Organization [NGO] Sign Up</h3>

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
                                    Are you a Regular User ? <a className="signUpLink" href="#normalSignUp"> <span style={{color:'blue'}}>Sign Up here!</span></a>
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
