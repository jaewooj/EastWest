import React, {useState, useEffect} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ArrayDt02.css'
import axios from 'axios';


const ArrayDt02 = ({invTitle,rtData}) => {
    
    const [grData,setGrData] = useState(0);
    const [vtData,setVtData] = useState(0);
    const [ctData,setCtData] = useState(0);
    const [arrayTitle,setArrayTitle] = useState('');
    useEffect(()=>{
        if(invTitle==='인버터 1'){
            setArrayTitle('1');
            setGrData(rtData.R004);
            setVtData(rtData.R005);
            setCtData(rtData.R006);
            console.log(invTitle);
        } else if(invTitle==='인버터 2'){
            setArrayTitle('2');
            setGrData(rtData.R013);
            setVtData(rtData.R014);
            setCtData(rtData.R015);
        } else if(invTitle==='인버터 3'){
            setArrayTitle('3');
            setGrData(rtData.R023);
            setVtData(rtData.R024);
            setCtData(rtData.R025);

        } else if(invTitle==='인버터 4'){
            setArrayTitle('4');
            setGrData(rtData.R043);
            setVtData(rtData.R044);
            setCtData(rtData.R045);

        }


    }, []);
    const maxValue = 3.3;

    return (
        <div className="arrayConDt">
            <div className="arrayTtGp">
                <div className="arrayTt gradientText">
                    <p className="mark"></p>
                    <p>ARRAY {arrayTitle}-2</p>
                </div>
                <div className="arrRadialGp">
                    <CircularProgressbar 
                        value={grData} 
                        maxValue={maxValue} 
                        text={`${grData}kW`} 
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
                            <td>{vtData}V</td>
                            <td>{ctData}A</td>
                            <td>{grData}kW</td>
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