import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyDepositedComponent } from './money-deposited.component';

describe('MoneyDepositedComponent', () => {
  let component: MoneyDepositedComponent;
  let fixture: ComponentFixture<MoneyDepositedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyDepositedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyDepositedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
