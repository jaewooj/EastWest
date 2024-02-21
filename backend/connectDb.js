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

let pool;

const createPool = () => {
    pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '12345',
        database: 'rems',
        connectionLimit: 10,
        waitForConnections: true,
        queueLimit: 0,
        maxIdle: 0,
        keepAliveInitialDelay: 10000,
        enableKeepAlive: true,
    });
};

createPool();

const connectDatabase = async () => {
    try {
        if (!pool || pool._closed) {
            createPool();
        }
        return await pool.getConnection();
    } catch (error) {
        console.error('데이터베이스 연결 실패:', error);
        throw error;
    }
};

module.exports = connectDatabase;

/* const pool = mysql.createPool({
    host : 'localhost',
    user: 'root',
    password: '12345',
    database: 'rems',
    connectionLimit: 10, // 연결 수 제한 설정
    waitForConnections: true,
    queueLimit: 0,
    maxIdle:0,
    keepAliveInitialDelay: 10000, // 0 by default.
    enableKeepAlive: true, // false by default.
});

const connectDatabase = async () => {
    return await pool.getConnection();
};

module.exports = connectDatabase; */
