const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb');
const nowTime = require('./nowTime');

const hourDataCv = async () => {
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
        SELECT SUM(r001) AS total_r001 FROM ${tableName}
        WHERE date_time BETWEEN ? AND ?
    `
    console.log(fourTeenAgo)
    try {
        connection = await connectDatabase();
        const [rows] = await connection.execute(selectQuery, [dateTimeAgo, dateTime]);

        if (rows && rows.length > 0) {
            const totalR001 = rows[0].total_r001;
            console.log('Total r001:', totalR001);
            return totalR001;
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
module.exports=hourDataCv;

