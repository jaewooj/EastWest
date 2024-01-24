const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb')
const getWeatherData = require('./weatherApi');

const wtDataInput = async () =>{
    try {
        const now = new Date();
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
        const connection = await connectDatabase();
        const fcstValue = await getWeatherData();
        await connection.execute(updateWtDataInputQuery,[fcstValue,dateTime])
        // console.log(fcstValue);
    } catch (error) {
        console.error('에러:', error);
    } finally {
        // 연결 닫기
        // await connection.end();
        connection.release();
    }
}
module.exports=wtDataInput;