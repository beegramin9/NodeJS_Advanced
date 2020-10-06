const express = require('express');
const fs = require('fs');
const app = express();

const view = require("./view/index_image");
const template = require('./view/template_image')

app.use(express.static(__dirname))

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

const multipart = require('connect-multiparty')
app.use(multipart({ uploadDir: __dirname + '/public/fileWebImage' }))
app.use(express.static(__dirname + '/public/fileWebImage'))
/* 이미지 가져다 쓰려면 필요함 */



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
        let html = view.index('Web 기술', list, content, control, true);
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
            buffer = buffer.replace(/\n/g, '<br>');
            //  "/ 다음엔 정규표현식이다", /g 옵션은 전역에 적용되게
            // Create나 Update할 때 쓰는 게 아니라
            // 파일을 읽을 때 \n를 <br>로 바꿔주는 것
            let html = view.index(title, list, buffer, control, true); /* index의 content 자리에 들어간다. */
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
        let html = view.index('글 생성', list, content, control, false);
        res.send(html);
    });
})

app.post('/create', (req, res) => {
    let subject = req.body.subject;
    let description = req.body.description;

    /* 받아온 데이터를 가지고 파일을 써야 하니까 경로를 준다 */
    /* 경로 잘 써야지 페이지가 들어간다 */
    let filepath = 'data/' + subject + '.txt';

    /* fs.writeFile(경로, 내용, 콜백(에러, 하고싶은 일)) */
    fs.writeFile(filepath, description, error => {
        /* 파일로 들어온 이후에 처리해야함 */
        /* 이미지 처리 */
        let imageName = subject + '.jpg';
        let uploadPath = req.files.image.path;
        /* 이미지를 받으면 시스템이 무작위로 이름을 이상하게 준다 */
        let newFileName = __dirname + '/public/fileWebimage/' + imageName
        /* 그 이상한 이름이 싫어서 내가 subject.jpg로 이름을 바꿔준다. */
        fs.rename(uploadPath, newFileName, error => {
            res.redirect(`/id/${subject}`)
        })

        // res.status(302).redirect(`/id/${subject}`)
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
            let html = view.index(`${title}`, list, content, control, true); /* index의 content 자리에 들어간다. */
            /* title 수정 으로 하면 이미지 이름이 달라져서 읽을 수 없다 */
            res.send(html);
        });
    })
})

app.post('/update', (req, res) => {
    let original = req.body.original;
    let subject = req.body.subject;
    let description = req.body.description;

    let filepath = 'data/' + original + '.txt';
    let imagePath = 'public/fileWebImage/' + original + '.jpg'
    console.log('파일/이미지 경로는 잘 들어옴');
    /* 오리지날에다가 파일 엎어치기 */
    fs.writeFile(filepath, description, error => {
        // if (original !== subject) { /* 제목이 바뀌었을 때 */

        if (original !== subject) {
            console.log('제목 다르게 들어와서 제목 원래대로 바꿈');
            fs.renameSync(filepath, `data/${subject}.txt`)
            fs.renameSync(imagePath, `public/fileWebImage/${subject}.jpg`)
            // 여기 스펠링이 틀렸었음
        }
        /* 이미지 처리 */

        let uploadPath = req.files.image.path; console.log(uploadPath)
        let uploadType = req.files.image.type; console.log(uploadType)

        if (uploadType.indexOf('image') >= 0) {
            // 이미지 처리  
            let imageName = subject + '.jpg';
            /* 이미지를 받으면 시스템이 무작위로 이름을 이상하게 준다 */
            let newFileName = __dirname + '/public/fileWebimage/' + imageName
            /* 그 이상한 이름이 싫어서 내가 subject.jpg로 이름을 바꿔준다. */
            fs.rename(uploadPath, newFileName, error => {
                console.log('이미지 들어옴');

                res.redirect(`/id/${subject}`)
            });
        } else { /* 이미지가 아닐 경우 파일 삭제 */
            fs.unlink(uploadPath, error => {
                console.log('이미지 아닌 애(제목수정/내용수정)가 들어와서 파일삭제됨');
                res.status(302).redirect(`/id/${subject}`)
            });
        }
        /* !req.files면 사진이 아예 안 들어왔다 */
        // if (req.files) {
        //     console.log(req.files)
        // } else /* !req.files =(undefiend) 일땐 아예 아무것도 안 들어왔으니까 */ {
        // }
    });
});

app.get('/delete/id/:id', (req, res) => {
    let title = req.params.id
    console.log(title);
    fs.readdir("data", (e, filelist) => {
        let list = template.listGen(filelist);
        let control = template.buttonGen()
        let content = template.deleteForm(title)
        let html = view.index('글 삭제', list, content, control, false);
        res.send(html);
    });
})

// 삭제할 때 value에 띄어쓰기가 제대로 들어오는듯
app.post('/delete', (req, res) => {
    let subject = req.body.subject;

    /* 받아온 데이터를 가지고 파일을 써야 하니까 경로를 준다 */
    /* 경로 잘 써야지 페이지가 들어간다 */
    let filepath = 'data/' + subject + '.txt';
    let imagepath = '/public/fileWebimage' + req.body.subject + '.jpg';

    fs.unlink(filepath, error => {
        fs.unlink(imagepath, error => {
            res.status(302).redirect('/')
        })
        /* 삭제했으면 subject 아이디로 가는 게 아니라(이미 삭제되었으니까) */
        /* 초기화면인 '/' 으로 가는 게 맞다 */
    });
})

app.get('*', (req, res) => {
    res.status(404).send('Path not found');
})

app.listen(3004, () => console.log('Server running at http//localhost:3004'));