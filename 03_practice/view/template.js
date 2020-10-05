/* 객체를 만들어 export하기 */
module.exports = {
    HOME_CONTENTS: `웹 개발(web development)은 인터넷(월드 와이드 웹)이나 인트라넷(사설망)을 위한 웹사이트를 개발하는 일을 가리킨다. 웹 개발은 가장 단순한 단일 정적 문서의 플레인 텍스트에서부터 가장
    복잡한 웹 기반 인터넷 애플리케이션, 전자 비즈니스, 소셜 네트워크 서비스에 이르기까지 개발 범위가 다양하다. 일반적으로 웹 개발이라 부를 때는 웹 프로그래밍뿐만 아니라 더 포괄적인 작업인 웹 디자인,
    웹 콘텐츠 개발, 클라이언트 사이드/서버 사이드 스크립트 작업, 웹 서버 및 네트워크 보안 구성, 전자 상업 개발을 아우른다.
    `,
    /* 파일 리스트를 인풋으로 받아서 리스트로 리턴*/
    listGen: function (filelist) {
        let list = '<ul>\n'
        for (let file of filelist) {
            let filename = file.substring(0, file.length - 4);
            /* filename for문 안에서만 선언되고 밖에서는 없어지는 지역변수 */
            list += `<li><a href="/?id=${filename}">${filename}</a></li>\n`;
        }
        list += '</ul>'
        // console.log(list);
        /* 3 목차가 한 번에 나오는 것 */
        /* 페이지가 바뀌어도 모든 리스트가 남아있어야 하니까 */
        return list
    },
    buttonGen: function (title) {
        /* 홈 화면에서는 title 쿼리가 없으니까 경우 나눠야 함 */
        if (!title) {
            return `
            <button onclick="location.href='/create'">추가</button>
            <button >수정</button>
            <button >삭제</button>
            ` /* 홈 화면에서는 수정/삭제가 되면 안 되니까 빈 껍데기만 */
            /* button onclick 이건 html 문법, html 문법은 항상 onclick= "안에는 자바스크립트" 큰 따옴표*/
            /* 그래서 항상 큰 따옴표 안에 작은 따옴표, 순서가 바뀌면 안 됨 */
        } else {
            return `
            <button onclick="location.href='/create'">추가</button>
            <button onclick="location.href='/update?id=${title}'">수정</button>
            <button onclick="location.href='/delete?id=${title}'">삭제</button>
            `
        }

    },
    createForm: function () {
        return `
        <form  action="/create_proc" method="POST">
            <table>
                <tr>
                    <td><label>제목</label></td>
                    <td><input type="text" name="subject"></td>
                </tr>
                <tr>
                    <td><label>내용</label></td>
                    <td><textarea name="description" cols="40" rows="5"></textarea></td>
                </tr>
                <tr>
                    <td colspan="2" style="textalign:center;"><input type="submit" value="생성"></td>
                </tr>
            </table>
        </form>
        `
    },
    deleteForm: function (subject) {
        return `
        ${subject} 을/를 삭제하겠습니까?
        <form action="/delete_proc" method="POST">
        
          <input type="hidden" name="subject" value=${subject}>
          <input type="submit" value="삭제">
                   
        </form>
        `
    }, /* hidden으로 하면 화면에는 안 보이지만 여전히 name데이터로 어떤 애를 삭제하는지 보낼 수 있다. */
    updateForm: function (subject, description) {
        return `
        ${subject} 을/를 업데이트하시겠습니까?
        <form action="/update_proc" method="POST">
            <input type="hidden" name="original" value="${subject}">
            <table>
                <tr>
                    <td><label>제목</label></td>
                    <td><input type="text" name="subject" value="${subject}"></td>
                </tr>
                <tr>
                    <td><label>내용</label></td>
                    <td><textarea name="description" cols="40" rows="5">${description}</textarea></td>
                </tr>
                <tr>
                    <td colspan="2" style="textalign:center;"><input type="submit" value="수정"></td>
                </tr>
            </table>
          
        </form>        
        `
        /* original은 오직 app.js에서 param.속성으로 찾아올 수 있는 지표일 뿐
        form 구조에서는 안 보이게 hidden으로 만든다. */
    }

}
/* input에서의 name은 서버의 body로 들어가기 때문에 잘 써야 합니다.
나중에 param = body.*/
/* localhost:3000/?id=HTML */
/* localhost:3000/?id=CSS */