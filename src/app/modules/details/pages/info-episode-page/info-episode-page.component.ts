import { Component, OnInit } from '@angular/core';
import { Character } from "../../../../shared/interfaces/character.interface";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { selectCharacter, selectEpisode } from "../../../../shared/store/api.selectors";
import { doSearchCharacterRequest, doSearchEpisodeRequest } from "../../../../shared/store/api.actions";
import { Episode } from "../../../../shared/interfaces/episode.interface";

@Component({
  selector: 'app-info-episode-page',
  templateUrl: './info-episode-page.component.html',
  styleUrls: ['./info-episode-page.component.scss']
})
export class InfoEpisodePageComponent implements OnInit {

  private readonly ID_INDEX: number = 42;

  public episode: Episode | null = null;

  public charactersIds: number[] = [];

  constructor(
    private store$: Store,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id: number = Number(this.activateRoute.snapshot.params['id']);

    this.store$.select(selectEpisode(id)).subscribe((item: Episode | undefined) => {
      if (item) {
        this.episode = item;
      } else {
        this.store$.dispatch(doSearchEpisodeRequest({id: id}));
        if(item) {
          this.episode = item;
        }
      }
      this.episode?.characters?.forEach((item) => {
        this.charactersIds.push(Number(item.slice(this.ID_INDEX)));
      });
    });
  }

}
