import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsTestComponent } from './controls-test.component';

describe('ControlsTestComponent', () => {
  let component: ControlsTestComponent;
  let fixture: ComponentFixture<ControlsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlsTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
