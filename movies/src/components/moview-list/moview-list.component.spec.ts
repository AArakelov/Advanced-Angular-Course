import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviewListComponent } from './moview-list.component';

describe('MoviewListComponent', () => {
  let component: MoviewListComponent;
  let fixture: ComponentFixture<MoviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviewListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
