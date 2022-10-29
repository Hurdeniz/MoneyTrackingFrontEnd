import { TestBed } from '@angular/core/testing';

import { CustomerPayService } from './customer-pay.service';

describe('CustomerPayService', () => {
  let service: CustomerPayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerPayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
