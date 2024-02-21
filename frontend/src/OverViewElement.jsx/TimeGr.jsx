import React from 'react';
import './TimeGr.css'
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import axios from 'axios'; // axios import 추가
import XAxisData from '../SearchElement/XAxisData';

const TimeGr = () => {

    const xData=XAxisData();

    const [searchResults,setSearchResults] = useState([]);
    const xData01 = ['01', '02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
    const [yData01, setYData01] = useState([0]);
    // 데이터 요청 및 수신
    useEffect(() => {
        const grDataCt = async () => {
            try {
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth() + 1;
                const day = now.getDate();
                const tableName = `DATA_${year}_${month}_${day}_hour`;
                const response = await axios.get(`http://localhost:5031/gendata/${tableName}`);
                setSearchResults(response.data);
                // console.log(response.data)
            } catch (error) {
                console.error('발전량 가져오기 오류 : ', error);
            }
        }
        grDataCt();
    }, []); // 여기서 의존성 배열을 비워두면 최초 한 번만 호출됩니다.
    
    // 데이터 연산 후 차트로 전달 
    useEffect(() => {
        
        let timeGenData = searchResults;
        // console.log(timeGenData)
        const timeFromDateTime = (dateTimeString) => {
            if (!dateTimeString) return ''; // dateTimeString이 없으면 빈 문자열 반환
            // 'YYYY-MM-DD HH:mm:ss' 형식의 문자열에서 시간 부분을 추출합니다.
            const timeString = dateTimeString.split(' ')[1];
            // 시간 부분에서 초를 제외한 'HH:mm' 형식의 문자열을 반환합니다.
            return timeString.split(':').slice(0, 2).join(':');
        }
        
        // JSON 데이터에서 시간 정보만 추출하여 배열로 변환
        const jsonTimes = timeGenData.map(item => timeFromDateTime(item.date_time));

        // xData와 jsonTimes를 비교하여 동일한 시간의 발전량을 가져오는 함수
        const getYData = () => {
            const newYData = xData.map(time => {
                // xData의 각 시간이 jsonTimes 배열에 포함되어 있는지 확인
                const index = jsonTimes.indexOf(time);
                if (index !== -1) {
                    // 해당 시간의 발전량을 반환하거나, 기본값인 0을 반환
                    return parseFloat(timeGenData[index].R060) || 0;
                } else {
                    return 0;
                }
            });
            return newYData;
        };
        // console.log(getYData());
        // 데이터 합산
        if (getYData() && getYData().length > 0) {
    
            const avgByhour = [];
            for (let i = 1; i < getYData().length; i += 4) {
                const sum = getYData().slice(i, i + 4).reduce((a, b) => a + b, 0);
                
                // console.log(sum)
                const avg = sum/4;
                // console.log(avg)
                avgByhour.push(avg.toFixed(2));
            }
            if(avgByhour.length!==0){
                setYData01(avgByhour);
                // console.log(avgByhour);
            }
        }
    }, [searchResults]); // 여기서 의존성 배열에 searchResults를 추가합니다.

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
                yAxis={[{label:'발전량(kWh)', labelStyle:{transform:`translateX(-220px) translateY(140px) rotate(-90deg)`}}]}
                margin={{left:80}}
            />
        </div>
    );
};

export default TimeGr;