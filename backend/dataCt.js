const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'rems',
    connectionLimit: 10 // 연결 수 제한 (원하는 수치로 조절 가능)
});

const selectTableQuery = `
    SELECT * FROM data_2024_1_16;
`;

const fetchData = async () => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.query(selectTableQuery);
        // console.log(rows);
        return rows;
    } catch (error) {
        console.error('데이터 가져오기 오류:', error);
    } finally {
        if (connection) connection.release(); // 커넥션 풀에 반납
    }
};
// fetchData();

module.exports = fetchData;
/* (async () => {
    try {
        const data = await fetchData();
        console.log(`데이터를 정상 출력함`, data);
    } catch (error) {
        console.error('데이터 가져오기 실패:', error);
    }
})();
 */