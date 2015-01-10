var gulp       = require('gulp'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    sass       = require('gulp-sass');

gulp.task('hello',function() {
  console.log("Hello Gulp!");
})

gulp.task('scripts',function() {
 return browserify('./src/scripts/main.js')
 .bundle()
 .pipe(source('bundle.js'))
 .pipe(gulp.dest('dist/scripts'))
})

gulp.task('html',function() {
 return gulp
  .src('src/html/**/*.html')
  .pipe(gulp.dest('dist'))
})

gulp.task('images',function() {
 return gulp
 .src('src/images/**/*.png')
 .pipe(gulp.dest('dist/images'))
})

gulp.task('css',function() {
 return gulp
 .src('src/styles/**/*.scss')
 .pipe(sass())
 .pipe(gulp.dest('dist/styles'))
})

gulp.task('default',['css','html','images','hello']);
