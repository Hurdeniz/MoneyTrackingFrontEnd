import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureMoneyDeleteComponent } from './future-money-delete.component';

describe('FutureMoneyDeleteComponent', () => {
  let component: FutureMoneyDeleteComponent;
  let fixture: ComponentFixture<FutureMoneyDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureMoneyDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutureMoneyDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
