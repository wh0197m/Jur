/*
 * @CreateTime: Apr 15, 2017 8:49 AM
 * @Author: wh01am
 * @Contact: wh0197m@gmail.com
 * @Last Modified By: wh01am
 * @Last Modified Time: Apr 17, 2017 8:03 AM
 * @Description: write a new article
 */
const Logger = require('../helpers/log');
const nconf = require('nconf');
const chalk = require('chalk');

nconf.argv().env().file({ file: path.resolve(__dirname, '../../config/config.json') });
let defaultName = nconf.get('default').article_name;
let defaultCat = nconf.get('default').category;

module.exports = function(article, category) {
    let timeStamp = new Date();
    console.info(timeStamp);
    let name = article || defaultName;
    let cat = category || defaultCat;

    if (!(name && cat)) {
        console.info(`${chalk.bgRed('error')} : please set default article name and category in config.json`);
        process.exit(2);
    }
}