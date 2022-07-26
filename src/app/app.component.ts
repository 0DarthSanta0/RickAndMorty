import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BreadcrumbService } from "./services/breadcrumb/breadcrumb.service";
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit{
  public breadcrumbs: MenuItem[] = [];

  constructor(
    private breadcrumbsService: BreadcrumbService,
  ) {
  }

  ngOnInit() {
    this.breadcrumbsService.getBreadcrumbs$().subscribe(breadcrumbs => this.breadcrumbs = breadcrumbs);
  }

}
