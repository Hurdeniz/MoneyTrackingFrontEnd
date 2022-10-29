import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyDepositedDeleteComponent } from './money-deposited-delete.component';

describe('MoneyDepositedDeleteComponent', () => {
  let component: MoneyDepositedDeleteComponent;
  let fixture: ComponentFixture<MoneyDepositedDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyDepositedDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyDepositedDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
