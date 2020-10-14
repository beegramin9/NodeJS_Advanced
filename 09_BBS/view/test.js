const template = require('./template');

module.exports.test = function () {
    return `
        ${template.header()}
                        <div class="container">
                        
                        </div>
        ${template.footer()}
    `
}