import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCharacterPageComponent } from './info-character-page.component';

describe('InfoCharacterPageComponent', () => {
  let component: InfoCharacterPageComponent;
  let fixture: ComponentFixture<InfoCharacterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCharacterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCharacterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
