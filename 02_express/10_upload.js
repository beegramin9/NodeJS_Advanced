const express = require('express');
const app = express();


// 데이터 parse해서 받아와야지
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

/* 파일을 먼저 읽어야겠지? */
const fs = require('fs');
/* 제일 먼저 화면에 10_fileUploadForm.html을 뿌려주는 코드 만들기 */
app.get('/', (req, res) => {
    fs.readFile('10_fileUploadForm.html', 'utf8', (e, data) => {
        res.send(data);
    });
});

const multer = require('multer')
let upload = multer({ dest: __dirname + '/public/upload' })


// public 밑에다가 upload 폴더를 하나 더 만들어서 그쪽으로 데이터가 갈 수 있게
// multer가 업로드할 수 있는 경로를 객체형태로 줌
// app.use(multer({ uploadDir: __dirname + '/public/upload' }))
// 파일 업로드할 때마다 upload파일에 들어가게 됩니다.
// 대신 파일이름은 내가 의도한게 아니라 무작위로 들어가게 됨


app.post('/', (req, res) => {
    // let comment = req.body.comment;
    // let filename = req.files.image.name;

    // let filetype = req.files.image.type;
    // let uploadPath = req.files.image.path;

    console.log(req.files);
    // 파일을 post에서 받았을 때 서버에서는 어떤 변화가 생길까?
    console.log(req.body); /* 얘네 형태를 보면 Class객체라는 걸 알 수 있음 */
    // console.log(comment);
    // console.log(filename);
    // console.log(filetype);
    // console.log(uploadPath);

    // 받은 파일이 이미지면, 시스템에서 무작위로 들어온 이름을 변경하고 아니면 제거함
    if (filetype.indexOf('image') >= 0) {
        let outPutName = comment + filename;
        let newFileName = __dirname + 'public/upload/' + outPutName
        fs.rename(uploadPath, newFileName, error => {
            res.send(`<h1>${newFileName}</h1>`)
        })
    } else {
        // 
    }
})




app.listen(3000, () => console.log('Server running at http//localhost:3000'));