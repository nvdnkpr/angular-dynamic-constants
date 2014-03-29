var gulp = require('gulp');
var http = require('http');
var ecstatic = require('ecstatic');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('dev', function(){
    http.createServer(
        ecstatic({root: __dirname})
    ).listen(8080);
});

gulp.task('deploy', function(){
    return gulp.src(['angular-dynamic-constants.js'])
        .pipe(uglify())
        .pipe(concat('angular-dynamic-constants.min.js'))
        .pipe(gulp.dest('.'));
});