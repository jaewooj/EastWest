import React, { useEffect } from 'react';
import './GeneralCon.css'

const GeneralCon = () => {

    useEffect(()=>{
        const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        const options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(38.25723199999999, 127.4584573), //지도의 중심좌표.
            level: 3, //지도의 레벨(확대, 축소 정도)
        };
        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        
        //마커가 표시 될 위치
        const markerPosition = new kakao.maps.LatLng(
            38.25723199999999,
            127.4584573
        );

        // 마커를 생성
        const marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커를 지도 위에 표시
        marker.setMap(map);
    },[])
    return (
        <div className="generalCon conBox">
            <div className="pic">
                <div className="map" id="map"></div>
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
                            <td>강원도 철원군 근남면 사곡리 1307-7</td>
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