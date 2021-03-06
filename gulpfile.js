var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var typescript = require('gulp-tsc');
var path = require('path');

var paths = {
  sass: ['./scss/**/*.scss'],
  ts: ['./src/*.ts']
};

gulp.task('default', ['sass']);

gulp.task('ts', function () {
  gulp.src(paths.ts)
    .pipe(typescript({
      emitError: false,
      tscPath: path.resolve(__dirname, 'node_modules', '.bin', 'tsc')
    }))
    .pipe(gulp.dest('www/js'));
});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('compile', function () {
  gulp.start('ts', 'sass');
});

function watchNoTS() {
  gulp.watch(paths.sass, ['sass']);
}

gulp.task('watch', function() {
  watchNoTS();
  gulp.watch(path.ts, ['ts']);
});

gulp.task('watch:no-ts', watchNoTS);

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
