const express = require('express');
const app = express();

app.use(function (err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.listen(3000);

// express 서버 구성 순서
// 1. express를 불러온다.
// 2. 포트를 설정해준다.
// 3. 공통적으로 사용하는 미들웨어를 장착해준다.
// 4. 라우터를 구성한다.
// 5. 404처리 미들웨어를 구성한다.
// 6. 오류 처리 미들웨어를 구성한다.
// 7. 생성된 서버가 포트를 리스닝한다.
