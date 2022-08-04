import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Character } from "../../../../shared/interfaces/character.interface";
import { Episode } from "../../../../shared/interfaces/episode.interface";
import { Location } from "../../../../shared/interfaces/location.interface";
import { fromEvent, Observable } from "rxjs";

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

  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    const element = document.getElementById(`${this.type}${this.essence?.id}`)
    if(element) {
      const enteredElement$: Observable<MouseEvent> = fromEvent<MouseEvent>(element, 'mouseenter');
      enteredElement$.subscribe(() => {
        this.isHidden = false;
        this.cdr.markForCheck();
      });
      const outElement$: Observable<MouseEvent> = fromEvent<MouseEvent>(element, 'mouseleave');
      outElement$.subscribe(() => {
        this.isHidden = true;
        this.cdr.markForCheck();
      });
    }
  }
}
