import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { InfoCharacterPageComponent } from "./pages/info-character-page/info-character-page.component";
import { InfoLocationPageComponent } from './pages/info-location-page/info-location-page.component';
import { InfoEpisodePageComponent } from './pages/info-episode-page/info-episode-page.component';


@NgModule({
  declarations: [
    InfoCharacterPageComponent,
    InfoLocationPageComponent,
    InfoEpisodePageComponent
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule
  ]
})
export class DetailsModule { }
