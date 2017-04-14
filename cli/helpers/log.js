/*
 * @CreateTime: Apr 14, 2017 3:47 PM
 * @Author: wh01am
 * @Contact: wh0197m@gmail.com
 * @Last Modified By: wh01am
 * @Last Modified Time: Apr 14, 2017 4:01 PM
 * @Description: logger
 */

const winston = require('winston'); // an useful log module

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
    colorize: true,
    timestamp: function() {
        var date = new Date();
        return (!!nconf.get('json-logging')) ? date.toJSON() : date.getDate() + '/' + (date.getMonth() + 1) + ' ' + date.toTimeString().substr(0, 8) + ' [' + global.process.pid + ']';
    },
    level: nconf.get('log-level') || (global.env === 'production' ? 'info' : 'verbose'),
    json: (!!nconf.get('json-logging')),
    stringify: (!!nconf.get('json-logging'))
});

exports = function(config) {
    let logger = new winston.Logger({
        level: 'info',
        transports: [
            new(winston.transports.Console)(),
            new(winston.transports.File)({ filename: 'jour.log' })
        ]
    });
}