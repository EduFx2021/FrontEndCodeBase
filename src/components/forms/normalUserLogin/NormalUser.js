import React, { Component } from 'react'
import axios from 'axios'
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
            isCorrect:false,
            isAuthenticated:false
        }
    }

    handleUsername(e){
        e.target.classList.remove('is-invalid');
    }

    handlePassword(e){
        e.target.classList.remove('is-invalid');
    }
    componentDidMount(){
        this.usernameRef.current.addEventListener("keydown",this.handleUsername);
        this.passRef.current.addEventListener("keydown",this.handlePassword);
        
    }

    onChangeHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleFormSubmit=()=>{
        const pass= this.state.password;
        this.setState({
            isCorrect:false
        });
        //validate Input
        if(this.state.username===''){
            this.usernameRef.current.classList.add('is-invalid');
            this.usernameError.current.innerText="Username field can't be empty!";
            this.setState({
                isCorrect:false
            });
        }
        else if(this.state.username.length<3 || this.state.username.length>15){
            this.usernameRef.current.classList.add('is-invalid');
            this.usernameError.current.innerText="Username Length must be greater than 3 and less than 15";
            this.setState({
                isCorrect:false
            });
        }
        else {
            this.setState({
                isCorrect:true
            })
        }
        //Password Validation
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        var minNumberofChars = 3;
        var maxNumberofChars = 16;

        if(pass===''){
            this.passRef.current.classList.add('is-invalid');
            this.passError.current.innerText = "Please Enter your Password";
            this.setState({
                isCorrect:false
            });
        }
        else{
            this.setState({
                isCorrect:true
            });
        }


        if(this.state.isCorrect){
            //check user in database
            axios.get('http://localhost:3000/users')
            .then(response=>this.setState({
                users: response.data
            }));

            this.state.users.forEach((x)=>{
                console.log(x);
                if( (x.user === this.state.username||x.email===this.state.email) && x.password===this.state.password){
                    this.setState({
                        isAuthenticated:true
                    })
                }
            })

            if(this.state.isAuthenticated){
                alert('Logged in Successfully');
            }
            else {
                alert('User not registered');
            }
        }
    }

    render() {
        return (
            <div>
                <h4 className="loginTitle mb-4">Login to Your Account</h4>
               <form>
                   
                    <div className="mb-3 form">
                        <label htmlFor="username" className="form-label form__label">USERNAME / EMAIL </label>
                        <input
                            type="name" 
                            className="form-control form__field " 
                            placeholder="Enter Username or Email"
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
                        onClick={this.handleFormSubmit}
                        >
                                Login
                        </button>
                    </div>
                    <div className="form-text mt-0 ms-5 ">
                        No account?<a className="signUpLink" href="/signup/normaluser"> <span style={{color:'blue'}}>Sign Up!</span></a>
                        <a className="signUpLink float-end me-5" href="#">Forgot Password?</a>
                    </div>
                </form>
                <p className="text-center">OR</p> 
                <h5 className="loginSocial mb-4">Login with :</h5>
                <div className="socialIcons ms-5 mb-4">
                    <i className="fab fa-border fa-google fa-2x me-2"></i>
                    <i className="fab fa-border fa-twitter fa-2x mx-2"></i>
                    <i className="fab fa-border fa-facebook fa-2x mx-2"></i>
                </div>
            </div>
        )
    }
}
