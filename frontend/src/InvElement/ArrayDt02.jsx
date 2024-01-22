import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ArrayDt02.css'


const ArrayDt02 = () => {
    const value = 4.1;

    return (
        <div className="arrayConDt">
            <div className="arrayTtGp">
                <div className="arrayTt gradientText">
                    <p className="mark"></p>
                    <p>ARRAY 1-2</p>
                </div>
                <div className="arrRadialGp">
                    <CircularProgressbar 
                        value={value} 
                        maxValue={4.95} 
                        text={`${value}kW`} 
                        styles={buildStyles({
                            // Colors
                            pathColor: `#5486A0`,
                            textColor: '#4277FF',
                            trailColor: '#96D5E0',
                        })}
                    />
                </div>
            </div>
            <div className="arrayTable">
                <table>
                    <tbody>
                        <tr>
                            <td>모듈 수</td>
                            <td>전압</td>
                            <td>전류</td>
                            <td>발전량</td>
                            <td>금일 누적 발전량</td>
                            <td>전체 누적 발전량</td>
                        </tr>
                        <tr>
                            <td>15EA</td>
                            <td>412V</td>
                            <td>159.4A</td>
                            <td>57.7kW</td>
                            <td>123kWh</td>
                            <td>35,585KWh</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ArrayDt02;