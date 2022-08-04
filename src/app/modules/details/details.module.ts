import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsRoutingModule } from './details-routing.module';
import { InfoCharacterPageComponent } from './pages/info-character-page/info-character-page.component';
import { InfoLocationPageComponent } from './pages/info-location-page/info-location-page.component';
import { InfoEpisodePageComponent } from './pages/info-episode-page/info-episode-page.component';
import { CarouselModule } from 'primeng/carousel';
import { CharactersCarouselModule } from '../../shared/components/characters-carousel/characters-carousel.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ControlsTestComponent } from './pages/controls-test/controls-test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppInputModule } from '../../shared/components/controls/app-input/app-input.module';
import { PasswordInputModule } from '../../shared/components/controls/password-input/password-input.module';
import { AppDropdownModule } from '../../shared/components/controls/dropdown/dropdown.module';
import { AppCheckboxModule } from '../../shared/components/controls/checkbox/checkbox.module';
import { RadiobuttonModule } from '../../shared/components/controls/radiobutton/radiobutton.module';


@NgModule({
  declarations: [
    InfoCharacterPageComponent,
    InfoLocationPageComponent,
    InfoEpisodePageComponent,
    ControlsTestComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    CarouselModule,
    CharactersCarouselModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    ReactiveFormsModule,
    AppInputModule,
    PasswordInputModule,
    AppDropdownModule,
    AppCheckboxModule,
    RadiobuttonModule,
  ]
})
export class DetailsModule { }
