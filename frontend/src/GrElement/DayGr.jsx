import React from 'react';
import './DayGr.css'
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DayGr = () => {

    const value = 341.8;

    return (
        <div className="dayGr">
            <div className="realGrTt gradientText">
                <p className="mark"></p>
                <p>금일 발전량</p>
            </div>
            <div className="radialGp">
                <CircularProgressbar 
                    value={value} 
                    maxValue={500} 
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
                    <li>전일 발전량</li>
                    <li>476.6<span>kWh</span>
                    </li>
                </ul>
            </div>
        </div>

                
    );
};

export default DayGr;