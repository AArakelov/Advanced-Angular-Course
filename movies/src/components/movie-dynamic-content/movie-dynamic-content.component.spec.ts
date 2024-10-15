import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDynamicContentComponent } from './movie-dynamic-content.component';

describe('MovieDynamicContentComponent', () => {
  let component: MovieDynamicContentComponent;
  let fixture: ComponentFixture<MovieDynamicContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDynamicContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieDynamicContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
