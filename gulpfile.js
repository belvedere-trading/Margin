
var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

// source and distribution folder
var paths = {

    // Location of overrides and custom styles
    source: 'src/',

    // Where the generated assets will go
    dest: 'dist/',

    // Bootstrap scss source
    bootstrapSass_in: './node_modules/bootstrap-sass/'

};

paths.fonts = {
    in: [paths.source + 'fonts/*.*', paths.bootstrapSass_in + 'assets/fonts/**/*'],
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


gulp.task('build', ['fonts'], function () {
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
