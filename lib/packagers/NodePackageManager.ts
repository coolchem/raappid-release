
/// <reference path="../../typings/tsd.d.ts" />

import {PackageManagerBase} from "./PackageManagerBase"

export class NodePackageManager extends PackageManagerBase
{

    version():string {
        return null;
    }

    bump(version:string):Promise<any> {
        return null;
    }
}