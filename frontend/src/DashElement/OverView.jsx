import React from 'react';
import './OverView.css'
import GeneralCon from '../OverViewElement.jsx/GeneralCon';
import PowerFlow from '../OverViewElement.jsx/PowerFlow';
import TimeGr from '../OverViewElement.jsx/TimeGr';
import DayGr from '../OverViewElement.jsx/DayGr';
import MonGr from '../OverViewElement.jsx/MonGr';
import { useState } from 'react';

const OverView = () => {

    const [indexNum,setIndexNum] = useState(2);

    const onGo = (num) =>{
        setIndexNum(num)
    }

    return (
        <div className="overView">
            <div className="oVTop">
                <div className="overTt gradientText">
                    <p className="mark"></p>
                    <p>개요</p>
                </div>
                <div className="oVMenu">
                    <button className={indexNum===1?"menuBox menuBoxOn pWFlow":"menuBox"} onClick={()=>onGo(1)}>전력 흐름도</button>
                    <button className={indexNum===2?"menuBox menuBoxOn pWFlow":"menuBox"} onClick={()=>onGo(2)}>일반 현황</button>
                    <button className={indexNum===3?"menuBox menuBoxOn pWFlow":"menuBox"} onClick={()=>onGo(3)}>시간별 발전량</button>
                    <button className={indexNum===4?"menuBox menuBoxOn pWFlow":"menuBox"} onClick={()=>onGo(4)}>일자별 발전량</button>
                    <button className={indexNum===5?"menuBox menuBoxOn pWFlow":"menuBox"} onClick={()=>onGo(5)}>월별 발전량</button>
                </div>
            </div>
            <div className="oVCon">
                {indexNum===1?<PowerFlow/>:
                indexNum===2?<GeneralCon/>:
                indexNum===3?<TimeGr/>:
                indexNum===4?<DayGr/>:<MonGr/>}
                
            </div>
        </div>
    );
};

export default OverView;