import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from "@angular/common/http";
import { MainPageComponent } from './modules/main-page/main-page.component';
import { generalReducer } from "./shared/store/api.reducers";
import { EffectsModule } from "@ngrx/effects";
import { GeneralEffects } from "./shared/store/api.effects";
import { RouterModule, Routes } from "@angular/router";
import { InfoCharacterPageComponent } from './modules/details/info-character-page/info-character-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    InfoCharacterPageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AutoCompleteModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({app: generalReducer}),
    EffectsModule.forRoot([GeneralEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
