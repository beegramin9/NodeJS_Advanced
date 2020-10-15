module.exports = {
    header: function () {
        /* source 들어가있고 head끝까지 */
        return `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
            <title>My BBS</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css"> 
            <link rel="stylesheet" href="/fonts/css/all.min.css">
            <script src="/jquery/jquery.min.js"></script>
            <script src="/popper/popper.min.js"></script>
            <script src="/bootstrap/js/bootstrap.min.js"></script>
        </head>
        `
    },
    /* 상단 NAVBAR까지 */
    headNavBar: function () {
        return `
        <body style="padding-top:70px">
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
            <a class="navbar-brand" href="#">
                <img src="/img/hoseo.png" alt="호서직업능력개발원"
                    style="height: 40px; margin-left: 50px; margin-right: 100px;">
            </a>
            <ul class="nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="#"><i class="fas fa-home"></i>홈</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/logout">로그아웃</a>
                </li>
            </ul>
            <div class="navbar-text fixed-right" id="weather">
                홍길동님 반갑습니다.&nbsp;&nbsp;&nbsp;&nbsp;
                <i class="fas fa-cloud-sun"></i> 20&deg;C
            </div>
        </nav>
        `
    },

    /* 하단 NAVBAR까지 */
    footNavBar: function () {
        return `
        <nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-center fixed-bottom">
        <span class="navbar-text">
            Copyright &copy; 2020 Hoseo Institute of Big Data
        </span>
        </nav>
        `
    },
    footer: function () {
        return `
            </body>
        </html>
        `
    }
}