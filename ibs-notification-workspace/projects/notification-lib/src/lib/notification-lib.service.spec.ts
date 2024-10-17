import { TestBed } from '@angular/core/testing';

import { NotificationLibService } from './notification-lib.service';

describe('NotificationLibService', () => {
  let service: NotificationLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
