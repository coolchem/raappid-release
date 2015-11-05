
/// <reference path="../../typings/tsd.d.ts" />

import {IPackageManager} from "../interfaces/IPackageManager"

export abstract class PackageManagerBase implements IPackageManager
{

    name:string = "";
    configFileName:string = "";

    abstract version():string;

    abstract bump(version:string):Promise<string>;
}
