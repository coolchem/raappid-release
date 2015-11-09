
/// <reference path="../../../typings/tsd.d.ts" />

import {IRepository} from "../interfaces/IRepository";

var exec = require('child_process').exec;
var which = require('which');

import fs = require('fs');

export class GitRepository implements IRepository
{
    public static ERROR_GIT_NOT_INSTALLED:string = "Git not installed installed on the OS. " +
        "Please visit https://git-scm.com/downloads to download and install git ";


    public static ERROR_NO_GIT_REPOSITORY_FOUND:string = "No repository found. Please make sure the project is valid git repository" +
        "file at the root of the project";

    public static ERROR_GIT_NOT_CLEAN:string = "There are modified files in the repository which have not been committed, please commit them before doing the release:";

    repositoryType:string = "git";

    isValid():Promise<boolean> {

        return new Promise((resolve,reject)=>{

            //check if is a git repository,
            fs.readdir(process.cwd()+"/.git",(error)=>{

                if(error)
                {
                    reject(GitRepository.ERROR_NO_GIT_REPOSITORY_FOUND);
                }
                else
                {
                    //check if is a git is installed,
                    which("git",(error)=>{
                        if(error)
                        {
                            reject(GitRepository.ERROR_GIT_NOT_INSTALLED);
                        }
                        else
                        {

                          this.runCommand("git status --porcelain").then((result)=>{

                                var lines = result.trim().split('\n').filter(function (line) {
                                    return line.trim() && !line.match(/^\?\? /)
                                }).map(function (line) {
                                    return line.trim()
                                });

                                if (lines.length) {
                                    reject(GitRepository.ERROR_GIT_NOT_CLEAN +'\n'+  lines.join('\n'));
                                }
                                else
                                {
                                    resolve(true);
                                }

                            })
                        }

                    })
                }

             });
        });
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