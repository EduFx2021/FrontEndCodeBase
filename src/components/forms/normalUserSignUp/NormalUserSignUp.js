import React, { Component } from 'react'
import '../../../css/form.css'
export default class NormalUserSignUp extends Component {
    componentDidMount(){
        this.props.hideNav();
    }
    render() {
        return (
            <div className="normalusersignup" style={{height:"100vh"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-6">

                        </div>
                        <div className="col-6">
                            <h3 className="mt-5 ms-4 display-5 "style={{color:"white"}}>Normal User Sign Up</h3>

                            <form>
                                <div class="mb-1 ms-4 mt-2">
                                    <label htmlfor="normalUserEmail" class="form-label">Email address</label>
                                    <input type="email" class="form-control form__field" id="normalUserEmail" aria-describedby="emailHelp"/>
                                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div class="mb-2 ms-4">
                                    <label htmlfor="normalUserPassword " class="form-label">Password</label>
                                    <input type="password" class="form-control form__field" id="normalUserPassword"/>
                                </div>
                                <div class="mb-2 ms-4">
                                    <label htmlfor="normalUserPasswordConfirm " class="form-label">Confirm Password</label>
                                    <input type="password" class="form-control form__field" id="normalUserPasswordConfirm"/>
                                </div>
                                <div class="mb-2 ms-4 form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                                    <label class="form-check-label" htmlfor="exampleCheck1" style={{color:"white"}}>I Agree to terms and conditions</label>
                                </div>
                                <div className="d-grid gap-2 loginBtn">
                                    <button type="button" className="btn mt-2 mb-3 fw-bold " style={{backgroundColor:'#66FCF1' , color:'white' }}
                                    onClick={this.handleFormSubmit}
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
