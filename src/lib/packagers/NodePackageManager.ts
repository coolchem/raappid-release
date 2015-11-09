
/// <reference path="../../../typings/tsd.d.ts" />

import {IPackageManager} from "../interfaces/IPackageManager";

import fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

export class NodePackageManager implements IPackageManager
{
    public static ERROR_NO_PACKAGE_MANAGER_FOUND:string = "Project not configured for node package management. Please check you have valid package.json" +
        "file at the root of the project";

    public static ERROR_EMPTY_NULL_UNDEFINED_VERSION:string = "The Version cannot be empty or null or undefined";

    public static ERROR_INVALID_VERSION_TYPE:string = "The Version type not supported. supported version types | major | minor | patch | premajor | preminor | prepatch | prerelease";

    name:string = "Node Package Manager";
    configFileName:string = "package.json";

    protected supportedVersionTypes:string[] = [ 'major','minor','patch' ,'premajor' ,'preminor' ,'prepatch' , 'prerelease']

    isValid():Promise<boolean> {

        return new Promise((resolve, reject)=>{
            fs.readFile(path.resolve(this.configFileName),(error)=>{

                if(error)
                {
                    reject(NodePackageManager.ERROR_NO_PACKAGE_MANAGER_FOUND);
                    return;
                }

                resolve(true);

            })
        });
    }

    version():string {
        var pkg:any = JSON.parse(fs.readFileSync(path.resolve(this.configFileName), "utf8"));
        return pkg.version;
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
            exec('npm version ' + version +' -m "Release v%s"',(error: Error) => {
                if(error)
                    reject(error);
                else
                    resolve(this.version());
            });
        });
    }
}