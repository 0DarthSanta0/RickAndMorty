import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Character } from "../../../../shared/interfaces/character.interface";
import { selectCharacter } from "../../../../shared/store/api.selectors";
import { ActivatedRoute } from "@angular/router";
import { doSearchCharacterRequest } from "../../../../shared/store/api.actions";
import { SearchedEntities } from "../../../../shared/enums/searched.entities";
import { BaseUrl } from "../../../../shared/enums/base.url";

@Component({
  selector: 'app-info-character-page',
  templateUrl: './info-character-page.component.html',
  styleUrls: ['./info-character-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InfoCharacterPageComponent implements OnInit {

  public items = [
    {label: `${BaseUrl.MAIN}`, url: `${BaseUrl.BASE_URL}`},
    {label: `${BaseUrl.DETAILS}`},
    {label: `${SearchedEntities.CHARACTERS}`},
  ];

  public character: Character | null = null;

  constructor(
    private store$: Store,
    private activateRoute: ActivatedRoute,
    private detectChange: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    let id: number = Number(this.activateRoute.snapshot.params['id']);

    this.store$.select(selectCharacter(id)).subscribe((item: Character | undefined) => {
      if (item) {
        this.character = item;
      } else {
        this.store$.dispatch(doSearchCharacterRequest({id: id}));
        if (item) {
          this.character = item;
        }
      }
      if (this.character?.name) {
        this.items.push({label: this.character?.name});
      }
      this.detectChange.detectChanges();
    });
  }
}

