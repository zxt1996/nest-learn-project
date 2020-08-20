import { FileLogger } from './file.logger';
import { SyslogLogger } from './syslog.logger';

// useClass语法允许您动态确定令牌应解析为的类
export const loggerProvider = {
    provide: `Logger`,
    useClass: process.env.NODE_ENV === 'development' ? FileLogger : SyslogLogger
}