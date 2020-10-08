const express = require('express');
const fs = require('fs');
const app = express();

const view = require("./view/index");
const template = require('./view/template')

app.use(express.static(__dirname))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

const multer = require('multer')
let upload = multer({ dest: __dirname + '/public/upload' })

app.use(express.static(__dirname + '/public'))



/* app.use((req,res) 로는 절대 안 써. rounting을 안 쓴다는 얘기)
이렇게 쓰면 맨 처음 페이지만 나오고 다음 페이지로 절대 안 넘어가 */

// res는 무조건 화면에 뿌려주는 것! 데이터를 받는 건 어떤 식이래도 req이다

// get방식일때는 req.query 혹은 req.params
// REST를 사용할것이기때문에 qeury.id를 가져올 필요 없다.
// 대신 /id/:id는 req.params 객체로 받는다,
// post로 데이터 받는건 req.body

app.get('/', (req, res) => {
    fs.readdir("data", (e, filelist) => {
        /* 이벤트가 아니라 경로(폴더) 이름 */
        let list = template.listGen(filelist);
        let content = template.HOME_CONTENTS;
        /* 정규표현식으로 입력할 때마다 엔터가 먹게 하기 */
        content = content.replace(/\n/g, '<br>');
        let control = template.buttonGen()
        let html = view.index('Web 기술', list, content, control);
        res.send(html);
    });
})

app.get('/id/:id', (req, res) => {
    fs.readdir("data", (e, filelist) => {
        let title = req.params.id
        let list = template.listGen(filelist);
        let control = template.buttonGen(title)
        let filename = 'data/' + title + '.txt'
        fs.readFile(filename, 'utf8', (e, buffer/* 파일에서 읽은 내용이 */) => {
            // buffer = buffer.replace(/\n/g, '<br>');
            //  "/ 다음엔 정규표현식이다", /g 옵션은 전역에 적용되게
            // Create나 Update할 때 쓰는 게 아니라
            // 파일을 읽을 때 \n를 <br>로 바꿔주는 것
            let html = view.index(title, list, buffer, control); /* index의 content 자리에 들어간다. */
            res.send(html);
        })
    });
})

app.get('/create', (req, res) => {
    // create 뒤에 나와야함
    fs.readdir("data", (e, filelist) => {
        let list = template.listGen(filelist);
        let control = template.buttonGen()
        let content = template.createForm()
        let html = view.index('글 생성', list, content, control);
        res.send(html);
    });
})

app.post('/create', (req, res) => {
    let subject = req.body.subject;
    let description = req.body.description;

    /* 받아온 데이터를 가지고 파일을 써야 하니까 경로를 준다 */
    /* 경로 잘 써야지 페이지가 들어간다 */
    let filepath = 'data/' + subject + '.txt';

    console.log(subject)
    console.log(description)
    console.log(req.image)
    // let image = __dirname + 'public/upload/' + req.files.image.name
    /* fs.writeFile(경로, 내용, 콜백(에러, 하고싶은 일)) */
    fs.writeFile(filepath, description, error => {
        console.log(error);
        console.log('왜? 파일에 적어놓긴 했으나 화면에 뿌리지 않았잖아')
        console.log('에러발생했으나 callback함수로 redirect됨')
        res.status(302).redirect(`/id/${subject}`)
        console.log('여기서 "id/${subject}로 간 거야"')

        // res.writeHead(302, { 'Location': encoded });
        // res.end();
    });
})

app.get('/update/id/:id', (req, res) => {
    /* id를 받아와야 하니까 /update/id/:id로 받으려고 한다 */
    fs.readdir("data", (e, filelist) => {
        let title = req.params.id
        let list = template.listGen(filelist);
        let control = template.buttonGen()
        let filename = 'data/' + title + '.txt'
        fs.readFile(filename, 'utf8', (e, buffer) => {
            let content = template.updateForm(title, buffer)
            let html = view.index(`${title} 수정`, list, content, control); /* index의 content 자리에 들어간다. */
            res.send(html);
        });
    })
})

app.post('/update', (req, res) => {
    let original = req.body.original;
    let subject = req.body.subject;
    let description = req.body.description;

    // original과 subject의 내용은 value=${subject(함수의 파라미터)}로 맨 처음엔 똑같이 들어온다.
    // original이 맨 처음에 들어오고,
    // subject가 나중에 수정된다. 여기서 subject는 제목 칸의 내용!
    // 그래서 밑에 subject가 수정되면 if문을 거는 것이야!

    /* 파람의 속성을 form의 name을 키값으로 해서 찾아오는 것 */

    let filepath = 'data/' + original + '.txt';
    /* 오리지날에다가 파일 엎어치기 */
    fs.writeFile(filepath, description, error => {
        // if (original !== subject) { /* 제목이 바뀌었을 때 */
        //   /* 제목 바꿔서 저장 */
        //   fs.rename(filepath/* 옛날이름 */, `data/${param.subject}.txt`, e => {
        //     res.writeHead(302, { 'Location': encoded });
        //     res.end();
        //   } /* 새이름 */)
        // } else { /* 제목이 안 바뀌면 그냥 그대로*/
        //   res.writeHead(302, { 'Location': encoded });
        //   res.end();
        // }

        /* 하나로 쓰기 */
        if (original !== subject) {
            fs.renameSync(filepath, `data/${subject}.txt`)
        }
        console.log('왜? 파일에 적어놓긴 했으나 화면에 뿌리지 않았잖아')
        console.log('에러발생했으나 callback함수로 redirect됨')
        res.status(302).redirect(`/id/${subject}`)
        console.log('여기서 "id/${subject}로 간 거야"')


    });
})

app.get('/delete/id/:id', (req, res) => {
    let title = req.params.id
    console.log(title);
    fs.readdir("data", (e, filelist) => {
        let list = template.listGen(filelist);
        let control = template.buttonGen()
        let content = template.deleteForm(title)
        let html = view.index('글 삭제', list, content, control);
        res.send(html);
    });
})

// 삭제할 때 value에 띄어쓰기가 제대로 들어오는듯
app.post('/delete', (req, res) => {
    let subject = req.body.subject;

    /* 받아온 데이터를 가지고 파일을 써야 하니까 경로를 준다 */
    /* 경로 잘 써야지 페이지가 들어간다 */
    let filepath = 'data/' + subject + '.txt';
    fs.unlink(filepath, error => {
        res.status(302).redirect('/')
        /* 삭제했으면 subject 아이디로 가는 게 아니라(이미 삭제되었으니까) */
        /* 초기화면인 '/' 으로 가는 게 맞다 */
    });
})

app.get('*', (req, res) => {
    res.status(404).send('Path not found');
})

app.listen(3003, () => console.log('Server running at http//localhost:3003'));