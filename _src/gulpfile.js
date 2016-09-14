var fs = require('fs'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    combineMq = require('gulp-combine-mq'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel');

gulp.task('css', function () {
    gulp.src('./styles/main.styl')
        .pipe(stylus().on('error', gutil.log))
        .pipe(gulp.dest('../assets/styles/').on('error', gutil.log))
        .pipe(combineMq({ log: true }).on('error', gutil.log))
        .pipe(autoprefixer('last 2 version').on('error', gutil.log))
        .pipe(cssnano().on('error', gutil.log))
        .pipe(rename({suffix: '.min'} ).on('error', gutil.log))
        .pipe(gulp.dest('../assets/styles/').on('error', gutil.log));
});

gulp.task('js', function() {
    // create a file for all the js that can be loaded at the bottom of the page
    gulp.src(['./js/main.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('../assets/js/'))
        .pipe(rename({suffix: '.min'} ))
        // .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('../assets/js/'))
});

gulp.task('watch', function() {
    gulp.watch('./styles/**/*.styl', ['css'])
        .on('change', function(evt) {
            console.log(evt.type, " ==> ", evt.path);
        });
    gulp.watch('./js/**/*.js', ['js'])
        .on('change', function(evt) {
            console.log(evt.type, " ==> ", evt.path);
        });
});

gulp.task('default', ['css', 'js']);
