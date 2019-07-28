var gulp = require('gulp');
var less = require('gulp-less');
var mainBowerFiles = require('main-bower-files');
var sourcemap = require('gulp-sourcemaps');

var path = require('path');

var paths = {
    source: "src/",
    output: "dist/"
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
    }).pipe(gulp.dest(paths.output + 'css/lib'));
});

gulp.task('copy-images', function () {
    return gulp.src('src/media/images/**/*').pipe(gulp.dest(paths.output + 'media/images'));
});

gulp.task('less', function () {
    return gulp.src('src/css/**/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest(paths.output + 'css'));
});

gulp.task('default', gulp.parallel(['copy-images', 'less', 'bower']));

gulp.task('dev', gulp.parallel(['copy-images', 'less', 'bower']));