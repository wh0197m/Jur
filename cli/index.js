/*
 * @CreateTime: Apr 14, 2017 11:10 AM
 * @Author: wh01am
 * @Contact: wh0197m@gmail.com
 * @Last Modified By: wh01am
 * @Last Modified Time: Apr 14, 2017 4:04 PM
 * @Description: jour cli
 */


const chalk = require('chalk'); // format console output with colors
const path = require('path');
const arguments = require('minimist')(process.argv.slice(2)); // get cli arguments

function cli(cwd, args) {
    let cwd = cwd || process.cwd();
    let log =
        function handleError(err) {
            log.fatal(err);
            process.exit(2);
        }

};

cli.console = {

};

cli.version = require('../package.json').version;

function loadModule(path, args) {

};

function watchSignal() {

};

module.exports = cli;