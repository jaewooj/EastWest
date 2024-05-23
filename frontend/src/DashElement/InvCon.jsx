import React, {useState, useEffect} from 'react';
import './InvCon.css'
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import PopupInv from '../InvElement/PopupInv';
import webUrl from '../common/weburl';

const InvCon = () => {

    const [rtData,setRtData] = useState([]);

    useEffect(()=>{
        const realTimeGrCt = async ()=> {
            try {
                const response = await axios.get(`http://${webUrl}:5020/realtimeData`)
                setRtData(response.data[0]);
                // console.log(response.data[0].R002);
                // console.log(response.data[0]);
            } catch(error) {

            }
        }
        realTimeGrCt();

    },[]);

    const [popup, setPopup] = useState(false);
    const [invTitle, setInvTitle] = useState('인버터 1');

    const popupOn = (title) => {
        setPopup(true);
        setInvTitle(title);
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
                        <p className="gradientText" onClick={()=>popupOn('인버터 1')}>인버터1</p>
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
                                        <td>{rtData.R008}
                                            <span>V</span>
                                        </td>
                                        <td>{rtData.R009}
                                            <span>A</span>
                                        </td>
                                        <td>{rtData.R007}
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
                        <p className="gradientText" onClick={()=>popupOn('인버터 2')}>인버터2</p>
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
                        <p className="gradientText" onClick={()=>popupOn('인버터 3')}>인버터3</p>
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
                        <p className="gradientText" onClick={()=>popupOn('인버터 4')}>인버터4</p>
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
                <PopupInv popupOff={popupOff} invTitle={invTitle} rtData={rtData}/>
            )}
            

        </div>
    );
};

export default InvCon;