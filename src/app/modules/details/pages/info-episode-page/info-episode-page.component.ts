import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectInfoEpisode } from '../../../../shared/store/api.selectors';
import { doSearchEpisodeRequest } from '../../../../shared/store/api.actions';
import { Episode } from '../../../../shared/interfaces/episode.interface';
import { Subject, takeUntil, tap } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BreadcrumbService } from '../../../../services/breadcrumb/breadcrumb.service';
import { BaseUrl } from '../../../../shared/enums/base.url';
import { SearchedEntities } from '../../../../shared/enums/searched.entities';

@Component({
  selector: 'app-info-episode-page',
  templateUrl: './info-episode-page.component.html',
  styleUrls: ['./info-episode-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoEpisodePageComponent implements OnInit {

  public episode: Episode | undefined;

  public charactersIds: number[] = [];

  private readonly ID_INDEX: number = 42;

  private destroySubject$: Subject<void> = new Subject<void>();

  constructor(
    private store$: Store,
    private activateRoute: ActivatedRoute,
    private detectChange: ChangeDetectorRef,
    private breadcrumbService: BreadcrumbService,
  ) { }

  public ngOnInit(): void {
    let id: number = Number(this.activateRoute.snapshot.params['id']);
    this.selectEpisode(id);
  }

  public ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  private selectEpisode(id: number): void {
    this.store$.select(selectInfoEpisode)
      .pipe(
        tap((episode: Episode | undefined) => {
          if (!episode) {
            this.store$.dispatch(doSearchEpisodeRequest({id}));
          }
        }),
        filter((episode: Episode | undefined) => !!episode),
        takeUntil(this.destroySubject$),
      )
      .subscribe((episode: Episode | undefined) => {
        this.episode = episode;
        const breadcrumbs = [
          { label: `${BaseUrl.MAIN}`, routerLink: `/` },
          { label: `${BaseUrl.DETAILS}` },
          { label: `${SearchedEntities.EPISODES}` },
          { label: `${episode?.name}` },
        ];
        let episodeList: number[] = [];
        this.episode?.characters?.forEach((character) => {
          episodeList.push(Number(character.slice(this.ID_INDEX)));
        });
        this.charactersIds = episodeList;
        this.breadcrumbService.setBreadcrumbs(breadcrumbs);
        this.detectChange.markForCheck();
      });
  }

}
