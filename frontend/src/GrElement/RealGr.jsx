import React from 'react';
import './RealGr.css'
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RealGr = () => {

    const value = 0.818;

    return (
        <div className="realGr">
            <div className="realGrTt gradientText">
                <p className="mark"></p>
                <p>현재 출력</p>
            </div>
            <div className="radialGp">
                <CircularProgressbar 
                    value={value} 
                    maxValue={1} 
                    text={`${value * 100}kW`} 
                    styles={buildStyles({
                        // Colors
                        pathColor: `#5D8BF6`,
                        textColor: '#4277FF',
                        trailColor: '#d0d0d0',
                    })}
                />
            </div>
            <div className="grEff">
                <ul>
                    <li>발전효율</li>
                    <li>81.8<span>%</span>
                    </li>
                </ul>
            </div>
        </div>

                
    );
};

export default RealGr;