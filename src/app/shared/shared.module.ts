import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselDirective } from './directives/carousel.directive';
import { CarouselComponent, CarouselItemElement } from './components/carousel/carousel.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CarouselDirective, CarouselComponent, CarouselItemElement],
})
export class SharedModule { }
