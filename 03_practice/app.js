const express = require('express');
const fs = require('fs');
const app = express();

const view = require("./view/index");
const template = require('./view/template')

app.use(express.static(__dirname))

// let createRouter = express.Router();
// let updateRouter = express.Router();
// let deleteRouter = express.Router();

// app.use('/create', createRouter);
// app.use('/update', updateRouter);
// app.use('/delete', deleteRouter);

const bodyParser = require('body-parser');
const { get } = require('http');
app.use(bodyParser.urlencoded({ extended: false }))

/* app.use((req,res) 로는 절대 안 써. rounting을 안 쓴다는 얘기)
이렇게 쓰면 맨 처음 페이지만 나오고 다음 페이지로 절대 안 넘어가 */


app.get('/', (req, res) => {
    let queryId = req.query.id
    if (!queryId) {
        /* 처음에 /만 나와 있을 때, 즉 id를 가진 버튼을 아무것도 누르지 않았을 때 */
        /* 버튼을 안 눌러도, 밑에 create 했을 때 새로운 id로 들어오면 else로 들어가서 새롭게
        html 구조를 생성하게 된다. */
        fs.readdir("data", (e, filelist) => {
            /* 이벤트가 아니라 경로(폴더) 이름 */
            let list = template.listGen(filelist);
            let content = template.HOME_CONTENTS;
            /* 정규표현식으로 입력할 때마다 엔터가 먹게 하기 */
            /* 여기서 해 놓으면 이미 엔터가 먹혔으므로 나중에  */
            content = content.replace(/\n/g, '<br>');
            let control = template.buttonGen()
            let html = view.index('Web 기술', list, content, control);
            res.end(html);
        });
    } else {
        fs.readdir("data", (e, filelist) => {
            let title = queryId
            let list = template.listGen(filelist);
            let control = template.buttonGen(title)
            let filename = 'data/' + title + '.txt'
            fs.readFile(filename, 'utf8', (e, buffer/* 파일에서 읽은 내용이 */) => {
                /* 정규표현식으로 입력할 때마다 엔터가 먹게 하기 */
                buffer = buffer.replace(/\n/g, '<br>');
                let html = view.index(title, list, buffer, control); /* index의 content 자리에 들어간다. */
                res.end(html);

            })
        });
    }
})

app.get('/create', (req, res) => {
    // create 뒤에 나와야함
    fs.readdir("data", (e, filelist) => {
        let list = template.listGen(filelist);
        let control = template.buttonGen()
        let content = template.createForm()
        let html = view.index('글 생성', list, content, control);
        res.end(html);
    });
})

app.post('/create_proc', (req, res) => {
    let subject = req.body.subject;
    let description = req.body.description;
    // let param = qs.parse(body);
    /* body에는 데이터가 뭉텅이로 들어오는데 qs로 parse해서 분리*/
    // console.log(param.subject, param.description)

    /* 받아온 데이터를 가지고 파일을 써야 하니까 경로를 준다 */
    /* 경로 잘 써야지 페이지가 들어간다 */
    let filepath = 'data/' + subject + '.txt';
    /* fs.writeFile(경로, 내용, 콜백(에러, 하고싶은 일)) */
    fs.writeFile(filepath, description, error => {
        res.writeHead(302, { 'Location': `/?id=${subject}` });

        res.end();
    });

})

app.get('/delete', (req, res) => {
    let queryId = req.query.id

    fs.readdir("data", (e, filelist) => {
        let list = template.listGen(filelist);
        let control = template.buttonGen()
        let content = template.deleteForm(queryId)
        let html = view.index('글 삭제', list, content, control);
        res.end(html);
    });
})

app.post('/delete_proc', (req, res) => {
    let subject = req.body.subject;
    console.log(subject)
    let description = req.body.description;

    /* body에는 데이터가 뭉텅이로 들어오는데 qs로 parse해서 분리*/
    // console.log(param.subject, param.description)

    /* 받아온 데이터를 가지고 파일을 써야 하니까 경로를 준다 */
    /* 경로 잘 써야지 페이지가 들어간다 */
    let filepath = 'data/' + subject + '.txt';
    console.log(filepath)
    /* fs.writeFile(경로, 내용, 콜백(에러, 하고싶은 일)) */
    fs.unlink(filepath, error => {

        res.writeHead(302, { 'Location': '/' });
        res.end();
    });

})




app.listen(3003, () => console.log('Server running at http//localhost:3003'));

