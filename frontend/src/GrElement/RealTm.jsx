import React from 'react';
import './RealTm.css'
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RealTm = () => {

    const value = 3.4;

    return (
        <div className="realTm">
            <div className="realGrTt gradientText">
                <p className="mark"></p>
                <p>금일 발전시간</p>
            </div>
            <div className="radialGp">
                <CircularProgressbar 
                    value={value} 
                    maxValue={4} 
                    text={`${value}h`} 
                    styles={buildStyles({
                        // Colors
                        pathColor: `#5486A0`,
                        textColor: '#4277FF',
                        trailColor: '#96D5E0',
                    })}
                />
            </div>
            <div className="grEff">
                <ul>
                    <li>전일 발전시간</li>
                    <li>3.7<span>h</span>
                    </li>
                </ul>
            </div>
        </div>

                
    );
};

export default RealTm;