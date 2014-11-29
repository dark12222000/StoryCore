var gulp = require('gulp');
var del = require('del');
var bower = require('main-bower-files');
var server = require('gulp-webserver');
var concat = require('gulp-concat');

gulp.task('clean', function(done){
  del('src/vendor', function(){
    done();
  });
});

gulp.task('prep', ['clean'], function(){
  gulp.src(bower()).pipe(gulp.dest('src/vendor'));
});

gulp.task('serve', ['core', 'scene'], function(){
  gulp.src('src/').pipe(server({host: '0.0.0.0', livereload: false, open: false, port: 3000}));
});

gulp.task('core', function(){
  gulp.src(['src/core/EntityManager.js', 'src/core/App.js', 'src/core/*.js']).pipe(concat('core.js')).pipe(gulp.dest('src/'));
});

gulp.task('scene', function(){
  gulp.src('src/scenes/*.js').pipe(concat('scenes.js')).pipe(gulp.dest('src/'));
});

gulp.task('build', ['core', 'scene']);

gulp.task('test', function(){
  gulp.watch('src/', ['serve']);
});

gulp.task('default', ['build']);
