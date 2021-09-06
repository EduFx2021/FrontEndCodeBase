import React from 'react'
import logo from '../../images/logo.png'
import '../../css/footer.css';

export default function Footer() {
    return (
        <div>
            <footer id="footer" className="footer">
                <div className="footBorder">-</div>
                    <div id="content">
                        <img className="BnW" src={logo}/>
                        <b>Eco Action</b>
                        <div className="footer-right">
                            Join the Conversation : 
                            <a href="https://www.facebook.com/">
                            <i className="fab fa-2x fa-facebook-square"></i>
                            </a> 
                            <a href="https://www.linkedin.com/company/edu-fx">
                            <i className="fab fa-2x fa-linkedin"></i>
                            </a> 
                            <a href="https://www.twitter.com/">
                            <i className="fab fa-2x fa-twitter-square"></i>
                            </a> 
                            <a href="https://www.instagram.com/">
                            <i className="fab fa-2x fa-instagram"></i>
                            </a>
                        </div>
                    <br/><br/>
                    <hr/>
                    <div id="contacts" className="footer-right">
                        <a href="https://edu-fx.wixsite.com/edufx">CONTACT</a> |
                        <a href="#">COPYRIGHT</a> |
                        <a href="#">FRAUD ALERT</a> |
                        <a href="#">PRIVACY NOTICE</a> |
                        <a href="#">TERM OF USE</a> 
                    </div>
                </div>
            </footer>
        </div>
    )
}
