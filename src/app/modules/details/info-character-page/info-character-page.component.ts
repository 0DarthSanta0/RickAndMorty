import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { Character } from "../../../shared/interfaces/character.interface";
import { selectCharacter } from "../../../shared/store/api.selectors";
import { ActivatedRoute } from "@angular/router";
import { doSearchCharacterRequest } from "../../../shared/store/api.actions";

@Component({
  selector: 'app-info-character-page',
  templateUrl: './info-character-page.component.html',
  styleUrls: ['./info-character-page.component.scss']
})

export class InfoCharacterPageComponent implements OnInit {

  character: Character = {
    created: null,
    episode: null,
    gender: null,
    id: null,
    image: null,
    location: null,
    name: null,
    origin: null,
    species: null,
    status: null,
    type: null,
    url: null,
  };


  constructor(private store$: Store, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id: number = Number(this.activateRoute.snapshot.params['id']);
    this.store$.select(selectCharacter(id)).subscribe((item: Character|undefined) => {
      if (item) {
        this.character = item;
      } else {
        this.store$.dispatch(doSearchCharacterRequest({id: id}));
        this.store$.select(selectCharacter(id)).subscribe(data => {
          if(data) {
            this.character = data;
          }
        });
      }
    });
  }

}
