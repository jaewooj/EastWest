import React from 'react';
import './IntegratedGr.css'
import { BarChart } from '@mui/x-charts/BarChart';

const IntegratedGr = () => {
    
    const xData03 = ['01', '02','03','04','05','06','07','08','09','10','11','12',]
    const yData03 = [38.1,0,0,0,0,0,0,0,0,0,0,0]
    
    const valueFormatter = (value) => `${value} [kWh]`;

    return (
        <div className="integratedGr">
        <BarChart
            margin={{right:200}}
            xAxis={[{ scaleType: 'band', data: xData03, label: '(시)' }]}
            series={[
                { data: yData03,
                    label:'전체 발전량', 
                    color:'#4e79a7', valueFormatter } // 1
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

export default IntegratedGr;