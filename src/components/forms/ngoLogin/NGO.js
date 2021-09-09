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
            isAuthenticated:false
        }
    }

    handleUsername(e){
        e.target.classList.remove('is-invalid');
        e.target.classList.add('is-valid');
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

    handleFormSubmit=async function(){
        const pass= this.state.password;
        //validate Input
        if(this.state.username===''){
            this.usernameRef.current.classList.add('is-invalid');
            this.usernameError.current.innerText="Username field can't be empty!";
        }
        else if(this.state.username.length<3 || this.state.username.length>15){
            this.usernameRef.current.classList.add('is-invalid');
            this.usernameError.current.innerText="Username Length must be greater than 3 and less than 15";
        }

        //Password Validation
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



        //check user in database
        const response = await axios.get('http://localhost:3000/ngos');
        this.setState({
            users: response.data
        });

        this.state.users.forEach((x)=>{
           
            if(x.user === this.state.username && x.password===this.state.password){
                this.setState({
                    isAuthenticated:true
                })
            }
        })

        if(this.state.isAuthenticated){
            alert('Logged in Successfully');
        }
        else {
            alert('User has entered wrong username and pass');
        }

    }

    render() {
        return (
            <div>
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
                        <a className="signUpLink float-end me-5 mb-4" href="#">Forgot Password?</a>
                    </div>
                </form>
                
            </div>
        )
    }
}
