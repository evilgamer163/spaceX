'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync  = require('browser-sync');

const convertCss = (done) => {
    gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        errLogToConsole: true,
        outputStyle: 'compressed'
    })).on('error', console.error.bind(console))
    .pipe(autoprefixer({
        browsers: ['last 2 version'],
        cascade: false
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());

    done();
};

const startServer = (done) => {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    });

    done();
};

const reloadPage = (done) => {
    browserSync.reload();
    done();
};

const watchFiles = () => {
    gulp.watch('./scss/**/*.scss', convertCss);
    gulp.watch('./**/*.html', reloadPage);
};

gulp.task('default', gulp.parallel(startServer, watchFiles));