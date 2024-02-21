const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb');
const nowTime = require('./nowTime');

const dateDayInput = async () => {
    const now = nowTime();
    const year = now.getFullYear();
    const month = now.getMonth()+1;
    const tableName = `DATA_${year}_${month}_month`;
    let connection;
    
    try {
        connection = await connectDatabase();
        
        // 해당 월의 첫째 날부터 시작하여 마지막 날을 구합니다.
        const lastDay = new Date(year, month, 0).getDate();

        // 일자별로 데이터를 삽입합니다.
        for (let day = 1; day <= lastDay; day++) {
            const day_nm = day.toString().padStart(2, '0'); // 날짜를 두 자리로 포맷팅
            const insertQuery = `
                INSERT IGNORE INTO ${tableName} (day_nm) 
                VALUES ('${day_nm}');
            `;
            await connection.execute(insertQuery);
            console.log(`Inserted data for day ${day}`);
        }

    } catch (error) {
        console.error('Error occurred:', error);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports=dateDayInput;
