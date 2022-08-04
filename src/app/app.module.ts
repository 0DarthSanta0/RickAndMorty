import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './modules/main-page/main-page.component';
import { generalReducer } from './shared/store/api.reducers';
import { EffectsModule } from '@ngrx/effects';
import { GeneralEffects } from './shared/store/api.effects';
import { CarouselModule } from 'primeng/carousel';
import { CharactersCarouselModule } from './shared/components/characters-carousel/characters-carousel.module';
import { TooltipModule } from 'primeng/tooltip';
import { CacheInterceptor } from './shared/interceptors/cache.interceptor';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbComponent } from './shared/components/breadcrumb/breadcrumb.component';
import { clearDataInitializer } from './shared/utils/clear-data.initializer';
import { CustomAutoCompleteModule } from './shared/components/controls/auto-complete/auto-complete.module';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    BreadcrumbComponent,
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
    TooltipModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    CustomAutoCompleteModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: clearDataInitializer,
      multi: true,
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
