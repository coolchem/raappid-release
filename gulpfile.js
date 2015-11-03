

var gulp = require("gulp");
var ts = require('gulp-typescript');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');

var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

gulp.task('clean', function() {
    del(['lib/**/*.js', 'index.js', 'cli.js']).then(function (paths) {
        console.log('Deleted files/folders:\n', paths.join('\n'));
    });
});

gulp.task('build-dev',['clean'], function() {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest('./'));
});

gulp.task('build-release',['clean'], function() {
    var tsResult = tsProject.src()
        .pipe(ts(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest('./'));
});