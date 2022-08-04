import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoCompleteRoutingModule } from './auto-complete-routing.module';
import { AutoCompleteComponent } from "./auto-complete.component";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ReactiveFormsModule } from "@angular/forms";
import { PreviewComponent } from "../../preview/preview.component";


@NgModule({
  declarations: [
    PreviewComponent,
    AutoCompleteComponent
  ],
  exports: [
    AutoCompleteComponent
  ],
  imports: [
    CommonModule,
    AutoCompleteRoutingModule,
    AutoCompleteModule,
    ReactiveFormsModule,
  ]
})
export class CustomAutoCompleteModule { }
