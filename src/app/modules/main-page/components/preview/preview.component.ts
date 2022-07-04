import { Component, OnInit, Input } from '@angular/core';
import { Character } from "../../../../shared/interfaces/character.interface";
import { Episode } from "../../../../shared/interfaces/episode.interface";
import { Location } from "../../../../shared/interfaces/location.interface";
import { Store } from "@ngrx/store";
import { selectCharacter, selectEpisode, selectLocation } from "../../../../shared/store/api.selectors";
import { SearchedEntities } from "../../../../shared/enums/searched.entities";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input() public id: number | null = null;

  @Input() public type: string | null = null;

  public essence: Character | Episode | Location | null = null;

  constructor(
    private store$: Store,
  ) { }

  ngOnInit(): void {
    if (this.type === SearchedEntities.CHARACTERS && this.id) {
      this.store$.select(selectCharacter(this.id)).subscribe((item: Character | undefined) => {
          if (item)
            this.essence = item;
      })
    }
    if (this.type === SearchedEntities.LOCATIONS && this.id) {
      this.store$.select(selectLocation(this.id)).subscribe((item: Location | undefined) => {
        if (item)
          this.essence = item;
      })
    }
    if (this.type === SearchedEntities.EPISODES && this.id) {
      this.store$.select(selectEpisode(this.id)).subscribe((item: Episode | undefined) => {
        if (item)
          this.essence = item;
      })
    }
  }

  private typeOfVisibility: boolean = false;

}
