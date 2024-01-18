import React from 'react';
import './InvCon.css'
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";

const InvCon = () => {

    const [popup, setPopup] = useState(false);

    const popupOn = () => {
        setPopup(true);
    }
    const popupOff = () => {
        setPopup(false);
    }

    return (
        <div className="invCon">
            <div className="invTop">
                <div className="invTt gradientText">
                    <p className="mark"></p>
                    <p>인버터 현황</p>
                </div>
            </div>
            <div className="invDt">
                <div className="invEa inv01">
                    <div className="invPic">
                        <img src="/images/inverter.png" alt="" />
                    </div>
                    <div className="invEaTt">
                        <p className="gradientText" onClick={()=>popupOn()}>인버터1</p>
                        <div className="detail">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>전압</td>
                                        <td>전류</td>
                                        <td>발전량</td>
                                        <td>금일 누적 발전량</td>
                                        <td>전체 누적 발전량</td>
                                    </tr>
                                    <tr>
                                        <td>412.2
                                            <span>V</span>
                                        </td>
                                        <td>159.2
                                            <span>A</span>
                                        </td>
                                        <td>57.7
                                            <span>kW</span>
                                        </td>
                                        <td>123.2
                                            <span>kWh</span>
                                        </td>
                                        <td>35.585
                                            <span>kWh</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
                <div className="invEa inv02">
                    <div className="invPic">
                        <img src="/images/inverter.png" alt="" />
                    </div>
                    <div className="invEaTt">
                        <p className="gradientText" onClick={()=>popupOn()}>인버터2</p>
                        <div className="detail">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>전압</td>
                                        <td>전류</td>
                                        <td>발전량</td>
                                        <td>금일 누적 발전량</td>
                                        <td>전체 누적 발전량</td>
                                    </tr>
                                    <tr>
                                        <td>412.2
                                            <span>V</span>
                                        </td>
                                        <td>159.2
                                            <span>A</span>
                                        </td>
                                        <td>57.7
                                            <span>kW</span>
                                        </td>
                                        <td>123.2
                                            <span>kWh</span>
                                        </td>
                                        <td>35.585
                                            <span>kWh</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="invEa inv03">
                    <div className="invPic">
                        <img src="/images/inverter.png" alt="" />
                    </div>
                    <div className="invEaTt">
                        <p className="gradientText" onClick={()=>popupOn()}>인버터3</p>
                        <div className="detail">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>전압</td>
                                        <td>전류</td>
                                        <td>발전량</td>
                                        <td>금일 누적 발전량</td>
                                        <td>전체 누적 발전량</td>
                                    </tr>
                                    <tr>
                                        <td>412.2
                                            <span>V</span>
                                        </td>
                                        <td>159.2
                                            <span>A</span>
                                        </td>
                                        <td>57.7
                                            <span>kW</span>
                                        </td>
                                        <td>123.2
                                            <span>kWh</span>
                                        </td>
                                        <td>35.585
                                            <span>kWh</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="invEa inv04">
                    <div className="invPic">
                        <img src="/images/inverter.png" alt="" />
                    </div>
                    <div className="invEaTt">
                        <p className="gradientText" onClick={()=>popupOn()}>인버터4</p>
                        <div className="detail">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>전압</td>
                                        <td>전류</td>
                                        <td>발전량</td>
                                        <td>금일 누적 발전량</td>
                                        <td>전체 누적 발전량</td>
                                    </tr>
                                    <tr>
                                        <td>412.2
                                            <span>V</span>
                                        </td>
                                        <td>159.2
                                            <span>A</span>
                                        </td>
                                        <td>57.7
                                            <span>kW</span>
                                        </td>
                                        <td>123.2
                                            <span>kWh</span>
                                        </td>
                                        <td>35.585
                                            <span>kWh</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {popup&&(
                <div className="moreBg" onClick={()=>popupOff()}></div>
            )}
            {popup&&(
                <div className="popupInv">
                    <div class="popupHeader">
                        <h2>인버터 1</h2>
                        <button onClick={()=>popupOff()}><IoMdClose /></button>
                    </div>
                    <div class="invSelect">
                        <div className="arrayConDt">
                            <div className="arrayTtGp">
                                <div className="arrayTt">
                                    <p className="mark"></p>
                                    <p>ARRAY 1-1</p>
                                </div>
                                {/* 그래프 */}
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>모듈 수</td>
                                        <td>전압</td>
                                        <td>전류</td>
                                        <td>발전량</td>
                                        <td>금일 누적 발전량</td>
                                        <td>전체 누적 발전량</td>
                                    </tr>
                                    <tr>
                                        <td>15EA</td>
                                        <td>412V</td>
                                        <td>159.4A</td>
                                        <td>57.7kW</td>
                                        <td>123kWh</td>
                                        <td>35,585KWh</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            

        </div>
    );
};

export default InvCon;