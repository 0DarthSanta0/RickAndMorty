import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { MenuItem } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private breadcrumbs$ = new Subject<MenuItem[]>();

  constructor() { }

  public getBreadcrumbs$(): Observable<MenuItem[]> {
    return this.breadcrumbs$.asObservable();
  }

  public setBreadcrumbs(breadcrumbsList: MenuItem[]): void {
    this.breadcrumbs$.next(breadcrumbsList);
  }

}
