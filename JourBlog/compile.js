var pug = require('pug');
var temp = [{
        "link": "/a/b/c",
        "title": 'yes'
    },
    {
        "link": "c/d/e",
        "title": 'no'
    }
];

pug.renderFile('./templates/pug/nav.pug');