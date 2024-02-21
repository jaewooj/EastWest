const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb')

const dataAccumTable = async () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth()+1;
    const tableName = `DATA_accum`;
    let connection;
    
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
            year_nm VARCHAR(12) PRIMARY KEY, 
            -- 인버터 전체
            R060 DECIMAL (8,2),
            R061 DECIMAL (8,2),
            R062 DECIMAL (8,2)
        )
    `
    const insertYearQuery = `
            INSERT INTO ${tableName} (year_nm)
            value (?)
            ON DUPLICATE KEY UPDATE year_nm = year_nm;
    `
    try {
        connection = await connectDatabase();

        await connection.execute(createTableQuery);
        
        const now = new Date();
        const year = now.getFullYear();
        await connection.query(insertYearQuery, year);

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
module.exports=dataAccumTable;
