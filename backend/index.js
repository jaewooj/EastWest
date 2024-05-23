
const cron = require('node-cron');
const  express  = require('express');
const  cors = require('cors');
const app = express();
const port = 81; 
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
const dateDayInput = require('./dateDayInput');
const dayDataInput = require('./dayDataInput');
const dashDayDataWebTm = require('./dashDayDataWebTm');
const dataYearTable = require('./dataYearTable');
const monthDataInput = require('./monthDataInput');
const dashMonthDataWebTm = require('./dashMonthDataWebTm');
const grDataWebTm = require('./grDataWebTm');
const dataAccumTable = require('./dataAccumTable');
const yearDataInput = require('./yearDataInput');

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

        // 일별 가공 데이터 테이블 생성 - 최초 실행
        await dataMonthTable();
        // 일별 일수 데이터 입력 - 최초 실행
        await dateDayInput();
        // 일별 발전량 데이터 삽입 - 최초 실행
        await dayDataInput();

        // 월별 가공 데이터 테이블 생성 - 최초 실행
        await dataYearTable();
        
        // 누적 가공 데이터 테이블 생성 - 최초 실행
        await dataAccumTable();

        // 월별 발전량 데이터 삽입 - 최초 실행
        await monthDataInput();

        // 년도별 발전량 데이터 삽입 - 최초 실행
        await yearDataInput();


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
        // 매월 첫째날 실행
        cron.schedule('0 0 0 1 * *', async()=>{
            // 월별 가공 데이터 테이블 생성
            await dataMonthTable();
            // 월별 일수 데이터 입력
            await dateDayInput();
        })

        // 매년 첫째날 실행
        cron.schedule('0 0 0 1 1 *', async()=>{
            // 월별 가공 데이터 테이블 생성
            await dataYearTable();
            // 누적 가공 데이터 테이블 생성
            await dataAccumTable();

        })

        // 매일 매시간마다 실행
        cron.schedule('0 0 * * * *', async()=>{
            // 일별 발전량 데이터 삽입
            await dayDataInput();
            
            // 월별 발전량 데이터 삽입
            await monthDataInput();
            
            // 년도별 발전량 데이터 삽입
            await yearDataInput();
        })

        // 웹서버에 데이터 전송
        await dbDataWebTm();
        await arrayDataWebTm();
        await dashTimeDataWebTm();
        await dashDayDataWebTm();
        await dashMonthDataWebTm();
        await grDataWebTm();

    } catch (error) {
        console.error('Error:', error)
    } finally {

    };

};

app.use( express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('안녕');
  });
  
app.listen( port , () => {
  console.log('서버 접속 완료')
})


runTasks();
