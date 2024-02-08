const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb')
const getWeatherData = require('./weatherApi');
const nowTime = require('./nowTime');

const wtDataInput = async () =>{
    let connection;
    try {
        const now = nowTime();
        connection = await connectDatabase();
        const year = now.getFullYear();
        const month = now.getMonth()+1;
        const day = now.getDate();
        const hour =now.getHours();
        const minute = now.getMinutes();
        const dateTime = `${year}-${month}-${day} ${hour}:${minute}:00`;
        const tableName = `DATA_${year}_${month}_${day}`;

        const updateWtDataInputQuery = `
            UPDATE ${tableName} 
            SET R100 = ? 
            WHERE date_time = ?
        `
        let fcstValue;
        try{
            fcstValue = await getWeatherData();
            // console.log('b');
        } catch (weatherApiError) {
            console.error('날씨 데이터를 가져오는 중 에러 발생:', weatherApiError);
            // 에러 처리: 필요에 따라 다른 조치를 취할 수 있습니다.
            // 여기서는 연결을 종료하도록 했습니다.
            connection.release();
            return;
        }
        await connection.execute(updateWtDataInputQuery,[fcstValue,dateTime])
        // console.log('wtdata success');
        // console.log(fcstValue);
    } catch (error) {
        console.error('에러:', error);
    } finally {
        // 연결 닫기
        // await connection.end();
        if (connection) {
            connection.release();
        }
    }
}
module.exports=wtDataInput;