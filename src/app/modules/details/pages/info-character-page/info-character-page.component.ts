import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Character } from '../../../../shared/interfaces/character.interface';
import { selectInfoCharacter } from '../../../../shared/store/api.selectors';
import { ActivatedRoute } from '@angular/router';
import { doSearchCharacterRequest } from '../../../../shared/store/api.actions';
import { Subject, takeUntil, tap } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BreadcrumbService } from '../../../../services/breadcrumb/breadcrumb.service';
import { MenuItem } from 'primeng/api';
import { BaseUrl } from '../../../../shared/enums/base.url';
import { SearchedEntities } from '../../../../shared/enums/searched.entities';

@Component({
  selector: 'app-info-character-page',
  templateUrl: './info-character-page.component.html',
  styleUrls: ['./info-character-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InfoCharacterPageComponent implements OnInit, OnDestroy {

  public character: Character | undefined;

  private destroySubject$: Subject<void> = new Subject<void>();

  constructor(
    private store$: Store,
    private activateRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private breadcrumbService: BreadcrumbService,
  ) {
  }

  public ngOnInit(): void {
    const id: number = Number(this.activateRoute.snapshot.params['id']);
    this.selectCharacter(id);
  }

  public ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  private selectCharacter(id: number): void {
    this.store$.select(selectInfoCharacter)
      .pipe(
        tap((character: Character | undefined) => {
          if(!character) {
            this.store$.dispatch(doSearchCharacterRequest({id}));
          }
        }),
        filter((character: Character | undefined) => !!character),
        takeUntil(this.destroySubject$),
      )
      .subscribe((character: Character | undefined) => {
        this.character = character;
        const breadcrumbs: MenuItem[] = [
          { label: `${BaseUrl.MAIN}`, routerLink: `/` },
          { label: `${BaseUrl.DETAILS}` },
          { label: `${SearchedEntities.CHARACTERS}` },
          { label: `${character?.name}` },
        ];
        this.breadcrumbService.setBreadcrumbs(breadcrumbs);
        this.cdr.markForCheck();
      });
  }
}

