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
    /* 지금 사용자가 세션으로 안 들어가고 result로 들어가는 것 같거든 */
    headNavBar: function (uname) {
        if (!uname) {
            return `
            <body style="padding-top:70px ; padding-bottom:70px">
            <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
                <a class="navbar-brand" href="/page/1">
                    <img src="/img/hoseo.png" alt="호서직업능력개발원"
                        style="height: 40px; margin-left: 50px; margin-right: 100px;">
                </a>
                <ul class="nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/page/1"><i class="fas fa-home"></i>홈</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/login">로그인</a>
                    </li>
                </ul>
                <form class="form-inline" action="/search" method="post">
                    <input type="text" class="form-control" name="search" id="search" placeholder="검색어를 입력하세요.">
                    <button type="submit" class="btn btn-primary btn-sm">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
                &nbsp;&nbsp;&nbsp;&nbsp;

                <div class="navbar-text fixed-right" id="weather">
                일반 사용자님 반갑습니다.&nbsp;&nbsp;&nbsp;&nbsp;
                    <i class="fas fa-cloud-sun"></i> 20&deg;C
                </div>
            </nav>
            `
            /* 아마 디자인을 column으로 나눠야 하나...? */
        } else {
            return `
            <body style="padding-top:70px ; padding-bottom:70px">
            <nav class="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
                <a class="navbar-brand" href="/page/1">
                    <img src="/img/hoseo.png" alt="호서직업능력개발원"
                        style="height: 40px; margin-left: 50px; margin-right: 100px;">
                </a>
                <ul class="nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/page/1"><i class="fas fa-home"></i>홈</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/logout">로그아웃</a>
                    </li>
                </ul>
                <form class="form-inline" action="/search" method="post">
                    <input type="text" class="form-control" name="search" id="search" placeholder="검색어를 입력하세요.">
                    <button type="submit" class="btn btn-primary btn-sm">검색</button>
                </form>
                &nbsp;&nbsp;&nbsp;&nbsp;
                
                <div class="navbar-text fixed-right" id="weather">
                    ${uname}님 반갑습니다.&nbsp;&nbsp;&nbsp;&nbsp;
                    <i class="fas fa-cloud-sun"></i> 20&deg;C
                </div>
            </nav>
            `
        }
    },
    afterLogin: function (uname) {
        if (!uname) {
            return ``
        } else {
            return `
        <p>${uname}님 환영합니다. &nbsp;&nbsp; <a href="/logout">로그아웃</a></p>
        `
        }
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