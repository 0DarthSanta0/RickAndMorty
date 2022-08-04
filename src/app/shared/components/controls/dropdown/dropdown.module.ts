import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownRoutingModule } from './dropdown-routing.module';
import { DropdownComponent } from './dropdown.component';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DropdownComponent
  ],
  exports: [
    DropdownComponent
  ],
  imports: [
    CommonModule,
    DropdownRoutingModule,
    DropdownModule,
    ReactiveFormsModule
  ]
})
export class AppDropdownModule { }
