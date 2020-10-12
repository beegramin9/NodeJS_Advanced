const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./db/db-module');
const app = express();

/* Post요청 데이터 Parse */
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    dm.getJoinLists(rows => {
        // conn.connect();
        const view = require('./view/list');
        let html = view.mainForm(rows);
        res.send(html);
        // conn.end();
    });
});

app.get('/insert', (req, res) => {
    const view = require('./view/insert');
    let html = view.insertForm();
    res.send(html);
});

app.post('/insert', (req, res) => {
    /* body-parser모듈을 익스포트해야지만 아래 형식을 사용 가능 */
    let title = req.body.title;
    let lyrics = req.body.lyrics;
    let params = [title, lyrics];

    dm.insertSong(params, () => {
        res.redirect('/');
    });
});

app.get('/delete/:sid', (req, res) => {
    let sid = parseInt(req.params.sid);
    console.log(sid);
    dm.deleteSong(sid, () => {
        res.redirect('/');
    });
});

app.get('/update/:sid', (req, res) => {
    let sid = parseInt(req.params.sid);
    dm.getSong(sid, result => {
        const view = require('./view/update');
        let html = view.updateForm(result);
        res.send(html);
    });
});

app.post('/update', (req, res) => {
    let title = req.body.title;
    let lyrics = req.body.lyrics;
    let sid = parseInt(req.body.sid);
    let params = [title, lyrics, sid];

    dm.updateSong(params, () => {
        res.redirect('/');
    });
});

app.listen(3001, () => {
    console.log('Server Running at http://127.0.0.1:3001');
});