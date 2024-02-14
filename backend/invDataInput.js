const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb')
const invData01 = require('./invDataCr01');
const nowTime = require('./nowTime');

const invDataInput = async () =>{
    console.log('invDataInput 실행은 성공')
    let connection;
    try {
        // console.log('invDataInput try는 성공')
        connection = await connectDatabase();
        const now = nowTime();
        const year = now.getFullYear();
        const month = now.getMonth()+1;
        const day = now.getDate();
        const hour =now.getHours();
        const minute = now.getMinutes();
        const dateTime = `${year}-${month}-${day} ${hour}:${minute}:00`;
        const tableName = `DATA_${year}_${month}_${day}`;
        // console.log('객체 생성 성공')
        
        const updateInv01DataInputQuery = `
            UPDATE ${tableName} 
            SET R001 = ?, R002 = ?, R003 = ?, R060 = ?
            WHERE date_time = ?
        `
        // console.log('쿼리문 객체 성공')
        const invData = await invData01();
        // console.log('랜덤데이터 가져오기 성공')

        await connection.execute(updateInv01DataInputQuery,[invData[0],invData[1],invData[2],invData[3],dateTime])
        console.log(`invData success ${tableName}:${hour}:${minute}`)

    } catch(error){
        console.error('에러:', error);
        console.log(error); // 추가
    } finally {
        if (connection) {
            connection.release();
        }
    }

}
module.exports=invDataInput;