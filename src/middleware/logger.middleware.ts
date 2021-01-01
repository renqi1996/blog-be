import { Injectable, NestMiddleware } from '@nestjs/common';
import { commonLogger } from '../utils/log4js';
import { Request, Response } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: () => void) {
//     const code = res.statusCode;
    
//     next();

//     const logFormat = `>>>>>>>>>>>>>>>>>>>>>>>>>>> \n Method: ${req.method} \n Request original url: ${req.originalUrl} \n IP: ${req.ip} \n Status code: ${code} \n >>>>>>>>>>>>>>>>>>>>>>>>>>> \n`;

//     if (code >= 500) {
//       commonLogger.error(logFormat);
//     } else if (code >= 400) {
//       commonLogger.warn(logFormat);
//     } else {
//       commonLogger.access(logFormat);
//       commonLogger.log(logFormat);
//     }
//   }
// }

export function logger (req: Request, res: Response, next: () => any) {
  const code = res.statusCode; // 响应状态码
  next();
  // 组装日志信息
  const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Parmas: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
  // 根据状态码，进行日志类型区分
  if (code >= 500) {
    commonLogger.error(logFormat);
  } else if (code >= 400) {
    commonLogger.warn(logFormat);
  } else {
    commonLogger.access(logFormat);
    commonLogger.log(logFormat);
  }
};
