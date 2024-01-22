import React from 'react';
import './MonGr.css'
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const MonGr = () => {

    const value = 5353.3;

    return (
        <div className="monGr">
            <div className="realGrTt gradientText">
                <p className="mark"></p>
                <p>금월 발전량</p>
            </div>
            <div className="radialGp">
                <CircularProgressbar 
                    value={value} 
                    maxValue={12325.2} 
                    text={`${value}h`} 
                    styles={buildStyles({
                        // Colors
                        pathColor: `#5C9FE7`,
                        textColor: '#4277FF',
                        trailColor: '#d0d0d0',
                    })}
                />
            </div>
            <div className="grEff">
                <ul>
                    <li>전월 발전량</li>
                    <li>12325.2<span>KWh</span>
                    </li>
                </ul>
            </div>
        </div>

                
    );
};

export default MonGr;