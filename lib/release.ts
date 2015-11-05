
/// <reference path="../typings/tsd.d.ts" />

export var doRelease = function (releaseType:string):Promise<string>
{
    return new Promise(function(resolve, reject){

        if(releaseType === null || releaseType === undefined)
            reject("Could not recognize release type.")


    });
};
