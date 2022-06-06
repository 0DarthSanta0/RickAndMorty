import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RickAndMorty';
  text: string = '';

  results: string[] = [];

  search($event: any) {
    this.results = ['a', 'aa', 'bb'];
  }
}
