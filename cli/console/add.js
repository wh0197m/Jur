/*
 * @CreateTime: Apr 15, 2017 8:49 AM
 * @Author: wh01am
 * @Contact: wh0197m@gmail.com
 * @Last Modified By: wh01am
 * @Last Modified Time: Apr 17, 2017 4:40 PM
 * @Description: write a new article
 */
const fs = require('fs');
const nconf = require('nconf');
const chalk = require('chalk');
const path = require('path');
const copyFn = require('copy-concurrently');
const shell = require('shelljs');
const Logger = require('../helpers/log');

const template = path.join(__dirname, '../../scaffold/templates/template.md');
let logger = Logger('add.log');

nconf.env().argv().file('jourConf', path.resolve(__dirname, '../../config.json'));
nconf.load();

let defaultName = nconf.get('default').article_name;
let defaultCat = nconf.get('default').category;

module.exports = function(article, category) {
    let timeStamp = new Date();
    let name = article || defaultName;
    let cat = category || defaultCat;
    let target = path.resolve(process.cwd(), `articles/${cat}`);

    if (!fs.existsSync(target)) {
        shell.mkdir('-p', target)
    }

    if (!(name && cat)) {
        console.info(`${chalk.bgRed('error')} : please set default article name and category in config.json`);
        process.exit(2);
    }

    // if category has been exist or not
    if (nconf.get(`nav:${cat}`)) {
        let currentCount = nconf.get(`nav:${cat}`);
        nconf.set(`nav:${cat}`, currentCount);
        copyFn(template, `${target}/${name}.md_${timeStamp}`).then(() => {
            logger.info(`Successfully create a new article which named ${name}.md_${timeStamp}`)
        })
    } else {
        nconf.set(`nav:${cat}`, 1);
        copyFn(template, `${target}/${name}.md_${timeStamp}`).then(() => {
            logger.info(`Successfully create a new category and article which named ${name}.md_${timeStamp}`)
        })
    }

    nconf.save();
}