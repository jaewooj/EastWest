const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb')

const invDataCr01 = async () => {
    // console.log('invDataCr01 실행은 성공')
    try {
        // console.log('invDataCr01 try는 성공')
        // console.log('invDataCr01 DB연결 성공')
        const r001Min = 2.9;
        const r001Max = 3.3;
        const r001 = Math.random()*(r001Max-r001Min)+r001Min;

        const r002Min = 310;
        const r002Max = 321;
        const r002 = Math.random()*(r002Max-r002Min)+r002Min;

        const r003Min = 9.28;
        const r003Max = 10.28;
        const r003 = Math.random()*(r003Max-r003Min)+r003Min;

        const r004Min = 2.9;
        const r004Max = 3.3;
        const r004 = Math.random()*(r004Max-r004Min)+r004Min;

        const r005Min = 310;
        const r005Max = 321;
        const r005 = Math.random()*(r005Max-r005Min)+r005Min;

        const r006Min = 9.28;
        const r006Max = 10.28;
        const r006 = Math.random()*(r006Max-r006Min)+r006Min;

        const r007 = r001+r004;
        const r008 = (r002+r005)/2;
        const r009 = r003+r006;


        const r060Min = 47.0;
        const r060Max = 49.9;
        const r060 = Math.random()*(r060Max-r060Min)+r060Min;

        // return {r001,r002,r003}; 객체로 반환
        // console.log('랜덤데이터 생성은 완료')
        return [r001,r002,r003, r004, r005, r006, r007, r008, r009, r060] // 배열로 반환 
    } catch(error){
        console.error(`Error ocuurred:`, error);
        console.log(error);
    } finally{

    }
}

module.exports=invDataCr01;
// invDataCr01();