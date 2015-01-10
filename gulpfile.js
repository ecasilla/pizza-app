var gulp       = require('gulp'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    express    = require('express'),
    sass       = require('gulp-sass'),
    server;

function errorHandle(error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('serve',function() {
  server = express();
  server.use(express.static('dist'));
  server.listen(7000);
});


gulp.task('scripts',function() {
 return browserify('./src/scripts/main.js')
 .bundle().on('error',errorHandle);
 .pipe(source('bundle.js'))
 .pipe(gulp.dest('dist/scripts'))
});

gulp.task('html',function() {
 return gulp
  .src('src/html/**/*.html')
  .pipe(gulp.dest('dist'))
});

gulp.task('images',function() {
 return gulp
 .src('src/images/**/*.png')
 .pipe(gulp.dest('dist/images'))
});

gulp.task('css',function() {
 return gulp
 .src('src/styles/**/*.scss')
 .pipe(sass()).on('error',errorHandle);
 .pipe(gulp.dest('dist/styles'))
});

gulp.task('watch',function() {
  gulp.watch('src/html/**/*.html',['html']);
  gulp.watch('src/images/**/*.png',['images']);
  gulp.watch('src/styles/**/*.scss',['css']);
  gulp.watch('src/scripts/**/*.js',['scripts']);
})

gulp.task('build',['css','html','images','scripts']);
gulp.task('dev',['serve']);
gulp.task('default',['build','serve','watch']);
