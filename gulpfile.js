var gulp = require('gulp');
var less = require('gulp-less');
var mainBowerFiles = require('main-bower-files');
var sourcemap = require('gulp-sourcemaps');

var path = require('path');
var merge = require('merge2');

var paths = {
    source: "src/",
    public: [ '*public/images/**/*', '*public/javascripts/**/*', '*views/**/*'],
    output: "dist/",
    spec: "spec/"
}

gulp.task('bower', function() {
    return gulp.src(mainBowerFiles({
        overrides: {
            bootstrap: {
                main: [
                    './dist/js/bootstrap.js',
                    './dist/css/*.min.*',
                    './dist/fonts/*.*'
                ]
            }
        }
    }), {
        base: 'bower_components'
    }).pipe(gulp.dest(paths.output + 'public/stylesheets/lib'));
});

gulp.task('copy', function () {
    return gulp.src(paths.public).pipe(gulp.dest(paths.output));
});

gulp.task('less', function () {
    return gulp.src('public/stylesheets/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(paths.output + 'public/stylesheets'));
});

gulp.task('default', gulp.parallel(['copy', 'less', 'bower']));

gulp.task('dev', gulp.parallel(['copy', 'less', 'bower']));