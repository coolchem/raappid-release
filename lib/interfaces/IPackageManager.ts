
/// <reference path="../../typings/tsd.d.ts" />

export interface IPackageManager
{
    name:string;
    configFileName:string;
    version():string;
    bump(version:string):Promise<any>;
}