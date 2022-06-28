import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from "./modules/main-page/main-page.component";
import { InfoCharacterPageComponent } from "./modules/details/info-character-page/info-character-page.component";

const appRoutes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'info/:id', component: InfoCharacterPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
