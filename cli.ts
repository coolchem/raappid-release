#!/usr/bin/env node

/// <reference path="typings/tsd.d.ts" />

var argv:any = require('minimist')(process.argv.slice(2));
import {} from "index";

// Set env var for ORIGINAL cwd
// before anything touches it
process.env.INIT_CWD = process.cwd();

function run() {

}


run();