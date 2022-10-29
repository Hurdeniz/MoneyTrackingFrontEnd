import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyDepositedViewComponent } from './money-deposited-view.component';

describe('MoneyDepositedViewComponent', () => {
  let component: MoneyDepositedViewComponent;
  let fixture: ComponentFixture<MoneyDepositedViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyDepositedViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyDepositedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
