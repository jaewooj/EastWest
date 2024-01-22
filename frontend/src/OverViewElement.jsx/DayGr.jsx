import React from 'react';
import './DayGr.css'
import { BarChart } from '@mui/x-charts/BarChart';

const DayGr = () => {

    const xData02 = ['01', '02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31',]
    const yData02 = [17.9,11.6,8.5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    const valueFormatter = (value) => `${value} [kWh]`;
    return (
        <div className="dayGrGp conBox">
            <BarChart
                xAxis={[{ scaleType: 'band', data: xData02, label: '(일)' }]}
                series={[
                    { data: yData02,
                        label:'일간 발전량', 
                    color:'#a3bcf1bd', valueFormatter} // 1
                ]}
                yAxis={[{label:'발전량(kWh)'}]}
            />
        </div>
    );
};

export default DayGr;