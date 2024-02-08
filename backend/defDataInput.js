const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb')
const dataDef = require('./dataDef');

const defDataInput = async () => {
    const tableName = 'DATA_DEF_TB';
    
    const dataToInsert = dataDef();
    let connection;

    const insertQuery = `
        INSERT IGNORE INTO ${tableName} 
        (grp_cd, dtl_cd, dtl_cd_nm, dtl_cd_desc, unit_cd, ord)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    try {
        connection = await connectDatabase();

        for(const data of dataToInsert){
            await connection.execute(insertQuery, [
                data.grp_cd,
                data.dtl_cd,
                data.dtl_cd_nm,
                data.dtl_cd_desc,
                data.unit_cd,
                data.ord
            ]);
        }
        
        console.log('Data inserted successfully into DATA_DEF_TB');
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

module.exports = defDataInput;

// defDataInput();