import React, {useState, useEffect} from 'react';
import './GrCon.css'
import ApexCharts from 'apexcharts'
import RealGr from '../GrElement/RealGr';
import RealTm from '../GrElement/RealTm';
import DayGr from '../GrElement/DayGr';
import MonGr from '../GrElement/MonGr';
import YrGr from '../GrElement/YrGr';
import AccumGr from '../GrElement/AccumGr';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const GrCon = () => {

    const [realTimeGr, setRealTimeGr] = useState(0);
    const [realTimeGrTime, setRealTimeGrTime] = useState(0);
    const [prevRealTimeGrTime, setPrevRealTimeGrTime] = useState(0);
    const [dayGr,setDayGr] = useState(0);
    const [prevDayGr,setPrevDayGr] = useState(0);
    const [monthGr,setMonthGr] = useState(0);
    const [prevMonthGr,setPrevMonthGr] = useState(0);
    const [yearGr,setYearGr] = useState(0);
    const [prevYearGr,setPrevYearGr] = useState(0);
    const [accumGr,setAccumGr] = useState(0);

    useEffect(()=>{
        const realTimeGrCt = async () => {
            try {
                // RealGr
                const response = await axios.get(`http://localhost:5020/realtimeData`)
                setRealTimeGr(response.data[0].R060) // 검색결과를 상태에 저장

                // RealTm
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth() + 1;
                const day = now.getDate();
                const tableName = `DATA_${year}_${month}_${day}`;
                const response1 = await axios.get(`http://localhost:5041/grOverview/${tableName}`)
                // console.log(response1.data[0].columns_count);
                // const timeResults = (response1.data.results[0].columns_count/60).toFixed(1);
                const timeResults = (Number(response1.data.results/60)).toFixed(1);
                setRealTimeGrTime(timeResults);
                // console.log(response1.data[0].columns_count);
                // console.log(timeResults)

                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate()-1);
                const prevDay = yesterday.getDate();
                const prevTableName = `DATA_${year}_${month}_${prevDay}`;
                const response2 = await axios.get(`http://localhost:5041/grOverview/${prevTableName}`)
                // console.log(response2.data[0].columns_count);
                // const prevTimeResults = (response2.data.results[0].columns_count/60).toFixed(1);
                const prevTimeResults = (Number(response2.data.results/60)).toFixed(1);
                // console.log(prevTimeResults);
                setPrevRealTimeGrTime(prevTimeResults);

                // DayGr

                // console.log(response1.data.grResults[0].sum_r060);
                const dayGrResults = ((response1.data.grResults/60).toFixed(2));
                setDayGr(dayGrResults);

                // console.log(response2.data.grResults[0].sum_r060/60);
                const prevDayGrResults = ((response2.data.grResults/60).toFixed(2));
                setPrevDayGr(prevDayGrResults);
                
                // MonGr
                const realMonth = now.getMonth();
                const prevMonth = now.getMonth()-1;
                const yearTableName = `DATA_${year}_year`;
                const response3 = await axios.get(`http://localhost:5041/grOverview/${yearTableName}`)
                const monthGrResults = ((response3.data.yearResults[realMonth].R060));
                setMonthGr(monthGrResults);
                const prevMonthGrResults = ((response3.data.yearResults[prevMonth].R060));
                // console.log(monthGrResults);
                // 추후에 연도변경 시 자동 반영되도록 개발 필요
                setPrevMonthGr(prevMonthGrResults);
                
                // YrGr
                const yearResults = response3.data.yearResults.reduce((acc,arr)=>acc+Number(arr.R060),0);
                // console.log(yearResults);
                setYearGr(yearResults);
                const prevYear = now.getFullYear()-1;
                const prevYearTableName = `DATA_${prevYear}_year`;
                const response4 = await axios.get(`http://localhost:5041/grOverview/${prevYearTableName}`)
                const prevYearResults = response4?response4.data.yearResults.reduce((acc,arr)=>acc+Number(arr.R060),0):0;
                setPrevYearGr(prevYearResults);

                // AccumGr
                const accumTableName = `DATA_accum`;
                const response5 = await axios.get(`http://localhost:5041/grOverview/${accumTableName}`)
                const accumrResults = ((response5.data.accumResults[0].accum_R060));
                setAccumGr(accumrResults);

            } catch (error) {
                console.error('검색 오류 : ', error);
            }
        };
        realTimeGrCt();



    },[])

    var options = {
        chart: {
            height: 150,
            type: 'radialBar',
        },
        series: [50],
        labels: ['Progress'],
      }
      
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      
      chart.render();

    return (
        <div className="grCon">
            <div className="grConCd realGrTime">
                <RealGr realTimeGr={realTimeGr}/>
                <RealTm realTimeGrTime={realTimeGrTime} prevRealTimeGrTime={prevRealTimeGrTime}/>
            </div>
            <div className="grConCd dayMonGr">
                <DayGr dayGr={dayGr} prevDayGr={prevDayGr}/>
                <MonGr monthGr={monthGr} prevMonthGr={prevMonthGr}/>
            </div>
            <div className="grConCd yrSmGr">
                <YrGr yearGr={yearGr} prevYearGr={prevYearGr}/>
                <AccumGr accumGr={accumGr}/>
            </div>
        </div>
    );
};

export default GrCon;