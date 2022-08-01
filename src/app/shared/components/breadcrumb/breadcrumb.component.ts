import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BreadcrumbService } from "../../../services/breadcrumb/breadcrumb.service";
import { Observable, of } from "rxjs";
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements OnInit {

  public breadcrumbs$: Observable<MenuItem[]> = of([]);

  constructor(
    private breadcrumbsService: BreadcrumbService,
  ) { }

  ngOnInit(): void {
    this.breadcrumbs$ = this.breadcrumbsService.getBreadcrumbs$();
  }

}
