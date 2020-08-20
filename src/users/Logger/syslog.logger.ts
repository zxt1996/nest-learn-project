import { Logger } from './logger';

export class SyslogLogger implements Logger {
    log(log: string) {
        // 写入Syslog
        console.log(log + 'syslog');
    }
}