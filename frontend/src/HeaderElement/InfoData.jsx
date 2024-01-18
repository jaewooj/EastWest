import React from 'react';
import { Link } from 'react-router-dom';
import './InfoData.css'

const InfoData = () => {


    return (
        <div className="infoData">
            <div className="envirInfo">
                <div className="envirInfo1">
                    <div className="envirTitle gradientText">
                        <p className="mark"></p>
                        <p>환경정보</p>
                    </div>
                    <div className="wtrPic">
                        <img src="/images/cloudy.png" alt="" />
                        <p>흐림</p>
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
                        <p>양호</p>
                    </div>
                    <div className="mgBox frMg">
                        <p>화재관리</p>
                        <p>양호</p>
                    </div>
                    <div className="mgBox comMg">
                        <p>통신상태</p>
                        <p>양호</p>
                    </div>

                </div>

            </div>
            
        </div>
    );
};

export default InfoData;