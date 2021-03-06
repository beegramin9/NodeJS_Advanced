module.exports = {
    alertMsg: function (message, url) {
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
    `
    },

    alertMsgHistory: function (message) {
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
                        alert(message);
                        window.history.go(-1);
                    </script>
                </body>
                </html>
            `;
    },
    alertMsgBack2Steps: function (message) {
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
                        alert(message);
                        window.history.go(-2);
                    </script>
                </body>
                </html>
            `;
    }

}
