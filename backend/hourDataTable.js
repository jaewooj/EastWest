const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb');
const nowTime = require('./nowTime');

const hourDataTable = async () => {
    const now = nowTime();
    const year = now.getFullYear();
    const month = now.getMonth()+1;
    const day = now.getDate();
    const tableName = `DATA_${year}_${month}_${day}_hour`;
    const connection = await connectDatabase();
    
    const createHourTableQuery = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
            time_nm INT NOT NULL PRIMARY KEY,
            date_time VARCHAR(20) NOT NULL,
            -- 인버터1
            -- 어레이1-1
            R001 DECIMAL (5, 2), 
            R002 DECIMAL (5, 2), 
            R003 DECIMAL (5, 2), 
            -- 어레이1-2
            R004 DECIMAL (5, 2), 
            R005 DECIMAL (5, 2), 
            R006 DECIMAL (5, 2), 
            -- 인버터1 통합
            R007 DECIMAL (5, 2), 
            R008 DECIMAL (5, 2), 
            R009 DECIMAL (5, 2),
            -- 인버터2
            -- 어레이2-1
            R010 DECIMAL (5, 2), 
            R011 DECIMAL (5, 2), 
            R012 DECIMAL (5, 2), 
            -- 어레이2-2
            R013 DECIMAL (5, 2), 
            R014 DECIMAL (5, 2), 
            R015 DECIMAL (5, 2), 
            -- 인버터2 통합
            R016 DECIMAL (5, 2), 
            R017 DECIMAL (5, 2), 
            R018 DECIMAL (5, 2), 
            -- 인버터3
            -- 어레이3-1
            R020 DECIMAL (5, 2), 
            R021 DECIMAL (5, 2), 
            R022 DECIMAL (5, 2), 
            -- 어레이3-2
            R023 DECIMAL (5, 2), 
            R024 DECIMAL (5, 2), 
            R025 DECIMAL (5, 2), 
            -- 어레이3-3
            R026 DECIMAL (5, 2), 
            R027 DECIMAL (5, 2), 
            R028 DECIMAL (5, 2), 
            -- 인버터3 통합
            R029 DECIMAL (5, 2), 
            R030 DECIMAL (5, 2), 
            R031 DECIMAL (5, 2), 
            -- 인버터4
            -- 어레이4-1
            R040 DECIMAL (5, 2), 
            R041 DECIMAL (5, 2), 
            R042 DECIMAL (5, 2), 
            -- 어레이4-2
            R043 DECIMAL (5, 2), 
            R044 DECIMAL (5, 2), 
            R045 DECIMAL (5, 2), 
            -- 어레이4-3
            R046 DECIMAL (5, 2), 
            R047 DECIMAL (5, 2), 
            R048 DECIMAL (5, 2), 
            -- 인버터4 통합
            R049 DECIMAL (5, 2), 
            R050 DECIMAL (5, 2), 
            R051 DECIMAL (5, 2), 
            -- 인버터 전체
            R060 DECIMAL (5,2),
            R061 DECIMAL (5,2),
            R062 DECIMAL (5,2),
            -- 환경센서
            R100 DECIMAL (5, 2), 
            R101 DECIMAL (5, 2), 
            R102 DECIMAL (5, 2), 
            R103 DECIMAL (5, 2),
            R104 DECIMAL (5, 2)
        )
    `
    try {
        await connection.execute(createHourTableQuery);
        console.log(`hour table created successfully`);
    } catch (error){
        console.error(`Error occur:`, error);
    } finally {
        if(connection) {
            connection.release();
        }
    }
}
module.exports=hourDataTable;



