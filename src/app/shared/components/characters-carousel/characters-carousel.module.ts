import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersCarouselComponent } from './characters-carousel.component';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [
    CharactersCarouselComponent
  ],
  exports: [
    CharactersCarouselComponent
  ],
  imports: [
    CommonModule,
    CarouselModule
  ]
})
export class CharactersCarouselModule { }
