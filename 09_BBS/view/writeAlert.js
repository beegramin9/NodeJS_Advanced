module.exports.writeAlert = function (message, url) {
    return `
        <!doctype html>
        <html>
        <head>
            <title>Alert Message</title>
            <meta charset="utf-8">
        </head>
        <body>
            <script>
                var message = '${message}';
                var returnUrl = '${url}';
                alert(message);
                document.location.href = returnUrl;
            </script>
        </body>
        </html>
    `;
    /* Alert창에 있는 버튼을 누르면 Alert 이벤트는 끝! */
    /* 그러면 alert(message)까지 완료된 것 */
    /* 이벤트가 끝남과 동시에 */
    /* document.location.href = returnUrl;로 페이지 이동 */
}