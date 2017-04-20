/*
 * @CreateTime: Apr 15, 2017 8:47 AM
 * @Author: wh01am
 * @Contact: wh0197m@gmail.com
 * @Last Modified By: wh01am
 * @Last Modified Time: Apr 19, 2017 3:04 PM
 * @Description: init a new blog dir
 */
const path = require('path');
const tildify = require('tildify'); // convert an absolute path to a tildepath: /Users/username/dev -> ~/dev
const Logger = require('../helpers/log');
const spawn = require('child_process').spawn;
const copyFn = require('copy-concurrently');
const chalk = require('chalk');

const SCAFFOLD = path.join(__dirname, '../../scaffold');
let logger = Logger('init.log');

module.exports = function(blogName) {
    let dirName = blogName || 'jurBlog';
    let target = path.resolve(process.cwd(), dirName);

    logger.info('Initializing a new jur blog ...');
    logger.verbose(
        copyFn(SCAFFOLD, target).then(() => {
            process.chdir(target);
            spawn('npm', ['install']).stdout.on('data', (data) => { // will install web server
                logger.info(`${data}`);
            });
        }).catch(err => {
            logger.error(err);
            console.info(chalk.bgRed('Initialing Failed'));
        }))
}