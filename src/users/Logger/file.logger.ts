import { Logger } from './logger';

export class FileLogger implements Logger {
    log(log: string) {
        //写入本地文件
        console.log(log + 'filelog');
    }
}