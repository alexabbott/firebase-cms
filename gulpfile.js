let gulp = require('gulp'),
    concat = require('gulp-concat'),
    prefix = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass');

gulp.task('styles', () => {
    return gulp.src(['functions/views/**/*.scss', 'functions/views/global.scss'])
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(concat('main.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('public'))
});

gulp.task('watch', () => {
    gulp.watch(['functions/views/**/*.scss', 'functions/views/global.scss'], ['styles']);
});

gulp.task('default', () => {
    gulp.start('styles');
    gulp.start('watch');
});