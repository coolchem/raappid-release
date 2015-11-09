
/// <reference path="../typings/tsd.d.ts" />

export * from "./lib/ReleaseManager"

import {ReleaseManager} from "./lib/ReleaseManager";

var releaseManager:ReleaseManager = new ReleaseManager();

export var doRelease = (releaseType:string):Promise<any> =>
{
    return new Promise((resolve,reject)=>{

        releaseManager.canRelease().then(() => {

            releaseManager.doRelease(releaseType).then((result)=>{

                resolve(result);

            }, (error) => {

                reject(error);
            })

        }, (error) => {

            reject(error);

        })
    })
};