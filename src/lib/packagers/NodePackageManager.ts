
/// <reference path="../../../typings/tsd.d.ts" />

import {IPackageManager} from "../interfaces/IPackageManager";

import fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

export class NodePackageManager implements IPackageManager
{

    public static ERROR_EMPTY_NULL_UNDEFINED_VERSION:string = "The Version cannot be empty or null or undefined";

    public static ERROR_INVALID_VERSION_TYPE:string = "The Version type not supported. supported version types | major | minor | patch | premajor | preminor | prepatch | prerelease";

    name:string = "Node Package Manager";
    configFileName:string = "package.json";

    protected supportedVersionTypes:string[] = [ 'major','minor','patch' ,'premajor' ,'preminor' ,'prepatch' , 'prerelease']

    isValid():boolean {
        var pkg = require(path.resolve(this.configFileName));
        return pkg !== null || pkg !== undefined;
    }

    version():string {
        var pkg:any = JSON.parse(fs.readFileSync(path.resolve(this.configFileName), "utf8"));
        if(pkg !== null || pkg !== undefined)
            return pkg.version;
        return "";
    }

    bump(version:string):Promise<string> {
        return new Promise((resolve,reject)=>{

            if(version === "" || version === null || version === undefined)
            {
                throw (NodePackageManager.ERROR_EMPTY_NULL_UNDEFINED_VERSION)
            }

            if(this.supportedVersionTypes.indexOf(version) == -1)
            {
                throw (NodePackageManager.ERROR_INVALID_VERSION_TYPE)
            }
            exec('npm version ' + version +' -m "Release v%s"',(error: Error, stdout: Buffer, stderr: Buffer) => {
                if(error)
                    reject(error);
                else
                    resolve(this.version());
            });
        });
    }
}