const axios = require('axios');
const nowTime = require('./nowTime');

const getWeatherData = async () => {
    const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst';

    const now = nowTime();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1 해주고 두 자리로 포맷팅합니다.
    const day = now.getDate().toString().padStart(2, '0'); // 일을 두 자리로 포맷팅합니다.
    const formattedDate = `${year}${month}${day}`;
    
    const time = now.getHours()- 1;
    const timeSet = time.toString().padStart(2,'0');
    // console.log(timeSet);

    const queryParams = {
        serviceKey: 'UZ0z6dPfP50mYZ/xzVxDCOVxbqxUFprY8D3NT1g2zbUH2zBcBBfiXzWHoZDS6f3FIc5iVLmu4k/GpB/5I1a4BA==',
        pageNo: '4',
        numOfRows: '6',
        dataType: 'JSON',
        base_date: `${formattedDate}`,
        base_time: `${timeSet}00`,
        nx: '68',
        ny: '141',
    };

    try {
        const response = await axios.get(url, { params: queryParams });
        
        if (response.data.response.body.items && response.data.response.body.items.item) {
            const fcstValue = response.data.response.body.items.item[0].fcstValue;
            
            if (fcstValue !== undefined) {
                // console.log(fcstValue);
                // console.log('a');
                return fcstValue;
            } else {
                console.error('fcstValue is undefined.');
                throw new Error('fcstValue is undefined.');
            }
        } else {
            console.error('Response structure is not as expected.');
            throw new Error('Response structure is not as expected.');
        }

        // (가이드)fcstValue : 0~5 맑음, 6~8 구름많음, 9~10 흐림
        // (변경후) fcstValue : 0~2 맑음, 3~5 구름조금, 6~8 구름많음, 9~10 흐림
    } catch (error) {
        console.error('에러:', error);
        throw error; // 에러를 상위로 던져서 처리하도록 함
    }
};
module.exports = getWeatherData;