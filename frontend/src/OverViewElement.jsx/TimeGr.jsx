import React from 'react';
import './TimeGr.css'
import { BarChart } from '@mui/x-charts/BarChart';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios'; // axios import 추가

const TimeGr = () => {

    const [searchResults,setSearchResults] = useState([]);
    const xData01 = ['01', '02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24']
    const [yData01, setYData01] = useState([0]);

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
            } catch (error) {
                console.error('발전량 가져오기 오류 : ', error);
            }
        }
        grDataCt();
    }, []); // 여기서 의존성 배열을 비워두면 최초 한 번만 호출됩니다.
    
    useEffect(() => {
        const timeGenData = searchResults;
    
        if (timeGenData && timeGenData.length > 0) {
            const newData = timeGenData.reduce((acc, cur) => {
                if (cur.R060) {
                    const value = parseFloat(cur.R060);
                    acc.push(value);
                }
                return acc;
            }, []);
    
            const sumBy15Minutes = [];
            for (let i = 0; i < newData.length; i += 4) {
                const sum = newData.slice(i, i + 4).reduce((a, b) => a + b, 0);
                sumBy15Minutes.push(sum);
            }
    
            setYData01(sumBy15Minutes);
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
                yAxis={[{label:'발전량(kWh)'}]}
            />
        </div>
    );
};

export default TimeGr;