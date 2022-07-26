import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable, of, tap } from "rxjs";

@Injectable()
export class LocalStorageInterceptor implements HttpInterceptor{

  private readonly timeLimit = 15 * 60 * 1000;

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const item = localStorage.getItem(req.url);
    const cachedResponse = JSON.parse(item || '{}');
    if (item && +new Date() - cachedResponse.initTime < this.timeLimit) {
      return of(new HttpResponse({ body: cachedResponse.content }));
    } else {
      return next.handle(req).pipe(
        tap((response: HttpResponse<any> | HttpEvent<any>) => {
          const temp = {
            initTime: +new Date(),
            content: (response as HttpResponse<any>).body,
          }
          localStorage.setItem(req.url, JSON.stringify(temp));
        }),
      )
    }
  }
}
