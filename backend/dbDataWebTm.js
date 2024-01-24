const dbDataCt = require('./dbDataCt');


const dbDataWebTm = async () =>{
    const express = require('express');
    const cors = require('cors');
    const app = express();
    const port = 5020;
    const cron = require('node-cron');
  
    app.use(express.json());
    app.use(cors());
    
    try {
        let data = await dbDataCt();
        cron.schedule('1 * * * * *', async()=>{
            data = await dbDataCt();
        })
        app.get('/test',(req,res)=>{
            let dbData = {
                dbData : data
            }
            res.json(dbData);
        })
        app.listen(port, () => {
            console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
        });
    } catch (error){
        console.error('데이터 가져오기 실패:', error);
    }
}
  
module.exports=dbDataWebTm;


