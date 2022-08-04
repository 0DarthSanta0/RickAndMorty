import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { doSearchMultipleCharactersRequest, loadCarouselCharacterInfo } from '../../store/api.actions';
import { selectCharactersForCarousel } from '../../store/api.selectors';
import { SearchedEntities } from '../../enums/searched.entities';
import { BaseUrl } from '../../enums/base.url';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-characters-carousel',
  templateUrl: './characters-carousel.component.html',
  styleUrls: ['./characters-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersCarouselComponent implements OnInit, OnChanges {

  @Input() public charactersIds: number[] = [];

  public characters: Character[] = [];

  private destroySubject$: Subject<void> = new Subject<void>();

  constructor(
    private store$: Store,
    private route: Router,
    private changeDetector: ChangeDetectorRef,
  ) { }

  public ngOnChanges(): void {
    if (this.charactersIds.length) {
      this.store$.dispatch(doSearchMultipleCharactersRequest({id: this.charactersIds}));
    }
  }

  public ngOnInit(): void {
    this.selectCharacters();
  };

  public ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

  public onClick(id: number): void {
    this.store$.dispatch(loadCarouselCharacterInfo({id}));
    this.route.navigate([`/${BaseUrl.DETAILS.toLowerCase()}/${SearchedEntities.CHARACTERS.toLowerCase()}`, id]);
  }

  private selectCharacters(): void {
    this.store$.select(selectCharactersForCarousel)
      .pipe(
        takeUntil(this.destroySubject$),
      )
      .subscribe((result: Character[]) => {
      this.characters = result;
      this.changeDetector.markForCheck();
    });
  }

}
