import React from 'react';
import './InverterGr.css';
import { BarChart } from '@mui/x-charts/BarChart';

const InverterGr = () => {
    
    const xData03 = []
    const yData03 = [0]
    
    const valueFormatter = (value) => `${value} [kWh]`;
    return (
        <div className="inverterGr">
        <BarChart
            margin={{right:200}}
            xAxis={[{ scaleType: 'band', data: xData03, label: '(시)' }]}
            series={[
                { data: yData03,
                    label:'인버터별 발전량', 
                    color:'#46cabfac', valueFormatter } // 1
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

export default InverterGr;