/*
 * @CreateTime: Apr 14, 2017 3:47 PM
 * @Author: wh01am
 * @Contact: wh0197m@gmail.com
 * @Last Modified By: wh01am
 * @Last Modified Time: Apr 16, 2017 11:24 AM
 * @Description: logger
 */

const winston = require('winston'); // an useful log module

let logConfig = {
    level: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3
    },
    color: {
        error: 'bgRed',
        warn: 'orange',
        info: 'green',
        verbose: 'cyan'
    }
}

module.exports = function(fileName) {
    winston.addColors(logConfig.color);
    let logger = new(winston.Logger)({
        levels: logConfig.level,
        transports: [
            new(winston.transports.Console)({ colorize: true }),
            // new(winston.transports.File)({
            //     filename: (fileName || 'jur.log')
            // })
        ]
    });
    return logger;
}