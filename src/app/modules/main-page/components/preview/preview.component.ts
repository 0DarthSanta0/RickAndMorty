import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Character } from "../../../../shared/interfaces/character.interface";
import { Episode } from "../../../../shared/interfaces/episode.interface";
import { Location } from "../../../../shared/interfaces/location.interface";
import { Store } from "@ngrx/store";
import { selectCharacter, selectEpisode, selectLocation } from "../../../../shared/store/api.selectors";
import { SearchedEntities } from "../../../../shared/enums/searched.entities";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent implements OnInit {

  @Input() public essence: Character | Episode | Location | null = null;

  @Input() public type: string = '';

  constructor() { }

  ngOnInit(): void {

  }

}
