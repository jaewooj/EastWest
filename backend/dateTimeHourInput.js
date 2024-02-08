const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb');
const nowTime = require('./nowTime');


const dateTimeHourInput = async () => {
    const now = nowTime();
    let connection;
    const year = now.getFullYear();
    const month = now.getMonth()+1;
    const day = now.getDate();
    const hour =now.getHours();
    const minute = now.getMinutes();
    const dateTime = `${year}-${month}-${day} ${hour}:${minute}:00`;
    const tableName = `DATA_${year}_${month}_${day}_hour`;
    const getMaxTimeNmQuery = `SELECT MAX(time_nm) AS max_timeNm FROM ${tableName}`;
    
    const insertQuery = `
        INSERT INTO ${tableName} 
        (time_nm, date_time)
        VALUES (?, ?)
    `;

    try {
        connection = await connectDatabase();
        const [rows] = await connection.execute(getMaxTimeNmQuery);
        const maxTimeNm = rows[0].max_timeNm || 0;
        await connection.execute(insertQuery,[maxTimeNm+1,dateTime]);
        
        console.log(`Data inserted successfully into ${tableName}:${hour}:${minute}`);
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        // 연결 닫기
        // await connection.end();
        if (connection) {
            connection.release();
        }
    }
};

module.exports=dateTimeHourInput;
