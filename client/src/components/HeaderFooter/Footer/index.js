import React from 'react';
import Fontawesome from '@fortawesome/react-fontawesome';
import { faCompass, faPhone, faClock, faEnvelope } from '@fortawesome/fontawesome-free-solid';

const Footer = ({data}) => {
    return (
        data.siteData ?
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
                                        <div>{data.siteData[0].address}</div>
                                    </div>
                                </div>
                                <div className="tag">
                                    <Fontawesome
                                        icon={faPhone}
                                        className='icon'
                                    />
                                    <div className="nfo">
                                        <div>Phone</div>
                                        <div>{data.siteData[0].phone}</div>
                                    </div>
                                </div>
                                <div className="tag">
                                    <Fontawesome
                                        icon={faClock}
                                        className='icon'
                                    />
                                    <div className="nfo">
                                        <div>Working hours</div>
                                        <div>{data.siteData[0].hours}</div>
                                    </div>
                                </div>
                                <div className="tag">
                                    <Fontawesome
                                        icon={faEnvelope}
                                        className='icon'
                                    />
                                    <div className="nfo">
                                        <div>Email</div>
                                        <div>{data.siteData[0].email}</div>
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
        : null
    );
};

export default Footer;