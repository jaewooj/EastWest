const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb')

const invDataCr01 = async () => {
    // console.log('invDataCr01 실행은 성공')
    try {
        // console.log('invDataCr01 try는 성공')
        // console.log('invDataCr01 DB연결 성공')
        const r001Min = 2.9;
        const r001Max = 3.3;
        const r001 = Math.random()*(r001Max-r001Min+1)+r001Min;

        const r002Min = 310;
        const r002Max = 321;
        const r002 = Math.random()*(r002Max-r002Min+1)+r002Min;

        const r003Min = 9.28;
        const r003Max = 10.28;
        const r003 = Math.random()*(r003Max-r003Min+1)+r003Min;

        // return {r001,r002,r003}; 객체로 반환
        // console.log('랜덤데이터 생성은 완료')
        return [r001,r002,r003] // 배열로 반환 
    } catch(error){
        console.error(`Error ocuurred:`, error);
        console.log(error);
    } finally{

    }
}

module.exports=invDataCr01;
// invDataCr01();