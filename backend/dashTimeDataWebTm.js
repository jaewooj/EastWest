const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb');


const dashTimeDataWebTm = async () => {
    const connection = await connectDatabase();
    const express = require('express');
    const cors = require('cors');
    const app = express();
    const port = 5031;

    app.use(express.json());
    app.use(cors());

    app.get('/gendata/:tableName', async (req, res) => {
        try {
            const { tableName } = req.params;
            const query = `
                SELECT time_nm, date_time, R001, R060 FROM ${tableName};
            `;
            const [results] = await connection.query(query);
            res.json(results);
        } catch (error) {
            console.error('데이터 가져오기 실패:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } 
    });

    app.listen(port, () => {
        console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
    });
};

module.exports=dashTimeDataWebTm;