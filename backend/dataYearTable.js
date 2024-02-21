const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb')

const dataYearTable = async () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth()+1;
    const tableName = `DATA_${year}_year`;
    let connection;
    
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
            month_nm VARCHAR(12) PRIMARY KEY, 
            -- 인버터 전체
            R060 DECIMAL (8,2),
            R061 DECIMAL (8,2),
            R062 DECIMAL (8,2)
        )
    `
    try {
        connection = await connectDatabase();

        await connection.execute(createTableQuery);
        
        for (let i = 1; i <= 12; i++) {
            const monthValue = i < 10 ? `0${i}` : `${i}`;
            const insertQuery = `
                INSERT INTO ${tableName} (month_nm) 
                VALUES (?)
                ON DUPLICATE KEY UPDATE month_nm = month_nm;
            `;
            await connection.execute(insertQuery, [monthValue]);
        }

        console.log(`definition table created successfully`);
    } catch (error) {
        console.error(`Error occur:`, error);
    } finally {
        // 연결 닫기
        // await connection.end();
        if (connection) {
            connection.release();
        }
    }
}
module.exports=dataYearTable;
