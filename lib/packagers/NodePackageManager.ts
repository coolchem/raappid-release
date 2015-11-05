
/// <reference path="../../typings/tsd.d.ts" />

import {PackageManagerBase} from "./PackageManagerBase"

var fs = require('fs');
var path = require('path');
var semver = require('semver');

export class NodePackageManager extends PackageManagerBase
{
    public static ERROR_VERSION_TYPE_NOT_SUPPORTED:string = "The Version type not supported. supported version types ar major, minor and patch";

    protected pkg:any;
    protected configFilePath:string;

    constructor() {
        super();
        this.name = "Node Package Manager";
        this.configFileName = "package.json";
        this.configFilePath = path.join(process.cwd(), this.configFileName);
        this.pkg = require(this.configFilePath);
    }

    version():string {
        return this.pkg.version;
    }

    bump(version:string):Promise<string> {
        return new Promise((resolve,reject) =>{

            var newVersion:string = semver.inc(this.pkg.version, version.toLowerCase())

            if(!newVersion)
            {
                throw (NodePackageManager.ERROR_VERSION_TYPE_NOT_SUPPORTED);
            }

            this.pkg.version = newVersion;

            fs.writeFileSync(this.configFilePath, JSON.stringify(this.pkg, null, '  ') + '\n');

            resolve(this.pkg.version);
        });
    }
}