

var gulp = require("gulp");
var del = require('del');
var exec = require('child_process').exec;

gulp.task('clean', function(cb) {
    del(['src/**/*.js','test/**/*.js','dist','**/*.map','!node_modules/**/*.map']).then(function (paths) {
        console.log('Deleted files/folders:\n', paths.join('\n'));
        cb();
    });
});

gulp.task('build-dev',['clean'], function(cb) {

    exec('node_modules/.bin/tsc', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });

});

gulp.task('build-release',['clean'], function(cb) {

    exec('node_modules/.bin/tsc -p src --outDir dist', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });

});
