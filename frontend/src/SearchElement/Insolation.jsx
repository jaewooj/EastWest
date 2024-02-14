import React from 'react';
import './Insolation.css';
import { BarChart } from '@mui/x-charts/BarChart';
import XAxisData from './XAxisData';

const Insolation = () => {
    const xData=XAxisData();
    
    const yData03 = [0]
    
    const valueFormatter = (value) => `${value} [단위]`;

    return (
        <div className="insolation">
        <BarChart
            margin={{right:200}}
            xAxis={[{ scaleType: 'band', data: xData, label: '(시)' }]}
            series={[
                { data: yData03,
                    label:'일사량', 
                    color:'#E3AA59', valueFormatter } // 1
            ]}
            slotProps={{
                legend:{
                    direction: 'column',
                    position: {vertical: 'middle', horizontal:'right'}
                }
            }}
            yAxis={[{label:'일사량(m2/W)'}]}
        />
            
        </div>
    );
};

export default Insolation;