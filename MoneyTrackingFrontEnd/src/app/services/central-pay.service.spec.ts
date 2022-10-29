import { TestBed } from '@angular/core/testing';

import { CentralPayService } from './central-pay.service';

describe('CentralPayService', () => {
  let service: CentralPayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentralPayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
