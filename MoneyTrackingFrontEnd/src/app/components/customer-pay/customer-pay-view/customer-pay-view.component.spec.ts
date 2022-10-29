import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPayViewComponent } from './customer-pay-view.component';

describe('CustomerPayViewComponent', () => {
  let component: CustomerPayViewComponent;
  let fixture: ComponentFixture<CustomerPayViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPayViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerPayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
