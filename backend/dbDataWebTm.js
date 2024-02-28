const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb');


const dbDataWebTm = async () =>{
    const connection = await connectDatabase();
    const express = require('express');
    const cors = require('cors');
    const app = express();
    const port = 5020;
  
    app.use(express.json());
    app.use(cors());

    app.get('/realtimeData', async(req,res)=>{
        try {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth()+1;
            const day = now.getDate();
            const hour =now.getHours();
            const minute = now.getMinutes();
            const dateTime = `${year}-${month}-${day} ${hour}:${minute}:00`;
            const tableName = `DATA_${year}_${month}_${day}`;
            
            const selectQuery = `
                SELECT * FROM ${tableName}
                WHERE date_time = '${dateTime}'
            `
            const [rows] = await connection.execute(selectQuery);
            res.json(rows);

        }catch(error){
            console.error('데이터 가져오기 실패:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } 
    })
    
    app.listen(port, () => {
        console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
    });
}
  
module.exports=dbDataWebTm;



// const dbDataCt = require('./dbDataCt');
// const fourteenDataCt = require('./fourteenDataCt');

// const dbDataWebTm = async () =>{
//     const express = require('express');
//     const cors = require('cors');
//     const app = express();
//     const port = 5020;
//     const cron = require('node-cron');
  
//     app.use(express.json());
//     app.use(cors());
    
//     try {
//         let data = await dbDataCt();
//         let fourtennData = await fourteenDataCt();
//         cron.schedule('1 * * * * *', async()=>{
//             data = await dbDataCt();
//             /* fourteenData = await fourteenDataCt(); */
//         })
//         app.get('/test',(req,res)=>{
//             /* let dbData = {
//                 dbData : data
//             } */
//             let dbData = data;
//             res.json(dbData);
//         })
//         app.listen(port, () => {
//             console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
//         });
//     } catch (error){
//         console.error('데이터 가져오기 실패:', error);
//     }
// }
  
// module.exports=dbDataWebTm;




