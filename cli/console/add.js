/*
 * @CreateTime: Apr 15, 2017 8:49 AM
 * @Author: wh01am
 * @Contact: wh0197m@gmail.com
 * @Last Modified By: wh01am
 * @Last Modified Time: Apr 19, 2017 11:03 PM
 * @Description: write a new article
 */
const fs = require('fs');
const nconf = require('nconf');
const chalk = require('chalk');
const path = require('path');
const copyFn = require('copy-concurrently');
const shell = require('shelljs');
const Logger = require('../helpers/log');

const template = path.join(__dirname, '../default/template.md');
let logger = Logger('add.log');

module.exports = function(article, category) {
    if (!fs.existsSync(path.resolve(process.cwd(), 'config.json'))) {
        logger.error(`Cant't find config.json file in current directory`);
        process.exit(2);
    }

    nconf.env().argv().file('jourConf', path.resolve(process.cwd(), 'config.json'));

    let defaultName = nconf.get('default').article_name;
    let defaultCat = nconf.get('default').category;
    let name = article || defaultName;
    let cat = category || defaultCat;
    let target = path.resolve(process.cwd(), `articles/${cat}`);
    let totalContents = nconf.get('content');

    if (!fs.existsSync(target)) {
        shell.mkdir('-p', target)
    }

    if (!(name && cat)) {
        console.info(`${chalk.bgRed('error')} : please set default article name and category in config.json`);
        process.exit(2);
    }

    // if category has been exist or not
    if (nconf.get(`nav:${cat}`)) {
        nconf.load();

        // update navigators
        let currentCount = nconf.get(`nav:${cat}`);
        nconf.set(`nav:${cat}`, currentCount + 1);

        // update articles
        totalContents.push({
            "title": `${name}`,
            "category": `${cat}`,
            "link": `${name}.html`
        });
        nconf.set('content', totalContents);
        copyFn(template, `${target}/${name}.md`).then(() => {
            logger.info(`Successfully create a new article which named ${name}.md`)
            nconf.save();
        }).catch((error) => {
            logger.error('This article name has already existed.');
        })
    } else {
        nconf.load();

        // update navigators
        nconf.set(`nav:${cat}`, 1);

        // update articles
        totalContents.push({
            "title": `${name}`,
            "category": `${cat}`,
            "link": `${name}.html`
        });
        nconf.set('content', totalContents);
        copyFn(template, `${target}/${name}.md`).then(() => {
            logger.info(`Successfully create a new category and article which named ${name}.md`)
            nconf.save();
        }).catch((error) => {
            logger.error('This article name has already existed.');
        })
    }
}