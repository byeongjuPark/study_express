const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

// set port
app.set('port', process.env.PORT || 8080);

// common middlewere
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser('secret@1234')); // 암호화된 쿠키를 사용하기 위한 임의의 문자 전송
app.use(session({
    secret: 'secret@1234',  // 암호화
    resave: false, // 새로운 요청 시. 세션에 변동 사항이 없어도 다시 저장할지 설정
    saveUninitialized: true, // 세션에 저장할 내용이 없어도 저장할지 설정
    cookie: {
        // 세션 쿠키 옵션들 설정 httpOnly, expires, domain, path, secure, sameSite
        httpOnly: true, // 로그인 구현시 필수 적용, 자바스크립트로 접근 . 할 수 있게 하는 기능
    },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set routing
app.get('/', (req, res) => {
    if (req.session.name) {
        const output = `
        <h2>로그인한 사용자님</h2><br>
        <p>${req.session.name}님 안녕하세요.</p><br>
        `
        res.send(output);
    } else {
        const output = `
        <h2>로그인하지 않은 사용자입니다.</h2><br>
        <p>로그인 해주세요.</p><br>
        `
        res.send(output);
    }
});
app.get('/login', (req, res) => {  // 실제 구현 시 post
    console.log(req.session);
    // 쿠키를 사용할 경우 쿠키에 값 설정
    // res.cookie(name, value, options);
    // 세션 쿠키를 사용할 경우
    req.session.name = '로드북';
    res.end('Login Ok');
});

app.get('/logout', (req, res) => {
    res.clearCookie('connect.sid');
    res.end('Logout Ok');
});

// connecting server port
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..')
})