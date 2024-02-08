/* 
const mysql = require('mysql2/promise');

const connectDatabase = async () => {
    const connection = await mysql.createConnection({
        host : 'localhost',
        user: 'root',
        password: '12345',
        database: 'rems'
    });
    return connection;
}
module.exports=connectDatabase; */

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host : 'localhost',
    user: 'root',
    password: '12345',
    database: 'rems',
    waitForConnections: true,
    connectionLimit: 10, // 연결 수 제한 설정
    queueLimit: 0
});

const connectDatabase = async () => {
    return await pool.getConnection();
};

module.exports = connectDatabase;
