/// <reference path="../../typings/tsd.d.ts" />


import {GitRepository} from "../../src/lib/repositories/GitRepository"
import fs = require('fs');
import del = require('del');
import chai = require('chai');
import path = require('path');

var expect = chai.expect;
var execSync = require('child_process').execSync;
var exec = require('child_process').exec;

var currentDirectory = process.cwd();
var tempDir:string = path.resolve("../temp");

function initializeRepository(done:Function):void
{
    fs.writeFileSync("package.json",JSON.stringify({version:"0.0.1"}, null, '  ') + '\n');
    execSync("git init");
    execSync('git config user.email "v@v.com"');
    execSync('git config user.name "v"');
    execSync("git add package.json");
    execSync('');
    exec('git commit -m "test commit"', function (err, stdout, stderr) {
        done();
    });
}

function unInitializeRepository():void
{
    del.sync(["package.json", ".git"],{force:true});
}
describe('GitRepository Test cases', () => {


    var git:GitRepository = new GitRepository();

    before(function(done){

        del.sync([tempDir],{force:true});
        fs.mkdirSync(tempDir);
        process.chdir(tempDir);
        console.log("changing Directory to: " + process.cwd());
        initializeRepository(done);

    });

    after(function(){
        del.sync([tempDir],{force:true});
        process.chdir(currentDirectory);
        console.log("changing Directory back to: " + process.cwd())
    });


    describe('isValid()', () => {

        beforeEach(function(done){
            initializeRepository(done);
        });

        it('should return false if not a git repository', function(done) {

            unInitializeRepository();
            expect(git.isValid()).to.equal(false);
            done();
        });

        it('should return true if valid git repository', function(done) {
            expect(git.isValid()).to.equal(true);
            done();
        });

    });

    describe('add()', () => {
        it('should add filenames provided', function(done) {

            fs.writeFileSync("package.json",JSON.stringify({version:"0.0.2"}, null, '  ') + '\n');
            git.add(["package.json"]).then((result)=>{
                done();
            });
        });

        it('should handle git error while adding files', function(done) {

            git.add(["package1.json"]).catch((error)=>{
                done();
            });
        });

    });

    describe('commit()', () => {

        it('should commit any files marked for commit', function(done) {
            git.commit("test commit").then((result)=>{
                done()
            })
        });
    });

    describe('tag()', () => {

        it('should sucessfully create tag for the repository', function(done) {
            git.tag("v1").then((result)=>{
                exec("git tag",(err,stdOut,stdErr)=>{

                    done()
                });

            })
        });

    });

    describe('push()', () => {

        it('should reject if no remote repository configured', function(done) {
            git.push().catch((error)=>{
                done();
            })
        });

        it('should reject if no remote repository configured while pusing tags', function(done) {
            git.push(true).catch((error)=>{
                done();
            })
        });
    });
});





