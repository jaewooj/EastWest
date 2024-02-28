import React, {useState, useEffect} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ArrayDt01.css'
import axios from 'axios';

const ArrayDt01 = ({invTitle,rtData}) => {
    
    const [grData,setGrData] = useState(0);
    const [vtData,setVtData] = useState(0);
    const [ctData,setCtData] = useState(0);
    const [arrayTitle,setArrayTitle] = useState('');
    useEffect(()=>{
        if(invTitle==='인버터 1'){
            setArrayTitle('1');
            setGrData(rtData.R001);
            setVtData(rtData.R002);
            setCtData(rtData.R003);
            // console.log(invTitle);
        } else if(invTitle==='인버터 2'){
            setArrayTitle('2');
            setGrData(rtData.R010);
            setVtData(rtData.R011);
            setCtData(rtData.R012);
        } else if(invTitle==='인버터 3'){
            setArrayTitle('3');
            setGrData(rtData.R020);
            setVtData(rtData.R021);
            setCtData(rtData.R022);

        } else if(invTitle==='인버터 4'){
            setArrayTitle('4');
            setGrData(rtData.R040);
            setVtData(rtData.R041);
            setCtData(rtData.R042);

        }

    }, []);

    const maxVlue = 3.3;
    return (
        <div className="arrayConDt">
            <div className="arrayTtGp">
                <div className="arrayTt gradientText">
                    <p className="mark"></p>
                    <p>ARRAY {arrayTitle}-1</p>
                </div>
                <div className="arrRadialGp">
                    <CircularProgressbar 
                        value={grData} 
                        maxValue={maxVlue} 
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

export default ArrayDt01;