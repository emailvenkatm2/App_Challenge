import { Component, OnInit, Input, Directive, AfterViewInit, ContentChildren,
  ViewChildren, ViewChild, QueryList, ElementRef } from '@angular/core';
import { AnimationBuilder, AnimationFactory, animate, AnimationPlayer, style } from '@angular/animations';
import { CarouselDirective } from '../../directives/carousel.directive';
@Directive({
  selector: '.carousel-item-single'
})
export class CarouselItemElement {
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements AfterViewInit,OnInit {
  // Input the Array of items to be part of Carousel
  @Input() items: Array<Object>;
  @ContentChildren(CarouselDirective) totalItems: QueryList<CarouselDirective>;
  @ViewChildren('carouselSignleItem', { read: ElementRef }) private totalItemsElements: QueryList<ElementRef>;
  @ViewChild('carousel') private carousel: ElementRef;
  @Input() timings = '300ms ease-in';
  @Input() itemsPerPage;
  @Input() singlItemWidth;
  private player: AnimationPlayer;
  private itemPadding: number;
  private currentPage = 0;
  private lastPage: number;
  // carouselWrapperStyle = {width: '200px'};
  public carouselWrapperStyle; 

  constructor(private _builder: AnimationBuilder) {
  
  
  }
  /*
  Distance will be calculated using the number of items multiplied by their width
  Will be used by rendorNextPage when handling the animation
  */
  public getdistanceToSlide(currentPage: number, itemsPerPage: number, width: number): number {
    return (currentPage * itemsPerPage * width);
  }

 
  /*
  Calculate the styling measurements of each item in carousel
  */
 public setGridStyle(width) {
    this.carouselWrapperStyle = {
      width: width
    };
   }

  // Method handles the animation for both next and previous using the Angular AnimationFactory
  handleAnimation() {
    const distanceInPx = this.getdistanceToSlide(this.currentPage, this.itemsPerPage, this.singlItemWidth);
    const pageAnimationObj: AnimationFactory = this._builder.build([
      animate(this.timings, style({ transform: `translateX(-${distanceInPx}px)` }))
    ]);
    this.player = pageAnimationObj.create(this.carousel.nativeElement);
    this.player.play();
  }

  // Method triggered clicking next icon
  rendorNextPage() {
    // Animate to next set until the last page is reached.
    if (this.currentPage < this.lastPage - 1) {
      this.currentPage = this.currentPage + 1;
      this.handleAnimation();
    }
  }

  // Method triggered clicking previous icon
  rendorPreviousPage() {
    // Check if the the current page is not the first page
    if (this.currentPage > 0) {
      this.currentPage = this.currentPage - 1;
      this.handleAnimation();
    }
  }

  ngAfterViewInit() {
    // calculate the last page based on item count and num of items to be displayed on page
    const totalCount = this.totalItems.length;
    console.log(this.singlItemWidth);
    const perPageItems = this.itemsPerPage;
    const quotient = Math.floor(totalCount / perPageItems);
    const remainder = totalCount % perPageItems;
    this.lastPage = quotient + remainder;
  }

  ngOnInit() {
    // Calculate the total width of the grid based on number of items and width
    const gridWidth = this.singlItemWidth * this.itemsPerPage;
    this.setGridStyle(`${gridWidth}px`);

  }
}
