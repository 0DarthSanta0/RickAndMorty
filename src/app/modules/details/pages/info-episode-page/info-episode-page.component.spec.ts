import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEpisodePageComponent } from './info-episode-page.component';

describe('InfoEpisodePageComponent', () => {
  let component: InfoEpisodePageComponent;
  let fixture: ComponentFixture<InfoEpisodePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoEpisodePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoEpisodePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
