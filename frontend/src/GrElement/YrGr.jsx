import React from 'react';
import './YrGr.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const YrGr = () => {

    const value = 33.8;

    return (
        <div className="yrGr">
            <div className="realGrTt gradientText">
                <p className="mark"></p>
                <p>년간 발전량</p>
            </div>
            <div className="radialGp">
                <CircularProgressbar 
                    value={value} 
                    maxValue={146.2} 
                    text={`${value}MWh`} 
                    styles={buildStyles({
                        // Colors
                        pathColor: `#5486A0`,
                        textColor: '#4277FF',
                        trailColor: '#d0d0d0',
                    })}
                />
            </div>
            <div className="grEff">
                <ul>
                    <li>전년 발전량</li>
                    <li>146.2<span>MWh</span>
                    </li>
                </ul>
            </div>
        </div>

                
    );
};

export default YrGr;