const getWeatherData = require('./weatherApi');

(async () => {
    try {
        const fcstValue = await getWeatherData();
        console.log(fcstValue);
    } catch (error) {
        console.error('에러:', error);
    }
})();