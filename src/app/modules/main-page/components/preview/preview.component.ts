import { Component, OnInit, Input } from '@angular/core';
import { Character } from "../../../../shared/interfaces/character.interface";
import { Episode } from "../../../../shared/interfaces/episode.interface";
import { Location } from "../../../../shared/interfaces/location.interface";

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  @Input() public id: number | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  private typeOfVisibility: boolean = false;

}
