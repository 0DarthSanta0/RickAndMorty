import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { IBreadCrumb } from "../../shared/interfaces/breadcrumb.interface";
import { BaseUrl } from "../../shared/enums/base.url";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs: IBreadCrumb[]

  constructor(
    private store$: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
    })
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = `${BaseUrl.BASE_URL}`,
    breadcrumbs: IBreadCrumb[] = [{
      label: 'Main',
      url: `${BaseUrl.BASE_URL}`,
    }]): IBreadCrumb[] {
    let labels = route.routeConfig && route.routeConfig.data ? [route.routeConfig.data['breadcrumb']] : [''];
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
    let status = route.routeConfig && route.routeConfig.data ? route.routeConfig.data['isNotActive'] : false;
    let lastRoutePart = path?.split('/').pop();
    if (lastRoutePart?.startsWith(':') && lastRoutePart) {
      const paramName = lastRoutePart?.split(':')[1];
      path = path?.replace(lastRoutePart, route.snapshot.params[paramName]);
      labels.push(route.snapshot.params[paramName]);
    }
    const nextUrl = path ? `${url}/${path}` : url;
    const tempBreadcrumbs: IBreadCrumb[] = [];
    labels.forEach((label: string) => {
      if (label) {
        tempBreadcrumbs.push({
          label: label,
          url: status ? undefined : nextUrl ,
        });
      }
    });
    const newBreadcrumbs: IBreadCrumb[] = [...breadcrumbs, ...tempBreadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
