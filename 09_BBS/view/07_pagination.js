router.get('/page/:page', function (req, res, next) {
    let page = req.params.page;
    let sql = "select idx, name, title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate,hit from board";
    conn.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('page', { title: ' 게시판 리스트', rows: rows, page: page, length: rows.length - 1, page_num: 10, pass: true });
        console.log(rows.length - 1);
    });
});
