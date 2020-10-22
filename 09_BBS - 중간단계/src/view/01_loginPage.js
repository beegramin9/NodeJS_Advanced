const template = require('./00_template');

exports.loginPage = function () {
    return `
        ${template.header()}
        <div class="container">
        <div id="demo" class="carousel slide" data-ride="carousel">

            <!-- Indicators -->
            <ul class="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" class="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
            </ul>

            <!-- The slideshow -->
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="img/bg1.jpg" alt="comets" width="1100" height="500">
                    <div class="carousel-caption">
                        <h3>Your name </h3>
                        <p>2016 Japanese animated romantic fantasy film</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="img/bg2.jpg" alt="totoro" width="1100" height="500">
                    <div class="carousel-caption">
                        <h3>Totoro</h3>
                        <p>1988 Japanese animated fairy tale film</p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="img/bg3.jpg" alt="lala land" width="1100" height="500">
                    <div class="carousel-caption">
                        <h3>Lala Land</h3>
                        <p>2016 American musical romantic comedy film</p>
                    </div>
                </div>
            </div>

            <!-- Left and right controls -->
            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next" href="#demo" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>
        </div>
        <!-- 대문사진 끝 -->
    </div>

    <!-- 콘테이너 시작 -->
    <div class="container">
        <!-- 그리드 시작 -->
        <div class="row mt-5">
            <!-- mt-5로 Login form과 Carousel 떨어뜨리기 -->
            <!-- 왼쪽 8. invisible -->
            <div class="col-8 invisible"></div>
            <!-- 오른쪽 4 -->
            <div class="col-4">
                <form action="/login" method="POST">
                    <!-- form action에 랜딩페이지 1. smartphone.html을 주면 버튼에 굳이 a href 링크를 달 필요 없다 -->
                    <div class="form-group">
                        <label for="email">ID:</label>
                        <input type="text" class="form-control" id="uid" name="uid" placeholder="Enter ID">
                    </div>
                    <div class="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" class="form-control" id="pwd" name="pwd" placeholder="Enter password">
                    </div>
                    <!-- 그리드 사용해서 버튼 오른쪽으로 밀기 -->
                    <!-- 빈 그리드 -->
                    <div class="form-group form-check">
                        <label class="form-check-label">
                            <input class="form-check-input" type="checkbox">
                            Remember me
                        </label>
                    </div>
                    <!-- html5의 form을 기준으로 input라인을 쓸 수도 있다 -->
                    <!-- <input class="btn-outline-primary" type="submit" value="입력">
                    <input class="btn-outline-danger" type="dismiss" value=" 취소"> -->
                    <button type="submit" class="btn btn-outline-primary btn-sm active">
                        <!-- <a href="1. smartphone.html" style="text-decoration: none;" class="text-white"> -->
                        Submit
                        <!-- </a> -->
                    </button>
                    <button type="submit" class="btn btn-outline-danger btn-sm">Dismiss</button>
                </form>
                <div class="col-4">
                    <!-- 자바스크립트 코드를 이용한 버튼 만들기 -->
                    <button class="btn btn-success btn-sm float-right" onclick="location.href='/user/register'">
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    </div>
        ${template.footer()}
    `
}