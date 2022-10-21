import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPaymentViewComponent } from './card-payment-view.component';

describe('CardPaymentViewComponent', () => {
  let component: CardPaymentViewComponent;
  let fixture: ComponentFixture<CardPaymentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPaymentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPaymentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
