import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureMoneyComponent } from './future-money.component';

describe('FutureMoneyComponent', () => {
  let component: FutureMoneyComponent;
  let fixture: ComponentFixture<FutureMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureMoneyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutureMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
