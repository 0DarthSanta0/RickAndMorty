import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectInfoLocation } from '../../../../shared/store/api.selectors';
import { doSearchLocationRequest } from '../../../../shared/store/api.actions';
import { Location } from '../../../../shared/interfaces/location.interface';
import { Subject, takeUntil, tap } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BreadcrumbService } from '../../../../services/breadcrumb/breadcrumb.service';
import { BaseUrl } from '../../../../shared/enums/base.url';
import { SearchedEntities } from '../../../../shared/enums/searched.entities';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-info-location-page',
  templateUrl: './info-location-page.component.html',
  styleUrls: ['./info-location-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoLocationPageComponent implements OnInit {

  public location: Location | undefined;

  public charactersIds: number[] = [];

  private readonly ID_INDEX: number = 42;

  private destroySubject$: Subject<void> = new Subject<void>();

  constructor(
    private store$: Store,
    private activateRoute: ActivatedRoute,
    private detectChange: ChangeDetectorRef,
    private breadcrumbService: BreadcrumbService,
  ) {
  }

  public ngOnInit(): void {
    let id: number = Number(this.activateRoute.snapshot.params['id']);
    this.selectLocation(id);
  }

  public ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
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
        takeUntil(this.destroySubject$),
      )
      .subscribe((location: Location | undefined) => {
        this.location = location;
        const breadcrumbs: MenuItem[] = [
          { label: `${BaseUrl.MAIN}`, routerLink: `/` },
          { label: `${BaseUrl.DETAILS}` },
          { label: `${SearchedEntities.LOCATIONS}` },
          { label: `${location?.name}` },
        ];
        let locationList: number[] = [];
        this.location?.residents?.forEach((resident) => {
          locationList.push(Number(resident.slice(this.ID_INDEX)));
        });
        this.charactersIds = locationList;
        this.breadcrumbService.setBreadcrumbs(breadcrumbs);
        this.detectChange.markForCheck();
      });
  }

}
