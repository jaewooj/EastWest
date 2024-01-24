
const cron = require('node-cron');
const dataDefTable = require('./dataDefTable');
const dataCtTable = require('./dataCtTable');
const defDataInput = require('./defDataInput');
const dateTimeInput =require('./dateTimeInput');
const wtDataInput = require('./wtDataInput');
const dbDataWebTm = require('./dbDataWebTm');

const runTasks = async () => {
    try {
        // 데이터 정의 테이블 생성
        await dataDefTable();
        // 정의 데이터 입력
        await defDataInput();



        // 데이터 수집 테이블 생성 - 최초 실행
        await dataCtTable();

        // 매일 자정 데이터 수집 테이블 생성  
        cron.schedule('0 0 0 * * *', async()=>{
            // 데이터 수집 테이블 생성
            await dataCtTable();
        })

        // datetime 데이터 매분 입력
        cron.schedule('0 * * * * *', async()=>{
            // datetime 데이터 입력
            await dateTimeInput();
            // 기상 데이터 입력
            await wtDataInput();
        })
        
        await dbDataWebTm();

    } catch (error) {
        console.error('Error:', error)
    }

};

runTasks();
