import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationLibComponent } from './notification-lib.component';

describe('NotificationLibComponent', () => {
  let component: NotificationLibComponent;
  let fixture: ComponentFixture<NotificationLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
