import React from 'react';
import './MonGr.css'
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import axios from 'axios'; 

const MonGr = () => {
    
    const [yData01, setYData01] = useState([0]);

    const xData03 = ['01', '02','03','04','05','06','07','08','09','10','11','12',]
    
    useEffect(()=>{
        const grDataCt = async () => {
            try {
                const now = new Date();
                const year = now.getFullYear();
                const tableName = `DATA_${year}_year`;
                const response = await axios.get(`http://localhost:5033/gendata/${tableName}`);
                // setSearchResults(response.data);
                // console.log(response.data)
                const newYData = response.data.map(item=>{
                    return parseFloat(item.R060)
                })
                setYData01(newYData)
                // console.log(newYData);
            } catch (error) {
                console.error('발전량 가져오기 오류 : ', error);
            }
        }
        grDataCt();
    },[])

    const valueFormatter = (value) => `${value} [kWh]`;

    return (
        <div className="monGrGp conBox">
            <BarChart
                xAxis={[{ scaleType: 'band', data: xData03, label: '(월)'}]}
                series={[
                    { data: yData01,
                        label:'월간 발전량', 
                        color:'#46cabfac', valueFormatter 
                    }, // 1
                ]}
                yAxis={[{label:'발전량(kWh)', labelStyle:{transform:`translateX(-220px) translateY(140px) rotate(-90deg)`}}]}
                margin={{left:80}}
            />

        </div>
    );
};

export default MonGr;