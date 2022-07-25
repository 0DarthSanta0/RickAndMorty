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
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem(JSON.stringify(req.url))) {
      const cachedResponse = JSON.parse(localStorage.getItem(JSON.stringify(req.url)) || '');
      return of(new HttpResponse({ body: cachedResponse }));
    } else {
      return next.handle(req).pipe(
        tap((response: HttpResponse<any> | HttpEvent<any>) => {
          localStorage.setItem(req.url, JSON.stringify((response as HttpResponse<any>).body));
        }),
      )
    }
  }
}
