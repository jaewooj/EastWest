import React from 'react';
import './TimeNtc.css'
import { useEffect,useState } from 'react';
import { IoMdClose } from "react-icons/io";

const TimeNtc = () => {

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // 1초마다 현재 시간을 업데이트
        const interval = setInterval(() => {
        setCurrentTime(new Date());
        }, 1000);

        // 컴포넌트 언마운트 시 타이머 정리
        return () => clearInterval(interval);
    }, []);

    const month = String(currentTime.getMonth()+1).padStart(2,'0');
    const day = String(currentTime.getDate()).padStart(2,'0');
    const hour = String(currentTime.getHours()).padStart(2,'0');
    const min = String(currentTime.getMinutes()).padStart(2,'0');
    const sec = String(currentTime.getSeconds()).padStart(2,'0');
    const realTime = `${currentTime.getFullYear()}.${month}.${day}. ${hour}:${min}:${sec}`;

    const [popup, setPopup] = useState(false);

    const popupOn = () => {
        setPopup(true);
    }
    const popupOff = () => {
        setPopup(false);
    }

    return (
        <div className="timeNtc">
            <div className="realTime">
                {realTime}
            </div>
            <div className="notice">
                <div className="ntcTt">
                    <div className="ntcTtAni">
                        <p>공지사항 : 장비관리에 주의 필요</p>

                    </div>
                    <img src="/images/more1.png" onClick={popupOn}/>
                </div>
            </div>
            {popup&&(
                <div className="moreBg" onClick={()=>popupOff()}></div>
            )}
            {popup&&(
                <div className="popupNtc">
                    <div class="popupHeader">
                        <h2>공지사항</h2>
                        <button onClick={()=>popupOff()}><IoMdClose /></button>
                    </div>
                    <div className="popupTable">
                        <table>
                            {/* <colgroup>
                                <col className="w1" />
                                <col className="w2" />
                                <col className="w3" />
                                <col className="w4" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">제목</th>
                                    <th scope="col">글쓴이</th>
                                    <th scope="col">작성시간</th>
                                </tr>
                            </thead> */}
                            <tbody>
                                <tr>
                                    <td>&nbsp;No&nbsp;</td>
                                    <td>제목</td>
                                    <td>&nbsp;글쓴이&nbsp;</td>
                                    <td>작성시간</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>모듈 어레이 온도 이상</td>
                                    <td>관리자</td>
                                    <td>2024-01-16</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>개발 테스트 중</td>
                                    <td>관리자</td>
                                    <td>2024-01-02</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            )}
        </div>
    );
};

export default TimeNtc;