import { Component, Input, OnInit } from '@angular/core';
import { Character } from "../../../interfaces/character.interface";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { doSearchMultipleCharactersRequest } from "../../../store/api.actions";
import { selectCharactersForCarousel } from "../../../store/api.selectors";
import { SearchedEntities } from "../../../enums/searched.entities";

@Component({
  selector: 'app-characters-carousel',
  templateUrl: './characters-carousel.component.html',
  styleUrls: ['./characters-carousel.component.scss']
})
export class CharactersCarouselComponent implements OnInit {

  @Input() public charactersIds: number[] = [];

  public characters: Character[] = [];

  constructor(
    private store$: Store,
    private route: Router,
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(doSearchMultipleCharactersRequest({id: this.charactersIds}));
    this.store$.select(selectCharactersForCarousel).subscribe((result: Character[]) => this.characters = result);
  }

  public onClick(id: number) {
    this.route.navigate([`/details/${SearchedEntities.CHARACTERS}`, id]).then();
  }

}
