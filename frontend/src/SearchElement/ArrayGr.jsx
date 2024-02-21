import React from 'react';
import './ArrayGr.css'
import { BarChart } from '@mui/x-charts/BarChart';
import { FormControlLabel } from '@mui/material';
import { useSelector, useDispatch} from 'react-redux';
import { useState, useEffect } from 'react';
import XAxisData from './XAxisData';
import { setTotalDataExcel, setXData, setYDataExcel } from '../store/modules/itemSlice';

const ArrayGr = () => {
    const dispatch = useDispatch();
    const xData=XAxisData();
    const arrayGrData = useSelector(state => state.item.arrayData); // Redux 스토어의 selectedOption 값을 가져옵니다.
    const [yData1, setYData1] = useState([0]);
    const [yData2, setYData2] = useState([0]);

    // 시간대 비교를 통한 결과 데이터 출력
    useEffect(()=>{
        const timeFromDateTime = (dateTimeString) => {
            if (!dateTimeString) return ''; // dateTimeString이 없으면 빈 문자열 반환
            // 'YYYY-MM-DD HH:mm:ss' 형식의 문자열에서 시간 부분을 추출합니다.
            const timeString = dateTimeString.split(' ')[1];
            // 시간 부분에서 초를 제외한 'HH:mm' 형식의 문자열을 반환합니다.
            return timeString.split(':').slice(0, 2).join(':');
        }


        // JSON 데이터에서 시간 정보만 추출하여 배열로 변환
        const jsonTimes = arrayGrData.map(item => timeFromDateTime(item.date_time));

        // xData와 jsonTimes를 비교하여 동일한 시간의 발전량을 가져오는 함수
        const array1YData = () => {
            const newYData = xData.map(time => {
                // xData의 각 시간이 jsonTimes 배열에 포함되어 있는지 확인
                const index = jsonTimes.indexOf(time);
                if (index !== -1) {
                    // 해당 시간의 발전량을 반환하거나, 기본값인 0을 반환
                    return parseFloat(arrayGrData[index].R001) || 0;
                } else {
                    return 0;
                }
            });
            return newYData;
        };
        const array2YData = () => {
            const newYData = xData.map(time => {
                // xData의 각 시간이 jsonTimes 배열에 포함되어 있는지 확인
                const index = jsonTimes.indexOf(time);
                if (index !== -1) {
                    // 해당 시간의 발전량을 반환하거나, 기본값인 0을 반환
                    return parseFloat(arrayGrData[index].R004) || 0;
                } else {
                    return 0;
                }
            });
            return newYData;
        };

        setYData1(array1YData());
        setYData2(array2YData());
        // 엑셀 
        dispatch(setXData(xData));
        dispatch(setTotalDataExcel({array1:array1YData(),array2:array2YData()}))
    }, [arrayGrData]);
    
    

    const valueFormatter = (value) => `${value} [kWh]`;
    return (
        <div className="arrayGr">
            <BarChart
                margin={{right:200}}
                xAxis={[{ scaleType: 'band', data: xData, label: '(시)', /* min:`0:0`, max:`23:45` */
                }]}
                series={[
                    // 어레이1-1
                    { data: yData1,
                        label:'어레이1-1 발전량',
                        stack: 'A', 
                        color:'#a3bcf1bd', valueFormatter },
                    // 어레이1-2
                    { data: yData2,
                        label:'어레이1-2 발전량', 
                        stack: 'A',
                        color:'#c1aac2ff', valueFormatter }
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

export default ArrayGr;