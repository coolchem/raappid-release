/// <reference path="../../typings/tsd.d.ts" />


import {NodePackageManager} from "../../src/lib/packagers/NodePackageManager"

var chai = require('chai');
var del = require('del');
var fs = require('fs');
var path = require('path');
var pkg:any = require(path.resolve('./package.json'));

var currentDirectory = process.cwd();
var testDir:string = path.resolve("./test");

function getPackageVersion():string{
    var pkg:any = JSON.parse(fs.readFileSync(path.resolve("./package.json"), "utf8"));
    return pkg.version;
}

describe('NodePackageManager Test cases', () => {

    var expect = chai.expect;
    var npm:NodePackageManager;
    var currentNpm:NodePackageManager;

    before(() =>{
        process.chdir(testDir);
        console.log("changing Directory to: " + process.cwd());
        fs.writeFileSync("package.json",JSON.stringify({version:"0.0.1"}, null, '  ') + '\n');
        npm = new NodePackageManager();
    });

    after(() =>{

        del.sync(["package.json"]);
        process.chdir(currentDirectory);
        console.log("changing Directory back to: " + process.cwd())
    });

    describe('isValid()', () => {

        it('should return true if the package is valid node package', function(done) {

            expect(npm.isValid()).to.equal(true);
            done();
        });

    });

    describe('version()', () => {

        it('should return the version number of package', function(done) {

            expect(npm.version()).to.equal('0.0.1');
            done();
        });

        it('should return the version number of current package', function(done) {

            process.chdir(currentDirectory);
            currentNpm = new NodePackageManager();
            expect(currentNpm.version()).to.equal(pkg.version);
            process.chdir(testDir);
            done();
        });


    });


    describe('bump(version)', () => {

        beforeEach(()=>{
            npm = new NodePackageManager();
            del.sync(["package.json"]);
            fs.writeFileSync("package.json",JSON.stringify({version:"0.0.1"}, null, '  ') + '\n');
        });

        it('should return a promise', function(done) {
            expect(npm.bump("")).to.be.instanceOf(Promise);
            done();
        });


        it('should reject if empty version', function(done) {

            npm.bump("").then((result:string)=>{
                chai.assert.fail("should not have been resolved");
            }, (error:Error) =>{
                expect(error).to.equal(NodePackageManager.ERROR_EMPTY_NULL_UNDEFINED_VERSION);
                done();
            })

        });

        it('should reject if null version', function(done) {

            npm.bump("").then((result:string)=>{
                chai.assert.fail("should not have been resolved");
            }, (error:Error) =>{
                expect(error).to.equal(NodePackageManager.ERROR_EMPTY_NULL_UNDEFINED_VERSION);
                done();
            })

        });

        it('should reject if undefined', function(done) {

            npm.bump("").then((result:string)=>{
                chai.assert.fail("should not have been resolved");
            }, (error:Error) =>{
                expect(error).to.equal(NodePackageManager.ERROR_EMPTY_NULL_UNDEFINED_VERSION);
                done();
            })

        });

        it('should reject if invalid version type', function(done) {

            npm.bump("aadsad").then((result:string)=>{
                chai.assert.fail("should not have been resolved");
            }, (error:Error) =>{
                expect(error).to.equal(NodePackageManager.ERROR_INVALID_VERSION_TYPE);
                done();
            })

        });


        it('should bump patch version', function(done) {
            npm.bump("patch").then((result:string) =>{
                expect(result).to.equal("0.0.2");
                var pkgVersion = getPackageVersion();
                expect(result).to.equal(pkgVersion);
                done();
            }).catch((error:Error)=>{
                chai.assert.fail("should not have failed",error.message);
                done();
            })
        });


        it('should bump minor version', function(done) {
            npm.bump("minor").then((result:string) =>{
                expect(result).to.equal("0.1.0");
                expect(result).to.equal(getPackageVersion());
                done();
            }).catch((error:Error)=>{
                chai.assert.fail("should not have failed",error.message);
                done();
            })
        });

        it('should bump major version', function(done) {
            npm.bump("major").then((result:string) =>{
                expect(result).to.equal("1.0.0");
                expect(result).to.equal(getPackageVersion()); //making sure the package being managed has also changed
                done();
            }).catch((error:Error)=>{
                chai.assert.fail("should not have failed",error.message);
                done();
            })
        });

    })

});





