'use strict';

var lab = exports.lab = require('lab').script();
var code = require('code');

var packager = require('../lib/packager');


lab.experiment('packager', function() {

    var expect = code.expect;
    var actionControl;
    var throws;

    lab.beforeEach(function (done) {
        done();
    });

    lab.test('it should be able to bump patch version by default', function(done) {
        done();
    });


});
