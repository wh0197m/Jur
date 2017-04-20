/*
 * @CreateTime: Apr 14, 2017 11:10 AM
 * @Author: wh01am
 * @Contact: wh0197m@gmail.com
 * @Last Modified By: wh01am
 * @Last Modified Time: Apr 20, 2017 11:18 AM
 * @Description: jur cli
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
            ${chalk.cyan('> jur <command>')}

          ${chalk.bgBlue('Commands')}
            ${chalk.cyan('init')}     : ${chalk.gray('create a new jur-Blog foler.')}
            ${chalk.cyan('add')}      : ${chalk.gray('add a new article.')}
            ${chalk.cyan('preview')}  : ${chalk.gray('server your blog in localhost.')}
            ${chalk.cyan('generate')} : ${chalk.gray('generate your site online.')}

          ${chalk.bgBlue('Examples')}
           ${chalk.cyan('> jur init --dir myBlog')}
                ${chalk.gray(': will create a directory myBlog and initialize it [alias -d]')}
           ${chalk.cyan('> jur add --name myArticle --category tech')}
                ${chalk.gray(': will create a new post which belongs tech category and named by myArticle [alias -n -c]')}
           ${chalk.cyan('> jur preview')}
                ${chalk.gray(': start a server http://localhost:8864')}
           ${chalk.cyan('> jur generate')}
                ${chalk.gray(': generate site online')}
        `
}, {
    alias: {
        d: 'dir',
        n: 'name',
        c: 'category'
    }
});

handle(cli.input[0], cli.flags);
module.exports = cli;