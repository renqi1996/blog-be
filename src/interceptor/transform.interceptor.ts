import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { commonLogger } from '../utils/log4js';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    console.log('req:', req);
    
    return next.handle().pipe(
      map((data) => {
        let logFormat;
        if (req) {
          // 此时为 RESTFUL 数据
          logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
              Request original url: ${req.originalUrl || ''}
              Method: ${req.method || ''}
              IP: ${req.ip || ''}
              User: ${JSON.stringify(req.user) || ''}
              Response data:\n ${JSON.stringify(data.data) || ''}
              <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
        } else {
          logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
              Graphql
              <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
        }
        
        commonLogger.info(logFormat);
        commonLogger.access(logFormat);
        return data;
      })
    );
  }
}
