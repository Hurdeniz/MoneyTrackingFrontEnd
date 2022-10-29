import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPayDeleteComponent } from './customer-pay-delete.component';

describe('CustomerPayDeleteComponent', () => {
  let component: CustomerPayDeleteComponent;
  let fixture: ComponentFixture<CustomerPayDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPayDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPayDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
