import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { doSearchMultipleCharactersRequest } from "../../../../shared/store/api.actions";
import { selectCharactersForCarousel } from "../../../../shared/store/api.selectors";
import { Character } from "../../../../shared/interfaces/character.interface";
import { ResultsData } from "../../../../shared/interfaces/results.data";
import { SelectEvent } from "../../../../shared/interfaces/select.event";
import { Router } from "@angular/router";
import { SearchedEntities } from "../../../../shared/enums/searched.entities";

@Component({
  selector: 'app-random-carousel',
  templateUrl: './random-carousel.component.html',
  styleUrls: ['./random-carousel.component.scss']
})
export class RandomCarouselComponent implements OnInit {

  private readonly COUNT_OF_CHARACTERS: number = 826;

  public characters: Character[] = [];

  constructor(
    private store$: Store,
    private route: Router,
  ) { }

  ngOnInit(): void {
    let randomIds: number[] = [];
    for (let i = 0; i < 21; ++i) {
      randomIds.push(Math.floor(Math.random() * (this.COUNT_OF_CHARACTERS + 1)));
    }
    console.log(randomIds);
    this.store$.dispatch(doSearchMultipleCharactersRequest({id: randomIds}));
    this.store$.select(selectCharactersForCarousel).subscribe((result: Character[]) => this.characters = result);
  }

  public onClick(id: number) {
    this.route.navigate([`/details/${SearchedEntities.CHARACTERS}`, id]).then();
  }
}


