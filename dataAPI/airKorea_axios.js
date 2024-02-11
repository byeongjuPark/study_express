
//const path = require('path');// 파일과 디렉토리 경로 작업을 위한 기능 제공
const dotenv = require('dotenv');
//dotenv.config({ path: path.resolve(__dirname, "../../.env") });// [dotenv]env파일 위치 인식
dotenv.config();
const morgan = require('morgan');
const axios = require('axios');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/airkorea', async (req, res) => {
    console.log('서비스키',process.env.airServiceKey);
    console.log('포트',process.env.PORT);
    const serviceKey = process.env.airServiceKey;
    const airUrl = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?";

    let params = encodeURI('serviceKey') + '=' + serviceKey;
    params += '&' + encodeURI('numOfRows') + '=' + encodeURI('1');
    params += '&' + encodeURI('pageNo') + '=' + encodeURI('1');
    params += '&' + encodeURI('dataTerm') + '=' + encodeURI('DAILY');
    params += '&' + encodeURI('ver') + '=' + encodeURI('1.3');
    params += '&' + encodeURI('stationName') + '=' + encodeURI('마포구');
    params += '&' + encodeURI('returnType') + '=' + encodeURI('json');

    const url = airUrl + params;

    try{
        const result = await axios.get(url);
        res.json(result.data);
    }catch(error){
        console.log(error);
    }
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 서버 실행중 ..');
})