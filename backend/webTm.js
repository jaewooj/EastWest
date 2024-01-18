
const fetchData = require('./dataCt'); // 경로를 실제 모듈 위치로 변경하세요.

const express = require('express');
const cors = require('cors');
const app = express(); 
const port = 5010;

app.use(express.json());
app.use(cors());

(async () => {
    try {
        const data = await fetchData();
        app.get('/test',(req,res)=>{
            let grData = {
                grData : data
            }
            res.json(grData);
        })
        console.log(`데이터를 정상 출력함`, data);
        app.listen(port, () => {
            console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
        });
      
    } catch (error) {
        console.error('데이터 가져오기 실패:', error);
    }
})();
