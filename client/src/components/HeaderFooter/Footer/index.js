import React from 'react';
import Fontawesome from '@fortawesome/react-fontawesome';
import { faCompass, faPhone, faClock, faEnvelope } from '@fortawesome/fontawesome-free-solid';

const Footer = () => {
    return (
        <footer className='bck_b_dark'>
            <div className="container">
                <div className="logo">Waves</div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Contact information</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <Fontawesome
                                    icon={faCompass}
                                    className='icon'
                                />
                                <div className="nfo">
                                    <div>Address</div>
                                    <div>Kramer 123</div>
                                </div>
                            </div>
                            <div className="tag">
                                <Fontawesome
                                    icon={faPhone}
                                    className='icon'
                                />
                                <div className="nfo">
                                    <div>Phone</div>
                                    <div>917 158 587</div>
                                </div>
                            </div>
                            <div className="tag">
                                <Fontawesome
                                    icon={faClock}
                                    className='icon'
                                />
                                <div className="nfo">
                                    <div>Working hours</div>
                                    <div>Mon-Sun / 9am-8pm</div>
                                </div>
                            </div>
                            <div className="tag">
                                <Fontawesome
                                    icon={faEnvelope}
                                    className='icon'
                                />
                                <div className="nfo">
                                    <div>Email</div>
                                    <div>infor@waves.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="left">
                        <h2>Be the first to know</h2>
                        <div>
                            <div>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;