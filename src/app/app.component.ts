import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpService } from "./services/http/http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'RickAndMorty';

}
