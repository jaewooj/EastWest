const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb')
const nowTime = require('./nowTime');
const fourteenData = require('./fourteenData');

const hourDataInput = async () => {
    let connection;
    try {
        connection = await connectDatabase();
        const now = nowTime();
        const year = now.getFullYear();
        const month = now.getMonth()+1;
        const day = now.getDate();
        const hour =now.getHours();
        const minute = now.getMinutes();
        const dateTime = `${year}-${month}-${day} ${hour}:${minute}:00`;
        const tableName = `DATA_${year}_${month}_${day}_hour`;
        
        const updateInv01DataInputQuery = `
            UPDATE ${tableName} 
            SET R001 = ?, R004 = ?, R060 = ?
            WHERE date_time = ?
        `
        const fourteenData01 = await fourteenData();

        await connection.execute(updateInv01DataInputQuery,[fourteenData01.totalR001, fourteenData01.totalR004, fourteenData01.totalR060, dateTime])
        console.log(`fourteenData success ${tableName}:${hour}:${minute}`)

    } catch(error){
        console.error('에러:', error);
        console.log(error); // 추가
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
module.exports=hourDataInput;