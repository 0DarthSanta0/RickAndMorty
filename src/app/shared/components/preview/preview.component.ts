import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Character } from '../../interfaces/character.interface';
import { Episode } from '../../interfaces/episode.interface';
import { Location } from '../../interfaces/location.interface';
import { fromEvent, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit {

  @Input() public essence: Character & Episode & Location | null = null;

  @Input() public type: string = '';

  public isHidden = true;

  private destroySubject$: Subject<void> = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    const element = document.getElementById(`${this.type}${this.essence?.id}`)
    if (element) {
      const enteredElement$: Observable<MouseEvent> = fromEvent<MouseEvent>(element, 'mouseenter');
      enteredElement$
        .pipe(
          takeUntil(this.destroySubject$),
        )
        .subscribe(() => {
          this.isHidden = false;
          this.cdr.markForCheck();
        });
      const outElement$: Observable<MouseEvent> = fromEvent<MouseEvent>(element, 'mouseleave');
      outElement$
        .pipe(
          takeUntil(this.destroySubject$),
        )
        .subscribe(() => {
          this.isHidden = true;
          this.cdr.markForCheck();
        });
    }
  }

  public ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }

}
