import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { MODIFIED_DATA_CONFIG, TIME_LIMIT } from '../constants/modified-data.config';

@Injectable()
export class CacheInterceptor implements HttpInterceptor{

  constructor() { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const item = localStorage.getItem(req.url);
    const cachedResponse = JSON.parse(item || '{}');
    if (item && +new Date() - cachedResponse.initTime < TIME_LIMIT) {
      return of(new HttpResponse({ body: cachedResponse.content }));
    } else {
      return next.handle(req).pipe(
        tap((response: HttpResponse<any> | HttpEvent<any>) => {
          const newItem = {
            initTime: +new Date(),
            content: (response as HttpResponse<any>).body,
          }
          localStorage.setItem(req.url, JSON.stringify(newItem));
          localStorage.setItem(MODIFIED_DATA_CONFIG, JSON.stringify(+new Date()));
        }),
      )
    }
  }
}
