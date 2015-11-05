

var gulp = require("gulp");
var ts = require('gulp-typescript');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var exec = require('child_process').exec;

var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

gulp.task('clean', function(cb) {
    del(['**/*.js','**/*.map','!gulpfile.js', '!node_modules/**/*.js', '!node_modules/**/*.map']).then(function (paths) {
        console.log('Deleted files/folders:\n', paths.join('\n'));
        cb();
    });
});

gulp.task('build-dev',['clean'], function(cb) {

    exec('node_modules/.bin/tsc -m commonjs', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });

});
