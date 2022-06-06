import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";

import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AutoCompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
