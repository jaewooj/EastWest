import React from 'react';
import './TimeGr.css'
import { BarChart } from '@mui/x-charts/BarChart';

const TimeGr = () => {

    const xData01 = ['01', '02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24',]
    const yData01 = [0,0,0,0,0,0,0,0.1,0.7,2.4,3.2,3.6,3.5,3.7,0,0,0,0,0,0,0,0,0,0]

    const valueFormatter = (value) => `${value} [kWh]`;

    return (
        <div className="timeGr conBox">
            <BarChart
                xAxis={[{ scaleType: 'band', data: xData01, label: '(시)'}]}
                series={[
                    { data: yData01, 
                        label:'시간당 발전량', 
                        color:'#4e79a7', valueFormatter} // 1
                ]}
                yAxis={[{label:'발전량(kWh)'}]}
            />
        </div>
    );
};

export default TimeGr;