/*
 * @CreateTime: Apr 14, 2017 11:10 AM
 * @Author: wh01am
 * @Contact: wh0197m@gmail.com
 * @Last Modified By: wh01am
 * @Last Modified Time: Apr 19, 2017 3:27 PM
 * @Description: jour cli
 */

const chalk = require('chalk'); // format console output with colors
const path = require('path');
const meow = require('meow');
const handle = require('./console');
const logo = require('./helpers/logo');

const cli = meow({
    description: chalk.green(logo),
    version: '0.0.1',
    help: `
          ${chalk.bgBlue('Usage')}
            ${chalk.cyan('> jour <command>')}

          ${chalk.bgBlue('Commands')}
            ${chalk.cyan('init')}     : ${chalk.gray('create a new Jour-Blog foler.')}
            ${chalk.cyan('add')}      : ${chalk.gray('add a new article.')}
            ${chalk.cyan('preview')}  : ${chalk.gray('server your blog in localhost.')}
            ${chalk.cyan('publish')}  : ${chalk.gray('publish your site online.')}

          ${chalk.bgBlue('Examples')}
           ${chalk.cyan('> jour init --dir myBlog')}
                ${chalk.gray(': will create a directory myBlog and initialize it [alias -d]')}
           ${chalk.cyan('> jour add --name myArticle --category tech')}
                ${chalk.gray(': will create a new post which belongs tech category and named by myArticle [alias -n -c]')}
           ${chalk.cyan('> jour preview --port 8876')}
                ${chalk.gray(': start a server http://localhost:8876 [alias -p]')}
           ${chalk.cyan('> jour publish')}
                ${chalk.gray(': publish site online')}
        `
}, {
    alias: {
        d: 'dir',
        n: 'name',
        c: 'category',
        p: 'port'
    }
});

handle(cli.input[0], cli.flags);
module.exports = cli;