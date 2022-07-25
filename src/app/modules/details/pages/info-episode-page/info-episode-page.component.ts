import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { selectEpisode } from "../../../../shared/store/api.selectors";
import { doSearchEpisodeRequest } from "../../../../shared/store/api.actions";
import { Episode } from "../../../../shared/interfaces/episode.interface";
import { tap } from "rxjs";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-info-episode-page',
  templateUrl: './info-episode-page.component.html',
  styleUrls: ['./info-episode-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoEpisodePageComponent implements OnInit {

  private readonly ID_INDEX: number = 42;

  public episode: Episode | undefined;

  public charactersIds: number[] = [];

  constructor(
    private store$: Store,
    private activateRoute: ActivatedRoute,
    private detectChange: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    let id: number = Number(this.activateRoute.snapshot.params['id']);
    this.selectEpisode(id);
  }

  private selectEpisode(id: number): void {
    this.store$.select(selectEpisode(id))
      .pipe(
        tap((episode: Episode | undefined) => {
          if (!episode) {
            this.store$.dispatch(doSearchEpisodeRequest({id}));
          }
        }),
        filter((episode: Episode | undefined) => !!episode),
      )
      .subscribe((item: Episode | undefined) => {
        this.episode = item;
        let a: number[] = [];
        this.episode?.characters?.forEach((item) => {
          a.push(Number(item.slice(this.ID_INDEX)));
          // this.charactersIds.push(Number(item.slice(this.ID_INDEX)));
        });
        this.charactersIds = a;
        this.detectChange.markForCheck();
      });
  }

}
