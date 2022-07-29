import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { selectInfoLocation } from "../../../../shared/store/api.selectors";
import { doSearchLocationRequest } from "../../../../shared/store/api.actions";
import { Location } from "../../../../shared/interfaces/location.interface";
import { tap } from "rxjs";
import { filter } from "rxjs/operators";
import { BreadcrumbService } from "../../../../services/breadcrumb/breadcrumb.service";
import { BaseUrl } from "../../../../shared/enums/base.url";
import { SearchedEntities } from "../../../../shared/enums/searched.entities";
import { MenuItem } from "primeng/api";

@Component({
  selector: 'app-info-location-page',
  templateUrl: './info-location-page.component.html',
  styleUrls: ['./info-location-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoLocationPageComponent implements OnInit {

  private readonly ID_INDEX: number = 42;

  private breadcrumbs: MenuItem[] = [];

  public location: Location | undefined;

  public charactersIds: number[] = [];

  constructor(
    private store$: Store,
    private activateRoute: ActivatedRoute,
    private detectChange: ChangeDetectorRef,
    private breadcrumbService: BreadcrumbService,
  ) {
  }

  ngOnInit(): void {
    let id: number = Number(this.activateRoute.snapshot.params['id']);
    this.selectLocation(id);
  }

  private selectLocation(id: number): void {
    this.store$.select(selectInfoLocation)
      .pipe(
        tap((location: Location | undefined) => {
          if (!location) {
            this.store$.dispatch(doSearchLocationRequest({id}))
          }
        }),
        filter((location: Location | undefined) => !!location),
      )
      .subscribe((item: Location | undefined) => {
        this.location = item;
        this.breadcrumbs = [
          { label: `${BaseUrl.MAIN}`, routerLink: `/` },
          { label: `${BaseUrl.DETAILS}` },
          { label: `${SearchedEntities.LOCATIONS}` },
          { label: `${item?.name}` },
        ];
        let temp: number[] = [];
        this.location?.residents?.forEach((item) => {
          temp.push(Number(item.slice(this.ID_INDEX)));
        });
        this.charactersIds = temp;
        this.breadcrumbService.setBreadcrumbs(this.breadcrumbs);
        this.detectChange.markForCheck();
      });
  }

}
