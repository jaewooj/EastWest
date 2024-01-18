import React from 'react';
import './MonGr.css'
import { BarChart } from '@mui/x-charts/BarChart';

const MonGr = () => {
    
    const xData03 = ['01', '02','03','04','05','06','07','08','09','10','11','12',]
    const yData03 = [38.1,0,0,0,0,0,0,0,0,0,0,0]
    return (
        <div className="monGrGp conBox">
            <BarChart
                xAxis={[{ scaleType: 'band', data: xData03 }]}
                series={[
                    { data: yData03 } // 1
                ]}
            />

        </div>
    );
};

export default MonGr;