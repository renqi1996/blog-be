import * as path from 'path';
import * as Log4js from 'log4js';
import * as Util from 'util';
import * as Moment from 'moment';
import * as StackTrace from 'stacktrace-js';
import Chalk from 'chalk';
import log4jsConfig from '../../config/log4js';

export enum LoggerLevel {
  ALL = 'ALL',
  MARK = 'MARK',
  TRACE = 'TRACE',
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
  OFF = 'OFF',
};

export class ContextTrace {
  constructor (
    public readonly context: string,
    public readonly path?: string,
    public readonly lineNumber?: number,
    public readonly columnNumber?: number,
  ) {}
};

Log4js.addLayout('Awesome-nest', (logConfig: any) => {
  return (logEvent: Log4js.LoggingEvent) => {
    let moduleName = '';
    let position= '';

    const messageList: string[] = [];
    logEvent.data.forEach((value: any) => {
      if (value instanceof ContextTrace) {
        moduleName = value.context;
        if (value.lineNumber && value.columnNumber) {
          position = `${value.lineNumber}, ${value.columnNumber}`;
        }
        return;
      }

      if (typeof value !== 'string') {
        value = Util.inspect(value, false, 3, true);
      }

      messageList.push(value);
    });

    const messageOutput: string = messageList.join(' ');
    const positionOutput: string = position ? ` [${position}]` : '';
    const typeOutput = `[${
      logConfig.type
    }] ${logEvent.pid.toString()}   - `;
    const dateOutput = `${Moment(logEvent.startTime).format(
      'YYYY-MM-DD HH:mm:ss',
    )}`;
    const moduleOutput: string = moduleName
      ? `[${moduleName}] `
      : '[LoggerService] ';
    let levelOutput = `[${logEvent.level}] ${messageOutput}`;

    switch (logEvent.level.toString()) {
      case LoggerLevel.DEBUG:
        levelOutput = Chalk.green(levelOutput);
        break;
      case LoggerLevel.INFO:
        levelOutput = Chalk.cyan(levelOutput);
        break;
      case LoggerLevel.WARN:
        levelOutput = Chalk.yellow(levelOutput);
        break;
      case LoggerLevel.ERROR:
        levelOutput = Chalk.red(levelOutput);
        break;
      case LoggerLevel.FATAL:
        levelOutput = Chalk.hex('#DD4C35')(levelOutput);
        break;
      default:
        levelOutput = Chalk.grey(levelOutput);
        break;
    }

    return `${Chalk.green(typeOutput)}${dateOutput}  ${Chalk.yellow(
      moduleOutput,
    )}${levelOutput}${positionOutput}`;
  };
});

Log4js.configure(log4jsConfig);

const logger = Log4js.getLogger();
logger.level = LoggerLevel.TRACE;

export class commonLogger {
  static trace(...args) {
    logger.trace(commonLogger.getStackTrace(), ...args);
  }

  static debug(...args) {
    logger.debug(commonLogger.getStackTrace(), ...args);
  }

  static log(...args) {
    logger.info(commonLogger.getStackTrace(), ...args);
  }

  static info(...args) {
    logger.info(commonLogger.getStackTrace(), ...args);
  }

  static warn(...args) {
    logger.warn(commonLogger.getStackTrace(), ...args);
  }

  static warning(...args) {
    logger.warn(commonLogger.getStackTrace(), ...args);
  }

  static error(...args) {
    logger.error(commonLogger.getStackTrace(), ...args);
  }

  static fatal(...args) {
    logger.fatal(commonLogger.getStackTrace(), ...args);
  }

  static access(...args) {
    const loggerCustom = Log4js.getLogger('http');
    loggerCustom.info(commonLogger.getStackTrace(), ...args);
  }

  // 日志追踪，可以追溯到哪个文件、第几行第几列
  static getStackTrace(deep = 2): string {
    const stackList: StackTrace.StackFrame[] = StackTrace.getSync();
    const stackInfo: StackTrace.StackFrame = stackList[deep];

    const lineNumber: number = stackInfo.lineNumber;
    const columnNumber: number = stackInfo.columnNumber;
    const fileName: string = stackInfo.fileName;
    const basename: string = path.basename(fileName);
    return `${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
  }
}
