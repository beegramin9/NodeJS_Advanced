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
    let ggname = req.body.ggname;
    let debut = req.body.debut;
    let hitSongId = req.body.hit_song_Id;
    let params = [ggname, debut, hitSongId]
    dm.insertGroup(params, () => {
        res.redirect('/')
    });
})

app.get('/delete/:ggid', (req, res) => {
    let ggid = req.params.ggid;
    dm.deleteGroup(ggid, () => {
        res.redirect('/')
    })
})

app.get('/update/:ggid', (req, res) => {
    let ggid = parseInt(req.params.ggid);
    dm.songToUpdate(ggid, result => {
        const view = require('./view/update')
        let html = view.updateForm(result);
        res.send(html);
        /* result = function(ggid) */
        // songToUpdate 함수를 쓸 때는
        // 내가 ggid를 parameter로 주고
        // 그 결과를 callback으로 받겠다
        // callback을 rows[0]로 받으면

        // 실제 mvc.js에서 사용할 때는
        // getSong(sid, result) <-- result는 getSong함수에서 받은 결과 callback(rows[0])
        // 즉 result는 rows[0]가 된다.
    })
})

app.post('/update', (req, res) => {
    let ggid = parseInt(req.body.ggid);
    let ggname = req.body.NAME;
    let debut = req.body.debut;
    let hitSongId = req.body.hit_song_Id;
    let params = [ggname, debut, hitSongId, ggid]
    dm.updateGroup(params, () => {
        res.redirect('/');
    })
})

app.listen(3000, () => {
    console.log('Server Running at http://127.0.0.1:3000');
});