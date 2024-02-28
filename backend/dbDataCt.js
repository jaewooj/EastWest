const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb');
const nowTime = require('./nowTime');

const dbDataCt = async () => {
    const now = nowTime();
    const year = now.getFullYear();
    const month = now.getMonth()+1;
    const day = now.getDate();
    const hour =now.getHours();
    const minute = now.getMinutes();
    const dateTime = `${year}-${month}-${day} ${hour}:${minute}:00`;
    const tableName = `DATA_${year}_${month}_${day}`;
    const connection = await connectDatabase();

    const selectQuery = `
        SELECT * FROM ${tableName}
        WHERE date_time = '${dateTime}'
    `
    try {

        const [rows] = await connection.execute(selectQuery);
        return rows;  
    } catch (error) {
        console.log('데이터 조회 오류:',error)
    } finally {
        // 연결 닫기
        // await connection.end();
        if (connection) {
            connection.release();
        }
    }
}
module.exports=dbDataCt;