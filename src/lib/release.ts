
/// <reference path="../../typings/tsd.d.ts" />

var ERROR_GIT_NOT_INSTALLED:string = "Git not installed installed on the OS. " +
    "Please visit https://git-scm.com/downloads to download and install git ";

export var doRelease = function (releaseType:string):Promise<string>
{
    return new Promise(function(resolve, reject){

        if(releaseType === null || releaseType === undefined)
            reject("Could not recognize release type.")


    });
};
