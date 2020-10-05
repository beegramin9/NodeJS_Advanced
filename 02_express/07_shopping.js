const express = require('express');
const app = express();




let shoppingRouter = express.Router();

app.use('/shopping', shoppingRouter);

// 여기서 좋은 점은 아래의 포트들을 개별 파일로 뽑아낼 수 있다는 것

shoppingRouter.get('/', (req, res) => {
    res.send('shopping Router');
}) /* /customer/뒤에 애들 */

shoppingRouter.get('/index', (req, res) => {
    res.send('shopping Router index');
}) /* /customer/index 뒤에 애들 */

module.exports = shoppingRouter;