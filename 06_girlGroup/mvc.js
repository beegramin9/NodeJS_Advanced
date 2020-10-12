const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const dm = require('./db/db-module');
const { get } = require('http');

app.get('/', (req, res) => {
    dm.getAllLists(rows => {
        const view = require('./view/list');
        let html = view.mainForm(rows);
        res.send(html);
    })
})

app.get('/insert', (req, res) => {
    const view = require('./view/insert');
    let html = view.insertForm();
    res.send(html);
})

app.post('/insert', (req, res) => {
    let ggname = req.body.NAME;
    let debut = req.body.debut;
    let hitSongId = req.body.hit_song_Id;
    let params = [ggname, debut, hitSongId]
    dm.insertGroup(params, () => {
        /* insertGroup을 정의할 때 */
        /* parameter 하나와 리턴값이 없게 정의했으니 */
        /* 사용할 때도 parameter 하나, 그리고 리턴값이 없으니 */
        /* 화살표함수 인자에 아무것도 없는 것이다. */
        res.redirect('/')
    });
})

app.get('/delete/:ggid', (req, res) => {
    let ggid = parseInt(req.params.ggid);
    /* params나 body를 거쳐 나온 애들은 무조건 string */
    /* 그래서 id같이 db에서 int로 만든 애들은 다시 */
    /* parseInt를 해 주자 */

    console.log(req.route.path);
    /* 따로 "삭제하시겠습니까?" 따위의 deleteForm을 만들지 않았기에 */
    /* 삭제 버튼만 누르면 바로 되는 것처럼 보이지만 */
    /* 실제로는 주소창에 localhost:3000/delete/ggid가 */
    /* 만들어지고, req.params.ggid로 받는 것이다. */

    dm.deleteGroup(ggid, () => {
        /* 여기도 deleteGroup 정의할 때 리턴값이 없다. */
        res.redirect('/')
    })
})

app.get('/update/:ggid', (req, res) => {
    let ggid = parseInt(req.params.ggid);
    dm.songToUpdate(ggid, result => {
        const view = require('./view/update')
        let html = view.updateForm(result);
        res.send(html);

    })
})

app.post('/update', (req, res) => {
    let ggname = req.body.NAME;
    let debut = req.body.debut;
    let hitSongId = req.body.hit_song_Id;
    let ggid = parseInt(req.body.ggid);
    let params = [ggname, debut, hitSongId, ggid]
    dm.updateGroup(params, () => {
        res.redirect('/');
    })
})

app.listen(3000, () => {
    console.log('Server Running at http://127.0.0.1:3000');
});