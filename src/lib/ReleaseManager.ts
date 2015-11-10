
/// <reference path="../../typings/tsd.d.ts" />

import {NodePackageManager} from "./packagers/NodePackageManager";
import {GitRepository} from "./repositories/GitRepository";


export class ReleaseManager{

    protected npm:NodePackageManager = new NodePackageManager();
    protected git:GitRepository = new GitRepository();

    canRelease():Promise<boolean>{

        return new Promise((resolve,reject)=>{

            this.npm.isValid().then((valid:boolean)=>{
                return this.git.isValid()
            }).then((valid:boolean)=>{
                resolve(valid);
            }).catch((error)=>{
                reject(error);
            });
        })

    }

    doRelease(releaseType:string):Promise<any>
    {
        var newVersion:string = "";
        return new Promise((resolve,reject)=>{

            this.npm.bump(releaseType).then((version:string)=>{

                newVersion = version;
                return this.git.add([this.npm.configFileName])

            }).then(()=>{
                return this.git.push();
            }).then(()=>{
                return this.git.push(true);
            }).then(()=>{
                resolve("Successfully released project with version v" + newVersion);
            }).catch((error)=>{
                reject(error);
            })
        })
    }
}

