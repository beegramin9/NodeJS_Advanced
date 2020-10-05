const express = require('express');
const util = require('util');
const app = express();


let shoppingRouter = express.Router();
let customerRouter = express.Router();

app.use('/shopping', shoppingRouter);
/* /shopping path로 시작하는 path는 shoppingRouter가 처리하도록 */
app.use('/customer', customerRouter);
/* /customer path로 시작하는 path는 customerRouter 처리하도록 */



// 여기서 좋은 점은 아래의 포트들을 개별 파일로 뽑아낼 수 있다는 것

app.get('/', (req, res) => {
    res.send('root Router');
})

shoppingRouter.get('/', (req, res) => {
    res.send('shopping Router');
}) /* /shopping/뒤에 애들 */

customerRouter.get('/', (req, res) => {
    res.send('customer Router');
}) /* /customer/뒤에 애들 */

customerRouter.get('/index', (req, res) => {
    res.send('customer Router index');
}) /* /customer/index 뒤에 애들 */







app.get('*', (req, res) => {
    res.status(404).send('Path not found')
});


app.listen(3000, () => util.log('Server running at http//localhost:3000'));
