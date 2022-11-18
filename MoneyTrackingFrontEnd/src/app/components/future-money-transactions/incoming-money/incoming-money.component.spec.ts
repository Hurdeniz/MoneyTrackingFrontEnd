import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingMoneyComponent } from './incoming-money.component';

describe('IncomingMoneyComponent', () => {
  let component: IncomingMoneyComponent;
  let fixture: ComponentFixture<IncomingMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingMoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomingMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
