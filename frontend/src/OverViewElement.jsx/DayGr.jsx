import React from 'react';
import './DayGr.css'
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import webUrl from '../common/weburl';

const DayGr = () => {
    
    const [yData01, setYData01] = useState([0]);

    // 금월 일수를 가져오는 함수
    const getCurrentMonthDays = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        // 해당 월의 첫째 날부터 시작하여 마지막 날을 구합니다.
        const lastDay = new Date(year, month, 0).getDate();
        // 해당 월의 일 수를 배열로 생성합니다.
        const daysArray = Array.from({ length: lastDay }, (_, index) => (index + 1).toString().padStart(2,'0'));
        return daysArray // 문자열로 변환하여 반환합니다.
    };

    useEffect(()=>{
        const grDataCt = async () => {
            try {
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth() + 1;
                const tableName = `DATA_${year}_${month}_month`;
                const response = await axios.get(`http://${webUrl}:5032/gendata/${tableName}`);
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


    const xData02 = getCurrentMonthDays(); 

    const valueFormatter = (value) => `${value} [kWh]`;
    return (
        <div className="dayGrGp conBox">
            <BarChart
                xAxis={[{ scaleType: 'band', data: xData02, label: '(일)' }]}
                series={[
                    { data: yData01,
                        label:'일간 발전량', 
                    color:'#a3bcf1bd', valueFormatter} // 1
                ]}
                yAxis={[{label:'발전량(kWh)', labelStyle:{transform:`translateX(-220px) translateY(140px) rotate(-90deg)`}}]}
                margin={{left:80}}
            />
        </div>
    );
};

export default DayGr;