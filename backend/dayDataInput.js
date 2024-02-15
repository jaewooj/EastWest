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

        // 각 날짜별로 합산된 값을 저장할 객체
        const aggregatedValues = {};

        // 각 일별 테이블의 R값들을 합산하여 객체에 저장합니다.
        for (let day = 1; day <= lastDay; day++) {
            const dailyTableName = `DATA_${year}_${month}_${day}`;

            // 일별 테이블의 데이터를 가져옵니다.
            const [rows] = await connection.execute(`SELECT * FROM ${dailyTableName}`);

            // R값들을 합산하여 객체에 저장합니다.
            rows.forEach(row => {
                Object.entries(row).forEach(([key, value]) => {
                    if (key.startsWith('R') && !isNaN(value)) {
                        if (!aggregatedValues[key]) {
                            aggregatedValues[key] = 0;
                        }
                        aggregatedValues[key] += value;
                    }
                });
            });
        }

        // 새로운 테이블에 데이터를 삽입합니다.
        const insertQuery = `
            INSERT INTO ${tableName} (day_nm, ${Object.keys(aggregatedValues).join(', ')})
            VALUES (?, ${Object.values(aggregatedValues).map(() => '?').join(', ')})
        `;
        const insertValues = [lastDay, ...Object.values(aggregatedValues)];

        await connection.execute(insertQuery, insertValues);
        console.log(`Data inserted successfully for month ${year}-${month}`);
    } catch (error) {
        console.error(`Error occurred:`, error);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = dayDataInput;