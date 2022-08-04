import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppInputRoutingModule } from './app-input-routing.module';
import { InputComponent } from './app-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    InputComponent
  ],
  exports: [
    InputComponent
  ],
  imports: [
    CommonModule,
    AppInputRoutingModule,
    ReactiveFormsModule,
    InputTextModule
  ]
})
export class AppInputModule { }
