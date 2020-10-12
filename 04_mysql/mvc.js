/* static과 app.post()을 제일 많이 사용한다. */
const express = require('express');
const morgan = require('morgan');
const app = express();
const dm = require('./db/dbModule')

// 데이터 parse해서 받아와야지
// get방식으로 /login에 들어오면?
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    // conn.connect();
    dm.getJoinLists(rows => {
        /* 여기서 getConnection이 없는데... */
        const mainForm = require('./views/mainForm');
        let index = mainForm.mainForm(rows);
        res.send(index);
    })
    // conn.end();
})


app.get('/insert', (req, res) => {
    const insertForm = require('./views/insertForm');
    let html = insertForm.insertForm()
    res.send(html);
});

app.post('/insert', (req, res) => {
    /* body-parser모듈을 익스포트해야지만 아래 형식을 사용 가능 */
    let title = req.body.title;
    let lyrics = req.body.lyrics;
    let params = [title, lyrics];

    // conn.connect();
    dm.insertSong(params, () => {
        res.redirect('/');
    })
    // conn.end();

})

app.get('/delete/:sid', (req, res) => {
    let sid = parseInt(req.params.sid);
    console.log(sid);
    dm.deleteSong(sid, () => {
        res.redirect('/');
    });
})

app.get('/update/:sid', (req, res) => {
    let sid = parseInt(req.params.sid);
    console.log(sid);
    dm.getSong(sid, (result) => {
        const updateForm = require('./views/updateForm');
        let index = updateForm.updateForm(result);
        res.send(index);
    });
})

app.post('/update/', (req, res) => {
    let title = req.body.title
    let lyrics = req.body.lyrics
    let sid = parseInt(req.body.sid)

    params = [title, lyrics, sid]
    console.log(params)
    dm.updateSong(params, () => {
        res.redirect(`/`)
    })
})


app.listen(3000, () => console.log('Server running at http//localhost:3000'));