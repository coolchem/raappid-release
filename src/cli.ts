#!/usr/bin/env node

/// <reference path="../typings/tsd.d.ts" />

var argv:any = require('minimist')(process.argv.slice(2));
import {doRelease} from "./index";

// Set env var for ORIGINAL cwd
// before anything touches it
process.env.INIT_CWD = process.cwd();

function run():void {

    //check if --help or -h show instructions and exit
    if(argv.help === true || argv.h === true)
    {
        showInstructions();
    }
    else
    {
        var releaseType:string = "";

        if(argv._.length > 0)
        {
            releaseType = argv._[0];

            doRelease(releaseType).then((successMessage)=>{

                console.log(successMessage);
                process.exit(0);

            }, (error)=>{

                console.log(error);
                process.exit(1);

            })
        }
        else
        {
            console.log("\n Cannot Recognize the type of release. Please see instructions below");
            showInstructions();
        }

    }
}

function showInstructions(){
    console.log('\n Options:\n\n raapid-release [release-type]' +
        '      --- Give type of release:  major | minor | patch | premajor | preminor | prepatch | prerelease\n'
    );
}


run();