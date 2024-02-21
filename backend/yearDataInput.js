const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb');

const yearDataInput = async () => {
    const now = new Date();
    const year = now.getFullYear();
    const tableName = `DATA_accum`;
    let connection;

    try {
        connection = await connectDatabase();

        const yearTableName = `DaTA_${year}_year`;

        const [rows] = await connection.execute(`
            SELECT SUM(R060) AS year_sum FROM ${yearTableName}
        `)
        const yearSum = Number(rows[0].year_sum)

        const insertQuery = `
            UPDATE ${tableName}
            SET R060 = ?
            WHERE year_nm = ?
        `
        await connection.execute(insertQuery,[yearSum,year])

    } catch (error) {
        console.error(`Error occurred:`, error);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

module.exports = yearDataInput;