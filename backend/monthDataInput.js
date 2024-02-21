const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb');

const monthDataInput = async () => {
    const now = new Date();
    const year = now.getFullYear();
    const tableName = `DATA_${year}_year`;
    let connection;

    try {
        connection = await connectDatabase();

        // 각 일별 테이블의 R값들을 합산하여 객체에 저장합니다.
        for (let month = 1; month <= 12 ; month++) {
            const dailyTableName = `DATA_${year}_${month}_month`;

            // 해당 테이블이 존재하는지 확인합니다.
            const [tableExists] = await connection.execute(`SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'rems' AND TABLE_NAME = ?`, [dailyTableName]);

            if (tableExists[0].count >0) {
                // 일별 테이블의 데이터를 가져옵니다.
                const [rows] = await connection.execute(`SELECT R060 FROM ${dailyTableName}`);
                
                const validRows = rows.filter(row => row.R060 !== null && row.R060 !== undefined);
                // console.log(rows);
                
                // 유효한 데이터만 합산합니다.
                let sum = validRows.reduce((acc, arr) => acc + Number(arr.R060), 0);
                
                // 소수점 둘째 자리까지 반올림합니다.
                sum = Math.round(sum * 100) / 100;

                const insertQuery = `
                    UPDATE ${tableName} 
                    SET R060 = ?
                    WHERE month_nm = ?
                `;
                
                await connection.execute(insertQuery, [sum,month]);
                console.log(`month:${month}, sum:${sum}`);
                
            } else {
                const insertQuery = `
                    UPDATE ${tableName} 
                    SET R060 = ?
                    WHERE month_nm = ?
                `;
                
                await connection.execute(insertQuery, [0,month]);
                console.log(`${month}, 0입력`)
            }
        }

    } catch (error) {
        console.error(`Error occurred:`, error);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = monthDataInput;