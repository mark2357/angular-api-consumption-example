import { environment } from '../../environments/environment';

export class Logger {

    static log(message?: any, ...optionalParams: any[]): void {
        if(environment.showLogging) console.log(message, ...optionalParams);
    };

    static error(message?: any, ...optionalParams: any[]): void {
        if(environment.showLogging) console.error(message, ...optionalParams);
    };
}