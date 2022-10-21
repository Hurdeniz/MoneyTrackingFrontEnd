import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPaymentDeleteComponent } from './card-payment-delete.component';

describe('CardPaymentDeleteComponent', () => {
  let component: CardPaymentDeleteComponent;
  let fixture: ComponentFixture<CardPaymentDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPaymentDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPaymentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
