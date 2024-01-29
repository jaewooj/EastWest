import React from 'react';
import './OverView.css'
import GeneralCon from '../OverViewElement.jsx/GeneralCon';
import PowerFlow from '../OverViewElement.jsx/PowerFlow';
import TimeGr from '../OverViewElement.jsx/TimeGr';
import DayGr from '../OverViewElement.jsx/DayGr';
import MonGr from '../OverViewElement.jsx/MonGr';
import { useState, useEffect } from 'react';

const OverView = () => {

    const [indexNum,setIndexNum] = useState(1);
    const [intervalId, setIntervalId] = useState(null);

    const startInterval = () => {
        const id = setInterval(() => {
          // indexNum를 5초마다 변경하는 로직
          setIndexNum((prevIndex) => (prevIndex === 5 ? 1 : prevIndex + 1));
        }, 5000);
    
        // 현재 intervalId 상태를 업데이트
        setIntervalId(id);
      };
    
      const stopInterval = () => {
        // 현재 intervalId가 존재하면 clearInterval 호출하여 중지
        if (intervalId) {
          clearInterval(intervalId);
          // intervalId 상태를 초기화
          setIntervalId(null);
        }
      };
      const startStopInterval = () => {
        stopInterval();
      }
      const startStartInterval = () => {
        startInterval();
      }

    const onGo = (num) =>{
        // 기존의 setInterval 중지
        stopInterval();
    
        // indexNum 설정
        setIndexNum(num);
    
        // 새로운 setInterval 시작
        startInterval();
    }

    useEffect(() => {
        // 컴포넌트가 언마운트될 때 clearInterval 호출하여 메모리 누수 방지
        return () => startInterval();
      }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 함
    
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
            <div className="oVCon" onMouseEnter={startStopInterval} onMouseLeave={startStartInterval}>
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