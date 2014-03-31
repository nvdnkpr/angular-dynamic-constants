var gulp = require('gulp');
var http = require('http');
var ecstatic = require('ecstatic');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var open = require("gulp-open");

gulp.task('dev', function(){
    http.createServer(
        ecstatic({root: __dirname})
    ).listen(8080);

     //open("http://localhost:8080",{app:"google-chrome"});
});

gulp.task('deploy', function(){
    return gulp.src(['src/angular-dynamic-constants.js'])
        .pipe(uglify())
        .pipe(concat('angular-dynamic-constants.min.js'))
        .pipe(gulp.dest('.'));
});