import { Component, OnInit } from '@angular/core';
import { Character } from "../../../../shared/interfaces/character.interface";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { selectCharacter, selectLocation } from "../../../../shared/store/api.selectors";
import { doSearchCharacterRequest, doSearchLocationRequest } from "../../../../shared/store/api.actions";
import { Location } from "../../../../shared/interfaces/location.interface";

@Component({
  selector: 'app-info-location-page',
  templateUrl: './info-location-page.component.html',
  styleUrls: ['./info-location-page.component.scss']
})
export class InfoLocationPageComponent implements OnInit {

  private readonly ID_INDEX: number = 42;

  public location: Location | null = null;

  public charactersIds: number[] = [];

  constructor(
    private store$: Store,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id: number = Number(this.activateRoute.snapshot.params['id']);

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
    });
  }

}
