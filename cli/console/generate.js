/*
 * @CreateTime: Apr 15, 2017 8:55 AM
 * @Author: wh01am
 * @Contact: wh0197m@gmail.com
 * @Last Modified By: wh01am
 * @Last Modified Time: Apr 19, 2017 10:53 PM
 * @Description: generate static site
 */

const fs = require('fs');
const path = require('path');
const pkgConf = require('pkg-conf');
const spawn = require('child_process').spawn;
const logger = require('../helpers/log')('generate.log');

module.exports = function() {
    if (fs.existsSync(path.resolve(process.cwd(), 'package.json'))) {
        if (!!pkgConf.sync('status').init) {
            spawn('gulp', ['default']).stdout.on('data', (data) => {
                logger.info(`${data}`);
            });
        } else {
            logger.error('Please go to the root directory of your blog and try again!');
            process.exit(2);
        }
    } else {
        logger.error('Please go to the root directory of your blog and try again!');
        process.exit(2);
    }
}