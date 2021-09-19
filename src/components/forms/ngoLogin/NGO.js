import React, { Component } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

export default class NormalUser extends Component {
    constructor(props){
        super(props);
        this.usernameRef=React.createRef();
        this.passRef=React.createRef();
        this.passError=React.createRef();
        this.usernameError= React.createRef();

        this.state={
            id:'',
            username:'',
            password:'',
            users:[],
            showAlert:false,
            alertVarient:'',
            alertText:'',
            isAuthenticated:false
        }
    }

    // These methods is for adding is-invalid class to the username field if it's not valid

    handleUsername(e){
        e.target.classList.remove('is-invalid');
    }

    handlePassword(e){
        e.target.classList.remove('is-invalid');
    }

    //This method checks for events on password and username field so as to remove invalid classes from username and password fields
    componentDidMount(){
        this.usernameRef.current.addEventListener("keydown",this.handleUsername);
        this.passRef.current.addEventListener("keydown",this.handlePassword);    
    }

    onChangeHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    // This method is reponsible for rendering forgot password form 
    onForgotPassHandler=()=> {
        this.props.forgotPass('forgotPasswordForNGO');
    }

    handleFormSubmit=async function(){
        const pass= this.state.password;
        let isUsernameCorrect=false;
        let isPasswordCorrect=false;

        //validate Input
        if(this.state.username===''){
            this.usernameRef.current.classList.add('is-invalid');
            this.usernameError.current.innerText="Username field can't be empty!";
            isUsernameCorrect=false;
        }
        else{
            isUsernameCorrect=true;
        }
        //Password Validation
        if(pass===''){
            this.passRef.current.classList.add('is-invalid');
            this.passError.current.innerText = "Please Enter your Password";
            isPasswordCorrect=false;
        }
        else{
            isPasswordCorrect=true;
        }


        if(isUsernameCorrect && isPasswordCorrect){
            //check user in database
            const response = await axios.get('http://localhost:3000/ngos');
            this.setState({
                users: response.data
            });

            this.state.users.forEach((x)=>{
            
                if((x.user === this.state.username||x.email===this.state.username) && x.password===this.state.password){
                    this.setState({
                        isAuthenticated:true
                    })
                }
            })

            if(this.state.isAuthenticated){
                this.showAlert("Logged in Successfully",'success');
                this.setState({
                    username:'',
                    password:''
                });
            }
            else {
                this.showAlert("You have entered wrong username or password, please check the credentials and try again",'danger');
            }
        }
        else {
            this.showAlert("Login Failed!",'danger');
        }
    }

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
            <div>
                {this.state.showAlert?
                    <Alert 
                        variant={this.state.alertVarient} 
                        className="loginAlert ms-5"
                    >   
                       {this.state.alertText}
                    </Alert>
                :null}
                <h4 className="loginTitle mb-4">Login to Your Account</h4>
               <form>
                    <div className="mb-3 form">
                        <label htmlFor="username" className="form-label form__label">NGO Identification No.</label>
                        <input
                            type="name" 
                            className="form-control form__field " 
                            placeholder="Enter NGO Identification number"
                            id="username" 
                            value={this.state.username}
                            onChange={this.onChangeHandler}
                            name="username"
                            ref={this.usernameRef}
                        />
                        
                        <div className="invalid-feedback ms-5" ref={this.usernameError}>
                           
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userPassword" className="form-label form__label">PASSWORD</label>
                        <input 
                            type="password"
                            className="form-control form__field"
                            id="userPassword"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={this.onChangeHandler}
                            name="password"
                            ref={this.passRef}
                        />
                        <div className="invalid-feedback ms-5" ref={this.passError}>
                            
                        </div>
                    </div>

                    <div className="d-grid gap-2 loginBtn">
                        <button type="button" className="btn mt-2 mb-3 fw-bold " style={{backgroundColor:'#00adef' , color:'white' }}
                        onClick={this.handleFormSubmit.bind(this)}
                        >
                                Login
                        </button>
                    </div>
                    <div className="form-text mt-0 ms-5 ">
                        No account?<a className="signUpLink" href="/signup/ngo"> <span style={{color:'blue'}}>Sign Up!</span></a>
                        <a className="signUpLink float-end me-5 mb-4" href="#"
                        onClick={this.onForgotPassHandler}>Forgot Password?</a>
                    </div>
                </form>
                
            </div>
        )
    }
}
