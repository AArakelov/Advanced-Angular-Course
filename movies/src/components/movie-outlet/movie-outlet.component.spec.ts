import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOutletComponent } from './movie-outlet.component';

describe('MovieOutletComponent', () => {
  let component: MovieOutletComponent;
  let fixture: ComponentFixture<MovieOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieOutletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
