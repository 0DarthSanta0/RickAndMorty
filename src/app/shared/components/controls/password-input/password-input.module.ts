import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordInputRoutingModule } from './password-input-routing.module';
import { PasswordInputComponent } from './password-input.component';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PasswordInputComponent
  ],
  exports: [
    PasswordInputComponent
  ],
  imports: [
    CommonModule,
    PasswordInputRoutingModule,
    PasswordModule,
    ReactiveFormsModule
  ]
})
export class PasswordInputModule { }
