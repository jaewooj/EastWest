import React from 'react';
import './OverView.css'
import GeneralCon from '../OverViewElement.jsx/GeneralCon';
import PowerFlow from '../OverViewElement.jsx/PowerFlow';
import TimeGr from '../OverViewElement.jsx/TimeGr';
import DayGr from '../OverViewElement.jsx/DayGr';
import MonGr from '../OverViewElement.jsx/MonGr';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useDispatch } from 'react-redux';
import { changeDashTimeItem } from '../store/modules/itemSlice';
import { index } from 'd3';

const OverView = () => {

    const [indexNum,setIndexNum] = useState(2);
    const [startStat,setStartStat] = useState();
    const [intervalId,setIntervalId] = useState(1);

    useEffect(()=>{
      // startInterval();
      return () => {
        clearInterval(startStat);
      };
    },[])

    const startInterval = () => {
      if(intervalId===1){
        const startIntervalId = setInterval(() => {
          setIndexNum((prevNum)=>(prevNum % 5)+1);
          // console.log(indexNum);
        }, 5000);
        setStartStat(startIntervalId);
        // console.log(startIntervalId);
      }
    }
    
    const stopInterval = () => {
      clearInterval(startStat);

    }

    const onGo = (num) => {
      stopInterval();
      // console.log('오류');
      setIndexNum(num);
      // console.log(intervalId);
      startInterval();
    }
    
    const mouseEnter = () => {
      stopInterval(); // 마우스가 올라갔을 때 setInterval 중지
      // console.log('stop');
    };

    const mouseLeave = () => {
      startInterval(); // 마우스가 떠났을 때 setInterval 재개
      // console.log('start');
    };

    return (
        <div className="overView">
            <div className="oVTop">
                <div className="overTt gradientText">
                    <p className="mark"></p>
                    <p>개요</p>
                </div>
                <div className="oVMenu">
                    <button className={indexNum===1?"menuBox menuBoxOn pWFlow":"menuBox"} onClick={()=>onGo(1)}>일반 현황</button>
                    <button className={indexNum===2?"menuBox menuBoxOn pWFlow":"menuBox"} onClick={()=>onGo(2)}>전력 흐름도</button>
                    <button className={indexNum===3?"menuBox menuBoxOn pWFlow":"menuBox"} onClick={()=>onGo(3)}>시간별 발전량</button>
                    <button className={indexNum===4?"menuBox menuBoxOn pWFlow":"menuBox"} onClick={()=>onGo(4)}>일자별 발전량</button>
                    <button className={indexNum===5?"menuBox menuBoxOn pWFlow":"menuBox"} onClick={()=>onGo(5)}>월별 발전량</button>
                </div>
            </div>
            <div className="oVCon" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                {
                indexNum===1?<GeneralCon/>:
                indexNum===2?<PowerFlow/>:
                indexNum===3?<TimeGr/>:
                indexNum===4?<DayGr/>:<MonGr/>}
                
            </div>
        </div>
    );
};

export default OverView;