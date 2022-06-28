import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoCharacterPageComponent } from "./pages/info-character-page/info-character-page.component";

const routes: Routes = [
  { path: ':id', component: InfoCharacterPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DetailsRoutingModule { }
