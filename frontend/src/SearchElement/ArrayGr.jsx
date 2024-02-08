import React from 'react';
import './ArrayGr.css'
import { BarChart } from '@mui/x-charts/BarChart';
import { FormControlLabel } from '@mui/material';
import { useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import XAxisData from './XAxisData';

const ArrayGr = () => {
    const xData=XAxisData();
    
    const arrayGrData = useSelector(state => state.item.arrayData); // Redux 스토어의 selectedOption 값을 가져옵니다.
    
    const [yData, setYData] = useState([0]);
    useEffect(()=>{
        const newYData = arrayGrData.map(item => parseFloat(item.R001) || 0);
        setYData(newYData);
    },[arrayGrData])
    
    
    const timeFromDateTime = (dateTimeString) => {
        // 'YYYY-MM-DD HH:mm:ss' 형식의 문자열에서 시간 부분을 추출합니다.
        const timeString = dateTimeString.split(' ')[1];
        // 시간 부분에서 초를 제외한 'HH:mm' 형식의 문자열을 반환합니다.
        return timeString.split(':').slice(0, 2).join(':');
    }

    /* const test = () => {
        const timeArray = timeFromDateTime(arrayGrData[10].date_time);
        console.log(arrayGrData[0].date_time)
        console.log(timeArray)
        console.log(yData);
    } */

    // const xData03 = ['01', '02','03','04','05','06','07','08','09','10','11','12',]
    // const yData03 = [38.1,0,0,0,0,0,0,0,0,0,0,0]

    const valueFormatter = (value) => `${value} [kWh]`;
    return (
        <div className="arrayGr">
            <BarChart
                margin={{right:200}}
                xAxis={[{ scaleType: 'band', data: xData, label: '(시)', /* min:`0:0`, max:`23:45` */
                }]}
                series={[
                    { data: yData,
                        label:'어레이별 발전량', 
                        color:'#a3bcf1bd', valueFormatter } // 1
                ]}
                slotProps={{
                    legend:{
                        direction: 'column',
                        position: {vertical: 'middle', horizontal:'right'}
                    }
                }}
                yAxis={[{label:'발전량(kWh)'}]}
            />
            
        </div>
    );
};

export default ArrayGr;