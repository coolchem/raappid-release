
/// <reference path="../../../typings/tsd.d.ts" />

export interface IPackageManager
{
    name:string;
    configFileName:string;

    isValid():boolean;
    version():string;
    bump(version:string):Promise<any>;
}