const crypto = require('crypto')

/* 해시 생성 */
/* SHA: Secure Hash Algorithm */
const shasum = crypto.createHash('sha256')
/* sha256, sha512 해시를 만드는 알고리즘 */
shasum.update('password')
/* 패스워드가 들어감. 패스워드를 해시로 업데이트 */
let output = shasum.digest('base64')
/* hex: 16진수로 소화함(만듦) , base64: 알파벳 대/소문자, 특수기호 사용해서 복호화*/
console.log('password', output, output.length)