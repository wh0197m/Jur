/*
 * @CreateTime: Apr 15, 2017 8:52 AM
 * @Author: wh01am
 * @Contact: wh0197m@gmail.com
 * @Last Modified By: wh01am
 * @Last Modified Time: Apr 19, 2017 3:27 PM
 * @Description: cli handler
 */
const chalk = require('chalk')
const path = require('path');
const init = require('./init');
const add = require('./add');
const preview = require('./preview');
const generate = require('./generate');
const Logger = require('../helpers/log');

let logger = Logger('jour.log');
module.exports = function(subcommand, args) {
    let len = Object.keys(args).length;
    switch (subcommand) {
        case 'init':
            if (len === 0 || len === 2) {
                init(args.dir);
            } else {
                logger.error(
                    `
          ${chalk.red('jour init')} ${chalk.gray('just accept 1 arguments')}
          ${chalk.gray('--dir (alias -a) means your blog path')}
${chalk.bgBlue('example')}:
          ${chalk.gray('jour init -d test')}`
                )
            }
            break;
        case 'add':
            if (len === 2 || len === 4) {
                add(args.name, args.category);
            } else {
                logger.error(
                    `
          ${chalk.red('jour add')} ${chalk.gray('just accept 1 or 2 arguments')}
          ${chalk.gray('--name (alias -n) means your article name')}
          ${chalk.gray('--category (alias -n) means how to classify your new article')})
${chalk.bgBlue('example')}:
          ${chalk.gray('jour add -n test')}
          ${chalk.gray('jour add -c life')}
          ${chalk.gray('jour add -n test -c life')}`
                )
            }
            break;
        case 'preview':
            if (len === 0 || len === 2) {
                preview(args.port);
            } else {
                logger.error(
                    `
          ${chalk.red('jour preview')} ${chalk.gray('just accept 1 argument')}
          ${chalk.gray('--port (alias -p) means server port you will set')}
${chalk.bgBlue('example')}:
          ${chalk.gray('jour preview')}
          ${chalk.gray('jour prewview -p 8868')}`
                )
            }
            break;
        case 'generate':
            if (len === 0) {
                generate();
            } else {
                logger.error(
                    `
          ${chalk.red('jour generate')} ${chalk.gray('can not accept any arguments')}
${chalk.bgBlue('example')}:
          ${chalk.gray('jour generate')}`
                )
            }
            break;
        default:
            logger.error(`
            ${chalk.gray('can not resolve your commands, please check')} ${chalk.red('jour --help')}`);
            break;
    }
}