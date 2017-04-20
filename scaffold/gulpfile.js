const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const del = require('del');
const sassCompiler = require('gulp-sass');
const pugCompiler = require('gulp-pug');
const chalk = require('chalk');
const replacestream = require('replacestream');
const replace = require('replace-in-file');
const config = require('./config.json');
const rename = require('gulp-rename');
const livereload = require('gulp-server-livereload');

const DEST = 'public';

function cachePug(config) {
    let articles = config.content;
    let navigator = config.nav;
    let len = articles.length;

    let options = {
        files: './templates/pug/cache.pug',
        from: ['#{Navigators}', '#{Contents}'],
        to: [JSON.stringify(navigator), JSON.stringify(articles)],
        encoding: 'utf8'
    };

    replace.sync(options);

    // inject .md file to content pug
    for (var index = 0; index < len; index++) {
        var article = articles[index];
        if (index !== (len - 1)) {
            fs.createReadStream(path.join(__dirname, './templates/pug/cache.pug'))
                .pipe(replacestream('#{Article}', `../articles/${article.category}/${article.title}.md`))
                .pipe(fs.createWriteStream(`${DEST}/${article.title}.pug`))
        } else {
            fs.createReadStream(path.join(__dirname, './templates/pug/cache.pug'))
                .pipe(replacestream('#{Article}', `../articles/${article.category}/${article.title}.md`))
                .pipe(fs.createWriteStream(`${DEST}/index.pug`))
        }
    }
}

gulp.task('clean', () => {
    del(['public/**/*']);
    console.info(`${chalk.green('info ')}:Successfully Clean Old Sites`);
    return gulp.src('templates/pug/content.pug')
        .pipe(rename("cache.pug"))
        .pipe(gulp.dest('templates/pug'))
})

gulp.task('compile-sass', ['clean'], () => {
    try {
        cachePug(config);
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

gulp.task('server', ['compile-pug'], () => {
    del(['public/**/*.pug', 'templates/pug/cache.pug']);
    gulp.src('public')
        .pipe(livereload({
            livereload: true,
            host: config.preview.server,
            port: config.preview.port,
            open: true
        }))
})

gulp.task('default', ['compile-pug', 'copy-pug'], () => {
    del(['public/**/*.pug', 'templates/pug/cache.pug']);
    console.info(`${chalk.green('info ')}: Congratulations! You have successfully update your sites.`)
});