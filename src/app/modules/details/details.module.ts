import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailsRoutingModule } from './details-routing.module';
import { InfoCharacterPageComponent } from "./pages/info-character-page/info-character-page.component";


@NgModule({
  declarations: [
    InfoCharacterPageComponent
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule
  ]
})
export class DetailsModule { }
