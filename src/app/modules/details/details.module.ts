import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { InfoCharacterPageComponent } from "./pages/info-character-page/info-character-page.component";
import { InfoLocationPageComponent } from './pages/info-location-page/info-location-page.component';
import { InfoEpisodePageComponent } from './pages/info-episode-page/info-episode-page.component';
import { CarouselModule } from "primeng/carousel";
import { CharactersCarouselModule } from "../../shared/components/characters-carousel/characters-carousel.module";


@NgModule({
  declarations: [
    InfoCharacterPageComponent,
    InfoLocationPageComponent,
    InfoEpisodePageComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    CarouselModule,
    CharactersCarouselModule
  ]
})
export class DetailsModule { }
