const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb')

const dataDefTable = async () => {
    const tableName = `DATA_DEF_TB`
    let connection;
    
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
            grp_cd VARCHAR(5) NOT NULL, 
            dtl_cd VARCHAR(4) NOT NULL PRIMARY KEY, 
            dtl_cd_nm VARCHAR(20) NOT NULL,
            dtl_cd_desc VARCHAR(20) NOT NULL,
            unit_cd VARCHAR(4) NOT NULL,
            ord INT NOT NULL
        )
    `
    try {
        connection = await connectDatabase();

        await connection.execute(createTableQuery);
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
module.exports=dataDefTable;

// dataDefTable();