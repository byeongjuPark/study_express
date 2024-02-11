const morgan = require('morgan');
const axios = require('axios');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/airkorea', async (req, res) => {
    const serviceKey = '7wYN12VZpr%2FiyQ38IXqKf6Qiasy920D0wCanrMephf05Xb85AgQvp6BICarbK2KuWMLMvAzyBd2YAvl2z3MHNw%3D%3D';
    const airUrl = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?";

    let params = encodeURI('serviceKey') + '=' + serviceKey;
    params += '&' + encodeURI('numOfRows') + '=' + encodeURI('1');
    params += '&' + encodeURI('pageNo') + '=' + encodeURI('1');
    params += '&' + encodeURI('dataTerm') + '=' + encodeURI('DAILY');
    params += '&' + encodeURI('ver') + '=' + encodeURI('1.3');
    params += '&' + encodeURI('stationName') + '=' + encodeURI('마포구');
    params += '&' + encodeURI('returnType') + '=' + encodeURI('json');

    const url = airUrl + params;

    try {
        const result = await axios.get(url);
        const airItem = {
            //"location": result.data.ArpltnInforInqireSvcVo['stationName'], // stationName 을 응답 메시지로 보내주지 않습니다. (최근 변경)
            location: '마포구', //locaition을 직접 명시
            time: result.data.response.body.items[0]['dataTime'], // 시간대
            pm10: result.data.response.body.items[0]['pm10Value'], // pm10 수치
            pm25: result.data.response.body.items[0]['pm25Value'], // pm25 수치
        }
        const badAir = [];
        // pm10은 미세먼지 수치
        if (airItem.pm10 <= 30) {
            badAir.push("좋음 ^^");
        } else if (pm10 > 30 && pm10 <= 80) {
            badAir.push("보통..");
        } else {
            badAir.push("나쁨 ㄱ-");
        }

        //pm25는 초미세먼지 수치
        if (airItem.pm25 <= 15) {
            badAir.push("좋음 ^^");
        } else if (pm25 > 15 && pm25 <= 35) {
            badAir.push("보통..");
        } else {
            badAir.push("나쁨 ㄱ-");
        }
        res.send(`관측 지역: ${airItem.location} / 관측 시간: ${airItem.time}<br>
        미세먼지 ${badAir[0]} 초미세먼지 ${badAir[1]} 입니다.`);
    } catch (error) {
        console.log(error);
    }
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행중 ..');
})