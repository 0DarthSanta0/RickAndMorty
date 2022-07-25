import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { selectLocation } from "../../../../shared/store/api.selectors";
import { doSearchLocationRequest } from "../../../../shared/store/api.actions";
import { Location } from "../../../../shared/interfaces/location.interface";

@Component({
  selector: 'app-info-location-page',
  templateUrl: './info-location-page.component.html',
  styleUrls: ['./info-location-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoLocationPageComponent implements OnInit {

  private readonly ID_INDEX: number = 42;

  public location: Location | null = null;

  public charactersIds: number[] = [];

  constructor(
    private store$: Store,
    private activateRoute: ActivatedRoute,
    private detectChange: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    let id: number = Number(this.activateRoute.snapshot.params['id']);
    this.selectLocation(id);
  }

  private selectLocation(id: number): void {
    this.store$.select(selectLocation(id)).subscribe((item: Location | undefined) => {
      if (item) {
        this.location = item;
      } else {
        this.store$.dispatch(doSearchLocationRequest({id: id}));
        if(item) {
          this.location = item;
        }
      }
      this.location?.residents?.forEach((item) => {
        this.charactersIds.push(Number(item.slice(this.ID_INDEX)));
      });
      this.detectChange.markForCheck();
    });
  }

}
