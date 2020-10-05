const express = require('express');
const app = express();

// 가장 많이 사용하는 모듈
// app.use(); 사용하려는 middleware 등록할 때
// app.get(); get Method를 사용할 때. 여기서도 req,res를 argu로 받는 이벤트 핸들러 사용 가능
// app.post(); post Method를 사용할 때

/* 생활코딩에서처럼 if/switch문을 사용해서 url로 구분할 필요 없이(/create, /create_proc) */
/* app.get('/create') or app.post('/create') */
/* 다시 말해 if/switch문을 사용하지 않았으니 파일을 나눠 쓸 수 있다. */
/* 대신 app.use/post 따위가 매우 많이 나옴 */

const welcome = require('./welcome')

app.use((req, res) => {
    /* request, response의 통로가 되는 이벤트 리스너를 만든다. */
    let html = welcome.welcome()
    res.send(html);
    // res.end(html)이랑 똑같은 애. 화면에 뿌려줘용
    // res.redirect([status], path) 다른 경로로 강제로 보냄
})



app.listen(3000, () => util.log('Server running at http//localhost:3000'));
/* util 모듈을 사용하면 console.log앞에 현재시간이 추가로 나온다 */
const util = require('util')

