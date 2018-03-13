import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselComponent } from './carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselComponent ],
      imports: [BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate getdistanceToSlide', () => {
    const val =  component.getdistanceToSlide(2, 3, 4);
    expect(val).toBe(24);
  });

  it('should not call handleAnimation when  rendorNextPage is called but current and lastpage condition is false', () => {
    this.lastPage = 5;
    spyOn(component, 'handleAnimation').and.callThrough();
    component.rendorNextPage();
    expect(component.handleAnimation).not.toHaveBeenCalled();
  });

  it('should not call handleAnimation when  rendorPreviousPage is called but current and lastpage condition is false', () => {
    spyOn(component, 'handleAnimation').and.callThrough();
    component.rendorPreviousPage();
    expect(component.handleAnimation).not.toHaveBeenCalled();
  });
});
