

/// <reference path="../../typings/tsd.d.ts" />


export class UI{

    log(message:string):void {
    }

    warn(message:string):void {
    }

    logError(errorMessage:string):void {
    }

    askForInput(question:string):Promise<string> {
        return null;
    }

    askForConfirmation(yesNoQuestion:string):Promise<string> {
        return null;
    }
}