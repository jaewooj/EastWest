import React from 'react';
import './AccumGr.css'
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const AccumGr = () => {

    const value = 180.1;

    return (
        <div className="accumGr">
            <div className="realGrTt gradientText">
                <p className="mark"></p>
                <p>누적 발전량</p>
            </div>
            <div className="radialGp">
                <CircularProgressbar 
                    value={value} 
                    maxValue={200} 
                    text={`${value}h`} 
                    styles={buildStyles({
                        // Colors
                        pathColor: `#9880FA`,
                        textColor: '#4277FF',
                        trailColor: '#d0d0d0',
                    })}
                />
            </div>
            <div className="grEff">
                <ul>
                    <li>CO2 절감량</li>
                    <li>80.3<span>ton</span>
                    </li>
                </ul>
            </div>
        </div>

                
    );
};

export default AccumGr;