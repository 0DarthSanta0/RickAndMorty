import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCarouselComponent } from './random-carousel.component';

describe('RandomCarouselComponent', () => {
  let component: RandomCarouselComponent;
  let fixture: ComponentFixture<RandomCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
