const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb');

const dayDataInput = async () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const tableName = `DATA_${year}_${month}_month`;
    let connection;

    try {
        connection = await connectDatabase();

        // 해당 월의 첫째 날부터 시작하여 마지막 날을 구합니다.
        const lastDay = new Date(year, month, 0).getDate();

        // 각 일별 테이블의 R값들을 합산하여 객체에 저장합니다.
        for (let day = 1; day <= lastDay; day++) {
            const dailyTableName = `DATA_${year}_${month}_${day}`;

            // 해당 테이블이 존재하는지 확인합니다.
            const [tableExists] = await connection.execute(`SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'rems' AND TABLE_NAME = ?`, [dailyTableName]);

            if (tableExists[0].count >0) {
                // 일별 테이블의 데이터를 가져옵니다.
                const [rows] = await connection.execute(`SELECT R060 FROM ${dailyTableName}`);
                
                const validRows = rows.filter(row => row.R060 !== null && row.R060 !== undefined);
                // console.log(rows);
                // 유효한 데이터만 합산합니다.
                
                // 유효한 데이터만 합산합니다.
                let sum = validRows.reduce((acc, arr) => acc + Number(arr.R060), 0) / 60;
                
                // 소수점 둘째 자리까지 반올림합니다.
                sum = Math.round(sum * 100) / 100;

                const insertQuery = `
                    UPDATE ${tableName} 
                    SET R060 = ?
                    WHERE day_nm = ?
                `;
                
                await connection.execute(insertQuery, [sum,day]);
                console.log(`day:${day}, sum:${sum}`);
                
            } else {
                const insertQuery = `
                    UPDATE ${tableName} 
                    SET R060 = ?
                    WHERE day_nm = ?
                `;
                
                await connection.execute(insertQuery, [0,day]);
                console.log(`${day}, 0입력`)
            }
            /* // R값들을 합산하여 객체에 저장합니다.
            rows.forEach(row => {
                Object.entries(row).forEach(([key, value]) => {
                    if (key.startsWith('R') && !isNaN(value)) {
                        if (!aggregatedValues[key]) {
                            aggregatedValues[key] = 0;
                        }
                        aggregatedValues[key] += value;
                    }
                });
            }); */
        }

        /* // 새로운 테이블에 데이터를 삽입합니다.
        const insertQuery = `
            INSERT INTO ${tableName} (day_nm, ${Object.keys(aggregatedValues).join(', ')})
            VALUES (?, ${Object.values(aggregatedValues).map(() => '?').join(', ')})
        `;
        const insertValues = [lastDay, ...Object.values(aggregatedValues)];

        await connection.execute(insertQuery, insertValues);
        console.log(`Data inserted successfully for month ${year}-${month}`); */
    } catch (error) {
        console.error(`Error occurred:`, error);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = dayDataInput;