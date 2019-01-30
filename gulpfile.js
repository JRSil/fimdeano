'use strict';

var gulp          = require('gulp');
var sass          = require('gulp-sass');
var browserSync   = require('browser-sync').create();
var uglify        = require('gulp-uglify');
var concat        = require('gulp-concat');
var gulpUtil      = require('gulp-util');
var plumber       = require('gulp-plumber');
var debug         = require('gulp-debug');
var htmlmin       = require('gulp-htmlmin');

// process JS files and return the stream.
gulp.task('js', function () {
    return gulp.src([
            'files/js/jquery-3.2.0.min.js', 
            'files/js/bootstrap.min.js',
            'files/js/main.js'
        ])
        .pipe(plumber(function(error) {
            gulp.emit('finish');
        }))
        .pipe(concat('all.min.js'))
        .pipe(uglify().on('error', gulpUtil.log))
        .pipe(gulp.dest('files/minjs/'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("files/sass/*.scss")
        .pipe(sass({errLogToConsole: true}).on('error', sass.logError))
        .pipe(gulp.dest("files/css"))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
    return gulp.src('dev/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass','js', 'html'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("files/sass/*.scss", ['sass']);
    gulp.watch("dev/*.html", ['html']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("files/js/*.js", ['js-watch']);
});

// all browsers reload after tasks are complete.
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('default', ['serve']);


