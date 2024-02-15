
const cron = require('node-cron');
const dataDefTable = require('./dataDefTable');
const dataCtTable = require('./dataCtTable');
const defDataInput = require('./defDataInput');
const dateTimeInput =require('./dateTimeInput');
const wtDataInput = require('./wtDataInput');
const dbDataWebTm = require('./dbDataWebTm');
const invDataInput = require('./invDataInput');
const hourDataTable = require('./hourDataTable');
const dateTimeHourInput = require('./dateTimeHourInput');
const hourDataInput = require('./hourDataInput');
const arrayDataWebTm = require('./arrayDataWebTm');
const dashTimeDataWebTm = require('./dashTimeDataWebTm');
const dataMonthTable = require('./dataMonthTable');

const runTasks = async () => {
    try {
        // 데이터 정의 테이블 생성
        await dataDefTable();
        // 정의 데이터 입력
        await defDataInput();

        // 데이터 수집 테이블 생성 - 최초 실행
        await dataCtTable();
        // datetime 데이터 입력
        await dateTimeInput();
        // 기상 데이터 입력
        await wtDataInput();
        // 기상 데이터 입력
        await invDataInput();

        // 가공 데이터 테이블 생성 - 최초 실행
        await hourDataTable();

        // 월별 가공 데이터 테이블 생성 - 최초 실행
        await dataMonthTable();

        // 매일 자정 데이터 수집 테이블 생성  
        cron.schedule('0 0 0 * * *', async()=>{
            // 데이터 정의 테이블 생성 - 매 자정
            await dataDefTable();
            // 정의 데이터 입력 - 매 자정
            await defDataInput();
            // 데이터 수집 테이블 생성 - 매 자정
            await dataCtTable();
            // 가공 데이터 테이블 생성 - 매 자정
            await hourDataTable();
            // 월별 가공 데이터 테이블 생성 - 매 자정
            await dataMonthTable();
        })

        // datetime 데이터 매분 입력
        cron.schedule('0 * * * * *', async()=>{
            try {
                // datetime 데이터 입력 - 매분
                await dateTimeInput();
                // 기상 데이터 입력 - 매분
                await wtDataInput();
                // 인버터 데이터 입력 - 매분
                await invDataInput();
            } catch (error) {
                console.error('Error in cron.schedule (매분):', error);
            } finally {
                console.log('매분 입력 성공');
            }
        })
        
        // datetime 데이터 15분단위 입력
        cron.schedule('1 0,15,30,45 * * * *', async()=>{
            try {
                // datetime 데이터 입력 - 15분마다
                await dateTimeHourInput();
                // 15분 Data 데이터 입력 - 15분마다
                await hourDataInput();
            } catch (error) {
                console.error('Error in cron.schedule (매15분):', error);
            } finally {
                console.log('매 15분 입력 성공');
            }
        })

        await dbDataWebTm();
        await arrayDataWebTm();
        await dashTimeDataWebTm();

    } catch (error) {
        console.error('Error:', error)
    } finally {

    };

};

runTasks();
