import React from 'react';
import './GeneralCon.css'

const GeneralCon = () => {


    return (
        <div className="generalCon conBox">
            <div className="pic">
                <img src="/images/factory.png" alt="" />
            </div>
            <div className="content"> 
                <table>
                    <tbody>
                        <tr>
                            <td>구분</td>
                            <td>내용</td>
                        </tr>
                        <tr>
                            <td>설비명</td>
                            <td>동서형 양면태양광</td>
                        </tr>
                        <tr>
                            <td>위치</td>
                            <td>경기도 화성시 청원리 391-1</td>
                        </tr>
                        <tr>
                            <td>설비용량</td>
                            <td>100kW</td>
                        </tr>
                        <tr>
                            <td>준공일</td>
                            <td>2024년 10월 28일</td>
                        </tr>
                        <tr>
                            <td>설비 현황</td>
                            <td>400W 120EA / 인버터 4EA</td>
                        </tr>
                        <tr>
                            <td>비고</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>현장담당자</td>
                            <td>010-0000-0000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GeneralCon;