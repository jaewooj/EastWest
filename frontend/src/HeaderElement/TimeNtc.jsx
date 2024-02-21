import React from 'react';
import './TimeNtc.css'
import { useEffect,useState } from 'react';
import { IoMdClose } from "react-icons/io";
import NtcItem from './NtcItem';

const TimeNtc = () => {

    const ITEMS_PER_PAGE = 6; // 한 페이지에 보여줄 아이템 개수
    const [currentPage, setCurrentPage] = useState(1);
    const [isClicked, setIsClicked] = useState(1);

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
        setCurrentPage(1);
    }
    const data = [
        {
            no:1,
            title:'모듈 어레이 온도 이상',
            writer:'관리자',
            time:'2024-01-02',
        },
        {
            no:2,
            title:'모듈 어레이 온도 이상',
            writer:'관리자',
            time:'2024-01-16',
        },
        {
            no:3,
            title:'모듈 어레이 온도 이상',
            writer:'관리자',
            time:'2024-01-17',
        },
        {
            no:4,
            title:'모듈 어레이 1-2 온도 이상',
            writer:'관리자',
            time:'2024-01-18',
        },
        {
            no:5,
            title:'모듈 어레이 2-2 온도 이상',
            writer:'관리자',
            time:'2024-01-19',
        },
        {
            no:6,
            title:'모듈 어레이 온도 이상',
            writer:'관리자',
            time:'2024-01-20',
        },
        {
            no:7,
            title:'모듈 어레이 온도 이상',
            writer:'관리자',
            time:'2024-01-21',
        },
        {
            no:8,
            title:'모듈 어레이 온도 이상',
            writer:'관리자',
            time:'2024-02-21',
        },
        {
            no:9,
            title:'모듈 어레이 온도 이상',
            writer:'관리자',
            time:'2024-02-21',
        },
        /* {
            no:10,
            title:'모듈 어레이 온도 이상',
            writer:'관리자',
            time:'2024-02-21',
        },
        {
            no:11,
            title:'모듈 어레이 온도 이상',
            writer:'관리자',
            time:'2024-02-21',
        },
        {
            no:12,
            title:'모듈 어레이 온도 이상',
            writer:'관리자',
            time:'2024-02-21',
        },
        {
            no:13,
            title:'모듈 어레이 온도 이상',
            writer:'관리자',
            time:'2024-02-21',
        },
        {
            no:14,
            title:'모듈 어레이 온도 이상',
            writer:'관리자',
            time:'2024-02-21',
        }, */
    ]
    const reverseData = data.reverse();
    const [currentData, setCurrentData] = useState([]);
    useEffect(() => {
        setCurrentData(reverseData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE));
    }, [currentPage]);

    const totalPages = Math.ceil(reverseData.length / ITEMS_PER_PAGE);

    // 페이지 이동 함수
    const goToPage = (page) => {
        setCurrentPage(page);
        setIsClicked(page);
    };

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
                                {
                                    currentData.map(item=><NtcItem key={item.no} item={item}/>)
                                }
                                {/* <tr>
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
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* 페이지네이션 컨트롤러 */}
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button className={isClicked === index + 1 ? 'boldButton' : ''} key={index + 1} onClick={() => goToPage(index + 1)}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                            
                </div>
            )}
        </div>
    );
};

export default TimeNtc;