import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import logo from '../../images/logo.png'

export default class Login extends Component {
    state={
        username:'',
        password:'',
        uid:'',
        show:false
    }

    handleClose=this.props.showModal

    render() {
        return (
            <>
                <Modal show={this.props.toggleModal} onHide={this.handleClose}>
                    <Modal.Header style={{backgroundColor:'#1F2833' ,color:'white'}}>
                        <img src={logo} alt="" width="40" height="40"/>
                        <Modal.Title>Eco-Action Login</Modal.Title>
                        <button type="button" className="btn mt-2 fw-bold btn-sm closeBtn" style={{backgroundColor:'#1F2833' , color:'white' }}
                        onClick={this.handleClose}
                        >
                            X
                        </button>
                    </Modal.Header>
                    <Modal.Body style={{backgroundColor:'#1F2833',color:'white'}}>
                        Woohoo, you're reading this text in a modal!
                        <br/>
                        <div className="d-grid gap-2">
                        <button type="button" className="btn mt-2 fw-bold btn-sm" style={{backgroundColor:'#66FCF1' , color:'white' }}>
                            Login
                        </button>
                        </div>
                        
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}
