const app = require('express')();

app.get('/', function (req, res, next){
    res.send('Hello World!');
    next();
});

const myLogger = function (req, res, next){
    console.log('LOGGED');
    next();
};

app.use(myLogger);

app.listen(8080);

// 미들웨어는 위에서 아래로 실행되기 때문에 순서가 중요하다.
// app.get이 수행되고 res.send가 끝나고 응답을 종료해버리기 때문에 myLogger까지 도달하지 않는다. 
// next는 다음 미들웨어로 넘어가는 역할을 하기 떄문에 순서를 잘 배치하여 next를 통해 흐름을 잘 제어해야 함.

// next() - 다음 미들웨어로 가는 역할
// next(error) - 오류 처리 미들웨어로 가는 역할
// next('route') - 같은 라우터에서 분기처리를 할 때 사용