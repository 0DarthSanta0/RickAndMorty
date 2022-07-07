import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { AutoCompleteModule } from "primeng/autocomplete";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MainPageComponent } from './modules/main-page/main-page.component';
import { generalReducer } from "./shared/store/api.reducers";
import { EffectsModule } from "@ngrx/effects";
import { GeneralEffects } from "./shared/store/api.effects";
import { RouterModule, Routes } from "@angular/router";
import { PreviewComponent } from './modules/main-page/components/preview/preview.component';
import { CarouselModule } from "primeng/carousel";
import { CharactersCarouselModule } from "./shared/components/characters-carousel/characters-carousel.module";
import { LocalStorageInterceptor } from "./shared/classes/local-storage.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    PreviewComponent,
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
    CarouselModule,
    CharactersCarouselModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: LocalStorageInterceptor,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
