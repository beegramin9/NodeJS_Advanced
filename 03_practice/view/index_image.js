exports.index = function (title, list, content, control, showimage) {
    let tdImg = `<td></td>`
    if (showimage)
        tdImg = ` <td width="300">
                    <img style="margin-left:30px;" src = "/${title}.jpg" alt="${title}">
                 </td>`
    return `
    <!DOCTYPE html>
    <html lang="ko">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    
    <body>
        <h1><a href="/">Web 기술</a></h1>
            ${list}
        <hr>
        <table>
            <tr>
                <td width="300" >
                    ${content}
                </td>
               ${tdImg}
            </tr>
        </table>
        <hr>
        ${control}       
    </body>
    </html>
`
}

/*  Web 기술 a 태그: CSS, HTML, JavaScript 페이지로 이동했을 때, 다시 원래 페이지로 돌아올 수 있게 하는 것 */
/* localhost:3000/?id=HTML */
/* localhost:3000/?id=CSS */