

var gulp = require("gulp");
var del = require('del');
var exec = require('child_process').exec;

gulp.task('clean', function(cb) {
    del(['**/*.js','**/*.map','!gulpfile.js', '!node_modules/**/*.js', '!node_modules/**/*.map']).then(function (paths) {
        console.log('Deleted files/folders:\n', paths.join('\n'));
        cb();
    });
});

gulp.task('build-dev',['clean'], function(cb) {

    exec('node_modules/.bin/tsc -m commonjs -t es5 --moduleResolution node', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });

});
