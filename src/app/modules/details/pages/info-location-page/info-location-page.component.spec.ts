import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLocationPageComponent } from './info-location-page.component';

describe('InfoLocationPageComponent', () => {
  let component: InfoLocationPageComponent;
  let fixture: ComponentFixture<InfoLocationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoLocationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoLocationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
