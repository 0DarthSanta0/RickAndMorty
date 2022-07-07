import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoCharacterPageComponent } from "./pages/info-character-page/info-character-page.component";
import { InfoEpisodePageComponent } from "./pages/info-episode-page/info-episode-page.component";
import { InfoLocationPageComponent } from "./pages/info-location-page/info-location-page.component";
import { SearchedEntities } from "../../shared/enums/searched.entities";

const routes: Routes = [
  { path: `${SearchedEntities.CHARACTERS}/:id`, component: InfoCharacterPageComponent },
  { path: `${SearchedEntities.EPISODES}/:id`, component: InfoEpisodePageComponent },
  { path: `${SearchedEntities.LOCATIONS}/:id`, component: InfoLocationPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DetailsRoutingModule { }
