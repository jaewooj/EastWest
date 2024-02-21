const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb');


const grDataWebTm = async () => {
    const connection = await connectDatabase();
    const express = require('express');
    const cors = require('cors');
    const app = express();
    const port = 5041;

    app.use(express.json());
    app.use(cors());

    app.get('/grOverview/:tableName', async (req, res) => {
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const day = now.getDate();
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate()-1);
            const prevDay = yesterday.getDate();
            const prevYear = now.getFullYear()-1;
            const { tableName } = req.params;

            if(tableName===`DATA_${year}_${month}_${day}`||tableName===`DATA_${year}_${month}_${prevDay}`){
                const query = `
                    SELECT COUNT(*) AS columns_count FROM ${tableName} WHERE R060 !=0;
                `;
                const [results] = await connection.query(query);
                // res.json(results);
                
                const prevQuery = `
                    SELECT SUM(R060) AS sum_r060 FROM ${tableName};
                `
                const [grResults] = await connection.query(prevQuery);

                res.json({results,grResults});

            } else if(tableName===`DATA_${year}_year`||tableName===`DATA_${prevYear}_year`){
                
                const yearQuery = `
                    SELECT * FROM ${tableName};
                `
                let yearResults;
                try {
                    [yearResults] = await connection.query(yearQuery);
                } catch (error) {
                    // Handle the error when table doesn't exist
                    // console.error('데이터 가져오기 실패:', error); 
                    yearResults = []; // Assign an empty array to yearResults
                }

                res.json({ yearResults });
            } else if(tableName===`DATA_accum`){
                const accumQuery = `
                    SELECT SUM(R060) AS accum_R060 FROM ${tableName};
                `
                const [accumResults] = await connection.query(accumQuery);
                
                res.json({accumResults});
            }

            // res.json({results,grResults,yearResults});

        } catch (error) {
            console.error('데이터 가져오기 실패:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    app.listen(port, () => {
        console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
    });
};

module.exports=grDataWebTm;