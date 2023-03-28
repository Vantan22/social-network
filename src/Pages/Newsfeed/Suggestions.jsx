import React from 'react';
import './suggestions.css'
import img_person from '../../img/person-img/person-img.jpeg'
import img_user_suggest from '../../img/person-img/default-user-image.png'
import img_contact from '../../img/person-img/contact_img.png'
const Suggestions = () => {
    return (
        <div id="tab-users">
        
        <div className="suggest-user">
            <div className="suggest-user-header">
                <span className='title'>Suggestions for you</span>
                <a href=""> See all</a>
            </div>
            <div className="suggest-list">
                <div className="suggest-item">
                    <div className="suggest-info">
                        <div className="suggest-img">
                            <img src={img_user_suggest} alt="" className='suggest-item-img' />
                        </div>
                        <div className="suggest-text">
                            <span className='suggest-name'>person 1</span>
                            <span className='suggest-des'>Suggestions for you</span>
                        </div>
                    </div>
                    <div className='suggest-follow'>Follow</div>
                </div>
                <div className="suggest-item">
                    <div className="suggest-info">
                        <div className="suggest-img">
                            <img src={img_user_suggest} alt="" className='suggest-item-img' />
                        </div>
                        <div className="suggest-text">
                            <span className='suggest-name'>person 1</span>
                            <span className='suggest-des'>Suggestions for you</span>
                        </div>
                    </div>
                    <div className='suggest-follow'>Follow</div>
                </div>
                <div className="suggest-item">
                    <div className="suggest-info">
                        <div className="suggest-img">
                            <img src={img_user_suggest} alt="" className='suggest-item-img' />
                        </div>
                        <div className="suggest-text">
                            <span className='suggest-name'>person 1</span>
                            <span className='suggest-des'>Suggestions for you</span>
                        </div>
                    </div>
                    <div className='suggest-follow'>Follow</div>
                </div>
                <div className="suggest-item">
                    <div className="suggest-info">
                        <div className="suggest-img">
                            <img src={img_user_suggest} alt="" className='suggest-item-img' />
                        </div>
                        <div className="suggest-text">
                            <span className='suggest-name'>person 1</span>
                            <span className='suggest-des'>Suggestions for you</span>
                        </div>
                    </div>
                    <div className='suggest-follow'>Follow</div>
                </div>
                <div className="suggest-item">
                    <div className="suggest-info">
                        <div className="suggest-img">
                            <img src={img_user_suggest} alt="" className='suggest-item-img' />
                        </div>
                        <div className="suggest-text">
                            <span className='suggest-name'>person 1</span>
                            <span className='suggest-des'>Suggestions for you</span>
                        </div>
                    </div>
                    <div className='suggest-follow'>Follow</div>
                </div>
            </div>
        </div>
        <div className="contact">
            <div className="contact-header">
                <span className='title'>Contact</span>
            </div>
            <div className="contact-user">
                <div className="contact-img">
                    <img src={img_contact} alt="" />
                </div>
                <span className='contact-name'>Person 5</span>
            </div>
            <div className="contact-user">
                <div className="contact-img">
                    <img src={img_contact} alt="" />
                </div>
                <span className='contact-name'>Person 5</span>
            </div>
            <div className="contact-user">
                <div className="contact-img">
                    <img src={img_contact} alt="" />
                </div>
                <span className='contact-name'>Person 5</span>
            </div>
            <div className="contact-user">
                <div className="contact-img">
                    <img src={img_contact} alt="" />
                </div>
                <span className='contact-name'>Person 5</span>
            </div>
            <div className="contact-user">
                <div className="contact-img">
                    <img src={img_contact} alt="" />
                </div>
                <span className='contact-name'>Person 5</span>
            </div>
            <div className="contact-user">
                <div className="contact-img">
                    <img src={img_contact} alt="" />
                </div>
                <span className='contact-name'>Person 5</span>
            </div>
            <div className="contact-user">
                <div className="contact-img">
                    <img src={img_contact} alt="" />
                </div>
                <span className='contact-name'>Person 5</span>
            </div>
        </div>
    </div>
    );
};

export default Suggestions;
