
/// <reference path="../../../typings/tsd.d.ts" />

import {IPackageManager} from "../interfaces/IPackageManager";

var fs = require('fs');
var path = require('path');
var semver = require('semver');

export class NodePackageManager implements IPackageManager
{
    public static ERROR_VERSION_TYPE_NOT_SUPPORTED:string = "The Version type not supported. supported version types ar major, minor and patch";

    name:string = "Node Package Manager";
    configFileName:string = "package.json";

    protected pkg:any = null;
    protected configFilePath:string;

    constructor() {
        this.configFilePath = path.join(process.cwd(), this.configFileName);
        this.pkg = require(this.configFilePath);
    }


    isValid():boolean {
        return this.pkg !== null || this.pkg !== undefined;
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