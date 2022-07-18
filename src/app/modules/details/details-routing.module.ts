import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoCharacterPageComponent } from "./pages/info-character-page/info-character-page.component";
import { InfoEpisodePageComponent } from "./pages/info-episode-page/info-episode-page.component";
import { InfoLocationPageComponent } from "./pages/info-location-page/info-location-page.component";
import { SearchedEntities } from "../../shared/enums/searched.entities";

const routes: Routes = [
  {
    path: `${SearchedEntities.CHARACTERS.toLowerCase()}/:id`,
    component: InfoCharacterPageComponent,
    data: {
      breadcrumb: `${SearchedEntities.CHARACTERS}`,
      isNotActive: false,
    },
  },
  {
    path: `${SearchedEntities.EPISODES.toLowerCase()}/:id`,
    component: InfoEpisodePageComponent,
    data: {
      breadcrumb: `${SearchedEntities.EPISODES}`,
      isNotActive: false,
    },
  },
  {
    path: `${SearchedEntities.LOCATIONS.toLowerCase()}/:id`,
    component: InfoLocationPageComponent,
    data: {
      breadcrumb: `${SearchedEntities.LOCATIONS}`,
      isNotActive: false,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DetailsRoutingModule { }
