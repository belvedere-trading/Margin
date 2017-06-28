
var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
const zip = require('gulp-zip');

// source and distribution folder
var paths = {

    // Location of overrides and custom styles
    source: 'src/',

    // Location of static assets
    assets: 'assets/',

    // Where the generated assets will go
    dest: 'dist/',

    // Bootstrap scss source
    bootstrapSass_in: './node_modules/bootstrap-sass/'

};

paths.fonts = {
    in: paths.assets + 'fonts/**',
    out: paths.dest + 'fonts/'
};

paths.css = {
    in: paths.source + 'scss/margin.scss',
    out: paths.dest + 'css/',
    watch: paths.source + 'scss/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precision: 8,
        errLogToConsole: true,
        includePaths: [paths.bootstrapSass_in + 'assets/stylesheets']
    }
};

gulp.task('fonts', function () {
    return gulp
        .src(paths.fonts.in)
        .pipe(gulp.dest(paths.fonts.out));
});

gulp.task('zip', function(){
    gulp.src('dist/**')
        .pipe(zip('margin.zip'))
        .pipe(gulp.dest('dist'))
});

gulp.task('build', ['fonts', 'zip'], function () {
    return gulp.src(paths.css.in)
        //output non-minified css file
        .pipe(sass(paths.css.sassOpts))
        .pipe(gulp.dest(paths.css.out))

        //output the minified version
        .pipe(cleanCSS())
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest(paths.css.out))
});


gulp.task('watch', ['build'], function () {
    gulp.watch(paths.css.watch, ['build']);
});
