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
    return mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '12345',
        database: 'rems',
        connectionLimit: 20,
        waitForConnections: true,
        queueLimit: 0,
        maxIdle: 0,
        keepAliveInitialDelay: 10000,
        enableKeepAlive: true,
    });
};

/* createPool(); */
const connectDatabase = async () => {
    try {
        if (!pool || pool._closed) {
            pool = createPool();
        }
        // 연결을 가져오기 전에 상태 확인
        const connection = await pool.getConnection();
        return connection;
    } catch (error) {
        console.error('데이터베이스 연결 실패:', error);
        if (pool) {
            try {
                // 연결 종료
                await pool.end();
            } catch (err) {
                console.error('기존 풀 닫기 실패:', err);
            }
        }
        // 새로운 풀 생성 및 연결 시도
        pool = createPool();
        const connection = await pool.getConnection();
        return connection;
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
