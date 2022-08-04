import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadiobuttonRoutingModule } from './radiobutton-routing.module';
import { RadiobuttonComponent } from './radiobutton.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';


@NgModule({
  declarations: [
    RadiobuttonComponent
  ],
  exports: [
    RadiobuttonComponent
  ],
  imports: [
    CommonModule,
    RadiobuttonRoutingModule,
    ReactiveFormsModule,
    RadioButtonModule
  ]
})
export class RadiobuttonModule { }
