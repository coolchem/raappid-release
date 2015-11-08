
/// <reference path="../../../typings/tsd.d.ts" />

import {IRepository} from "../interfaces/IRepository";

var exec = require('child_process').exec;

import fs = require('fs');

export class GitRepository implements IRepository
{

    repositoryType:string = "git";

    isValid():boolean {
        try
        {
          fs.readdirSync(process.cwd()+"/.git");

        }catch(e)
        {
            return false
        }

        return true;
    }

    add(fileNames:string[]):Promise<any> {
        return this.runCommand('git add ' + fileNames.join(' '))
    }

    commit(commitMessage:string):Promise<any> {
        return this.runCommand('git commit -m ' + '"'+commitMessage +'"');
    }

    tag(tag:string):Promise<any> {
        return this.runCommand('git tag -a ' + tag + ' -m "Tag ' + tag + '"');
    }

    push(tagsOnly:boolean = false):Promise<any> {

        if(!tagsOnly)
            return this.runCommand("git push");

        return this.runCommand("git push --tags");
    }

    private runCommand(cmd):Promise<any>
    {
        return new Promise((resolve,reject)=>{
            exec(cmd,(err, stdout, stderr) => {
                if(err)
                    reject(err);
                else
                    resolve(stdout);
            });
        });
    }
}