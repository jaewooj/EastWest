import React from 'react';
import './InfoData.css';
import axios from 'axios';
import { useState, useEffect } from 'react'

const InfoData = () => {
    
    const [dbData, setDbData] = useState(0);
    const [weather, setWeather] = useState();
    const [weatherImg, setWeatherImg] = useState("/images/cloudy.png");

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5020/test'); // 서버의 엔드포인트에 맞게 수정
            const data = await response.json();
            setDbData(data.dbData[0].R100);
        } catch (error) {
            console.error('데이터 가져오기 실패:', error);
        }
    };

    const updateWeatherInfo = () => {
        const now = new Date();
        const hour = now.getHours();

        if (dbData >= 9 && dbData <= 10) {
            setWeather("흐림");
            setWeatherImg("/images/cloudy.png");
        } else if (dbData >= 6 && dbData <= 8) {
            setWeather("구름많음");
            if (hour >= 6 && hour <= 17) {
                setWeatherImg("/images/cloudmuch.png");
            } else if (hour <= 5 || hour >= 18) {
                setWeatherImg("/images/cloudmuchnight.png");
            }
        } else if (dbData >= 3 && dbData <= 5) {
            setWeather("구름조금");
            if (hour >= 6 && hour <= 17) {
                setWeatherImg("/images/cloudlittle.png");
            } else if (hour <= 5 || hour >= 18) {
                setWeatherImg("/images/cloudlittlenight.png");
            }
        } else if (dbData >= 0 && dbData <= 2) {
            setWeather("맑음");
            if (hour >= 6 && hour <= 17) {
                setWeatherImg("/images/sunny.png");
            } else if (hour <= 5 || hour >= 18) {
                setWeatherImg("/images/cleannight.png");
            }
        }
        
        // console.log(hour);
        // console.log(dbData);
        // console.log(weather);
        // console.log(weatherImg);
    };
    
    useEffect(() => {
        // 초기 실행
        fetchData();
        updateWeatherInfo();

        // 300초(5분)마다 실행
        const intervalId = setInterval(() => {
            fetchData();
            updateWeatherInfo();
        }, 300000);

        // 컴포넌트가 언마운트될 때 interval 정리
        return () => clearInterval(intervalId);
    }, []);  // 빈 종속성 배열로 초기 실행을 보장

    return (
        <div className="infoData">
            <div className="envirInfo">
                <div className="envirInfo1">
                    <div className="envirTitle gradientText">
                        <p className="mark"></p>
                        <p>환경정보</p>
                    </div>
                    <div className="wtrPic">
                        <img src={weatherImg} alt="" />
                        <p>{weather}</p>
                    </div>
                </div>
                <div className="envirInfoUl envirInfo2">
                    <ul>
                        <li>
                            <p>모듈표면 온도&nbsp;:&nbsp;</p>
                            <p>10.1</p>
                            <p>&nbsp;&#8451;</p>
                        </li>
                        <li>
                            <p>외기 온도&nbsp;:&nbsp;</p>
                            <p>11.2</p>
                            <p>&nbsp;&#8451;</p>
                        </li>
                    </ul>
                </div>
                <div className="envirInfoUl envirInfo3">
                    <ul>
                        <li>
                            <p>수평 일사량&nbsp;:&nbsp;</p>
                            <p>700.2</p>
                            <p>&nbsp;W/m<sup>2</sup></p>
                        </li>
                        <li>
                            <p>수평 일사량&nbsp;:&nbsp;</p>
                            <p>710.8</p>
                            <p>&nbsp;W/m<sup>2</sup></p>
                        </li>
                    </ul>

                </div>
                
            </div>
            <div className="sysInfo">
                <div className="sysTitle gradientText">
                        <p className="mark"></p>
                        <p>시스템 현황</p>
                </div>
                <div className="sysCon">
                    <div className="mgBox brkMg">
                        <p>고장진단</p>
                        <p className="goodCom breakCom">양호</p>
                    </div>
                    <div className="mgBox frMg">
                        <p>화재관리</p>
                        <p className="goodCom fireCom">양호</p>
                    </div>
                    <div className="mgBox comMg">
                        <p>통신상태</p>
                        <p className="goodCom comCon">양호</p>
                    </div>

                </div>

            </div>
            
        </div>
    );
};

export default InfoData;