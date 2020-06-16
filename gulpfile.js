const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoPrefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

gulp.task('build', () => {
    return gulp
    // .src(['./node_modules/sanitize.css/sanitize.css', './src/functions.scss', './src/*.scss'])
        .src(['./src/main.scss'])
        .pipe(concat('shooting-star.scss'))
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoPrefixer())
        .pipe(gulp.dest('./public'))
        .pipe(cleanCSS())
        .pipe(rename({
            'extname': '.min.css'
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task("watch", gulp.series(['build', () => {
    gulp.watch('./src/*.scss', gulp.series('build'))
}]));

gulp.task("default", gulp.task('watch'));
