const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const del = require('del');
const sassCompiler = require('gulp-sass');
const pugCompiler = require('gulp-pug');
const chalk = require('chalk');
const replacestream = require('replacestream');
const config = require('./config.json');

const DEST = 'public';

function cachePug(articles) {
    let articles = config.content;
    let navigator = config.nav;
    let len = articles.length;

    // inject .md file to content pug
    for (var index = 0; index < len; index++) {
        var article = articles[index];
        fs.createReadStream(path.join(__dirname, './templates/pug/content.pug'))
            .pipe(replacestream('#{Article}', `../articles/${article.category}/${article.link}`))
            .pipe(fs.createWriteStream(`${DEST}/${article.title}.pug`))
    }

    // inject navigator and articles to nav

}

gulp.task('clean', () => {
    del(['public/**/*']);
    console.info(`${chalk.green('info ')}:Successfully Clean Old Sites`);
})

gulp.task('compile-sass', ['clean'], () => {
    try {
        cachePug(config.content)
    } catch (error) {
        console.info(`${chalk.bgRed('error ')}:${error}`);
    }
    return gulp.src(['templates/scss/**/*.scss'])
        .pipe(sassCompiler.sync().on('error', sassCompiler.logError))
        .pipe(gulp.dest(DEST));
})

gulp.task('copy-pug', () => {
    return gulp.src(['templates/pug/**/*.pug', '!templates/pug/content.pug'])
        .pipe(gulp.dest(DEST));
})

gulp.task('compile-pug', ['compile-sass', 'copy-pug'], () => {
    return gulp.src(['public/**/*.pug'])
        .pipe(pugCompiler({}))
        .pipe(gulp.dest(DEST));
})

gulp.task('default', ['compile-pug', 'copy-pug'], () => {
    del(['public/**/*.pug']);
    console.info(`${chalk.green('info ')}: Congratulations! You have successfully update your sites.`)
});