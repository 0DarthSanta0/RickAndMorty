import { Injectable } from "@angular/core";
import { HttpService } from "../../services/http/http.service";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpSentEvent
} from "@angular/common/http";
import { map, Observable, of, tap } from "rxjs";
import { Character } from "../interfaces/character.interface";
import { Location } from "../interfaces/location.interface";
import { Episode } from "../interfaces/episode.interface";
import { Filter } from "../interfaces/filter.interface";

@Injectable()
export class LocalStorageInterceptor implements HttpInterceptor{
  constructor(private http: HttpService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem(JSON.stringify(req.url))) {
      // @ts-ignore
      const cachedResponse = JSON.parse(localStorage.getItem(JSON.stringify(req.url)));
      return of(new HttpResponse({ body: cachedResponse }));
    } else {
      return next.handle(req).pipe(
        //@ts-ignore
        tap((response: HttpResponse<any>) => {
          localStorage.setItem(JSON.stringify(req.url), JSON.stringify(response.body));
        }),
      )
    }
  }
}
