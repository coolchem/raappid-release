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

                process.exit(0);

            }, (error)=>{

                console.log(error);
                process.exit(1);

            })
        }
        else
        {
            showInstructions();
        }

    }
}

function showInstructions(){
    console.log("instructions go here")
}


run();