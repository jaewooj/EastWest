import React from 'react';
import { Link } from 'react-router-dom';
import './Title.css'

const Title = () => {


    return (
        <div className="title">
            <div className="logoBox">
                <a href="#">
                    <img src="/images/logo.png"/>
                </a>
            </div>
            <div className="swTitle">
                <h2 className='gradientText'>태양광발전모니터링시스템</h2>
            </div>
        </div>
    );
};

export default Title;