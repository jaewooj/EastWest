const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb');
const nowTime = require('./nowTime');

const fourteenData = async () => {
    const now = nowTime();
    let connection;
    const fourTeenAgo = new Date(now.getTime() - 14*60*1000);
    const year = now.getFullYear();
    const yearAgo = fourTeenAgo.getFullYear();
    const month = now.getMonth()+1;
    const monthAgo = fourTeenAgo.getMonth()+1;
    const day = now.getDate();
    const dayAgo = fourTeenAgo.getDate();
    const hour =now.getHours();
    const hourAgo =fourTeenAgo.getHours();
    const minute = now.getMinutes();
    const minuteAgo = fourTeenAgo.getMinutes();
    const dateTime = `${year}-${month}-${day} ${hour}:${minute}:00`;
    const dateTimeAgo = `${yearAgo}-${monthAgo}-${dayAgo} ${hourAgo}:${minuteAgo}:00`;
    const tableName = `DATA_${year}_${month}_${day}`;
    const selectQuery = `
        SELECT time_nm FROM ${tableName}
        WHERE date_time = ?;
    `
    const sumDataQuery = `
        SELECT SUM(r001) AS total_r001, SUM(r004) AS total_r004, SUM(r060) AS total_r060 FROM ${tableName}
        WHERE time_nm BETWEEN ? AND ?;
    `
    try {
        connection = await connectDatabase();
        const [rows01] = await connection.execute(selectQuery, [dateTimeAgo]);
        const agoData = rows01.length > 0 ? rows01[0].time_nm : null;
        const [rows02] = await connection.execute(selectQuery, [dateTime]);
        const ctData = rows02.length > 0 ? rows02[0].time_nm : null;
        const [rows] = await connection.execute(sumDataQuery,[agoData,ctData]);

        if (rows && rows.length > 0) {
            // 평균 기준
            const totalR001 = ((rows[0].total_r001)/15).toFixed(2);
            const totalR004 = (rows[0].total_r004)/15;
            const totalR060 = (rows[0].total_r060)/15;
            console.log('Total r001:', totalR001, agoData, ctData);
            return { totalR001, totalR004, totalR060 };
        } else {
            console.log('No data found for the specified time range.');
            return null;
        }
    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
module.exports=fourteenData;

