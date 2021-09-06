import React from 'react';
import '../../css/Home.css';
import yamini from '../../images/founders/Yamini.jpg';
import anshuman from '../../images/founders/Anshuman.jpg';
import arijit from '../../images/founders/Arijit.jpeg';
import chitrak from '../../images/founders/Chitrak.jpeg';
import deepika from '../../images/founders/Deepika.jpg';
import durga from '../../images/founders/Durga.jpg';
import himanshu from '../../images/founders/Himanshu.png';
import razali from '../../images/founders/Razali.png';
import yashad from '../../images/founders/Yashad.jpg';
import videoset from '../../videos/video_set.mp4'

export default function HomePage() {
    return (
        <>
            <div>
            <div className="bg-image">
                <div id="credentials"> 
                <h1> Mission and Vision</h1>
                </div>
                <div className="mission"> 
                <p style={{color: 'white'}}>Edu-FX mission is to support United Nations Sustainable Development Goal 4.7 - Quality Education, Education for Sustainable Development and Global Citizenship Education. 
                </p>
                </div>
                <div className="mission"> 
                <p>ECO ACTION is an intuitive search engine that displays specific environmental  improvement solutions based on the environmental issue you search.</p>
                </div>
            </div>
            <div id="video">
                <video autoPlay loop muted>
                <source src={videoset} type="video/mp4" />
                </video>
            </div>
            <div id="stories"> 
                <div className="card">
                <div className="cardImg">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGkH3dJntupE71C8JsMoNJYmuxgtv4aoizqKL335zrtPibXDbL7I4vFPWVuN1nIgnEus&usqp=CAU" />
                </div>
                <div className="content">
                    <h3>Success Stories</h3>
                    <hr />
                    <h4>Category</h4>
                    <h3>solving water crisis</h3>
                    <p>REsolved water problem</p>
                </div>
                <div className="fill">
                    <a href="https://sensorex.com/blog/2020/05/26/effective-water-pollution-solutions-to-protect-our-environment/" target="_blank">
                    <button className="button">Read more</button>
                    </a>
                </div>
                </div>
                <div className="card">
                <div className="cardImg">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGkH3dJntupE71C8JsMoNJYmuxgtv4aoizqKL335zrtPibXDbL7I4vFPWVuN1nIgnEus&usqp=CAU" />
                </div>
                <div className="content">
                    <h3>Success Stories</h3>
                    <hr />
                    <h4>Category</h4>
                    <h3>solving water crisis</h3>
                    <p>REsolved water problem</p>
                </div>
                <div className="fill">
                    <a href="https://sensorex.com/blog/2020/05/26/effective-water-pollution-solutions-to-protect-our-environment/" target="_blank">
                    <button className="button">Read more</button>
                    </a>
                </div>
                </div>
                <div className="card">
                <div className="cardImg">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGkH3dJntupE71C8JsMoNJYmuxgtv4aoizqKL335zrtPibXDbL7I4vFPWVuN1nIgnEus&usqp=CAU" />
                </div>
                <div className="content">
                    <h3>Success Stories</h3>
                    <hr />
                    <h4>Category</h4>
                    <h3>solving water crisis</h3>
                    <p>REsolved water problem</p>
                </div>
                <div className="fill">
                    <a href="https://sensorex.com/blog/2020/05/26/effective-water-pollution-solutions-to-protect-our-environment/" target="_blank">
                    <button className="button">Read more</button>
                    </a>
                </div>
                </div>
                <div className="card">
                <div className="cardImg">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGkH3dJntupE71C8JsMoNJYmuxgtv4aoizqKL335zrtPibXDbL7I4vFPWVuN1nIgnEus&usqp=CAU" />
                </div>
                <div className="content">
                    <h3>Success Stories</h3>
                    <hr />
                    <h4>Category</h4>
                    <h3>solving water crisis</h3>
                    <p>REsolved water problem</p>
                </div>
                <div className="fill">
                    <a href="https://sensorex.com/blog/2020/05/26/effective-water-pollution-solutions-to-protect-our-environment/" target="_blank">
                    <button className="button">Read more</button>
                    </a>
                </div>
                </div>
            </div>
            <div className="founder-bg">
                <div id="founder">
                <div><h2>Founder</h2></div>
                <div><h2>Founder</h2></div>
                <div><h2>Advisor</h2></div>
                <div id="card-1" className="founder-card">
                    <img src={yamini} />
                    <p><b>Yamini Harikrishnan</b><br />
                    Product Owner | PMP® <br />
                    AI &amp; ML – IIT, HYD </p>
                    <a href="https://www.linkedin.com/in/yamini-harikrishnan/">
                    <i id="fdr-social-link" className="fa fa-2x fa-linkedin-square" />
                    </a> 
                </div>
                <div id="card-1" className="founder-card">
                    <img src={durga} />
                    <p><b>Durga Prasad</b><br />
                    Software Developer  <br />
                    AI &amp; ML – IIT, HYD </p>
                    <a href="https://www.linkedin.com/in/durga-prasad-mn-18200b113/">
                    <i id="fdr-social-link" className="fa fa-2x fa-linkedin-square" />
                    </a> 
                </div>
                <div id="card-1" className="founder-card">
                    <img src={razali} />
                    <p><br /><b>Razali Samsuddin</b><br />
                    Sustainability Lead <br />
                    Educator </p>
                    <a href="https://www.linkedin.com/in/razali-samsudin/">
                    <i id="fdr-social-link" className="fa fa-2x fa-linkedin-square" />
                    </a> 
                </div>
                <div id="card-1" className="founder-card">
                    <img src={deepika} />
                    <p><b>Deepika Nanduri </b><br />
                    Software Developer  <br />
                    AI &amp; ML – IIT, HYD </p>
                    <a href="https://www.linkedin.com/in/ratna-deepika-nanduri-80b2b120a/">
                    <i id="fdr-social-link" className="fa fa-2x fa-linkedin-square" />
                    </a> 
                </div>
                <div id="card-1" className="founder-card">
                    <img src={anshuman} />
                    <p><b>Anshuman Yashodhar Rangaraj </b><br />
                    Data Curation Specialist <br />
                    AI &amp; ML – IIT, HYD </p>
                    <a href="https://www.linkedin.com/in/anshuman-yashodhar-rangaraj-48162965/">
                    <i id="fdr-social-link" className="fa fa-2x fa-linkedin-square" />
                    </a> 
                </div>
                <div id="card-1" className="founder-card">
                    <img src={himanshu} />
                    <p><b>Himanshu Joshi</b><br />
                    Business Mentor <br />
                    MIT Enterprise Forum</p>
                    <a href="https://www.linkedin.com/in/himanshujoshimitsloan/">
                    <i id="fdr-social-link" className="fa fa-2x fa-linkedin-square" />
                    </a> 
                </div>
                <div id="card-1" className="founder-card">
                    <img src={chitrak} />
                    <p><b>Chitrak Banerjee </b><br />
                    Senior Technical Associate  <br />
                    AI &amp; ML – IIT, HYD </p>
                    <a href="https://www.linkedin.com/in/chitrak-banerjee-35132a152/">
                    <i id="fdr-social-link" className="fa fa-2x fa-linkedin-square" />
                    </a> 
                </div>
                <div id="card-1" className="founder-card">
                    <img src={yashad} />
                    <p><b>Yashad Samant </b><br />
                    Senior Data Scientist  <br />
                    <br />
                    </p>
                    <a href="https://www.linkedin.com/in/yashad-samant/">
                    <i id="fdr-social-link" className="fa fa-2x fa-linkedin-square" />
                    </a> 
                </div>
                <div id="card-1" className="founder-card">
                    <img src={arijit} />
                    <p><b>Arijit Hajjra</b><br />
                    CEO Think Again Lab <br />
                    <br />
                    </p>
                    <a href="https://www.linkedin.com/in/thinkerarijithajra/">
                    <i id="fdr-social-link" className="fa fa-2x fa-linkedin-square" />
                    </a> 
                </div>
                </div>
            </div>
            </div>
        </>
    )
}
