const myPromise = new Promise((res, rej) => {
    const result = '값';
    if(true){ // 작업 성공에 대한 조건
        res(result);
        console.log('작업 성공');
    } else{
        rej('작업 실패');
    }
});

myPromise.then(res => {
    console.log('성공', res);
    return '다음 값';
}).then(res => {
    console.log('다음 then', res);
}).then(() => {
    console.log('이것도?');
})